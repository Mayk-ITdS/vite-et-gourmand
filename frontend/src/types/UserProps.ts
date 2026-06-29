interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  city: string;
  street: string;
  houseNumber: number;
  zipCode: string;
  country: string;
  isActive?: boolean;
}

type AuthUser = {
  id: number | string;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "employee" | "admin";
};
export { type AuthUser, type Profile };
