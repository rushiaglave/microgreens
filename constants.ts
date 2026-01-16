
import { Product, Benefit } from './types';

export const BUSINESS_NAME = 'Prakriti Greens';
export const PLACEHOLDER_LOGO = 'https://i.ibb.co/3S4H2x8/prakriti-logo.png';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Royal Sango Radish',
    description: 'Breathtaking deep purple canopy. A peppery luxury that transforms any dish into a gourmet experience.',
    price: 350,
    image: '/Radish.png',
    type: 'live-tray',
    benefits: ['Natural Detox', 'Instant Energy', 'Skin Health']
  },
  {
    id: 'p2',
    name: 'Sweet Tendril Pea',
    description: 'Crunchy, sweet shoots that taste like spring. Harvested minutes before dispatch for ultimate crispness.',
    price: 180,
    image: '/Pea.png',
    type: 'fresh-cut',
    benefits: ['Protein Rich', 'Folate Source', 'Low Glycemic']
  },
  {
    id: 'p3',
    name: 'Broccoli',
    description: 'The scientific superstar. Neutral flavor with astronomical health benefits. Grown in pure mineral water.',
    price: 400,
    image: '/Broccoli.png',
    type: 'live-tray',
    benefits: ['Cell Regeneration', 'Immune Shield', 'Vitality']
  },
  {
    id: 'p4',
    name: 'Golden Sunflower',
    description: 'The heartiest of greens. Nutty, satisfying, and packed with Vitamin E. The ultimate salad base.',
    price: 200,
    image: '/Sunflower.png',
    type: 'fresh-cut',
    benefits: ['Zinc Loaded', 'Healthy Heart', 'Muscle Repair']
  }
];

export const BENEFITS: Benefit[] = [
  {
    title: 'Scientific Potency',
    description: 'Our greens are tested to contain up to 40x the nutrient density of adult vegetables. Maximum impact per bite.',
    icon: 'fa-solid fa-microscope'
  },
  {
    title: 'Eternal Freshness',
    description: 'Living Trays continue to grow in your kitchen. Harvest seconds before consumption for zero nutrient loss.',
    icon: 'fa-solid fa-infinity'
  },
  {
    title: 'Zero-Chemical Growth',
    description: 'Hydroponically grown using only 100% organic nutrients and triple-filtered water. Purely Prakriti.',
    icon: 'fa-solid fa-shield-halved'
  }
];
