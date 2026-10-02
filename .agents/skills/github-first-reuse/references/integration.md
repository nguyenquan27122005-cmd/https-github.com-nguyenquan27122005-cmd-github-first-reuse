# Prove the integration

Read after selecting external code for adoption or adaptation. Match the work to the actual change; a small dependency addition needs fewer checks than an application fork.

## Fix the provenance

Record the package version/lockfile or immutable upstream commit. For copied or extracted files, record their origin and preserve applicable notices. Inspect dependencies and install hooks before enabling them; keep credentials out of candidate trials. Prefer the normal package manager over vendoring when a maintained package supplies the needed API.

## Establish the baseline

Use the supported runtime and an isolated workspace. Run the candidate's relevant existing checks when available; record failures before modifying it. Inspect failures to distinguish a candidate defect from an incompatible or unavailable evaluation environment. A pre-existing failure is not caused by the integration, but it may still block adoption.

## Prove one real path

1. Connect the selected API to one required input/output path using current project conventions.
2. Exercise a representative success case and the most relevant failure or boundary case: malformed input, encoding, unsupported format, large input, or permission failure as applicable.
3. Validate the output or behavior against the acceptance check, not just process exit or a mocked return value.
4. Check relevant existing behavior for regressions. Measure performance only when it is a requirement or observed concern.

If the slice fails, identify whether the gap belongs in a small adapter, an upstream fix, another candidate or independent code. Use only the remaining discovery budget; further comparison needs a named decision-changing gap. Expand the implementation after the slice passes.

## Keep changes bounded

For a fork, retain an upstream reference and distinguish local changes so later updates are possible. For an extracted component, include the dependency closure and notices needed by those files. Remove unrelated scaffolding only after checking consumers. Introduce an adapter only when a real boundary or replacement need justifies it.

Auth behavior, schema/data migrations, public API changes and deployment actions follow the project's existing review and authorization requirements. Selecting a repository does not approve those actions. Keep production side effects outside candidate trials.

## Completion evidence

Report the chosen source/revision, delivered acceptance behavior, checks actually executed and results, remaining limitations, and required attribution. If execution is unavailable, deliver inspected code or a proposal with that limitation; do not mark the integration verified. Defer broad refactors and extra test suites unless the changed interfaces or observed failures require them.
