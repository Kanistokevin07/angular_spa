import { User } from '../models/user.model';

export const MOCK_USERS: User[] = [
  {
    id: 1,
    username: 'Alice',
    password: '123',
    role: 'General User',
    email: 'alice@test.com'
  },
  {
    id: 2,
    username: 'Bob',
    password: '123',
    role: 'General User',
    email: 'bob@test.com'
  },
  {
    id: 3,
    username: 'Charlie',
    password: '123',
    role: 'Admin',
    email: 'charlie@test.com'
  },
  {
    id: 4,
    username: 'Diana',
    password: '1234453',
    role: 'General User',
    email: 'diana@test.com'
  }
];