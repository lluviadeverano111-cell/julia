import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-[#FDF9FF]/90 backdrop-blur-md border-b border-purple-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center">
        <span className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-purple-900">
          ¡Hola, <span className="text-pink-600">B1</span>!
        </span>
      </div>
    </header>
  );
};
