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

export interface User {
  user_id: number;
  user_role: string;
  user_name: string;
  mobile: string;
  email: string;
}
