import { useState } from "react";
import { Search } from "lucide-react";
import { useClientePedidos } from "../../hooks/useClientePedidos";
import { estados, type Pedido } from "../../models/pedido.model";
import { PageHeading } from "../shared/UI";
import { OrderTable } from "../shared/OrderTable";
import { OrderDetail } from "../shared/OrderDetail";
export function Historial() {
  const pedidos = useClientePedidos();
  const [query, setQuery] = useState("");
  const [estado, setEstado] = useState("");
  const [detail, setDetail] = useState<Pedido | null>(null);
  const filtered = pedidos.filter(
    (p) =>
      (!estado || p.estado === estado) &&
      (p.id + " " + p.lineas.map((l) => l.nombre).join(" "))
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        eyebrow="HISTORIAL DE PEDIDOS"
        title="Cada pedido, a un vistazo."
        description="Sigue el cuidado de tus prendas y consulta tus pedidos anteriores."
      />
      <section className="card">
        <div className="table-toolbar">
          <div className="search-field">
            <Search size={18} />
            <input
              aria-label="Buscar pedidos"
              placeholder="Buscar pedido o servicio…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <select
            aria-label="Filtrar por estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="">Todos los estados</option>
            {estados.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <span className="muted">{filtered.length} pedidos</span>
        </div>
        <OrderTable pedidos={filtered} onDetail={setDetail} />
      </section>
      {detail && (
        <OrderDetail pedido={detail} onClose={() => setDetail(null)} />
      )}
    </>
  );
}
