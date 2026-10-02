---
name: github-first-reuse
description: Search for reusable open-source GitHub projects and components before implementing substantial software from scratch. Use when building non-trivial applications, features, pipelines, dashboards, AI tools, parsers, analytics systems, or developer tooling.
---

# GitHub-First Reuse

## Goal

Minimize unnecessary code by finding and evaluating existing open-source implementations before building substantial software from scratch.

The desired outcome is not maximum reuse. It is maximum reliable leverage with acceptable license, security, maintenance, and integration risk.

Default workflow:

**Understand -> Decompose -> Search -> Shortlist -> Inspect -> Decide -> Reuse/Adapt -> Test**

## Activation

Use this skill for non-trivial software work such as:

- new applications or services
- substantial features
- data/ETL pipelines
- AI/RAG systems
- parsers and extractors
- financial-analysis systems
- dashboards
- automation
- backtesting/research systems
- authentication/admin systems
- developer tooling

Skip extensive discovery for tiny isolated edits where reuse would clearly cost more than implementation.

## 1. Understand the request

Translate the request into:

- product goal
- required capabilities
- technical constraints
- existing-project constraints
- must-have versus optional behavior
- non-functional requirements where stated

Do not invent constraints.

If the user already has a codebase, inspect it before choosing external code. Prefer integrating compatible components over replacing the user's architecture.

## 2. Decompose before searching

Break the project into reusable subsystems.

Example: financial-statement analysis application

- file ingestion
- PDF/Excel/XBRL parsing
- table extraction
- statement normalization
- account/taxonomy mapping
- ratio engine
- trend and DuPont analysis
- cash-flow quality
- peer comparison
- valuation
- anomaly detection
- AI commentary/RAG
- charts/dashboard
- report generation
- persistence
- API
- auth

Search for both complete applications and individual components. Several focused libraries may be better than one monolith.

## 3. Search broadly

Search GitHub and other public discovery surfaces when available.

Create multiple query families from the user's language and common ecosystem terminology. Do not rely on one literal query.

Search in layers:

1. complete applications
2. frameworks/libraries
3. reference implementations
4. individual reusable components

Useful query dimensions include:

- task/function
- framework/language
- domain synonym
- input/output format
- architecture
- "awesome" or curated lists when useful

When global GitHub search is not available in the active tool, use an available public search/discovery tool to identify repository URLs, then hand those repositories to the coding harness for deep inspection.

Do not pretend a repository was searched or inspected if the active tools did not allow it.

## 4. Initial filtering

Use README/search metadata only for triage.

Prefer candidates with evidence of:

- clear purpose
- explicit license
- understandable structure
- working installation instructions
- tests/examples
- meaningful maintenance history
- compatible technology
- relevant implemented features

Stars/forks are hints, not quality proof.

Reject obvious:

- demo-only repos that do not implement the claimed feature
- abandoned code with severe compatibility problems
- repositories with no usable source
- suspicious install/runtime behavior

## 5. Shortlist

Usually shortlist about 3-8 serious candidates when enough exist.

For each candidate capture:

- repository URL/name
- purpose
- relevant capabilities
- language/framework
- license
- maintenance/activity signal
- major dependencies
- architectural style
- estimated reuse role: whole app / component / reference only

Do not choose a winner from README claims alone.

## 6. Deep inspection

For strong candidates inspect, where available:

- README
- LICENSE
- manifests/lockfiles
- source tree
- core modules
- tests
- examples
- schema/migrations
- API routes
- configuration
- Docker/CI
- recent commits/releases/issues when material

Verify relevant functionality exists in code.

Before executing unfamiliar code, inspect install scripts and obvious security-sensitive paths.

## 7. Mandatory license check

Before copying or substantially adapting code, inspect its license.

Classify it broadly:

- permissive
- copyleft
- restrictive/custom
- unclear
- no license

A public repository with no license is not automatically reusable.

If license compatibility is unclear, use the repository as conceptual/reference material rather than copying code unless the user explicitly resolves the issue.

Preserve required notices and attribution.

## 8. Security and supply-chain check

Check for obvious concerns:

- committed credentials
- suspicious install hooks
- arbitrary shell execution
- unsafe deserialization/eval patterns
- obsolete critical dependencies
- insecure auth defaults
- unexplained binaries
- unnecessary telemetry/network behavior
- dependency confusion or unpinned risky sources

Do not run unknown code blindly.

## 9. Evaluate candidates

Evaluate with concrete evidence rather than fake precision.

Consider:

- functional fit
- technical fit
- code quality
- maintenance health
- tests
- extensibility
- security
- license
- integration cost
- long-term replacement risk

Use qualitative labels or evidence. Avoid made-up exact scores unless a real scoring rubric is explicitly useful.

## 10. Choose a reuse strategy

Choose one:

### ADOPT
Use nearly as-is.

### FORK + MODIFY
Use as the foundation and customize substantially.

### EXTRACT COMPONENTS
Reuse selected libraries/modules/components only.

### REFERENCE ARCHITECTURE
Learn from the implementation but write independent code.

### BUILD FROM SCRATCH
Use when reuse creates more risk/cost than leverage.

Building from scratch is a valid result after informed search.

## 11. Gap analysis before implementation

Before major reuse, map:

- what the candidate already provides
- what is missing
- what must be modified
- what should be removed
- what must remain user-specific

For complex projects maintain an internal matrix:

| Requirement | Candidate | Reuse method | Remaining work |
|---|---|---|---|

The purpose is to avoid duplicated work.

## 12. Implementation discipline

When reusing code:

1. pin source revision when practical
2. preserve license metadata
3. establish a working baseline
4. run existing tests
5. isolate adaptation work
6. remove unnecessary components
7. implement project-specific gaps
8. add tests for modified behavior
9. run build/static checks/tests
10. compare result against original requirements
11. document reused components and major deviations

Do not copy a repository and declare the task complete.

## 13. Existing project integration

When adding reuse to an existing codebase, explicitly inspect compatibility with:

- language/runtime
- framework versions
- package manager
- database/schema
- API conventions
- state management
- auth model
- test strategy
- deployment environment

Prefer a small clean integration over replacing a working architecture with an unrelated repository.

## 14. Search stop conditions

Stop searching when:

- multiple credible candidates have been checked
- new results are no longer materially different
- the best reuse strategy is sufficiently clear
- further search is less valuable than implementation

Search is an optimization step, not the deliverable.

## 15. User-facing checkpoint

Before basing the project on substantial third-party code, report concisely:

- **Found:** useful existing work
- **Best fit:** the strongest candidate(s)
- **Why:** which requirements they already solve
- **Strategy:** adopt / fork / extract / reference / build
- **Gap:** what remains to implement
- **License:** reuse implications
- **Risks:** material maintenance/security/integration concerns

Then continue the requested implementation unless the user asked for approval first.

## 16. Important behavior

Do not force reuse.

Do not select by popularity alone.

Do not ignore licensing.

Do not run unknown code blindly.

Do not claim features without inspecting code when inspection is possible.

Do not let GitHub discovery replace domain reasoning: reused code must still satisfy the user's actual requirements.

Default principle:

> Search before building; reuse only when it is genuinely cheaper, safer, and maintainable.
