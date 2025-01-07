import React from 'react';

export function FooterSection({ title, children }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
      {children}
    </div>
  );
}
