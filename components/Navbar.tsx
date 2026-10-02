import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { WHATSAPP_NUMBER } from '../constants';

interface NavbarProps {
  showAnnouncement?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showAnnouncement = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleLinkClick = () => setIsOpen(false);

  const links = [
    { href: '#hero', label: 'Home' },
    { href: '#products', label: 'Shop' },
    { href: '#benefits', label: 'Benefits' },
    { href: '#feedback', label: 'Feedback' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#assistant', label: 'AI Guide' },
    { href: '#contact', label: 'Contact' },
  ];


  const getLinkTarget = (href: string) => {
    if (href === '#products') {
      return '/shop';
    }
    if (pathname === '/shop') {
      return `/${href}`;
    }
    return href;
  };

  const navTop = showAnnouncement ? 'top-[var(--announce-height)]' : 'top-0';

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${navTop} ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 py-2.5 md:py-3.5 shadow-sm'
            : 'bg-transparent py-4 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to={pathname === '/shop' ? '/#hero' : '#hero'} className="flex items-center gap-2.5 md:gap-3 group">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="Prakriti Greens"
                  className="h-9 w-9 md:h-11 md:w-11 object-contain rounded-full border border-slate-200 group-hover:border-[#15803d] transition-all duration-300 relative z-10 bg-white p-0.5 shadow-xs"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base md:text-xl font-serif font-bold tracking-tight text-[#0b2b1e] group-hover:text-[#15803d] transition-colors duration-300">
                  Prakriti
                </span>
                <span className="text-[8px] md:text-[9px] uppercase tracking-[0.25em] md:tracking-[0.3em] text-[#15803d] font-bold -mt-1 font-[Outfit]">
                  Greens & Naturals
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 lg:gap-10">
              <div className="flex items-center gap-6 lg:gap-8 text-[12px] font-semibold uppercase tracking-[0.15em]">
                {links.map(link => (
                  <Link
                    key={link.href}
                    to={getLinkTarget(link.href)}
                    className="text-slate-600 hover:text-[#15803d] transition-colors duration-300 animated-underline font-[Outfit]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <Link
                to="/shop"
                className="relative group px-5 lg:px-6 py-2.5 border-2 border-[#15803d] text-[#15803d] rounded-full text-[11px] font-bold uppercase tracking-[0.18em] hover:bg-[#15803d] hover:text-white transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md font-[Outfit]"
              >
                <span className="relative z-10">Start Fresh</span>
                <div className="absolute inset-0 bg-[#15803d] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-slate-800 hover:text-[#15803d] transition-colors duration-300 p-2 relative z-[60]"
              aria-label="Toggle menu"
              style={{ minHeight: '44px', minWidth: '44px' }}
            >
              <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-xl md:text-2xl`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu — Slide-in from right */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#faf9f5] border-l border-slate-200 z-50 md:hidden shadow-2xl"
            >
              <div className="px-6 py-8 space-y-1 h-full overflow-y-auto flex flex-col"
                style={{ paddingTop: showAnnouncement ? 'calc(var(--announce-height) + 2rem)' : '2rem' }}>
                {/* Close area / branding */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
                  <img src="/logo.png" alt="Prakriti Greens" className="w-10 h-10 rounded-full border border-slate-200 bg-white p-0.5" />
                  <div>
                    <p className="font-serif text-lg font-bold text-[#0b2b1e]">Prakriti</p>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#15803d] font-bold -mt-0.5 font-[Outfit]">Greens & Naturals</p>
                  </div>
                </div>

                {/* Nav Links */}
                {links.map(link => (
                  <Link
                    key={link.href}
                    to={getLinkTarget(link.href)}
                    className="flex items-center justify-between py-3.5 border-b border-slate-200/60 text-slate-800 hover:text-[#15803d] transition-colors duration-300 group"
                    onClick={handleLinkClick}
                    style={{ minHeight: '48px' }}
                  >
                    <span className="text-base font-medium tracking-wide">{link.label}</span>
                    <i className="fa-solid fa-arrow-right text-[#15803d] text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                  </Link>
                ))}

                {/* Fresh Cut Veggie & Microgreen Promo Card */}
                <div className="my-4 p-3 rounded-xl flex items-center gap-3 bg-emerald-50 border border-emerald-200">
                  <img src="/cut_veggies_pack.jpg" alt="Packed Veggies" className="w-10 h-10 object-contain rounded-lg" />
                  <div className="flex-1">
                    <p className="text-[#15803d] text-[10px] font-bold uppercase tracking-wider font-[Outfit]">🍱 Sealed Containers</p>
                    <p className="text-slate-900 text-xs font-semibold">Cut Veggies & Microgreens</p>
                  </div>
                  <span className="text-[#15803d] text-xs font-bold font-[Outfit]">Daily Fresh</span>
                </div>


                {/* CTA Button */}
                <Link
                  to="/shop"
                  className="flex items-center justify-center gap-3 w-full bg-[#15803d] hover:bg-[#166534] text-white py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 mt-4 shadow-md font-[Outfit]"
                  onClick={handleLinkClick}
                  style={{ minHeight: '48px' }}
                >
                  <i className="fa-solid fa-leaf text-sm" />
                  Start Your Journey
                </Link>

                {/* Bottom info */}
                <div className="mt-auto pt-6 border-t border-slate-200">
                  <div className="flex flex-col gap-3 text-center text-xs text-slate-500">
                    <div className="flex items-center justify-center gap-2">
                      <i className="fa-solid fa-shield-halved text-[#15803d]" />
                      <span>FSSAI Certified Organic</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i key={i} className="fa-solid fa-star text-amber-500 text-xs" />
                      ))}
                      <span>4.9/5 from 2,500+ customers</span>
                    </div>

                    {/* WhatsApp Quick Order */}
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Prakriti Greens! I would like to order fresh microgreens and packed cut vegetables.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 rounded-full font-bold text-sm transition-all duration-300 mt-2 shadow-sm font-[Outfit]"
                      style={{ background: '#25D366', color: '#fff' }}
                      onClick={handleLinkClick}
                    >
                      <i className="fa-brands fa-whatsapp text-lg" />
                      <span>Order on WhatsApp (9096522819)</span>
                    </a>

                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;