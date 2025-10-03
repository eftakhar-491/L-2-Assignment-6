const Role = {
  ADMIN: "ADMIN",
  RIDER: "RIDER",
  DRIVER: "DRIVER",
};
export default Role;

export type TRole = keyof typeof Role;
