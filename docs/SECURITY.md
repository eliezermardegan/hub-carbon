# Security Architecture

HubCarbon follows defense-in-depth and zero-trust principles.

## Identity and access

- OIDC/OAuth2
- MFA
- short-lived access tokens
- service identities
- RBAC as baseline
- ABAC/policy controls for sensitive actions
- least privilege
- segregation of duties

## Tenant isolation

Tenant context must be explicit in every security-sensitive request and persisted event. Cross-tenant access is denied by default.

## Secrets

ERP/API credentials are referenced through an external secret manager where available. Secrets are never committed to source control or stored as ordinary application records.

## Data protection

- TLS for transport
- encryption at rest
- managed keys/KMS or HSM where appropriate
- key rotation
- restricted administrative access
- controlled exports

## Audit and provenance

Every material state transition records:
- actor/service identity
- tenant
- timestamp
- action
- object type and ID
- previous version/hash
- new version/hash
- correlation ID
- source
- reason/context

## Operational security

- dependency scanning
- secret scanning
- SBOM generation
- signed build/release artifacts where supported
- vulnerability management
- backup verification
- disaster recovery testing
- incident response runbooks

## Compliance posture

This architecture enables evidence collection for controls; it does not by itself certify compliance with any specific law, standard or regulatory regime.
