import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { Employee } from '../models';
import { storage } from '../services/storage.service';

const seed: Employee[] = [
  { id: 'e1', name: 'Daniel Castro', role: 'Operario de lavado', shift: 'Mañana', active: true },
  { id: 'e2', name: 'Andrea Torres', role: 'Tintorería', shift: 'Tarde', active: true },
  { id: 'e3', name: 'Carlos Silva', role: 'Repartidor', shift: 'Flexible', active: true }
];

type EmpleadoContextType = {
  employees: Employee[];
  toggleEmployee: (id: string) => void;
  addEmployee: (employee: { name: string; role: string; shift: string }) => void;
};

export const EmpleadoContext = createContext<EmpleadoContextType | null>(null);

export function EmpleadoProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>(() => storage.get('employees', seed));

  useEffect(() => {
    storage.set('employees', employees);
  }, [employees]);

  const toggleEmployee = (id: string) => {
    setEmployees(prev => prev.map(x => (x.id === id ? { ...x, active: !x.active } : x)));
  };

  const addEmployee = ({ name, role, shift }: { name: string; role: string; shift: string }) => {
    const newEmployee: Employee = {
      id: `e-${Date.now()}`,
      name,
      role,
      shift,
      active: true
    };
    setEmployees(prev => [newEmployee, ...prev]);
  };

  return (
    <EmpleadoContext.Provider value={{ employees, toggleEmployee, addEmployee }}>
      {children}
    </EmpleadoContext.Provider>
  );
}