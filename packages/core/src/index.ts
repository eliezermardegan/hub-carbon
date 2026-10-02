export type UUID = string;
export type ISODateTime = string;

export interface TenantRef { tenantId: UUID; }
export interface SourceRef {
  sourceSystem: string;
  sourceRecordId?: string;
  sourceUri?: string;
  capturedAt: ISODateTime;
  connectorVersion?: string;
}

export interface ProvenanceRef {
  source: SourceRef;
  parentIds: UUID[];
  transformationIds: UUID[];
  contentHash: string;
}

export interface ReportingBoundary {
  id: UUID;
  tenantId: UUID;
  name: string;
  boundaryType: "organizational" | "operational" | "financial" | "project";
  effectiveFrom: ISODateTime;
  effectiveTo?: ISODateTime;
}

export interface ActivityRecord extends TenantRef {
  id: UUID;
  activityType: string;
  quantity: number;
  unit: string;
  startAt: ISODateTime;
  endAt: ISODateTime;
  facilityId?: UUID;
  assetId?: UUID;
  source: SourceRef;
  provenance: ProvenanceRef;
  status: "raw" | "validated" | "accepted" | "rejected";
}

export interface EmissionFactor extends TenantRef {
  id: UUID;
  factorSet: string;
  factorCode: string;
  version: string;
  validFrom: ISODateTime;
  validTo?: ISODateTime;
  gas: "CO2" | "CH4" | "N2O" | "NF3" | "SF6" | "HFC" | "PFC";
  value: number;
  unit: string;
  geography?: string;
  source: SourceRef;
}

export interface EmissionResult extends TenantRef {
  id: UUID;
  activityId: UUID;
  factorId: UUID;
  methodologyId: string;
  methodologyVersion: string;
  co2eKg: number;
  calculatedAt: ISODateTime;
  inputSnapshotHash: string;
  trace: CalculationTrace;
}

export interface CalculationTrace {
  inputs: { name: string; value: unknown }[];
  operations: { op: string; value: unknown }[];
  outputs: { name: string; value: unknown }[];
}

export interface EvidenceObject extends TenantRef {
  id: UUID;
  evidenceType: "document" | "measurement" | "invoice" | "statement" | "sensor" | "attestation" | "other";
  title: string;
  uri: string;
  contentHash: string;
  capturedAt: ISODateTime;
  source: SourceRef;
  classification: "public" | "internal" | "confidential" | "restricted";
}

export interface AuditEvent extends TenantRef {
  id: UUID;
  occurredAt: ISODateTime;
  actorId: UUID | "system";
  action: string;
  objectType: string;
  objectId: UUID;
  previousHash?: string;
  eventHash: string;
  correlationId: UUID;
}
