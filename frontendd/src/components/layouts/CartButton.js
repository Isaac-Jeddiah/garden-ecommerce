import React from 'react';
import { ShoppingCart } from 'lucide-react';

export function CartButton({ itemCount }) {
  return (
    <button className="relative hover:text-white/80 transition-colors">
      <ShoppingCart size={24} />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-yellow-400 text-forest-900 w-5 h-5 rounded-full text-xs flex items-center justify-center font-medium">
          {itemCount}
        </span>
      )}
    </button>
  );
}
