# GradeWise multi-page redesign source bundle

This bundle is prepared for the existing AppDeploy Next.js pages-router app `gradewise-learning-portal-8fmrs4`.

## What is included
- Dedicated routes: `/materials`, `/videos`, `/exams`, `/tutor`, `/quizzes`, `/account`, `/about`, `/pricing`, `/signin`, `/privacy`, `/terms`.
- Shared responsive forest-green navigation and footer.
- Email-only passwordless AppDeploy sign-in configuration (`appdeploy.auth-login.json`).
- Auth gate for learning pages and backend `requireAuth()` on the Sage tutor and AI quiz endpoints.
- New landing page with navigation cards instead of a single long scroll.
- Functional frontend forms calling the existing `/api/tutor` and `/api/quiz` API endpoints.

## Apply to AppDeploy
Copy these files into the root of the existing app, preserving the listed paths. Replace `pages/index.tsx`, `pages/_app.tsx`, `styles/global.css`, and `backend/index.ts`; add the new page and component files; add `appdeploy.auth-login.json` at the project root. Keep the existing `package.json`, Next.js config, Tailwind config and tsconfig unless you have a separate reason to change them. The app already uses `lucide-react` and `@appdeploy/client` in its current source.

## Important limits before public launch
- This source bundle has not been built or deployed inside your AppDeploy environment. Run its build/QA after importing it and fix any environment-specific issues.
- The resource catalogue is illustrative sample content. Add your actual reviewed learning materials and authorised past papers.
- The sign-in flow is real AppDeploy email-link auth. Learning routes are gated and the AI API endpoints require a valid signed-in user.
- The account page currently shows the signed-in identity, but progress, purchases and quiz scores are not persisted to a database yet.
- There is no real payment provider or paid-resource fulfilment in this bundle. The pricing page is transparent about that.
- Privacy and terms pages are starter placeholders. Replace with reviewed policies and configure the real legal URLs in `appdeploy.auth-login.json` before production.
- The video page links to YouTube search results, not curated embedded video IDs. Add reviewed links before launch.
