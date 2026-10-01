import { useState } from "react";
import {
  Wallet,
  Receipt,
  CreditCard,
  CheckCircle2,
  Printer,
} from "lucide-react";
import { useClientePedidos } from "../../hooks/useClientePedidos";
import { usePagos } from "../../hooks/usePagos";
import { useAuth } from "../../hooks/useAuth";
import { money, dateLabel } from "../../services/storage.service";
import {
  PageHeading,
  StatCard,
  StatusBadge,
  Modal,
  Notice,
  Empty,
} from "../shared/UI";
import type { Pedido } from "../../models/pedido.model";
export function Pagos() {
  const pedidos = useClientePedidos();
  const { pagos, pagar } = usePagos();
  const { usuario } = useAuth();
  const [payment, setPayment] = useState<Pedido | null>(null);
  const [invoice, setInvoice] = useState<Pedido | null>(null);
  const [method, setMethod] = useState("Tarjeta simulada");
  const [notice, setNotice] = useState("");
  const pending = pedidos.filter(
    (p) => !pagos.some((pay) => pay.pedidoId === p.id),
  );
  const paid = pagos.filter((p) => pedidos.some((o) => o.id === p.pedidoId));
  const invoicePago = pagos.find((p) => p.pedidoId === invoice?.id);
  return (
    <>
      <PageHeading
        eyebrow="PAGOS Y FACTURA"
        title="Tus cuentas, claras."
        description="Consulta tus pagos y genera comprobantes de demostración."
      />
      <Notice message={notice} />
      <div className="stats-grid three">
        <StatCard
          label="Pendiente de pago"
          value={money(pending.reduce((s, p) => s + p.total, 0))}
          detail={pending.length + " pedidos pendientes"}
          icon={<Wallet />}
        />
        <StatCard
          label="Total pagado"
          value={money(paid.reduce((s, p) => s + p.monto, 0))}
          detail="Pagos registrados localmente"
          icon={<CheckCircle2 />}
        />
        <StatCard
          label="Facturas disponibles"
          value={paid.length}
          detail="Comprobantes de demostración"
          icon={<Receipt />}
        />
      </div>
      <section className="card">
        <div className="section-heading">
          <h2>Pedidos y pagos</h2>
          <span className="demo-pill">Pagos simulados</span>
        </div>
        {!pedidos.length ? (
          <Empty text="Tus pedidos y pagos aparecerán aquí." />
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Pago</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((p) => {
                  const paid = pagos.some((pay) => pay.pedidoId === p.id);
                  return (
                    <tr key={p.id}>
                      <td>
                        <strong className="order-id">#{p.id}</strong>
                        <small>
                          {p.lineas.map((l) => l.nombre).join(", ")}
                        </small>
                      </td>
                      <td>{dateLabel(p.fecha)}</td>
                      <td className="amount">{money(p.total)}</td>
                      <td>
                        <StatusBadge status={paid ? "Pagado" : "Pendiente"} />
                      </td>
                      <td>
                        {paid ? (
                          <button
                            className="text-button"
                            onClick={() => setInvoice(p)}
                          >
                            Ver factura
                          </button>
                        ) : (
                          <button
                            className="button small"
                            onClick={() => setPayment(p)}
                          >
                            Simular pago
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
      {payment && (
        <Modal title="Simular pago" onClose={() => setPayment(null)}>
          <div className="payment-amount">
            <CreditCard />
            <strong>{money(payment.total)}</strong>
            <p>Pedido #{payment.id}</p>
          </div>
          <label>
            Método de demostración
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option>Tarjeta simulada</option>
              <option>Efectivo</option>
              <option>Transferencia simulada</option>
            </select>
          </label>
          <p className="muted">
            No se solicita información bancaria ni se procesa dinero real.
          </p>
          <button
            className="button full"
            onClick={() => {
              pagar(payment.id, method);
              setPayment(null);
              setNotice(
                "Pago simulado registrado. Tu factura ya está disponible.",
              );
            }}
          >
            Confirmar pago simulado
          </button>
        </Modal>
      )}
      {invoice && invoicePago && (
        <Modal title="Factura de demostración" onClose={() => setInvoice(null)}>
          <div className="invoice">
            <span className="eyebrow">LIMPIOYA · SIN VALIDEZ FISCAL</span>
            <h2>{invoicePago.id}</h2>
            <p>
              {usuario?.nombre}
              <br />
              {dateLabel(invoicePago.fecha)} · {invoicePago.metodo}
            </p>
            <div className="invoice-lines">
              {invoice.lineas.map((l) => (
                <div key={l.servicioId}>
                  <span>
                    {l.nombre} × {l.cantidad}
                  </span>
                  <strong>{money(l.precio * l.cantidad)}</strong>
                </div>
              ))}
              <div className="invoice-total">
                <strong>Total pagado</strong>
                <strong>{money(invoicePago.monto)}</strong>
              </div>
            </div>
            <p>Comprobante académico. No constituye una factura comercial.</p>
          </div>
          <button
            className="button secondary full"
            onClick={() => window.print()}
          >
            <Printer size={18} /> Imprimir comprobante
          </button>
        </Modal>
      )}
    </>
  );
}
