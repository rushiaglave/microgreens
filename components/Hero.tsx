import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WHATSAPP_NUMBER } from '../constants';

const HERO_FEATURED = [
  {
    id: 'cut-veggies',
    tabLabel: '🍱 Cut Veggies',
    name: 'Gourmet Stir-Fry Veggie Mix',
    price: '₹240',
    unit: '550g sealed tub',
    badge: '🍱 Airtight Sealed Container',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    btnBg: 'bg-[#15803d] hover:bg-[#166534] text-white',
    image: '/cut_veggies_pack.jpg',
    containerInfo: 'Ozone-sanitized, precision-diced bell peppers, broccoli florets, baby corn, carrots & zucchini. 100% pre-washed and ready for the pan.',
    meta: ['Zero Peeling', 'Airtight Lock', 'Serves 2-3'],
  },
  {
    id: 'ready-to-cook',
    tabLabel: '🍳 Ready to Cook',
    name: 'Paneer & Veggie Stir-Fry Chef Kit',
    price: '₹320',
    unit: '600g divided kit',
    badge: '⚡ 10-Min Ready to Cook',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
    btnBg: 'bg-amber-600 hover:bg-amber-700 text-white',
    image: '/ready_to_cook_container.jpg',
    containerInfo: 'Divided sealed container with fresh paneer cubes, chopped crisp veggies, culinary sauce cup, and living microgreens garnish.',
    meta: ['Cook in 8 Mins', 'Microgreens Garnish', 'Serves 2'],
  },
  {
    id: 'microgreens',
    tabLabel: '🌱 Microgreens',
    name: 'Royal Sango Radish Living Tray',
    price: '₹350',
    unit: 'living tray',
    badge: '🌱 40X Nutrient Density',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    btnBg: 'bg-[#15803d] hover:bg-[#166534] text-white',
    image: '/Radish.png',
    containerInfo: 'Arrives alive with intact roots. Snip seconds before eating for maximum antioxidant enzyme absorption and fresh peppery crunch.',
    meta: ['Live Roots', '20+ Servings', 'Zero Nutrient Decay'],
  },
  {
    id: 'seasonal',
    tabLabel: '🫐 Seasonal Fruit',
    name: 'Indian Blackberry (Jambhul)',
    price: '₹299',
    unit: 'per kg box',
    badge: '🌧️ Monsoon Harvest Active',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
    btnBg: 'bg-purple-700 hover:bg-purple-800 text-white',
    image: '/jambhul_3d.png',
    containerInfo: 'Hand-picked peak monsoon harvest from Maharashtra orchards. Naturally low glycemic index, dense with anthocyanins and organic iron.',
    meta: ['Wild Harvested', 'Maharashtra Orchards', 'Limited Batch'],
  },
];

const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const featured = HERO_FEATURED[activeTab];

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#faf9f5] py-12 md:py-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none z-[1]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* ── LEFT COLUMN: Value Proposition & CTAs (7 Cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 text-left"
          >
            {/* Tag / Quality Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-[#15803d] text-xs font-bold uppercase tracking-wider mb-5 font-[Outfit] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#15803d] animate-pulse" />
              Pre-Washed • Ozone Sanitized • Airtight Containers
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#0b2b1e] leading-[1.12] tracking-tight mb-5">
              Fresh Microgreens & <br />
              <span className="text-[#15803d] italic font-normal">Ready-to-Cook</span> Cut Veggies.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-6 max-w-2xl">
              Farm-harvested living microgreen trays and precision-cut vegetables sealed in airtight food-grade containers. No peeling, no chopping, and zero waste effortless 10-minute gourmet nutrition delivered directly to your doorstep.
            </p>

            {/* Container Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="bg-white/80 border border-slate-200/80 rounded-xl p-3 shadow-2xs">
                <div className="flex items-center gap-2 text-[#15803d] font-bold text-xs uppercase tracking-wide font-[Outfit] mb-1">
                  <i className="fa-solid fa-box-open" />
                  <span>Airtight Packs</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">Food-grade sealed containers lock in moisture & crunch</p>
              </div>

              <div className="bg-white/80 border border-slate-200/80 rounded-xl p-3 shadow-2xs">
                <div className="flex items-center gap-2 text-[#15803d] font-bold text-xs uppercase tracking-wide font-[Outfit] mb-1">
                  <i className="fa-solid fa-seedling" />
                  <span>40× Microgreens</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">Living root trays for fresh kitchen harvesting</p>
              </div>

              <div className="bg-white/80 border border-slate-200/80 rounded-xl p-3 shadow-2xs col-span-2 sm:col-span-1">
                <div className="flex items-center gap-2 text-[#15803d] font-bold text-xs uppercase tracking-wide font-[Outfit] mb-1">
                  <i className="fa-solid fa-stopwatch" />
                  <span>Zero Prep Work</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">Washed, cut, ready to toss straight into the pan</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center mb-8">
              <a
                href="#products"
                className="px-7 py-3.5 bg-[#15803d] hover:bg-[#166534] text-white rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 font-[Outfit]"
              >
                <span>View Packed Containers & Greens</span>
                <i className="fa-solid fa-arrow-down text-xs" />
              </a>

              <a
                href="#assistant"
                className="px-6 py-3.5 bg-white border border-slate-200 hover:border-[#15803d] text-[#0b2b1e] rounded-full font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 font-[Outfit] shadow-2xs"
              >
                <i className="fa-solid fa-wand-magic-sparkles text-[#15803d]" />
                <span>AI Meal & Tray Planner</span>
              </a>
            </div>

            {/* Trust Metrics Row */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <p className="text-2xl md:text-3xl font-bold font-serif text-[#0b2b1e]">40X</p>
                <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wider font-[Outfit]">Microgreen Density</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold font-serif text-[#0b2b1e]">10 Min</p>
                <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wider font-[Outfit]">Ready-to-Cook Prep</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold font-serif text-[#0b2b1e]">100%</p>
                <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wider font-[Outfit]">Airtight & Clean</p>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: Interactive Product Spotlight (5 Cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-[2rem] p-6 md:p-7 border border-slate-200 shadow-xl relative">

              {/* Product Switcher Tabs */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-full mb-5 text-[10px] sm:text-xs font-bold uppercase tracking-wider font-[Outfit]">
                {HERO_FEATURED.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(idx)}
                    className={`py-2 px-1 rounded-full transition-all duration-300 text-center truncate ${activeTab === idx
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                      }`}
                  >
                    {item.tabLabel}
                  </button>
                ))}
              </div>

              {/* Status Badge */}
              <div className="flex justify-between items-center mb-3">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${featured.badgeBg} font-[Outfit]`}>
                  {featured.badge}
                </span>
                <span className="text-xs text-emerald-700 font-bold font-[Outfit]">Available Now</span>
              </div>

              {/* Featured Image Container */}
              <div className="relative h-52 sm:h-60 rounded-2xl bg-slate-50/80 flex items-center justify-center p-3 mb-5 border border-slate-100 overflow-hidden">
                <motion.img
                  key={featured.id}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  src={featured.image}
                  alt={featured.name}
                  className="max-h-full w-full object-contain rounded-xl"
                  style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.08))' }}
                />
              </div>

              {/* Product Details */}
              <div className="mb-5">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-[Outfit] leading-tight pr-2">
                    {featured.name}
                  </h3>
                  <div className="text-right whitespace-nowrap">
                    <span className="text-2xl font-bold text-slate-900 font-serif">{featured.price}</span>
                    <span className="text-[11px] text-slate-500 block font-normal">{featured.unit}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {featured.containerInfo}
                </p>

                {/* Meta pills */}
                <div className="flex flex-wrap gap-1.5">
                  {featured.meta.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold font-[Outfit]">
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hi Prakriti Greens! I want to order:\n- ${featured.name} (${featured.unit}) @ ${featured.price}\nPlease confirm availability and dispatch!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 shadow-sm font-[Outfit] ${featured.btnBg}`}
              >
                <i className="fa-brands fa-whatsapp text-base" />
                <span>Order Packed Container on WhatsApp</span>
              </a>


            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;