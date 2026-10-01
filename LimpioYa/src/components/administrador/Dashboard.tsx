import { Link } from "react-router-dom";
import {
  Plus,
  Package,
  Wallet,
  Users,
  CheckCircle2,
  Droplets,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useMetricas } from "../../hooks/useMetricas";
import { usePedidos } from "../../hooks/usePedidos";
import { useState } from "react";
import { PageHeading, StatCard, Notice } from "../shared/UI";
import { OrderTable } from "../shared/OrderTable";
import { StatusChart } from "./MetricCharts";
import { money } from "../../services/storage.service";
export function AdminDashboard() {
  const { usuario } = useAuth();
  const m = useMetricas();
  const { actualizarEstado } = usePedidos();
  const [notice, setNotice] = useState("");
  return (
    <>
      <PageHeading
        eyebrow="PANEL DEL ADMINISTRADOR"
        title={"Todo en orden, " + usuario?.nombre.split(" ")[0] + "."}
        description="El pulso de tu lavandería, en un solo lugar."
        action={
          <Link className="button" to="/admin/pedidos">
            <Package size={18} /> Gestionar pedidos
          </Link>
        }
      />
      <section className="admin-banner">
        <div>
          <span className="eyebrow">CUIDADO QUE SE CONVIERTE EN CONFIANZA</span>
          <h2>Una operación que fluye.</h2>
          <p>
            {m.activos} pedidos activos. Cada uno, una oportunidad de hacerlo
            impecable.
          </p>
        </div>
        <Droplets size={70} strokeWidth={1.2} />
      </section>
      <div className="stats-grid">
        <StatCard
          label="Pedidos activos"
          value={m.activos}
          detail="En el ciclo de cuidado"
          icon={<Package />}
          accent
        />
        <StatCard
          label="Ingresos registrados"
          value={money(m.ingresos)}
          detail="Pagos simulados recibidos"
          icon={<Wallet />}
        />
        <StatCard
          label="Clientes activos"
          value={m.clientesActivos}
          detail="Confían en LimpioYa"
          icon={<Users />}
        />
        <StatCard
          label="Pedidos entregados"
          value={m.entregados}
          detail="Ciclos de cuidado completos"
          icon={<CheckCircle2 />}
        />
      </div>
      <Notice message={notice} />
      <section className="card">
        <div className="section-heading">
          <h2>Pedidos recientes</h2>
          <Link to="/admin/pedidos">Ver todos los pedidos</Link>
        </div>
        <OrderTable
          pedidos={m.pedidos.slice(0, 5)}
          onState={(id, state) => {
            actualizarEstado(id, state);
            setNotice(
              "Estado actualizado. El cliente también verá este cambio.",
            );
          }}
        />
      </section>
      <div className="dashboard-grid bottom-grid">
        <StatusChart />
        <section className="card padded">
          <span className="eyebrow">TU OPERACIÓN</span>
          <h2>Todo lo que necesitas.</h2>
          <div className="quick-links">
            <Link to="/admin/clientes">
              <Users />
              Gestión de clientes
            </Link>
            <Link to="/admin/empleados">
              <Users />
              Gestión de empleados
            </Link>
            <Link to="/admin/servicios">
              <Plus />
              Servicios y precios
            </Link>
            <Link to="/admin/metricas">
              <Wallet />
              Métricas / KPIs
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
