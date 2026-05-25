import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

type Category = 'all' | 'microgreens' | 'fruits';

const ProductCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(nx);
    y.set(ny);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isFruit = product.category === 'fruits';

  const glowColor = isFruit
    ? product.id === 'fr1'
      ? 'rgba(251,191,36,0.4)'
      : 'rgba(139,92,246,0.4)'
    : 'rgba(82,196,26,0.3)';

  const borderColor = isFruit
    ? product.id === 'fr1'
      ? 'rgba(251,191,36,0.3)'
      : 'rgba(139,92,246,0.3)'
    : 'rgba(82,196,26,0.2)';

  const accentColor = isFruit
    ? product.id === 'fr1'
      ? '#fbbf24'
      : '#8b5cf6'
    : '#52c41a';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className="relative group cursor-pointer"
    >
      {/* Glow */}
      <motion.div
        className="absolute -inset-1 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
        style={{ background: glowColor }}
      />

      <div
        className="relative rounded-[2rem] overflow-hidden border transition-all duration-500"
        style={{
          background: 'linear-gradient(145deg,#0d120d,#080b08)',
          borderColor,
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Badge */}
        {product.badge && (
          <div
            className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
            style={{ background: accentColor, color: '#0a0f0a' }}
          >
            {product.badge}
          </div>
        )}

        {/* Image */}
        <div
          className="relative overflow-hidden"
          style={{ height: isFruit ? '320px' : '240px', background: isFruit ? '#050208' : '#060e06' }}
        >
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
            whileHover={{ scale: 1.08, rotateY: 8 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              filter: isFruit
                ? 'drop-shadow(0 20px 40px ' + glowColor + ')'
                : 'brightness(1.1) contrast(1.05) saturate(1.1)',
              transformStyle: 'preserve-3d',
            }}
          />

          {/* Shine overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(ellipse at 30% 30%, ${glowColor.replace('0.4', '0.08')}, transparent 60%)`,
            }}
          />

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080b08]/80 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-white leading-tight">
              {product.emoji && <span className="mr-1">{product.emoji}</span>}
              {product.name}
            </h3>
          </div>

          <p className="text-stone-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Benefits pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {product.benefits.map((b) => (
              <span
                key={b}
                className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide"
                style={{
                  background: accentColor + '15',
                  color: accentColor,
                  border: `1px solid ${accentColor}30`,
                }}
              >
                {b}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold" style={{ color: accentColor }}>
              ₹{product.price}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300"
              style={{
                background: accentColor,
                color: '#0a0f0a',
                boxShadow: `0 0 20px ${glowColor}`,
              }}
            >
              Order Now
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── 3D Floating Fruit Hero for Scroll Section ───────────────────────────────
const FruitScrollScene: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const mangoY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const mangoRotate = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const mangoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.1, 0.8]);

  const jambhulY = useTransform(scrollYProgress, [0, 1], [-80, 100]);
  const jambhulRotate = useTransform(scrollYProgress, [0, 1], [15, -25]);
  const jambhulScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.05, 0.75]);

  return (
    <div ref={ref} className="relative h-[500px] flex items-center justify-center overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[120px] opacity-30"
        style={{ background: 'radial-gradient(circle, #fbbf24, transparent)' }} />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[120px] opacity-25"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />

      {/* Mango */}
      <motion.div
        className="absolute left-[10%] md:left-[18%]"
        style={{ y: mangoY, rotate: mangoRotate, scale: mangoScale }}
      >
        <motion.img
          src="/mango_3d.png"
          alt="Alphonso Mango"
          className="w-48 h-48 md:w-64 md:h-64 object-contain"
          style={{ filter: 'drop-shadow(0 30px 60px rgba(251,191,36,0.5))' }}
          animate={{ y: [0, -18, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        />
        <p className="text-center text-amber-400 font-bold text-sm mt-2 tracking-widest uppercase">Alphonso Mango</p>
      </motion.div>

      {/* Jambhul */}
      <motion.div
        className="absolute right-[10%] md:right-[18%]"
        style={{ y: jambhulY, rotate: jambhulRotate, scale: jambhulScale }}
      >
        <motion.img
          src="/jambhul_3d.png"
          alt="Indian Blackberry"
          className="w-44 h-44 md:w-60 md:h-60 object-contain"
          style={{ filter: 'drop-shadow(0 30px 60px rgba(139,92,246,0.5))' }}
          animate={{ y: [0, 18, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
        />
        <p className="text-center text-violet-400 font-bold text-sm mt-2 tracking-widest uppercase">Indian Blackberry</p>
      </motion.div>

      {/* Center text */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-serif font-light leading-none mb-2"
        >
          <span className="text-amber-400">Rare </span>
          <span className="text-white">&</span>
          <br />
          <span className="text-violet-400"> Wild</span>
        </motion.div>
        <p className="text-stone-400 text-sm uppercase tracking-widest mt-4">Farm-fresh fruits · Seasonal harvests</p>
      </div>
    </div>
  );
};

// ─── Main Products Section ───────────────────────────────────────────────────
const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filtered = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  const tabs: { id: Category; label: string; icon: string }[] = [
    { id: 'all', label: 'All Products', icon: 'fa-solid fa-layer-group' },
    { id: 'microgreens', label: 'Microgreens', icon: 'fa-solid fa-seedling' },
    { id: 'fruits', label: 'Seasonal Fruits', icon: 'fa-solid fa-apple-whole' },
  ];

  return (
    <section id="products" className="py-32" style={{ background: '#070b07' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-[#52c41a] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Our Collections</span>
          <h2 className="text-5xl md:text-7xl font-serif font-light text-white mb-4 leading-tight">
            Nature's <span className="text-[#52c41a] italic">Best.</span>
          </h2>
          <p className="text-stone-400 text-lg max-w-xl">
            From our microgreen farms to seasonal orchards — hand-picked, nutrient-dense, zero compromise.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-14"
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === tab.id
                  ? 'bg-[#52c41a] text-[#0a0f0a] shadow-[0_0_30px_rgba(82,196,26,0.4)]'
                  : 'bg-white/5 text-stone-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              <i className={tab.icon} />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Fruits intro scroll scene */}
        {(activeCategory === 'fruits' || activeCategory === 'all') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-16 rounded-[2.5rem] overflow-hidden border border-white/5"
            style={{ background: 'linear-gradient(135deg, #060208, #08040e, #060208)' }}
          >
            <FruitScrollScene />
          </motion.div>
        )}

        {/* Product Grid */}
        <div
          className={`grid gap-8 ${
            filtered.length <= 2
              ? 'md:grid-cols-2 max-w-3xl mx-auto'
              : filtered.length === 3
              ? 'md:grid-cols-3'
              : 'md:grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
