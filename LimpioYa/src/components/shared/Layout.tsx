import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Plus,
  CalendarDays,
  CreditCard,
  History,
  ClipboardList,
  Users,
  Shirt,
  BarChart3,
  LogOut,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  UserRound,
  Droplets,
} from "lucide-react";
import { Brand } from "./UI";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useAuth } from "../../hooks/useAuth";
const clientLinks = [
  { to: "/cliente", label: "Panel del cliente", icon: LayoutDashboard },
  { to: "/cliente/crear-pedido", label: "Crear pedido", icon: Plus },
  { to: "/cliente/agenda", label: "Agenda", icon: CalendarDays },
  { to: "/cliente/pagos", label: "Pagos y factura", icon: CreditCard },
  { to: "/cliente/historial", label: "Historial de pedidos", icon: History },
];
const adminLinks = [
  { to: "/admin", label: "Panel del administrador", icon: LayoutDashboard },
  { to: "/admin/pedidos", label: "Gestión de pedidos", icon: ClipboardList },
  { to: "/admin/clientes", label: "Gestión de clientes", icon: Users },
  { to: "/admin/empleados", label: "Gestión de empleados", icon: UserRound },
  { to: "/admin/servicios", label: "Servicios y precios", icon: Shirt },
  { to: "/admin/metricas", label: "Métricas / KPIs", icon: BarChart3 },
];
export function Layout() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const admin = usuario?.rol === "admin";
  const mobile = useMediaQuery("(max-width: 1050px)");
  return (
    <div className="app-shell">
      <aside
        inert={mobile && !open}
        id="panel-navigation"
        className={"sidebar " + (open ? "open" : "")}
      >
        <div className="sidebar-brand">
          <Brand />
          <button
            className="icon-button mobile-only"
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
          >
            <X />
          </button>
        </div>
        <div className="workspace-label">
          {admin ? "ADMINISTRACIÓN" : "MI ESPACIO"}
        </div>
        <nav aria-label="Navegación del panel">
          {(admin ? adminLinks : clientLinks).map(
            ({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} end onClick={() => setOpen(false)}>
                <Icon size={20} />
                {label}
              </NavLink>
            ),
          )}
        </nav>
        <div className="sidebar-bottom">
          <div className="care-card">
            <Droplets />
            <strong>Cada prenda cuenta.</strong>
            <p>
              Un poco de cuidado.
              <br />
              Muchísima frescura.
            </p>
          </div>
          <div className="prototype">
            <ShieldCheck size={16} /> Prototipo académico
          </div>
          <button
            className="logout"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <LogOut size={18} /> Cerrar sesión
          </button>
        </div>
      </aside>
      {open && (
        <button
          className="nav-overlay"
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
        />
      )}
      <div className="workspace">
        <header className="topbar">
          <div>
            <button
              className="icon-button mobile-only"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={open}
              aria-controls="panel-navigation"
            >
              <Menu />
            </button>
            <span className="topbar-label">
              {admin
                ? "Operación de la lavandería"
                : "Tu ropa, en buenas manos"}
            </span>
          </div>
          <div className="topbar-user">
            <span className="demo-pill">
              <Sparkles size={14} /> Modo demo
            </span>
            <span className="avatar">
              {usuario?.nombre
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </span>
            <span>
              <strong>{usuario?.nombre}</strong>
              <small>{admin ? "Administrador" : "Cliente"}</small>
            </span>
          </div>
        </header>
        <main className="main-content">
          <Outlet />
        </main>
        <footer className="app-footer">
          <span>© 2026 LimpioYa</span>
          <span>Hecho para cuidar lo que usas.</span>
        </footer>
      </div>
    </div>
  );
}
