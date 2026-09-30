# RapL Learning Dashboard – Web Developer Assessment
## LIVE DEMO
https://learning-dashboard-ecru-theta.vercel.app/dashboard
## Live Project
**GitHub:** https://github.com/aakash0606/Learning-Dashboard

---

## Project Overview & Connectivity

This is a **Single Page Application (SPA)** built using **Angular 16**. Here is how all the parts connect together:

```
AppModule (app.module.ts)
  ├── AppComponent          → Root shell: contains Navbar + <router-outlet>
  ├── AppRoutingModule      → Maps URLs to components
  │     ├── /dashboard      → DashboardComponent
  │     ├── /courses        → CourseListComponent
  │     ├── /courses/:id    → CourseDetailsComponent
  │     └── /add-course     → AddCourseComponent
  └── CourseService         → Shared state using BehaviorSubject (mock backend)
        ├── DashboardComponent  subscribes → shows stats
        ├── CourseListComponent subscribes → shows filtered/sorted list
        ├── CourseDetailsComponent reads   → shows single course, updates status
        └── AddCourseComponent  writes     → adds new course to state
```

**Data Flow:**
- `CourseService` holds the app state (list of courses) in a `BehaviorSubject`.
- All components inject `CourseService` and subscribe to its `courses$` observable.
- When a course is added or its status is updated, `CourseService` emits a new value, and all subscribed components update automatically in real time.

---

## 1. Approach & Technical Decisions

### Project Structure
```
learning-dashboard/
├── src/
│   ├── app/
│   │   ├── models/           # TypeScript interfaces (Course)
│   │   ├── services/         # CourseService (state management)
│   │   └── components/
│   │       ├── navbar/       # Navigation bar
│   │       ├── dashboard/    # Stats overview
│   │       ├── course-list/  # List with search, filter, sort
│   │       ├── course-details/ # Single course view
│   │       └── add-course/   # Reactive form to add course
│   ├── index.html
│   ├── main.ts
│   └── styles.css            # Global responsive CSS
├── angular.json
├── tsconfig.json
└── package.json
```

### Key Decisions
- **State Management:** Used `BehaviorSubject` in `CourseService` to simulate a real backend. All components share the same reactive data stream.
- **Reactive Forms:** Used Angular Reactive Forms in the Add Course page for better validation control and cleaner code.
- **Angular Router:** Implemented route parameters (`/courses/:id`) to navigate to a specific course's detail page.
- **Responsive Layout:** Used CSS Grid with `auto-fit` and `minmax` to create a responsive card layout that works on all screen sizes without any external library.

### What I would improve with more time
- Replace mock data with real HTTP API calls using Angular's `HttpClient`.
- Add Angular Material for a polished UI.
- Add route guards (e.g., `CanActivate`) for authentication.
- Write unit tests using Jasmine/Karma for all components and services.
- Add toast notifications for user feedback on actions.

---

## 2. Debugging Challenge

**User Report:** *"I clicked the Start Course button, but nothing happened."*

### Step 1 – Check the Browser Console
I would open **Chrome DevTools → Console tab** and look for:
- JavaScript errors such as `TypeError`, `null reference`, or `undefined is not a function` that would prevent the click handler from running.
- Any Angular-specific errors or unhandled exceptions logged during the click.

### Step 2 – Check the Network Tab
I would go to **DevTools → Network tab** and:
- Filter by `XHR` / `Fetch` requests and click the button again.
- Check if an API request (e.g., `PATCH /courses/:id`) was sent.
- If a request was made, I would inspect its **status code**:
  - `200 OK` → The server processed it, so the issue is likely a UI state update bug.
  - `401 Unauthorized` → The user's session has expired.
  - `500 Server Error` → A backend issue needs to be fixed.
- If **no request was made**, the bug is purely in the front-end click handler logic.

### Step 3 – Questions to Ask the User
- Which course were you trying to start? (Is it a specific course or all courses?)
- Which browser and device were you using?
- If you refresh the page, does the course status now show as "In Progress"? (This tells us if the data was saved but the UI failed to update.)
- Did you see any loading indicator or just nothing at all?

### Step 4 – Reproduce the Issue
- I would log into the app with a test account, find the same course, and click the button myself.
- If reproducible, I would add `console.log()` statements inside the `startOrContinue()` method to trace exactly where execution stops.
- I would also check `*ngIf` conditions in the template to ensure the button is actually rendering and not being hidden by a logic error.

---

## 3. WordPress Challenge

**Task:** Add a new page to `getrapl.com` explaining **RapL Genie** — responsive, with text, images, and a CTA button.

### How I Would Create the Page

1. Log into the WordPress Admin Dashboard at `getrapl.com/wp-admin`.
2. Navigate to **Pages → Add New**.
3. Give the page the title **"RapL Genie"**.
4. Use the **Gutenberg Block Editor** (or the site's existing page builder like Elementor or WPBakery) to design the layout by adding blocks:
   - **Heading block** – For the main title and section headings.
   - **Paragraph block** – For descriptive content about RapL Genie.
   - **Image block** – To add relevant visuals.
   - **Buttons block** – For the Call-to-Action button.
   - **Columns block** – To create side-by-side text and image sections.

### How I Would Make It Responsive

- I would use the built-in **Columns block** which automatically stacks vertically on mobile screens.
- I would use **percentage-based widths** instead of fixed pixel widths for image sizes.
- I would use the **preview mode** (Desktop / Tablet / Mobile toggle) in the block editor to verify the layout at every screen size before publishing.
- I would avoid inline pixel widths or hardcoded layouts that break on smaller screens.

### How I Would Handle Images

- I would compress all images before uploading (using a tool like TinyPNG) to keep page load fast.
- I would upload images to the **WordPress Media Library**.
- In the Image block, I would always add descriptive **Alt Text** for accessibility and SEO.
- I would use the **Full Size** or **Large** image setting and let CSS control the display size, not hardcoded HTML attributes.

### How I Would Avoid Breaking Existing Pages

- I would keep the new page as a **Draft** until it's fully reviewed.
- I would **only edit this specific page** and not touch any global settings (Theme Customizer, Header, Footer, global CSS).
- I would not add any custom PHP snippets or plugins that could affect site-wide behavior.
- I would take a **backup of the site** before making any changes (using a plugin like UpdraftPlus), as a safety net.

### How I Would Test Before Publishing

1. Click **Preview → Preview in new tab** to see the live draft.
2. Use **Chrome DevTools → Device Toolbar** to test on simulated Mobile, Tablet, and Desktop sizes.
3. Click the **CTA button** to verify it links to the correct URL and opens correctly.
4. Read through all the text to check for spelling or formatting issues.
5. Check that images load correctly and are not stretched or pixelated.
6. Once everything is verified and approved by the team, click **Publish**.
