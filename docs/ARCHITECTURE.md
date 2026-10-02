# HubCarbon Enterprise Architecture

## Architectural principle

HubCarbon is a technical climate-data and assurance platform with compliance-by-design. Regulatory material is represented as versioned, machine-readable requirements; it does not become uncontrolled legal logic inside the accounting, dMRV or CDR engines.

## Layers

### 1. Enterprise Integration
Connectors and ingestion for ERP, EPM, procurement, utilities, logistics, IoT, data warehouses, APIs and files.

Responsibilities:
- authentication and credential isolation
- incremental ingestion
- schema mapping
- idempotency
- reconciliation
- source metadata
- connector health
- rate limiting
- retry and dead-letter handling

### 2. Canonical Climate Data
A normalized representation independent of the source system.

Core domains:
- organization and reporting boundary
- activity data
- assets and facilities
- energy and fuels
- suppliers and value chain
- emission factors
- GHG quantities
- climate risks and opportunities
- targets and transition plans
- projects and removals
- evidence and provenance
- reporting facts

### 3. HubCarbon Engines
Independent engines:
- Carbon Accounting Engine
- dMRV Engine
- CDR Project Engine
- future Climate Risk / Target engines

Each engine consumes canonical data and versioned methodologies and exposes deterministic, replayable outputs.

### 4. Regulatory & Standards Intelligence
A separate rule plane that maps external requirements to canonical data, methodologies, controls and reporting outputs.

It handles:
- jurisdiction
- authority
- instrument/standard
- applicability
- effective dates
- requirement versions
- required data
- evidence
- calculations
- controls
- assurance
- output mappings

### 5. Reporting & Disclosure
Generates human-readable and machine-readable reporting packages, including regulator/customer-specific outputs, evidence packages and assurance support.

## Cross-cutting controls

Identity, MFA, RBAC/ABAC, encryption, secrets management, tenant isolation, provenance, event audit, observability, retention and disaster recovery apply across all layers.

## Non-negotiable design rules

1. Source systems never define HubCarbon's canonical semantics.
2. AI may assist discovery, classification, reconciliation and mapping; deterministic approved rules remain authoritative.
3. External standards are referenced and mapped; copyrighted normative text is not copied without appropriate rights.
4. Historical calculations remain reproducible against their exact data, methodology and rule versions.
5. Regulatory changes create versioned candidates and impact assessments before activation.
6. DLT/blockchain is optional and abstracted behind interfaces.
7. Integrations must be least-privilege and idempotent.
