# PrashWeb - Personal Portfolio of Prashant Singh

A modern, professional, fully responsive digital portfolio and CMS application built for **Prashant Singh** (BCA Student | Tech Enthusiast | Aspiring Professional).

![PrashWeb Preview](https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200)

## 🌟 Key Features

- **Personal Information**:
  - **Name**: Prashant Singh
  - **Mobile**: `9628676007`
  - **Email**: `prashantsingh00887@gmail.com`
  - **LinkedIn**: `linkedin.com/in/prashant-singh-8b7209348`
- **1. Hero Section**: Dynamic greetings, status pill, profile photo upload & change, stats counter, and direct action CTAs (View Projects, Download CV, Contact Me, LinkedIn).
- **2. About Me**: Interactive tabs covering Bio, Career Objective, Professional Goals, Interests, and Key Milestones.
- **3. Education Timeline**: Structured timeline for College (BCA 2nd Year, Expected 2027), Senior Secondary School (12th PCM), and High School (10th), with subjects, scores, and easy addition of future degrees.
- **4. Skills Matrix**: Categorized cards (Programming, Web Development, Database & Tools, Analytical, Creative) with search filter, proficiency percentage indicators, and scope details.
- **5. Featured Projects**: Interactive cards with category filters, deep-dive project modal, screenshots gallery, and direct video player. Includes:
  - *Event Booking & Management System*
  - *Library Management System*
  - *AI Resume Screening & Job Matching System*
  - *Personal Finance & Expense Tracker*
  - *PrashWeb Portfolio Platform*
- **6. Certificates & Courses**: Verified credentials gallery with organization badges, issue dates, credential ID copy tool, and full preview modals.
- **7. My Achievements & Memories**: Special multimedia gallery supporting both **Photos** and **Videos** with inline/lightbox playback and category filters (*All | Achievements | College | Events | Certificates | Memories*).
- **8. My Resume / CV**: Formatted digital CV viewer designed with CSS `@media print` for standard clean A4 printing, single-click PDF download, and PDF replacement upload tool.
- **9. LinkedIn Section**: Dedicated connection card linking directly to `linkedin.com/in/prashant-singh-8b7209348`.
- **10. Contact Me**: Phone (+91 9628676007), Email, direct Call/WhatsApp/Email buttons, and validated contact form with message inbox storage.
- **11. PrashWeb AI**: Portfolio-specific RAG assistant with floating button, grounded strictly on Prashant's real portfolio data with zero hallucinations and authentic fallback response.
- **12. Admin CMS Portal**: Passcode-protected dashboard allowing Prashant to add, edit, or delete all content (Profile, Education, Skills, Projects, Certificates, Memories, CV, Messages, and JSON Backup/Restore) without modifying code!
- **13. Design & Themes**: Premium glassmorphism, responsive mobile-first architecture, sticky navbar with mobile drawer, and persistent Light / Dark mode toggle.
- **15. Footer**: Brand info, quick navigation links, direct channels, and copyright `© 2026 Prashant Singh. All Rights Reserved.`

---

## 🚀 Quick Start & Running Locally

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Run Production Server
```bash
node server.js
```
Open **[http://localhost:5000](http://localhost:5000)** in your web browser.

### 2. Run in Development Mode (with hot reloading)
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🔐 Admin Portal Access
- **Private Access**: Access the Admin CMS anytime by visiting `/#admin` in the URL, pressing `Ctrl + Shift + A` on the keyboard, or double-clicking the purple "P" logo in the header.
- **Passcode Management**: You can customize your passcode anytime inside the **Backup & Settings** tab in the Admin dashboard.

---

## 📁 Project Structure

```
├── public/
│   └── favicon.svg           # Custom SVG favicon (Stylized "P")
├── src/
│   ├── components/
│   │   ├── About.jsx          # About Me section with interactive tabs
│   │   ├── Achievements.jsx   # My Achievements & Memories gallery
│   │   ├── AdminModal.jsx     # Protected Admin CMS Portal with full CRUD
│   │   ├── CertificateModal.jsx # Certificate preview modal
│   │   ├── Certificates.jsx   # Certificates & Courses showcase
│   │   ├── Contact.jsx        # Contact Me section & validated form
│   │   ├── Education.jsx      # College & School Education timeline
│   │   ├── Footer.jsx         # Footer with copyright © 2026 Prashant Singh
│   │   ├── GitHub.jsx         # Dedicated GitHub showcase section
│   │   ├── Hero.jsx           # Hero banner with profile photo upload & CTAs
│   │   ├── LinkedIn.jsx       # Dedicated LinkedIn connection card
│   │   ├── MediaLightbox.jsx  # Fullscreen photo & video player modal
│   │   ├── Navbar.jsx         # Sticky navigation with theme toggle & AI button
│   │   ├── PrashWebAI.jsx     # Grounded AI Portfolio Assistant
│   │   ├── ProjectModal.jsx   # Project deep-dive modal with video & screenshots
│   │   ├── Projects.jsx       # Project showcase cards with category filter
│   │   ├── Resume.jsx         # Printable digital CV with PDF upload/download
│   │   └── Skills.jsx         # Categorized skills matrix with progress bars
│   ├── context/
│   │   └── PortfolioContext.jsx # Global state, localStorage sync, auth & CRUD
│   ├── data/
│   │   └── defaultData.js     # Default authentic portfolio data
│   ├── utils/
│   │   ├── aiKnowledgeEngine.js # Client-side RAG engine for PrashWeb AI
│   │   └── storage.js         # LocalStorage, JSON import/export & base64
│   ├── App.jsx
│   ├── index.css              # Tailwind CSS layers, glassmorphism & print rules
│   └── main.jsx
├── index.html                 # SEO metadata & fonts
├── package.json
├── server.js                  # Production static file & API server
├── tailwind.config.js
└── vite.config.js
```

---

## 🌐 Deploying Online

You can deploy PrashWeb directly to:
- **Vercel / Netlify**: Simply link your GitHub repository. Framework: Vite, Build command: `npm run build`, Output directory: `dist`.
- **Render / Railway**: Run `npm start` (which executes `node server.js`).
- **GitHub Pages**: Build the project and deploy the `dist` folder.
