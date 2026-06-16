export interface Psychologists {
  id: string;
  name: string;
  avatar_url: string;
  experience: string;
  about: string;
  specialization: string;
  rating: number;
  price_per_hour: number;
  license: string;
  initial_consultation: string;
  reviews: { reviewer: string; rating: number; comment: string }[];
}
