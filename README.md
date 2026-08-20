# AbleSpace — Task Management System

A responsive full-stack task management application developed as part of the **Full Stack Developer (Fresher) Technical Assessment**.

The application was implemented based on the provided Figma design, with a focus on visual accuracy, responsive behavior, reusable components, task management functionality, theme support, guest access, and a structured backend API.

---

## 🔗 Project Links

* **Live Demo:** Add your deployed URL here
* **GitHub Repository:** Add your GitHub repository URL here
* **Part 2 Product Understanding:** [View Part 2 Submission](./docs/AbleSpace_Part_2_Product_Understanding_Final_Submission.pdf)

---

## 📋 Assessment

This project was completed for the **Full Stack Developer (Fresher) – Technical Assessment**.

The assessment required:

* Building a Task Management System based on a provided Figma design
* Implementing theme support with persistence
* Guest login
* Reusable frontend components
* Clean backend APIs
* Validation
* Responsive design
* Product understanding of the AbleSpace Caseload → Take Data workflow
* UX/UI and functionality improvement recommendations

---

# ✨ Features

## Task Management

The application provides a task-management workspace where users can:

* View tasks grouped by status
* Create new tasks
* Start tasks
* Complete tasks
* Delete tasks
* View task priority
* View assigned members
* View task due dates
* Organize work across projects

The main Tasks interface displays task groups such as **To Do** and **Doing**, with task information and available actions.

## 🔎 Search & Filtering

The task workspace includes controls for:

* Searching tasks
* Selecting displayed fields
* Filtering task information

These controls help users find and manage tasks more efficiently.

## 📁 Projects

A Projects section is provided through the main workspace navigation, allowing tasks to be organized within projects.

## 👤 Guest Account

The application supports a guest-account experience for accessing the task-management workspace.

## 🌙 Theme Support

The interface includes theme switching.

The selected theme is persisted across page refreshes so the user's preference is retained.

## 📱 Responsive Design

The application is designed to provide a usable experience across:

* Desktop
* Tablet
* Mobile

The layout adapts to different viewport sizes while maintaining access to the primary task-management functionality.

## 🧩 Reusable Components

The frontend is organized using reusable components to avoid unnecessary duplication and make the application easier to maintain and extend.

---

# 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* NestJS
* TypeScript
* REST APIs
* Request validation

### Database

* Database configured in the backend implementation

> The exact database technology and configuration are defined by the backend implementation.

---

# 📂 Project Structure

```text
AbleSpace/
│
├── backend/
│   ├── src/
│   └── package.json
│
├── frontend/
│   ├── app/
│   ├── components/
│   └── package.json
│
├── docs/
│   └── AbleSpace_Part_2_Product_Understanding_Final_Submission.pdf
│
├── .gitignore
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Git
* The database required by the backend

## 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd AbleSpace
```

## 2. Install frontend dependencies

```bash
cd frontend
npm install
```

## 3. Install backend dependencies

Open another terminal and run:

```bash
cd backend
npm install
```

## 4. Configure environment variables

Create the required environment files for the backend and frontend.

Do not commit environment files containing secrets.

Example:

```env
DATABASE_URL=your_database_connection
PORT=your_backend_port
```

Use the variable names required by the actual project configuration.

## 5. Start the backend

From the `backend` directory:

```bash
npm run start:dev
```

## 6. Start the frontend

From the `frontend` directory:

```bash
npm run dev
```

The frontend is configured to run locally at:

```text
http://localhost:3000
```

---

# 🎨 Design Implementation

The application was implemented from the Figma design supplied with the assessment.

The implementation focuses on:

* Layout
* Typography
* Spacing
* Colors
* Borders
* Buttons
* Sidebar navigation
* Task sections
* Priority indicators
* Member indicators
* Due dates
* Theme controls
* Responsive behavior

Interactive functionality was added to turn the provided design into a working task-management application.

### Intentional Adaptations

The original design is a visual reference, while the submitted application is interactive. Therefore, some elements were adapted to support actual application behavior, including task actions, filtering, theme persistence, and responsive layouts.

---

# 📱 Responsive Behavior

The application was designed to adapt the task-management workspace to different screen sizes.

The responsive implementation considers:

* Navigation
* Task lists
* Action controls
* Search and filtering
* Theme controls
* Content spacing
* Mobile usability

The mobile layout can be tested using the browser's responsive/device toolbar.

---

# 🌙 Theme Persistence

Theme switching is implemented as part of the application.

When a user changes the theme, the selected preference is persisted so that refreshing the page does not reset the user's chosen theme.

---

# 🔐 Environment & Git

Environment files and generated/dependency directories are excluded from version control.

The repository `.gitignore` excludes items such as:

```text
node_modules/
.next/
out/
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

This prevents dependencies, build output, and sensitive environment configuration from being uploaded to GitHub.

---

# 🧪 Validation

The backend uses request validation to help ensure that incoming data conforms to the expected structure before being processed.

Frontend interactions also provide validation and user feedback where applicable.

---

# 📄 Part 2 — Product Understanding

As part of the assessment, the AbleSpace **Caseload → Take Data** workflow was reviewed.

The submitted Part 2 document explains the workflow in my own words and includes screenshots/evidence from the observed application.

The workflow documented in the submission covers:

1. Opening the Caseload list
2. Selecting a student
3. Using the student's **Take Data** action
4. Reviewing the student and session context
5. Selecting a goal
6. Reviewing the goal instruction and Trial/Phase context
7. Recording an observation through the Capture view
8. Using Undo when a correction is required
9. Reviewing information through Graph, Stats, and Info views

The document intentionally avoids assuming behavior that was not directly observed during the review.

### UX/UI Observations

The review identified several strengths:

* Clear separation between student/session information, goals, and the capture workspace
* Efficient goal switching
* A prominent primary capture action
* Separate Capture, Graph, Stats, and Info views

It also identified areas where the experience could be improved, including the density of top-bar controls, stronger active-goal/trial context, and better handling of long goal descriptions.

### Recommended Improvements

The Part 2 submission recommends:

* Making the active goal and Trial/Phase more prominent
* Adding immediate capture confirmation
* Reducing top-bar cognitive load
* Supporting faster repeated data entry
* Improving responsive behavior
* Providing a clearer recovery/Undo experience

### Part 2 Submission

**[Open the Part 2 Product Understanding PDF](./docs/AbleSpace_Part_2_Product_Understanding_Final_Submission.pdf)**

---

# 📸 Screenshots

The application includes a task-management dashboard with:

* Guest account information
* Workspace navigation
* Tasks and Projects
* Task status groups
* Priority
* Members
* Due dates
* Search
* Fields
* Filters
* Add Task
* Theme switching

Additional screenshots can be added to the repository if required.

---

# 📦 Additional Libraries

The exact additional dependencies used by the project are available in:

```text
frontend/package.json
backend/package.json
```

This keeps the README aligned with the actual installed dependencies rather than listing libraries that are not used by the project.

---

# 🚀 Deployment

### Frontend

**Live URL:** Add deployed frontend URL here

### Backend

**API URL:** Add deployed backend URL here

The deployed application should remain publicly accessible for the assessment review period.

---

# 📝 Assumptions

* The provided Figma design was treated as the primary visual reference.
* Interactive behavior was implemented where required to make the design functional.
* Responsive behavior was adapted for viewport sizes not explicitly represented in the design.
* Equivalent implementation choices may be used where the exact design asset or interaction was not available.
* Environment-specific configuration is provided through environment variables.
* The Part 2 product-understanding analysis is based on the interface and behavior directly observed during the review.

---

# 👨‍💻 Author

**Adhizz**

Full Stack Developer — Fresher

Built as part of the Full Stack Developer Technical Assessment.

---

## 📌 Assessment Note

AI-assisted development tools were used during development where applicable.

The submitted implementation should be understood and explainable by the developer, in accordance with the assessment requirements.
