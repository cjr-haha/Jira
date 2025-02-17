export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}
export interface UserAuth {
  username: string;
  password: string;
}
