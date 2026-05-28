import { Request } from "express";
import { ApiError } from "./errors.js";

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
export type InsertUserResult = {
  result: {
    user_id: number;
    role: string;
  };
};
export type DbUserInsert = {
  user_first_name: string;
  user_last_name: string;
  user_email: string;
  password_hash: string;
  mobile_number: string;
  city: string;
  street: string;
  house_number: number;
  zip_code: string;
  country: string;
};
export type DbUser = {
  user_id: number;
  user_first_name: string;
  user_last_name: string;
  user_email: string;
  password_hash: string;
  mobile_number: string;
  city: string;
  street: string;
  house_number: number;
  zip_code: string;
  country: string;
  is_active: boolean;
};

export interface UserAuthContext {
  user_id: number;
  user_role: "user" | "admin" | "employee";
}
export interface User {
  user_id: number;
  user_role: string;
  user_name: string;
  mobile: string;
  email: string;
}

export interface UserRequest extends Request {
  user?: UserAuthContext;
}

export { ApiError };
