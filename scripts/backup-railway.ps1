param(
    [Parameter(Mandatory = $true)]
    [string]$RailwayUrl,

    [string]$BackupFile = (Join-Path $PSScriptRoot ("backups\stiqrhub_backup_{0:yyyyMMdd_HHmmss}" -f (Get-Date) + ".dump")),

    [string]$TargetHost = "japri.dnstech.co.id",
    [int]$TargetPort = 31511,
    [string]$TargetUser = "postgres",
    [string]$TargetPassword = "s3cUr3P@Deb3",
    [string]$TargetDatabase = "stiqrhub",

    [switch]$PlainSql
)

function Test-Command {
    param([string]$Name)
    $null -ne (Get-Command $Name -ErrorAction SilentlyContinue)
}

if (-not (Test-Command "pg_dump")) {
    Write-Error "pg_dump tidak ditemukan di PATH. Install PostgreSQL client terlebih dahulu."
    exit 1
}

$backupDir = Split-Path $BackupFile -Parent
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
}

Write-Host "Membackup database Railway..."
$dumpArgs = @("--dbname=$RailwayUrl", "--verbose")
if ($PlainSql) {
    $dumpArgs += @("--format=p")
} else {
    $dumpArgs += @("--format=custom")
}
$dumpArgs += @("--file=$BackupFile")

$dumpResult = & pg_dump @dumpArgs
if ($LASTEXITCODE -ne 0) {
    Write-Error "pg_dump gagal. Periksa koneksi Railway atau credential."
    exit $LASTEXITCODE
}

Write-Host "Backup tersimpan di: $BackupFile"

if (-not (Test-Command "pg_restore")) {
    Write-Error "pg_restore tidak ditemukan di PATH. Install PostgreSQL client terlebih dahulu."
    exit 1
}

Write-Host ("Merestore ke server target ({0}:{1} / {2})..." -f $TargetHost, $TargetPort, $TargetDatabase)
$env:PGPASSWORD = $TargetPassword
if ($PlainSql) {
    if (-not (Test-Command "psql")) {
        Write-Error "psql tidak ditemukan di PATH. Install PostgreSQL client."
        exit 1
    }
    & psql -h $TargetHost -p $TargetPort -U $TargetUser -d $TargetDatabase -f $BackupFile
} else {
    & pg_restore --clean --if-exists -h $TargetHost -p $TargetPort -U $TargetUser -d $TargetDatabase $BackupFile
}
$restoreExit = $LASTEXITCODE
Remove-Item Env:PGPASSWORD

if ($restoreExit -ne 0) {
    Write-Error "pg_restore/psql restore gagal dengan kode $restoreExit."
    exit $restoreExit
}

Write-Host "Restore selesai."

