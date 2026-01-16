import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();

  // Parallax motion for floating elements
  const leaf1Y = useTransform(scrollY, [0, 1000], [0, 600]);
  const leaf1Rotate = useTransform(scrollY, [0, 1000], [0, 240]);

  const leaf2Y = useTransform(scrollY, [0, 1000], [0, -400]);
  const leaf2Rotate = useTransform(scrollY, [0, 1000], [45, -135]);

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-[#050805]"
    >
      {/* Floating Parallax Microgreens */}
      <motion.img
        style={{ y: leaf1Y, rotate: leaf1Rotate }}
        src="/microgreen2.png"
        alt=""
        className="absolute top-24 left-[6%] md:left-[10%] w-24 h-24 md:w-44 md:h-44 opacity-30 z-20 pointer-events-none filter hue-rotate-30 saturate-150 brightness-110"
      />

      <motion.img
        style={{ y: leaf2Y, rotate: leaf2Rotate }}
        src="/microgreen.png"
        alt=""
        className="absolute bottom-24 right-[6%] md:right-[12%] w-32 h-32 md:w-56 md:h-56 opacity-25 z-20 pointer-events-none filter saturate-150"
      />

      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-[#050805] z-10" />

        {/* Cinematic Microgreens Background */}
        <motion.img
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.45 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          src="/hero_bg.png"
          alt="Fresh living microgreens growing naturally"
          className="w-full h-full object-cover"
        />

        {/* Organic Botanical Texture Overlay */}
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.07 }}
          transition={{ duration: 2, delay: 0.5 }}
          src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=2000"
          alt=""
          className="absolute inset-0 object-cover mix-blend-overlay pointer-events-none"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="inline-block px-6 py-2 rounded-full border border-green-500/30 text-neon-green text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-8 bg-green-500/10 shadow-[0_0_20px_rgba(74,222,128,0.15)]">
            Pure Living Superfoods
          </span>

          <h1 className="text-5xl md:text-8xl mb-8 leading-[1.05] font-bold drop-shadow-2xl">
            The Living Essence
            <br />
            <span className="text-neon-green italic font-medium">
              Growing
            </span>{' '}
            In Your Kitchen.
          </h1>

          <p className="text-lg md:text-2xl mb-12 text-stone-300 font-light max-w-2xl mx-auto leading-relaxed">
            Stop eating processed produce. Discover microgreens with{' '}
            <span className="text-white font-semibold">
              40× nutrient density
            </span>
            , delivered as living trays for peak enzymatic power.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="#products"
              className="group bg-green-500 hover:bg-green-400 text-black px-10 py-5 rounded-full font-bold transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(74,222,128,0.4)] flex items-center justify-center gap-3"
            >
              Shop The Collection
              <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#assistant"
              className="bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/20 text-white px-10 py-5 rounded-full font-bold transition-all transform hover:scale-105"
            >
              Consult AI Nutri-Bot
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-stone-500 text-[10px] tracking-[0.3em] font-bold flex flex-col items-center gap-4">
        DISCOVER PRAKRITI
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="w-px h-16 bg-gradient-to-b from-green-500 to-transparent"
        />
      </div>
    </section>
  );
};

export default Hero;
