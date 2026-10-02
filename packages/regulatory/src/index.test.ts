import { describe, expect, it } from "vitest";
import type { RegulatoryRequirement } from "./index.js";

describe("regulatory model", () => {
  it("supports versioned requirements", () => {
    const requirement: RegulatoryRequirement = {
      id: "req.example.001",
      authority: "example-authority",
      jurisdiction: "GLOBAL",
      instrument: "example-standard",
      version: "1.0",
      status: "APPROVED",
      sourceRef: "https://example.invalid/source",
      applicability: [],
      requiredData: ["activity.quantity"],
      methodologyRefs: ["methodology.example.1"],
      evidenceRequirements: [],
      controlRequirements: [],
      assuranceRequirements: [],
      outputMappings: ["report.example.activity"],
      checksum: "sha256:example",
      capturedAt: new Date().toISOString()
    };

    expect(requirement.version).toBe("1.0");
  });
});
