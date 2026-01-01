
import React, { useMemo } from 'react';
import { 
  TrendingUp, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  ChevronRight,
  Plus,
  CreditCard,
  Sparkles
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Transaction, Account, AppSection } from '../types';
import { CATEGORIES, getCategoryIcon } from '../constants';

interface DashboardProps {
  transactions: Transaction[];
  accounts: Account[];
  setActiveSection: (section: AppSection) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, accounts, setActiveSection }) => {
  const totalBalance = useMemo(() => accounts.reduce((acc, curr) => acc + curr.balance, 0), [accounts]);
  
  const monthlyStats = useMemo(() => {
    const incomes = transactions.filter(t => t.type === 'INCOME').reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'EXPENSE').reduce((acc, t) => acc + t.amount, 0);
    const savingsRate = incomes > 0 ? ((incomes - expenses) / incomes) * 100 : 0;
    return { incomes, expenses, savingsRate: Math.max(0, savingsRate) };
  }, [transactions]);

  const chartData = useMemo(() => [
    { name: 'Lun', income: 400, expense: 240 },
    { name: 'Mar', income: 300, expense: 139 },
    { name: 'Mie', income: 200, expense: 980 },
    { name: 'Jue', income: 278, expense: 390 },
    { name: 'Vie', income: 189, expense: 480 },
    { name: 'Sab', income: 239, expense: 380 },
    { name: 'Dom', income: 349, expense: 430 },
  ], []);

  const categoryExpenses = useMemo(() => {
    const expenseMap: Record<string, number> = {};
    transactions.filter(t => t.type === 'EXPENSE').forEach(t => {
      expenseMap[t.categoryId] = (expenseMap[t.categoryId] || 0) + t.amount;
    });
    return Object.entries(expenseMap).map(([id, amount]) => ({
      name: CATEGORIES.find(c => c.id === id)?.name || 'Otro',
      amount,
      color: CATEGORIES.find(c => c.id === id)?.color || '#cbd5e1'
    })).sort((a, b) => b.amount - a.amount).slice(0, 5);
  }, [transactions]);

  return (
    <div className="space-y-8 lg:space-y-10">
      {/* Header optimizado para Desktop */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Dashboard General</h1>
          <p className="text-slate-500 font-medium mt-1">Bienvenido de nuevo, Alex. Así progresa tu patrimonio.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex-1 md:flex-none px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
            <Clock size={18} />
            <span>Ver Historial</span>
          </button>
          <button 
            onClick={() => setActiveSection(AppSection.TRANSACTIONS)}
            className="flex-1 md:flex-none px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            <span>Nuevo Movimiento</span>
          </button>
        </div>
      </div>

      {/* Grid de métricas Pro: 4 columnas en Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Balance Total', value: totalBalance, icon: <Wallet size={20} />, color: 'indigo', growth: '+2.5%' },
          { label: 'Ingresos Mensuales', value: monthlyStats.incomes, icon: <ArrowUpRight size={20} />, color: 'green', growth: null },
          { label: 'Gastos Mensuales', value: monthlyStats.expenses, icon: <ArrowDownRight size={20} />, color: 'red', growth: '-12%' },
          { label: 'Ratio de Ahorro', value: `${monthlyStats.savingsRate.toFixed(0)}%`, icon: <TrendingUp size={20} />, color: 'amber', growth: null },
        ].map((metric, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-${metric.color}-50 text-${metric.color}-600 rounded-2xl`}>
                {metric.icon}
              </div>
              {metric.growth && (
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${metric.growth.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {metric.growth}
                </span>
              )}
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{metric.label}</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              {typeof metric.value === 'number' ? metric.value.toLocaleString('es-ES') + '€' : metric.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Secciones de Gráficos Duales */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Actividad Principal */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-slate-800 uppercase tracking-tight text-sm">Actividad Financiera Semanal</h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 px-3 py-1 bg-green-50 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div> Ingresos
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 px-3 py-1 bg-red-50 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div> Gastos
              </div>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.15}/><stop offset="95%" stopColor="#ef4444" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} />
                <YAxis hide />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.08)'}} />
                <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={3} fill="url(#colorExpense)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribución Circular */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-black text-slate-800 uppercase tracking-tight text-sm mb-8">Gastos por Categoría</h3>
          <div className="h-56 w-full relative mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryExpenses} layout="vertical" margin={{ left: -20, right: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" hide />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="amount" radius={[0, 8, 8, 0]} barSize={24}>
                  {categoryExpenses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4 flex-1">
            {categoryExpenses.map((cat, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: cat.color}}></div>
                  <span className="text-sm font-bold text-slate-600">{cat.name}</span>
                </div>
                <span className="text-sm font-black text-slate-900">{cat.amount.toLocaleString('es-ES')}€</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Inferior: Transacciones y Cuentas */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-black text-slate-800 uppercase tracking-tight text-sm">Transacciones Recientes</h3>
            <button onClick={() => setActiveSection(AppSection.TRANSACTIONS)} className="text-indigo-600 text-xs font-black hover:underline tracking-widest uppercase">Ver todo</button>
          </div>
          <div className="divide-y divide-slate-50">
            {transactions.slice(0, 5).map((t) => (
              <div key={t.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-slate-50 text-slate-500 transition-transform group-hover:scale-110">
                    {getCategoryIcon(t.categoryId)}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 leading-tight">{t.description}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{t.date}</p>
                  </div>
                </div>
                <div className={`text-base font-black ${t.type === 'INCOME' ? 'text-green-600' : 'text-slate-900'}`}>
                  {t.type === 'INCOME' ? '+' : '-'}{t.amount.toFixed(2)}€
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-black text-slate-800 uppercase tracking-tight text-sm">Mis Activos</h3>
            <button onClick={() => setActiveSection(AppSection.ACCOUNTS)} className="text-slate-400 hover:text-indigo-600"><ChevronRight size={20} /></button>
          </div>
          <div className="p-8 space-y-4">
            {accounts.map((acc) => (
              <div key={acc.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:ring-2 ring-indigo-100 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm text-slate-400">
                    {acc.type === 'BANK' ? <TrendingUp size={18} /> : <CreditCard size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800">{acc.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{acc.type.replace('_', ' ')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base font-black text-slate-900">{acc.balance.toLocaleString('es-ES')}€</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
