# Enterprise Integration Architecture

## Goal

Integrate HubCarbon with complex enterprise environments without coupling the climate domain model to any vendor.

## Supported patterns

- REST/JSON APIs
- OAuth2/OIDC
- webhooks
- SFTP/file ingestion
- batch exports
- event streams
- CDC where available
- scheduled extracts
- warehouse-to-warehouse exchange

## Connector contract

Every connector implements:

- connection configuration
- credential reference
- source system identity
- schema version
- extraction cursor/checkpoint
- mapping version
- idempotency strategy
- retry strategy
- reconciliation strategy
- health/status
- audit metadata

## SAP / Oracle approach

SAP and Oracle are treated as enterprise source systems. Connector implementations map source data into HubCarbon canonical objects.

Examples:
- GL / cost data -> financial activity
- purchasing -> supplier/activity data
- utility and energy feeds -> energy activity
- fixed assets -> asset/facility metadata
- travel/logistics -> value-chain activity
- EPM/planning -> targets and forecasts

No connector is allowed to silently reinterpret a source value as a climate result. Transformation steps remain explicit and auditable.

## Data quality pipeline

Source -> Validate -> Normalize -> Enrich -> Reconcile -> Approve/Accept -> Canonical Store -> Calculation/Reporting

Failed records remain traceable and never disappear into a silent retry loop.
