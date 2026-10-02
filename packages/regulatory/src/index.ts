export type RequirementStatus =
  | "DISCOVERED"
  | "REVIEWED"
  | "APPROVED"
  | "ACTIVE"
  | "SUPERSEDED"
  | "RETIRED";

export interface ApplicabilityCondition {
  field: string;
  operator: "eq" | "neq" | "in" | "not_in" | "gte" | "lte" | "contains";
  value: unknown;
}

export interface RegulatoryRequirement {
  id: string;
  authority: string;
  jurisdiction: string;
  instrument: string;
  version: string;
  status: RequirementStatus;
  sourceRef: string;
  publishedAt?: string;
  effectiveFrom?: string;
  effectiveTo?: string;
  applicability: ApplicabilityCondition[];
  requiredData: string[];
  methodologyRefs: string[];
  evidenceRequirements: string[];
  controlRequirements: string[];
  assuranceRequirements: string[];
  outputMappings: string[];
  supersedes?: string;
  supersededBy?: string;
  checksum: string;
  capturedAt: string;
}

export interface RuleActivationPlan {
  requirementId: string;
  targetEffectiveDate: string;
  impactTargets: string[];
  regressionSuite: string[];
  approvalRequired: boolean;
}

export interface ComplianceTrace {
  requirementId: string;
  entityId: string;
  dataRefs: string[];
  methodologyRefs: string[];
  evidenceRefs: string[];
  calculationRefs: string[];
  outputRefs: string[];
}
