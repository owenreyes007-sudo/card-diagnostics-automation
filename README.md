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

From **Account overview**, choose **Open card diagnostics**. Select one of the six existing issue tags, select its relevant fictional card, transaction, delivery, or replacement record, choose a compatible scenario, review the target, then select **Run Diagnostic**. No checks run before the confirmation step. Search is available for declined transactions. Cancel closes the setup, Back preserves the current choices, and a browser refresh starts a clean session.

Each issue tag has three deterministic cases: a successful review, a failure demonstration, and a verification-needed case. Dedicated fictional target records and their scenario associations are maintained in `diagnostic-records.js`; diagnostic conditions and findings are in `diagnostic-scenarios.js`; the shared evaluator and interface are in `app.js`.

## Rule status

The prototype has no approved Northstar business rules or policy sources attached. All failure rules are explicitly marked **Illustrative demo rule**. Success examples are **Illustrative demo state**. Where the synthetic evidence does not establish a cause, the diagnosis is **Unconfirmed diagnosis** and names what to verify. These examples must not be treated as production guidance until validated by the relevant business owner.

## Validation and scenario inventory

See [`DIAGNOSTIC-SCENARIO-VALIDATION.md`](DIAGNOSTIC-SCENARIO-VALIDATION.md) for the six-tag record/scenario inventory, corrected contradictions, refresh behavior, test results, assumptions, and screenshots.

## Scope

This is a training simulation. It is not connected to production systems and does not activate, lock, replace, or otherwise change a card or account.

