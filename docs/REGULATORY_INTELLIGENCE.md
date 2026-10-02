# Regulatory & Standards Intelligence

## Purpose

Maintain a machine-readable, versioned map between external reporting requirements and HubCarbon's canonical data, methodologies, controls and outputs.

## Requirement lifecycle

DISCOVERED -> REVIEWED -> APPROVED -> ACTIVE -> SUPERSEDED -> RETIRED

Automatic monitoring may create candidate changes. Activation of materially important changes is governed and effective-date aware.

## Requirement object

Each requirement contains:

- authority
- jurisdiction
- instrument or standard
- source reference
- source publication date
- effective date
- applicability conditions
- reporting period
- requirement reference
- required data elements
- calculation/methodology reference
- evidence requirements
- control requirements
- assurance requirements
- output/report mapping
- supersedes / superseded-by
- legal or normative status
- approval status
- captured timestamp
- content checksum

## Automatic update model

1. Monitor approved authoritative sources.
2. Capture metadata and source content within permitted rights.
3. Detect and diff changes.
4. Create candidate rule version.
5. Calculate dependency and impact graph.
6. Run regression tests.
7. Flag affected calculations, reports, controls and tenants.
8. Apply configured approval gates.
9. Activate at the required effective date.
10. Preserve all historical versions.

## Historical reproducibility

A report must always be reproducible using:
- source-data snapshot/version
- transformation versions
- emission-factor version
- methodology version
- regulatory-requirement version
- software release
- user/approval events

## Separation of concerns

The Regulatory Intelligence layer describes what is required and how requirements map to HubCarbon capabilities. It does not replace legal counsel, regulator instructions or formally licensed standards.
