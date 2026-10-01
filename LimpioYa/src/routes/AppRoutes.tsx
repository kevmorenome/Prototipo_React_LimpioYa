import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { Rol } from "../models/usuario.model";
import { Layout } from "../components/shared/Layout";
import { Inicio } from "../components/inicio/Inicio";
import { Login, RoleLogin } from "../components/autenticacion/Login";
import { Register } from "../components/autenticacion/Register";
import { ClienteDashboard } from "../components/cliente/Dashboard";
import { CrearPedido } from "../components/cliente/CrearPedido";
import { Agenda } from "../components/cliente/Agenda";
import { Pagos } from "../components/cliente/Pagos";
import { Historial } from "../components/cliente/Historial";
import { AdminDashboard } from "../components/administrador/Dashboard";
import { GestionPedidos } from "../components/administrador/Pedidos";
import { GestionClientes } from "../components/administrador/Clientes";
import { GestionEmpleados } from "../components/administrador/Empleados";
import { GestionServicios } from "../components/administrador/Servicios";
import { Metricas } from "../components/administrador/Metricas";
function RoleGuard({ rol }: { rol: Rol }) {
  const { usuario } = useAuth();
  if (!usuario) return <Navigate to="/login" replace />;
  if (usuario.rol !== rol)
    return (
      <Navigate to={usuario.rol === "admin" ? "/admin" : "/cliente"} replace />
    );
  return <Outlet />;
}
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/cliente" element={<RoleLogin rol="cliente" />} />
      <Route path="/login/administrador" element={<RoleLogin rol="admin" />} />
      <Route path="/register" element={<Register />} />
      <Route element={<RoleGuard rol="cliente" />}>
        <Route path="/cliente" element={<Layout />}>
          <Route index element={<ClienteDashboard />} />
          <Route path="crear-pedido" element={<CrearPedido />} />
          <Route path="agenda" element={<Agenda />} />
          <Route path="pagos" element={<Pagos />} />
          <Route path="historial" element={<Historial />} />
        </Route>
      </Route>
      <Route element={<RoleGuard rol="admin" />}>
        <Route path="/admin" element={<Layout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="pedidos" element={<GestionPedidos />} />
          <Route path="clientes" element={<GestionClientes />} />
          <Route path="empleados" element={<GestionEmpleados />} />
          <Route path="servicios" element={<GestionServicios />} />
          <Route path="metricas" element={<Metricas />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
