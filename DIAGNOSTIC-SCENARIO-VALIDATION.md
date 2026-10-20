# Northstar embedded card diagnostics: scenario inventory and validation

**Updated:** 2026-10-21
**Application:** Northstar Account Console  
**Scope:** Existing embedded Card Diagnostics workflow. No separate application was introduced.

## User flow

The advocate selects a Customer Issue Tag, selects a relevant fictional customer record in the CIT-specific dialog, chooses its named scenario and reviews the configured account conditions, then confirms the target and runs the diagnostic. The system does not evaluate findings before confirmation. The scenario picker shows the condition being simulated; diagnostic evidence and recommendations are presented after execution. Each current record maps to its compatible configured condition. Back retains valid selections; **Change scenario** clears the result and returns to that CIT's record selector to choose a different account condition. Declined transactions can be searched by merchant, reference, date, or amount, and an empty search clears any prior selection.

The six issue cards are clean issue selectors with no demo-availability badges. Each category gets its own record selector: cards for Activation, Not Working, and Restrictions; transactions for Declined Transaction; delivery requests for Card Delivery; replacement requests for Card Replacement.

## CIT, records, and scenarios

Each record below is fictional and maps to its compatible configured case. Every CIT has one success, one failure, and one verification-needed case.

| CIT | Record selector and compatible records | Success | Configured failure condition | Verification needed |
|---|---|---|---|---|
| Card Activation | Cards: `card-1842`, `card-4821`, `card-9037` | `activation-ready` on `card-4821` | `activation-device-mismatch` on `card-1842` | `activation-unconfirmed` on `card-9037` |
| Declined Transaction | Searchable transactions: `txn-884201`, `txn-884155`, `txn-883992` | `decline-cleared` on `txn-884155` | `decline-balance-demo` on `txn-884201` | `decline-reason-missing` on `txn-883992` |
| Card Delivery | Delivery requests: `del-62014`, `del-61983`, `del-62102` | `delivery-confirmed` on `del-61983` | `delivery-exception` on `del-62014` | `delivery-tracking-missing` on `del-62102` |
| Card Replacement | Replacement requests/inquiries: `rep-77104`, `rep-76882`, `rep-77215` | `replacement-complete` on `rep-76882` | `replacement-damage` on `rep-77104` | `replacement-reason-missing` on `rep-77215` |
| Card Not Working | Cards and associated use context: `use-1842`, `use-4821`, `use-9037` | `notworking-clear` on `use-4821` | `notworking-chip-error` on `use-1842` | `notworking-details-missing` on `use-9037` |
| Card Restrictions | Cards and restriction context: `control-1842`, `control-4821`, `control-9037` | `restriction-clear` on `control-4821` | `restriction-customer-lock` on `control-1842` | `restriction-status-missing` on `control-9037` |

No full card number, PIN, CVV, or real customer data is used. Card records display only the last four digits. All records and rules are local synthetic demo data.

## Diagnostic consistency and rule governance

- Inactive status during activation remains an expected starting condition; it does not create a risk flag by itself.
- Device mismatch is treated as recorded context plus a missing verification result. The tool does not assert that the device difference is an official production block or risk rule.
- The decline record amount ($38.50) and configured balance ($24.00) now agree.
- Replacement inquiry `RP-77104` is associated with a documented damaged card and no replacement order. The completed request `RP-76882` is associated with card ending 4821 and a delivered replacement.
- Selected record reference, identifier, status, and relevant transaction/request attributes are added to system conditions, findings context, case note, and copyable handoff. Card last-four is taken from the linked card field for transaction, delivery, and replacement records.
- Findings now label their interpretation and display a targeted advocate action for blockers and unavailable evidence. The summary carries selected record, finding, evidence, action, customer impact, and resolution criteria.
- The operational result view no longer exposes scenario classification or rule-provenance disclaimers. Provenance and assumptions remain here and in the scenario source (`classification` and `ruleNote`).
- Record/event dates and references are reconciled, including delivery request `DL-61983`, transaction `TXN-884155`, chip attempt `TXN-883991`, and control event `CT-1028` / linked decline `TXN-884612`.

No approved policy source was provided. There are no verified production rules in this prototype. Business-owner review is still needed for activation verification, decline reason interpretation, delivery timeframes, replacement eligibility, card-use troubleshooting, restriction handling, production scripts, and escalation ownership.

## Rule provenance and unresolved assumptions

All scenario facts are fictional. The scenario source retains the CIT association (its containing category), scenario identifier, classification, configured starting conditions, findings, and expected outcome. `ruleNote` records provenance: failure examples are illustrative, verification cases do not infer a cause, and success examples are synthetic states. No scenario is represented as a verified Cash App rule.

Unresolved business assumptions that need an approved source before operational use:

- Whether and how a device-context difference affects card activation, and what verification result is required.
- Which transaction authorization reasons can be shown to an advocate and what customer guidance is approved for each.
- Delivery exception handling, tracking refresh behavior, and any customer-facing timeframes.
- Card replacement eligibility and the approved path for damage, loss, and theft.
- The threshold and support path for repeated chip-read failures.
- The authorized handling and escalation route for customer-controlled locks and unavailable restriction indicators.
- Approved identity-verification language, support routing, and escalation ownership across all CITs.

The application describes observed scenario data and investigation steps without claiming these unresolved rules are production policy.

## Before-and-after examples

| CIT | Earlier result wording | Updated result wording |
|---|---|---|
| Card Activation | “The device difference is observed; whether it should block or require verification in production is unconfirmed.” | “The event records confirm the device difference, but they do not establish that the difference itself caused the failed activation. The missing verification result is the unresolved condition.” The finding now shows RP-76882, Device A, the current attempt on Device B, and the exact check for a verification result or activation error. |
| Declined Transaction | “Scenario-configured cause: available balance is lower than the purchase amount.” | The result ties TXN-884201 at Corner Coffee to $38.50, $24.00 available, and the recorded insufficient-balance reason; the advocate is told to investigate any mismatch and not promise approval on retry. |
| Card Not Working | The chip-read event was shown without a linked event reference or a targeted distinction between card and terminal causes. | The result identifies TXN-883991, the Oct 19 6:14 PM chip-read error, confirms the card was active and unlocked, and calls out that no alternate terminal or entry-method result is recorded. |

The account workspace remains embedded and its navigation and CIT inventory are unchanged. Refresh still clears the current session while leaving static records and scenarios available.

## Diagnostic results and advocate actions refinement

The results view is now organized into three visible sections:

1. **Diagnostic Results** — reported issue, one primary finding, minimum supporting evidence, and a status of **Action Required**, **Resolved**, **No Issue Detected**, or **Investigation Required**. Unestablished causes are explicitly labeled as unconfirmed; expected initial states are not called failures. A transaction that is approved but not confirmed as the customer's reported purchase remains **Investigation Required**.
2. **Troubleshooting Steps** — three ordered actions generated from the selected scenario's configured steps. Each action has a linked check/evidence fact, its expected interpretation, and a next step if the check fails. The checklist is tied to the chosen fictional record; card last-four details are personalized from that record.
3. **Recommended Actions** — one immediate decision, short customer communication, a scenario-specific escalation condition, and resolution criteria. This section summarizes the next decision instead of repeating the entire checklist.

Account conditions, selected record references, event details, customer/case notes, and all findings have moved into the collapsed **View Supporting Evidence** disclosure. The full case summary is no longer displayed beside the result; **Copy summary** still copies a concise, structured handoff. Screenshots of the revised result view keep supporting evidence collapsed by default.

The issue selector no longer shows implementation labels such as “Failure demo available.” Scenario choices use readable scenario names, and the picker displays account-condition values from that scenario's single source of truth. Current scenarios are tied to a compatible record; selecting **Change scenario** on results clears both in-memory findings and the old results markup, then returns to record selection for the same CIT. A new result only appears after confirmation and a fresh diagnostic run. Internal rule provenance and assumptions remain in the scenario configuration and this report.

## Refresh behavior

The app uses in-memory session state only. No `localStorage`, `sessionStorage`, IndexedDB, URL parameter, or history-state persistence is used for selections or diagnostic outcomes. Initialization resets the view to Account overview and clears the selected CIT, record, scenario, dialog, search query, and result. The configured scenario catalog and fictional records remain available because they are static files loaded on each page load.

## Validation results

Automated Chromium validation (`work/validate_northstar_context.cjs`) passed on 2026-10-20:

| Check | Result |
|---|---|
| Default landing screen on fresh load | Passed |
| Existing CITs retained | 6 of 6 |
| Record selector type appropriate to each CIT | Passed |
| Fictional target records | 18 total; 3 per CIT |
| Configured scenarios | 18 total; success, failure, and verification case per CIT |
| Deterministic evaluator and record compatibility | Passed across all 18 scenario/record mappings |
| Card ending resolved from selected card, transaction, delivery, or replacement record | Passed across all 18 mappings |
| Each finding includes interpretation; blocker and unavailable findings include a next action | Passed across all 18 mappings |
| Three-section result structure, status, and complete 3-step checklist | Passed across all 18 UI executions |
| Supporting Evidence collapsed by default and accessible on expansion | Passed across all 18 UI executions |
| Concise structured copy summary, including clipboard action | Passed across all 18 UI executions; clipboard write verified |
| Human-readable scenario selection and account-condition preview | Passed across all 18 UI executions |
| Change scenario clears prior result and allows a different compatible record/condition to run | Passed for Card Activation; all six CITs use the same selection and evaluation flow |
| No development-oriented failure/demo labels on the CIT selector | Passed |
| Advocate result panels free of implementation-rule disclaimers | Passed across all 18 UI executions |
| Failure cases contain a specific blocker | Passed across all six |
| Success cases have no blocker or unknown finding | Passed across all six |
| Verification cases remain unconfirmed, without confirmed blockers | Passed across all six |
| Search by transaction reference | Passed |
| Empty transaction search and stale-selection guard | Passed |
| Record and scenario required before proceeding | Passed |
| Cancel closes the selector without running checks | Passed |
| Back from confirmation retains compatible scenario choice | Passed |
| Confirmation shows the selected CIT, record, and named scenario before Run Diagnostic | Passed; no finding evidence is shown in confirmation |
| All 18 compatible scenarios selected and executed in the UI | Passed; account condition and findings match the selected record and scenario |
| Refresh during pending confirmation clears session selections | Passed |
| Refresh after completed diagnostic returns to Account overview and clears findings | Passed |
| Configured records and scenarios remain available after refresh | Passed |
| Mobile selector and result layout at 390px | Passed; 370px modal and results content fit 390px viewport with no horizontal overflow |
| Browser runtime errors | None |
| JavaScript syntax checks | Passed for app, scenarios, and record catalog |
| Scenario change invalidates old findings and requires a rerun | Passed for Card Activation with a different compatible card and condition |
| Public GitHub Pages deployment | Previously passed; this refinement is pending publication and hosted verification |
| Hosted Chromium activation walkthrough | Previously passed; rerun after this refinement is published |

## Screenshots

The HTML pack contains actual Chromium screenshots for the revised result stage of all six configured failure conditions. Supporting evidence is collapsed in these captures:

- `screenshot-context-activation-result.png`
- `screenshot-context-decline-result.png`
- `screenshot-context-delivery-result.png`
- `screenshot-context-replacement-result.png`
- `screenshot-context-notworking-result.png`
- `screenshot-context-restrictions-result.png`

Activation walkthrough stages:

- `screenshot-context-activation-record-selection.png`
- `screenshot-context-activation-scenario-selection.png`
- `screenshot-context-activation-confirmation.png`
- `screenshot-context-activation-run.png`
- `screenshot-context-mobile-record-selection.png`

Each issue also has a confirmation screenshot. The activation run screenshot captures the live diagnostic progress UI immediately after confirmation.
