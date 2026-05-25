import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const { scrollY } = useScroll();

  // Parallax for floating elements
  const leaf1Y = useTransform(scrollY, [0, 1000], [0, 350]);
  const leaf1Rotate = useTransform(scrollY, [0, 1000], [0, 180]);
  const leaf2Y = useTransform(scrollY, [0, 1000], [0, -280]);
  const leaf2Rotate = useTransform(scrollY, [0, 1000], [45, -90]);

  // 3D floating fruits on scroll
  const mangoY = useTransform(scrollY, [0, 800], [0, 200]);
  const mangoRotate = useTransform(scrollY, [0, 800], [0, 25]);
  const jambhulY = useTransform(scrollY, [0, 800], [0, -150]);
  const jambhulRotate = useTransform(scrollY, [0, 800], [0, -20]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#040608' }}
    >
      {/* ── Floating Microgreens ── */}
      <motion.img
        style={{ y: leaf1Y, rotate: leaf1Rotate }}
        src="/microgreen2.png"
        alt=""
        className="absolute top-20 left-[6%] w-24 h-24 md:w-40 md:h-40 opacity-[0.07] z-20 pointer-events-none"
      />
      <motion.img
        style={{ y: leaf2Y, rotate: leaf2Rotate }}
        src="/microgreen.png"
        alt=""
        className="absolute bottom-32 right-[5%] w-20 h-20 md:w-36 md:h-36 opacity-[0.06] z-20 pointer-events-none"
      />

      {/* ── 3D Floating Mango (scroll-driven) ── */}
      <motion.div
        style={{ y: mangoY, rotate: mangoRotate }}
        className="absolute bottom-[15%] left-[3%] md:left-[8%] z-10 pointer-events-none"
      >
        <motion.img
          src="/mango_3d.png"
          alt="Mango"
          className="w-28 h-28 md:w-48 md:h-48 object-contain"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 20px 40px rgba(251,191,36,0.45))' }}
        />
      </motion.div>

      {/* ── 3D Floating Jambhul (scroll-driven) ── */}
      <motion.div
        style={{ y: jambhulY, rotate: jambhulRotate }}
        className="absolute top-[20%] right-[3%] md:right-[8%] z-10 pointer-events-none"
      >
        <motion.img
          src="/jambhul_3d.png"
          alt="Jambhul"
          className="w-24 h-24 md:w-40 md:h-40 object-contain"
          animate={{ y: [0, 18, 0], rotate: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 }}
          style={{ filter: 'drop-shadow(0 20px 40px rgba(139,92,246,0.45))' }}
        />
      </motion.div>

      {/* ── Background Layers ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-[#040608]/70 to-[#050805] z-10" />
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1] }}
          src="/hero_bg.png"
          alt="Fresh vibrant microgreens"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(4,6,8,0.5)_70%,rgba(4,6,8,0.95)_100%)] z-[8]" />
      </div>

      {/* ── Hero Content ── */}
      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#52c41a]/30 mb-8"
            style={{ background: 'rgba(45,80,22,0.15)', backdropFilter: 'blur(8px)' }}
          >
            <div className="w-2 h-2 rounded-full bg-[#a0d911] animate-pulse" />
            <span className="text-[#a0d911] text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.3em]">
              Certified Organic · Farm Fresh Daily
            </span>
          </motion.div>

          {/* Category Pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex justify-center gap-3 mb-8 flex-wrap"
          >
            {[
              { label: '🌱 Microgreens', color: '#52c41a' },
              { label: '🥭 Alphonso Mango', color: '#fbbf24' },
              { label: '🫐 Indian Blackberry', color: '#8b5cf6' },
            ].map(({ label, color }) => (
              <span
                key={label}
                className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
                style={{
                  background: color + '15',
                  color,
                  border: `1px solid ${color}40`,
                }}
              >
                {label}
              </span>
            ))}
          </motion.div>

          {/* Main Headline */}
          <h1 className="mb-6 leading-[1.05] tracking-tight">
            <span className="block text-[2.8rem] md:text-[6.5rem] lg:text-[8rem] text-[#f5f5f4] font-serif font-light">
              Nature's Most
            </span>
            <span className="block text-[2.8rem] md:text-[6.5rem] lg:text-[8rem] mt-1 md:mt-2">
              <span className="text-[#52c41a] font-serif italic font-normal">Powerful</span>
              <span className="text-[#f5f5f4] font-serif font-light"> Food</span>
            </span>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-base md:text-xl mb-4 text-[#a8a29e] font-light max-w-3xl mx-auto leading-relaxed"
          >
            Microgreens · Alphonso Mangoes · Indian Blackberry — all grown and sourced with{' '}
            <span className="text-[#a0d911] font-medium">zero compromise</span>.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.05 }}
            className="text-sm text-[#78716c] font-light mb-12 max-w-2xl mx-auto"
          >
            Harvested at peak potency. No pesticides. Delivered to your door.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#products"
              className="group relative bg-[#52c41a] hover:bg-[#a0d911] text-[#0a0f0a] px-12 py-5 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-[0_0_50px_rgba(82,196,26,0.4)] flex items-center gap-3 min-w-[230px] justify-center overflow-hidden"
            >
              <span className="relative z-10">Shop Fresh</span>
              <i className="fa-solid fa-arrow-right relative z-10 text-xs group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#a0d911] to-[#52c41a] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            <a
              href="#assistant"
              className="relative bg-transparent border-2 border-[#2d5016] hover:border-[#52c41a] text-[#f5f5f4] px-12 py-5 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-3 min-w-[230px] justify-center"
              style={{ backdropFilter: 'blur(8px)' }}
            >
              <i className="fa-solid fa-leaf text-[#52c41a] text-sm" />
              AI Nutrition Guide
            </a>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-12 text-xs text-[#78716c]"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['from-[#52c41a] to-[#2d5016]', 'from-[#fbbf24] to-[#d97706]', 'from-[#8b5cf6] to-[#6d28d9]'].map((g, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${g} border-2 border-[#040608]`} />
                ))}
              </div>
              <span className="font-medium text-[#a8a29e]">2,500+ Happy Customers</span>
            </div>

            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <i key={i} className="fa-solid fa-star text-[#d4af37]" />
              ))}
              <span className="ml-1 font-medium text-[#a8a29e]">4.9 / 5</span>
            </div>

            <div className="flex items-center gap-2">
              <i className="fa-solid fa-shield-halved text-[#52c41a]" />
              <span className="font-medium text-[#a8a29e]">FSSAI Certified</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[#52c41a]/50 text-[9px] tracking-[0.4em] font-semibold uppercase">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-[1px] h-16 bg-gradient-to-b from-[#52c41a]/60 via-[#52c41a]/20 to-transparent"
        />
      </motion.div>

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, #52c41a, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #fbbf24, transparent)' }} />
      <div className="absolute top-1/4 right-1/3 w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
    </section>
  );
};

export default Hero;