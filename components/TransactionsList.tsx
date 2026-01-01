
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  X, 
  ChevronRight,
  Download,
  Filter
} from 'lucide-react';
import { Transaction, TransactionType } from '../types';
import { CATEGORIES, ACCOUNTS, getCategoryIcon } from '../constants';

interface TransactionsListProps {
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
}

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions, addTransaction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [typeFilter, setTypeFilter] = useState<TransactionType | 'ALL'>('ALL');

  const [newTx, setNewTx] = useState<Omit<Transaction, 'id'>>({
    amount: 0, type: 'EXPENSE', categoryId: CATEGORIES[0].id, accountId: ACCOUNTS[0].id,
    date: new Date().toISOString().split('T')[0], description: '', tags: [], isRecurring: false, paymentMethod: 'Tarjeta'
  });

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'ALL' || t.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [transactions, searchTerm, typeFilter]);

  const handleAdd = () => {
    if (newTx.amount <= 0 || !newTx.description) return;
    addTransaction(newTx);
    setShowAddModal(false);
    setNewTx({ ...newTx, amount: 0, description: '' });
  };

  return (
    <div className="space-y-8">
      {/* Header Pro */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Movimientos</h1>
          <p className="text-slate-500 font-medium">Historial detallado y auditoría de tus finanzas.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2">
            <Download size={18} />
            <span className="hidden sm:inline">Exportar</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Añadir Registro</span>
          </button>
        </div>
      </div>

      {/* Barra de Búsqueda y Filtros Premium */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por concepto o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none font-medium text-sm transition-all"
          />
        </div>
        <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
          {[
            { id: 'ALL', label: 'Todos' },
            { id: 'INCOME', label: 'Ingresos' },
            { id: 'EXPENSE', label: 'Gastos' }
          ].map((f) => (
            <button 
              key={f.id}
              onClick={() => setTypeFilter(f.id as any)}
              className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                typeFilter === f.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla Pro (Desktop) */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="hidden md:block">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Fecha</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Concepto</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Categoría</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Cuenta</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Monto</th>
                <th className="px-8 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold text-slate-500">{t.date}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-slate-900">{t.description}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-slate-100 rounded-xl text-slate-500">{getCategoryIcon(t.categoryId)}</div>
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">{CATEGORIES.find(c => c.id === t.categoryId)?.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg uppercase tracking-tighter">
                      {ACCOUNTS.find(a => a.id === t.accountId)?.name}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`text-base font-black ${t.type === 'INCOME' ? 'text-green-600' : 'text-slate-900'}`}>
                      {t.type === 'INCOME' ? '+' : '-'}{t.amount.toLocaleString('es-ES')}€
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Vista Móvil (Cards) */}
        <div className="md:hidden divide-y divide-slate-50">
          {filteredTransactions.map((t) => (
            <div key={t.id} className="p-5 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-50 rounded-2xl text-slate-500 shrink-0">{getCategoryIcon(t.categoryId)}</div>
                <div className="min-w-0">
                  <p className="text-sm font-black text-slate-900 truncate">{t.description}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{t.date} • {ACCOUNTS.find(a => a.id === t.accountId)?.name}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-black ${t.type === 'INCOME' ? 'text-green-600' : 'text-slate-900'}`}>
                  {t.type === 'INCOME' ? '+' : '-'}{t.amount.toFixed(2)}€
                </p>
                <div className="flex items-center justify-end text-slate-300 mt-1"><ChevronRight size={14} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal responsivo - Sheet en móvil, Modal en Desktop */}
      {showAddModal && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-md p-0 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-t-[2.5rem] sm:rounded-[3rem] w-full max-w-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-300">
            <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Nuevo Movimiento</h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={20} /></button>
            </div>
            
            <div className="p-8 sm:p-10 space-y-8">
              <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                <button 
                  onClick={() => setNewTx({...newTx, type: 'EXPENSE'})}
                  className={`flex-1 py-3.5 rounded-xl font-black text-xs uppercase tracking-[0.15em] transition-all ${newTx.type === 'EXPENSE' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500'}`}
                >Gasto</button>
                <button 
                  onClick={() => setNewTx({...newTx, type: 'INCOME'})}
                  className={`flex-1 py-3.5 rounded-xl font-black text-xs uppercase tracking-[0.15em] transition-all ${newTx.type === 'INCOME' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-500'}`}
                >Ingreso</button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Monto</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 font-black text-2xl">€</span>
                    <input type="number" value={newTx.amount} onChange={(e) => setNewTx({...newTx, amount: parseFloat(e.target.value)})} className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 font-black text-2xl outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Fecha</label>
                  <input type="date" value={newTx.date} onChange={(e) => setNewTx({...newTx, date: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none font-bold" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Concepto / Descripción</label>
                <input type="text" value={newTx.description} onChange={(e) => setNewTx({...newTx, description: e.target.value})} placeholder="Ej. Suscripción SaaS, Alquiler..." className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none font-bold" />
              </div>

              <button 
                onClick={handleAdd}
                className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98] uppercase tracking-[0.2em]"
              >Guardar Registro</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsList;
