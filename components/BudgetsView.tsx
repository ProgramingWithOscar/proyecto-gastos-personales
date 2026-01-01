
import React, { useMemo } from 'react';
import { Target, TrendingUp, AlertTriangle, Plus, ChevronRight } from 'lucide-react';
import { Budget, Transaction } from '../types';
import { CATEGORIES, getCategoryIcon } from '../constants';

interface BudgetsViewProps {
  transactions: Transaction[];
}

const BudgetsView: React.FC<BudgetsViewProps> = ({ transactions }) => {
  // Mock budgets for demo
  const budgets: Budget[] = useMemo(() => [
    { id: 'b1', categoryId: 'cat-1', limit: 400, spent: 0, period: 'MONTHLY' },
    { id: 'b2', categoryId: 'cat-3', limit: 150, spent: 0, period: 'MONTHLY' },
    { id: 'b3', categoryId: 'cat-5', limit: 100, spent: 0, period: 'MONTHLY' },
    { id: 'b4', categoryId: 'cat-2', limit: 700, spent: 0, period: 'MONTHLY' },
  ], []);

  const enrichedBudgets = useMemo(() => {
    return budgets.map(b => {
      const spent = transactions
        .filter(t => t.categoryId === b.categoryId && t.type === 'EXPENSE')
        .reduce((acc, t) => acc + t.amount, 0);
      return { ...b, spent };
    });
  }, [budgets, transactions]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Presupuestos</h1>
          <p className="text-slate-500">Define tus límites y mantén el control de tus gastos.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-md">
          <Plus size={18} />
          Nuevo Presupuesto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrichedBudgets.map((b) => {
          const cat = CATEGORIES.find(c => c.id === b.categoryId);
          const percent = Math.min((b.spent / b.limit) * 100, 100);
          const isNearLimit = percent > 85;
          const isOver = b.spent > b.limit;

          return (
            <div key={b.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-50 text-slate-600">
                    {getCategoryIcon(b.categoryId)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{cat?.name}</p>
                    <p className="text-xs text-slate-400">Mensual</p>
                  </div>
                </div>
                {isOver && <AlertTriangle className="text-red-500" size={18} />}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Gastado: <span className="text-slate-900 font-bold">{b.spent.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span></span>
                  <span className="text-slate-500">Límite: <span className="text-slate-900 font-bold">{b.limit.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span></span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${isOver ? 'bg-red-500' : isNearLimit ? 'bg-amber-500' : 'bg-indigo-600'}`}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${isOver ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                  {isOver ? 'Límite excedido' : `${(b.limit - b.spent).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })} restantes`}
                </span>
                <button className="text-slate-400 hover:text-indigo-600 p-1">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Saving Goals - Mini Section */}
      <div className="mt-12 space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="text-indigo-600" />
          Objetivos de Ahorro
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-900 p-8 rounded-3xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
              <div>
                <p className="text-indigo-200 text-sm font-medium">Fondo de Emergencia</p>
                <h4 className="text-3xl font-bold mt-1">€4,250.00</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span>85% Completado</span>
                  <span>Meta: €5,000</span>
                </div>
                <div className="h-2 bg-indigo-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-400 w-[85%]"></div>
                </div>
              </div>
            </div>
            {/* Decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target size={120} />
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center gap-4 border-dashed border-2">
            <div className="p-4 bg-slate-50 rounded-full text-slate-400">
              <Plus size={32} />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-lg">Nuevo Objetivo</p>
              <p className="text-sm text-slate-400">¿Estás ahorrando para un coche, viaje o casa?</p>
            </div>
            <button className="mt-2 text-indigo-600 font-bold hover:underline">Empieza ahora</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetsView;
