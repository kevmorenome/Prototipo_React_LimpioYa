import { Wallet, Package, Receipt, CheckCircle2 } from "lucide-react";
import { useMetricas } from "../../hooks/useMetricas";
import { PageHeading, StatCard } from "../shared/UI";
import { StatusChart, ServiceChart, IncomeChart } from "./MetricCharts";
import { money } from "../../services/storage.service";
export function Metricas() {
  const m = useMetricas();
  return (
    <>
      <PageHeading
        eyebrow="MÉTRICAS / KPIs"
        title="Los números también cuentan."
        description="Indicadores calculados con los pedidos y pagos locales de la demostración."
      />
      <div className="stats-grid">
        <StatCard
          label="Ingresos"
          value={money(m.ingresos)}
          detail="Pagos registrados"
          icon={<Wallet />}
          accent
        />
        <StatCard
          label="Pedidos totales"
          value={m.pedidos.length}
          detail="Todos los estados"
          icon={<Package />}
        />
        <StatCard
          label="Ticket promedio"
          value={money(m.ticket)}
          detail="Ventas ÷ pedidos"
          icon={<Receipt />}
        />
        <StatCard
          label="Tasa de entrega"
          value={
            (m.pedidos.length
              ? Math.round((m.entregados / m.pedidos.length) * 100)
              : 0) + "%"
          }
          detail={m.entregados + " pedidos entregados"}
          icon={<CheckCircle2 />}
        />
      </div>
      <div className="metrics-grid">
        <IncomeChart />
        <StatusChart />
        <ServiceChart />
        <section className="card padded balance-card">
          <span className="eyebrow">BALANCE DE LA DEMOSTRACIÓN</span>
          <h2>Una cuenta clara.</h2>
          <div>
            <span>Valor total de pedidos</span>
            <strong>{money(m.ventas)}</strong>
          </div>
          <div>
            <span>Ingresos registrados</span>
            <strong>{money(m.ingresos)}</strong>
          </div>
          <div>
            <span>Pendiente por cobrar</span>
            <strong>{money(m.pendiente)}</strong>
          </div>
          <p>
            Los indicadores se actualizan al crear pedidos, registrar pagos o
            cambiar estados.
          </p>
        </section>
      </div>
    </>
  );
}
