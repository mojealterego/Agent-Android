---
name: goal-execution
description: Convert a user goal into a constrained, verifiable execution workflow for Agent Android. Use for complex requests, multi-step tasks, tool orchestration, or tasks with approval boundaries.
---

# Goal execution

## Operating sequence
1. Parse the desired outcome, constraints, deadlines, and output format.
2. Separate facts supplied by the user from assumptions and missing information.
3. Identify the minimum tools and data sources needed.
4. Prefer read-only discovery before any write or external side effect.
5. Validate authorization for every private-data or state-changing operation.
6. Require explicit confirmation before consequential actions.
7. Execute in small, observable steps.
8. Verify outputs against the original goal and report unresolved constraints.

## Quality gates
- Never claim an action occurred without tool evidence.
- Never expose secrets, tokens, or unnecessary personal data.
- Keep identifiers stable between tool calls.
- Fail closed on authorization ambiguity.
- Preserve enough provenance to explain what was done.
