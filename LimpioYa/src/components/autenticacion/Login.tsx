import { Link, useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { UserRound, ShieldCheck } from "lucide-react";
import type { Rol } from "../../models/usuario.model";
import { useAuth } from "../../hooks/useAuth";
import { AuthLayout } from "./AuthLayout";
import { Notice } from "../shared/UI";
export function Login() {
  return (
    <AuthLayout>
      <div className="auth-form">
        <span className="eyebrow">INICIAR SESIÓN</span>
        <h1>Tu espacio en LimpioYa.</h1>
        <p>Selecciona cómo quieres ingresar.</p>
        <div className="role-options">
          <Link to="/login/cliente">
            <UserRound size={28} />
            <strong>Cliente</strong>
            <span>Gestiona tus pedidos y entregas.</span>
          </Link>
          <Link to="/login/administrador">
            <ShieldCheck size={28} />
            <strong>Administrador</strong>
            <span>Organiza la operación de tu lavandería.</span>
          </Link>
        </div>
        <p>
          ¿Primera vez aquí? <Link to="/register">Registro</Link>
        </p>
        <Link className="text-button" to="/">
          Volver a inicio
        </Link>
      </div>
    </AuthLayout>
  );
}
export function RoleLogin({ rol }: { rol: Rol }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function submit(e: FormEvent) {
    e.preventDefault();
    try {
      login(email.trim(), password, rol);
      navigate(rol === "admin" ? "/admin" : "/cliente");
    } catch (err) {
      setError((err as Error).message);
    }
  }
  return (
    <AuthLayout>
      <div className="auth-form">
        <Link className="text-button" to="/login">
          Cambiar tipo de acceso
        </Link>
        <span className="eyebrow">
          {rol === "admin" ? "ADMINISTRADOR" : "CLIENTE"}
        </span>
        <h1>Qué bueno verte.</h1>
        <p>Inicia sesión y continúa donde lo dejaste.</p>
        <form onSubmit={submit}>
          <label>
            Correo electrónico
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
            />
          </label>
          <Notice error message={error} />
          <button className="button full">Iniciar sesión</button>
        </form>
        <div className="demo-access">
          <strong>Acceso de demostración</strong>
          <span>
            {rol === "admin" ? "admin" : "cliente"}@limpioya.co · demo123
          </span>
          <button
            className="text-button"
            onClick={() => {
              setEmail(
                (rol === "admin" ? "admin" : "cliente") + "@limpioya.co",
              );
              setPassword("demo123");
            }}
          >
            Usar estos datos
          </button>
        </div>
        {rol === "cliente" && (
          <p>
            ¿No tienes una cuenta? <Link to="/register">Registro</Link>
          </p>
        )}
      </div>
    </AuthLayout>
  );
}
