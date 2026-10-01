import { EntityManager } from "../shared/EntityManager";
import { useEmpleados } from "../../hooks/useEmpleados";
export function GestionEmpleados() {
  const { empleados, guardar, alternarActivo } = useEmpleados();
  return (
    <EntityManager
      eyebrow="GESTIÓN DE EMPLEADOS"
      title="El equipo detrás de la frescura."
      description="Organiza tu equipo y sus responsabilidades."
      singular="empleado"
      fields={[
        { key: "nombre", label: "Nombre" },
        { key: "email", label: "Correo", type: "email" },
        { key: "cargo", label: "Cargo" },
      ]}
      rows={empleados.map((e) => ({
        id: e.id,
        activo: e.activo,
        values: { nombre: e.nombre, email: e.email, cargo: e.cargo },
      }))}
      onSave={(v, id) =>
        guardar(
          {
            nombre: v.nombre,
            email: v.email,
            cargo: v.cargo,
            activo: empleados.find((e) => e.id === id)?.activo ?? true,
          },
          id,
        )
      }
      onToggle={alternarActivo}
    />
  );
}
