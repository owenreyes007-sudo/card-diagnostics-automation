# Northstar Account Console · Card Diagnostics

**Live demo:** [Open the Northstar prototype](https://owenreyes007-sudo.github.io/card-diagnostics-automation/)

An account-console simulation with the card diagnostic workflow embedded in the existing Northstar experience. All customer, card, transaction, and case information is synthetic and local to the browser.

## Run locally

Open `index.html` in a modern browser, or start a static server in this directory:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Diagnostic walkthrough

From **Account overview**, choose **Open card diagnostics**. Select one of the six existing issue tags, select its relevant fictional card, transaction, delivery, or replacement record, choose the named scenario, review the target, then select **Run Diagnostic**. The scenario picker shows the selected condition values loaded from that scenario. Each current record is linked to its compatible configured condition; use **Back** to choose another record/condition. From results, **Change scenario** clears the findings and reopens that issue's record selector so another condition can be selected. No checks run before the confirmation step. Search is available for declined transactions. Cancel closes the setup, Back preserves the current choices, and a browser refresh starts a clean session.

Each issue tag has three deterministic cases: a successful review, a failure demonstration, and a verification-needed case. Dedicated fictional target records and their scenario associations are maintained in `diagnostic-records.js`; diagnostic conditions and findings are in `diagnostic-scenarios.js`; the shared evaluator and interface are in `app.js`.

## Advocate result workflow

Completed reviews use three sections: **Diagnostic Results** shows the reported issue, primary finding, evidence, and one of four statuses (**Action Required**, **Resolved**, **No Issue Detected**, or **Investigation Required**); **Troubleshooting Steps** gives three ordered checks with expected evidence and a failure path; and **Recommended Actions** summarizes the immediate action, customer wording, escalation condition, and resolution criteria. Detailed record conditions, event notes, and all findings stay in the collapsed **View Supporting Evidence** disclosure. Use **Copy summary** for a concise case handoff. An unresolved cause is labeled as unconfirmed, and no account/card changes are performed.

All six issue tags use this same structure while retaining scenario-specific guidance. Switching the issue, record, or scenario clears a previous result. Refresh starts a fresh session.

## Rule status

The prototype has no approved Northstar business rules or policy sources attached. Rule provenance and unresolved assumptions are retained in the scenario source and validation report; they are not repeated as implementation disclaimers in the advocate-facing findings. Results describe the selected fictional record and separate recorded facts from causes that remain unknown. These examples must not be treated as production guidance until validated by the relevant business owner.

## Validation and scenario inventory

See [`DIAGNOSTIC-SCENARIO-VALIDATION.md`](DIAGNOSTIC-SCENARIO-VALIDATION.md) for the six-tag record/scenario inventory, corrected contradictions, result-screen changes, refresh behavior, test results, assumptions, and screenshots.

## Scope

This is a training simulation. It is not connected to production systems and does not activate, lock, replace, or otherwise change a card or account.
