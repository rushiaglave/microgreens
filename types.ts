
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  type: 'live-tray' | 'fresh-cut' | 'fruit' | 'vegetable' | 'packed-container' | 'ready-to-cook-kit';
  benefits: string[];
  category: 'microgreens' | 'cut-vegetables' | 'ready-to-cook' | 'fruits' | 'vegetables';
  containerType?: string;
  weight?: string;
  prepTime?: string;
  emoji?: string;
  badge?: string;
  inStock?: boolean;
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
