# ☕ Qargo Notes

Qargo Notes is a simple fullstack note-taking application developed as part of a technical assessment. It allows users to register, log in, and manage their personal notes in a friendly and responsive interface.

---

## 📌 Project Goal

The goal of the technical assessment was to build a fully functional note-taking application that allows users to:

- Create and delete notes
- Display the notes on a user-specific dashboard
- Use a responsive and user-friendly UI/UX

The initial requirements did not specify technology constraints, but encouraged creativity and good software practices.

---

## ⚙️ Major Technologies

- **Next.js 14** – Fullstack framework used for both frontend and backend.
- **React** – Base library for building the user interface.
- **Node.js** – Runtime environment for backend functionality via API routes.
- **Tailwind CSS** – Utility-first styling for rapid and responsive UI design.
- **Neon.tech** – PostgreSQL serverless database.
- **Vercel** – Deployment platform for the frontend/backend.

---

## 📦 Additional Libraries

- **Prisma ORM** – Type-safe database toolkit used to define and access PostgreSQL schema.
- **ShadCN UI** – Headless component library built on Radix and Tailwind.
- **Zod** – Schema validation library for validating data on both client and server.

---

## ✨ Features Implemented

- User authentication (login/register) using sessions.
- Note creation and deletion.
- Real-time note list updates using state management.
- Empty state visual with icon and message.
- Notes organized in responsive grid layout.
- Modal form for adding new notes.
- Skeleton loaders for smooth UX during data fetching.
- Always-visible Navbar and Footer.
- Display of note creation date in friendly format.
- Search bar to filter notes by title.
- Responsive UI for all screen sizes.
- Prevent creation of blank notes.

---

## 🌐 API Endpoints

- `POST /api/register` – Register a new user.
- `POST /api/login` – Log in an existing user.
- `POST /api/logout` – Log out the current session.
- `GET /api/notes?userId=...` – Get all notes for a user.
- `POST /api/notes` – Create a new note.
- `DELETE /api/notes/:id` – Delete a note by ID.

---

## 🧪 Future Improvements

- Internationalization (i18n) support.
- UI and API test coverage.
- Edit note functionality.
- Dark/light theme toggle.
- Drag-and-drop note sorting.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nicolas1102/qargo-notes
cd qargo-notes
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file with the following:

```
DATABASE_URL=postgresql://<your-neon-url>
```

### 4. Push schema and generate client

```bash
npx prisma db push
npx prisma generate
```

### 5. Run the dev server

```bash
npm run dev
```

The app should be running at [http://localhost:3000](http://localhost:3000)

---

## 🙌 Credits

Made with ☕ by Nicolás Díaz as part of a technical assessment.