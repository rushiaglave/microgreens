
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  type: 'live-tray' | 'fresh-cut';
  benefits: string[];
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
