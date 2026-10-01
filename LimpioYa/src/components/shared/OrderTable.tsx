import type { Pedido } from "../../models/pedido.model";
import { estados, type EstadoPedido } from "../../models/pedido.model";
import { money, dateLabel } from "../../services/storage.service";
import { StatusBadge, Empty } from "./UI";
import { useClientes } from "../../hooks/useClientes";
export function OrderTable({
  pedidos,
  onState,
  onDetail,
}: {
  pedidos: Pedido[];
  onState?: (id: string, state: EstadoPedido) => void;
  onDetail?: (pedido: Pedido) => void;
}) {
  const { clientes } = useClientes();
  if (!pedidos.length)
    return <Empty text="No hay pedidos que coincidan con tu búsqueda." />;
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Pedido / servicio</th>
            {onState && <th>Cliente</th>}
            <th>Entrega</th>
            <th>Estado</th>
            <th>Total</th>
            {onDetail && <th>Detalle</th>}
          </tr>
        </thead>
        <tbody>
          {pedidos.map((p) => (
            <tr key={p.id}>
              <td>
                <strong className="order-id">#{p.id}</strong>
                <small>{p.lineas.map((l) => l.nombre).join(", ")}</small>
              </td>
              {onState && (
                <td>
                  {clientes.find((c) => c.id === p.clienteId)?.nombre ||
                    "Cliente"}
                </td>
              )}
              <td>{dateLabel(p.entrega)}</td>
              <td>
                {onState ? (
                  <select
                    aria-label={"Estado " + p.id}
                    value={p.estado}
                    onChange={(e) =>
                      onState(p.id, e.target.value as EstadoPedido)
                    }
                  >
                    {estados.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                ) : (
                  <StatusBadge status={p.estado} />
                )}
              </td>
              <td className="amount">{money(p.total)}</td>
              {onDetail && (
                <td>
                  <button className="text-button" onClick={() => onDetail(p)}>
                    Ver detalle
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
