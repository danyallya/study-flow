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
| 01 | Define study session, subject and repeat-schedule models. |
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
