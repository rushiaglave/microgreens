import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, Variants, useInView, animate } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import InstaFeed from './components/InstaFeed';
import NutriBot from './components/NutriBot';
import Feedback from './components/Feedback';
import { BENEFITS, WHATSAPP_NUMBER, DISPLAY_PHONE } from './constants';

// ─── Animated Counter Component ───────────────────────────────────
const AnimatedCounter: React.FC<{ value: string; suffix?: string }> = ({ value, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const numericVal = parseInt(value.replace(/[^0-9]/g, ''));
  const isNumeric = !isNaN(numericVal) && numericVal > 0;

  useEffect(() => {
    if (!isInView || !ref.current || !isNumeric) return;
    const controls = animate(0, numericVal, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.floor(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [isInView, numericVal, suffix, isNumeric]);

  if (!isNumeric) return <span ref={ref}>{value}</span>;
  return <span ref={ref}>0{suffix}</span>;
};

// ─── Scroll to Hash Helper Component ───────────────────────────────
const ScrollToHash: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
};

// ─── Homepage Subcomponent with Restructured Layout ─────────────────
const HomePage: React.FC<{ showAnnouncement: boolean }> = ({ showAnnouncement }) => {
  const [activeSeasonTab, setActiveSeasonTab] = useState<'monsoon' | 'summer' | 'yearround'>('monsoon');

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  const staggerContainer: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      {/* ── 1. HERO SECTION ── */}
      <main style={{ paddingTop: showAnnouncement ? 'calc(var(--announce-height) + var(--nav-height))' : 'var(--nav-height)' }}>
        <Hero />
      </main>

      {/* ── 2. FEATURED MARKETPLACE (Directly below Hero) ── */}
      <section id="products">
        <Products />
      </section>

      {/* ── 3. ASYMMETRIC SCIENCE & NUTRIENT COMPARISON ── */}
      <section id="science" className="py-20 md:py-32 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* Left Big Impact Banner (5 Cols) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="lg:col-span-5 bg-gradient-to-br from-[#0b2b1e] to-[#15803d] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
              <span className="px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 inline-block mb-6 font-[Outfit]">
                Scientific Fact
              </span>

              <p className="text-6xl md:text-7xl font-serif font-bold text-white mb-2">40X</p>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-emerald-100 mb-4 leading-tight">
                Nutrient Density vs. Mature Veggies
              </h3>

              <p className="text-emerald-100/90 text-sm md:text-base leading-relaxed mb-8 font-light">
                According to USDA study reports, microgreens harvested at day 10–14 contain up to 40 times higher concentration of Vitamins C, E, K, and beta-carotene than mature plants.
              </p>

              <div className="pt-6 border-t border-emerald-700/50 flex items-center justify-between text-xs text-emerald-200">
                <span>🌱 Zero Soil Contaminants</span>
                <span>💧 Hydroponic Purity</span>
              </div>
            </motion.div>

            {/* Right Metric Cards (7 Cols) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
            >
              {[
                {
                  title: 'Living Cell Vitality',
                  stat: '100%',
                  desc: 'Delivered in active living trays with root systems intact so enzymes & minerals never oxidize.',
                  icon: 'fa-solid fa-heart-pulse',
                  color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
                },
                {
                  title: 'Airtight Sealed Containers',
                  stat: '5+ Days',
                  desc: 'Pre-washed with ozone purification and sealed in airtight food-grade tubs to lock peak crunch & flavor.',
                  icon: 'fa-solid fa-box-archive',
                  color: 'text-teal-700 bg-teal-50 border-teal-200',
                },
                {
                  title: 'Zero Chemical Sprays',
                  stat: '0%',
                  desc: 'Grown in climate-controlled nursery environments with zero chemical pesticides or artificial growth agents.',
                  icon: 'fa-solid fa-shield-halved',
                  color: 'text-amber-700 bg-amber-50 border-amber-200',
                },
                {
                  title: 'Zero Prep Cooking Time',
                  stat: '10 Mins',
                  desc: 'Pre-cut, portioned vegetables with microgreen garnishes. Open the container and toss straight into your skillet.',
                  icon: 'fa-solid fa-clock',
                  color: 'text-purple-700 bg-purple-50 border-purple-200',
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-base border ${card.color}`}>
                        <i className={card.icon} />
                      </div>
                      <span className="text-2xl font-bold font-serif text-slate-900">{card.stat}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-2 font-[Outfit]">{card.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>


          </div>
        </div>
      </section>

      {/* ── 4. BENEFITS GRID ── */}
      <section id="benefits" className="py-20 md:py-28 bg-[#faf9f5]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="text-center mb-12 md:mb-18"
          >
            <span className="text-[#15803d] text-xs font-bold uppercase tracking-[0.3em] mb-3 block font-[Outfit]">
              Why Prakriti
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0b2b1e]">
              Engineered For <span className="text-[#15803d] italic font-normal">Daily Wellness.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {BENEFITS.map((b, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="p-7 md:p-9 rounded-[2rem] bg-white border border-slate-200 shadow-xs hover:shadow-lg hover:border-[#15803d]/40 transition-all duration-300 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 mb-6 rounded-2xl bg-emerald-50 text-[#15803d] flex items-center justify-center text-xl font-bold shadow-2xs">
                    <i className={b.icon} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-[Outfit] text-slate-900">{b.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{b.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. INTERACTIVE SEASONAL HARVEST CALENDAR & FARM ETHOS ── */}
      <section id="ethos" className="py-20 md:py-32 bg-[#f4f3ee] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* Left Farm Visual */}
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl"
            >
              <img
                src="/farm.png"
                alt="Our organic farm in Maharashtra"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-md border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl">
                    🫐
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-sm font-[Outfit]">Live Harvest Status</p>
                    <p className="text-slate-500 text-xs">Indian Blackberry Harvest Dispatching Daily</p>
                  </div>
                  <div className="ml-auto px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider font-[Outfit]">
                    Active
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Interactive Harvest Calendar */}
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6"
            >
              <span className="text-[#15803d] tracking-widest text-xs font-bold uppercase font-[Outfit] block mb-2">Seasonal Calendar</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0b2b1e] mb-6">
                Harvested at Peak <span className="text-[#15803d] italic font-normal">Ripeness.</span>
              </h2>

              {/* Season Tabs */}
              <div className="flex gap-2 mb-6 p-1 bg-slate-200/80 rounded-full text-xs font-bold uppercase tracking-wider font-[Outfit]">
                {[
                  { id: 'yearround', label: '🌱 Greens & Veggie Containers' },
                  { id: 'monsoon', label: '🌧️ Monsoon (Jambhul)' },
                  { id: 'summer', label: '☀️ Summer (Mango)' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSeasonTab(tab.id as any)}
                    className={`flex-1 py-2.5 px-3 rounded-full transition-all duration-300 ${activeSeasonTab === tab.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Season Content Box */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-6">
                {activeSeasonTab === 'yearround' && (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-slate-900 text-base font-[Outfit]">Living Microgreens & Packed Cut Veggies</h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">Daily Harvest</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      Broccoli, Radish, Pea Shoots & Sunflower living trays, plus ozone-purified diced stir-fry containers and 10-minute ready-to-cook meal kits. Dispatched within 24 hours of harvest across Maharashtra.
                    </p>
                    <span className="text-xs font-bold text-[#15803d] font-serif">Dispatch Window: 365 Days a Year • Farm Direct</span>
                  </div>
                )}

                {activeSeasonTab === 'monsoon' && (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-slate-900 text-base font-[Outfit]">Indian Blackberry (Jambhul)</h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold uppercase">Now Selling</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      Monsoon exclusive crop from Maharashtra orchards. Naturally low glycemic index, rich in jamboline compounds that support healthy blood sugar levels.
                    </p>
                    <span className="text-xs font-bold text-purple-700 font-serif">Dispatch Window: July — September</span>
                  </div>
                )}

                {activeSeasonTab === 'summer' && (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-slate-900 text-base font-[Outfit]">Ratnagiri Alphonso Mangoes</h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase">Restocking Next Season</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      GI-tagged authentic Ratnagiri Alphonso mangoes. Tree-ripened with natural straw beds, delivering rich aroma and buttery texture.
                    </p>
                    <span className="text-xs font-bold text-amber-700 font-serif">Dispatch Window: March — June</span>
                  </div>
                )}
              </div>

              <a
                href="#products"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#15803d] hover:text-[#166534] font-[Outfit]"
              >
                <span>View Full Product Lineup</span>
                <i className="fa-solid fa-arrow-right text-xs" />
              </a>

            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 6. AI NUTRITION CONSULTATION WIZARD ── */}
      <NutriBot />

      {/* ── 7. INSTAGRAM REVIEWS & COMMUNITY ── */}
      <InstaFeed />

      {/* ── 8. CUSTOMER FEEDBACK ON WHATSAPP ── */}
      <Feedback />

      {/* ── 9. NEWSLETTER CTA & FOOTER ── */}
      <section id="contact" className="py-20 md:py-32 relative overflow-hidden bg-[#0b2b1e] text-white">

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs md:text-sm font-semibold text-emerald-300 uppercase tracking-widest font-[Outfit] block mb-4">
              Fresh Organic Community
            </span>

            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
              Join the <span className="text-emerald-400 italic font-normal">Living Nutrition</span> Movement.
            </h2>
            <p className="text-slate-300 text-base md:text-lg mb-8 max-w-xl mx-auto font-light">
              Subscribe & save <span className="text-emerald-400 font-bold">20%</span> on your first farm tray order.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-white/10 border border-white/20 rounded-full px-5 py-3.5 text-white placeholder:text-slate-400 focus:outline-none text-sm flex-1"
              />
              <button className="px-7 py-3.5 bg-[#15803d] hover:bg-[#166534] text-white rounded-full font-bold uppercase tracking-wider text-xs font-[Outfit] shadow-md transition-all">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

// ─── Shop Page Subcomponent ───────────────────────────────────────
const ShopPage: React.FC<{ showAnnouncement: boolean }> = ({ showAnnouncement }) => {
  return (
    <main style={{ paddingTop: showAnnouncement ? 'calc(var(--announce-height) + var(--nav-height))' : 'var(--nav-height)' }}>
      <Products />
      <Feedback />
    </main>
  );
};


// ─── Main App Component with Routing ──────────────────────────────────
const App: React.FC = () => {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className="min-h-screen bg-[#faf9f5] text-slate-900 antialiased">
        {/* ── ANNOUNCEMENT BAR ──────────────────────────────────── */}
        {showAnnouncement && (
          <div
            className="fixed top-0 left-0 right-0 z-[60] overflow-hidden"
            style={{
              height: 'var(--announce-height)',
              background: 'linear-gradient(90deg, #0b2b1e, #15803d, #047857, #0b2b1e)',
            }}
          >
            <div className="relative h-full flex items-center">
              <div className="absolute inset-0 shimmer pointer-events-none" />

              <div className="flex marquee-track whitespace-nowrap">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span key={i} className="inline-flex items-center gap-6 px-8 text-xs md:text-sm font-semibold text-white/95 tracking-wide">
                    <span>🌱 Living Microgreens & 🍱 Packed Cut Veggies Shipping Daily!</span>
                    <span className="text-emerald-300/70">•</span>
                    <span>100% Ozone Pre-Washed & Airtight Sealed</span>
                    <span className="text-emerald-300/70">•</span>
                    <span>Ready in 10 Minutes with Zero Peeling</span>
                    <span className="text-emerald-300/70">•</span>
                    <span className="text-purple-300">🫐 Peak Monsoon Jambhul also available!</span>
                    <span className="text-emerald-300/70 mr-6">•</span>
                  </span>
                ))}
              </div>

              <button
                onClick={() => setShowAnnouncement(false)}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-white/70 hover:text-white transition-colors z-10 bg-white/10 rounded-full hover:bg-white/20"
                aria-label="Dismiss announcement"
                style={{ minHeight: '24px' }}
              >
                <i className="fa-solid fa-xmark text-xs" />
              </button>
            </div>
          </div>
        )}

        <Navbar showAnnouncement={showAnnouncement} />

        <Routes>
          <Route path="/" element={<HomePage showAnnouncement={showAnnouncement} />} />
          <Route path="/shop" element={<ShopPage showAnnouncement={showAnnouncement} />} />
        </Routes>

        {/* ── FOOTER ───────────────────────────────────────────── */}
        <footer className="py-12 md:py-18 bg-[#071912] text-slate-300 border-t border-emerald-950">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
              {/* Brand */}
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/logo.png" alt="Prakriti Greens" className="w-10 h-10 rounded-full border border-emerald-700/50 bg-white p-0.5" />
                  <div>
                    <p className="font-serif text-xl font-bold text-white">Prakriti</p>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#22c55e] font-bold -mt-0.5">Greens & Naturals</p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Living microgreens, precision-cut vegetables, and ready-to-cook meal kits in sealed food-grade containers. Grown with science, delivered with care.
                </p>
              </div>

              {/* Products */}
              <div>
                <p className="text-xs uppercase tracking-widest text-[#22c55e] font-bold mb-3 md:mb-4 font-[Outfit]">Our Offerings</p>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="hover:text-white transition-colors cursor-pointer">🌱 Living Microgreen Trays</li>
                  <li className="hover:text-white transition-colors cursor-pointer">🍱 Fresh Cut Veggie Containers</li>
                  <li className="hover:text-white transition-colors cursor-pointer">🍳 Ready-to-Cook Meal Kits</li>
                  <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                    🫐 Indian Blackberry (Jambhul)
                    <span className="px-1.5 py-0.5 text-[8px] font-bold uppercase bg-purple-900/60 text-purple-200 rounded-full tracking-wider">Selling</span>
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">🥭 Ratnagiri Alphonso Mango</li>
                </ul>
              </div>

              {/* Currently in Season */}
              <div>
                <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-3 md:mb-4 font-[Outfit]">Daily Fresh Dispatch</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/40">
                    <img src="/cut_veggies_pack.jpg" alt="Cut Veggies" className="w-10 h-10 object-contain rounded-lg" />
                    <div>
                      <p className="text-white text-sm font-semibold">Stir-Fry Veggie Tub</p>
                      <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">₹240 • 550g Airtight</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/40">
                    <img src="/Radish.png" alt="Sango Radish" className="w-10 h-10 object-contain" />
                    <div>
                      <p className="text-white text-sm font-semibold">Sango Radish Tray</p>
                      <p className="text-emerald-300 text-[10px] font-bold uppercase tracking-wider">₹350 • Living Roots</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connect */}
              <div>
                <p className="text-xs uppercase tracking-widest text-[#22c55e] font-bold mb-3 md:mb-4 font-[Outfit]">Connect</p>
                <div className="flex gap-3 mb-4">
                  {[
                    { icon: 'fa-brands fa-instagram', bg: 'linear-gradient(135deg, #f09433, #dc2743, #bc1888)', href: 'https://www.instagram.com/prakriti__greens/' },
                    { icon: 'fa-brands fa-whatsapp', bg: '#25D366', href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Prakriti Greens! I want to konw more about your products.')}` },
                    // { icon: 'fa-brands fa-facebook', bg: '#1877F2', href: '#' },
                  ].map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      style={{ background: s.bg }}
                    >
                      <i className={s.icon} />
                    </a>
                  ))}
                </div>

                {/* <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Prakriti Greens! I want to order Microgreens and Cut Vegetable Containers.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-sm font-[Outfit]"
                  style={{ background: '#25D366', color: '#fff' }}
                >
                  <i className="fa-brands fa-whatsapp text-sm" />
                  Order on WhatsApp ({DISPLAY_PHONE})
                </a> */}
              </div>
            </div>


            <div className="border-t border-emerald-900/60 pt-6 md:pt-8 text-center text-slate-500 text-xs md:text-sm">
              © {new Date().getFullYear()} Prakriti Greens & Naturals — Living Nutrition & Ready-to-Cook Packs
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};


export default App;
