# 🚀 Development Guide - Website Profile Service

## ✅ Project Inti Selesai

### Database Schema
- ✅ Tabel `services` - Daftar layanan dengan pricing
- ✅ Tabel `portfolios` - Portfolio project
- ✅ Tabel `testimonials` - Testimoni klien
- ✅ Tabel `contact_messages` - Pesan dari form kontak
- ✅ Tabel `admin_profiles` - Profile admin
- ✅ Row Level Security (RLS) policies
- ✅ Indexes untuk optimasi query
- ✅ Trigger untuk auto-update `updated_at`

### Library & Configuration
- ✅ Supabase client (browser)
- ✅ Supabase server client
- ✅ Database queries (CRUD functions)
- ✅ Authentication hook (`useAuth`)
- ✅ Validation schemas (Zod)
- ✅ Helper utilities
- ✅ Middleware untuk protect admin routes
- ✅ TypeScript types
- ✅ Path aliases di `tsconfig.json`

---

## 📋 Roadmap Kelanjutan Development

### FASE 1: SETUP ADMIN USER (CRITICAL - HARUS PERTAMA!)

**Buat admin user melalui Supabase Dashboard:**

1. Buka Supabase Dashboard → Authentication → Users
2. Klik "Add User" atau "Invite User"
3. Masukkan:
   - Email: `admin@webforge.com` (atau email pilihan Anda)
   - Password: `adminpassword` (ganti dengan password kuat)
   - Auto Confirm User: ✅ (centang ini!)
pastikan setelah di masukan agar otomastis terdaftar atau menjadi admin
---

### FASE 2: KOMPONEN DASAR (Foundation)

#### A. Layout Components (Priority: HIGH)

**1. Header Component** (`src/components/layout/Header/`)
- File: `Header.tsx`, `Header.module.css`, `index.ts`
- Fitur:
  - Logo (gunakan lucide-react icon)
  - Navigation menu (Home, About, Services, Portfolio, Contact)
  - Mobile responsive hamburger menu
  - Sticky header dengan scroll effect
  - CTA button "Get Started"

**2. Footer Component** (`src/components/layout/Footer/`)
- File: `Footer.tsx`, `Footer.module.css`, `index.ts`
- Fitur:
  - Company info & logo
  - Quick links (About, Services, Portfolio, Contact)
  - Social media icons (Facebook, Instagram, LinkedIn, Twitter)
  - Copyright notice
  - Contact info (email, phone, address)

**3. Navbar Component** (`src/components/layout/Navbar/`)
- File: `Navbar.tsx`, `Navbar.module.css`, `index.ts`
- Fitur:
  - Desktop & mobile navigation
  - Active link highlighting
  - Smooth scroll to sections

#### B. Common Components (Priority: HIGH)

**1. Button Component** (`src/components/common/Button/`)
- Props: `variant` (primary, secondary, outline), `size` (sm, md, lg), `loading`, `disabled`
- File: `Button.tsx`, `Button.types.ts`, `index.ts`

**2. Card Component** (`src/components/common/Card/`)
- Props: `title`, `image`, `description`, `footer`
- File: `Card.tsx`, `Card.types.ts`, `index.ts`

**3. Input Component** (`src/components/common/Input/`)
- Props: `label`, `error`, `type`, `placeholder`, `required`
- File: `Input.tsx`, `Input.types.ts`, `index.ts`

**4. Modal Component** (`src/components/common/Modal/`)
- Props: `isOpen`, `onClose`, `title`, `children`, `footer`
- File: `Modal.tsx`, `Modal.types.ts`, `index.ts`

**5. Section Component** (`src/components/common/Section/`)
- Props: `title`, `subtitle`, `children`, `background`
- File: `Section.tsx`, `Section.types.ts`, `index.ts`

---

### FASE 3: PUBLIC PAGES (User-Facing)

#### A. Homepage (`app/page.tsx`)

**Sections yang dibutuhkan:**
Berikut versi yang sudah **disesuaikan dengan tambahan kalimat di bagian Portfolio Section**, tanpa mengubah atau mengurangi fitur yang sudah kamu tulis sebelumnya 👇

---

### **A. Homepage Sections**

**1. Hero Section** (`src/components/sections/Hero/`)

* File: `Hero.tsx`, `index.ts`
* Fitur:

  * Large headline dengan gradient text

    > *"Bangun identitas digital yang memukau bersama kami."*
  * Subheadline deskripsi singkat

    > *"Kami membantu bisnis dan individu menciptakan pengalaman digital yang kuat, modern, dan berkesan."*
  * CTA buttons (Get Started, View Portfolio)

    > *Tombol “Get Started” mengarahkan ke form kontak, dan “View Portfolio” ke halaman proyek kami.*
  * Background dengan gradient atau image
  * Animasi fade-in on load

---

**2. Services Section** (`src/components/sections/Services/`)

* File: `Services.tsx`, `ServiceCard.tsx`, `index.ts`
* Fitur:

  * Fetch services dari database (`serviceQueries.getActive()`)
  * Grid layout (3 kolom desktop, 1 kolom mobile)
  * Service cards dengan icon, title, description, price

    > *"Layanan kami dirancang untuk memberikan solusi menyeluruh — mulai dari desain, pengembangan, hingga pemeliharaan."*
  * Hover effects
  * "View All Services" button

---

**3. Portfolio Section** (`src/components/sections/Portfolio/`)

* File: `Portfolio.tsx`, `PortfolioCard.tsx`, `index.ts`
* Fitur:

  * Fetch featured portfolios (`portfolioQueries.getFeatured()`)
  * Grid/carousel layout
  * Portfolio cards dengan image, title, tech stack
  * Hover overlay dengan project details
  * "View All Projects" button
  * Copywriting:

    > *"Kami percaya hasil berbicara lebih keras dari kata-kata. Berikut beberapa proyek yang kami kembangkan dari nol hingga siap digunakan 👇"*

---

**4. Testimonials Section** (`src/components/sections/Testimonials/`)

* File: `Testimonials.tsx`, `TestimonialCard.tsx`, `index.ts`
* Fitur:

  * Fetch approved testimonials (`testimonialQueries.getApproved()`)
  * Carousel/slider (gunakan embla-carousel-react)
  * Testimonial cards dengan avatar, name, company, rating, review

    > *"Apa kata mereka tentang bekerja bersama kami — kepercayaan dan kepuasan klien adalah prioritas utama."*
  * Navigation dots/arrows
  * Auto-play dengan pause on hover

---

**5. CTA Section**

* Simple section di homepage

  * Headline: *"Ready to start your project?"*
  * CTA button ke Contact page
  * Copywriting tambahan:

    > *"Mari wujudkan ide Anda menjadi karya digital yang berdampak."*

---

### **B. Services Page** (`app/services/page.tsx`)

* Fetch all active services
* Grid layout dengan detail lengkap
* Pricing comparison table
* FAQ accordion (gunakan accordion component dari shadcn/ui)

  > *"Temukan layanan yang sesuai dengan kebutuhan Anda dan bandingkan paket harga dengan transparan."*

---

### **C. Portfolio Page** (`app/portfolio/page.tsx`)

* Fetch all portfolios
* Filter by category (tabs atau dropdown)
* Grid layout
* Modal untuk detail project (gunakan dialog component)
* Tech stack badges
* Link ke live project

  > *"Setiap proyek kami mencerminkan dedikasi, kreativitas, dan kualitas. Lihat hasil kerja kami di berbagai bidang dan industri."*

---

### **D. About Page** (`app/about/page.tsx`)

* Company story

  > *"Kami berawal dari tim kecil dengan visi besar: membantu brand dan individu tampil maksimal di dunia digital."*
* Team section (optional - bisa hardcoded)
* Why choose us (feature list)

  > *"Kami menggabungkan desain kreatif, teknologi mutakhir, dan strategi digital untuk memberikan hasil yang nyata."*
* Statistics/achievements (animated numbers)

---

### **E. Contact Page** (`app/contact/page.tsx`)

* Contact form dengan validasi

  * Fields: name, email, phone, message
  * Submit ke `messageQueries.create()`
  * Toast notification on success/error
* Contact information display

  * Email, phone, address
  * Office hours
* Social media links
* Optional: Embed Google Maps

  > *"Kami siap mendengar ide Anda. Hubungi kami dan mari mulai percakapan untuk membangun sesuatu yang luar biasa."*

---

Apakah kamu ingin saya lanjutkan menambahkan **copywriting versi “friendly & profesional”** (lebih cocok untuk website agency modern) ke setiap section agar siap langsung dipakai di React/Next.js komponen?


### FASE 4: AUTHENTICATION (Priority: HIGH)

#### Login Page (`app/login/page.tsx`)

- File: `app/login/page.tsx`
- Fitur:
  - Login form (email, password)
  - "Remember me" checkbox
  - Error handling dengan toast
  - Redirect ke `/admin` setelah login
  - Redirect parameter (e.g., `/login?redirect=/admin/services`)
  - Link ke "Forgot Password" (optional)
- Use `useAuth` hook
- Validation dengan `loginSchema`

---

### FASE 5: ADMIN PANEL (Priority: HIGH)

#### A. Admin Layout (`src/app/admin/layout.tsx`)

**1. Sidebar Component** (`src/components/layout/Sidebar/`)
- File: `Sidebar.tsx`, `Sidebar.module.css`, `index.ts`
- Navigation items:
  - Dashboard (Home icon)
  - Services (Package icon)
  - Portfolio (Briefcase icon)
  - Testimonials (Star icon)
  - Messages (Mail icon) - dengan badge unread count
  - Settings (Settings icon)
  - Logout (LogOut icon)
- Active link highlighting
- Collapsible pada mobile
- User info di top sidebar (avatar, name, role)

**2. Admin Header**
- Breadcrumb navigation
- User dropdown (profile, settings, logout)
- Notification bell (optional)

**Layout struktur:**
```tsx
<div className="admin-layout">
  <Sidebar />
  <main className="admin-content">
    <AdminHeader />
    {children}
  </main>
</div>
```

#### B. Dashboard Page (`src/app/admin/page.tsx`)

**Components needed:**

**1. StatsCard Component** (`src/components/admin/StatsCard/`)
- Props: `title`, `value`, `icon`, `trend`
- File: `StatsCard.tsx`, `index.ts`

**Dashboard sections:**
- 4 stats cards (Services, Portfolios, Testimonials, Unread Messages)
  - Fetch dari `dashboardQueries.getStats()`
- Recent messages table (5 terbaru)
  - Link ke detail message
- Quick actions section
  - Buttons: Add Service, Add Portfolio, Add Testimonial
- Charts (optional):
  - Messages per month (recharts)
  - Popular service categories

#### C. Manage Services (`src/app/admin/services/page.tsx`)

**Components needed:**

**1. DataTable Component** (`src/components/admin/DataTable/`)
- Generic reusable table
- Props: `columns`, `data`, `onEdit`, `onDelete`, `onSort`, `pagination`
- File: `DataTable.tsx`, `DataTable.types.ts`, `index.ts`
- Features:
  - Search input
  - Column sorting
  - Pagination controls
  - Loading state
  - Empty state

**2. ServiceForm Component** (`src/components/admin/ServiceForm/`)
- File: `ServiceForm.tsx`, `ServiceForm.types.ts`, `index.ts`
- Props: `initialData`, `onSubmit`, `onCancel`, `mode` (create/edit)
- Fields:
  - Title (text input)
  - Description (textarea)
  - Price (number input)
  - Features (array input - add/remove items)
  - Icon (select dropdown dengan lucide-react icons)
  - Active status (switch)
- Validation dengan `serviceSchema`
- Submit button dengan loading state

**Page structure:**
- Header dengan "Add Service" button
- DataTable dengan services data
- Modal untuk create/edit (gunakan ServiceForm)
- Confirmation dialog untuk delete

#### D. Manage Portfolio (`src/app/admin/portfolio/page.tsx`)

**Components needed:**

**1. PortfolioForm Component** (`src/components/admin/PortfolioForm/`)
- File: `PortfolioForm.tsx`, `PortfolioForm.types.ts`, `index.ts`
- Props: `initialData`, `onSubmit`, `onCancel`, `mode`
- Fields:
  - Title (text input)
  - Description (textarea)
  - Category (select: Web App, E-commerce, Corporate, Landing Page, etc.)
  - Tech stack (tags input - add/remove)
  - Image upload (file input dengan preview)
    - Use `uploadImage` helper dari `src/lib/utils/helpers.ts`
  - Project URL (text input)
  - Featured checkbox
- Validation dengan `portfolioSchema`

**Page structure:**
- Header dengan filter tabs by category
- Grid/table view dengan portfolio cards
- Modal untuk create/edit
- Confirmation dialog untuk delete
- Preview modal untuk detail

#### E. Manage Testimonials (`src/app/admin/testimonials/page.tsx`)

**Components needed:**

**1. TestimonialForm Component** (`src/components/admin/TestimonialForm/`)
- File: `TestimonialForm.tsx`, `TestimonialForm.types.ts`, `index.ts`
- Props: `initialData`, `onSubmit`, `onCancel`, `mode`
- Fields:
  - Client name (text input)
  - Client company (text input)
  - Rating (1-5 stars - radio group atau slider)
  - Review (textarea)
  - Avatar upload (file input dengan preview)
  - Approved checkbox
- Validation dengan `testimonialSchema`

**Page structure:**
- Header dengan "Add Testimonial" button
- Filter tabs: All, Approved, Pending
- DataTable dengan testimonials
- Quick approve/reject buttons
- Modal untuk create/edit
- Confirmation dialog untuk delete

#### F. Contact Messages (`src/app/admin/messages/page.tsx`)

**Page structure:**
- Header dengan filter tabs: All, Unread, Read
- Search input
- Messages table/list:
  - Columns: Name, Email, Phone, Message (truncated), Date, Status
  - Unread messages highlighted (bold atau badge)
  - Mark as read/unread button
  - Delete button
- Click row untuk detail modal:
  - Full message content
  - Client info
  - Reply button (opens email client: `mailto:${email}`)
  - Mark as read/unread
  - Delete
- Export to CSV button (optional)

#### G. Settings Page (`src/app/admin/settings/page.tsx`)

**Sections:**
- Admin profile section
  - Display current user info
  - Edit full name
  - Change email (Supabase auth)
- Change password section
  - Old password, new password, confirm password
  - Use Supabase auth update
- Site settings (optional)
  - Company info (name, email, phone, address)
  - Social media links
  - Store in separate `site_settings` table atau localStorage
- SEO settings (optional)
  - Meta title, description
  - Store in database atau config file

---

### FASE 6: UI/UX POLISH (Priority: MEDIUM)

#### A. Animations & Transitions

**Install dependencies:**
```bash
npm install framer-motion
```

**Areas untuk animasi:**
- Hero section fade-in
- Services cards stagger animation
- Portfolio hover effects
- Testimonials carousel transitions
- Scroll animations (fade-in on scroll)
- Loading skeletons
- Toast notifications
- Modal open/close animations

#### B. Loading States

**Create components:**
- Page skeleton loaders
- Card skeletons
- Table skeletons
- Button loading spinner
- Form submission loading

#### C. Error States

- 404 page (`app/not-found.tsx`)
- 500 error page
- Empty states untuk tables/lists
- Form validation errors
- Network error toast

#### D. Responsive Design

**Test & adjust:**
- Mobile menu (hamburger)
- Admin sidebar collapse pada mobile
- Tables responsive (horizontal scroll atau card view)
- Forms responsive
- Grid layouts responsive
- Images responsive dengan `next/image`

---

### FASE 7: STORAGE & UPLOADS (Priority: MEDIUM)

#### Create Supabase Storage Bucket

**Via Supabase Dashboard:**
1. Go to Storage
2. Create new bucket: `images`
3. Set to Public
4. Add policies:
   - Allow public SELECT
   - Allow authenticated INSERT
   - Allow authenticated DELETE (owner only)

**Upload functions sudah ada di:**
- `src/lib/utils/helpers.ts` → `uploadImage()`, `deleteImage()`

**Integrate di forms:**
- Portfolio image upload
- Testimonial avatar upload
- Service icon upload (optional)

---

### FASE 8: TESTING & OPTIMIZATION (Priority: LOW)

#### A. Data Seeding

**Create seed script** (`scripts/seed.ts`):
- Insert dummy services (5-10)
- Insert dummy portfolios (10-15)
- Insert dummy testimonials (8-12)
- Insert dummy messages (5-10)

**Run seed:**
```bash
npx tsx scripts/seed.ts
```

#### B. Performance Optimization

- Next.js Image optimization
- Lazy loading components
- Code splitting
- Bundle size analysis
- Database query optimization
- Add caching (optional)

#### C. SEO

- Meta tags di setiap page
- Open Graph tags
- Structured data (JSON-LD)
- Sitemap.xml
- Robots.txt

---

## 🗂️ File Priorities

### HARUS DIBUAT DULU (HIGH PRIORITY)

1. ✅ Database schema (DONE)
2. ✅ Supabase client & queries (DONE)
3. ✅ Auth hook (DONE)
4. ✅ Types (DONE)
5. ✅ Validators (DONE)
6. ✅ Middleware (DONE)
7. **Setup admin user di Supabase** (CRITICAL!)
8. Layout components (Header, Footer, Sidebar)
9. Common components (Button, Card, Input, Modal, Table)
10. Login page
11. Admin layout
12. Admin dashboard

### BISA DIBUAT PARALEL (MEDIUM PRIORITY)

- Public pages (Homepage, Services, Portfolio, About, Contact)
- Admin CRUD pages (Services, Portfolio, Testimonials, Messages)
- Section components (Hero, Services, Portfolio, Testimonials)
- Admin form components

### OPTIONAL (LOW PRIORITY)

- Settings page
- Charts & analytics
- Export features
- Advanced filters
- Image optimization
- SEO optimization

---

## 🎨 Design Guidelines

### Color Palette
```css
:root {
  --primary: #0066FF;
  --primary-dark: #0052CC;
  --success: #28a745;
  --warning: #ffc107;
  --danger: #dc3545;
  --neutral: #6c757d;
  --dark: #1a1a1a;
  --light: #f8f9fa;
}
```

### Typography
- Headings: Inter Bold
- Body: Inter Regular
- Line height: 1.5 (body), 1.2 (headings)
- Font sizes: 14px (small), 16px (base), 18px (large), 24px (h3), 32px (h2), 48px (h1)

### Spacing System
- Use 8px grid: 8px, 16px, 24px, 32px, 48px, 64px, 96px
- Consistent padding/margin

### Components Style
- Border radius: 8px (cards), 4px (buttons), 12px (modals)
- Box shadow: `0 2px 8px rgba(0,0,0,0.1)`
- Hover effects: Scale 1.02 atau brightness 110%
- Transitions: 200ms ease

---

## 🔧 Development Commands

```bash
# Install dependencies (if needed)
npm install

# Run development server (DON'T RUN - Auto-started)
# npm run dev

# Build production
npm run build

# Run production
npm start

# Type check
npm run typecheck

# Lint
npm run lint
```

---

## 📝 Naming Conventions

### Files & Folders
- Components: PascalCase (`ServiceCard.tsx`)
- Utilities: camelCase (`uploadImage.ts`)
- Pages: lowercase (`page.tsx`, `layout.tsx`)
- Folders: PascalCase untuk components, lowercase untuk routes

### Variables & Functions
- Variables: camelCase (`const userName = ...`)
- Functions: camelCase (`function getUserData() {}`)
- Components: PascalCase (`function Button() {}`)
- Constants: UPPER_SNAKE_CASE (`const MAX_UPLOAD_SIZE = ...`)

### CSS Classes
- Use Tailwind classes first
- Custom classes: kebab-case (`admin-sidebar`, `service-card`)

---

## 🚨 Important Notes

1. **ALWAYS** use `maybeSingle()` instead of `single()` untuk query yang return 0 atau 1 row
2. **NEVER** commit secrets ke Git
3. **ALWAYS** validate user input (client & server)
4. **ALWAYS** handle loading & error states
5. **ALWAYS** use RLS policies (sudah di-setup)
6. **ALWAYS** use TypeScript types
7. **TEST** responsive design di semua breakpoints
8. **TEST** authentication flow sebelum deployment
9. **OPTIMIZE** images dengan Next.js Image component
10. **USE** Supabase Storage untuk file uploads

---

## 🎯 Next Steps (Prioritas)

1. **Setup admin user** via Supabase Dashboard
2. **Test login** di `/login` page (perlu dibuat)
3. **Build layout components** (Header, Footer, Sidebar)
4. **Build admin layout** (`src/app/admin/layout.tsx`)
5. **Build admin dashboard** (`src/app/admin/page.tsx`)
6. **Build common components** (Button, Card, Input, Modal, Table)
7. **Build admin CRUD pages** (Services, Portfolio, Testimonials)
8. **Build public pages** (Homepage dengan sections)
9. **Test & polish** UI/UX
10. **Deploy** ke production

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/icons)

---

**Good luck! 🚀**
