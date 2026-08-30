export interface EstimateInput {
  propertyType: string;
  bhk: string;
  approxAreaSqFt: number;
  selectedServices: string[]; // Service slugs
  qualityFinish: 'essential' | 'standard' | 'premium';
}

export interface ServiceEstimateBreakdown {
  serviceSlug: string;
  serviceName: string;
  minCost: number;
  maxCost: number;
}

export interface EstimateResult {
  minTotal: number;
  maxTotal: number;
  breakdown: ServiceEstimateBreakdown[];
  disclaimer: string;
}

// Configurable default rate card per sq.ft or lump sum
export const DEFAULT_RATES: Record<string, { name: string; minRate: number; maxRate: number; unit: 'sqft' | 'lumpsum' }> = {
  'modular-kitchen': { name: 'Modular Kitchen', minRate: 140, maxRate: 220, unit: 'sqft' },
  'wardrobe': { name: 'Wardrobes & Storage', minRate: 120, maxRate: 190, unit: 'sqft' },
  'false-ceiling': { name: 'False Ceiling & Cove Lights', minRate: 90, maxRate: 140, unit: 'sqft' },
  'painting': { name: 'Emulsion Painting & Polish', minRate: 25, maxRate: 45, unit: 'sqft' },
  'electrical': { name: 'Electrical Wiring & Switches', minRate: 35, maxRate: 65, unit: 'sqft' },
  'plumbing': { name: 'Plumbing & Bath Fittings', minRate: 30, maxRate: 55, unit: 'sqft' },
  'flooring': { name: 'Tile & Flooring Laying', minRate: 40, maxRate: 85, unit: 'sqft' },
  'carpenter-work': { name: 'General Carpentry & Furniture', minRate: 110, maxRate: 180, unit: 'sqft' },
  'civil-work': { name: 'Civil Dismantling & Masonry', minRate: 30, maxRate: 60, unit: 'sqft' }
};

export const QUALITY_MULTIPLIERS = {
  essential: 1.0,
  standard: 1.25,
  premium: 1.6,
};

export function calculateEstimate(input: EstimateInput): EstimateResult {
  const area = Math.max(input.approxAreaSqFt || 400, 100);
  const multiplier = QUALITY_MULTIPLIERS[input.qualityFinish] || 1.0;

  const breakdown: ServiceEstimateBreakdown[] = [];
  let minTotal = 0;
  let maxTotal = 0;

  for (const slug of input.selectedServices) {
    const rateInfo = DEFAULT_RATES[slug];
    if (rateInfo) {
      let minCost = 0;
      let maxCost = 0;

      if (rateInfo.unit === 'sqft') {
        minCost = Math.round(area * rateInfo.minRate * multiplier);
        maxCost = Math.round(area * rateInfo.maxRate * multiplier);
      } else {
        minCost = Math.round(rateInfo.minRate * multiplier);
        maxCost = Math.round(rateInfo.maxRate * multiplier);
      }

      breakdown.push({
        serviceSlug: slug,
        serviceName: rateInfo.name,
        minCost,
        maxCost,
      });

      minTotal += minCost;
      maxTotal += maxCost;
    }
  }

  // Fallback if no specific services selected
  if (breakdown.length === 0) {
    minTotal = Math.round(area * 600 * multiplier);
    maxTotal = Math.round(area * 950 * multiplier);
  }

  return {
    minTotal,
    maxTotal,
    breakdown,
    disclaimer: "APPROXIMATE ESTIMATE ONLY. NOT A FINAL QUOTATION. Final pricing requires physical site measurement, layout review, and exact material/hardware selection by N.S. INTERIOR.",
  };
}
