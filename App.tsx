
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Receipt, 
  CreditCard, 
  PieChart, 
  Settings, 
  Sparkles, 
  Plus, 
  Bell, 
  Search,
  Menu,
  X,
  Target
} from 'lucide-react';
import { 
  AppSection, 
  Transaction, 
  Account as AccountType 
} from './types';
import { ACCOUNTS } from './constants';
import Dashboard from './components/Dashboard';
import TransactionsList from './components/TransactionsList';
import BudgetsView from './components/BudgetsView';
import AccountsView from './components/AccountsView';
import AIInsights from './components/AIInsights';
import AnalyticsView from './components/AnalyticsView';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.DASHBOARD);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<AccountType[]>(ACCOUNTS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const mockTransactions: Transaction[] = [
      { id: '1', amount: 1200, type: 'INCOME', categoryId: 'cat-8', accountId: 'acc-1', date: '2023-10-01', description: 'Nómina Octubre', tags: ['trabajo'], isRecurring: true, paymentMethod: 'Transferencia' },
      { id: '2', amount: 45.50, type: 'EXPENSE', categoryId: 'cat-1', accountId: 'acc-1', date: '2023-10-05', description: 'Mercadona', tags: ['comida'], isRecurring: false, paymentMethod: 'Tarjeta' },
      { id: '3', amount: 600, type: 'EXPENSE', categoryId: 'cat-2', accountId: 'acc-1', date: '2023-10-01', description: 'Alquiler', tags: ['hogar'], isRecurring: true, paymentMethod: 'Transferencia' },
      { id: '4', amount: 60, type: 'EXPENSE', categoryId: 'cat-4', accountId: 'acc-1', date: '2023-10-10', description: 'Factura Luz', tags: ['hogar'], isRecurring: true, paymentMethod: 'Domiciliación' },
    ];
    setTransactions(mockTransactions);
  }, []);

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...t, id: Math.random().toString(36).substr(2, 9) };
    setTransactions([newTransaction, ...transactions]);
    setAccounts(prev => prev.map(acc => acc.id === t.accountId ? { ...acc, balance: t.type === 'INCOME' ? acc.balance + t.amount : acc.balance - t.amount } : acc));
  };

  const menuItems = [
    { id: AppSection.DASHBOARD, label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: AppSection.TRANSACTIONS, label: 'Movimientos', icon: <Receipt size={20} /> },
    { id: AppSection.ACCOUNTS, label: 'Cuentas', icon: <CreditCard size={20} /> },
    { id: AppSection.BUDGETS, label: 'Presupuestos', icon: <Target size={20} /> },
    { id: AppSection.AI_INSIGHTS, label: 'IA Insights', icon: <Sparkles size={20} /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case AppSection.DASHBOARD: return <Dashboard transactions={transactions} accounts={accounts} setActiveSection={setActiveSection} />;
      case AppSection.TRANSACTIONS: return <TransactionsList transactions={transactions} addTransaction={addTransaction} />;
      case AppSection.ACCOUNTS: return <AccountsView accounts={accounts} transactions={transactions} />;
      case AppSection.BUDGETS: return <BudgetsView transactions={transactions} />;
      case AppSection.AI_INSIGHTS: return <AIInsights transactions={transactions} />;
      case AppSection.ANALYTICS: return <AnalyticsView transactions={transactions} />;
      default: return <Dashboard transactions={transactions} accounts={accounts} setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Sidebar Desktop - Persistente en LG+ */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 bg-white border-r border-slate-200">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100">F</div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">FinanzaPro</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                activeSection === item.id 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100 font-semibold' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className={activeSection === item.id ? 'text-white' : 'text-slate-400'}>{item.icon}</div>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-2xl">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Tu Plan</p>
            <p className="text-sm font-bold text-indigo-600">Premium Pro</p>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Navigation (Only visible on small screens when triggered) */}
      <div className={`lg:hidden fixed inset-0 z-[100] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
        <aside className={`absolute top-0 left-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">F</div>
              <span className="font-bold text-lg text-slate-800">FinanzaPro</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400"><X size={20} /></button>
          </div>
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl ${activeSection === item.id ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-500'}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Superior Adaptable */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2.5 bg-slate-50 text-slate-600 rounded-xl">
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
              <Search size={18} className="text-slate-400" />
              <input type="text" placeholder="Buscar movimientos..." className="bg-transparent border-none focus:outline-none text-sm w-48 xl:w-64 text-slate-600" />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <button className="hidden sm:flex p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl relative transition-colors">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-none">Alex Arch</p>
                <p className="text-[10px] font-bold text-indigo-500 uppercase mt-1">Socio Fundador</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 overflow-hidden border-2 border-white shadow-sm transition-transform group-hover:scale-105">
                <img src="https://picsum.photos/seed/user123/100/100" alt="avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic scrollable area with desktop-optimized padding */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-hide">
          <div className="max-w-7xl mx-auto space-y-10">
            {renderContent()}
          </div>
        </div>

        {/* Bottom Nav ONLY MOBILE */}
        <nav className="lg:hidden h-18 bg-white border-t border-slate-200 flex items-center justify-around px-4 pb-safe shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center justify-center p-2 min-w-[64px] transition-all ${
                activeSection === item.id ? 'text-indigo-600' : 'text-slate-400'
              }`}
            >
              {React.cloneElement(item.icon as React.ReactElement, { size: 22 })}
              <span className="text-[9px] font-bold uppercase tracking-tighter mt-1">{item.label}</span>
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
};

export default App;
