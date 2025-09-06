export interface IRegisterForm {
  username: string;
  email: string;
  password: string;
  role: "RIDER" | "DRIVER" | "ADMIN";
}
