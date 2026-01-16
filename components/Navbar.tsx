
import React, { useState, useEffect } from 'react';
import { BUSINESS_NAME } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-emerald-glass shadow-2xl py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 blur-md opacity-0 group-hover:opacity-40 transition-opacity"></div>
              <img 
                src="/logo.png" 
                alt="Prakriti Greens Logo" 
                className="h-12 w-12 object-contain rounded-full border border-white/10 relative z-10"
              />
            </div>
            <span className="text-xl font-bold tracking-[0.2em] uppercase text-white">{BUSINESS_NAME}</span>
          </div>
          
          <div className="hidden md:flex space-x-12 text-[11px] font-bold uppercase tracking-[0.2em]">
            <a href="#hero" className="text-stone-400 hover:text-neon-green transition">Home</a>
            <a href="#products" className="text-stone-400 hover:text-neon-green transition">Harvests</a>
            <a href="#benefits" className="text-stone-400 hover:text-neon-green transition">The Science</a>
            <a href="#assistant" className="text-stone-400 hover:text-neon-green transition">AI Bot</a>
            <a href="#contact" className="px-6 py-2 border border-green-500/30 text-neon-green rounded-full hover:bg-green-500 hover:text-black transition">Join Tribe</a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#050805] border-t border-white/5 p-8 space-y-8 animate-in slide-in-from-top duration-300">
          <a href="#hero" className="block text-2xl font-bold" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#products" className="block text-2xl font-bold" onClick={() => setIsOpen(false)}>Harvests</a>
          <a href="#benefits" className="block text-2xl font-bold" onClick={() => setIsOpen(false)}>The Science</a>
          <a href="#assistant" className="block text-2xl font-bold" onClick={() => setIsOpen(false)}>AI Bot</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
