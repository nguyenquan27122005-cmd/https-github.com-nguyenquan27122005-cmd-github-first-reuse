# Example: financial statement analysis

Request: add born-digital PDF statement ingestion to an existing Python analysis service. The service already has normalization, ratios, storage and report generation. OCR, a new dashboard and valuation features are outside this request.

## Identify the real gap

Inspect the current ingestion interface and installed packages. Search only for the missing PDF text/table capability. A complete finance platform would add unrelated architecture. Keep ratio formulas, accounting periods, units and reporting semantics governed by the current domain model.

## Bounded comparison

Use Standard mode: up to three targeted queries, shortlist up to three candidates, deeply inspect at most two. Example query dimensions are Python runtime, born-digital PDF, table extraction and statement layout. Check source, license, installation and representative examples; README claims alone do not establish extraction accuracy.

Suppose one inspected library extracts text but loses table-column alignment; another exposes table cells compatible with the target interface. Choose the latter only if its licensing, dependencies and an executed trial also support the choice. A text parser plus a small adapter may be preferable when it already meets the actual acceptance checks.

## Integration slice

Pin the selected version and process one representative statement through extraction, normalization and the existing analysis output. Verify labels, numeric values, currency/unit scaling, period alignment and missing values. Include one malformed or unsupported document check. Retain the required attribution and record what has actually passed.

If the trial fails on a specific layout requirement, use one bounded discovery extension for that gap. If no candidate qualifies, report the blocker or implement a narrow independent solution where feasible. Neither a repository star count nor a successful import proves financial correctness.
