# TaskFlow - Modern React Task Management Dashboard

**TaskFlow** is a clean, modern, and production-ready Task Management Web Application built with **React.js**, **Vite**, **Lucide React icons**, and **LocalStorage** for data persistence.

Designed as a modern productivity dashboard, TaskFlow allows users to create, manage, filter, search, update, and track tasks seamlessly without requiring a backend database.

---

## Features

- 📊 **Interactive Dashboard**: Overview KPI summary cards (Total, Completed, In Progress, Pending), completion progress bar, and priority breakdown charts.
- ➕ **Add / Edit Task Modal**: Full form validation for Task Title, Description, Priority (Low, Medium, High), Status (Pending, In Progress, Completed), Category, and Due Date.
- 🔍 **Real-Time Search & Multi-Filters**: Instant text search across title & description, status tab filters, priority filters, and multi-field sorting (Due Date, Priority, Title, Created Date).
- 🏷️ **Dynamic Status Badges**: Quick interactive status toggles on task cards.
- ⚠️ **Overdue Tracking**: Visual indicators for tasks past their due dates.
- 🗑️ **Action Confirmation Dialog**: Safety confirmation modal before task deletion.
- 📱 **Fully Responsive Layout**: Adaptive mobile drawer navigation, sticky header, and responsive grid layouts.
- 💾 **LocalStorage Data Persistence**: Persistent state across browser reloads, pre-populated with realistic sample workflow data on first launch.

---

## Tech Stack

- **Framework**: React.js (v19) with Vite
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (Custom Design System, Glassmorphism, CSS Custom Variables)
- **State Persistence**: Custom `useLocalStorage` React Hook

---

## Local Development Instructions

### 1. Prerequisites
Ensure you have **Node.js** (v18.0.0 or higher) and **npm** installed on your system.

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## Production Build & Verification

### 1. Build Production Bundle
To compile the static production assets, run:
```bash
npm run build
```
This generates optimized static HTML, JavaScript, and CSS bundle files in the `dist/` directory.

### 2. Preview Production Build Locally
To test the built production bundle locally:
```bash
npm run preview
```

---

## CI/CD Pipeline & Deployment Guide

TaskFlow is structured to be production-ready for automated CI/CD deployment via **GitHub Actions** and **Render** (or Vercel / Netlify).

### 1. Push Code to GitHub

Initialize git, add your files, and commit:
```bash
git init
git add .
git commit -m "feat: initial release of TaskFlow application"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/TaskFlow.git
git push -u origin main
```

### 2. Configure GitHub Actions Workflow (Optional)

To enable automated testing and build checks on every push or Pull Request, create a file at `.github/workflows/ci.yml`:

```yaml
name: TaskFlow CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run Build Check
        run: npm run build
```

### 3. Deploying to Render

1. Log into your [Render Dashboard](https://dashboard.render.com).
2. Click **New +** and select **Static Site**.
3. Connect your GitHub repository (`TaskFlow`).
4. Configure site build settings:
   - **Name**: `taskflow-app`
   - **Branch**: `main`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Click **Create Static Site**. Render will automatically pull code on push, run `npm run build`, and publish your app with an SSL HTTPS domain.

---

## License

MIT License © 2026 TaskFlow.
