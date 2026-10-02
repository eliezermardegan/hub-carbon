import Fastify from "fastify";
import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import { z } from "zod";
import crypto from "node:crypto";
import { prisma } from "@hubcarbon/database";

const app = Fastify({ logger: true });
await app.register(cors, { origin: true });
await app.register(sensible);

const Claim = z.object({
  subjectType: z.string().min(1),
  subjectId: z.string().min(1),
  claimType: z.string().min(1),
  value: z.unknown(),
  source: z.string().min(1),
  methodologyVersion: z.string().min(1)
});

app.get("/health", async () => {
  const database = await prisma.$queryRawUnsafe<{ ok: number }[]>("SELECT 1 AS ok");
  return {
    service: "hubcarbon-api",
    status: database[0]?.ok === 1 ? "ok" : "degraded",
    version: "0.1.0",
    database: database[0]?.ok === 1 ? "ok" : "degraded"
  };
});

app.get("/v1/tenants/:tenantId", async (request, reply) => {
  const { tenantId } = request.params as { tenantId: string };
  const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
  if (!tenant) return reply.notFound("Tenant not found");
  return tenant;
});

app.post("/v1/activities", async (request, reply) => {
  const Body = z.object({
    tenantId: z.string().min(1),
    activityType: z.string().min(1),
    quantity: z.number().finite(),
    unit: z.string().min(1),
    startAt: z.string().datetime(),
    endAt: z.string().datetime(),
    sourceSystem: z.string().min(1),
    sourceRecordId: z.string().optional()
  });
  const parsed = Body.safeParse(request.body);
  if (!parsed.success) return reply.badRequest(parsed.error.flatten());
  const data = parsed.data;
  const activity = await prisma.activity.create({ data: {
    ...data,
    startAt: new Date(data.startAt),
    endAt: new Date(data.endAt),
    quantity: data.quantity,
    status: "raw"
  }});
  return reply.code(201).send(activity);
});

app.get("/health", async () => ({
  service: "hubcarbon-api",
  status: "ok",
  version: "0.1.0"
}));

app.get("/v1/capabilities", async () => ({
  modules: { carbonAccounting: "foundation", dMRV: "foundation", cdrProject: "foundation" },
  principles: ["evidence-first","methodology-as-code","deterministic-calculation","replayable-audit","DLT-neutral"]
}));

app.post("/v1/evidence/claims", async (request, reply) => {
  const parsed = Claim.safeParse(request.body);
  if (!parsed.success) return reply.badRequest(parsed.error.flatten());
  const payload = { id: crypto.randomUUID(), ...parsed.data, createdAt: new Date().toISOString() };
  const hash = crypto.createHash("sha256").update(JSON.stringify(payload)).digest("hex");
  return reply.code(201).send({ ...payload, integrity: { algorithm: "sha256", contentHash: hash } });
});

const port = Number(process.env.PORT ?? 3000);
await app.listen({ port, host: "0.0.0.0" });
