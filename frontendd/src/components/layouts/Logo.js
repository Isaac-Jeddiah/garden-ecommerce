import React from 'react';
import { Leaf } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-2 hover:scale-105 transition-transform">
      <Leaf className="text-emerald-500" size={24} />
      <span className="text-navy-900 text-xl font-semibold">Plants</span>
      <span className="text-emerald-500 text-sm">Nursery</span>
    </div>
  );
}
