
import React from 'react';
import { 
  Plus, 
  CreditCard, 
  Wallet, 
  TrendingUp, 
  MoreHorizontal,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import { Account, Transaction } from '../types';

interface AccountsViewProps {
  accounts: Account[];
  transactions: Transaction[];
}

const AccountsView: React.FC<AccountsViewProps> = ({ accounts, transactions }) => {
  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mis Cuentas</h1>
          <p className="text-slate-500 text-sm">Gestiona tus activos.</p>
        </div>
        <button className="p-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition-all">
          <Plus size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Lado Izquierdo: Tarjetas de Cuentas */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="flex lg:flex-col gap-4 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
            {accounts.map((acc) => (
              <div key={acc.id} className="min-w-[280px] lg:min-w-0 bg-white p-5 rounded-[2rem] border border-slate-200 shadow-sm hover:ring-2 ring-indigo-100 transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${acc.type === 'BANK' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-500'}`}>
                    {acc.type === 'BANK' ? <TrendingUp size={20} /> : <CreditCard size={20} />}
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-500" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm truncate">{acc.name}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{acc.type}</p>
                  <p className="mt-2 text-xl font-black text-slate-900">{acc.balance.toLocaleString('es-ES')}€</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="hidden lg:flex w-full py-6 bg-slate-100 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-bold items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
            <Plus size={20} />
            <span className="text-sm">Nueva Cuenta</span>
          </button>
        </div>

        {/* Lado Derecho: Análisis y Flujo */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 lg:p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-base mb-6 uppercase tracking-tight">Estado de Flujo</h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
              <div className="p-4 bg-green-50 rounded-2xl">
                <div className="flex items-center gap-2 text-green-600 mb-1">
                  <ArrowUpRight size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Ingresos</span>
                </div>
                <p className="text-lg font-black text-slate-900">2.450€</p>
              </div>
              <div className="p-4 bg-red-50 rounded-2xl">
                <div className="flex items-center gap-2 text-red-600 mb-1">
                  <ArrowDownLeft size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Salidas</span>
                </div>
                <p className="text-lg font-black text-slate-900">1.820€</p>
              </div>
            </div>

            <h4 className="font-black text-slate-400 text-[10px] mb-4 uppercase tracking-widest">Últimos movimientos</h4>
            <div className="space-y-4">
              {transactions.slice(0, 3).map((t, i) => (
                <div key={i} className="flex items-center justify-between pb-3 border-b border-slate-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                      <TrendingUp size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-800 truncate">{t.description}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{t.date}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-black ${t.type === 'INCOME' ? 'text-green-600' : 'text-slate-900'} shrink-0`}>
                    {t.type === 'INCOME' ? '+' : '-'}{t.amount.toFixed(0)}€
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsView;
