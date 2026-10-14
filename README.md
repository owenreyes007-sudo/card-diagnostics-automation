# Card Diagnostics Automation

**Live demo:** [Open the interactive card diagnostics app](https://owenreyes007-sudo.github.io/card-diagnostics-automation/)

A standalone browser-based card diagnostics demonstration built with HTML, CSS, and JavaScript. The interface uses synthetic account and card indicators only. It does not connect to financial systems or perform account actions.

## Run locally

Open `index.html` in a modern browser, or start a local static server in this folder:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Demo paths

Choose **Open card diagnostics**, select one of six card issue categories, and run the staged diagnostic. Results, findings, and the advocate-facing workflow panel update based on the selected synthetic scenario.

## Scope

All account data and diagnostic outcomes are synthetic. The demo is not connected to a live account. It cannot activate, lock, replace, or otherwise modify a card or account. Operational guidance should be reviewed before real-world use.