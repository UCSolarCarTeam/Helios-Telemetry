export interface IGrafanaSnapshot {
  id: string;
  url: string;
  label: string;
  snapshot_from: string;
  snapshot_to: string;
  created_at: string;
}

export interface SnapshotListResponseDTO {
  data: IGrafanaSnapshot[];
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
