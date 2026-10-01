import { EntityManager } from "../shared/EntityManager";
import { useClientes } from "../../hooks/useClientes";
export function GestionClientes() {
  const { clientes, guardar, alternarActivo } = useClientes();
  return (
    <EntityManager
      eyebrow="GESTIÓN DE CLIENTES"
      title="Conoce a quienes confían en ti."
      description="Gestiona los datos y el estado de tus clientes."
      singular="cliente"
      fields={[
        { key: "nombre", label: "Nombre" },
        { key: "email", label: "Correo", type: "email" },
        { key: "telefono", label: "Teléfono", type: "tel" },
        { key: "direccion", label: "Dirección" },
      ]}
      rows={clientes.map((c) => ({
        id: c.id,
        activo: c.activo,
        values: {
          nombre: c.nombre,
          email: c.email,
          telefono: c.telefono,
          direccion: c.direccion,
        },
      }))}
      onSave={(v, id) => {
        const existing = clientes.find((c) => c.id === id);
        guardar(
          {
            nombre: v.nombre,
            email: v.email,
            telefono: v.telefono,
            direccion: v.direccion,
            password: existing?.password || "demo123",
            activo: existing?.activo ?? true,
          },
          id,
        );
      }}
      onToggle={alternarActivo}
    />
  );
}
