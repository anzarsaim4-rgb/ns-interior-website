import React from 'react';
import EstimateCalculator from '@/components/EstimateCalculator';

export const metadata = {
  title: 'Interior Execution Estimate Calculator | N.S. INTERIOR',
  description: 'Calculate approximate interior execution costs for 1 BHK, 2 BHK, 3 BHK, and offices in Mumbai, Mumbra, and Thane with transparent disclaimers.',
};

export default function EstimateCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <EstimateCalculator />
    </div>
  );
}
