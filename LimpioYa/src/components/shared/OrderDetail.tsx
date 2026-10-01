import type { Pedido } from "../../models/pedido.model";
import { estados } from "../../models/pedido.model";
import { Modal, StatusBadge } from "./UI";
import { money, dateLabel } from "../../services/storage.service";
export function OrderDetail({
  pedido,
  onClose,
}: {
  pedido: Pedido;
  onClose: () => void;
}) {
  return (
    <Modal title={"Pedido #" + pedido.id} onClose={onClose}>
      <StatusBadge status={pedido.estado} />
      <p>
        Creado el {dateLabel(pedido.fecha)} · Entrega:{" "}
        {dateLabel(pedido.entrega)}
      </p>
      <ol className="progress-track">
        {estados.map((s, i) => (
          <li
            className={i <= estados.indexOf(pedido.estado) ? "done" : ""}
            key={s}
          >
            <span>{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
      <div className="invoice-lines">
        {pedido.lineas.map((l) => (
          <div key={l.servicioId}>
            <span>
              {l.nombre} × {l.cantidad}
            </span>
            <strong>{money(l.precio * l.cantidad)}</strong>
          </div>
        ))}
        <div className="invoice-total">
          <strong>Total</strong>
          <strong>{money(pedido.total)}</strong>
        </div>
      </div>
      {pedido.notas && <p>Notas: {pedido.notas}</p>}
    </Modal>
  );
}
