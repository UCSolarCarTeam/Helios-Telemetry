#!/bin/bash
set -e

FILE=$1
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/../.env"

if [ -z "$FILE" ]; then
  echo "Usage: restore.sh <backup_file>"
  echo "Example: restore.sh backups/backup_20260426_120000.sql"
  exit 1
fi

if [ ! -f "$FILE" ]; then
  echo "Error: file not found: $FILE"
  exit 1
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

PSQL="${PSQL:-psql}"
if [ -x "/opt/homebrew/opt/postgresql@17/bin/psql" ]; then
  PSQL="/opt/homebrew/opt/postgresql@17/bin/psql"
fi

"$PSQL" "$DATABASE_URL" -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

"$PSQL" "$DATABASE_URL" < "$FILE"

echo "Restored from: $FILE"
