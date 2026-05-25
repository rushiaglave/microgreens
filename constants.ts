
import { Product, Benefit, Review } from './types';

export const BUSINESS_NAME = 'Prakriti Greens';

export const PRODUCTS: Product[] = [
  // ── MICROGREENS ──────────────────────────────────────────────
  {
    id: 'mg1',
    name: 'Royal Sango Radish',
    description: 'Breathtaking deep purple canopy. A peppery luxury that transforms any dish into a gourmet experience.',
    price: 350,
    image: '/Radish.png',
    type: 'live-tray',
    category: 'microgreens',
    benefits: ['Natural Detox', 'Instant Energy', 'Skin Health'],
    badge: 'Best Seller',
  },
  {
    id: 'mg2',
    name: 'Sweet Tendril Pea',
    description: 'Crunchy, sweet shoots that taste like spring. Harvested minutes before dispatch for ultimate crispness.',
    price: 180,
    image: '/Pea.png',
    type: 'fresh-cut',
    category: 'microgreens',
    benefits: ['Protein Rich', 'Folate Source', 'Low Glycemic'],
  },
  {
    id: 'mg3',
    name: 'Broccoli Sprouts',
    description: 'The scientific superstar. Neutral flavor with astronomical health benefits. Grown in pure mineral water.',
    price: 400,
    image: '/Broccoli.png',
    type: 'live-tray',
    category: 'microgreens',
    benefits: ['Cell Regeneration', 'Immune Shield', 'Vitality'],
    badge: 'Top Rated',
  },
  {
    id: 'mg4',
    name: 'Golden Sunflower',
    description: 'The heartiest of greens. Nutty, satisfying, and packed with Vitamin E. The ultimate salad base.',
    price: 200,
    image: '/Sunflower.png',
    type: 'fresh-cut',
    category: 'microgreens',
    benefits: ['Zinc Loaded', 'Healthy Heart', 'Muscle Repair'],
  },

  // ── FRUITS ───────────────────────────────────────────────────
  {
    id: 'fr1',
    name: 'Alphonso Mango',
    description: 'The king of mangoes. Grown naturally in Maharashtra orchards — sun-ripened, fibre-free, and impossibly sweet.',
    price: 499,
    image: '/mango_3d.png',
    type: 'fruit',
    category: 'fruits',
    benefits: ['Rich in Vitamin C', 'Natural Energy', 'Antioxidant Boost'],
    badge: 'Currently Selling',
    emoji: '🥭',
  },
  {
    id: 'fr2',
    name: 'Indian Blackberry',
    description: 'Jambhul — the purple jewel of the monsoon. Rare, wild-harvested, and packed with anthocyanins and iron.',
    price: 299,
    image: '/jambhul_3d.png',
    type: 'fruit',
    category: 'fruits',
    benefits: ['Blood Sugar Balance', 'Iron Rich', 'Gut Health'],
    badge: 'Seasonal',
    emoji: '🫐',
  },
];

export const BENEFITS: Benefit[] = [
  {
    title: 'Scientific Potency',
    description: 'Our greens are tested to contain up to 40× the nutrient density of adult vegetables. Maximum impact per bite.',
    icon: 'fa-solid fa-microscope',
  },
  {
    title: 'Eternal Freshness',
    description: 'Living Trays continue to grow in your kitchen. Harvest seconds before consumption for zero nutrient loss.',
    icon: 'fa-solid fa-infinity',
  },
  {
    title: 'Zero-Chemical Growth',
    description: 'Hydroponically grown using only 100% organic nutrients and triple-filtered water. Purely Prakriti.',
    icon: 'fa-solid fa-shield-halved',
  },
];

export const INSTAGRAM_REVIEWS: Review[] = [
  {
    name: 'Priya Sharma',
    handle: '@priya_wellness',
    text: 'These microgreens changed my morning routine. The radish variety is absolutely stunning — peppery, fresh and so vibrant! 🌱',
    rating: 5,
  },
  {
    name: 'Rohan Kulkarni',
    handle: '@rohanfit',
    text: 'Ordered the Broccoli sprouts and they arrived so fresh. My smoothies taste incredible now. Genuinely 40x better than store bought.',
    rating: 5,
  },
  {
    name: 'Sneha Patel',
    handle: '@snehaeats',
    text: 'The Alphonso mangoes are unreal! Sweet, juicy and zero fibre — exactly like the ones my grandma used to get. Prakriti Greens delivers every time 🥭',
    rating: 5,
  },
  {
    name: 'Arjun Mehta',
    handle: '@arjun_health',
    text: 'Jambhul was something I hadn\'t tasted in years. So happy they source it fresh. Amazing for blood sugar — I can feel the difference.',
    rating: 5,
  },
  {
    name: 'Kavya Iyer',
    handle: '@kavya.clean',
    text: 'Love the concept — microgreens AND seasonal fruits together. Everything is packaged beautifully. Will keep ordering! ✨',
    rating: 5,
  },
  {
    name: 'Vikram Nair',
    handle: '@vikram_organic',
    text: 'Sunflower microgreens with Alphonso mango for breakfast is now my daily ritual. Prakriti Greens is the real deal. Zero compromise on quality.',
    rating: 5,
  },
];
