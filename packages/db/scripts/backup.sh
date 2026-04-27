#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_DIR="$SCRIPT_DIR/../backups"
ENV_FILE="$SCRIPT_DIR/../.env"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OUTPUT="$BACKUP_DIR/backup_$TIMESTAMP.sql"

PG_DUMP="${PG_DUMP:-pg_dump}"
PSQL="${PSQL:-psql}"

# Prefer pg17 binaries if available to match the Docker Postgres version
if [ -x "/opt/homebrew/opt/postgresql@17/bin/pg_dump" ]; then
  PG_DUMP="/opt/homebrew/opt/postgresql@17/bin/pg_dump"
  PSQL="/opt/homebrew/opt/postgresql@17/bin/psql"
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: .env not found at $ENV_FILE"
  exit 1
fi

export $(grep -v '^#' "$ENV_FILE" | grep -v '^$' | xargs)

if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL not set in .env"
  exit 1
fi

TABLE_COUNT=$("$PSQL" "$DATABASE_URL" -tAc \
  "SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public'")

if [ "$TABLE_COUNT" -eq 0 ]; then
  echo "Error: database has no tables — run migrations before backing up."
  exit 1
fi

mkdir -p "$BACKUP_DIR"

"$PG_DUMP" "$DATABASE_URL" > "$OUTPUT"

echo "Backup saved to: backups/backup_$TIMESTAMP.sql (tables: $TABLE_COUNT)"
