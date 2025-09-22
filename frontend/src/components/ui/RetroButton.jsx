import React from 'react';

// Reusable retro button
export default function RetroButton({ children, color = '#4CAF50', textColor = 'white', className = '', style = {}, ...props }) {
  return (
    <button
      className={`py-3 px-6 font-bold rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_#000] transition-all duration-200 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] ${className}`}
      style={{ backgroundColor: color, color: textColor, ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
