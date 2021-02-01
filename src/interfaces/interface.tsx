export interface IUser {
  id: number|null;
  email: string;
}

export interface IAccount {
  id: number|null;
  userId: number;
  name: string;
}

export const API_URL = "http://localhost:8080"

