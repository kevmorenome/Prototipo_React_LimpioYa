import { Link } from "react-router-dom";
import {
  Droplets,
  Shirt,
  CalendarDays,
  ShieldCheck,
  Sparkles,
  Check,
  Waves,
} from "lucide-react";
import { Brand } from "../shared/UI";
import { InicioSections } from "./InicioSections";
export function Inicio() {
  return (
    <div className="landing">
      <header className="public-header">
        <Brand />
        <nav>
          <Link className="public-login" to="/login">
            Iniciar sesión
          </Link>
          <Link className="button" to="/register">
            Registro
          </Link>
        </nav>
      </header>
      <main>
        <section className="landing-hero">
          <div className="hero-copy">
            <span className="eyebrow pill">
              <Sparkles size={16} /> TU LAVANDERÍA, MÁS SIMPLE
            </span>
            <h1>
              Ropa limpia.
              <br />
              Tiempo para <span>lo que importa.</span>
            </h1>
            <p>
              Nos encargamos de tus prendas. Tú sigue con tu día.
              <br className="desktop-only" /> Gestiona tus pedidos, programa tus
              entregas y disfruta de la frescura, sin complicaciones.
            </p>
            <div className="hero-actions">
              <Link className="button" to="/login">
                Iniciar sesión
              </Link>
              <Link className="button secondary" to="/register">
                Crear mi cuenta
              </Link>
            </div>
            <div className="hero-assurance">
              <span>
                <Check size={16} /> Cuidado en cada prenda
              </span>
              <span>
                <Check size={16} /> Todo en un solo lugar
              </span>
            </div>
          </div>
          <div className="hero-product">
            <div className="product-top">
              <span>
                <Droplets size={20} /> LA FRESCURA ESTÁ EN CAMINO
              </span>
              <span className="mini-tag">LimpioYa</span>
            </div>
            <div className="product-title">
              Tu próxima entrega,
              <br />
              <strong>sin pendientes.</strong>
            </div>
            <div className="hero-order">
              <div className="service-icon">
                <Shirt size={32} />
              </div>
              <div>
                <small>PEDIDO #LY-1048</small>
                <h3>Tu ropa, como nueva</h3>
                <p>Lavado y secado · 5 kg</p>
              </div>
              <span className="badge status-en-lavado">En lavado</span>
            </div>
            <div className="hero-steps">
              <span className="complete">
                <Check />
                Recibido
              </span>
              <span className="current">
                <Waves />
                En lavado
              </span>
              <span>
                <Shirt />
                Listo
              </span>
            </div>
            <div className="delivery-strip">
              <CalendarDays size={24} />
              <div>
                <small>ENTREGA PROGRAMADA</small>
                <strong>Viernes, 2 de octubre · 10:00 a. m.</strong>
              </div>
              <Check className="delivery-check" />
            </div>
            <div className="product-bottom">
              <ShieldCheck size={17} /> Tus prendas reciben el cuidado que
              merecen.
            </div>
          </div>
        </section>
        <section className="landing-benefits">
          <div>
            <span className="eyebrow">MENOS VUELTAS. MÁS FRESCURA.</span>
            <h2>Todo fluye con LimpioYa.</h2>
          </div>
          <article>
            <span className="feature-icon">
              <Shirt />
            </span>
            <h3>El cuidado que eliges</h3>
            <p>
              Lavado, secado y planchado.
              <br />
              Un servicio para cada necesidad.
            </p>
          </article>
          <article>
            <span className="feature-icon">
              <CalendarDays />
            </span>
            <h3>A tu ritmo</h3>
            <p>
              Organiza tus recogidas y entregas
              <br />
              en una agenda sencilla.
            </p>
          </article>
          <article>
            <span className="feature-icon">
              <Droplets />
            </span>
            <h3>Siempre al tanto</h3>
            <p>
              Consulta el estado de tus pedidos
              <br />y tus pagos cuando lo necesites.
            </p>
          </article>
        </section>
        <InicioSections />
      </main>
      <footer className="public-footer">
        <Brand />
        <span>Prototipo académico · React + TypeScript</span>
        <span>© 2026 LimpioYa</span>
      </footer>
    </div>
  );
}
