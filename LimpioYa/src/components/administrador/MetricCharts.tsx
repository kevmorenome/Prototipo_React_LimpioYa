import { useMetricas } from "../../hooks/useMetricas";
import { money, dateLabel } from "../../services/storage.service";
export function StatusChart() {
  const { porEstado, pedidos } = useMetricas();
  return (
    <section className="card padded">
      <div className="section-heading">
        <h2>Pedidos por estado</h2>
        <span className="muted">{pedidos.length} en total</span>
      </div>
      <div className="bar-chart">
        {porEstado.map((s, i) => (
          <div className="bar-row" key={s.estado}>
            <span>{s.estado}</span>
            <div className="bar-track">
              <span
                style={{
                  width:
                    (pedidos.length ? (s.cantidad / pedidos.length) * 100 : 0) +
                    "%",
                }}
                className={"bar-fill fill-" + i}
              />
            </div>
            <strong>{s.cantidad}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
export function ServiceChart() {
  const { porServicio, ventas } = useMetricas();
  return (
    <section className="card padded">
      <h2>Ventas por servicio</h2>
      <p className="muted">Valor de los pedidos registrados</p>
      <div className="bar-chart">
        {porServicio.map((s, i) => (
          <div className="service-bar" key={s.nombre}>
            <div>
              <span>{s.nombre}</span>
              <strong>{money(s.total)}</strong>
            </div>
            <div className="bar-track">
              <span
                className={"bar-fill fill-" + i}
                style={{ width: (ventas ? (s.total / ventas) * 100 : 0) + "%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export function IncomeChart() {
  const { porFecha } = useMetricas();
  const max = Math.max(...porFecha.map((d) => d.total), 1);
  return (
    <section className="card padded">
      <h2>Ingresos registrados</h2>
      <p className="muted">Pagos simulados agrupados por fecha</p>
      {porFecha.length ? (
        <div className="column-chart">
          {porFecha.map((d) => (
            <div className="column" key={d.fecha}>
              <strong>{money(d.total)}</strong>
              <div className="column-space">
                <span
                  style={{ height: Math.max((d.total / max) * 100, 2) + "%" }}
                />
              </div>
              <small>{dateLabel(d.fecha)}</small>
            </div>
          ))}
        </div>
      ) : (
        <p>Sin pagos registrados.</p>
      )}
    </section>
  );
}
