import React from 'react';
import { GrammarReference } from './components/GrammarReference';
import { FormulaTableExercise } from './components/FormulaTableExercise';
import { AudioAndHeroSection } from './components/AudioAndHeroSection';
import { ExercisesPage } from './components/ExercisesPage';
import { MediaReadingPage } from './components/MediaReadingPage';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FDF9FF] text-[#241338]">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
        <section className="rounded-3xl bg-gradient-to-br from-purple-700 via-purple-800 to-pink-700 text-white p-6 sm:p-10 shadow-md">
          <div className="max-w-3xl space-y-3">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Las oraciones condicionales (tipo I):{' '}
              <span className="text-yellow-300">si + indicativo</span>
            </h1>
            <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed">
              Реальные условия в настоящем, будущем и повторяющемся прошлом
            </p>
          </div>
        </section>

        <GrammarReference />
        <FormulaTableExercise />
        <AudioAndHeroSection />
        <ExercisesPage />
        <MediaReadingPage />
      </main>
    </div>
  );
}
