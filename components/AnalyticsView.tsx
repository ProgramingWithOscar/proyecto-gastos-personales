
import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Transaction } from '../types';
import { CATEGORIES } from '../constants';

interface AnalyticsViewProps {
  transactions: Transaction[];
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ transactions }) => {
  const data = [
    { name: 'May', ingresos: 4000, gastos: 2400 },
    { name: 'Jun', ingresos: 3000, gastos: 1398 },
    { name: 'Jul', ingresos: 2000, gastos: 9800 },
    { name: 'Ago', ingresos: 2780, gastos: 3908 },
    { name: 'Sep', ingresos: 1890, gastos: 4800 },
    { name: 'Oct', ingresos: 2390, gastos: 3800 },
  ];

  const categoryDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    transactions.filter(t => t.type === 'EXPENSE').forEach(t => {
      counts[t.categoryId] = (counts[t.categoryId] || 0) + t.amount;
    });
    return Object.entries(counts).map(([id, value]) => ({
      name: CATEGORIES.find(c => c.id === id)?.name || 'Otro',
      value,
      color: CATEGORIES.find(c => c.id === id)?.color || '#94a3b8'
    }));
  }, [transactions]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Análisis Avanzado</h1>
        <p className="text-slate-500">Visualiza el rendimiento y evolución de tus finanzas.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Evolution Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Ingresos vs Gastos</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                   contentStyle={{backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}}
                />
                <Legend iconType="circle" />
                <Bar dataKey="ingresos" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="gastos" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Distribución de Gastos</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Stats Summary Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 font-bold text-slate-800">Resumen Mensual Comparativo</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Mes</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Ingresos</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Gastos</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Ahorro</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Tendencia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {['Octubre', 'Septiembre', 'Agosto'].map((mes, i) => (
                <tr key={mes} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{mes}</td>
                  <td className="px-6 py-4 text-sm text-green-600 font-bold">€2,450.00</td>
                  <td className="px-6 py-4 text-sm text-slate-600">€1,820.50</td>
                  <td className="px-6 py-4 text-sm text-slate-900 font-bold">€629.50</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${i === 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {i === 0 ? '+12%' : '-5%'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
