export interface User {
  id: number;
  username: string;
  password: string;
  role: 'Admin' | 'General User';
  email: string;
}