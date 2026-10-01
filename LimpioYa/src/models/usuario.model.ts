export type Rol = "cliente" | "admin";
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: Rol;
}
