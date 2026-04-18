export interface IDriverData {
  driver: string;
  rfid: string;
}

export interface DriversResponseDTO {
  data: IDriverData[];
  message: string;
  uptime: string;
}

export interface DriverHealthResponseDTO {
  date: Date;
  message: string;
  uptime: string;
}

export interface UpdateDriverInfoRequestDTO {
  Rfid: string;
  name: string;
  password: string;
}

export interface UpdateDriverInfoResponseDTO {
  message: string;
  uptime: string;
}

export interface UpdateDriverInfoErrorResponseDTO {
  error: string;
}