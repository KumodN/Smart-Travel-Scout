import { TravelPackage } from '../data/inventory';

export type SearchResponse = {
  results: Array<{
    package: TravelPackage;
    matchReason: string;
    score: number;
  }>;
  metadata: {
    totalMatches: number;
    query: string;
  };
};

export type AIResponse = {
  matches: Array<{
    id: number;
    reason: string;
  }>;
};