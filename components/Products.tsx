import React, { useState, useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue, AnimatePresence } from 'framer-motion';
import { PRODUCTS, WHATSAPP_NUMBER } from '../constants';
import { Product } from '../types';

type Category = 'all' | 'microgreens' | 'cut-vegetables' | 'ready-to-cook' | 'fruits';

interface CartItem {
  product: Product;
  quantity: number;
}

const ProductCard: React.FC<{
  product: Product;
  index: number;
  onAddToCart: (p: Product) => void;
  isInCart: boolean;
}> = ({ product, index, onAddToCart, isInCart }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 20 });

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

  const isAvailable = product.inStock !== false;
  const isMicrogreen = product.category === 'microgreens';
  const isCutVeg = product.category === 'cut-vegetables';
  const isReadyToCook = product.category === 'ready-to-cook';
  const isFruit = product.category === 'fruits';

  // Aesthetic color coding based on category
  const badgeColor = isReadyToCook
    ? '#d97706'
    : isCutVeg
    ? '#059669'
    : isFruit
    ? product.id === 'fr2'
      ? '#7e22ce'
      : '#d97706'
    : '#15803d';

  const categoryBg = isReadyToCook
    ? 'bg-amber-50/70 border-amber-200 text-amber-800'
    : isCutVeg
    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-800'
    : isFruit
    ? 'bg-purple-50/80 border-purple-200 text-purple-800'
    : 'bg-emerald-50/70 border-emerald-200 text-emerald-900';

  const waMessage = encodeURIComponent(
    `Hi Prakriti Greens! I want to order:\n- ${product.name} (${product.weight || product.containerType || '1 Pack'}) @ ₹${product.price}\nPlease confirm dispatch details!`
  );

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={isAvailable ? handleMouseMove : undefined}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isAvailable ? rotateX : 0,
        rotateY: isAvailable ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className={`relative group ${isAvailable ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <div className="relative rounded-[1.75rem] overflow-hidden border border-slate-200 bg-white transition-all duration-300 shadow-xs hover:shadow-xl hover:border-emerald-300/80 flex flex-col justify-between h-full">
        
        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
          {product.badge ? (
            <span
              className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider font-[Outfit] text-white shadow-xs"
              style={{ background: isAvailable ? badgeColor : '#94a3b8' }}
            >
              {isAvailable ? product.badge : 'Restocking Soon'}
            </span>
          ) : <span />}

          {/* Container Type indicator */}
          {product.containerType && (
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider font-[Outfit] bg-white/95 backdrop-blur-md text-slate-700 border border-slate-200/80 shadow-2xs">
              {isMicrogreen ? '🌱 Live Tray' : isCutVeg ? '🍱 Airtight Tub' : isReadyToCook ? '🍳 Meal Kit' : '📦 Eco Box'}
            </span>
          )}
        </div>

        {/* Image Display */}
        <div className="relative overflow-hidden flex items-center justify-center bg-slate-50/70 p-4 pt-12" style={{ height: '220px' }}>
          <motion.img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-contain transition-all duration-500 ${!isAvailable ? 'opacity-40 grayscale' : ''}`}
            whileHover={isAvailable ? { scale: 1.05 } : {}}
            transition={{ duration: 0.4 }}
            style={{
              filter: isAvailable ? 'drop-shadow(0 10px 18px rgba(0,0,0,0.07))' : 'none',
            }}
          />
        </div>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Category / Weight Row */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border font-[Outfit] ${categoryBg}`}>
                {product.emoji} {product.weight || 'Fresh Pack'}
              </span>
              {product.prepTime && (
                <span className="text-[10px] text-slate-500 font-medium font-[Outfit] truncate">
                  ⏱️ {product.prepTime.split('•')[0]}
                </span>
              )}
            </div>

            {/* Product Name */}
            <h3 className={`text-lg font-bold leading-tight font-[Outfit] mb-2 ${isAvailable ? 'text-slate-900 group-hover:text-[#15803d]' : 'text-slate-400'}`}>
              {product.name}
            </h3>

            {/* Description */}
            <p className={`text-xs leading-relaxed mb-4 line-clamp-2 ${isAvailable ? 'text-slate-600' : 'text-slate-400'}`}>
              {product.description}
            </p>

            {/* Container Specs Box */}
            {product.containerType && (
              <div className="mb-4 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-[11px] text-slate-600 flex items-start gap-2">
                <i className="fa-solid fa-box text-[#15803d] text-xs mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800 text-[11px] font-[Outfit]">Packaged Container:</p>
                  <p className="text-[10px] text-slate-500">{product.containerType}</p>
                </div>
              </div>
            )}

            {/* Benefits Chips */}
            <div className="flex flex-wrap gap-1 mb-5">
              {product.benefits.slice(0, 3).map(b => (
                <span
                  key={b}
                  className="px-2 py-0.5 rounded-md text-[9px] font-semibold bg-emerald-50/70 text-emerald-800 border border-emerald-200/60 font-[Outfit]"
                >
                  ✓ {b}
                </span>
              ))}
            </div>
          </div>

          {/* Pricing & Order Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <div>
              <span className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                ₹{product.price}
              </span>
              <span className="text-[10px] text-slate-400 block -mt-1 font-[Outfit]">all taxes incl.</span>
            </div>

            <div className="flex items-center gap-1.5">
              {isAvailable ? (
                <>
                  {/* Add to Custom Box */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className={`px-3 py-2 rounded-full text-xs font-bold transition-all duration-200 font-[Outfit] border flex items-center gap-1.5 ${
                      isInCart
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                    title={isInCart ? 'In Your Box' : 'Add to Box'}
                  >
                    <i className={`fa-solid ${isInCart ? 'fa-check text-emerald-700' : 'fa-plus'}`} />
                    <span className="hidden sm:inline">{isInCart ? 'Added' : 'Box'}</span>
                  </button>

                  {/* 1-Tap WhatsApp Order */}
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 font-[Outfit] shadow-xs hover:shadow-md flex items-center gap-1.5"
                    style={{ background: '#15803d' }}
                  >
                    <i className="fa-brands fa-whatsapp text-sm" />
                    <span>Order</span>
                  </a>

                </>
              ) : (
                <button
                  disabled
                  className="px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider font-[Outfit] bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                >
                  Restocking Soon
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Products & Marketplace Component ──────────────────────────────────
const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isBoxDrawerOpen, setIsBoxDrawerOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(item => item.product.id === product.id);
      if (exists) {
        return prev.filter(item => item.product.id !== product.id);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const filtered = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  const microCount = PRODUCTS.filter(p => p.category === 'microgreens').length;
  const cutVegCount = PRODUCTS.filter(p => p.category === 'cut-vegetables').length;
  const readyToCookCount = PRODUCTS.filter(p => p.category === 'ready-to-cook').length;
  const fruitCount = PRODUCTS.filter(p => p.category === 'fruits').length;

  const tabs: { id: Category; label: string; icon: string; count: number }[] = [
    { id: 'all', label: 'All Offerings', icon: 'fa-solid fa-layer-group', count: PRODUCTS.length },
    { id: 'cut-vegetables', label: '🍱 Cut Veggie Containers', icon: 'fa-solid fa-box-archive', count: cutVegCount },
    { id: 'ready-to-cook', label: '🍳 Ready-to-Cook Kits', icon: 'fa-solid fa-utensils', count: readyToCookCount },
    { id: 'microgreens', label: '🌱 Living Microgreens', icon: 'fa-solid fa-seedling', count: microCount },
    { id: 'fruits', label: '🫐 Seasonal Harvest', icon: 'fa-solid fa-apple-whole', count: fruitCount },
  ];

  const totalCartPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const generateCartWhatsAppUrl = () => {
    const lines = [
      '🌱 *New Order from Prakriti Greens Marketplace*',
      '----------------------------------------',
      ...cart.map(
        item =>
          `• ${item.quantity}x ${item.product.name} (${item.product.weight || item.product.containerType || 'Pack'}) = ₹${item.product.price * item.quantity}`
      ),
      '----------------------------------------',
      `*Total Amount:* ₹${totalCartPrice}`,
      '----------------------------------------',
      'Please confirm delivery slot and payment details!',
    ];
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  };


  return (
    <div className="bg-[#faf9f5]">
      {/* ─── Marketplace Header ─── */}
      <div className="relative py-14 md:py-20 border-b border-slate-200 bg-[#faf9f5]">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#15803d] text-xs font-bold uppercase tracking-[0.25em] mb-3 block font-[Outfit]">
              Farm-To-Table Packaging Studio
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#0b2b1e] mb-4">
              Fresh Microgreens & <span className="text-[#15803d] italic font-normal">Cut Veggie Containers.</span>
            </h1>
            <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-normal">
              Explore living microgreen trays, ozone-purified cut vegetable containers, and chef-portioned ready-to-cook boxes. Sealed airtight to preserve crunch, nutrition, and ease.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── 4 Pillars of Fresh Packaging Bar ─── */}
      <div className="border-b border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: 'fa-solid fa-box-check',
                title: 'Airtight Containers',
                desc: 'Food-grade sealed tubs preserve freshness for 5+ days',
              },
              {
                icon: 'fa-solid fa-wand-magic-sparkles',
                title: 'Ozone Pre-Washed',
                desc: 'Zero pesticide residue, clean & kitchen-ready',
              },
              {
                icon: 'fa-solid fa-seedling',
                title: '40× Microgreens',
                desc: 'Living root trays & fresh garnishes for max potency',
              },
              {
                icon: 'fa-solid fa-clock',
                title: '10-Min Meal Kits',
                desc: 'Pre-portioned veggies & sauce: open, pan & savor',
              },
            ].map((p, idx) => (
              <div key={idx} className="flex items-start gap-3 p-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#15803d] flex items-center justify-center text-sm shrink-0 border border-emerald-100">
                  <i className={p.icon} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 font-[Outfit]">{p.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-snug">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Main Catalog Section ─── */}
      <section id="products" className="py-12 md:py-20 bg-[#f4f3ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex gap-2.5 mb-10 overflow-x-auto hide-scrollbar pb-2 snap-x-mandatory"
          >
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap snap-center font-[Outfit] ${
                  activeCategory === tab.id
                    ? 'bg-[#15803d] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
                style={{ minHeight: '42px' }}
              >
                <i className={tab.icon} />
                <span>{tab.label}</span>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded-full font-bold ml-1 ${
                    activeCategory === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onAddToCart={handleAddToCart}
                isInCart={cart.some(item => item.product.id === product.id)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ─── Floating Box / Cart Bar when items are selected ─── */}
      <AnimatePresence>
        {totalCartCount > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-6 left-4 right-4 max-w-2xl mx-auto z-40"
          >
            <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-emerald-500/40 flex items-center justify-between gap-4 backdrop-blur-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#15803d] text-white flex items-center justify-center font-bold text-sm">
                  {totalCartCount}
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-[Outfit]">
                    Custom Fresh Box
                  </p>
                  <p className="text-sm font-semibold">
                    {totalCartCount} container{totalCartCount > 1 ? 's' : ''} • ₹{totalCartPrice}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsBoxDrawerOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold font-[Outfit] text-white transition-colors"
                >
                  View Details
                </button>

                <a
                  href={generateCartWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5c] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all font-[Outfit] shadow-md"
                >
                  <i className="fa-brands fa-whatsapp text-sm" />
                  <span>Order Box</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Box Details Modal / Drawer ─── */}
      <AnimatePresence>
        {isBoxDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBoxDrawerOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 z-10 max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 text-[#15803d] flex items-center justify-center text-sm font-bold">
                    🍱
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base font-[Outfit]">Your Fresh Delivery Box</h3>
                    <p className="text-xs text-slate-500">Airtight containers & living trays</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsBoxDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center"
                >
                  <i className="fa-solid fa-xmark text-sm" />
                </button>
              </div>

              {/* Items List */}
              <div className="py-4 overflow-y-auto space-y-3 flex-1">
                {cart.map(item => (
                  <div key={item.product.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/60 gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-contain rounded-lg bg-white p-1 border border-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate font-[Outfit]">{item.product.name}</p>
                      <p className="text-[11px] text-slate-500">{item.product.weight || item.product.containerType}</p>
                      <p className="text-xs font-bold text-[#15803d]">₹{item.product.price * item.quantity}</p>
                    </div>

                    <div className="flex items-center gap-2 bg-white rounded-full border border-slate-200 px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="w-6 h-6 rounded-full text-slate-600 hover:bg-slate-100 flex items-center justify-center text-xs"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-slate-800 min-w-3 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="w-6 h-6 rounded-full text-slate-600 hover:bg-slate-100 flex items-center justify-center text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Drawer Footer */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-slate-600 font-[Outfit]">Total Bill:</span>
                  <span className="text-2xl font-bold font-serif text-slate-900">₹{totalCartPrice}</span>
                </div>

                <a
                  href={generateCartWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#20ba5c] shadow-md font-[Outfit] transition-all"
                >
                  <i className="fa-brands fa-whatsapp text-base" />
                  <span>Send Complete Box Order on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
