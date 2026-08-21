# AbleSpace — Task Management System

A responsive full-stack task management application developed as part of the **Full Stack Developer (Fresher) Technical Assessment**.

The application was implemented based on the provided Figma design, with a focus on visual accuracy, responsive behavior, reusable components, task management functionality, theme support, guest access, validation, and a structured backend API.

---

## 🔗 Project Links

- **Live Demo / Guest Login:** [Open AbleSpace Guest Login](https://ablespace-task-management-orcin.vercel.app/login)
- **Dashboard:** [Open AbleSpace Dashboard](https://ablespace-task-management-orcin.vercel.app/)
- **GitHub Repository:** [View GitHub Repository](https://github.com/adhithkr345-boop/ablespace-task-management)
- **Backend API:** [Open Backend API](https://ablespace-task-manageme.onrender.com)
- **Tasks API:** [Open Tasks API](https://ablespace-task-manageme.onrender.com/tasks)
- **Part 2 Product Understanding:** [View Part 2 Submission](https://github.com/adhithkr345-boop/ablespace-task-management/blob/main/docs/AbleSpace_Part_2_Product_Understanding_Final_Submission.pdf)

---

## 📋 Assessment

This project was completed for the **Full Stack Developer (Fresher) – Technical Assessment**.

The assessment required:

- Building a Task Management System based on a provided Figma design
- Implementing theme support with persistence
- Guest login
- Reusable frontend components
- Clean backend APIs
- Request validation
- Responsive design
- Product understanding of the AbleSpace Caseload → Take Data workflow
- UX/UI and functionality improvement recommendations

---

# ✨ Features

## Task Management

The application provides a task-management workspace where users can:

- View tasks grouped by status
- Create new tasks
- Start tasks
- Complete tasks
- Delete tasks
- View task priority
- View assigned members
- View task due dates
- Organize work across projects

The main Tasks interface displays task groups such as **To Do** and **Doing**, with task information and available actions.

## 🔎 Search & Filtering

The task workspace includes controls for:

- Searching tasks
- Selecting displayed fields
- Filtering task information

These controls help users find and manage tasks more efficiently.

## 📁 Projects

A Projects section is provided through the main workspace navigation, allowing tasks to be organized within projects.

## 👤 Guest Account

The application supports a guest-account experience for accessing the task-management workspace.

Users can access the Guest Login page and enter the task-management dashboard.

## 🌙 Theme Support

The interface includes theme switching.

The selected theme is persisted across page refreshes so the user's preference is retained.

## 📱 Responsive Design

The application is designed to provide a usable experience across:

- Desktop
- Tablet
- Mobile

The layout adapts to different viewport sizes while maintaining access to the primary task-management functionality.

## 🧩 Reusable Components

The frontend is organized using reusable components to avoid unnecessary duplication and make the application easier to maintain and extend.

---

# 🛠️ Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend

- NestJS
- TypeScript
- REST APIs
- TypeORM
- Request validation

## Database

- SQLite
- TypeORM

---

# 📂 Project Structure

```text
AbleSpace/
│
├── backend/
│   ├── src/
│   │   ├── tasks/
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   └── main.ts
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── components/
│   │   ├── login/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── package.json
│
├── docs/
│   └── AbleSpace_Part_2_Product_Understanding_Final_Submission.pdf
│
├── .gitignore
└── README.md
🚀 Getting Started
Prerequisites

Make sure you have the following installed:

Node.js
npm
Git
1. Clone the Repository
git clone https://github.com/adhithkr345-boop/ablespace-task-management.git
cd ablespace-task-management
2. Install Frontend Dependencies

From the project root:

cd frontend
npm install
3. Install Backend Dependencies

Open another terminal from the project root:

cd backend
npm install
4. Configure Environment Variables

For local frontend development, create:

frontend/.env.local

Add:

NEXT_PUBLIC_API_URL=http://localhost:4000

Do not commit environment files containing secrets.

5. Start the Backend

From the backend directory:

npm run start:dev

The backend runs locally at:

http://localhost:4000

The Tasks API is available at:

http://localhost:4000/tasks
6. Start the Frontend

From the frontend directory:

npm run dev

The frontend runs locally at:

http://localhost:3000
🎨 Design Implementation

The application was implemented from the Figma design supplied with the assessment.

The implementation focuses on:

Layout
Typography
Spacing
Colors
Borders
Buttons
Sidebar navigation
Task sections
Priority indicators
Member indicators
Due dates
Theme controls
Responsive behavior

Interactive functionality was added to turn the provided design into a working task-management application.

Intentional Adaptations

The original design is a visual reference, while the submitted application is interactive.

Some elements were adapted to support actual application behavior, including:

Task creation and management
Task status changes
Search and filtering
Theme persistence
Guest access
Responsive layouts
Backend API integration
📱 Responsive Behavior

The application was designed to adapt the task-management workspace to different screen sizes.

The responsive implementation considers:

Navigation
Task lists
Action controls
Search and filtering
Theme controls
Content spacing
Mobile usability

The mobile layout can be tested using the browser's responsive/device toolbar.

🌙 Theme Persistence

Theme switching is implemented as part of the application.

When a user changes the theme, the selected preference is persisted so that refreshing the page does not reset the user's chosen theme.

🔐 Environment & Git

Environment files and generated/dependency directories are excluded from version control.

The repository .gitignore excludes items such as:

node_modules/
.next/
out/
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

This prevents dependencies, build output, and sensitive environment configuration from being uploaded to GitHub.

🧪 Validation

The backend uses NestJS validation pipes to help ensure that incoming request data conforms to the expected structure before being processed.

The application also provides frontend interaction feedback where applicable.

📄 Part 2 — Product Understanding

As part of the assessment, the AbleSpace Caseload → Take Data workflow was reviewed.

The submitted Part 2 document explains the workflow in my own words and includes screenshots and evidence from the observed application.

The workflow documented in the submission covers:

Opening the Caseload list
Selecting a student
Using the student's Take Data action
Reviewing the student and session context
Selecting a goal
Reviewing the goal instruction and Trial/Phase context
Recording an observation through the Capture view
Using Undo when a correction is required
Reviewing information through Graph, Stats, and Info views

The document intentionally avoids assuming behavior that was not directly observed during the review.

UX/UI Observations

The review identified several strengths:

Clear separation between student/session information, goals, and the capture workspace
Efficient goal switching
A prominent primary capture action
Separate Capture, Graph, Stats, and Info views

It also identified areas where the experience could be improved, including:

Density of top-bar controls
Stronger active-goal and trial context
Better handling of long goal descriptions
Recommended Improvements

The Part 2 submission recommends:

Making the active goal and Trial/Phase more prominent
Adding immediate capture confirmation
Reducing top-bar cognitive load
Supporting faster repeated data entry
Improving responsive behavior
Providing a clearer recovery/Undo experience
Part 2 Submission

Open the Part 2 Product Understanding PDF

📦 Additional Libraries

The exact dependencies used by the project are available in:

frontend/package.json
backend/package.json

This keeps the README aligned with the actual installed dependencies.

🚀 Deployment
Frontend

The Next.js frontend is deployed using Vercel.

Live Demo / Guest Login:

Open AbleSpace Guest Login

Dashboard:

Open AbleSpace Dashboard

Backend

The NestJS backend is deployed using Render.

Backend URL:

Open Backend API

Tasks API:

Open Tasks API

The deployed application is publicly accessible for the assessment review period.

📝 Assumptions
The provided Figma design was treated as the primary visual reference.
Interactive behavior was implemented where required to make the design functional.
Responsive behavior was adapted for viewport sizes not explicitly represented in the design.
Equivalent implementation choices may be used where an exact design asset or interaction was not available.
Environment-specific configuration is provided through environment variables.
The Part 2 product-understanding analysis is based on the interface and behavior directly observed during the review.
👨‍💻 Author

Adhith KR

Full Stack Developer — Fresher

Built as part of the Full Stack Developer (Fresher) Technical Assessment.

📌 Assessment Note

AI-assisted development tools were used during development where applicable.

The submitted implementation is intended to be fully understood and explainable by the developer, in accordance with the assessment requirements.
