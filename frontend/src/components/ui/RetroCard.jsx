import React from 'react';

// Reusable retro card container
export default function RetroCard({ children, className = '', style = {}, ...props }) {
  return (
    <div
      className={`border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_#000] p-6 ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
