import type { ReactNode } from "react";
import { Droplets, ShieldCheck } from "lucide-react";
import { Brand } from "../shared/UI";
export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="auth-layout">
      <section className="auth-story">
        <Brand light />
        <div>
          <span className="eyebrow">BIENVENIDO A LA FRESCURA</span>
          <h1>
            Un día más ligero
            <br />
            empieza aquí.
          </h1>
          <p>
            Tus prendas cuidadas.
            <br />
            Tus pedidos organizados.
            <br />
            Tu tiempo de vuelta.
          </p>
          <div className="auth-symbol">
            <Droplets size={70} />
            <span>
              Limpieza que se siente.
              <br />
              Organización que se nota.
            </span>
          </div>
        </div>
        <small>
          <ShieldCheck size={16} /> Prototipo académico · Datos locales
        </small>
      </section>
      <section className="auth-form-area">{children}</section>
    </main>
  );
}
