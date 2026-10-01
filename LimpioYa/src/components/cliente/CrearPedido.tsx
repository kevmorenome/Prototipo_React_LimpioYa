import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Shirt, CheckCircle2, Package } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { usePedidos } from "../../hooks/usePedidos";
import { useServicios } from "../../hooks/useServicios";
import { money, today } from "../../services/storage.service";
import { PageHeading, Notice } from "../shared/UI";
export function CrearPedido() {
  const { usuario } = useAuth();
  const { servicios } = useServicios();
  const { crearPedido } = usePedidos();
  const [cantidades, setCantidades] = useState<Record<string, number>>({});
  const [error, setError] = useState("");
  const [created, setCreated] = useState("");
  const seleccion = servicios.filter(
    (s) => s.activo && (cantidades[s.id] || 0) > 0,
  );
  const total = seleccion.reduce(
    (sum, s) => sum + s.precio * cantidades[s.id],
    0,
  );
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      const id = crearPedido({
        clienteId: usuario!.id,
        lineas: seleccion.map((s) => ({
          servicioId: s.id,
          nombre: s.nombre,
          cantidad: cantidades[s.id],
          precio: s.precio,
        })),
        entrega: String(data.get("entrega")),
        notas: String(data.get("notas")).trim(),
      });
      setCreated(id);
    } catch (err) {
      setError((err as Error).message);
    }
  }
  return (
    <>
      <PageHeading
        eyebrow="CREAR PEDIDO"
        title="Frescura a tu medida."
        description="Elige tus servicios. Nosotros nos encargamos del cuidado."
      />
      {created ? (
        <section className="card success-screen">
          <CheckCircle2 size={60} />
          <h2>Tu pedido está en buenas manos.</h2>
          <p>
            Pedido #{created} creado por {money(total)}. Puedes consultar su
            estado en tu historial.
          </p>
          <div className="hero-actions">
            <Link className="button" to="/cliente/historial">
              Ver historial de pedidos
            </Link>
            <Link className="button secondary" to="/cliente/agenda">
              Programar agenda
            </Link>
          </div>
        </section>
      ) : (
        <form onSubmit={submit} className="order-form-grid">
          <div>
            <section className="card padded">
              <span className="step-label">01 · SERVICIOS</span>
              <h2>¿Qué prendas vamos a cuidar?</h2>
              <p>Ingresa la cantidad de cada servicio que necesitas.</p>
              <div className="service-selection">
                {servicios
                  .filter((s) => s.activo)
                  .map((s) => (
                    <label
                      className={
                        "service-choice " +
                        ((cantidades[s.id] || 0) > 0 ? "selected" : "")
                      }
                      key={s.id}
                    >
                      <span className="service-icon">
                        <Shirt />
                      </span>
                      <span className="service-description">
                        <strong>{s.nombre}</strong>
                        <small>
                          {money(s.precio)} / {s.unidad}
                        </small>
                      </span>
                      <span className="quantity-label">
                        {s.unidad}
                        <input
                          type="number"
                          aria-label={"Cantidad de " + s.nombre}
                          min="0"
                          max="100"
                          step={s.unidad === "kg" ? "0.5" : "1"}
                          value={cantidades[s.id] || 0}
                          onChange={(e) =>
                            setCantidades({
                              ...cantidades,
                              [s.id]: Number(e.target.value),
                            })
                          }
                        />
                      </span>
                    </label>
                  ))}
              </div>
            </section>
            <section className="card padded">
              <span className="step-label">02 · DETALLES</span>
              <h2>Un último detalle.</h2>
              <label>
                Fecha de entrega deseada
                <input
                  type="date"
                  name="entrega"
                  min={today()}
                  defaultValue={today()}
                  required
                />
              </label>
              <label>
                Instrucciones de cuidado{" "}
                <span className="muted">(opcional)</span>
                <textarea
                  name="notas"
                  rows={3}
                  maxLength={300}
                  placeholder="Por ejemplo: detergente suave, prendas delicadas…"
                />
              </label>
            </section>
          </div>
          <aside className="card padded order-summary">
            <Package />
            <h2>Resumen de tu pedido</h2>
            {seleccion.length ? (
              seleccion.map((s) => (
                <div className="summary-line" key={s.id}>
                  <span>
                    {s.nombre}
                    <small>
                      {cantidades[s.id]} {s.unidad}
                    </small>
                  </span>
                  <strong>{money(s.precio * cantidades[s.id])}</strong>
                </div>
              ))
            ) : (
              <p>Selecciona un servicio para empezar.</p>
            )}
            <div className="summary-total">
              <span>Total estimado</span>
              <strong>{money(total)}</strong>
            </div>
            <Notice error message={error} />
            <button className="button full" disabled={!seleccion.length}>
              Confirmar pedido
            </button>
            <small>El pago se simula desde Pagos y factura.</small>
          </aside>
        </form>
      )}
    </>
  );
}
