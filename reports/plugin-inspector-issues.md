# OpenClaw Plugin Issue Findings

Generated: deterministic
Status: PASS

## Triage Summary

| Metric                     | Value |
| -------------------------- | ----- |
| Issue findings             | 4     |
| Open issue findings        | 4     |
| Runtime-covered findings   | 0     |
| Runtime-partial findings   | 0     |
| P0                         | 0     |
| P1                         | 2     |
| Open P0                    | 0     |
| Open P1                    | 2     |
| Live issues                | 0     |
| Live P0 issues             | 0     |
| Compat gaps                | 2     |
| Deprecation warnings       | 1     |
| Inspector gaps             | 1     |
| Open inspector gaps        | 1     |
| Runtime coverage artifacts | 0     |
| Upstream metadata          | 0     |
| Contract probes            | 3     |

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

## Issues

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
