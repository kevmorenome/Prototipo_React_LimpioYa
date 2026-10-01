import { EntityManager } from "../shared/EntityManager";
import { useServicios } from "../../hooks/useServicios";
import { money } from "../../services/storage.service";
export function GestionServicios() {
  const { servicios, guardar, alternarActivo } = useServicios();
  return (
    <EntityManager
      eyebrow="SERVICIOS Y PRECIOS"
      title="El cuidado tiene su valor."
      description="Actualiza tu catálogo. Los nuevos pedidos utilizarán los precios vigentes."
      singular="servicio"
      fields={[
        { key: "nombre", label: "Servicio" },
        { key: "descripcion", label: "Descripción" },
        { key: "unidad", label: "Unidad" },
        {
          key: "precio",
          label: "Precio (COP)",
          type: "number",
          min: 1,
          step: "1",
        },
      ]}
      rows={servicios.map((s) => ({
        id: s.id,
        activo: s.activo,
        values: {
          nombre: s.nombre,
          descripcion: s.descripcion,
          unidad: s.unidad,
          precio: s.precio,
        },
      }))}
      format={(k, v) => (k === "precio" ? money(Number(v)) : String(v))}
      onSave={(v, id) =>
        guardar(
          {
            nombre: v.nombre,
            descripcion: v.descripcion,
            unidad: v.unidad,
            precio: Number(v.precio),
            activo: servicios.find((s) => s.id === id)?.activo ?? true,
          },
          id,
        )
      }
      onToggle={alternarActivo}
    />
  );
}
