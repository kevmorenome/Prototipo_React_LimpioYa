import type { Cliente } from "../models/cliente.model";
import type { Empleado } from "../models/empleado.model";
import type { Servicio } from "../models/servicio.model";
import type { Pedido } from "../models/pedido.model";
import type { Pago } from "../models/pago.model";
import type { Cita } from "../models/agenda.model";
export const clientesMock: Cliente[] = [
  {
    id: "c1",
    nombre: "Valentina Torres",
    email: "cliente@limpioya.co",
    telefono: "310 456 7890",
    direccion: "Calle 85 # 15-20, Bogotá",
    password: "demo123",
    activo: true,
  },
  {
    id: "c2",
    nombre: "Santiago Ramírez",
    email: "santiago@example.com",
    telefono: "315 234 5678",
    direccion: "Carrera 7 # 60-12, Bogotá",
    password: "demo123",
    activo: true,
  },
  {
    id: "c3",
    nombre: "Camila Rojas",
    email: "camila@example.com",
    telefono: "300 987 6543",
    direccion: "Calle 100 # 19-40, Bogotá",
    password: "demo123",
    activo: true,
  },
  {
    id: "c4",
    nombre: "Andrés García",
    email: "andres@example.com",
    telefono: "301 555 0142",
    direccion: "Carrera 30 # 45-18, Bogotá",
    password: "demo123",
    activo: true,
  },
];
export const empleadosMock: Empleado[] = [
  {
    id: "e1",
    nombre: "Laura Martínez",
    email: "laura@limpioya.co",
    cargo: "Recepción",
    activo: true,
  },
  {
    id: "e2",
    nombre: "Diego Ruiz",
    email: "diego@limpioya.co",
    cargo: "Lavado y secado",
    activo: true,
  },
  {
    id: "e3",
    nombre: "Ana López",
    email: "ana@limpioya.co",
    cargo: "Planchado",
    activo: true,
  },
];
export const serviciosMock: Servicio[] = [
  {
    id: "s1",
    nombre: "Lavado y secado",
    descripcion: "Cuidado diario para tus prendas favoritas.",
    precio: 8500,
    unidad: "kg",
    activo: true,
  },
  {
    id: "s2",
    nombre: "Lavado en seco",
    descripcion: "Tratamiento delicado para prendas especiales.",
    precio: 22000,
    unidad: "prenda",
    activo: true,
  },
  {
    id: "s3",
    nombre: "Planchado",
    descripcion: "Un acabado impecable, listo para usar.",
    precio: 6000,
    unidad: "prenda",
    activo: true,
  },
  {
    id: "s4",
    nombre: "Edredones y cobijas",
    descripcion: "Frescura y limpieza para tu descanso.",
    precio: 35000,
    unidad: "unidad",
    activo: true,
  },
];
export const pedidosMock: Pedido[] = [
  {
    id: "LY-1048",
    clienteId: "c1",
    fecha: "2026-09-29",
    entrega: "2026-10-02",
    estado: "En lavado",
    lineas: [
      {
        servicioId: "s1",
        nombre: "Lavado y secado",
        cantidad: 5,
        precio: 8500,
      },
    ],
    total: 42500,
    notas: "Usar detergente suave.",
  },
  {
    id: "LY-1047",
    clienteId: "c2",
    fecha: "2026-09-29",
    entrega: "2026-10-01",
    estado: "Listo",
    lineas: [
      {
        servicioId: "s2",
        nombre: "Lavado en seco",
        cantidad: 2,
        precio: 22000,
      },
    ],
    total: 44000,
    notas: "",
  },
  {
    id: "LY-1046",
    clienteId: "c3",
    fecha: "2026-09-28",
    entrega: "2026-10-01",
    estado: "En secado",
    lineas: [
      {
        servicioId: "s4",
        nombre: "Edredones y cobijas",
        cantidad: 2,
        precio: 35000,
      },
    ],
    total: 70000,
    notas: "",
  },
  {
    id: "LY-1045",
    clienteId: "c1",
    fecha: "2026-09-27",
    entrega: "2026-09-30",
    estado: "Listo",
    lineas: [
      { servicioId: "s3", nombre: "Planchado", cantidad: 6, precio: 6000 },
    ],
    total: 36000,
    notas: "",
  },
  {
    id: "LY-1044",
    clienteId: "c4",
    fecha: "2026-09-26",
    entrega: "2026-09-29",
    estado: "Recibido",
    lineas: [
      {
        servicioId: "s1",
        nombre: "Lavado y secado",
        cantidad: 4,
        precio: 8500,
      },
    ],
    total: 34000,
    notas: "",
  },
  {
    id: "LY-1043",
    clienteId: "c1",
    fecha: "2026-09-20",
    entrega: "2026-09-23",
    estado: "Entregado",
    lineas: [
      {
        servicioId: "s4",
        nombre: "Edredones y cobijas",
        cantidad: 1,
        precio: 35000,
      },
    ],
    total: 35000,
    notas: "",
  },
  {
    id: "LY-1042",
    clienteId: "c2",
    fecha: "2026-09-18",
    entrega: "2026-09-21",
    estado: "Entregado",
    lineas: [
      {
        servicioId: "s1",
        nombre: "Lavado y secado",
        cantidad: 6,
        precio: 8500,
      },
    ],
    total: 51000,
    notas: "",
  },
  {
    id: "LY-1041",
    clienteId: "c1",
    fecha: "2026-09-14",
    entrega: "2026-09-17",
    estado: "Entregado",
    lineas: [
      {
        servicioId: "s2",
        nombre: "Lavado en seco",
        cantidad: 1,
        precio: 22000,
      },
    ],
    total: 22000,
    notas: "",
  },
];
export const pagosMock: Pago[] = [
  {
    id: "FAC-1043",
    pedidoId: "LY-1043",
    fecha: "2026-09-23",
    monto: 35000,
    metodo: "Tarjeta simulada",
  },
  {
    id: "FAC-1042",
    pedidoId: "LY-1042",
    fecha: "2026-09-21",
    monto: 51000,
    metodo: "Efectivo",
  },
  {
    id: "FAC-1041",
    pedidoId: "LY-1041",
    fecha: "2026-09-17",
    monto: 22000,
    metodo: "Tarjeta simulada",
  },
];
export const agendaMock: Cita[] = [
  {
    id: "a1",
    clienteId: "c1",
    pedidoId: "LY-1048",
    fecha: "2026-10-02",
    hora: "10:00",
    tipo: "Entrega",
    direccion: "Calle 85 # 15-20, Bogotá",
  },
];
