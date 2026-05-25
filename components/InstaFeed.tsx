import React from 'react';
import { motion } from 'framer-motion';
import { INSTAGRAM_REVIEWS } from '../constants';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: rating }).map((_, i) => (
      <i key={i} className="fa-solid fa-star text-[#d4af37] text-xs" />
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
    whileHover={{ y: -6, transition: { duration: 0.3 } }}
    className="relative rounded-[2rem] p-7 border border-white/5 hover:border-[#52c41a]/25 transition-all duration-500 group"
    style={{ background: 'linear-gradient(145deg, #0d130d, #090d09)' }}
  >
    {/* Quote mark */}
    <div className="absolute top-5 right-6 text-5xl font-serif text-[#52c41a]/10 leading-none select-none">
      "
    </div>

    {/* Instagram icon */}
    <div className="flex items-center gap-3 mb-4">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm"
        style={{
          background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
        }}
      >
        <i className="fa-brands fa-instagram text-white" />
      </div>
      <div>
        <p className="text-white font-semibold text-sm">{name}</p>
        <p className="text-stone-500 text-xs">{handle}</p>
      </div>
    </div>

    <StarRating rating={rating} />

    <p className="text-stone-300 text-sm leading-relaxed mt-3 italic">
      "{text}"
    </p>

    {/* Glow on hover */}
    <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{ boxShadow: '0 0 40px rgba(82,196,26,0.07) inset' }} />
  </motion.div>
);

const InstaFeed: React.FC = () => {
  return (
    <section id="reviews" className="py-32 overflow-hidden" style={{ background: '#050805' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6 px-5 py-2 rounded-full border border-white/10"
            style={{ background: 'rgba(255,255,255,0.03)' }}>
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
              style={{
                background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
              }}
            >
              <i className="fa-brands fa-instagram text-white" />
            </span>
            <span className="text-stone-400 text-xs font-semibold uppercase tracking-widest">Instagram Love</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-serif font-light text-white leading-tight mb-4">
            What Our <span className="text-[#52c41a] italic">Community</span>
            <br />Says.
          </h2>
          <p className="text-stone-400 text-lg max-w-xl mx-auto">
            Real feedback from our Instagram family — unfiltered, unsponsored.
          </p>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSTAGRAM_REVIEWS.map((review, i) => (
            <ReviewCard
              key={review.handle}
              {...review}
              delay={i * 0.08}
            />
          ))}
        </div>

        {/* CTA to Instagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-14"
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
              color: '#fff',
              boxShadow: '0 0 40px rgba(220,39,67,0.3)',
            }}
          >
            <i className="fa-brands fa-instagram text-base" />
            Follow @prakritigreens
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstaFeed;
