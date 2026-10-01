import { useState, type FormEvent } from "react";
import { Plus, Search, Pencil } from "lucide-react";
import { PageHeading, Notice, Modal, StatusBadge, Empty } from "./UI";
export interface Field {
  key: string;
  label: string;
  type?: string;
  min?: number;
  step?: string;
}
export interface EntityRow {
  id: string;
  activo: boolean;
  values: Record<string, string | number>;
}
interface Props {
  title: string;
  eyebrow: string;
  description: string;
  singular: string;
  fields: Field[];
  rows: EntityRow[];
  onSave: (values: Record<string, string>, id?: string) => void;
  onToggle: (id: string) => void;
  format?: (key: string, value: string | number) => string;
}
export function EntityManager({
  title,
  eyebrow,
  description,
  singular,
  fields,
  rows,
  onSave,
  onToggle,
  format,
}: Props) {
  const [editing, setEditing] = useState<EntityRow | "new" | null>(null);
  const [toggle, setToggle] = useState<EntityRow | null>(null);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const filtered = rows.filter((r) =>
    Object.values(r.values)
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  const edit = (row: EntityRow | "new") => {
    setError("");
    setEditing(row);
  };
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values = Object.fromEntries(
      fields.map((f) => [f.key, String(data.get(f.key) || "").trim()]),
    );
    try {
      if (Object.values(values).some((v) => !v))
        throw new Error("Completa los campos con información válida.");
      onSave(values, editing && editing !== "new" ? editing.id : undefined);
      setEditing(null);
      setNotice("Información guardada correctamente.");
    } catch (err) {
      setError((err as Error).message);
    }
  }
  return (
    <>
      <PageHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
        action={
          <button className="button" onClick={() => edit("new")}>
            <Plus size={18} /> Agregar {singular}
          </button>
        }
      />
      <Notice message={notice} />
      <section className="card">
        <div className="table-toolbar">
          <div className="search-field">
            <Search size={18} />
            <input
              aria-label={"Buscar " + singular}
              placeholder={"Buscar " + singular + "…"}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <span className="muted">{filtered.length} registros</span>
        </div>
        {filtered.length ? (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  {fields.map((f) => (
                    <th key={f.key}>{f.label}</th>
                  ))}
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id}>
                    {fields.map((f, i) => (
                      <td key={f.key} className={i === 0 ? "primary-cell" : ""}>
                        {format
                          ? format(f.key, r.values[f.key])
                          : r.values[f.key]}
                      </td>
                    ))}
                    <td>
                      <StatusBadge status={r.activo ? "Activo" : "Inactivo"} />
                    </td>
                    <td>
                      <div className="row-actions">
                        <button
                          className="icon-button"
                          onClick={() => edit(r)}
                          aria-label={"Editar " + r.values.nombre}
                        >
                          <Pencil size={17} />
                        </button>
                        <button
                          className="text-button"
                          onClick={() => setToggle(r)}
                        >
                          {r.activo ? "Desactivar" : "Activar"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty text="No hay registros que coincidan con tu búsqueda." />
        )}
      </section>
      {editing && (
        <Modal
          title={(editing === "new" ? "Agregar " : "Editar ") + singular}
          onClose={() => setEditing(null)}
        >
          <form onSubmit={submit}>
            {fields.map((f) => (
              <label key={f.key}>
                {f.label}
                <input
                  name={f.key}
                  type={f.type || "text"}
                  min={f.min}
                  step={f.step}
                  required
                  maxLength={f.type === "number" ? undefined : 150}
                  defaultValue={editing !== "new" ? editing.values[f.key] : ""}
                />
              </label>
            ))}
            {singular === "cliente" && editing === "new" && (
              <small>Contraseña inicial de demostración: demo123</small>
            )}
            <Notice error message={error} />
            <div className="form-actions">
              <button
                type="button"
                className="button secondary"
                onClick={() => setEditing(null)}
              >
                Cancelar
              </button>
              <button className="button">Guardar cambios</button>
            </div>
          </form>
        </Modal>
      )}
      {toggle && (
        <Modal
          title={toggle.activo ? "Desactivar registro" : "Activar registro"}
          onClose={() => setToggle(null)}
        >
          <p>
            {toggle.activo ? "¿Desactivar" : "¿Activar"} a{" "}
            {toggle.values.nombre}? Se conservará su información y el historial
            asociado.
          </p>
          <div className="form-actions">
            <button
              className="button secondary"
              onClick={() => setToggle(null)}
            >
              Cancelar
            </button>
            <button
              className="button"
              onClick={() => {
                onToggle(toggle.id);
                setNotice("Estado del registro actualizado.");
                setToggle(null);
              }}
            >
              Confirmar
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
