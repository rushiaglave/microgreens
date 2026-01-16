import React from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NutriBot from './components/NutriBot';
import { PRODUCTS, BENEFITS } from './constants';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 12]);

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  const staggerContainer: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-[#050805] text-white antialiased">
      <Navbar />

      <main className="pt-24">
        <Hero />
      </main>

      {/* STATS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="py-16 bg-[#0a0f0a] border-y border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-16">
          {[
            ['40X', 'Nutrient Density'],
            ['100%', 'Living Produce'],
            ['500+', 'Healthy Families'],
            ['ZERO', 'Pesticides']
          ].map(([v, l]) => (
            <div key={l} className="text-center">
              <p className="text-4xl font-bold">{v}</p>
              <p className="text-[10px] tracking-widest text-green-500 uppercase mt-1">
                {l}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* BENEFITS */}
      <section id="benefits" className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="text-center mb-24"
          >
            <h2 className="text-5xl md:text-6xl mb-6">The Science of Small.</h2>
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
                className="p-10 rounded-[2.5rem] bg-[#0d120d] border border-white/5 hover:border-green-500/30 transition"
              >
                <div className="w-16 h-16 mb-8 rounded-2xl bg-green-500/10 text-green-400 flex items-center justify-center">
                  <i className={`${b.icon} text-2xl`} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{b.title}</h3>
                <p className="text-stone-400 leading-relaxed">{b.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-32 bg-[#070b07]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="mb-20"
          >
            <h2 className="text-5xl md:text-6xl mb-6">Curated Collections.</h2>
            <p className="text-stone-400 text-lg max-w-xl">
              Fresh cut or living trays — nutrition that stays alive.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {PRODUCTS.map(p => (
              <motion.div
                key={p.id}
                variants={itemVariants}
                className="rounded-[2.5rem] overflow-hidden bg-[#0d120d] border border-white/5"
              >
                <div className="relative h-72">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover brightness-110 contrast-105 saturate-110 transition-transform duration-1000 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050805]/70 via-transparent to-transparent" />
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3">{p.name}</h3>
                  <p className="text-stone-400 text-sm mb-6 line-clamp-3">
                    {p.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-green-400">
                      ₹{p.price}
                    </span>
                    <button className="w-12 h-12 rounded-full bg-white text-black hover:bg-green-400 transition">
                      <i className="fa-solid fa-plus" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PHILOSOPHY */}
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
          </motion.div>

          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-green-400 tracking-widest text-xs font-bold uppercase">
              Our Ethos
            </span>
            <h2 className="text-6xl my-8">Grown by Nature.<br />Driven by Science.</h2>
            <p className="text-stone-400 text-xl leading-relaxed">
              Living trays preserve the plant’s energetic intelligence until the moment you harvest.
            </p>
          </motion.div>
        </div>
      </section>

      <NutriBot />

      {/* CTA */}
      <section className="py-40 relative">
        <img
          src="https://images.unsplash.com/photo-1618343825700-08f334a12368?auto=format&fit=crop&q=80&w=2000"
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay"
          alt=""
        />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h2 className="text-7xl mb-10">Join the Lifestyle.</h2>
          <p className="text-stone-400 text-2xl mb-16">
            Subscribe & save <span className="text-green-400 font-bold">20%</span>.
          </p>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center text-stone-600 text-sm">
        © {new Date().getFullYear()} Prakriti Greens — Living Nutrition
      </footer>
    </div>
  );
};

export default App;
