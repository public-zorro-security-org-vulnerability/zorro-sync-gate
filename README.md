# Zorro Product Sync Gate

Meta-repo for the [public Zorro vulnerability org](https://github.com/public-zorro-security-org-vulnerability).
Every PR here runs the **full product sync pipeline** — proving Dashboard, VS Code, Browser,
Desktop, CLI, and GitHub App PR Guard all detect the same intentional vulnerabilities.

## Install the GitHub App

1. Open [Create GitHub App from manifest](https://github.com/organizations/public-zorro-security-org-vulnerability/settings/apps/new?manifest=...) (run `scripts/seed-public-vuln-org.sh --print-manifest-url` for the live URL).
2. Install **Zorro Vuln Org Guard** on all repos in this org.
3. Set secrets on this repo:
   - `ZORRO_API_KEY` — org API token with scan + remediation scope
   - `ZORRO_API_URL` — optional; defaults to `https://zorrosecurity.com`

## What the pipeline validates

| Stage | Product surface | Pass criteria |
|-------|-----------------|---------------|
| Supply scan | CLI / GitHub App | ≥1 finding on vuln fixture PR |
| VS Code extension | `frontend/apps/vscode` tests | build + security tests green |
| Browser extension | smoke build | dist artifacts present |
| Adversarial corpus | `testdata/adversarial` | labeled fixtures referenced |
| PR Guard webhook | Core API | check-run + comment on PR |

## Intentional vuln PR branch

Open a PR from `feat/intentional-vuln-pr` to exercise the full wedge:

```bash
git checkout -b feat/intentional-vuln-pr
# branch already contains a SQLi + secret leak in fixtures/pr-vuln-sample.js
git push -u origin feat/intentional-vuln-pr
```

Zorro should post a **failure/neutral** check run with attack paths and a verified-fix CTA.

## Corpus repos

See [docs/canonical/PUBLIC_VULN_ORG.md](https://github.com/zorrosecurity/zorro/blob/main/docs/canonical/PUBLIC_VULN_ORG.md) in the main monorepo for the full repo list.
