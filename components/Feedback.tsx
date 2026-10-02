import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WHATSAPP_NUMBER, DISPLAY_PHONE } from '../constants';

const FEEDBACK_TOPICS = [
  { id: 'microgreens', label: '🌱 Microgreen Freshness', emoji: '🌱' },
  { id: 'cut-veggies', label: '🍱 Cut Veggies & Packaging', emoji: '🍱' },
  { id: 'ready-to-cook', label: '🍳 Ready-to-Cook Kits', emoji: '🍳' },
  { id: 'delivery', label: '🚚 Delivery & Dispatch Speed', emoji: '🚚' },
  { id: 'suggestion', label: '💡 New Veggie / Recipe Request', emoji: '💡' },
  { id: 'general', label: '⭐ Overall Farm Experience', emoji: '⭐' },
];

const Feedback: React.FC = () => {
  const [rating, setRating] = useState<number>(5);
  const [selectedTopic, setSelectedTopic] = useState<string>('🍱 Cut Veggies & Packaging');
  const [comment, setComment] = useState<string>('');

  const buildWhatsAppFeedbackUrl = () => {
    const stars = '⭐'.repeat(rating);
    const feedbackLines = [
      '👋 *Hi Prakriti Greens! I would like to share my feedback:*',
      '----------------------------------------',
      `⭐ *Rating:* ${rating}/5 (${stars})`,
      `🏷️ *Topic:* ${selectedTopic}`,
    ];

    if (comment.trim()) {
      feedbackLines.push(`💬 *My Thoughts / Suggestion:* ${comment.trim()}`);
    } else {
      feedbackLines.push('💬 *Comments:* Overall very satisfied with the freshness and packaging quality!');
    }

    feedbackLines.push('----------------------------------------');
    feedbackLines.push('Sent from Prakriti Greens Webapp');

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(feedbackLines.join('\n'))}`;
  };

  return (
    <section id="feedback" className="py-20 md:py-28 bg-[#faf9f5] border-t border-slate-200 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-[#15803d] text-xs font-bold uppercase tracking-wider mb-4 font-[Outfit]">
            <i className="fa-brands fa-whatsapp text-sm text-[#25D366]" />
            <span>Direct WhatsApp Feedback</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0b2b1e] mb-4">
            Help Us Grow. <span className="text-[#15803d] italic font-normal">Share Your Voice.</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-normal">
            Whether it's about the crispness of our microgreen trays, the seal on our cut veggie tubs, or a new recipe kit you want chat directly with our team on WhatsApp at <strong className="text-slate-800">{DISPLAY_PHONE}</strong>.
          </p>
        </motion.div>

        {/* Feedback Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl"
        >
          {/* Step 1: Star Rating */}
          <div className="mb-8 text-center sm:text-left pb-6 border-b border-slate-100">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3 font-[Outfit]">
              1. How was your experience with Prakriti Greens?
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-125 focus:outline-none p-1"
                  aria-label={`${star} star rating`}
                >
                  <i
                    className={`fa-solid fa-star text-2xl sm:text-3xl transition-colors duration-200 ${star <= rating ? 'text-amber-400 drop-shadow-xs' : 'text-slate-200'
                      }`}
                  />
                </button>
              ))}
              <span className="text-sm font-bold text-slate-700 ml-2 font-[Outfit]">
                {rating === 5 && '🌟 Exceptional!'}
                {rating === 4 && '😊 Great Freshness'}
                {rating === 3 && '👍 Good'}
                {rating === 2 && '🤔 Needs Improvement'}
                {rating === 1 && '⚠️ Urgent Attention'}
              </span>
            </div>
          </div>

          {/* Step 2: Feedback Topic Chips */}
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3 font-[Outfit]">
              2. What would you like to give feedback on?
            </p>
            <div className="flex flex-wrap gap-2.5">
              {FEEDBACK_TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedTopic(topic.label)}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold font-[Outfit] transition-all duration-200 border flex items-center gap-1.5 ${selectedTopic === topic.label
                      ? 'bg-emerald-100 text-[#15803d] border-emerald-300 shadow-2xs font-bold'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                >
                  <span>{topic.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Optional Comment */}
          <div className="mb-8">
            <label htmlFor="feedback-comment" className="block text-xs uppercase tracking-widest text-slate-500 font-bold mb-2 font-[Outfit]">
              3. Share your notes, suggestion or custom request (Optional):
            </label>
            <textarea
              id="feedback-comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="e.g. Loved the sealed stir-fry container! Would love to see diced button mushrooms or a Thai basil kit next."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[#15803d] focus:bg-white transition-all outline-none resize-none"
            />
          </div>

          {/* Action Row & Live Preview */}
          <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-100 mb-6">
            <p className="text-[11px] font-bold text-[#15803d] uppercase tracking-wider font-[Outfit] mb-1">
              📱 Pre-Typed WhatsApp Message Preview:
            </p>
            <p className="text-xs text-slate-600 font-mono leading-relaxed bg-white p-3 rounded-xl border border-emerald-200/50">
              "👋 Hi Prakriti Greens! Rating: {rating}/5 • Topic: {selectedTopic}
              {comment.trim() ? ` • Note: ${comment.trim()}` : ''}"
            </p>
          </div>

          {/* WhatsApp Direct Submit Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href={buildWhatsAppFeedbackUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-4 rounded-full font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba5c] text-white shadow-md hover:shadow-lg transition-all duration-300 font-[Outfit]"
            >
              <i className="fa-brands fa-whatsapp text-xl" />
              <span>Send Feedback on WhatsApp ({DISPLAY_PHONE})</span>
            </a>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Prakriti Greens! I would like to chat with your support and farm team.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 font-[Outfit] transition-colors text-center w-full sm:w-auto"
            >
              Open Direct Chat
            </a>
          </div>

          <div className="mt-4 text-center">
            <p className="text-[11px] text-slate-400 font-normal">
              🔒 You will be securely redirected to WhatsApp on official number <strong>+91 90965 22819</strong> with the message pre-filled.
            </p>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default Feedback;
