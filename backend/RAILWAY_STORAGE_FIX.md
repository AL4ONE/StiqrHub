# Fix: Gambar Hilang Setelah Deploy di Railway

## 🔴 Masalah
Gambar hilang setiap deploy karena disimpan di local filesystem yang tidak persisten.

## ✅ Solusi Cepat: Railway Volume

### Step 1: Buat Volume di Railway Dashboard

1. Buka **Railway Dashboard** → Pilih service backend kamu
2. Klik tab **Volumes** (di sidebar kiri)
3. Klik **+ New Volume**
4. Isi form:
   ```
   Name: storage-volume
   Mount Path: /app/storage/app/public
   Size: 1GB (atau sesuai kebutuhan)
   ```
5. Klik **Create**

### Step 2: Pastikan Storage Link Dibuat

Railway akan otomatis menjalankan `composer install` yang sudah include `storage:link` di `post-install-cmd`.

**Tapi kalau masih error**, tambahkan di Railway **Start Command**:
```bash
php artisan storage:link && php artisan serve --host=0.0.0.0 --port=$PORT
```

### Step 3: Test

1. Upload gambar event banner
2. Deploy ulang aplikasi
3. Cek apakah gambar masih ada

---

## 🚀 Solusi Production: Cloud Storage (S3)

### Step 1: Install AWS SDK
```bash
composer require league/flysystem-aws-s3-v3 "^3.0"
```

### Step 2: Setup AWS S3

1. **Buat S3 Bucket:**
   - Login ke AWS Console
   - Buat bucket baru (contoh: `stiqrhub-storage`)
   - Set region: `ap-southeast-1` (Singapore)
   - Uncheck "Block all public access" (atau set bucket policy untuk public read)

2. **Buat IAM User:**
   - IAM → Users → Create user
   - Attach policy: `AmazonS3FullAccess` (atau custom policy untuk bucket tertentu)
   - Ambil **Access Key ID** dan **Secret Access Key**

### Step 3: Update Railway Environment Variables

Tambahkan di Railway → Service → Variables:
```
FILESYSTEM_DISK=s3
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_DEFAULT_REGION=ap-southeast-1
AWS_BUCKET=stiqrhub-storage
AWS_URL=https://stiqrhub-storage.s3.ap-southeast-1.amazonaws.com
```

### Step 4: Update Code (Jika perlu)

File `config/filesystems.php` sudah support S3, jadi tidak perlu diubah.

### Step 5: Test

1. Upload gambar
2. Cek apakah tersimpan di S3 bucket
3. Cek URL gambar bisa diakses

---

## 📝 Catatan Penting

1. **Railway Volume:**
   - ✅ Gratis untuk development
   - ✅ Mudah setup
   - ⚠️ Terbatas ukuran (max 20GB di free tier)
   - ⚠️ Hanya untuk 1 service

2. **AWS S3:**
   - ✅ Unlimited storage
   - ✅ CDN support
   - ✅ Production ready
   - ⚠️ Ada biaya (tapi murah, ~$0.023/GB/month)

3. **Hybrid Approach:**
   - Development: Railway Volume
   - Production: AWS S3

---

## 🔧 Troubleshooting

### Gambar masih hilang setelah setup Volume?
1. Cek apakah volume sudah di-mount: `ls -la /app/storage/app/public`
2. Pastikan storage:link sudah dijalankan
3. Cek permission folder: `chmod -R 775 storage`

### Error "Storage disk not found"?
1. Cek environment variable `FILESYSTEM_DISK`
2. Pastikan value sesuai dengan disk yang ada di `config/filesystems.php`

### URL gambar 404?
1. Pastikan `APP_URL` di Railway environment variables sudah benar
2. Untuk S3, pastikan bucket policy allow public read
3. Cek `storage:link` sudah dijalankan



