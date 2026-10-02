import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { INSTAGRAM_REVIEWS } from '../constants';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: rating }).map((_, i) => (
      <i key={i} className="fa-solid fa-star text-amber-500 text-[10px] md:text-xs" />
    ))}
  </div>
);

const ReviewCard: React.FC<{
  name: string;
  handle: string;
  text: string;
  rating: number;
  delay?: number;
}> = ({ name, handle, text, rating, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -5, transition: { duration: 0.3 } }}
    className="relative rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-7 border border-slate-200 bg-white shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300 group min-w-[280px] md:min-w-0 snap-center flex flex-col justify-between"
  >
    <div>
      {/* Quote mark */}
      <div className="absolute top-4 md:top-5 right-5 md:right-6 text-4xl md:text-5xl font-serif text-slate-200 leading-none select-none">
        "
      </div>

      {/* Instagram icon + Verified badge */}
      <div className="flex items-center gap-3 mb-3 md:mb-4">
        <div
          className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm flex-shrink-0 shadow-2xs"
          style={{
            background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
          }}
        >
          <i className="fa-brands fa-instagram text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-slate-900 font-bold text-xs md:text-sm font-[Outfit] truncate">{name}</p>
            <i className="fa-solid fa-circle-check text-[#15803d] text-[10px] md:text-xs flex-shrink-0" />
          </div>
          <p className="text-slate-500 text-[10px] md:text-xs">{handle}</p>
        </div>
      </div>

      <StarRating rating={rating} />

      <p className="text-slate-600 text-xs md:text-sm leading-relaxed mt-3 md:mt-4 italic">
        "{text}"
      </p>
    </div>
  </motion.div>
);

const InstaFeed: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollState);
      updateScrollState();
    }
    return () => el?.removeEventListener('scroll', updateScrollState);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="reviews" className="py-20 md:py-32 overflow-hidden bg-[#faf9f5]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-6 px-4 md:px-5 py-2 rounded-full border border-slate-200 bg-white shadow-2xs">
            <span
              className="w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-[10px] md:text-xs"
              style={{
                background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
              }}
            >
              <i className="fa-brands fa-instagram text-white" />
            </span>
            <span className="text-slate-600 text-[10px] md:text-xs font-bold uppercase tracking-widest font-[Outfit]">Instagram Love</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-[#0b2b1e] leading-tight mb-3 md:mb-4">
            What Our <span className="text-[#15803d] italic font-normal">Community</span>
            <br className="hidden sm:block" /> Says.
          </h2>
          <p className="text-slate-600 text-sm md:text-lg max-w-xl mx-auto">
            Real feedback from our Instagram family unfiltered, unsponsored.
          </p>
        </motion.div>

        {/* Reviews — Horizontal scroll on mobile, grid on desktop */}
        {isMobile ? (
          <div className="relative">
            {/* Scroll arrows */}
            {canScrollLeft && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-800 flex items-center justify-center shadow-md"
                style={{ minHeight: '36px' }}
              >
                <i className="fa-solid fa-chevron-left text-xs" />
              </button>
            )}
            {canScrollRight && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-800 flex items-center justify-center shadow-md"
                style={{ minHeight: '36px' }}
              >
                <i className="fa-solid fa-chevron-right text-xs" />
              </button>
            )}

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto hide-scrollbar snap-x-mandatory pb-4 px-1"
            >
              {INSTAGRAM_REVIEWS.map((review, i) => (
                <ReviewCard
                  key={review.handle}
                  {...review}
                  delay={0}
                />
              ))}
            </div>

            {/* Scroll indicator dots */}
            <div className="flex justify-center gap-1.5 mt-4">
              {INSTAGRAM_REVIEWS.map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSTAGRAM_REVIEWS.map((review, i) => (
              <ReviewCard
                key={review.handle}
                {...review}
                delay={i * 0.08}
              />
            ))}
          </div>
        )}

        {/* CTA to Instagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10 md:mt-14"
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3.5 md:py-4 rounded-full font-bold text-xs md:text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 font-[Outfit]"
            style={{
              background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
              color: '#fff',
              boxShadow: '0 4px 15px rgba(220,39,67,0.25)',
            }}
          >
            <i className="fa-brands fa-instagram text-sm md:text-base" />
            Follow @prakritigreens
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstaFeed;
