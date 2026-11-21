# Funding and sponsor pipeline

Last reviewed: 2026-11-21

This is a research shortlist, not a claim that any application has been submitted or accepted. Confirm each fund's current call, eligibility, licensing, tax and payment requirements before applying.

## Priority 1 — FOSS United project grant (India)

- Official program: https://www.fossunited.org/grants
- Project application information: https://docs.fossunited.org/grants/
- Contact: grants@fossunited.org
- Fit: strong thematic fit. FOSS United explicitly says it has supported developer tools and new programming languages, as well as individual maintainers and projects in India.
- Evidence to prepare: public source repository, clear OSI-approved license, release/build instructions, passing CI, roadmap with measurable milestones, usage/adoption evidence, itemised budget and a short explanation of why maintainer time is needed.
- Note: published grant amounts and limits may vary by program page and call; ask FOSS United to confirm the current cap before setting a request.

## Priority 2 — NLnet CodeSupply (open internet / software supply chain)

- Official call: https://nlnet.nl/CodeSupply/
- General eligibility: https://nlnet.nl/funding.html
- Call page reviewed 2026-11-21 says proposals of €5,000–€50,000; the second call opened 2026-11-03 and closes 2027-01-03 at 12:00 CET.
- Fit: conditional. A general-purpose language is not automatically eligible. A scoped QORVYNT deliverable could fit only if it makes a concrete contribution to trustworthy software supply chains, interoperability, reproducible builds, open standards or a safer open internet stack.
- Next step: frame a small, testable deliverable and confirm with NLnet that it fits CodeSupply before preparing a full application.
- Requirement: project outputs must be published under a recognised free/open-source licence.

## Priority 3 — GitHub Secure Open Source Fund

- Official program: https://github.com/open-source/github-secure-open-source-fund
- Published amount: US$10,000 per selected project, paid in outcome-linked tranches.
- Eligibility includes an active maintainer aged 18+, a clear open-source licence, demonstrated adoption/traction, governance, security commitment and location in a GitHub Sponsors-supported region.
- Fit: possible later, but not ready to claim eligibility. QORVYNT needs a clear licence, documented governance, security policy, release history and credible evidence of external use. Check current region eligibility and application process directly with GitHub.

## Not a current priority — Google Summer of Code 2026

The 2026 mentor-organization application deadline was February 3, 2026, so that cycle is closed. Prepare community, project ideas, mentor capacity and release history for a future cycle instead of treating 2026 as open.

## Application readiness checklist

- [ ] Confirm the exact canonical QORVYNT source repository and public project description.
- [ ] Publish and verify an OSI-approved licence and contributor/governance guidance.
- [ ] Ensure clean-clone build instructions and CI are green; link the exact successful workflow runs.
- [ ] Publish a release or reproducible tagged milestone.
- [ ] Add a security policy and a responsible vulnerability-reporting route.
- [ ] Gather verifiable adoption evidence (downloads/clones, unique users, external contributors, issues, dependent projects); distinguish traffic from active users.
- [ ] Define a 3–6 month work plan with deliverables, acceptance tests, dates and an itemised budget.
- [ ] Explain how funds will be received, tracked, reported and taxed; obtain qualified advice before accepting cross-border funds.
- [ ] Submit only after the maintainer has reviewed and approved the final application.

## Draft project framing

**Project:** QORVYNT — an open-source programming language and developer toolchain.

**Public-interest outcome:** make language tooling easier to build, inspect, reproduce and use; publish source, documentation, test suites and release artifacts under a recognised open-source licence.

**Proposed grant work package:** improve the self-hosted compiler and bytecode verifier, provide reproducible clean-environment builds, expand conformance and security tests, and publish developer documentation and release artifacts.

**Success measures:** clean build from a fresh environment; reproducible release artifacts; CI covering compiler/verifier tests; documented bytecode format and threat model; external users/contributors with attributable evidence.

This draft must be narrowed to the chosen fund's goals and must not imply that planned features are already complete.
