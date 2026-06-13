export interface IGrafanaSnapshot {
  id: string;
  url: string;
  label: string;
  snapshot_from: string;
  snapshot_to: string;
  created_at: string;
}

/**
 * The raw DB row shape, before serialization: the date columns are still
 * `Date` objects rather than the ISO strings exposed on `IGrafanaSnapshot`.
 */
export interface IGrafanaSnapshotRow
  extends Omit<
    IGrafanaSnapshot,
    "created_at" | "snapshot_from" | "snapshot_to"
  > {
  snapshot_from: Date;
  snapshot_to: Date;
  created_at: Date;
}

export interface RecentSnapshotResponseDTO {
  data: IGrafanaSnapshot | null;
  message: string;
  uptime: string;
}

export interface CreateSnapshotRequestDTO {
  url: string;
  label: string;
  snapshot_from: string;
  snapshot_to: string;
  password: string;
}

export interface CreateSnapshotResponseDTO {
  data: IGrafanaSnapshot;
  message: string;
  uptime: string;
}
