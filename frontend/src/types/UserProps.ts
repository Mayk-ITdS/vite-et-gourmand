interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
}

type AuthUser = {
  id: number | string;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "employee" | "admin";
};
export { type AuthUser, type Profile };
