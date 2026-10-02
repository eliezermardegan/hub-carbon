import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __hubcarbonPrisma: PrismaClient | undefined;
}

export const db =
  globalThis.__hubcarbonPrisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"]
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__hubcarbonPrisma = db;
}

export async function disconnectDatabase(): Promise<void> {
  await db.$disconnect();
}
