
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getMicrogreensRecommendation } from '../services/geminiService';
import { RecommendationResponse } from '../types';

const NutriBot: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [pref, setPref] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal || pref === '') return;
    setLoading(true);
    try {
      const recommendation = await getMicrogreensRecommendation(goal, pref);
      setResult(recommendation);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      id="assistant" 
      className="py-32 bg-[#0a0f0a] border-y border-white/5 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/20 blur-[200px] rounded-full"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-neon-green font-bold text-xs tracking-widest uppercase mb-4 block">AI Consultation</span>
          <h2 className="text-5xl md:text-6xl">Your Micro-Dose of Health.</h2>
          <p className="text-stone-500 mt-6 text-lg font-light">Tell our AI nutritionist your health goals for a personalized harvest plan.</p>
        </div>

        <div className="bg-[#0d120d] p-10 md:p-12 rounded-[3rem] border border-white/10 shadow-3xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-4 font-bold">Target Health Goal</label>
                <input 
                  type="text" 
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g. Brain Fog, Gut Health, Glow"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-stone-700 focus:border-green-500/50 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-4 font-bold">Flavor Profile</label>
                <input 
                  type="text" 
                  value={pref}
                  onChange={(e) => setPref(e.target.value)}
                  placeholder="e.g. Mild, Spicy, Earthy"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-stone-700 focus:border-green-500/50 transition-all outline-none"
                />
              </div>
            </div>
            <button 
              disabled={loading}
              className="w-full bg-white text-black hover:bg-green-400 py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-dna animate-spin"></i> Analyzing Bio-Profiles...
                </>
              ) : (
                'Generate My Prescription'
              )}
            </button>
          </form>

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 p-10 bg-green-500/5 rounded-3xl border border-green-500/10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-500 text-black rounded-full flex items-center justify-center font-bold">PG</div>
                <h3 className="text-2xl font-bold">Recommended Varieties</h3>
              </div>
              <div className="flex flex-wrap gap-3 mb-6">
                {result.suggestedGreens.map(green => (
                  <span key={green} className="bg-green-500 text-black px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">{green}</span>
                ))}
              </div>
              <p className="text-stone-400 mb-8 italic text-lg leading-relaxed">"{result.reasoning}"</p>
              <div className="border-t border-white/5 pt-8">
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-neon-green mb-3">Professional Tip</p>
                <p className="text-stone-300">{result.usageTips}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default NutriBot;
