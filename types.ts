
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  type: 'live-tray' | 'fresh-cut' | 'fruit';
  benefits: string[];
  category: 'microgreens' | 'fruits';
  emoji?: string;
  badge?: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface RecommendationRequest {
  goal: string;
  preferences: string;
}

export interface RecommendationResponse {
  suggestedGreens: string[];
  reasoning: string;
  usageTips: string;
}

export interface Review {
  name: string;
  text: string;
  rating: number;
  handle: string;
}
