# OpenClaw Plugin Issue Findings

Generated: deterministic
Status: PASS

## Triage Summary

| Metric               | Value |
| -------------------- | ----- |
| Issue findings       | 4     |
| P0                   | 0     |
| P1                   | 0     |
| Live issues          | 0     |
| Live P0 issues       | 0     |
| Compat gaps          | 0     |
| Deprecation warnings | 1     |
| Inspector gaps       | 3     |
| Upstream metadata    | 0     |
| Contract probes      | 4     |

## Triage Overview

| Class               | Count | P0 | Meaning                                                                                                         |
| ------------------- | ----- | -- | --------------------------------------------------------------------------------------------------------------- |
| live-issue          | 0     | 0  | Potential runtime breakage in the target OpenClaw/plugin pair. P0 only when it is not a deprecated compat seam. |
| compat-gap          | 0     | -  | Compatibility behavior is needed but missing from the target OpenClaw compat registry.                          |
| deprecation-warning | 1     | -  | Plugin uses a supported but deprecated compatibility seam; keep it wired while migration exists.                |
| inspector-gap       | 3     | -  | Plugin Inspector needs stronger capture/probe evidence before making contract judgments.                        |
| upstream-metadata   | 0     | -  | Plugin package or manifest metadata should improve upstream; not a target OpenClaw live break by itself.        |
| fixture-regression  | 0     | -  | Fixture no longer exposes an expected seam; investigate fixture pin or scanner drift.                           |

## P0 Live Issues

_none_

## Live Issues

_none_

## Compat Gaps

_none_

## Deprecation Warnings

- P2 **composio** `deprecation-warning` `core-compat-adapter`
  - **legacy-root-sdk-import**: composio: root plugin SDK barrel is still used by fixtures
  - state: open · compat:deprecated · deprecated
  - evidence:
    - openclaw/plugin-sdk @ index.ts:1
    - openclaw/plugin-sdk @ src/cli.ts:6
    - openclaw/plugin-sdk @ src/client.ts:1
    - openclaw/plugin-sdk @ src/tools.ts:1

## Inspector Proof Gaps

- P2 **composio** `inspector-gap` `inspector-follow-up`
  - **package-dependency-install-required**: composio: cold import requires isolated dependency installation
  - state: open · compat:none
  - evidence:
    - @modelcontextprotocol/sdk @ package.json
    - zod @ package.json

- P2 **composio** `inspector-gap` `inspector-follow-up`
  - **package-typescript-source-entrypoint**: composio: cold import needs TypeScript source entrypoint support
  - state: open · compat:none
  - evidence:
    - extension:index.ts

- P2 **composio** `inspector-gap` `inspector-follow-up`
  - **runtime-tool-capture**: composio: runtime tool schema needs registration capture
  - state: open · compat:none
  - evidence:
    - registerTool @ src/tools.ts:89

## Upstream Metadata Issues

_none_

## Issues

- P2 **composio** `deprecation-warning` `core-compat-adapter`
  - **legacy-root-sdk-import**: composio: root plugin SDK barrel is still used by fixtures
  - state: open · compat:deprecated · deprecated
  - evidence:
    - openclaw/plugin-sdk @ index.ts:1
    - openclaw/plugin-sdk @ src/cli.ts:6
    - openclaw/plugin-sdk @ src/client.ts:1
    - openclaw/plugin-sdk @ src/tools.ts:1

- P2 **composio** `inspector-gap` `inspector-follow-up`
  - **package-dependency-install-required**: composio: cold import requires isolated dependency installation
  - state: open · compat:none
  - evidence:
    - @modelcontextprotocol/sdk @ package.json
    - zod @ package.json

- P2 **composio** `inspector-gap` `inspector-follow-up`
  - **package-typescript-source-entrypoint**: composio: cold import needs TypeScript source entrypoint support
  - state: open · compat:none
  - evidence:
    - extension:index.ts

- P2 **composio** `inspector-gap` `inspector-follow-up`
  - **runtime-tool-capture**: composio: runtime tool schema needs registration capture
  - state: open · compat:none
  - evidence:
    - registerTool @ src/tools.ts:89

## Contract Probe Backlog

- P2 **composio** `package-loader`
  - contract: Inspector installs package dependencies in an isolated workspace before cold import.
  - id: `package.entrypoint.isolated-dependency-install:composio`
  - evidence:
    - @modelcontextprotocol/sdk @ package.json
    - zod @ package.json

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
    - openclaw/plugin-sdk @ src/cli.ts:6
    - openclaw/plugin-sdk @ src/client.ts:1
    - openclaw/plugin-sdk @ src/tools.ts:1

- P2 **composio** `tool-runtime`
  - contract: Registered runtime tools expose stable names, input schemas, and result metadata.
  - id: `tool.registration.schema-capture:composio`
  - evidence:
    - registerTool @ src/tools.ts:89
