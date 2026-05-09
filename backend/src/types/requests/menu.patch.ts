import { Request } from "express";

type UserPatchParams = {
  id: string;
};

type UserPatchBody = {
  user_first_name?: string;
  user_last_name?: string;
  user_email?: string;
  mobile_number?: string;
  city?: string;
  street?: string;
  house_number?: number;
  zip_code?: string;
  country?: string;
  is_active?: boolean;
};

export type UserPatchRequest = Request<UserPatchParams, unknown, UserPatchBody>;
