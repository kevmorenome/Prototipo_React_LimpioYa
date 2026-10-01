import { Link } from "react-router-dom";
import {
  ClipboardList,
  CalendarDays,
  PackageCheck,
  Shirt,
  Waves,
  Wind,
  Sparkles,
} from "lucide-react";
import { useServicios } from "../../hooks/useServicios";
import { money } from "../../services/storage.service";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Elige el cuidado",
    text: "Selecciona tus servicios, indica las cantidades y crea tu pedido desde tu panel.",
  },
  {
    number: "02",
    icon: CalendarDays,
    title: "Organiza tu día",
    text: "Programa una recogida o entrega en tu agenda y añade la dirección que necesitas.",
  },
  {
    number: "03",
    icon: PackageCheck,
    title: "Sigue cada paso",
    text: "Consulta cómo avanza tu pedido y encuentra tus pagos y comprobantes en un mismo lugar.",
  },
];
const serviceIcons = [Waves, Shirt, Wind, Sparkles];

export function InicioSections() {
  const { servicios } = useServicios();
  return (
    <>
      <section className="home-section home-how" aria-labelledby="how-title">
        <div className="home-section-header">
          <span className="eyebrow">ASÍ DE SENCILLO</span>
          <h2 id="how-title">
            De tu lista de pendientes
            <br />a tu ropa lista.
          </h2>
          <p>Tres pasos para darle espacio a lo que realmente importa.</p>
        </div>
        <div className="home-steps-grid">
          {steps.map(({ number, icon: Icon, title, text }) => (
            <article className="home-step" key={number}>
              <div className="home-step-top">
                <span className="home-step-number">{number}</span>
                <Icon size={25} strokeWidth={1.5} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="home-catalog" aria-labelledby="care-title">
        <div className="home-section">
          <div className="home-section-header home-catalog-header">
            <div>
              <span className="eyebrow">CUIDADO PARA CADA DÍA</span>
              <h2 id="care-title">
                Cada prenda tiene su forma
                <br />
                de quedar impecable.
              </h2>
            </div>
            <p>
              Desde tu ropa de todos los días hasta las prendas que necesitan
              una atención especial. Elige lo que necesitas al crear tu pedido.
            </p>
          </div>
          <div className="home-services-grid">
            {servicios
              .filter((s) => s.activo)
              .map((service, index) => {
                const Icon = serviceIcons[index % serviceIcons.length];
                return (
                  <article className="home-service" key={service.id}>
                    <span className="home-service-icon">
                      <Icon size={28} strokeWidth={1.5} />
                    </span>
                    <h3>{service.nombre}</h3>
                    <p>{service.descripcion}</p>
                    <div className="home-service-price">
                      <strong>{money(service.precio)}</strong>
                      <span>/ {service.unidad}</span>
                    </div>
                  </article>
                );
              })}
          </div>
        </div>
      </section>
      <section
        className="home-section home-closing"
        aria-labelledby="closing-title"
      >
        <div>
          <span className="eyebrow">UN PENDIENTE MENOS</span>
          <h2 id="closing-title">
            Tu próximo día de lavado
            <br />
            puede ser más fácil.
          </h2>
          <p>Crea tu cuenta y empieza a organizar el cuidado de tus prendas.</p>
        </div>
        <div className="home-closing-actions">
          <Link className="button" to="/register">
            Crear mi cuenta
          </Link>
          <Link className="text-button" to="/login">
            Ya tengo una cuenta
          </Link>
        </div>
      </section>
    </>
  );
}
