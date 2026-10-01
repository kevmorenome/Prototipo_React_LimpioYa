import { useState } from "react";
import { Search } from "lucide-react";
import { usePedidos } from "../../hooks/usePedidos";
import { useClientes } from "../../hooks/useClientes";
import { estados, type Pedido } from "../../models/pedido.model";
import { PageHeading, Notice } from "../shared/UI";
import { OrderTable } from "../shared/OrderTable";
import { OrderDetail } from "../shared/OrderDetail";
export function GestionPedidos() {
  const { pedidos, actualizarEstado } = usePedidos();
  const { clientes } = useClientes();
  const [query, setQuery] = useState("");
  const [estado, setEstado] = useState("");
  const [detail, setDetail] = useState<Pedido | null>(null);
  const [notice, setNotice] = useState("");
  const filtered = pedidos.filter(
    (p) =>
      (!estado || p.estado === estado) &&
      (p.id + " " + clientes.find((c) => c.id === p.clienteId)?.nombre)
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        eyebrow="GESTIÓN DE PEDIDOS"
        title="Cada prenda sigue su proceso."
        description="Consulta pedidos y actualiza su estado. Los cambios se reflejan en el panel del cliente."
      />
      <Notice message={notice} />
      <section className="card">
        <div className="table-toolbar">
          <div className="search-field">
            <Search size={18} />
            <input
              aria-label="Buscar pedido o cliente"
              placeholder="Buscar pedido o cliente…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <select
            aria-label="Filtrar estado"
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
        <OrderTable
          pedidos={filtered}
          onState={(id, state) => {
            actualizarEstado(id, state);
            setNotice("Pedido #" + id + " actualizado a " + state + ".");
          }}
          onDetail={setDetail}
        />
      </section>
      {detail && (
        <OrderDetail
          pedido={pedidos.find((p) => p.id === detail.id)!}
          onClose={() => setDetail(null)}
        />
      )}
    </>
  );
}
