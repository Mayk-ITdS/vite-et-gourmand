type UserPanelProps =
  | "profile"
  | "orders"
  | "tracking"
  | "history"
  | "preferences"
  | "messages";
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
  role: string;
};
export { type UserPanelProps, type AuthUser, type Profile };
