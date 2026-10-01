import { useAuth } from "./useAuth";
import { usePedidos } from "./usePedidos";
export function useClientePedidos() {
  const { usuario } = useAuth();
  const { pedidos } = usePedidos();
  return pedidos.filter((p) => p.clienteId === usuario?.id);
}
