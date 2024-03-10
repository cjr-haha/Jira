export interface Project {
  personId: number;
  organization: string;
  created: number;
  ownerId: number;
  name: string;
  id: number;
  pin: boolean;
}

export interface TeamUsers {
  id: number | string;
  name: string | string;
  organization: string;
  ownerId: number;
}
