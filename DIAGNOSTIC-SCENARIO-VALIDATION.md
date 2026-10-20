# Northstar embedded card diagnostics: scenario inventory and validation

**Updated:** 2026-10-20  
**Application:** Northstar Account Console  
**Scope:** Existing embedded Card Diagnostics workflow. No separate application was introduced.

## User flow

The advocate selects a Customer Issue Tag, selects a relevant synthetic customer record in the CIT-specific dialog, selects one compatible scenario, reviews a confirmation summary, and explicitly runs the diagnostic. The system does not evaluate checks before confirmation. A scenario's cause, evidence, and findings appear only after execution. Cancellation closes setup; Back retains valid selections. Declined transactions can be searched by merchant, reference, date, or amount, and an empty search clears any prior selection.

The six issue cards show only that a failure demo is available. Each category gets its own record selector: cards for Activation, Not Working, and Restrictions; transactions for Declined Transaction; delivery requests for Card Delivery; replacement requests for Card Replacement.

## CIT, records, and scenarios

Each record below is fictional and maps to its compatible configured case. Every CIT has one success, one failure, and one verification-needed case.

| CIT | Record selector and compatible records | Success | Failure demonstration | Verification needed |
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
- The device-context mismatch is an illustrative demo rule. The result confirms only that the configured synthetic events differ; production rule validity is explicitly unconfirmed.
- The decline record amount ($38.50) and configured balance ($24.00) now agree.
- Replacement inquiry `RP-77104` is associated with a documented damaged card and no replacement order. The completed request `RP-76882` is associated with card ending 4821 and a delivered replacement.
- Selected record reference, identifier, and status are added to the evaluated system conditions, case note, results, and copyable case summary. Incompatible scenario IDs cannot be run against a record.
- Missing or contradictory evidence remains unconfirmed; illustrative conditions are not represented as production Cash App policy.

No approved policy source was provided. There are no verified production rules in this prototype. Business-owner review is still needed for activation verification, decline reason interpretation, delivery timeframes, replacement eligibility, card-use troubleshooting, restriction handling, production scripts, and escalation ownership.

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
| Failure cases contain a specific blocker | Passed across all six |
| Success cases have no blocker or unknown finding | Passed across all six |
| Verification cases remain unconfirmed, without confirmed blockers | Passed across all six |
| Search by transaction reference | Passed |
| Empty transaction search and stale-selection guard | Passed |
| Record and scenario required before proceeding | Passed |
| Cancel closes the selector without running checks | Passed |
| Back from confirmation retains compatible scenario choice | Passed |
| Confirmation hides result details before Run Diagnostic | Passed |
| All 18 compatible scenarios manually selected and executed in the UI | Passed; six issue-specific failure demos produce selected-record findings |
| Refresh during pending confirmation clears session selections | Passed |
| Refresh after completed diagnostic returns to Account overview and clears findings | Passed |
| Configured records and scenarios remain available after refresh | Passed |
| Mobile modal at 390px | Passed; 370px modal within 390px viewport, no horizontal overflow |
| Browser runtime errors | None |
| JavaScript syntax checks | Passed for app, scenarios, and record catalog |

## Screenshots

The HTML pack contains actual Chromium screenshots for the result stage of all six failure demos:

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

