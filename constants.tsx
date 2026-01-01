
import React from 'react';
import { 
  Home, 
  ShoppingCart, 
  Car, 
  Utensils, 
  Zap, 
  Smartphone, 
  Activity, 
  GraduationCap, 
  Briefcase, 
  DollarSign,
  TrendingUp,
  CreditCard,
  Wallet,
  Globe
} from 'lucide-react';
import { Category, Account } from './types';

export const CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Alimentación', icon: 'Utensils', color: '#f59e0b' },
  { id: 'cat-2', name: 'Vivienda', icon: 'Home', color: '#3b82f6' },
  { id: 'cat-3', name: 'Transporte', icon: 'Car', color: '#10b981' },
  { id: 'cat-4', name: 'Servicios', icon: 'Zap', color: '#ef4444' },
  { id: 'cat-5', name: 'Entretenimiento', icon: 'Smartphone', color: '#8b5cf6' },
  { id: 'cat-6', name: 'Salud', icon: 'Activity', color: '#ec4899' },
  { id: 'cat-7', name: 'Educación', icon: 'GraduationCap', color: '#06b6d4' },
  { id: 'cat-8', name: 'Salario', icon: 'DollarSign', color: '#10b981' },
  { id: 'cat-9', name: 'Inversiones', icon: 'TrendingUp', color: '#22c55e' },
];

export const ACCOUNTS: Account[] = [
  { id: 'acc-1', name: 'Cuenta Principal', type: 'BANK', balance: 5420.50, currency: 'EUR', lastUpdate: '2023-10-27' },
  { id: 'acc-2', name: 'Efectivo', type: 'CASH', balance: 150.00, currency: 'EUR', lastUpdate: '2023-10-26' },
  { id: 'acc-3', name: 'Tarjeta de Crédito', type: 'CREDIT_CARD', balance: -420.30, currency: 'EUR', lastUpdate: '2023-10-27' },
  { id: 'acc-4', name: 'Binance', type: 'DIGITAL_WALLET', balance: 1200.75, currency: 'USD', lastUpdate: '2023-10-25' },
];

export const getCategoryIcon = (id: string) => {
  const cat = CATEGORIES.find(c => c.id === id);
  if (!cat) return <DollarSign className="w-4 h-4" />;
  switch (cat.icon) {
    case 'Utensils': return <Utensils className="w-4 h-4" />;
    case 'Home': return <Home className="w-4 h-4" />;
    case 'Car': return <Car className="w-4 h-4" />;
    case 'Zap': return <Zap className="w-4 h-4" />;
    case 'Smartphone': return <Smartphone className="w-4 h-4" />;
    case 'Activity': return <Activity className="w-4 h-4" />;
    case 'GraduationCap': return <GraduationCap className="w-4 h-4" />;
    case 'DollarSign': return <DollarSign className="w-4 h-4" />;
    case 'TrendingUp': return <TrendingUp className="w-4 h-4" />;
    default: return <DollarSign className="w-4 h-4" />;
  }
};
