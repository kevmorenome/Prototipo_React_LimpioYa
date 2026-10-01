import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Package,
  CalendarDays,
  Wallet,
  Shirt,
  Sparkles,
  Check,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useClientePedidos } from "../../hooks/useClientePedidos";
import { usePagos } from "../../hooks/usePagos";
import { useAgenda } from "../../hooks/useAgenda";
import { useServicios } from "../../hooks/useServicios";
import { PageHeading, StatCard } from "../shared/UI";
import { OrderTable } from "../shared/OrderTable";
import { OrderDetail } from "../shared/OrderDetail";
import type { Pedido } from "../../models/pedido.model";
import { dateLabel, money } from "../../services/storage.service";
export function ClienteDashboard() {
  const { usuario } = useAuth();
  const pedidos = useClientePedidos();
  const { pagos } = usePagos();
  const { citas } = useAgenda();
  const { servicios } = useServicios();
  const [detail, setDetail] = useState<Pedido | null>(null);
  const active = pedidos.filter((p) => p.estado !== "Entregado");
  const due = pedidos
    .filter((p) => !pagos.some((pay) => pay.pedidoId === p.id))
    .reduce((s, p) => s + p.total, 0);
  const next = citas
    .filter((c) => c.clienteId === usuario?.id)
    .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora))[0];
  return (
    <>
      <PageHeading
        eyebrow="PANEL DEL CLIENTE"
        title={"Hola, " + usuario?.nombre.split(" ")[0] + "."}
        description="Un vistazo a tus prendas, tus pedidos y tu próxima entrega."
        action={
          <Link to="/cliente/crear-pedido" className="button">
            <Plus size={18} /> Crear pedido
          </Link>
        }
      />
      <section className="client-banner">
        <div>
          <span className="eyebrow">
            <Sparkles size={15} /> MENOS PENDIENTES, MÁS TIEMPO PARA TI
          </span>
          <h2>
            Deja la ropa en nuestras manos.
            <br />
            Disfruta el resto de tu día.
          </h2>
          <p>Estamos cuidando cada detalle de tus prendas.</p>
          <Link to="/cliente/historial" className="button light-button">
            Ver mis pedidos
          </Link>
        </div>
        <div className="banner-fact">
          <Shirt size={54} strokeWidth={1.3} />
          <strong>{active.length}</strong>
          <span>pedidos en buenas manos</span>
          <small>
            <Check size={14} /> Cuidado en cada paso
          </small>
        </div>
      </section>
      <div className="stats-grid three">
        <StatCard
          label="Pedidos activos"
          value={active.length}
          detail="En proceso o listos para entregar"
          icon={<Package />}
        />
        <StatCard
          label="Próxima cita"
          value={
            next ? dateLabel(next.fecha).split(" de 2026")[0] : "Sin programar"
          }
          detail={
            next ? next.tipo + " · " + next.hora : "Organiza tu próxima entrega"
          }
          icon={<CalendarDays />}
        />
        <StatCard
          label="Pendiente de pago"
          value={money(due)}
          detail="Consulta tus pagos y facturas"
          icon={<Wallet />}
        />
      </div>
      <div className="dashboard-grid">
        <section className="card">
          <div className="section-heading">
            <h2>Tus pedidos recientes</h2>
            <Link to="/cliente/historial">Ver historial</Link>
          </div>
          <OrderTable pedidos={pedidos.slice(0, 4)} onDetail={setDetail} />
        </section>
        <section className="card agenda-preview">
          <div className="section-heading">
            <h2>Tu agenda</h2>
            <CalendarDays size={20} />
          </div>
          {next ? (
            <>
              <div className="calendar-tile">
                <strong>{next.fecha.slice(-2)}</strong>
                <span>
                  {new Date(next.fecha + "T12:00:00").toLocaleDateString(
                    "es-CO",
                    { month: "short" },
                  )}
                </span>
              </div>
              <h3>{next.tipo} programada</h3>
              <p>
                {next.hora} · #{next.pedidoId}
              </p>
              <p>{next.direccion}</p>
            </>
          ) : (
            <p>Aún no tienes citas programadas.</p>
          )}
          <Link to="/cliente/agenda" className="button secondary full">
            Gestionar agenda
          </Link>
        </section>
      </div>
      <div className="section-heading services-heading">
        <div>
          <span className="eyebrow">EL CUIDADO ADECUADO</span>
          <h2>Un servicio para cada prenda.</h2>
        </div>
        <Link to="/cliente/crear-pedido">Crear pedido</Link>
      </div>
      <div className="service-grid">
        {servicios
          .filter((s) => s.activo)
          .map((s, i) => (
            <article className="service-card" key={s.id}>
              <span className={"service-icon tone-" + i}>
                <Shirt size={24} />
              </span>
              <h3>{s.nombre}</h3>
              <p>{s.descripcion}</p>
              <strong>
                {money(s.precio)} <small>/ {s.unidad}</small>
              </strong>
            </article>
          ))}
      </div>
      {detail && (
        <OrderDetail pedido={detail} onClose={() => setDetail(null)} />
      )}
    </>
  );
}
