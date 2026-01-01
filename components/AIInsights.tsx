
import React, { useState, useEffect } from 'react';
import { Sparkles, BrainCircuit, RefreshCw, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';
import { getFinancialInsights } from '../services/geminiService';
import { Transaction, FinancialInsight } from '../types';

interface AIInsightsProps {
  transactions: Transaction[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ transactions }) => {
  const [insights, setInsights] = useState<FinancialInsight[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const result = await getFinancialInsights(transactions);
      if (Array.isArray(result)) {
        setInsights(result);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (insights.length === 0) fetchInsights();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 text-white rounded-xl">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Smart Insights</h1>
            <p className="text-slate-500">Análisis inteligente de tus patrones financieros mediante IA.</p>
          </div>
        </div>
        <button 
          onClick={fetchInsights}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-all disabled:opacity-50"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          Refrescar Análisis
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <BrainCircuit className="text-indigo-600" size={24} />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Analizando tus movimientos...</h3>
            <p className="text-slate-500 max-w-sm">Nuestra IA está procesando tu historial para encontrar patrones y oportunidades de ahorro.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.length > 0 ? (
            insights.map((insight, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full animate-in slide-in-from-bottom-2 duration-300" style={{animationDelay: `${i * 100}ms`}}>
                <div className="mb-4">
                  {insight.type === 'WARNING' && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-2xl w-fit">
                      <AlertCircle size={24} />
                    </div>
                  )}
                  {insight.type === 'OPPORTUNITY' && (
                    <div className="p-3 bg-green-50 text-green-600 rounded-2xl w-fit">
                      <CheckCircle size={24} />
                    </div>
                  )}
                  {insight.type === 'TIPS' && (
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl w-fit">
                      <Lightbulb size={24} />
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{insight.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                  {insight.description}
                </p>
                <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700">Explorar detalle →</button>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 bg-slate-100/50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center text-center gap-4">
              <Sparkles size={48} className="text-slate-300" />
              <div>
                <p className="text-slate-500">No hay suficientes datos o la API no está configurada.</p>
                <button onClick={fetchInsights} className="text-indigo-600 font-bold hover:underline mt-2">Reintentar</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Financial Evolution / Projections */}
      <div className="bg-slate-900 p-8 rounded-[2rem] text-white relative overflow-hidden shadow-2xl shadow-slate-200">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-widest">IA Proyección 2024</span>
            <h2 className="text-3xl font-bold leading-tight">Tu proyección financiera indica que podrías ahorrar un <span className="text-green-400">18% más</span> este año.</h2>
            <p className="text-slate-400">Hemos detectado gastos hormiga en categorías de ocio que, si se reducen un 20%, te permitirían alcanzar tu objetivo de viaje en Agosto.</p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-all">Ver Proyección</button>
              <button className="px-6 py-3 bg-slate-800 text-white border border-slate-700 rounded-xl font-bold hover:bg-slate-700 transition-all">Ajustar Plan</button>
            </div>
          </div>
          <div className="hidden lg:block">
            {/* Minimalist Projections Visualizer */}
            <div className="h-48 flex items-end justify-between gap-2">
              {[40, 55, 45, 70, 65, 85, 95, 100].map((h, i) => (
                <div key={i} className="flex-1 space-y-2">
                  <div 
                    className={`rounded-t-lg transition-all duration-1000 ${i === 7 ? 'bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]' : 'bg-slate-700'}`}
                    style={{ height: `${h}%` }}
                  ></div>
                  <div className="text-[10px] text-slate-500 text-center uppercase">{['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'][i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default AIInsights;
