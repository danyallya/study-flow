# Stillroom Study Flow

Stillroom helps independent learners plan focused study without turning their day into a productivity contest. It gives students a gentle session plan, a focus timer and a view of steady progress across the week.

## Foundation
The workspace includes a 25-minute focus session, a three-item study plan, a weekly rhythm summary and a small activity chart. It uses shadcn/ui-style local components built with Radix Slot, class-variance-authority and Tailwind, with React Icons for navigation and actions.

The starter does not persist data and the timer is a UI foundation. The 30-day roadmap adds reliable timer behavior, recurring schedules, subject organization, offline/PWA support, accessibility, reports and PDF/Excel exports.

## Run locally
Use Node.js 20 or newer. The local .npmrc is ignored by Git.

    npm ci
    npm run dev

Run npm test, npm run typecheck and npm run build before a release. The interface adapts to phone, tablet and desktop and includes light and dark themes.

## Product principles
Support sustainable study habits with flexible plans, rest and encouraging language. Do not use streaks to shame or rank learners. Keep progress private by default, make motion optional, and design controls for keyboard and screen-reader use.

### Study session and repeat schedule model
`src/domain/study.ts` defines date-only study plans, subject-linked sessions, and daily/weekly repeat schedules. Session times are local `HH:MM` values; durations must be 5–240 minutes. Weekly schedules require at least one unique weekday, while daily schedules do not use weekday selections. The current three-session plan and Tuesday Spanish schedule are fictional in-memory examples and reset on reload; the timer is still a visual foundation.

## Delivery and review

Stillroom review checks elapsed-time accuracy, pause/resume/completion semantics and honest persistence claims while preserving supportive language and private learner progress. Follow [DELIVERY-POLICY.md](DELIVERY-POLICY.md) from Day 02 for sequential execution, scope-driven commits and this repository's separate branch/PR with GitHub panel review and merge.
