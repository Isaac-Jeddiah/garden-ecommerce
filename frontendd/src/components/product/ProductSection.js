import React from 'react';
import { ProductTabs } from './ProductTabs';
import { ProductGrid } from './ProductGrid';

export function ProductSection() {
  return React.createElement(
    'section',
    { className: 'bg-forest-900 py-16 px-4' },
    React.createElement(
      'div',
      { className: 'max-w-7xl mx-auto' },
      React.createElement(
        'div',
        { className: 'text-center mb-12' },
        React.createElement(
          'h2',
          { className: 'text-sm uppercase tracking-wider text-emerald-400 mb-2' },
          'PRODUCTS'
        ),
        React.createElement(
          'h3',
          { className: 'text-3xl font-bold text-white' },
          'Our Latest Plants'
        )
      ),
      React.createElement(ProductTabs, null), // Render ProductTabs component
      React.createElement(ProductGrid, null)  // Render ProductGrid component
    )
  );
}
