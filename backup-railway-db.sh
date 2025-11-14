#!/bin/bash

# Script untuk backup database Railway
# Usage: ./backup-railway-db.sh

echo "=== Railway Database Backup ==="
echo ""

# Cek apakah DATABASE_URL sudah di-set
if [ -z "$DATABASE_URL" ] && [ -z "$DATABASE_PUBLIC_URL" ]; then
    echo "ERROR: DATABASE_URL atau DATABASE_PUBLIC_URL belum di-set!"
    echo ""
    echo "Cara set:"
    echo '  export DATABASE_URL="postgresql://user:password@host:port/database"'
    echo ""
    echo "Atau set manual:"
    echo '  export PGHOST="ballast.proxy.rlwy.net"'
    echo '  export PGPORT="27173"'
    echo '  export PGUSER="postgres"'
    echo '  export PGPASSWORD="your_password"'
    echo '  export PGDATABASE="railway"'
    echo ""
    exit 1
fi

# Tentukan connection string yang akan dipakai
DB_URL=${DATABASE_URL:-$DATABASE_PUBLIC_URL}

# Generate filename dengan timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_railway_${TIMESTAMP}.sql"

echo "Backing up database..."
echo "Connection: $(echo $DB_URL | sed 's/:[^:@]*@/:****@/')"
echo "Output file: $BACKUP_FILE"
echo ""

# Backup database
if [ -n "$DATABASE_URL" ] || [ -n "$DATABASE_PUBLIC_URL" ]; then
    # Pakai connection string
    pg_dump --dbname="$DB_URL" --file="$BACKUP_FILE" --verbose
else
    # Pakai individual variables
    pg_dump \
        --host="$PGHOST" \
        --port="$PGPORT" \
        --username="$PGUSER" \
        --dbname="$PGDATABASE" \
        --file="$BACKUP_FILE" \
        --verbose
fi

if [ $? -eq 0 ]; then
    FILE_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo ""
    echo "✓ Backup berhasil!"
    echo "  File: $BACKUP_FILE"
    echo "  Size: $FILE_SIZE"
else
    echo ""
    echo "✗ Backup gagal!"
    exit 1
fi

