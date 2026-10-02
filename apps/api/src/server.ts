import Fastify from "fastify";
import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import { z } from "zod";
import crypto from "node:crypto";

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
