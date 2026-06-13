-- AlterTable
ALTER TABLE "grafana_snapshot"
  ADD COLUMN "snapshot_from" TIMESTAMPTZ(6) NOT NULL DEFAULT '-infinity',
  ADD COLUMN "snapshot_to"   TIMESTAMPTZ(6) NOT NULL DEFAULT 'infinity';
