import { User } from '../models/user.model';

export const USERS: User[] = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'Admin',
    email: 'admin@test.com'
  },
  {
    id: 2,
    username: 'kevin',
    password: '1234',
    role: 'General User',
    email: 'kevin@test.com'
  }
];