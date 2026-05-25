import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => setIsOpen(false);

  const links = [
    { href: '#hero', label: 'Home' },
    { href: '#products', label: 'Shop' },
    { href: '#benefits', label: 'Benefits' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#assistant', label: 'AI Guide' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0f0a]/95 backdrop-blur-xl border-b border-[#2d5016]/30 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-[#52c41a] blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                <img
                  src="/logo.png"
                  alt="Prakriti Greens"
                  className="h-11 w-11 object-contain rounded-full border-2 border-[#2d5016]/40 group-hover:border-[#52c41a]/60 transition-all duration-300 relative z-10 bg-[#0a0f0a]"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-serif font-light tracking-wide text-[#f5f5f4] group-hover:text-[#a0d911] transition-colors duration-300">
                  Prakriti
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#52c41a] font-semibold -mt-1">
                  Greens & Naturals
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              <div className="flex items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.2em]">
                {links.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-[#a8a29e] hover:text-[#52c41a] transition-colors duration-300 relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#52c41a] group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </div>

              <a
                href="#products"
                className="relative group px-6 py-2.5 border-2 border-[#52c41a]/60 text-[#52c41a] rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#52c41a] hover:text-[#0a0f0a] transition-all duration-300 overflow-hidden shadow-[0_0_20px_rgba(82,196,26,0.2)] hover:shadow-[0_0_30px_rgba(82,196,26,0.4)]"
              >
                <span className="relative z-10">Start Fresh</span>
                <div className="absolute inset-0 bg-[#52c41a] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-[#f5f5f4] hover:text-[#52c41a] transition-colors duration-300 p-2"
              aria-label="Toggle menu"
            >
              <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-[72px] left-0 right-0 bg-[#0a0f0a]/98 backdrop-blur-xl border-b border-[#2d5016]/30 z-40 md:hidden shadow-2xl">
            <div className="px-6 py-8 space-y-2 max-h-[calc(100vh-72px)] overflow-y-auto">
              {links.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between py-4 border-b border-[#2d5016]/20 text-[#f5f5f4] hover:text-[#52c41a] transition-colors duration-300 group"
                  onClick={handleLinkClick}
                >
                  <span className="text-xl font-light tracking-wide">{link.label}</span>
                  <i className="fa-solid fa-arrow-right text-[#52c41a] opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}

              <a
                href="#products"
                className="flex items-center justify-center gap-3 w-full bg-[#52c41a] hover:bg-[#a0d911] text-[#0a0f0a] py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 mt-6 shadow-[0_0_30px_rgba(82,196,26,0.3)]"
                onClick={handleLinkClick}
              >
                <i className="fa-solid fa-leaf text-sm" />
                Start Your Journey
              </a>

              <div className="pt-6 mt-4 border-t border-[#2d5016]/20">
                <div className="flex flex-col gap-4 text-center text-xs text-[#78716c]">
                  <div className="flex items-center justify-center gap-2">
                    <i className="fa-solid fa-shield-halved text-[#52c41a]" />
                    <span>FSSAI Certified Organic</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i key={i} className="fa-solid fa-star text-[#d4af37] text-xs" />
                    ))}
                    <span>4.9/5 from 2,500+ customers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;