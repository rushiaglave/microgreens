import React from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import InstaFeed from './components/InstaFeed';
import NutriBot from './components/NutriBot';
import { BENEFITS } from './constants';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 12]);

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const staggerContainer: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-[#050805] text-white antialiased">
      <Navbar />

      <main className="pt-24">
        <Hero />
      </main>

      {/* ── STATS ────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="py-16 border-y border-white/5"
        style={{ background: '#0a0f0a' }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-16">
          {[
            ['40X', 'Nutrient Density'],
            ['100%', 'Living Produce'],
            ['500+', 'Healthy Families'],
            ['ZERO', 'Pesticides'],
            ['6+', 'Product Varieties'],
          ].map(([v, l]) => (
            <div key={l} className="text-center">
              <p className="text-4xl font-bold">{v}</p>
              <p className="text-[10px] tracking-widest text-green-500 uppercase mt-1">{l}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── BENEFITS ─────────────────────────────────────────── */}
      <section id="benefits" className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="text-center mb-24"
          >
            <span className="text-[#52c41a] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
              Why Prakriti
            </span>
            <h2 className="text-5xl md:text-6xl mb-6 font-serif font-light">
              The Science of <span className="text-[#52c41a] italic">Small.</span>
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto text-lg">
              Microgreens are harvested at peak vitality — more enzymes, more minerals, more life.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {BENEFITS.map((b, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="p-10 rounded-[2.5rem] bg-[#0d120d] border border-white/5 hover:border-green-500/30 transition-all duration-500 group"
              >
                <div className="w-16 h-16 mb-8 rounded-2xl bg-green-500/10 text-green-400 flex items-center justify-center group-hover:bg-green-500/20 transition-all duration-300">
                  <i className={`${b.icon} text-2xl`} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{b.title}</h3>
                <p className="text-stone-400 leading-relaxed">{b.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────────────────── */}
      <Products />

      {/* ── PHILOSOPHY ───────────────────────────────────────── */}
      <section className="py-32 bg-[#050805]">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ rotateX }}
            className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10"
          >
            <img
              src="/farm.png"
              alt="Farm"
              className="w-full h-full object-cover brightness-110 saturate-115 contrast-105"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050805]/40 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-green-400 tracking-widest text-xs font-bold uppercase">Our Ethos</span>
            <h2 className="text-6xl my-8 font-serif font-light">
              Grown by <span className="text-[#52c41a] italic">Nature.</span>
              <br />
              Driven by <span className="text-amber-400 italic">Science.</span>
            </h2>
            <p className="text-stone-400 text-xl leading-relaxed mb-8">
              Living trays preserve the plant's energetic intelligence until the moment you harvest.
              Our seasonal fruits are hand-picked at peak ripeness from Maharashtra's finest orchards.
            </p>
            <div className="flex flex-wrap gap-4">
              {['🌱 Microgreens', '🥭 Mangoes', '🫐 Jambhul'].map(item => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full text-sm font-semibold border border-white/10 text-stone-300"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── INSTAGRAM REVIEWS ────────────────────────────────── */}
      <InstaFeed />

      {/* ── AI GUIDE ─────────────────────────────────────────── */}
      <NutriBot />

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section id="contact" className="py-40 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/background_microgreen.png"
            className="w-full h-full object-cover opacity-20"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050805] via-transparent to-[#050805]" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl md:text-7xl mb-6 font-serif font-light">
              Join the <span className="text-[#52c41a] italic">Lifestyle.</span>
            </h2>
            <p className="text-stone-400 text-xl mb-12">
              Subscribe & save <span className="text-green-400 font-bold">20%</span> on your first order.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-stone-600 focus:border-[#52c41a]/50 outline-none transition-all"
              />
              <button className="px-8 py-4 bg-[#52c41a] hover:bg-[#a0d911] text-[#0a0f0a] rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(82,196,26,0.3)]">
                Subscribe
              </button>
            </div>

            <p className="text-stone-600 text-xs mt-6">
              No spam. Only freshness. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="py-16 border-t border-white/5" style={{ background: '#030503' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.png" alt="Prakriti Greens" className="w-10 h-10 rounded-full border border-[#2d5016]/40" />
                <div>
                  <p className="font-serif text-lg text-white">Prakriti</p>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[#52c41a] font-semibold -mt-0.5">Greens & Naturals</p>
                </div>
              </div>
              <p className="text-stone-500 text-sm leading-relaxed">
                Premium microgreens and seasonal fruits. Grown with science, delivered with soul.
              </p>
            </div>

            {/* Products */}
            <div>
              <p className="text-xs uppercase tracking-widest text-[#52c41a] font-bold mb-4">Our Products</p>
              <ul className="space-y-2 text-stone-400 text-sm">
                <li>🌱 Microgreens</li>
                <li>🥭 Alphonso Mango</li>
                <li>🫐 Indian Blackberry (Jambhul)</li>
                <li>📦 Subscription Boxes</li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <p className="text-xs uppercase tracking-widest text-[#52c41a] font-bold mb-4">Connect</p>
              <div className="flex gap-3">
                {[
                  { icon: 'fa-brands fa-instagram', bg: 'linear-gradient(135deg, #f09433, #dc2743, #bc1888)' },
                  { icon: 'fa-brands fa-whatsapp', bg: '#25D366' },
                  { icon: 'fa-brands fa-facebook', bg: '#1877F2' },
                ].map((s, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm transition-all duration-300 hover:scale-110"
                    style={{ background: s.bg }}
                  >
                    <i className={s.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 text-center text-stone-600 text-sm">
            © {new Date().getFullYear()} Prakriti Greens & Naturals — Living Nutrition
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
