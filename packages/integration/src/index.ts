import { z } from "zod";

export const ConnectorStatus = z.enum(["configured","healthy","degraded","paused","failed"]);

export interface ConnectorContext {
  connectorId: string;
  tenantId: string;
  sourceSystem: string;
  schemaVersion: string;
  connectorVersion: string;
}

export interface ExtractionCheckpoint {
  cursor?: string;
  updatedAt: string;
}

export interface IngestionEnvelope<T> {
  id: string;
  receivedAt: string;
  source: ConnectorContext;
  sourceRecordId: string;
  schemaVersion: string;
  payload: T;
  checksum: string;
  checkpoint?: ExtractionCheckpoint;
}

export interface NormalizedRecord<T> {
  id: string;
  sourceEnvelopeId: string;
  normalizedAt: string;
  mappingVersion: string;
  payload: T;
  provenance: string[];
}

export interface Connector {
  readonly id: string;
  readonly sourceSystem: string;
  health(): Promise<"healthy" | "degraded" | "failed">;
  pull(checkpoint?: ExtractionCheckpoint): Promise<IngestionEnvelope<unknown>[]>;
  normalize(input: IngestionEnvelope<unknown>): Promise<NormalizedRecord<unknown>>;
}

export function stableJsonHash(input: unknown): string {
  const canonical = JSON.stringify(input, Object.keys(input as object).sort());
  let hash = 0x811c9dc5;
  for (let i = 0; i < canonical.length; i++) {
    hash ^= canonical.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}
