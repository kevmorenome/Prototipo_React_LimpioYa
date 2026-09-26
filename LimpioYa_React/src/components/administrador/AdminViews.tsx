import { useState, type FormEvent } from 'react';
import { Portal, Status, Money } from '../shared/UI';
import { Modal } from '../shared/Modal';
import { useClientes, useEmpleados, usePedidos, useServicios } from '../../hooks';
import { Link } from 'react-router-dom';
import type { OrderStatus } from '../../models';

const Kpi = ({ n, label, trend }: { n: string; label: string; trend: string }) => (
  <article className="kpi">
    <p>{label}</p>
    <h2>{n}</h2>
    <span>↗ {trend}</span>
  </article>
);

export function AdminDashboard() {
  const { orders } = usePedidos();
  return (
    <Portal title="Buenas tardes, Sofía" subtitle="Este es el pulso de LimpioYa hoy.">
      <div className="kpis">
        <Kpi label="Pedidos de hoy" n={String(orders.length + 8)} trend="12% vs. ayer" />
        <Kpi label="Ingresos del mes" n="$3.480.000" trend="8.4% vs. mes anterior" />
        <Kpi label="Clientes activos" n="248" trend="18 nuevos este mes" />
        <Kpi label="Entregas a tiempo" n="96%" trend="2% de mejora" />
      </div>
      <div className="admin-grid">
        <section className="table-card">
          <div className="card-title">
            <h3>Pedidos recientes</h3>
            <Link to="/admin/pedidos">Ver gestión →</Link>
          </div>
          {orders.slice(0, 4).map(o => (
            <div className="mini-row" key={o.id}>
              <div>
                <b>{o.id} · {o.client}</b>
                <p>{o.service}</p>
              </div>
              <Status value={o.status} />
            </div>
          ))}
        </section>
        <section className="chart-card">
          <h3>Ingresos semanales</h3>
          <div className="bars">
            {[45, 68, 52, 90, 72, 96, 78].map((h, i) => (
              <div key={i}>
                <i style={{ height: `${h}%` }} />
                <small>{['L', 'M', 'X', 'J', 'V', 'S', 'D'][i]}</small>
              </div>
            ))}
          </div>
          <b>$1.240.000 <small>esta semana</small></b>
        </section>
      </div>
    </Portal>
  );
}

export function Pedidos() {
  const { orders, updateStatus } = usePedidos();
  return (
    <Portal title="Gestión de pedidos" subtitle="Supervisa y actualiza cada pedido en tiempo real.">
      <section className="table-card">
        <table>
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Cliente</th>
              <th>Servicio</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Actualizar</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>
                  <b>{o.id}</b>
                  <small>{o.date}</small>
                </td>
                <td>{o.client}</td>
                <td>{o.service}</td>
                <td><Money value={o.total} /></td>
                <td><Status value={o.status} /></td>
                <td>
                  <select
                    aria-label="Actualizar estado"
                    value={o.status}
                    onChange={e => updateStatus(o.id, e.target.value as OrderStatus)}
                  >
                    {(['Recibido', 'En proceso', 'Listo', 'Entregado'] as OrderStatus[]).map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Portal>
  );
}

export function Clientes() {
  const { clients, toggleClient } = useClientes();
  return (
    <Portal title="Gestión de clientes" subtitle="Mantén la relación con cada persona que confía en ti.">
      <section className="table-card">
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Contacto</th>
              <th>Pedidos</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(c => (
              <tr key={c.id}>
                <td><b>{c.name}</b></td>
                <td>{c.email}<small>{c.phone}</small></td>
                <td>{c.orders}</td>
                <td><Status value={c.active ? 'Activo' : 'Inactivo'} /></td>
                <td>
                  <button className="link-button" onClick={() => toggleClient(c.id)}>
                    {c.active ? 'Desactivar' : 'Activar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Portal>
  );
}

export function Empleados() {
  const { employees, toggleEmployee, addEmployee } = useEmpleados();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    role: 'Operario de lavado',
    shift: 'Mañana'
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    addEmployee({
      name: form.name.trim(),
      role: form.role,
      shift: form.shift
    });
    setForm({ name: '', role: 'Operario de lavado', shift: 'Mañana' });
    setShowModal(false);
  };

  return (
    <Portal title="Gestión de empleados" subtitle="Organiza el equipo que hace posible cada entrega.">
      <div className="section-toolbar">
        <div>
          <h3>Equipo operativo</h3>
          <p>{employees.length} colaboradores registrados</p>
        </div>
        <button className="button" onClick={() => setShowModal(true)}>
          + Nuevo empleado
        </button>
      </div>

      <div className="people-grid">
        {employees.map(e => (
          <article className="person-card" key={e.id}>
            <div className="person-avatar">{e.name[0]}</div>
            <h3>{e.name}</h3>
            <p>{e.role}</p>
            <div>
              <span>{e.shift}</span>
              <Status value={e.active ? 'Activo' : 'Inactivo'} />
            </div>
            <button className="link-button" onClick={() => toggleEmployee(e.id)}>
              {e.active ? 'Desactivar empleado' : 'Activar empleado'}
            </button>
          </article>
        ))}
      </div>

      {showModal && (
        <Modal title="Añadir nuevo empleado" onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="modal-form">
            <p className="modal-description">Completa los datos del nuevo miembro del equipo de LimpioYa.</p>

            <label className="modal-field">
              <span>Nombre completo</span>
              <input
                type="text"
                placeholder="Ej. Laura Martínez"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
                autoFocus
              />
            </label>

            <div className="form-row">
              <label className="modal-field">
                <span>Rol / Cargo</span>
                <select
                  value={form.role}
                  onChange={e => setForm({ ...form, role: e.target.value })}
                >
                  <option value="Operario de lavado">Operario de lavado</option>
                  <option value="Tintorería">Tintorería</option>
                  <option value="Repartidor">Repartidor</option>
                  <option value="Planchado y doblado">Planchado y doblado</option>
                  <option value="Atención al cliente">Atención al cliente</option>
                </select>
              </label>

              <label className="modal-field">
                <span>Turno asignado</span>
                <select
                  value={form.shift}
                  onChange={e => setForm({ ...form, shift: e.target.value })}
                >
                  <option value="Mañana">Mañana</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noche">Noche</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </label>
            </div>

            <div className="modal-actions">
              <button type="button" className="secondary-button" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button type="submit" className="button">
                Guardar empleado
              </button>
            </div>
          </form>
        </Modal>
      )}
    </Portal>
  );
}

export function Servicios() {
  const { services, toggleService, addService } = useServicios();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    unit: 'por prenda'
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) return;
    addService({
      name: form.name.trim(),
      description: form.description.trim() || 'Servicio profesional garantizado.',
      price: Number(form.price),
      unit: form.unit
    });
    setForm({ name: '', description: '', price: '', unit: 'por prenda' });
    setShowModal(false);
  };

  return (
    <Portal title="Servicios y precios" subtitle="Configura la oferta que tus clientes ven y eligen.">
      <div className="section-toolbar">
        <div>
          <h3>Catálogo de servicios</h3>
          <p>{services.length} servicios disponibles</p>
        </div>
        <button className="button" onClick={() => setShowModal(true)}>
          + Nuevo servicio
        </button>
      </div>

      <div className="service-grid">
        {services.map(s => (
          <article className="service-card" key={s.id}>
            <div className="service-icon">✨</div>
            <Status value={s.active ? 'Activo' : 'Inactivo'} />
            <h3>{s.name}</h3>
            <p>{s.description}</p>
            <h2>
              <Money value={s.price} />
              <small> {s.unit}</small>
            </h2>
            <button className="link-button" onClick={() => toggleService(s.id)}>
              {s.active ? 'Pausar servicio' : 'Activar servicio'}
            </button>
          </article>
        ))}
      </div>

      {showModal && (
        <Modal title="Añadir nuevo servicio" onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="modal-form">
            <p className="modal-description">Configura el nombre, detalles y tarifa del nuevo servicio para LimpioYa.</p>

            <label className="modal-field">
              <span>Nombre del servicio</span>
              <input
                type="text"
                placeholder="Ej. Planchado a vapor"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
                autoFocus
              />
            </label>

            <label className="modal-field">
              <span>Descripción</span>
              <textarea
                placeholder="Describe brevemente en qué consiste el servicio..."
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows={2}
              />
            </label>

            <div className="form-row">
              <label className="modal-field">
                <span>Precio (COP)</span>
                <input
                  type="number"
                  placeholder="Ej. 12000"
                  min="500"
                  step="500"
                  value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                  required
                />
              </label>

              <label className="modal-field">
                <span>Unidad de cobro</span>
                <select
                  value={form.unit}
                  onChange={e => setForm({ ...form, unit: e.target.value })}
                >
                  <option value="por prenda">por prenda</option>
                  <option value="por kilo">por kilo</option>
                  <option value="por docena">por docena</option>
                  <option value="por par">por par</option>
                  <option value="por servicio">por servicio</option>
                </select>
              </label>
            </div>

            <div className="modal-actions">
              <button type="button" className="secondary-button" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button type="submit" className="button">
                Guardar servicio
              </button>
            </div>
          </form>
        </Modal>
      )}
    </Portal>
  );
}

export function Metricas() {
  return (
    <Portal title="Métricas / KPIs" subtitle="Una vista clara para tomar mejores decisiones.">
      <div className="kpis">
        <Kpi label="Ticket promedio" n="$38.400" trend="6.2% este mes" />
        <Kpi label="Clientes recurrentes" n="72%" trend="4.1% este mes" />
        <Kpi label="Tiempo promedio" n="28 h" trend="3 h menos" />
      </div>
      <div className="metrics-grid">
        <section className="chart-card wide">
          <h3>Pedidos e ingresos · Últimos 6 meses</h3>
          <div className="line-chart">
            <svg viewBox="0 0 600 180" preserveAspectRatio="none">
              <path
                d="M0,140 C70,115 90,128 150,90 S240,100 300,72 S390,80 450,42 S540,55 600,15"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
              />
            </svg>
          </div>
          <div className="months">
            <span>Abr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Ago</span>
            <span>Sep</span>
          </div>
        </section>
        <section className="table-card">
          <h3>Servicios más elegidos</h3>
          <div className="ranking">
            <p><b>1</b> Lavado y doblado <span>48%</span></p>
            <p><b>2</b> Lavado express <span>31%</span></p>
            <p><b>3</b> Tintorería <span>21%</span></p>
          </div>
        </section>
      </div>
    </Portal>
  );
}