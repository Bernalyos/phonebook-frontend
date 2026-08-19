# 📱 PhoneBook Client - Frontend (Angular)

Single Page Application (SPA) built with Angular and Bootstrap to manage a web-based phone book. It connects to the ASP.NET Core REST API to perform real-time contact filtering, creation, modification, and deletion.

---

## 🚀 Enlaces en Producción (Demo en Vivo)
* **Frontend (Vercel):** [Ver Aplicación en Vivo](https://phonebook-frontend-amber.vercel.app)
* **Backend API (Render):** [Documentación Swagger / API](https://agendabackend-p9qp.onrender.com/swagger/index.html)

---

## 📌 Features & Functional Requirements

* **Dynamic Data Grid:** Displays contacts with columns for Contact Type, Name, Phone Number, Comments, Custom Extra Fields, and Action Buttons (Edit/Delete).
* **Multi-Type Filtering:** Top checkboxes allow users to display any combination of contact types (Person, Public Organization, Private Organization).
* **Modal Dialogs (ng-bootstrap):**
  * **Add / Edit Modal:** Dynamic form supporting both standard inputs and contact-type-specific fields.
  * **Delete Confirmation Modal:** Prompts `"Are you sure you want to delete selected records?"` with **Yes** / **No** actions.
* **No Server-Side Rendering (SSR):** Fully client-rendered Single Page Application.
* **Responsive Styling:** Styled using Bootstrap for clean, mobile-friendly layouts.

---

## 🛠️ Tech Stack & Libraries

* **Angular (17+):** TypeScript-based framework for scalable SPA development.
* **Bootstrap 5:** UI framework for layout grid and utility styling.
* **ng-bootstrap:** Native Angular widgets for modal dialogs and interactive components.
* **RxJS:** Reactive programming for HTTP requests and event handling.

---

## 🗂️ Project Structure

```text
AgendaFrontend/
├── src/
│   ├── app/
│   │   ├── components/      # UI components (Contact Grid, Add/Edit Modal, Delete Modal)
│   │   ├── models/          # TypeScript interfaces (Contact, ContactType DTOs)
│   │   ├── services/        # HTTP services to interact with .NET API
│   │   ├── app.ts           # Root component
│   │   └── app.module.ts    # Module configuration & imports
│   ├── assets/              # Static assets and global styles
│   └── index.html           # Main HTML entry point
├── angular.json             # Angular CLI workspace configuration
└── package.json             # Dependencies and npm scripts
```

---

## 📋 Prerequisites

Make sure you have installed:
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [npm](https://www.npmjs.com/) (installed automatically with Node.js)
* [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)

---

## ⚙️ Installation & Running the Frontend

### 1. Switch to the Frontend Branch
```bash
git checkout AgendaFrontend
cd AgendaFrontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. API Base URL Configuration
Ensure the API service (`src/app/services/contact.service.ts`) points to your ASP.NET Core backend URL (e.g., your live Render backend URL or local API endpoint).

### 4. Run the Application
```bash
ng serve
```
Open `http://localhost:4200` in your web browser.
