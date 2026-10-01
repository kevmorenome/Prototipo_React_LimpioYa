import { createContext, type ReactNode } from "react";
import type { Usuario, Rol } from "../models/usuario.model";
import { useLocalState } from "../hooks/useLocalState";
import { useClientes } from "../hooks/useClientes";
interface AuthValue {
  usuario: Usuario | null;
  login: (email: string, password: string, rol: Rol) => void;
  logout: () => void;
}
export const AuthContext = createContext<AuthValue | undefined>(undefined);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useLocalState<Usuario | null>("sesion", null);
  const { clientes } = useClientes();
  const login = (email: string, password: string, rol: Rol) => {
    if (
      rol === "admin" &&
      email.toLowerCase() === "admin@limpioya.co" &&
      password === "demo123"
    ) {
      setUsuario({ id: "admin", nombre: "Mariana López", email, rol });
      return;
    }
    const cliente = clientes.find(
      (c) =>
        c.email.toLowerCase() === email.toLowerCase() &&
        c.password === password &&
        c.activo,
    );
    if (rol !== "cliente" || !cliente)
      throw new Error(
        "Correo o contraseña incorrectos. Revisa también el tipo de acceso.",
      );
    setUsuario({
      id: cliente.id,
      nombre: cliente.nombre,
      email: cliente.email,
      rol,
    });
  };
  return (
    <AuthContext.Provider
      value={{ usuario, login, logout: () => setUsuario(null) }}
    >
      {children}
    </AuthContext.Provider>
  );
}
