# Northstar card diagnostic scenario inventory and validation

**Updated:** 2026-10-20  
**Application:** Northstar Account Console prototype  
**Scope:** Existing embedded Card Diagnostics workflow

## Customer Issue Tag coverage

Each existing tag is retained and has a success case, an illustrative failure case, and a verification-needed case.

| Customer Issue Tag | Success | Failure | Verification needed |
|---|---|---|---|
| Card activation | Eligible for activation (`activation-ready`) | Different device during activation (`activation-device-mismatch`) | Activation failed · cause not confirmed (`activation-unconfirmed`) |
| Declined transaction | No current decline blocker (`decline-cleared`) | Declined · balance below attempt amount (`decline-balance-demo`) | Declined · reason unavailable (`decline-reason-missing`) |
| Card delivery | Delivery received and confirmed (`delivery-confirmed`) | Delivery exception recorded (`delivery-exception`) | Tracking evidence unavailable (`delivery-tracking-missing`) |
| Card replacement | Replacement already delivered (`replacement-complete`) | Damage documented (`replacement-damage`) | Replacement reason unclear (`replacement-reason-missing`) |
| Card not working | No current card-use blocker (`notworking-clear`) | Chip read error recorded (`notworking-chip-error`) | Attempt details unavailable (`notworking-details-missing`) |
| Card restrictions | No restriction recorded (`restriction-clear`) | Card locked in controls (`restriction-customer-lock`) | Restriction status unavailable (`restriction-status-missing`) |

The failure cases prioritize distinct symptoms: a configured verification gate, an amount/balance mismatch, a shipment exception, documented physical damage, a chip-read event, and a recorded card-control lock. The verification cases keep the cause unresolved until specific information is available.

## Evidence and diagnosis changes

- **Inactive card during activation:** now shown as an expected initial state and informational finding. It no longer creates a risk flag by itself.
- **Device context difference:** remains a selectable activation failure demonstration, but is labeled an illustrative rule. The UI says the device difference is observed while production validity is unconfirmed.
- **Generic cross-issue multiple blockers:** replaced by issue-specific scenario data so an activation case cannot inherit an unrelated restriction or decline from a shared preset.
- **Failure symptom versus cause:** when a failure is recorded but its reason is unavailable, the symptom is shown as context and the cause as unconfirmed. No unsupported risk or root-cause claim is made.
- **System conditions and case notes:** each scenario carries its own initial state, trigger, evidence, and supporting note. These fields feed the results, findings, and copyable summary from the same selected configuration.
- **Account context:** the account overview card status follows the selected scenario and remains in sync when returning from diagnostics.
- **Resolution guidance:** recommendations are specific to each scenario, distinguish advocate actions from system actions, include customer-facing language, state the expected next state, and name escalation criteria. The prototype executes no account action.

## Validation results

Validation was run against the local Northstar app with a headless Chromium browser on 2026-10-20.

| Check | Result |
|---|---|
| JavaScript syntax (`app.js`, `diagnostic-scenarios.js`) | Passed |
| Existing issue tags retained | 6 of 6 |
| Preconfigured scenarios | 18 total; 3 per issue tag |
| Required scenario fields | Present for all 18: system conditions, trigger, diagnosis, cause/confidence, evidence, case note, impact, advocate steps, customer language, expected outcome, and escalation guidance |
| Deterministic repeat selection | Passed; repeated evaluations returned the same scenario result data |
| Failure case checks | All 6 failure cases include a specific configured action finding |
| Success case checks | All 6 success cases contain no blocker or unknown finding |
| Verification case checks | All 6 show at least one unavailable/unconfirmed indicator and no confirmed blocker |
| Account scenario synchronization | Passed; selected locked-card case updates and retains the overview status |
| Representative UI runs | Passed: activation success, activation device mismatch, and decline reason unavailable |
| Mobile layout | Passed at 390px; no horizontal overflow |
| Browser runtime errors | None observed |

## Screenshots

The HTML pack includes these actual browser captures:

- `screenshot-activation-success.png`
- `screenshot-activation-device-mismatch.png`
- `screenshot-decline-unconfirmed.png`
- `screenshot-mobile-activation-scenario.png`

## Rule provenance and outstanding assumptions

No verified Northstar policy source was available for this implementation. Therefore, there are **no scenarios classified as verified business rules**. All success examples are synthetic states; all failure conditions that imply business behavior are labeled illustrative; verification cases explicitly state that the diagnosis is unconfirmed.

Business-owner validation is still needed for:

1. Whether device-context changes during card activation should require a verification step.
2. The actual decline reason fields and whether the synthetic amount/balance example is an appropriate illustration.
3. Delivery exception actions, service windows, and escalation ownership.
4. Replacement eligibility and the approved path for damaged cards.
5. How chip-read errors should be interpreted and what safe retry guidance is appropriate.
6. The meaning and authorized handling of card-control locks and other restriction indicators.
7. Production verification steps, escalation teams, and customer scripts for each issue.

Until those rules are reviewed, this remains a synthetic demonstration and must not be represented as production policy or guidance.

