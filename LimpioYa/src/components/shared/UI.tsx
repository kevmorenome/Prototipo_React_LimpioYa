import { useEffect, useRef, useId, type ReactNode } from "react";
import { Droplets, X, PackageCheck } from "lucide-react";
import { Link } from "react-router-dom";
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      to="/"
      className={"brand " + (light ? "light" : "")}
      aria-label="LimpioYa, inicio"
    >
      <span className="brand-icon">
        <Droplets size={25} />
      </span>
      <span>
        Limpio<span className="brand-ya">Ya</span>
        <small>LAVANDERÍA INTELIGENTE</small>
      </span>
    </Link>
  );
}
export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}
export function StatCard({
  label,
  value,
  detail,
  icon,
  accent = false,
}: {
  label: string;
  value: ReactNode;
  detail: string;
  icon: ReactNode;
  accent?: boolean;
}) {
  return (
    <div className={"stat-card " + (accent ? "accent" : "")}>
      <div className="stat-top">
        <span>{label}</span>
        <span className="stat-icon">{icon}</span>
      </div>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}
export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={"badge status-" + status.toLowerCase().replaceAll(" ", "-")}
    >
      {status}
    </span>
  );
}
export function Notice({
  message,
  error = false,
}: {
  message: string;
  error?: boolean;
}) {
  return message ? (
    <div
      className={"notice " + (error ? "error" : "")}
      role={error ? "alert" : "status"}
    >
      {message}
    </div>
  ) : null;
}
export function Empty({ text }: { text: string }) {
  return (
    <div className="empty">
      <PackageCheck size={36} />
      <h3>Todo está al día</h3>
      <p>{text}</p>
    </div>
  );
}
export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);
  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className="modal"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <header>
        <h2 id={titleId}>{title}</h2>
        <button className="icon-button" onClick={onClose} aria-label="Cerrar">
          <X />
        </button>
      </header>
      {children}
    </dialog>
  );
}
