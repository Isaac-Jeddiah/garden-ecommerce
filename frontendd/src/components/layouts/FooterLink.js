import React from 'react';

export function FooterLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-gray-600 hover:text-emerald-500 transition-colors hover:translate-x-1 transform inline-block"
    >
      {children}
    </a>
  );
}
