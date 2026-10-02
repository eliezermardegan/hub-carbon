# HubCarbon Open-Source and IP Engineering Policy

## Four usage categories

### REFERENCE
We study public source code, architecture, APIs, tests and behavior and implement the required capability independently.

Default for GPL/AGPL/restrictive/unclear projects.

### ADAPT WITH NOTICE
A component may be incorporated only when its license permits the intended use and the dependency tree is reviewed.

Typical preferred licenses for incorporation:
- MIT
- Apache-2.0
- BSD-2-Clause / BSD-3-Clause

### LEGAL REVIEW
Copyleft, dual-license, unusual terms, missing license, patent-sensitive or ambiguous dependencies require explicit review before incorporation.

### DO NOT INCORPORATE
No copying from sources where rights are absent, incompatible, unknown, or otherwise unsuitable.

## Required provenance for every external dependency or reference

Record:
- project
- repository URL
- exact release/tag/commit
- SPDX/license
- copyright holder
- notices required
- dependency tree
- reason for use
- incorporation decision
- date reviewed

## Code separation rule

A HubCarbon implementation inspired by a public project is not copied merely because it provides similar functionality.

Where incorporation is not permitted, HubCarbon code is written independently from requirements/specification/behavior and does not reuse source expressions.

## Standards and regulatory documents

Public availability does not automatically grant permission to reproduce normative text. Standards, regulations, schemas and official guidance are mapped and cited; copyrighted text is not embedded into source unless rights permit it.

## AI-assisted development

AI-generated code must pass the same license/IP review. A model output does not create permission to reproduce third-party copyrighted source code.

## Historical reproducibility

Third-party dependency versions are pinned and recorded in software bills of materials where feasible.
