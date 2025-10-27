# 🔐 Admin Login Setup Guide

## 📋 Prerequisites

1. **Supabase Project**: Pastikan Anda sudah memiliki project Supabase yang aktif
2. **Environment Variables**: Setup environment variables untuk Supabase
3. **Database**: Pastikan migration sudah dijalankan

## 🚀 Setup Steps

### 1. Environment Variables

Buat file `.env.local` di root project dengan isi:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Cara mendapatkan URL dan Key:**
1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Pergi ke **Settings** → **API**
4. Copy **Project URL** dan **anon public** key

### 2. Create Admin User

#### Option A: Via Supabase Dashboard (Recommended)
1. Buka **Supabase Dashboard** → **Authentication** → **Users**
2. Klik **"Add User"**
3. Isi form:
   - **Email**: `admin@orbwebstudio.com`
   - **Password**: `admin123`
   - **Auto Confirm**: ✅ (centang)
4. Klik **"Create User"**

#### Option B: Via SQL Editor
1. Buka **Supabase Dashboard** → **SQL Editor**
2. Jalankan script `create-admin-user.sql`
3. Klik **"Run"**

### 3. Test Login

1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Buka Login Page**:
   ```
   http://localhost:3000/login
   ```

3. **Login dengan**:
   - **Email**: `admin@orbwebstudio.com`
   - **Password**: `admin123`

4. **Setelah login** akan redirect ke `/admin`

## 🔧 Troubleshooting

### ❌ Form Login Tidak Muncul

**Penyebab**: Komponen Input/Card tidak ter-render
**Solusi**: 
1. Pastikan semua dependencies terinstall:
   ```bash
   npm install
   ```
2. Restart development server:
   ```bash
   npm run dev
   ```

### ❌ "Missing Supabase environment variables"

**Penyebab**: Environment variables tidak diset
**Solusi**:
1. Buat file `.env.local` di root project
2. Isi dengan URL dan Key Supabase yang benar
3. Restart development server

### ❌ "Invalid email or password"

**Penyebab**: User belum dibuat atau password salah
**Solusi**:
1. Pastikan user sudah dibuat di Supabase Auth
2. Pastikan email sudah confirmed
3. Cek password yang benar

### ❌ Login berhasil tapi tidak redirect

**Penyebab**: useAuth hook tidak mendeteksi session
**Solusi**:
1. Cek console browser untuk error
2. Pastikan Supabase client configuration benar
3. Cek network tab untuk request ke Supabase

## 🎯 Default Admin Credentials

```
Email: admin@orbwebstudio.com
Password: admin123
```

⚠️ **PENTING**: Ganti password default setelah login pertama!

## 📱 Features Login Form

- ✅ **Responsive Design**: Mobile-friendly
- ✅ **Dark Theme**: Konsisten dengan website
- ✅ **Form Validation**: Real-time validation
- ✅ **Password Toggle**: Show/hide password
- ✅ **Remember Me**: Session persistence
- ✅ **Loading States**: Smooth UX
- ✅ **Error Handling**: Toast notifications
- ✅ **Auto Redirect**: Redirect setelah login

## 🔒 Security Features

- **Supabase Auth**: Secure authentication
- **Row Level Security**: Database protection
- **Session Management**: Auto refresh tokens
- **Password Hashing**: Bcrypt encryption
- **Email Confirmation**: Required for new users

## 📞 Support

Jika masih ada masalah:
1. Cek console browser untuk error
2. Pastikan semua dependencies terinstall
3. Restart development server
4. Cek Supabase project status
