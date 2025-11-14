# Script untuk backup database Railway
# Usage: .\backup-railway-db.ps1

Write-Host "=== Railway Database Backup ===" -ForegroundColor Cyan
Write-Host ""

# Cek apakah DATABASE_URL sudah di-set
if (-not $env:DATABASE_URL -and -not $env:DATABASE_PUBLIC_URL) {
    Write-Host "ERROR: DATABASE_URL atau DATABASE_PUBLIC_URL belum di-set!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Cara set:" -ForegroundColor Yellow
    Write-Host '  $env:DATABASE_URL = "postgresql://user:password@host:port/database"' -ForegroundColor Gray
    Write-Host ""
    Write-Host "Atau set manual:" -ForegroundColor Yellow
    Write-Host '  $env:PGHOST = "ballast.proxy.rlwy.net"' -ForegroundColor Gray
    Write-Host '  $env:PGPORT = "27173"' -ForegroundColor Gray
    Write-Host '  $env:PGUSER = "postgres"' -ForegroundColor Gray
    Write-Host '  $env:PGPASSWORD = "your_password"' -ForegroundColor Gray
    Write-Host '  $env:PGDATABASE = "railway"' -ForegroundColor Gray
    Write-Host ""
    exit 1
}

# Tentukan connection string yang akan dipakai
$dbUrl = if ($env:DATABASE_URL) { $env:DATABASE_URL } else { $env:DATABASE_PUBLIC_URL }

# Generate filename dengan timestamp
$timestamp = Get-Date -Format 'yyyyMMdd_HHmmss'
$backupFile = "backup_railway_$timestamp.sql"

Write-Host "Backing up database..." -ForegroundColor Yellow
Write-Host "Connection: $($dbUrl -replace ':[^:@]+@', ':****@')" -ForegroundColor Gray
Write-Host "Output file: $backupFile" -ForegroundColor Gray
Write-Host ""

# Backup database
try {
    if ($env:DATABASE_URL -or $env:DATABASE_PUBLIC_URL) {
        # Pakai connection string
        pg_dump --dbname=$dbUrl --file=$backupFile --verbose
    } else {
        # Pakai individual variables
        pg_dump `
            --host=$env:PGHOST `
            --port=$env:PGPORT `
            --username=$env:PGUSER `
            --dbname=$env:PGDATABASE `
            --file=$backupFile `
            --verbose
    }
    
    if ($LASTEXITCODE -eq 0) {
        $fileSize = (Get-Item $backupFile).Length / 1MB
        Write-Host ""
        Write-Host "✓ Backup berhasil!" -ForegroundColor Green
        Write-Host "  File: $backupFile" -ForegroundColor Gray
        Write-Host "  Size: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Gray
    } else {
        Write-Host ""
        Write-Host "✗ Backup gagal!" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host ""
    Write-Host "✗ Error: $_" -ForegroundColor Red
    exit 1
}

