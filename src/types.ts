export interface SnapshotResponse {
  people?: Person[];
  meta: Meta;
}

export interface Meta {
  view: string;
  availability: number;
  order_by: string;
  page: number;
  start_date: Date;
  end_date: Date;
  format: string;
  status: number[];
}

export interface Person {
  uuid: string;
  name: string;
  department: null | string;
  seniority: null | string;
  position: null | string;
  available_hours: number;
  capacity: number;
  archived: boolean;
  available_minutes: number;
  availability: number;
  capacity_hours: number;
  employment_status: number;
}
