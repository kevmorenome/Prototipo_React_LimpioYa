import { useState, type FormEvent } from "react";
import { CalendarDays, MapPin, Clock, Plus } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useAgenda } from "../../hooks/useAgenda";
import { useClientes } from "../../hooks/useClientes";
import { useClientePedidos } from "../../hooks/useClientePedidos";
import { PageHeading, Notice, Empty, Modal } from "../shared/UI";
import { dateLabel, today } from "../../services/storage.service";
import type { Cita } from "../../models/agenda.model";
export function Agenda() {
  const { usuario } = useAuth();
  const { citas, programar, cancelar } = useAgenda();
  const { clientes } = useClientes();
  const pedidos = useClientePedidos();
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [cancel, setCancel] = useState<Cita | null>(null);
  const mine = citas
    .filter((c) => c.clienteId === usuario?.id)
    .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      programar({
        clienteId: usuario!.id,
        pedidoId: String(data.get("pedido")),
        tipo: String(data.get("tipo")) as Cita["tipo"],
        fecha: String(data.get("fecha")),
        hora: String(data.get("hora")),
        direccion: String(data.get("direccion")).trim(),
      });
      setNotice("Cita programada. Ya está visible en tu agenda.");
      setError("");
    } catch (err) {
      setError((err as Error).message);
    }
  }
  return (
    <>
      <PageHeading
        eyebrow="AGENDA"
        title="La frescura tiene su horario."
        description="Programa la recogida o entrega de tus pedidos."
      />
      <Notice message={notice} />
      <div className="agenda-grid">
        <section className="card padded">
          <div className="section-heading">
            <h2>Tus citas</h2>
            <CalendarDays />
          </div>
          {mine.length ? (
            mine.map((c) => (
              <article className="appointment" key={c.id}>
                <div className="appointment-date">
                  <strong>{c.fecha.slice(-2)}</strong>
                  <span>
                    {new Date(c.fecha + "T12:00:00").toLocaleDateString(
                      "es-CO",
                      { month: "short" },
                    )}
                  </span>
                </div>
                <div>
                  <span className="eyebrow">{c.tipo}</span>
                  <h3>#{c.pedidoId}</h3>
                  <p>
                    <Clock size={15} />
                    {dateLabel(c.fecha)} · {c.hora}
                  </p>
                  <p>
                    <MapPin size={15} />
                    {c.direccion}
                  </p>
                  <button
                    className="text-button danger"
                    onClick={() => setCancel(c)}
                  >
                    Cancelar cita
                  </button>
                </div>
              </article>
            ))
          ) : (
            <Empty text="Programa una recogida o entrega para verla aquí." />
          )}
        </section>
        <section className="card padded">
          <span className="step-label">PLANIFICA TU DÍA</span>
          <h2>Programar una cita</h2>
          {!pedidos.length ? (
            <p>Crea un pedido antes de programar una cita.</p>
          ) : (
            <form onSubmit={submit}>
              <label>
                Pedido
                <select name="pedido" required>
                  {pedidos.map((p) => (
                    <option key={p.id} value={p.id}>
                      #{p.id} · {p.estado}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Tipo de cita
                <select name="tipo">
                  <option>Recogida</option>
                  <option>Entrega</option>
                </select>
              </label>
              <div className="form-grid">
                <label>
                  Fecha
                  <input
                    type="date"
                    name="fecha"
                    min={today()}
                    required
                    defaultValue={today()}
                  />
                </label>
                <label>
                  Hora
                  <select name="hora">
                    {[
                      "08:00",
                      "09:00",
                      "10:00",
                      "11:00",
                      "14:00",
                      "15:00",
                      "16:00",
                      "17:00",
                    ].map((h) => (
                      <option key={h}>{h}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                Dirección
                <input
                  name="direccion"
                  required
                  minLength={5}
                  defaultValue={
                    clientes.find((c) => c.id === usuario?.id)?.direccion
                  }
                />
              </label>
              <Notice error message={error} />
              <button className="button full">
                <Plus size={18} /> Programar cita
              </button>
            </form>
          )}
        </section>
      </div>
      {cancel && (
        <Modal title="Cancelar cita" onClose={() => setCancel(null)}>
          <p>
            ¿Deseas cancelar la {cancel.tipo.toLowerCase()} del{" "}
            {dateLabel(cancel.fecha)} a las {cancel.hora}?
          </p>
          <div className="form-actions">
            <button
              className="button secondary"
              onClick={() => setCancel(null)}
            >
              Conservar cita
            </button>
            <button
              className="button danger-button"
              onClick={() => {
                cancelar(cancel.id);
                setCancel(null);
                setNotice("La cita fue cancelada.");
              }}
            >
              Cancelar cita
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
