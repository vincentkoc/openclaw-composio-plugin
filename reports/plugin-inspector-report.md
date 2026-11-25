# OpenClaw Plugin Compatibility Report

Generated: deterministic
Status: PASS

## Summary

| Metric                     | Value |
| -------------------------- | ----- |
| Fixtures                   | 1     |
| High-priority fixtures     | 1     |
| Hard breakages             | 0     |
| Warnings                   | 2     |
| Compatibility suggestions  | 2     |
| Issue findings             | 4     |
| Open issue findings        | 4     |
| Runtime-covered findings   | 0     |
| Runtime-partial findings   | 0     |
| P0 issues                  | 0     |
| P1 issues                  | 2     |
| Open P0 issues             | 0     |
| Open P1 issues             | 2     |
| Live issues                | 0     |
| Live P0 issues             | 0     |
| Compat gaps                | 2     |
| Deprecation warnings       | 1     |
| Inspector gaps             | 1     |
| Open inspector gaps        | 1     |
| Runtime coverage artifacts | 0     |
| Upstream metadata          | 0     |
| Contract probes            | 3     |
| Decision rows              | 4     |

## Triage Overview

| Class               | Count | P0 | Meaning                                                                                                                                                  |
| ------------------- | ----- | -- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| live-issue          | 0     | 0  | Potential runtime breakage in the target OpenClaw/plugin pair. P0 only when it is not a deprecated compat seam.                                          |
| compat-gap          | 2     | -  | Compatibility behavior is needed but missing from the target OpenClaw compat registry.                                                                   |
| deprecation-warning | 1     | -  | Plugin uses a supported but deprecated compatibility seam; keep it wired while migration exists.                                                         |
| inspector-gap       | 1     | -  | Plugin Inspector needs stronger capture/probe evidence before making contract judgments. Runtime-covered rows are proof-backed and not open report work. |
| upstream-metadata   | 0     | -  | Plugin package or manifest metadata should improve upstream; not a target OpenClaw live break by itself.                                                 |
| fixture-regression  | 0     | -  | Fixture no longer exposes an expected seam; investigate fixture pin or scanner drift.                                                                    |

## P0 Live Issues

_none_

## Other Live Issues

_none_

## Compat Gaps

- P1 **composio** `compat-gap` `core-compat-adapter`
  - **missing-compat-record**: composio: compat-dependent behavior lacks registry coverage
  - state: open · compat:missing
  - evidence:
    - legacy-root-sdk-import

- P1 **composio** `compat-gap` `core-compat-adapter`
  - **sdk-export-missing**: composio: plugin SDK import aliases are missing from target package exports
  - state: open · compat:untracked
  - evidence:
    - openclaw/plugin-sdk @ index.ts:1

## Deprecation Warnings

- P2 **composio** `deprecation-warning` `core-compat-adapter`
  - **legacy-root-sdk-import**: composio: root plugin SDK barrel is still used by fixtures
  - state: open · compat:deprecated · deprecated
  - evidence:
    - openclaw/plugin-sdk @ index.ts:1
  - author remediation:
    - Prefer focused public plugin SDK subpath imports instead of the legacy root barrel.
    - docs: https://docs.openclaw.ai/clawhub/plugin-validation-fixes#legacy-root-sdk-import

## Inspector Proof Gaps

- P2 **composio** `inspector-gap` `inspector-follow-up`
  - **package-typescript-source-entrypoint**: composio: cold import needs TypeScript source entrypoint support
  - state: open · compat:none
  - evidence:
    - extension:index.ts

## Runtime-Covered Inspector Gaps

_none_

## Upstream Metadata Issues

_none_

## Hard Breakages

_none_

## Target OpenClaw Compat Records

| Metric                   | Value                                                                          |
| ------------------------ | ------------------------------------------------------------------------------ |
| Configured path          | <OPENCLAW_PATH>                                                                |
| Status                   | ok                                                                             |
| Compat registry          | <OPENCLAW_PATH>/src/plugins/compat/registry.ts       |
| Compat records           | 0                                                                              |
| Compat status counts     | -                                                                              |
| Record ids               | -                                                                              |
| Hook registry            | <OPENCLAW_PATH>/src/plugins/hook-types.ts            |
| Hook names               | 0                                                                              |
| API builder              | <OPENCLAW_PATH>/src/plugins/api-builder.ts           |
| API registrars           | 58                                                                             |
| Captured registration    | <OPENCLAW_PATH>/src/plugins/captured-registration.ts |
| Captured registrars      | 5                                                                              |
| Package metadata         | <OPENCLAW_PATH>/package.json                         |
| Plugin SDK exports       | 368                                                                            |
| Manifest types           | <OPENCLAW_PATH>/src/plugins/manifest.ts              |
| Manifest fields          | 0                                                                              |
| Manifest contract fields | 0                                                                              |

## Warnings

| Fixture  | Code                   | Level   | Message                                                                                 | Evidence                         | Compat record             |
| -------- | ---------------------- | ------- | --------------------------------------------------------------------------------------- | -------------------------------- | ------------------------- |
| composio | sdk-export-missing     | warning | fixture imports plugin SDK aliases that are not exported by the target OpenClaw package | openclaw/plugin-sdk @ index.ts:1 | plugin-sdk-export-aliases |
| composio | legacy-root-sdk-import | warning | fixture imports the root plugin SDK barrel                                              | openclaw/plugin-sdk @ index.ts:1 | legacy-root-sdk-import    |

## Suggestions To OpenClaw Compat Layer

| Fixture  | Code                                 | Level      | Message                                                                                           | Evidence               | Compat record          |
| -------- | ------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------- | ---------------------- | ---------------------- |
| composio | package-typescript-source-entrypoint | suggestion | package OpenClaw entrypoint resolves to TypeScript source in this fixture checkout                | extension:index.ts     | -                      |
| composio | missing-compat-record                | suggestion | fixture depends on a compatibility behavior that is not represented in the target compat registry | legacy-root-sdk-import | legacy-root-sdk-import |

## Issue Findings

- P1 **composio** `compat-gap` `core-compat-adapter`
  - **missing-compat-record**: composio: compat-dependent behavior lacks registry coverage
  - state: open · compat:missing
  - evidence:
    - legacy-root-sdk-import

- P1 **composio** `compat-gap` `core-compat-adapter`
  - **sdk-export-missing**: composio: plugin SDK import aliases are missing from target package exports
  - state: open · compat:untracked
  - evidence:
    - openclaw/plugin-sdk @ index.ts:1

- P2 **composio** `deprecation-warning` `core-compat-adapter`
  - **legacy-root-sdk-import**: composio: root plugin SDK barrel is still used by fixtures
  - state: open · compat:deprecated · deprecated
  - evidence:
    - openclaw/plugin-sdk @ index.ts:1
  - author remediation:
    - Prefer focused public plugin SDK subpath imports instead of the legacy root barrel.
    - docs: https://docs.openclaw.ai/clawhub/plugin-validation-fixes#legacy-root-sdk-import

- P2 **composio** `inspector-gap` `inspector-follow-up`
  - **package-typescript-source-entrypoint**: composio: cold import needs TypeScript source entrypoint support
  - state: open · compat:none
  - evidence:
    - extension:index.ts

## Contract Probe Backlog

- P1 **composio** `sdk-alias`
  - contract: Every observed OpenClaw plugin SDK import remains exported by the target OpenClaw package.
  - id: `sdk.import.package-export-cold-import:composio`
  - evidence:
    - openclaw/plugin-sdk @ index.ts:1

- P2 **composio** `package-loader`
  - contract: Inspector can compile or load TypeScript source entrypoints before registration capture.
  - id: `package.entrypoint.typescript-loader:composio`
  - evidence:
    - extension:index.ts

- P2 **composio** `sdk-alias`
  - contract: Root plugin SDK barrel remains importable or has a machine-readable migration path.
  - id: `sdk.import.root-barrel-cold-import:composio`
  - evidence:
    - openclaw/plugin-sdk @ index.ts:1

## Fixture Seam Inventory

| Fixture  | Priority | Seams          | Hooks               | Registrations | Manifest contracts |
| -------- | -------- | -------------- | ------------------- | ------------- | ------------------ |
| composio | high     | plugin-runtime | before_prompt_build | registerCli   | -                  |

## Decision Matrix

| Fixture  | Decision            | Seam            | Action                                                                                                   | Evidence               |
| -------- | ------------------- | --------------- | -------------------------------------------------------------------------------------------------------- | ---------------------- |
| composio | core-compat-adapter | sdk-alias       | Restore the package export alias or publish a versioned migration map before cold-importing old plugins. | openclaw/plugin-sdk    |
| composio | inspector-follow-up | cold-import     | Compile TypeScript source or run a loader before cold-importing this fixture entrypoint.                 | index.ts               |
| composio | core-compat-adapter | sdk-import      | Keep the root SDK barrel stable or expose a machine-readable migration map before removing aliases.      | openclaw/plugin-sdk    |
| composio | core-compat-adapter | compat-registry | Add or restore a machine-readable OpenClaw compat record before changing this plugin-facing behavior.    | legacy-root-sdk-import |

## Raw Logs

| Fixture  | Code                   | Level | Message                                                                          | Evidence                                                | Compat record |
| -------- | ---------------------- | ----- | -------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------- |
| composio | seam-inventory         | log   | observed 1 hooks, 1 registrations, and 0 manifest contracts                      | hook:before_prompt_build, registration:registerCli      | -             |
| composio | api-registrars-present | log   | all observed api.register* calls exist in the target OpenClaw plugin API builder | registerCli                                             | -             |
| composio | package-metadata       | log   | selected package metadata for plugin contract checks                             | package.json, @composio/openclaw-plugin, version:0.0.12 | -             |
