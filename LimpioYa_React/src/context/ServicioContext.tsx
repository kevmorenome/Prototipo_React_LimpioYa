import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { Service } from '../models';
import { storage } from '../services/storage.service';

const seed: Service[] = [
  { id: 's1', name: 'Lavado y doblado', description: 'Prendas cotidianas, lavado profesional.', price: 7000, unit: 'por prenda', active: true },
  { id: 's2', name: 'Lavado express', description: 'Listo el mismo día.', price: 9000, unit: 'por prenda', active: true },
  { id: 's3', name: 'Tintorería', description: 'Cuidado especializado.', price: 18000, unit: 'por prenda', active: true }
];

type ServicioContextType = {
  services: Service[];
  toggleService: (id: string) => void;
  addService: (service: { name: string; description: string; price: number; unit: string }) => void;
};

export const ServicioContext = createContext<ServicioContextType | null>(null);

export function ServicioProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>(() => storage.get('services', seed));

  useEffect(() => {
    storage.set('services', services);
  }, [services]);

  const toggleService = (id: string) => {
    setServices(prev => prev.map(x => (x.id === id ? { ...x, active: !x.active } : x)));
  };

  const addService = ({ name, description, price, unit }: { name: string; description: string; price: number; unit: string }) => {
    const newService: Service = {
      id: `s-${Date.now()}`,
      name,
      description,
      price,
      unit,
      active: true
    };
    setServices(prev => [newService, ...prev]);
  };

  return (
    <ServicioContext.Provider value={{ services, toggleService, addService }}>
      {children}
    </ServicioContext.Provider>
  );
}