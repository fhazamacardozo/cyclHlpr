import React from 'react';

// Reusable section title
export default function SectionTitle({ children, color = '#f9d518', textColor = '#1a1a1a', className = '', style = {}, ...props }) {
  return (
    <h2
      className={`inline-block px-4 py-2 font-bold border-2 border-black rounded-lg mb-4 ${className}`}
      style={{ backgroundColor: color, color: textColor, ...style }}
      {...props}
    >
      {children}
    </h2>
  );
}
