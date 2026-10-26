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
