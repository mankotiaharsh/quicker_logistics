# Quicker Logistics Inc — Website

Website for Quicker Logistics Inc, a cross-border trucking company (Canada ⇄ USA) hauling freight, machinery, lumber, wide/oversize and specialized shipments since 2018.

Built with React 18 + TypeScript + Vite.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # preview the production build
```

## Project structure

```
src/
├── data/site.ts            ← ALL content: company info, contact, services, stats, FAQ, images
├── router.tsx              ← tiny typed client-side router (History API, no deps)
├── App.tsx                 ← route table
├── components/
│   ├── Header.tsx          ← top bar, sticky header, dropdown nav, mobile drawer
│   ├── Footer.tsx
│   ├── Sections.tsx        ← reusable page sections
│   └── Icons.tsx           ← inline SVG icons
├── pages/
│   ├── Home.tsx
│   ├── ServicePage.tsx     ← template used by all service pages
│   ├── Contact.tsx         ← contact form (also used for "Send a Resume")
│   └── InnerPages.tsx      ← Services, About, Drive With Us, FAQ, legal, 404
└── styles/global.css
public/images/              ← photos and flags (sources in public/images/CREDITS.md)
```

## Routes

`/`, `/services`, `/freight-hauling`, `/machinery-transportation`, `/lumber-hauling`,
`/wide-oversize-shipments`, `/specialized-shipments`, `/about`, `/drive-with-us`, `/faq`,
`/contact`, `/send-a-resume`, `/privacy-policy`.

## Editing content

Change text, services, phone number and images in `src/data/site.ts`.
To use your own photos, replace the files in `public/images/` keeping the same names.

## Contact form

The form currently only logs to the console. Connect it to a form service (Formspree, EmailJS, or an API route) in `src/pages/Contact.tsx`.
