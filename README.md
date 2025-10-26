# WebForge - Website Profile Service

Professional website development service profile with admin panel for managing services, portfolio, testimonials, and contact messages.

## Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **UI Library**: shadcn/ui + Tailwind CSS
- **Language**: TypeScript
- **Authentication**: Supabase Auth

## Project Structure

```
├── app/                    # Next.js app router
├── components/            # UI components (shadcn/ui)
├── src/
│   ├── app/              # App routes (to be created)
│   ├── components/       # Custom components (to be created)
│   │   ├── common/       # Reusable components
│   │   ├── layout/       # Layout components
│   │   ├── admin/        # Admin-specific components
│   │   └── sections/     # Page sections
│   ├── lib/
│   │   ├── supabase/     # Supabase configuration
│   │   ├── hooks/        # Custom React hooks
│   │   └── utils/        # Utility functions
│   └── types/            # TypeScript definitions
├── middleware.ts          # Auth middleware
└── de.md                 # Development guide (IMPORTANT!)
```

## Database Schema

### Tables Created:
- ✅ `services` - Service offerings with pricing and features
- ✅ `portfolios` - Portfolio projects with images and tech stack
- ✅ `testimonials` - Client testimonials with ratings
- ✅ `contact_messages` - Messages from contact form
- ✅ `admin_profiles` - Admin user profiles

### Security:
- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Public read access for active content
- ✅ Admin full access when authenticated
- ✅ Automatic `updated_at` triggers

## Setup Instructions

### 1. Database is Ready
The database schema has been created and configured with proper RLS policies.

### 2. Create Admin User (CRITICAL - DO THIS FIRST!)

**Via Supabase Dashboard:**

1. Go to: https://supabase.com/dashboard/project/qrswcjxwcgagcpigfiza/auth/users
2. Click "Add User" or "Invite User"
3. Enter:
   - Email: `admin@webforge.com` (or your email)
   - Password: `yourpassword` (use a strong password)
   - ✅ Check "Auto Confirm User"
4. After user is created, copy the User UID
5. Go to SQL Editor: https://supabase.com/dashboard/project/qrswcjxwcgagcpigfiza/sql
6. Run this query (replace `USER_UID`):

```sql
INSERT INTO admin_profiles (id, full_name, role)
VALUES ('USER_UID', 'Admin WebForge', 'admin');
```

### 3. Environment Variables
Already configured in `.env`:
- ✅ NEXT_PUBLIC_SUPABASE_URL
- ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY

### 4. Development

```bash
# Development server runs automatically
# DO NOT run: npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck

# Linting
npm run lint
```

## What's Next?

**📖 Read `de.md` for complete development roadmap!**

The `de.md` file contains:
- ✅ Detailed component specifications
- ✅ Page-by-page implementation guide
- ✅ Priority-based task breakdown
- ✅ Code examples and patterns
- ✅ Design guidelines
- ✅ Best practices

## Development Phases (from de.md)

### Phase 1: Setup Admin User (CRITICAL!)
Create admin user in Supabase Dashboard (see instructions above)

### Phase 2: Core Components
- Layout components (Header, Footer, Sidebar)
- Common components (Button, Card, Input, Modal, Table)

### Phase 3: Authentication
- Login page (`/login`)
- Auth flow with Supabase

### Phase 4: Admin Panel
- Admin layout with sidebar
- Dashboard with statistics
- CRUD pages for Services, Portfolio, Testimonials, Messages

### Phase 5: Public Pages
- Homepage with Hero, Services, Portfolio, Testimonials sections
- Services page
- Portfolio page with filtering
- About page
- Contact page with form

### Phase 6: Polish
- Animations and transitions
- Loading states
- Error handling
- Responsive design

## Key Features

### Public Website:
- 🏠 Homepage with hero section
- 💼 Services showcase
- 🖼️ Portfolio gallery with filtering
- ⭐ Client testimonials carousel
- 📧 Contact form

### Admin Panel:
- 📊 Dashboard with statistics
- 🛠️ Service management (CRUD)
- 🎨 Portfolio management with image upload
- 💬 Testimonial management with approval system
- 📨 Contact message inbox
- ⚙️ Settings and profile management

## Important Files

- `de.md` - **Complete development guide (START HERE!)**
- `src/types/index.ts` - TypeScript type definitions
- `src/lib/supabase/queries.ts` - Database query functions
- `src/lib/hooks/useAuth.ts` - Authentication hook
- `src/lib/utils/validators.ts` - Form validation schemas
- `middleware.ts` - Route protection middleware

## Available Query Functions

```typescript
// Services
serviceQueries.getAll()
serviceQueries.getActive()
serviceQueries.create(data)
serviceQueries.update(id, data)
serviceQueries.delete(id)

// Portfolios
portfolioQueries.getAll()
portfolioQueries.getFeatured()
portfolioQueries.getByCategory(category)

// Testimonials
testimonialQueries.getAll()
testimonialQueries.getApproved()

// Messages
messageQueries.getAll()
messageQueries.getUnread()
messageQueries.markAsRead(id)

// Dashboard
dashboardQueries.getStats()
```

## Authentication Hook

```typescript
const { user, loading, signIn, signOut } = useAuth()

// Sign in
await signIn('email@example.com', 'password')

// Sign out
await signOut()
```

## Next Steps

1. ✅ Database schema created
2. ✅ Core libraries configured
3. ✅ Authentication setup
4. 🔲 Create admin user (DO THIS NOW!)
5. 🔲 Build login page
6. 🔲 Build admin layout
7. 🔲 Build admin dashboard
8. 🔲 Build CRUD pages
9. 🔲 Build public pages

**👉 See `de.md` for detailed implementation guide!**

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Ready to build! Start with creating your admin user, then follow the roadmap in `de.md`** 🚀
# orbwebstudio
