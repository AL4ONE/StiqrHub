# StiqrHub Monorepo

Repositori ini berisi dua kode dasar:

- `backend/` – API Laravel untuk autentikasi, pengelolaan event, pembayaran, dan fitur operasional lainnya.
- `frontend/` – aplikasi React (Vite) yang menampilkan dashboard EO, tenant, admin, dan insurer.

## Prasyarat

- Node.js ≥ 18 dan npm/pnpm
- PHP 8.2, Composer, serta ekstensi standar Laravel
- PostgreSQL

## Cara Menjalankan Lokal

### Backend
```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
Pastikan `VITE_BACKEND_URL` mengarah ke alamat backend lokal.

## Deploy Singkat

1. Build frontend: `npm run build`.
2. Upload artefak build ke hosting static.
3. Jalankan `php artisan migrate --force` di server backend.
4. Sinkronkan konfigurasi `.env` produksi (endpoint API, QRIS, dsb).

## Lisensi

Proyek internal StiqrHub. Distribusi dan penggunaan kode mengikuti kebijakan perusahaan.

