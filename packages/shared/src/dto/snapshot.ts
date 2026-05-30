export interface IGrafanaSnapshot {
  id: string;
  url: string;
  label: string;
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
  password: string;
}

export interface CreateSnapshotResponseDTO {
  data: IGrafanaSnapshot;
  message: string;
  uptime: string;
}
