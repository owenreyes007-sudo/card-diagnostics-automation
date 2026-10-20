# Northstar Account Console — Simulation Specification

- **Purpose:** Endorsement and reengineering handoff
- **Specification date:** 2026-10-21
- **Product:** Northstar Account Console, embedded Card Diagnostics workflow
- **Current public prototype:** https://owenreyes007-sudo.github.io/card-diagnostics-automation/
- **Repository:** https://github.com/owenreyes007-sudo/card-diagnostics-automation

## 1. Executive summary

Northstar is a fictional financial-services account console that demonstrates an advocate-facing card support workflow. The embedded diagnostic experience guides an advocate from a reported customer concern to a compatible fictional account record, a configured account condition, a confirmed review target, evidence-based findings, troubleshooting, and next actions.

The prototype covers six Customer Issue Tags (CITs): Card Activation, Declined Transaction, Card Delivery, Card Replacement, Card Not Working, and Card Restrictions. Each CIT currently has three deterministic scenario records: a failure condition, a successful or clear condition, and a case where available information is insufficient to confirm the cause. There are 18 configured scenarios and 18 linked fictional records.

The application is a browser-only simulation. It has no production account connection, backend, authentication, policy service, transaction processor, case-management integration, or card-control capability. The animated scan is a staged user-interface sequence over local deterministic data; it is not a live service call. No account or card action is performed.

**Endorsement requested:** Approve the demonstrated product direction and authorize a separately scoped reengineering phase to validate business rules, confirm integrations and controls, and replace the fictional scenario layer only after the appropriate owners approve them. This document does not request approval to use the current prototype for live customer servicing.

## 2. Product context and objectives

### 2.1 Problem statement

Advocates need a consistent way to connect a customer's reported card concern with the relevant account evidence, identify what is known versus unavailable, and determine a safe next step. A useful diagnostic must avoid treating missing information as a negative result, expected starting conditions as failures, or correlations as confirmed causes.

### 2.2 Objectives

- Preserve an account-console context around the diagnostic instead of presenting an unrelated standalone tool.
- Keep the workflow record-first and require advocate confirmation before results appear.
- Let a presenter demonstrate materially different fictional account conditions across all six CITs.
- Tie findings, evidence, case notes, next steps, and expected outcomes to one selected scenario and compatible record.
- Make unresolved causes and unavailable indicators explicit.
- Separate observed or configured facts from unverified business rules.
- Keep the experience readable on desktop and mobile and reset the session on browser refresh.

### 2.3 Out of scope for the current prototype

- Real Cash App or Northstar customer accounts, authentication, authorization, or personal data.
- Production risk decisions, policy enforcement, card activation, locking/unlocking, replacement orders, payments, refunds, or case updates.
- Backend APIs, service-level monitoring, persistent storage, audit logging, or role-based access.
- Production-approved customer scripts, policy citations, escalation queues, or resolution guarantees.
- A general-purpose support platform beyond the existing account workspace and six card-related CITs.

## 3. Users and roles

| Role | Current simulated capability | Reengineering consideration |
|---|---|---|
| Advocate | Select a concern, record, and scenario; review results and copy a concise handoff | Authenticate, authorize access, and receive policy-approved guidance if connected to real systems |
| Presenter / trainer | Switch between configured scenarios to demonstrate outcomes | Manage approved scenario packs and reset training sessions |
| Product / operations owner | Review workflow and scenario coverage | Approve operational requirements, scripts, definitions, and routing |
| Risk / compliance owner | Review uncertainty treatment and policy assumptions | Approve decision boundaries, evidence requirements, retention, and auditability |
| Engineering / platform owner | Rebuild the static prototype or add approved adapters | Own service contracts, security, observability, deployment, and reliability |

The current UI shows a single fictional operator identity for visual context. It does not implement user accounts or permissions.

## 4. Application shell and screens

### 4.1 Account overview (default landing screen)

The Northstar account workspace opens to a fictional customer account:

- Customer: Jamie Rivera
- Account reference: NS-20481
- Account summary: active, verified, risk review clear, linked account confirmed
- Card on file: fictional card ending 1842, initially delivered and not activated
- Account activity chart, summary metrics, open-case count, and recent activity table
- Primary entry point: **Open card diagnostics**

The chart, balances, case counts, and recent activity are presentation context. They are static sample content, not computed from a backend or reconciled dynamically with every selected scenario. The selected scenario updates its configured diagnostic conditions and the card status indicator where a matching card condition is available.

### 4.2 Diagnostic issue selection

The issue-selection screen asks what the customer is experiencing and presents six selectable CIT cards. It includes a diagnostic workflow side panel showing the current issue and pending steps. The selector does not display development-oriented availability badges.

### 4.3 Record selection

Each CIT opens a record picker appropriate to the issue:

| CIT | Record type | Search |
|---|---|---|
| Card Activation | Card | No |
| Declined Transaction | Transaction | Yes; merchant, reference, date, or amount |
| Card Delivery | Delivery request | No |
| Card Replacement | Replacement request or inquiry | No |
| Card Not Working | Card plus usage context | No |
| Card Restrictions | Card plus control context | No |

The advocate must explicitly select a record. An empty transaction search clears the previous selection. Continue is disabled until a valid record is selected.

### 4.4 Scenario selection and condition preview

After record selection, the dialog presents a **Scenario** choice with a readable scenario label and detected-condition summary. It also previews up to six configured account-condition rows from that scenario. Only scenarios associated with the selected record are selectable. The advocate can return to record selection, and the confirmation screen shows the concern, customer/account, record identifier, and scenario label before running.

**Current implementation constraint:** Each configured record is associated with one scenario. Therefore, selecting another condition currently means returning to the same CIT's record picker and choosing the record associated with that condition. Changing a scenario from results clears the old result and restarts that CIT's setup at record selection. The current UI does not support multiple scenario variants against the same record.

### 4.5 Diagnostic run

After confirmation, the app displays a short staged scan with progress updates for loading the selected record, checking indicators, reconciling evidence with the case note, and preparing advocate next steps. The scan is a front-end animation; the deterministic scenario evaluator uses local JavaScript data. The UI explicitly communicates that no card/account action is performed.

### 4.6 Diagnostic results

The completed result contains three primary sections:

1. **Diagnostic Results:** reported issue, one primary finding, minimum supporting evidence, and overall status.
2. **Troubleshooting Steps:** three ordered scenario-specific actions. Each step includes a check, expected interpretation, and path if the check fails.
3. **Recommended Actions:** immediate action, customer communication, escalation condition, and resolution criteria.

Detailed account conditions, record details, event notes, case notes, and all findings are in a collapsed **View Supporting Evidence** disclosure. **Copy summary** copies a concise structured handoff. **Change scenario** clears prior results and restarts setup for the same CIT. **Run diagnostics again** reevaluates the current selection. A diagnostic result never changes the simulated account or card state.

## 5. End-to-end workflow and state rules

### 5.1 Required sequence

**Account overview → Select CIT → Select record → Select scenario → Confirm target → Run Diagnostic → Review results**

### 5.2 Selection and invalidation behavior

- A record is required before the scenario step can continue.
- A scenario is required before confirmation can continue.
- Only a scenario explicitly associated with the selected record is compatible.
- The confirmation step presents the selected CIT, record, and scenario before evaluation.
- Cancel closes setup without running a diagnostic.
- Back preserves valid choices within the setup dialog.
- Changing issue, record, or scenario invalidates prior findings and case-summary content.
- Changing scenario from the results page clears both result state and rendered result markup before setup resumes.
- Browser refresh returns to Account overview and clears current CIT, record, scenario, search, dialog, scan, and result state. Static fictional records and scenario definitions remain loaded.

### 5.3 Result status model

The overall status is presented as one of:

- **Action Required:** a configured failure scenario has a specific blocker and actionable next step.
- **Resolved:** the selected evidence confirms the relevant delivery/replacement outcome for the selected concern.
- **No Issue Detected:** the reviewed indicators are available and no issue-specific blocker is identified.
- **Investigation Required:** a cause or link to the customer's reported event is unconfirmed, or required information is unavailable.

Finding-level indicators distinguish passed, blocker, clear, unknown, and informational context. An unavailable indicator is never treated as clear. A successful state for one selected event does not prove it is the same event the customer reported; for example, an approved transaction can still require investigation if the customer has not linked it to the reported decline.

## 6. CIT and scenario inventory

Each current CIT has one failure, one success/clear, and one verification-needed case. Record IDs are fictional.

| CIT | Failure condition | Success / clear condition | Verification-needed condition |
|---|---|---|---|
| **Card Activation** | **Different device during activation** (`activation-device-mismatch`): replacement request is associated with Device A, activation attempt with Device B, and no verification result is recorded. | **Eligible for activation** (`activation-ready`): card delivered, identity verified, and no failed activation attempt is linked. Inactive is expected before activation. | **Activation failed · cause not confirmed** (`activation-unconfirmed`): failed attempt exists, but error detail and restriction indicator are unavailable. |
| **Declined Transaction** | **Declined · balance below attempt amount** (`decline-balance-demo`): $38.50 attempt against $24.00 available balance; recorded decline reason is insufficient available balance. | **No current decline blocker** (`decline-cleared`): selected $42.18 Market Square event is approved, but the case does not establish that it is the reported purchase. | **Declined · reason unavailable** (`decline-reason-missing`): decline is recorded; reason cannot be established from available record. |
| **Card Delivery** | **Delivery exception recorded** (`delivery-exception`): latest shipment event requires address confirmation and card is not marked delivered. | **Delivery received and confirmed** (`delivery-confirmed`): request is marked delivered and customer confirms receipt. | **Tracking evidence unavailable** (`delivery-tracking-missing`): non-receipt is reported; current shipment location and cause are unknown. |
| **Card Replacement** | **Damage documented** (`replacement-damage`): damaged card is documented and no replacement order is yet recorded. | **Replacement already delivered** (`replacement-complete`): request fulfilled and receipt confirmed; no new replacement request is present. | **Replacement reason unclear** (`replacement-reason-missing`): available evidence does not establish need or applicable replacement path. |
| **Card Not Working** | **Chip read error recorded** (`notworking-chip-error`): one chip-read error is linked to the attempt; hardware as the root cause is not confirmed. | **No current card-use blocker** (`notworking-clear`): latest selected test is approved; this does not establish a separate earlier attempt. | **Attempt details unavailable** (`notworking-details-missing`): customer reports failure but no event confirms symptom or reason. |
| **Card Restrictions** | **Card locked in controls** (`restriction-customer-lock`): recorded lock precedes a linked declined purchase attempt. | **No restriction recorded** (`restriction-clear`): no current restriction indicator is recorded; unrelated transaction issues are not ruled out. | **Restriction status unavailable** (`restriction-status-missing`): current restriction status and source cannot be confirmed. |

The complete record-to-scenario mapping, fields, and evidence are in `diagnostic-records.js` and `diagnostic-scenarios.js`; the companion validation report documents references and consistency checks.

## 7. Diagnostic decision and evidence requirements

For every scenario, the result must communicate:

- **What was detected:** a specific issue, a clear indicator, or an explicit information gap.
- **Why it may have occurred:** a configured root cause only when supported by the scenario evidence; otherwise state that the cause is unconfirmed.
- **What supports the result:** record reference, event/status/value, relevant time, and linked card or request as available.
- **What the advocate should do:** a scenario-specific verification, troubleshooting, communication, or escalation action.
- **What happens next:** expected state or criteria for resolving the case, without promising an outcome outside the evidence.

The selected scenario is the source of truth for configured system conditions, finding set, case note, expected outcome, recommended steps, customer communication, escalation text, and resolution criteria. The record catalog supplies the selected record identity and issue-specific record fields. The evaluator checks record/scenario compatibility and personalizes linked card last-four values. Results and copyable summaries are generated from that evaluated result object.

### 7.1 Rule governance

No approved production policy source was supplied for this prototype. Scenario classifications and `ruleNote` metadata are internal provenance. In particular:

- A device-context difference is illustrative and is not established as a Cash App risk or activation rule.
- A card's inactive state is expected before activation and does not alone constitute a blocker or risk flag.
- A recorded decline reason is a scenario fact; production display, interpretation, and customer wording require approval.
- A chip-read failure does not by itself prove card hardware failure.
- A locked control state does not authorize the diagnostic to unlock the card.
- Unknown or unavailable fields remain unresolved and are not silently inferred.

## 8. Functional requirements for reengineering

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Preserve the account-console context and embedded diagnostic entry point. | Must |
| FR-02 | Retain the six CITs and issue-specific record selector types. | Must |
| FR-03 | Require explicit record, compatible scenario, and advocate confirmation before running. | Must |
| FR-04 | Show human-readable scenario names and configured condition preview. | Must |
| FR-05 | Use a single versioned scenario result to render account context, findings, evidence, case note, troubleshooting, and recommendations. | Must |
| FR-06 | Clear stale results when selection changes; refresh starts a clean simulation session. | Must |
| FR-07 | Distinguish blocker, clear, informational, and unknown evidence states. | Must |
| FR-08 | Keep detailed evidence available but collapsed by default; support a concise copyable case handoff. | Must |
| FR-09 | Keep all production-rule claims tied to an approved, versioned policy source; preserve uncertainty when absent. | Must |
| FR-10 | Provide actions, customer communication, escalation criteria, and expected resolution without unauthorized execution. | Must |
| FR-11 | Support scenario variants and compatibility rules that can allow multiple conditions for a record where domain owners approve. Explain and guide record reselection when incompatible. | Should |
| FR-12 | Make the scenario state visibly consistent across all relevant account and card context panels, not only the preview and results. | Should |
| FR-13 | Keep a scenario inventory that covers at least success, failure, and insufficient-information cases for every approved CIT. | Must |
| FR-14 | Allow scenario packs to be updated and reviewed without editing rendering code. | Should |
| FR-15 | Use the approved brand, accessibility, localization, and content standards. | Must |

## 9. Data model and current technical design

### 9.1 Current files

- `index.html`: Northstar shell, navigation, account overview, card, activity, and mount points for diagnostic screens.
- `styles.css`: responsive layout, visual system, dialog, scan, workflow side panel, result sections, and status presentation.
- `app.js`: in-memory application state, issue catalog, navigation/rendering, record/scenario selection, evaluator orchestration, scan animation, results, and copy summary.
- `diagnostic-records.js`: fictional issue-specific records and their currently compatible scenario IDs.
- `diagnostic-scenarios.js`: scenario conditions, findings, evidence, case notes, recommendations, outcomes, and internal rule provenance.
- `DIAGNOSTIC-SCENARIO-VALIDATION.md`: scenario inventory, assumptions, test results, and screenshot list.

### 9.2 Core scenario fields

Current scenario objects include: stable `id`, advocate-facing `label`, `type` (`failure`, `success`, or `verify`), short detected-condition text, key/value `system` conditions, reported issue, root-cause text or explicit uncertainty, evidence/confidence, case note, customer impact, expected outcome, recommended next steps, customer guidance, escalation criteria, and structured findings.

Each finding includes an identifier, title, state, detail/interpretation, evidence, group, and recommended action. Record objects include an ID, display label, human-readable identifier, status, optional date/amount/card/condition fields, supporting detail, and compatible scenario IDs.

### 9.3 Current runtime and deployment

The app is plain HTML, CSS, and browser JavaScript. Scenario and record definitions load as static scripts. There is no build step or runtime package dependency required to run the published site. State lives in memory and is reset during initialization/page refresh. The public prototype is hosted as a static GitHub Pages site.

## 10. Nonfunctional requirements and controls

- **Data safety:** use fictional names, account references, event IDs, amounts, and card last-four values only; do not add full card numbers, PIN, CVV, or real customer data.
- **No unintended actions:** diagnostic execution is read-only in this simulation. Production adapters must be separate, explicitly authorized capabilities.
- **Uncertainty:** missing information stays unknown; a correlation must not be presented as a causal rule.
- **Responsive behavior:** selector and result screen fit a 390px-wide viewport without horizontal overflow; desktop layout keeps evidence and actions scannable.
- **Accessibility:** use semantic buttons/labels, dialog roles and descriptions, visible status text, keyboard dismissal for setup, and live-region/progress semantics where appropriate.
- **Session reset:** selections, dialogs, search, results, and temporary state are not persisted across a full browser refresh; static scenario definitions remain available.
- **Reliability:** result content and case summary derive from the same evaluated result to avoid contradictions.
- **Auditability for a future connected version:** record policy/rule version, input source, decision output, timestamp, and authorized actor according to approved retention and privacy requirements.

## 11. Reengineering target architecture

The current static prototype can remain the UX reference. A production-oriented rebuild should establish explicit boundaries:

1. **Experience layer:** account shell, CIT selection, record search/selection, scenario or condition review, confirmation, progress, findings, evidence, and advocate actions.
2. **Diagnostic orchestration layer:** validate the selected context; retrieve only authorized indicators; evaluate versioned rules; calculate finding states; and produce one typed result for all views.
3. **Domain/rule catalog:** versioned CIT definitions, compatible records, evidence requirements, approved rules, uncertainty handling, expected outcomes, customer language, and escalation routing. Business owners approve changes.
4. **Integration adapters:** separate read adapters for account, card, transaction, delivery, replacement, identity, and restriction data. Each source should provide status, timestamp, provenance, availability, and correlation ID. No write adapter should be introduced without a separate approved use case and controls.
5. **Governance and observability:** policy source/version, configuration review history, decision trace, access controls, privacy/retention rules, service errors, and safe fallback behavior.

Recommended domain result contract:

```text
DiagnosticResult
  diagnosticId, createdAt, customerContextRef
  issueTag, selectedRecordRef, scenarioOrRuleVersion
  overallStatus: action_required | resolved | no_issue_detected | investigation_required
  findings[]: id, status, statement, evidence[], causeConfidence, missingInputs[]
  actions[]: kind, owner (system | advocate), instruction, prerequisites, expectedState
  customerMessage, escalationCriteria, resolutionCriteria
  provenance[]: sourceSystem, sourceRecord, observedAt, correlationId
```

All views—banner, finding list, workflow panel, case summary, and copy action—must render from the same immutable result. If a source is unavailable, the result must preserve that availability state and identify what is needed next.

### 11.1 Current prototype gaps to resolve during reengineering

- Scenario compatibility is currently one record to one scenario, so a user switches conditions by selecting another record. Confirm whether production data supports multiple conditions per record and how presenters should select them.
- The account overview metrics, activity chart, recent activity, and case count are static context and do not all derive from scenario records. Decide whether reengineering should make them fully scenario-driven or label them as independent account context.
- Scan phases are visual and local; future UI must report actual service progress and avoid implying live checks when no service request occurred.
- The app has no authentication, role model, backend, durable audit events, policy links, API schema, telemetry, or error/retry contracts.
- UI examples use placeholder Northstar branding and a single operator identity. Confirm brand/legal approval and design-system ownership before broader distribution.
- Current scenario notes contain unverified or illustrative policy assumptions; these need business-owner disposition before converting any to production rules.

## 12. Validation and acceptance criteria

The current prototype was exercised across all 18 configured CIT/record/scenario mappings. Local browser validation checked deterministic evaluation, evidence consistency, scenario preview and confirmation, clearing/rerunning after a changed condition, collapsed evidence, copy summary, transaction search, refresh reset, responsive layout, and browser errors. The hosted activation failure-to-ready-condition flow was also verified on GitHub Pages with no browser errors.

### Endorsement acceptance

- Product/Operations approve the customer-support workflow and CIT scope.
- Risk/Compliance approve the treatment of unknowns and identify authoritative sources for all rules and scripts.
- Engineering/Platform approve the reengineering boundary, integration owners, security model, and deployment model.
- Privacy/Security confirm permitted data, access, retention, and audit requirements.
- Brand/Legal confirm whether Northstar/Cash App-inspired visuals and terminology may be used.

### Reengineering acceptance

- All six approved CITs are covered by versioned scenario/rule definitions and traceable compatible evidence.
- Each result is reproducible from the recorded inputs and approved rule version.
- Findings distinguish observed fact, interpretation, unconfirmed cause, and unavailable evidence.
- Recommendations specify action owner, prerequisites, expected state, escalation, and resolution criteria.
- The UI cannot show a stale result after changing customer, record, scenario, or source data.
- Source outages and missing indicators return an actionable unresolved result rather than a false pass.
- Any system-executable action is separately authorized, auditable, confirmed, and tested; read-only diagnostic flows remain read-only by default.
- Automated tests cover every rule path, source availability state, compatibility rule, refresh behavior, accessibility baseline, and responsive breakpoint.

## 13. Endorsement decisions and open questions

Endorsement owners should record a decision and owner for each item:

1. Approve the six-CIT simulation scope and the embedded account-console concept.
2. Confirm whether the current Northstar visual design is an acceptable internal concept or must be rebranded.
3. Name the business owner and approved policy source for each CIT, including activation verification, decline-reason interpretation, delivery exceptions, replacement eligibility, card-use troubleshooting, and restriction handling.
4. Decide whether multiple scenario variants may be selected against one customer record, and which record conditions are safe to expose to an advocate.
5. Confirm whether account overview metrics should change with selected scenarios or remain independent sample context.
6. Identify source systems, identity and access requirements, field-level permissions, logging, retention, and escalation destinations for any connected rebuild.
7. Decide whether reengineering remains a read-only decision-support experience or includes any separate system-executable actions.
8. Approve a phased delivery plan and release gates for rule validation, security review, integration testing, and pilot readiness.

## 14. Reference artifacts

- Live application: https://owenreyes007-sudo.github.io/card-diagnostics-automation/
- Source repository: https://github.com/owenreyes007-sudo/card-diagnostics-automation
- Scenario inventory and validation: `DIAGNOSTIC-SCENARIO-VALIDATION.md`
- Portable browser package: `Card Diagnostics Automation HTML Pack.zip`
- Current prototype screenshots: `screenshot-context-*-result.png` and the activation record, scenario, confirmation, and run captures.
