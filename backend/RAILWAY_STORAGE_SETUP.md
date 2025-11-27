# Setup Persistent Storage untuk Railway

## Masalah
Gambar hilang setiap deploy karena disimpan di local filesystem yang tidak persisten.

## Solusi 1: Railway Volume (Recommended untuk Development)

### Step 1: Buat Volume di Railway
1. Buka Railway Dashboard
2. Pilih service backend kamu
3. Klik tab **Volumes**
4. Klik **+ New Volume**
5. Isi:
   - **Name**: `storage-volume`
   - **Mount Path**: `/app/storage/app/public`
   - **Size**: 1GB (atau sesuai kebutuhan)

### Step 2: Update Environment Variables
Tambahkan di Railway Environment Variables:
```
STORAGE_PATH=/app/storage/app/public
```

### Step 3: Pastikan storage:link dijalankan
Pastikan di Railway build command atau startup command ada:
```bash
php artisan storage:link
```

## Solusi 2: Cloud Storage (Recommended untuk Production)

### Menggunakan AWS S3

#### Step 1: Install Package
```bash
composer require league/flysystem-aws-s3-v3 "^3.0"
```

#### Step 2: Setup AWS S3
1. Buat bucket di AWS S3
2. Buat IAM user dengan permission S3
3. Ambil Access Key ID dan Secret Access Key

#### Step 3: Update Environment Variables di Railway
```
FILESYSTEM_DISK=s3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_DEFAULT_REGION=ap-southeast-1
AWS_BUCKET=your-bucket-name
AWS_URL=https://your-bucket-name.s3.ap-southeast-1.amazonaws.com
```

#### Step 4: Update filesystems.php
File sudah dikonfigurasi, hanya perlu set environment variable.

### Menggunakan Cloudinary (Alternatif)

#### Step 1: Install Package
```bash
composer require cloudinary-labs/cloudinary-laravel
```

#### Step 2: Setup Cloudinary
1. Daftar di cloudinary.com
2. Ambil Cloud Name, API Key, dan API Secret

#### Step 3: Update Environment Variables
```
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
```

## Solusi 3: Hybrid (Local untuk Dev, Cloud untuk Production)

Update `.env` atau Railway environment variables:
```
# Development (Railway dengan Volume)
FILESYSTEM_DISK=public

# Production (Cloud Storage)
FILESYSTEM_DISK=s3
```

## Testing
Setelah setup, test upload gambar dan pastikan:
1. Gambar tersimpan
2. Gambar masih ada setelah deploy ulang
3. URL gambar bisa diakses



