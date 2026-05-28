import { Request } from "express";

export type AuthUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin" | "employee";
};

export type AuthJwtPayload = {
  sub: number;
  role: "user" | "admin" | "employee";
};

export interface UserAuthContext {
  user_id: number;
  user_role: "user" | "admin" | "employee";
}

export interface UserRequest extends Request {
  user?: UserAuthContext;
}
