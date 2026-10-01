import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "./AuthLayout";
import { Notice } from "../shared/UI";
import { useClientes } from "../../hooks/useClientes";
export function Register() {
  const { guardar } = useClientes();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      guardar({
        nombre: String(data.get("nombre")).trim(),
        email: String(data.get("email")).trim(),
        telefono: String(data.get("telefono")).trim(),
        direccion: String(data.get("direccion")).trim(),
        password: String(data.get("password")),
        activo: true,
      });
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message);
    }
  }
  return (
    <AuthLayout>
      <div className="auth-form">
        <span className="eyebrow">REGISTRO</span>
        <h1>Más frescura en tu día.</h1>
        <p>Crea tu cuenta de cliente y organiza tu próximo lavado.</p>
        {success ? (
          <>
            <Notice message="Tu cuenta está lista. Ya puedes iniciar sesión como cliente." />
            <Link to="/login" className="button full">
              Iniciar sesión
            </Link>
          </>
        ) : (
          <form onSubmit={submit}>
            <label>
              Nombre completo
              <input
                name="nombre"
                required
                minLength={3}
                maxLength={80}
                autoComplete="name"
                placeholder="Tu nombre y apellido"
              />
            </label>
            <label>
              Correo electrónico
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="tu@correo.com"
              />
            </label>
            <div className="form-grid">
              <label>
                Teléfono
                <input
                  name="telefono"
                  type="tel"
                  required
                  minLength={7}
                  maxLength={20}
                  placeholder="310 123 4567"
                />
              </label>
              <label>
                Contraseña
                <input
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  placeholder="Mínimo 6 caracteres"
                />
              </label>
            </div>
            <label>
              Dirección
              <input
                name="direccion"
                required
                minLength={5}
                placeholder="Dirección de recogida o entrega"
              />
            </label>
            <Notice error message={error} />
            <button className="button full">Crear cuenta</button>
            <small>Usa datos ficticios para esta demostración local.</small>
          </form>
        )}
        <p>
          ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
        <Link className="text-button" to="/">
          Volver a inicio
        </Link>
      </div>
    </AuthLayout>
  );
}
