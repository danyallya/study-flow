# 30-day delivery plan
## Daily operating loop
Review prior code and Git diff, check backlog and debug open defects. Add/update tests for changed timer/plan behavior, implement today's ticket, run tests/typecheck/build, update docs and backlog, then prepare tomorrow. Note unavailable checks and continue static review. Add discoveries with rationale and priority.

## Foundation status
Day 00 study workspace, focus timer presentation, plan list, rhythm summary, theme toggle and shadcn-style local components are ready. Dependencies and lockfile are installed; smoke test (1/1), typecheck and production build passed. This Vite template has no standalone lint script. Nexus .npmrc is local and ignored.

## Daily tickets
### Day 00 verification
Nexus returned 404 for packages used by this project. Following the user's approval, dependencies were installed with npmjs fallback; the ignored local .npmrc keeps Nexus as default and contains only required scope overrides. Day 01 has not started.

| Day | Deliverable |
|---|---|
| 01 | **Done** — define typed subject/session/plan/repeat-schedule models and validate dates, local times, duration, subject links and recurrence choices. |
| 02 | Implement accurate timer state, pause/resume and completion behavior. |
| 03 | Add timer preferences for session and rest duration. |
| 04 | Add session editor with subject, estimate and flexible time window. |
| 05 | Add daily plan reorder, completion and gentle rescheduling. |
| 06 | Add subject library with color-safe identifiers and notes. |
| 07 | Review timer and plan behavior, add tests and fix edge cases. |
| 08 | Add local persistence and recovery after refresh. |
| 09 | Add weekly calendar with workload balance hints. |
| 10 | Add recurring study plans with skip and pause options. |
| 11 | Add focus mode with optional ambient sound controls. |
| 12 | Add break reminders and screen-rest prompt. |
| 13 | Add notes and learning goals linked to sessions. |
| 14 | Review timer accuracy and schedule semantics; add regressions. |
| 15 | Add progress charts with accessible text/table alternatives. |
| 16 | Add CSV/XLSX study history export. |
| 17 | Add PDF weekly reflection and printable plan. |
| 18 | Add cross-device responsive calendar and session cards. |
| 19 | Add phone-friendly timer controls and announcements. |
| 20 | Audit theme contrast, keyboard, reduced motion and timer urgency. |
| 21 | Add PWA installation and offline plan access. |
| 22 | Add notification permission and quiet-hours preferences. |
| 23 | Add export/import of a learner's local plan. |
| 24 | Add accessible goal setting without punitive streak mechanics. |
| 25 | Add calendar integration settings and timezone clarity. |
| 26 | Add screen-reader review of timer, charts and scheduling. |
| 27 | Test timer behavior across background/visibility transitions. |
| 28 | Run full regression for scheduling, persistence and export. |
| 29 | Complete onboarding, privacy, accessibility and user docs. |
| 30 | Release-candidate review, all checks, known limits and release notes. |

Mark each day Done, In progress or Blocked. Keep the next ticket ready and add discoveries with rationale.

- Day 01: Done. The sample plan and repeat schedule now use typed, validated records; demo activity is labeled and no streak claim is shown. Next is Day 02, accurate timer state, pause/resume and completion behavior.
- Review carry-over for Day 02: the visible 25-minute timer remains presentation-only and is not yet tied to elapsed time or the selected session duration.

## Process change effective Day 02 — 2026-10-27

Apply [DELIVERY-POLICY.md](DELIVERY-POLICY.md) to every remaining ticket: finish Stillroom before the next repository, use meaningful scope-driven commits and deliver through its own reviewed PR. A blocked external gate needs a concrete record and next action. This adds delivery gates without moving Day 02–30 product work or changing completed history.

## Contribution integration — 2026-10-27

Effective Day 02: apply [CONTRIBUTING.md](CONTRIBUTING.md) inside existing tickets. At already scheduled weekly reviews, assess real feedback such as a reproducible pause/resume timing case with elapsed-time expectations; at documentation/setup tickets, improve a supportive study-session walkthrough with synthetic progress. Day 30 records actual contribution evidence and outstanding external dependencies. No day is renumbered and no quota or badge is a completion criterion. Next scope remains: Day 02 — accurate elapsed-time timer state, pause/resume and session completion.
