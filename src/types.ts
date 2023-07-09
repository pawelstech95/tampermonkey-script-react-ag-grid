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
  avail: string; // todo
  note: string
}


export interface Developer {
  uuid: string;
  note: string;
  display_name?: string;
  position?: string;
  seniority?: string;
}

export interface Seniority {
  uuid: string;
  text: string;
  level: number;
}

export interface MutatedDevelopers extends Omit<Developer, 'uuid' | 'note'> {
  avail?: string;
}

export interface DevelopersResponse {
  results?: Developer[];
  count: number;
}
