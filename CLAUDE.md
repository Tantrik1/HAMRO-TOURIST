\# CLAUDE.md — Hamro Tourist SaaS



> \*\*This file is the AI's single source of truth.\*\* Read it fully before touching any file. Every decision about code style, design, architecture, and tooling is answered here.



\---



\## 🗺️ What Is This Project?



\*\*Hamro Tourist\*\* is a multi-tenant SaaS platform for travel agencies. Agencies sign up, build their travel product catalogue (tours, treks, activities, packages), customize a website using a drag-and-drop builder, and publish it — first to `agencyname.hamrotourist.com`, then to their own custom domain.



The platform lives at `hamrotourist.com`. Every generated agency website lives at `agencyname.hamrotourist.com` (or `agencyname.com` after domain connection). Admin panels live at `app.hamrotourist.com` (shared) or `admin.agencyname.com` (white-label after domain connect).



\---



\## 📁 Monorepo Structure



```

hamrotourist/

├── apps/

│   ├── admin-frontend/          # Next.js 14 — agency dashboard (app.hamrotourist.com)

│   ├── website-renderer/        # Next.js 14 — renders all agency websites (ISR)

│   └── marketing-site/          # Next.js 14 — hamrotourist.com landing page

├── services/

│   ├── auth-service/            # NestJS — JWT auth, OAuth, RBAC

│   ├── tenant-service/          # NestJS — onboarding, schema provisioning, plan limits

│   ├── product-service/         # NestJS — tours, treks, activities, packages, itineraries, pricing

│   ├── website-builder-service/ # NestJS — theme config, sections, SEO, publish

│   ├── media-service/           # NestJS — Cloudflare R2 uploads, image variants

│   ├── domain-service/          # NestJS — custom domain verification, Cloudflare API

│   ├── crm-service/             # NestJS — contacts, leads, pipeline

│   └── notification-service/    # NestJS — Resend emails, BullMQ queue

├── packages/

│   ├── shared-types/            # TypeScript interfaces used by ALL apps and services

│   ├── theme-adventure-bold/    # Theme 1 React component library

│   ├── theme-serene-journey/    # Theme 2 React component library

│   ├── theme-heritage-classic/  # Theme 3 React component library

│   └── ui-components/           # Shared shadcn/ui + custom components

├── infra/

│   ├── k8s/                     # Kubernetes manifests \& Helm charts

│   ├── cloudflare/              # Workers, KV, wrangler configs

│   └── terraform/               # AWS / Hetzner IaC

├── migrations/

│   ├── master/                  # public schema migrations

│   └── tenant/                  # per-tenant schema migrations (run via CLI tool)

└── tools/

&#x20;   ├── tenant-migrate.ts        # CLI: apply tenant migrations to all schemas

&#x20;   └── seed.ts                  # Dev seed data

```



\---



\## ⚙️ Tech Stack — Non-Negotiable



\### Backend

| Layer | Technology | Notes |

|---|---|---|

| Language | TypeScript (strict mode) | `"strict": true` in all tsconfigs |

| Framework | NestJS | Modular, DI-first, ideal for microservices |

| ORM | TypeORM | Schema-aware; dynamic `search\_path` switching |

| Database | PostgreSQL 16 | Schema-per-tenant multi-tenancy |

| Cache | Redis (Upstash in prod) | Session store, config cache, BullMQ backend |

| Queue | BullMQ + Redis | All async jobs: DNS polling, image resize, email |

| Email | \*\*Resend\*\* | See Email section below — only use Resend |

| Storage | Cloudflare R2 | S3-compatible, zero egress fees |

| CDN / DNS | Cloudflare | Workers, KV, Custom Hostnames (for SaaS), R2 |

| API Docs | Swagger / OpenAPI | NestJS `@nestjs/swagger` — auto-generate on every service |



\### Frontend

| Layer | Technology | Notes |

|---|---|---|

| Framework | Next.js 14 (App Router) | All three frontend apps |

| Styling | Tailwind CSS v3 | Utility-first; no inline styles unless unavoidable |

| Components | shadcn/ui | Base component library — see Design System below |

| State | Zustand (global) + TanStack Query (server) | No Redux, no Context for server state |

| Forms | React Hook Form + Zod | Zod schema = single source of validation truth |

| Animations | Framer Motion | Page transitions, micro-interactions |

| DnD | @dnd-kit/core | Section reordering in Website Builder |

| Icons | Lucide React | Consistent icon set |

| Fonts | See Design System | Never use Inter, Roboto, or Arial |



\### Infra

| Layer | Technology |

|---|---|

| Containers | Docker + Docker Compose (dev) |

| Orchestration | Kubernetes / K3s (prod) |

| CI/CD | GitHub Actions |

| Monitoring | Grafana + Prometheus + Loki |

| Error Tracking | Sentry (with tenant context tag) |



\---



\## 🎨 Design System — THE LAW



> This platform targets \*\*Gen Z travel enthusiasts and modern agency owners\*\*. The aesthetic is \*\*Premium SaaS + Colorful Energy\*\*. Think: Linear.app's precision meets a saturated tropical gradient. Confident, alive, not corporate.



\### Core Aesthetic Principles



1\. \*\*Color is the personality\*\* — use it boldly. Gradients are encouraged. Flat gray UIs are forbidden.

2\. \*\*Motion tells the story\*\* — every interaction should feel alive. Framer Motion for page-level; CSS transitions for micro.

3\. \*\*Space is intentional\*\* — generous padding, clear hierarchy, no visual clutter.

4\. \*\*Typography has character\*\* — font choices define brand. See font stack below.

5\. \*\*Mobile is not a fallback\*\* — design mobile-first, then scale up.



\---



\### Color Palette (CSS Variables — define in `globals.css`)



```css

:root {

&#x20; /\* === BRAND PRIMARIES === \*/

&#x20; --ht-violet:        #7C3AED;   /\* Electric Violet — primary brand \*/

&#x20; --ht-violet-light:  #A78BFA;

&#x20; --ht-violet-dark:   #5B21B6;



&#x20; --ht-coral:         #F97316;   /\* Energetic Coral — accent/CTA \*/

&#x20; --ht-coral-light:   #FB923C;

&#x20; --ht-coral-dark:    #EA580C;



&#x20; --ht-cyan:          #06B6D4;   /\* Electric Cyan — highlight/badge \*/

&#x20; --ht-cyan-light:    #67E8F9;



&#x20; --ht-lime:          #84CC16;   /\* Fresh Lime — success states \*/

&#x20; --ht-rose:          #F43F5E;   /\* Hot Rose — error / danger \*/



&#x20; /\* === NEUTRALS (dark-first) === \*/

&#x20; --ht-ink:           #0A0A0F;   /\* Near-black background \*/

&#x20; --ht-surface:       #111118;   /\* Card surfaces \*/

&#x20; --ht-surface-2:     #1A1A24;   /\* Elevated cards \*/

&#x20; --ht-border:        #2A2A3A;   /\* Subtle borders \*/

&#x20; --ht-muted:         #3D3D52;   /\* Disabled / muted \*/

&#x20; --ht-text:          #F1F0FF;   /\* Primary text \*/

&#x20; --ht-text-soft:     #9B9BB8;   /\* Secondary text \*/

&#x20; --ht-text-faint:    #5C5C78;   /\* Placeholder / hint \*/



&#x20; /\* === GRADIENTS === \*/

&#x20; --ht-grad-primary:  linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%);

&#x20; --ht-grad-warm:     linear-gradient(135deg, #F97316 0%, #F43F5E 100%);

&#x20; --ht-grad-cool:     linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%);

&#x20; --ht-grad-lime:     linear-gradient(135deg, #84CC16 0%, #06B6D4 100%);

&#x20; --ht-grad-surface:  linear-gradient(145deg, #1A1A24 0%, #111118 100%);



&#x20; /\* === GLOW EFFECTS === \*/

&#x20; --ht-glow-violet:   0 0 40px rgba(124, 58, 237, 0.35);

&#x20; --ht-glow-coral:    0 0 40px rgba(249, 115, 22, 0.35);

&#x20; --ht-glow-cyan:     0 0 40px rgba(6, 182, 212, 0.35);



&#x20; /\* === SPACING SCALE === \*/

&#x20; --space-xs:  4px;

&#x20; --space-sm:  8px;

&#x20; --space-md:  16px;

&#x20; --space-lg:  24px;

&#x20; --space-xl:  40px;

&#x20; --space-2xl: 64px;

&#x20; --space-3xl: 96px;



&#x20; /\* === RADIUS === \*/

&#x20; --radius-sm:   6px;

&#x20; --radius-md:   12px;

&#x20; --radius-lg:   20px;

&#x20; --radius-xl:   32px;

&#x20; --radius-full: 9999px;

}

```



\### Light Mode Overrides (class="light" on html)

```css

.light {

&#x20; --ht-ink:       #FAFAFA;

&#x20; --ht-surface:   #FFFFFF;

&#x20; --ht-surface-2: #F4F4F8;

&#x20; --ht-border:    #E4E4EF;

&#x20; --ht-muted:     #C8C8D8;

&#x20; --ht-text:      #0A0A0F;

&#x20; --ht-text-soft: #5C5C78;

&#x20; --ht-text-faint:#9B9BB8;

}

```



\---



\### Typography



```css

/\* In globals.css — import from Google Fonts or Fontsource \*/



/\* Display / Headings — Syne: geometric, confident, futuristic \*/

@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800\&display=swap');



/\* Body — DM Sans: clean, readable, modern \*/

@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300\&display=swap');



/\* Mono — JetBrains Mono: for code snippets, prices, data \*/

@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500\&display=swap');



:root {

&#x20; --font-display: 'Syne', sans-serif;

&#x20; --font-body:    'DM Sans', sans-serif;

&#x20; --font-mono:    'JetBrains Mono', monospace;

}

```



\*\*Type Scale (Tailwind classes)\*\*

```

text-xs     → 12px  — badges, labels, captions

text-sm     → 14px  — secondary text, table cells

text-base   → 16px  — body copy

text-lg     → 18px  — lead paragraphs

text-xl     → 20px  — card titles

text-2xl    → 24px  — section subheadings

text-3xl    → 30px  — page headings (mobile)

text-4xl    → 36px  — page headings (desktop)

text-5xl    → 48px  — hero headlines (mobile)

text-6xl+   → 60px+ — hero headlines (desktop)

```



\*\*Rules:\*\*

\- Display font (`font-display`) for all headings (h1–h3), hero text, stat numbers

\- Body font (`font-body`) for all body copy, labels, nav, buttons, form fields

\- Mono font (`font-mono`) for prices, API keys, code, SKUs

\- Never use `font-sans` default (that's Inter) — always specify `font-display` or `font-body`



\---



\### Tailwind Config Additions



Add to `tailwind.config.ts`:



```typescript

import type { Config } from 'tailwindcss'



const config: Config = {

&#x20; darkMode: 'class',

&#x20; content: \['./src/\*\*/\*.{ts,tsx}', '../../packages/ui-components/src/\*\*/\*.{ts,tsx}'],

&#x20; theme: {

&#x20;   extend: {

&#x20;     fontFamily: {

&#x20;       display: \['Syne', 'sans-serif'],

&#x20;       body:    \['DM Sans', 'sans-serif'],

&#x20;       mono:    \['JetBrains Mono', 'monospace'],

&#x20;     },

&#x20;     colors: {

&#x20;       'ht-violet':  '#7C3AED',

&#x20;       'ht-coral':   '#F97316',

&#x20;       'ht-cyan':    '#06B6D4',

&#x20;       'ht-lime':    '#84CC16',

&#x20;       'ht-rose':    '#F43F5E',

&#x20;       'ht-ink':     '#0A0A0F',

&#x20;       'ht-surface': '#111118',

&#x20;       'ht-surface2':'#1A1A24',

&#x20;       'ht-border':  '#2A2A3A',

&#x20;       'ht-text':    '#F1F0FF',

&#x20;       'ht-soft':    '#9B9BB8',

&#x20;     },

&#x20;     backgroundImage: {

&#x20;       'grad-primary': 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',

&#x20;       'grad-warm':    'linear-gradient(135deg, #F97316 0%, #F43F5E 100%)',

&#x20;       'grad-cool':    'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)',

&#x20;       'grad-surface': 'linear-gradient(145deg, #1A1A24 0%, #111118 100%)',

&#x20;     },

&#x20;     boxShadow: {

&#x20;       'glow-violet': '0 0 40px rgba(124, 58, 237, 0.35)',

&#x20;       'glow-coral':  '0 0 40px rgba(249, 115, 22, 0.35)',

&#x20;       'glow-cyan':   '0 0 40px rgba(6, 182, 212, 0.35)',

&#x20;       'card':        '0 4px 24px rgba(0, 0, 0, 0.4)',

&#x20;       'card-hover':  '0 8px 40px rgba(0, 0, 0, 0.6)',

&#x20;     },

&#x20;     borderRadius: {

&#x20;       'xl2': '20px',

&#x20;       'xl3': '32px',

&#x20;     },

&#x20;     animation: {

&#x20;       'gradient-x':   'gradient-x 6s ease infinite',

&#x20;       'float':        'float 6s ease-in-out infinite',

&#x20;       'pulse-glow':   'pulse-glow 2s ease-in-out infinite',

&#x20;       'slide-up':     'slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)',

&#x20;       'fade-in':      'fade-in 0.3s ease-out',

&#x20;     },

&#x20;     keyframes: {

&#x20;       'gradient-x': {

&#x20;         '0%, 100%': { 'background-position': '0% 50%' },

&#x20;         '50%':      { 'background-position': '100% 50%' },

&#x20;       },

&#x20;       'float': {

&#x20;         '0%, 100%': { transform: 'translateY(0px)' },

&#x20;         '50%':      { transform: 'translateY(-10px)' },

&#x20;       },

&#x20;       'pulse-glow': {

&#x20;         '0%, 100%': { 'box-shadow': '0 0 20px rgba(124, 58, 237, 0.3)' },

&#x20;         '50%':      { 'box-shadow': '0 0 60px rgba(124, 58, 237, 0.7)' },

&#x20;       },

&#x20;       'slide-up': {

&#x20;         'from': { transform: 'translateY(12px)', opacity: '0' },

&#x20;         'to':   { transform: 'translateY(0)',    opacity: '1' },

&#x20;       },

&#x20;       'fade-in': {

&#x20;         'from': { opacity: '0' },

&#x20;         'to':   { opacity: '1' },

&#x20;       },

&#x20;     },

&#x20;   },

&#x20; },

&#x20; plugins: \[require('tailwindcss-animate')],

}

export default config

```



\---



\### shadcn/ui Setup \& Overrides



Initialize shadcn in each Next.js app:

```bash

npx shadcn@latest init

```



\*\*Always override shadcn defaults\*\* to match our color system. Edit `components/ui/button.tsx` etc. to use `--ht-\*` variables.



\*\*shadcn theme in `globals.css`:\*\*

```css

@layer base {

&#x20; :root {

&#x20;   --background:         0 0% 4%;       /\* --ht-ink \*/

&#x20;   --foreground:         240 60% 97%;   /\* --ht-text \*/

&#x20;   --card:               240 12% 8%;    /\* --ht-surface \*/

&#x20;   --card-foreground:    240 60% 97%;

&#x20;   --primary:            262 83% 58%;   /\* --ht-violet \*/

&#x20;   --primary-foreground: 0 0% 100%;

&#x20;   --secondary:          240 10% 15%;   /\* --ht-surface-2 \*/

&#x20;   --secondary-foreground: 240 30% 70%;

&#x20;   --muted:              240 10% 20%;

&#x20;   --muted-foreground:   240 15% 55%;

&#x20;   --accent:             25 95% 53%;    /\* --ht-coral \*/

&#x20;   --accent-foreground:  0 0% 100%;

&#x20;   --destructive:        350 89% 60%;   /\* --ht-rose \*/

&#x20;   --border:             240 13% 20%;   /\* --ht-border \*/

&#x20;   --input:              240 13% 20%;

&#x20;   --ring:               262 83% 58%;

&#x20;   --radius:             0.75rem;

&#x20; }

}

```



\---



\### Component Patterns



\#### Cards

```tsx

// Standard card — use this pattern everywhere

<div className="

&#x20; bg-ht-surface border border-ht-border rounded-xl2

&#x20; p-6 shadow-card hover:shadow-card-hover

&#x20; hover:border-ht-violet/40 transition-all duration-300

&#x20; group

">

&#x20; {children}

</div>



// Gradient accent card (featured items)

<div className="

&#x20; relative bg-ht-surface border border-transparent rounded-xl2 p-6

&#x20; before:absolute before:inset-0 before:rounded-xl2 before:p-px

&#x20; before:bg-grad-primary before:-z-10

">

&#x20; {children}

</div>

```



\#### Buttons

```tsx

// Primary CTA

<Button className="

&#x20; bg-grad-primary text-white font-body font-semibold

&#x20; hover:shadow-glow-violet hover:scale-\[1.02]

&#x20; transition-all duration-200 rounded-full px-6 py-2.5

">

&#x20; Get Started Free

</Button>



// Secondary / Ghost

<Button variant="outline" className="

&#x20; border-ht-border text-ht-soft hover:border-ht-violet

&#x20; hover:text-ht-text transition-all duration-200 rounded-full

">

&#x20; Learn More

</Button>



// Danger

<Button className="bg-ht-rose hover:bg-ht-rose/80 rounded-full">

&#x20; Delete

</Button>

```



\#### Badges

```tsx

// Status badge pattern

const badgeColors = {

&#x20; published: 'bg-ht-lime/15 text-ht-lime border-ht-lime/30',

&#x20; draft:     'bg-ht-muted/30 text-ht-soft border-ht-border',

&#x20; pending:   'bg-ht-coral/15 text-ht-coral border-ht-coral/30',

&#x20; active:    'bg-ht-cyan/15 text-ht-cyan border-ht-cyan/30',

&#x20; error:     'bg-ht-rose/15 text-ht-rose border-ht-rose/30',

}



<span className={`

&#x20; inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full

&#x20; text-xs font-mono font-medium border ${badgeColors\[status]}

`}>

&#x20; <span className="w-1.5 h-1.5 rounded-full bg-current" />

&#x20; {status}

</span>

```



\#### Gradient Text

```tsx

// Use for hero headlines and important labels

<span className="

&#x20; bg-grad-primary bg-clip-text text-transparent

&#x20; font-display font-bold

">

&#x20; Build your agency website

</span>

```



\#### Stat/Metric Displays

```tsx

<div className="font-mono text-4xl font-medium text-ht-text">

&#x20; {value}

&#x20; <span className="text-sm font-body text-ht-soft ml-1">{unit}</span>

</div>

```



\---



\## 📱 Responsive Design — REQUIRED BREAKPOINTS



\*\*Mobile-first always.\*\* Write base styles for mobile, add `sm:`, `md:`, `lg:`, `xl:` overrides.



| Breakpoint | Tailwind | Viewport | Design Target |

|---|---|---|---|

| Mobile | (base) | 320px–639px | Single column, full-width, large touch targets (min 44px) |

| Tablet | `sm:` | 640px–767px | Still single column mostly, wider cards |

| Tablet-L | `md:` | 768px–1023px | 2-column layouts start, sidebar appears |

| Desktop | `lg:` | 1024px–1279px | Full dashboard layout, multi-column |

| Wide | `xl:` | 1280px–1535px | Wider content, more sidebar space |

| Ultra | `2xl:` | 1536px+ | Max-width containers, whitespace increases |



\### Container Pattern (use everywhere)

```tsx

// In layout.tsx or page wrappers

<div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">

&#x20; {children}

</div>

```



\### Navigation — Mobile Collapsible

```tsx

// Sidebar nav: hidden on mobile, slide-in drawer on md and below, always visible lg+

<aside className="

&#x20; fixed inset-y-0 left-0 z-50 w-72

&#x20; -translate-x-full lg:translate-x-0

&#x20; transition-transform duration-300

&#x20; bg-ht-surface border-r border-ht-border

">

```



\### Grid Patterns

```tsx

// Product cards grid

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">



// Dashboard stats

<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">



// Main + Sidebar layout

<div className="flex flex-col lg:flex-row gap-6">

&#x20; <main className="flex-1 min-w-0">

&#x20; <aside className="w-full lg:w-80 shrink-0">

```



\### Touch Targets

\- All clickable elements: minimum `min-h-\[44px] min-w-\[44px]`

\- Buttons on mobile: `py-3` minimum (not `py-2`)

\- Spacing between interactive elements: minimum 8px



\---



\## 📧 Email — Resend ONLY



All transactional emails are sent via \*\*Resend\*\*. No SendGrid. No Nodemailer. No SMTP.



\### Setup

```bash

\# In notification-service

pnpm add resend

```



```typescript

// notification-service/src/email/resend.client.ts

import { Resend } from 'resend';



export const resend = new Resend(process.env.RESEND\_API\_KEY);

```



\### Environment Variables

```env

RESEND\_API\_KEY=re\_xxxxxxxxxxxxxxxxxxxx

RESEND\_FROM\_EMAIL=hello@hamrotourist.com

RESEND\_FROM\_NAME=Hamro Tourist

```



\### Email Templates (React Email)

```bash

pnpm add @react-email/components react-email

```



All email templates live in `notification-service/src/templates/` and are built with React Email components:



```tsx

// notification-service/src/templates/welcome.tsx

import {

&#x20; Body, Button, Container, Head, Heading,

&#x20; Hr, Html, Preview, Section, Text

} from '@react-email/components';



export function WelcomeEmail({ agencyName, dashboardUrl }: {

&#x20; agencyName: string;

&#x20; dashboardUrl: string;

}) {

&#x20; return (

&#x20;   <Html>

&#x20;     <Head />

&#x20;     <Preview>Welcome to Hamro Tourist — your agency website awaits 🏔️</Preview>

&#x20;     <Body style={{ backgroundColor: '#0A0A0F', fontFamily: 'DM Sans, sans-serif' }}>

&#x20;       <Container style={{ maxWidth: '560px', margin: '0 auto', padding: '40px 20px' }}>

&#x20;         <Heading style={{ color: '#F1F0FF', fontSize: '28px', fontWeight: '700' }}>

&#x20;           Welcome, {agencyName}! 🎉

&#x20;         </Heading>

&#x20;         <Text style={{ color: '#9B9BB8', fontSize: '16px', lineHeight: '1.6' }}>

&#x20;           Your Hamro Tourist account is ready. Start building your travel agency website in minutes.

&#x20;         </Text>

&#x20;         <Section style={{ marginTop: '32px' }}>

&#x20;           <Button

&#x20;             href={dashboardUrl}

&#x20;             style={{

&#x20;               background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',

&#x20;               color: '#fff',

&#x20;               borderRadius: '999px',

&#x20;               padding: '14px 28px',

&#x20;               fontSize: '15px',

&#x20;               fontWeight: '600',

&#x20;               textDecoration: 'none',

&#x20;             }}

&#x20;           >

&#x20;             Open Dashboard →

&#x20;           </Button>

&#x20;         </Section>

&#x20;         <Hr style={{ borderColor: '#2A2A3A', margin: '32px 0' }} />

&#x20;         <Text style={{ color: '#5C5C78', fontSize: '13px' }}>

&#x20;           Hamro Tourist · hamrotourist.com

&#x20;         </Text>

&#x20;       </Container>

&#x20;     </Body>

&#x20;   </Html>

&#x20; );

}

```



\### Sending Emails

```typescript

// notification-service/src/email/email.service.ts

import { Injectable } from '@nestjs/common';

import { resend } from './resend.client';

import { render } from '@react-email/render';

import { WelcomeEmail } from '../templates/welcome';



@Injectable()

export class EmailService {

&#x20; async sendWelcome(to: string, agencyName: string, dashboardUrl: string) {

&#x20;   const html = render(WelcomeEmail({ agencyName, dashboardUrl }));

&#x20;   await resend.emails.send({

&#x20;     from: `${process.env.RESEND\_FROM\_NAME} <${process.env.RESEND\_FROM\_EMAIL}>`,

&#x20;     to,

&#x20;     subject: `Welcome to Hamro Tourist, ${agencyName}! 🏔️`,

&#x20;     html,

&#x20;   });

&#x20; }

}

```



\### Required Email Templates

| Template | Trigger | File |

|---|---|---|

| Welcome | New agency signs up | `welcome.tsx` |

| Email Verification | After registration | `verify-email.tsx` |

| Domain Verified | Custom domain active | `domain-verified.tsx` |

| Domain Pending | Agency submits domain | `domain-pending.tsx` |

| New Lead Alert | Visitor submits contact form | `new-lead.tsx` |

| Password Reset | Forgot password request | `reset-password.tsx` |

| Plan Upgraded | After Stripe payment | `plan-upgraded.tsx` |

| Plan Limit Reached | Resource limit hit | `plan-limit.tsx` |

| Booking Inquiry (future) | Customer submits booking | `booking-inquiry.tsx` |



\---



\## 🏗️ Architecture Rules



\### Multi-Tenancy (READ THIS CAREFULLY)

\- Every service that touches product data \*\*must\*\* set `search\_path` to `tenant\_{slug}` before any query

\- The tenant slug comes from `X-Tenant-Slug` header, injected by the API Gateway from the JWT `tenantSlug` claim

\- \*\*Never\*\* query across schemas. One request = one tenant = one schema.

\- Plan limits are enforced by calling `GET /tenant/:slug/limits` before any resource creation

\- Schema provisioning happens in the Tenant Service only — no other service creates schemas



```typescript

// The interceptor that EVERY product-touching service must register globally

@Injectable()

export class TenantContextInterceptor implements NestInterceptor {

&#x20; constructor(private readonly dataSource: DataSource) {}



&#x20; async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {

&#x20;   const req = context.switchToHttp().getRequest();

&#x20;   const slug = req.headers\['x-tenant-slug'] || req.user?.tenantSlug;

&#x20;   if (!slug) throw new UnauthorizedException('Missing tenant context');

&#x20;   const schema = `tenant\_${slug.replace(/\[^a-z0-9\_]/gi, '\_')}`;

&#x20;   await this.dataSource.query(`SET search\_path = "${schema}"`);

&#x20;   return next.handle();

&#x20; }

}

```



\### Service Communication

\- \*\*Sync (REST):\*\* Use `@nestjs/axios` HttpService with typed DTOs. Always validate response with Zod or class-validator.

\- \*\*Async (Queue):\*\* BullMQ. Queue names are constants in `packages/shared-types/queues.ts`.

\- \*\*Never\*\* import one service's module directly into another service — they are separate processes.



```typescript

// packages/shared-types/src/queues.ts

export const QUEUES = {

&#x20; EMAIL:            'email',

&#x20; IMAGE\_PROCESSING: 'image-processing',

&#x20; DNS\_VERIFICATION: 'dns-verification',

&#x20; DOMAIN\_ACTIVATE:  'domain-activate',

} as const;

```



\### API Response Shape

All APIs return this envelope — no exceptions:

```typescript

// Success

{ success: true, data: T, meta?: PaginationMeta }



// Error

{ success: false, error: { code: string, message: string, details?: unknown } }



// Paginated

{

&#x20; success: true,

&#x20; data: T\[],

&#x20; meta: { page: number, limit: number, total: number, totalPages: number }

}

```



```typescript

// Use this helper in all controllers

export function ok<T>(data: T, meta?: PaginationMeta) {

&#x20; return { success: true, data, ...(meta \&\& { meta }) };

}

export function fail(code: string, message: string, details?: unknown) {

&#x20; return { success: false, error: { code, message, details } };

}

```



\### Error Handling

\- Use NestJS `HttpException` subclasses — never `throw new Error()`

\- Log with context: `this.logger.error('message', { tenantSlug, userId, ...context })`

\- Sentry: tag every error with `Sentry.setTag('tenantSlug', slug)`



\---



\## 🔐 Auth \& Security Rules



\- JWT: RS256 (asymmetric). Access token = 15min. Refresh token = 30 days in HttpOnly cookie.

\- Never store secrets in code or `.env` files committed to git. Use `.env.local` locally, Vault/AWS Secrets Manager in prod.

\- All mutations require `Authorization: Bearer <access\_token>` header.

\- All inputs validated with `class-validator` DTOs on the NestJS side and `Zod` on the frontend side.

\- No raw SQL string interpolation — TypeORM parameterized queries only.

\- CORS: only allow `\*.hamrotourist.com` and verified custom domains.



\---



\## 📐 Code Standards



\### TypeScript

```typescript

// ✅ Always type explicitly — no `any`

async function getTours(tenantSlug: string): Promise<Tour\[]> {}



// ✅ Use Zod for runtime validation on all external inputs

const createTourSchema = z.object({

&#x20; title: z.string().min(3).max(255),

&#x20; regionId: z.string().uuid(),

&#x20; difficulty: z.enum(\['easy', 'moderate', 'hard', 'extreme']),

});



// ❌ Never

const data: any = await fetch(...)

```



\### File Naming

```

components/         → PascalCase.tsx (TourCard.tsx)

hooks/              → use-kebab-case.ts (use-tour-filters.ts)

utils/              → kebab-case.ts (format-price.ts)

services/ (NestJS)  → kebab-case.service.ts

controllers/        → kebab-case.controller.ts

DTOs/               → PascalCase.dto.ts (CreateTourDto.ts)

```



\### Import Order (enforced by ESLint)

```typescript

// 1. Node built-ins

import { readFile } from 'fs/promises'

// 2. External packages

import { Injectable } from '@nestjs/common'

// 3. Internal packages (@hamrotourist/\*)

import type { Tour } from '@hamrotourist/shared-types'

// 4. Local imports (relative)

import { TourRepository } from './tour.repository'

```



\### Comments

\- Comment \*\*why\*\*, not \*\*what\*\*. Code shows what; comments explain decisions.

\- All public methods in services get JSDoc:

```typescript

/\*\*

&#x20;\* Creates a tour under a region. Enforces plan limits before insertion.

&#x20;\* @throws {PlanLimitExceededException} if tenant has reached tour limit

&#x20;\*/

async createTour(dto: CreateTourDto, tenantSlug: string): Promise<Tour> {}

```



\---



\## 🗄️ Database Rules



\### Migrations

\- \*\*Never\*\* modify existing migration files. Always create a new one.

\- Master schema migrations: `migrations/master/` — run once on deploy.

\- Tenant schema migrations: `migrations/tenant/` — run via `pnpm tenant-migrate` on all existing tenant schemas after deploy.

\- Migration filename format: `YYYYMMDDHHMMSS\_description.ts`



\### Naming Conventions (PostgreSQL)

```sql

\-- Tables: snake\_case, plural

tours, itinerary\_days, group\_discounts



\-- Primary keys: always uuid

id UUID PRIMARY KEY DEFAULT gen\_random\_uuid()



\-- Foreign keys: {referenced\_table\_singular}\_id

region\_id UUID NOT NULL REFERENCES regions(id) ON DELETE CASCADE



\-- Indexes: idx\_{table}\_{column(s)}

CREATE INDEX idx\_tours\_region\_id ON tours(region\_id);

CREATE INDEX idx\_tours\_status ON tours(status);



\-- Timestamps: always include both

created\_at TIMESTAMPTZ NOT NULL DEFAULT now(),

updated\_at TIMESTAMPTZ NOT NULL DEFAULT now()



\-- Soft deletes: use deleted\_at (nullable)

deleted\_at TIMESTAMPTZ NULL

```



\### TypeORM Entity Pattern

```typescript

@Entity('tours')

export class Tour {

&#x20; @PrimaryGeneratedColumn('uuid')

&#x20; id: string;



&#x20; @Column({ type: 'varchar', length: 255 })

&#x20; title: string;



&#x20; @Column({ type: 'varchar', length: 255, unique: true })

&#x20; slug: string; // auto-generated from title on create



&#x20; @Column({

&#x20;   type: 'enum',

&#x20;   enum: \['draft', 'published', 'archived'],

&#x20;   default: 'draft',

&#x20; })

&#x20; status: 'draft' | 'published' | 'archived';



&#x20; @ManyToOne(() => Region, { onDelete: 'CASCADE' })

&#x20; @JoinColumn({ name: 'region\_id' })

&#x20; region: Region;



&#x20; @Column({ name: 'region\_id' })

&#x20; regionId: string;



&#x20; @CreateDateColumn({ name: 'created\_at' })

&#x20; createdAt: Date;



&#x20; @UpdateDateColumn({ name: 'updated\_at' })

&#x20; updatedAt: Date;



&#x20; @DeleteDateColumn({ name: 'deleted\_at', nullable: true })

&#x20; deletedAt: Date | null;

}

```



\---



\## 🌐 Cloudflare Integration Rules



\### Workers (`infra/cloudflare/workers/`)

\- Workers are written in TypeScript and deployed via Wrangler.

\- Workers must be stateless — all state via KV, R2, or Durable Objects.

\- Never put secrets in Worker code — use `wrangler secret put`.



\### R2 Storage

\- Bucket: `hamrotourist-media`

\- Path convention: `tenants/{slug}/{category}/{uuid}/{variant}.webp`

&#x20; - Categories: `banners`, `tours`, `treks`, `activities`, `packages`, `logos`, `misc`

&#x20; - Variants: `original`, `hero` (1920px), `card` (800px), `thumb` (300px)

\- Always serve via CDN URL: `https://media.hamrotourist.com/...` — never the R2 direct URL.



\### Cloudflare API Calls (Domain Service only)

```typescript

const CF\_BASE = `https://api.cloudflare.com/client/v4`;

const headers = {

&#x20; 'Authorization': `Bearer ${process.env.CLOUDFLARE\_API\_TOKEN}`,

&#x20; 'Content-Type': 'application/json',

};



// Create custom hostname

await fetch(`${CF\_BASE}/zones/${ZONE\_ID}/custom\_hostnames`, {

&#x20; method: 'POST',

&#x20; headers,

&#x20; body: JSON.stringify({

&#x20;   hostname: domain,

&#x20;   ssl: { method: 'http', type: 'dv', settings: { min\_tls\_version: '1.2' } },

&#x20; }),

});

```



\---



\## 🔢 Plan Limit Enforcement



The Tenant Service exposes a limits endpoint. \*\*Every resource-creation endpoint\*\* in every service must call it:



```typescript

// In product.service.ts — before creating a country

async createCountry(dto: CreateCountryDto, tenantSlug: string) {

&#x20; const limits = await this.tenantClient.getLimits(tenantSlug);

&#x20; const current = await this.countryRepo.count();

&#x20; if (current >= limits.maxCountries) {

&#x20;   throw new ForbiddenException({

&#x20;     code: 'PLAN\_LIMIT\_EXCEEDED',

&#x20;     message: `Your plan allows ${limits.maxCountries} countries. Upgrade to add more.`,

&#x20;     upgradeUrl: 'https://hamrotourist.com/pricing',

&#x20;   });

&#x20; }

&#x20; // proceed with creation...

}

```



Plan limits from Tenant Service:

```typescript

interface TenantLimits {

&#x20; maxCountries:       number;  // 5 on free

&#x20; maxRegionsPerCountry: number; // 3 on free

&#x20; maxTeamMembers:     number;  // 1 on free

&#x20; canUseCustomDomain: boolean; // false on free

&#x20; canUseCustomHtml:   boolean; // false on free

&#x20; canAccessApi:       boolean; // false on free

}

```



\---



\## 🧪 Testing Requirements



\### Unit Tests (Jest)

\- Every service method gets a unit test.

\- Mock all external dependencies (DB, HTTP calls, Cloudflare).

\- Naming: `describe('TourService')` → `it('should throw PlanLimitExceededException when country limit reached')`



\### Integration Tests (Jest + Supertest)

\- Every controller endpoint gets an integration test against a real test DB (isolated schema).

\- Use `beforeEach` to reset tenant schema; `afterAll` to drop it.



\### Frontend Tests (Vitest + Testing Library)

\- Every component with business logic gets tests.

\- Test user interactions, not implementation details.



\### E2E (Playwright)

\- Critical paths only: signup → onboarding → publish flow; domain connection flow.



\---



\## 🚀 Running Locally



```bash

\# Prerequisites: Docker, Node 20+, pnpm 9+



\# 1. Start infrastructure

docker compose up -d postgres redis



\# 2. Install all dependencies

pnpm install



\# 3. Run master migrations

pnpm db:migrate:master



\# 4. Seed dev data

pnpm db:seed



\# 5. Start all services (uses Turborepo)

pnpm dev



\# Individual service

pnpm --filter auth-service dev

pnpm --filter admin-frontend dev



\# Run tenant migrations (after adding new tenant schema migrations)

pnpm tenant-migrate

```



\### Local URLs

| Service | URL |

|---|---|

| Admin Frontend | http://localhost:3000 |

| Website Renderer | http://localhost:3001 |

| API Gateway | http://localhost:4000 |

| Auth Service | http://localhost:4001 |

| Product Service | http://localhost:4002 |

| Website Builder | http://localhost:4003 |

| PostgreSQL | localhost:5432 |

| Redis | localhost:6379 |

| Swagger (any service) | http://localhost:400X/api |



\---



\## ⚠️ Common Pitfalls — Never Do These



```typescript

// ❌ Never use `any`

const result: any = await service.findAll();



// ❌ Never skip plan limit checks on creation endpoints

async createRegion(dto) { return this.repo.save(dto); } // WRONG — no limit check



// ❌ Never query without setting search\_path in product/CRM services

const tours = await this.tourRepo.find(); // WRONG without TenantContextInterceptor



// ❌ Never use raw string interpolation in SQL

await this.dataSource.query(`SELECT \* FROM tours WHERE id = '${id}'`); // SQL INJECTION



// ❌ Never send emails via anything other than Resend

import nodemailer from 'nodemailer'; // FORBIDDEN



// ❌ Never use default fonts

className="font-sans" // This is Inter — FORBIDDEN

// Use: className="font-body" or className="font-display"



// ❌ Never hardcode tenant slug

const schema = 'tenant\_acme'; // FORBIDDEN — always derive from JWT/header



// ❌ Never trust client-side price calculation

// Price MUST be recalculated server-side at checkout



// ❌ Never expose R2 direct URLs — always use CDN

const url = `https://hamrotourist-media.r2.cloudflarestorage.com/...` // WRONG

const url = `https://media.hamrotourist.com/...` // CORRECT

```



\---



\## 📋 Phase Checklist (AI Build Order)



\- \[ ] \*\*Phase 1\*\* — Monorepo scaffold, auth, tenant provisioning, schema migrations

\- \[ ] \*\*Phase 2\*\* — Product data model: all entities, relationships, business rules, pricing

\- \[ ] \*\*Phase 3\*\* — Media service, Cloudflare R2, Workers, subdomain routing

\- \[ ] \*\*Phase 4\*\* — Website Builder service, 3 theme libraries, ISR renderer

\- \[ ] \*\*Phase 5\*\* — Admin Frontend: full dashboard, builder UI, itinerary editor

\- \[ ] \*\*Phase 6\*\* — Custom domains, CRM, white-label admin, Resend notifications

\- \[ ] \*\*Phase 7\*\* — Billing (Stripe), plan enforcement hardening, analytics

\- \[ ] \*\*Phase 8\*\* — Booking engine, payment gateways (Stripe + eSewa/Khalti)



\*\*Current Phase:\*\* Update this line when starting each phase.



\---



\*Last updated: April 2026 — Architecture v1.0\*

\*For full architectural decisions and rationale, see `/docs/architecture.docx`\*

