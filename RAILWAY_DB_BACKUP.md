# Cara Backup Database Railway

## Metode 1: Menggunakan Connection String dari Railway (Recommended)

### Step 1: Ambil Connection String dari Railway Dashboard
1. Buka Railway Dashboard
2. Pilih project dan service database PostgreSQL kamu
3. Klik tab **Variables**
4. Cari variable `DATABASE_URL` atau `DATABASE_PUBLIC_URL`
5. Copy connection string-nya (format: `postgresql://user:password@host:port/database`)

### Step 2: Set Environment Variable dan Backup

**Windows PowerShell:**
```powershell
# Set connection string dari Railway
$env:DATABASE_URL = "postgresql://postgres:password@ballast.proxy.rlwy.net:27173/railway"

# Atau jika pakai DATABASE_PUBLIC_URL
$env:DATABASE_PUBLIC_URL = "postgresql://postgres:password@ballast.proxy.rlwy.net:27173/railway"

# Backup database
pg_dump --dbname=$env:DATABASE_URL --file=backup_$(Get-Date -Format 'yyyyMMdd_HHmmss').sql --verbose
```

**Windows CMD:**
```cmd
set DATABASE_URL=postgresql://postgres:password@ballast.proxy.rlwy.net:27173/railway
pg_dump --dbname=%DATABASE_URL% --file=backup.sql --verbose
```

**Linux/Mac:**
```bash
export DATABASE_URL="postgresql://postgres:password@ballast.proxy.rlwy.net:27173/railway"
pg_dump --dbname=$DATABASE_URL --file=backup_$(date +%Y%m%d_%H%M%S).sql --verbose
```

## Metode 2: Menggunakan Railway TCP Proxy (Yang Sudah Kamu Set)

Jika sudah set TCP Proxy variables, gunakan ini:

**Windows PowerShell:**
```powershell
# Set variables (sesuaikan dengan nilai dari Railway)
$env:PGUSER = "postgres"
$env:PGPASSWORD = "password_dari_railway"  # Ganti dengan password yang benar
$env:PGDATABASE = "railway"
$env:PGHOST = "ballast.proxy.rlwy.net"
$env:PGPORT = "27173"

# Backup
pg_dump --dbname=$env:PGDATABASE --host=$env:PGHOST --port=$env:PGPORT --username=$env:PGUSER --file=backup_$(Get-Date -Format 'yyyyMMdd_HHmmss').sql --verbose
```

**Catatan:** 
- `PGPASSWORD` harus di-set, atau `pg_dump` akan minta password interaktif
- Port yang benar adalah `27173` (bukan 12345)

## Metode 3: Menggunakan Railway CLI (Paling Mudah)

```bash
# Install Railway CLI dulu
npm i -g @railway/cli

# Login
railway login

# Link ke project
railway link

# Backup database
railway run pg_dump --file=backup.sql
```

## Troubleshooting

### Error: "database does not exist"
- Pastikan `PGDATABASE` atau database name di connection string benar
- Railway biasanya pakai database name: `railway` atau `postgres`

### Error: "connection refused" atau "connection timeout"
- Pastikan Railway TCP Proxy sudah aktif
- Cek host dan port sudah benar
- Pastikan IP kamu di-whitelist di Railway (jika ada firewall)

### Error: "password authentication failed"
- Pastikan password di connection string benar
- Cek di Railway Variables untuk password yang benar

## Tips

1. **Gunakan Connection String Lengkap** (Metode 1) - Paling mudah dan reliable
2. **Backup dengan Timestamp** - Supaya tidak overwrite backup sebelumnya
3. **Compress Backup** - Untuk database besar:
   ```powershell
   pg_dump --dbname=$env:DATABASE_URL --file=- | gzip > backup_$(Get-Date -Format 'yyyyMMdd_HHmmss').sql.gz
   ```

