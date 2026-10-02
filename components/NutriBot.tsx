import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMicrogreensRecommendation } from '../services/geminiService';
import { RecommendationResponse } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

const QUICK_GOALS = [
  { label: '🛡️ Immunity', value: 'Immunity & Cold Prevention' },
  { label: '🧹 Detox', value: 'Detox & Cleanse' },
  { label: '⚡ Energy', value: 'Energy & Focus' },
  { label: '💪 Fitness', value: 'Muscle Recovery & Fitness' },
  { label: '✨ Skin Glow', value: 'Skin Health & Glow' },
  { label: '🧠 Brain Fog', value: 'Mental Clarity & Brain Fog' },
];

const NutriBot: React.FC = () => {
  const [goal, setGoal] = useState('Immunity & Cold Prevention');
  const [pref, setPref] = useState('Mild & Fresh');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal || !pref) return;
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      id="assistant"
      className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-[#faf9f5] via-[#f1f8f3] to-[#faf9f5] border-y border-slate-200"
    >
      {/* ── Glowing Blur Orbs for Glassmorphism Depth ── */}
      <div className="absolute top-12 left-10 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[110px] pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-10 w-[460px] h-[460px] bg-teal-300/25 rounded-full blur-[100px] pointer-events-none -z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-300/15 rounded-full blur-[120px] pointer-events-none -z-0" />

      {/* Subtle Dot Grid behind glass */}
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider font-[Outfit] frosted-glass-chip text-[#15803d] mb-4 shadow-xs">
            <i className="fa-solid fa-wand-magic-sparkles text-sm animate-pulse text-[#15803d]" />
            <span>AI Bio-Targeted Harvest Studio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0b2b1e] mb-3">
            Personalized Harvest <span className="text-[#15803d] italic font-normal">Prescription.</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto font-normal leading-relaxed">
            Tell our AI nutritionist your health targets for a custom bio-matched microgreen tray plan paired with fresh cut veggie containers.
          </p>
        </div>

        {/* 2-Column Blurry Glassmorphism Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

          {/* ── LEFT COLUMN: Frosted Glass Form (6 Cols) ── */}
          <div className="lg:col-span-6 frosted-glass rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Top glass reflection highlight */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

            <div>
              {/* Quick Pick Chips */}
              <div className="mb-7">
                <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-3 font-bold font-[Outfit]">
                  1. Select Target Health Goal
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_GOALS.map(chip => (
                    <button
                      key={chip.value}
                      type="button"
                      onClick={() => setGoal(chip.value)}
                      className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-300 font-[Outfit] ${goal === chip.value
                        ? 'bg-[#15803d] text-white shadow-md scale-105 border border-[#15803d]'
                        : 'frosted-glass-chip text-slate-700 hover:bg-white hover:text-slate-900 hover:scale-102'
                        }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-slate-600 mb-2 font-bold font-[Outfit]">
                    Custom Health Target
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      placeholder="e.g. Immunity, Gut Health, Anti-Inflammatory"
                      className="w-full bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl px-4 py-3.5 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[#15803d] focus:bg-white/90 focus:ring-2 focus:ring-emerald-200/50 transition-all outline-none shadow-2xs"
                    />
                    <i className="fa-solid fa-leaf absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-slate-600 mb-2 font-bold font-[Outfit]">
                    2. Flavor & Plate Preference
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={pref}
                      onChange={(e) => setPref(e.target.value)}
                      placeholder="e.g. Mild, Nutty, Spicy, Fresh, Crunchy"
                      className="w-full bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl px-4 py-3.5 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[#15803d] focus:bg-white/90 focus:ring-2 focus:ring-emerald-200/50 transition-all outline-none shadow-2xs"
                    />
                    <i className="fa-solid fa-utensils absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
                  </div>
                </div>

                <button
                  disabled={true}//{loading}
                  className="w-full bg-gradient-to-r from-[#15803d] to-[#166534] hover:from-[#166534] hover:to-[#0f4d27] text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 text-sm font-[Outfit] shadow-lg hover:shadow-xl mt-4 active:scale-98"
                >
                  {loading ? (
                    <>
                      <i className="fa-solid fa-dna animate-spin text-base" />
                      <span>Analyzing Microgreen & Veggie Bio-Profiles...</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-wand-magic-sparkles text-base" />
                      <span>Generate Harvest Prescription</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-[Outfit]">
              <span>🔒 100% Organic & Non-GMO</span>
              <span>🌱 Hydroponically Pure</span>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Frosted Emerald Glass Result Card (6 Cols) ── */}
          <div className="lg:col-span-6 frosted-glass-emerald rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[460px]">
            {/* Top glass reflection highlight */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

            {result ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  {/* Doctor/PG Header Badge */}
                  <div className="flex items-center justify-between pb-5 mb-5 border-b border-emerald-300/40">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-white text-[#15803d] rounded-2xl flex items-center justify-center font-bold text-base font-[Outfit] shadow-md border border-emerald-200">
                        PG
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-[Outfit] text-slate-900 leading-tight">
                          Tailored Harvest Selection
                        </h3>
                        <p className="text-xs text-emerald-800 font-medium font-[Outfit]">
                          Bio-Matched for "{goal}"
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-[Outfit] bg-white/80 text-emerald-800 border border-emerald-200 shadow-2xs">
                      Active Plan
                    </span>
                  </div>

                  {/* Suggested Microgreens Chips */}
                  <div className="mb-5">
                    <p className="text-[11px] uppercase tracking-wider font-bold text-emerald-900 mb-2 font-[Outfit]">
                      Recommended Microgreen Varieties:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result.suggestedGreens.map(green => (
                        <span key={green} className="bg-[#15803d] text-white px-4 py-1.5 rounded-full text-xs font-bold font-[Outfit] shadow-md flex items-center gap-1.5">
                          <span>🌱</span>
                          <span>{green}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Packed Container Meal Pairing Suggestion */}
                  <div className="mb-5 p-4 rounded-2xl frosted-glass-inner shadow-xs">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-base">🍱</span>
                      <p className="text-xs font-bold text-slate-900 font-[Outfit]">
                        Suggested Packed Container Pairing:
                      </p>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal">
                      Toss your {result.suggestedGreens.join(' & ')} into our <span className="font-bold text-[#15803d]">Gourmet Stir-Fry Tub (550g)</span> or <span className="font-bold text-[#15803d]">Paneer Ready-to-Cook Kit</span> for an effortless 10-minute dinner.
                    </p>
                  </div>

                  {/* Clinical Reasoning with frosted glass */}
                  <div className="mb-5 p-4 rounded-2xl frosted-glass-inner">
                    <p className="text-slate-800 italic text-xs sm:text-sm leading-relaxed">
                      "{result.reasoning}"
                    </p>
                  </div>

                  {/* Usage Tip */}
                  <div className="mb-6 p-3.5 rounded-2xl bg-white/60 backdrop-blur-md border border-emerald-200/50">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-[#15803d] mb-1 font-[Outfit]">
                      👨‍🍳 Chef & Nutritionist Tip:
                    </p>
                    <p className="text-slate-700 text-xs leading-relaxed">{result.usageTips}</p>
                  </div>
                </div>

                {/* 1-Click WhatsApp Order Combo */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hi Prakriti Greens! I just used the AI Nutrition Studio for "${goal}". Please prepare a custom box with:\n- Microgreens: ${result.suggestedGreens.join(', ')}\n- Packed Container: Gourmet Stir-Fry or Chef Kit\nPlease confirm availability!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5c] text-white shadow-lg hover:shadow-xl font-[Outfit] transition-all"
                >
                  <i className="fa-brands fa-whatsapp text-lg" />
                  <span>Order Recommended Greens & Container Box</span>
                </a>
              </motion.div>

            ) : (
              <div className="text-center py-12 flex flex-col items-center justify-center h-full my-auto">
                <div className="w-20 h-20 rounded-3xl frosted-glass text-[#15803d] flex items-center justify-center text-3xl mb-5 shadow-lg border border-white/90">
                  <i className="fa-solid fa-dna animate-pulse" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 font-[Outfit] mb-2">
                  Ready to Craft Your Bio-Plan
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm leading-relaxed mb-6 font-normal">
                  Select your health targets on the left and tap <strong className="text-[#15803d]">"Generate Harvest Prescription"</strong> to view your bio-matched microgreen varieties and packed meal container pairings.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full frosted-glass-inner text-[10px] font-bold uppercase tracking-wider text-slate-500 font-[Outfit]">
                  <span>⚡ Instant Nutrition Analysis</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default NutriBot;
