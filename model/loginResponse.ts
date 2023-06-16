import { User } from "./user";

export interface LoginResponse extends User {
  accessToken: string;
}