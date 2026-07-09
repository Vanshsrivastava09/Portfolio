# Vansh Srivastava — Portfolio

A modern, interactive developer portfolio built with Next.js 14, TypeScript, and Tailwind CSS, featuring a bold neo-brutalist design, live GitHub stats, and a scrolling highlight marquee.

**Live site:** (https://vansh-portfolio-el.vercel.app/)](#) <!-- replace with your actual Vercel URL -->

---

## ✨ Features

- **Bold neo-brutalist design** — thick borders, flat color blocks, hard drop shadows, and a bold italic display font
- **Animated loading screen** with progress indicator on first visit
- **Live GitHub stats card** — pulls real public repo count, top languages, and last-active date via the GitHub REST API
- **"By the Numbers" section** — quick-scan credibility stats for recruiters
- **Diagonal scrolling marquee** highlighting availability and skills
- **Fully responsive** — clean layout from mobile to large desktop screens
- **Downloadable resume** button linked directly to a PDF
- **Smooth-scroll navigation** across all sections
- **SEO-ready** with meta tags and Open Graph support

---

## 🛠️ Tech Stack

| Category | Tools |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | Google Fonts (via `next/font`) |
| Deployment | Vercel |

---

## 📁 Project Structure

```
vansh-portfolio/
├── app/
│   ├── layout.tsx        # Root layout, fonts, metadata
│   ├── page.tsx           # Main portfolio page (all sections)
│   └── globals.css        # Global styles & Tailwind directives
├── public/
│   ├── resume.pdf          # Downloadable resume
│   ├── favicon.svg
│   └── og-image.svg
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm (or yarn/pnpm)

### Installation

```bash
git clone https://github.com/Vanshsrivastava09/vansh-portfolio.git
cd vansh-portfolio
npm install
```

### Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site. It auto-updates as you edit files.

### Production Build

```bash
npm run build
npm start
```

---

## ☁️ Deployment (Vercel)

This project is optimized for zero-config deployment on [Vercel](https://vercel.com).

**Option A — Via GitHub (recommended):**
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import the `vansh-portfolio` repository
4. Vercel auto-detects Next.js — click **Deploy**
5. Every future `git push` to `main` automatically redeploys the site

**Option B — Via Vercel CLI:**
```bash
npm i -g vercel
vercel
```

---

## 🎨 Customization

- **Content:** Update copy, project details, and skills directly in `app/page.tsx`
- **Colors:** Adjust the color palette in `tailwind.config.js`
- **Resume:** Replace `public/resume.pdf` with your latest resume file
- **GitHub stats:** The stats card fetches from `https://api.github.com/users/<username>/repos` — update the username in the relevant component if forking this project

---

## 📬 Contact

- **Email:** vansh23srivastava@gmail.com
- **GitHub:** [github.com/Vanshsrivastava09](https://github.com/Vanshsrivastava09)
- **LinkedIn:** [linkedin.com/in/vanshsrivastava09](https://www.linkedin.com/in/vanshsrivastava09/)

---

## 📄 License

This project is open for personal reference. Please avoid direct duplication of design/content if building your own portfolio — use it as inspiration instead.
