import type { ReactNode } from "react";
import { ClienteProvider } from "./ClienteContext";
import { EmpleadoProvider } from "./EmpleadoContext";
import { ServicioProvider } from "./ServicioContext";
import { AuthProvider } from "./AuthContext";
import { PedidoProvider } from "./PedidoContext";
import { PagoProvider } from "./PagoContext";
import { AgendaProvider } from "./AgendaContext";
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ClienteProvider>
      <AuthProvider>
        <EmpleadoProvider>
          <ServicioProvider>
            <PedidoProvider>
              <PagoProvider>
                <AgendaProvider>{children}</AgendaProvider>
              </PagoProvider>
            </PedidoProvider>
          </ServicioProvider>
        </EmpleadoProvider>
      </AuthProvider>
    </ClienteProvider>
  );
}
