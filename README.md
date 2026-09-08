# Agent Android

Production-oriented Android AI agent platform with a modular agent runtime, MCP integration, Skills, plugin packaging, secure configuration, observability, tests, and EAS/Android delivery.

## Architecture

- `apps/mobile` — Expo/React Native Android client.
- `services/agent-api` — API boundary, auth/session contracts, agent orchestration boundary.
- `services/mcp-server` — MCP server with focused tools and resource/skill exposure.
- `plugins/agent-android` — packaged Codex/ChatGPT plugin manifest and bundled skills.
- `packages/shared` — shared contracts and validation schemas.
- `.github/workflows` — CI quality gates.

## Principles

1. Secrets never live in source control.
2. Tool inputs are untrusted; authorization is enforced server-side.
3. Consequential tools require explicit approval.
4. Android UI remains thin; privileged integrations stay server-side.
5. Every public interface is versioned and tested.
6. Observability is part of the product, not an afterthought.

## Current status

The repository is initialized as a clean, extensible foundation. The production API credentials must be supplied through the deployment environment; this repository intentionally contains no live keys.

## Android APK

EAS can produce a directly installable `.apk` using an Android build profile configured with `android.buildType: apk` or an equivalent APK-producing profile.
