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

COMPOSE_FILE="$SCRIPT_DIR/../docker-compose.yml"

if ! docker compose -f "$COMPOSE_FILE" ps --status running db 2>/dev/null | grep -q "db"; then
  echo "Error: Docker container 'db' is not running — run 'yarn db:up' first."
  exit 1
fi

{ echo "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"; cat "$FILE"; } \
  | docker compose -f "$COMPOSE_FILE" exec -T db \
    psql --dbname="$DATABASE_URL" -v ON_ERROR_STOP=1 --single-transaction

echo "Restored from: $FILE"
