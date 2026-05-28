import { Request } from "express";

class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true,
  ) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
    /*
    Manual prototype restoration:
    Necessary when extending built-in classes in TS/ES5+ to
    ensure 'instancof ApiError' is working correctly accross the app
    meaning that the tracking of error is preserverd,
    while without it, ES5 compilation would stop it`s prototype 'chain propagation'.
    */
  }
}
export type AuthUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin" | "employee";
};
type AuthJwtPayload = {
  sub: number;
  role: "user" | "admin" | "employee";
};
type InsertUserResult = {
  result: {
    user_id: number;
    role: string;
  };
};
type DbUserInsert = {
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
type DbUser = {
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

interface UserAuthContext {
  user_id: number;
  user_role: "user" | "admin" | "employee";
}
interface User {
  user_id: number;
  user_role: string;
  user_name: string;
  mobile: string;
  email: string;
}

interface UserRequest extends Request {
  user?: UserAuthContext;
}
export {
  ApiError,
  type InsertUserResult,
  type User,
  type UserRequest,
  type UserAuthContext,
  type DbUser,
  type DbUserInsert,
};
