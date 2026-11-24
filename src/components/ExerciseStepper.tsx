import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { stopSpanishSpeech } from '../utils/speech';

export type StepStatus = 'unanswered' | 'correct' | 'wrong' | 'neutral';

interface ExerciseStepperProps {
  currentIndex: number;
  total: number;
  onChange: (nextIndex: number) => void;
  statuses?: StepStatus[];
}

export const ExerciseStepper: React.FC<ExerciseStepperProps> = ({
  currentIndex,
  total,
  onChange,
  statuses,
}) => {
  const goTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(total - 1, idx));
    if (clamped === currentIndex) return;
    stopSpanishSpeech();
    onChange(clamped);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-4 border-t border-purple-100">
      <button
        type="button"
        disabled={currentIndex === 0}
        onClick={() => goTo(currentIndex - 1)}
        aria-label="Предыдущий вопрос"
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-purple-200 bg-white text-xs sm:text-sm font-bold text-purple-900 hover:border-pink-400 hover:bg-pink-50/50 disabled:opacity-35 disabled:hover:border-purple-200 disabled:hover:bg-white disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4 shrink-0" />
        <span>Назад</span>
      </button>

      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        {Array.from({ length: total }, (_, idx) => {
          const isActive = idx === currentIndex;
          const st = statuses?.[idx] ?? 'unanswered';
          return (
            <button
              key={idx}
              type="button"
              onClick={() => goTo(idx)}
              aria-label={`Перейти к пункту ${idx + 1}`}
              aria-current={isActive ? 'step' : undefined}
              className={`w-8 h-8 rounded-lg text-xs font-mono-code font-bold tabular-nums transition-colors cursor-pointer flex items-center justify-center border ${
                isActive
                  ? 'bg-purple-700 border-purple-700 text-white shadow-sm'
                  : st === 'correct'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:border-emerald-500'
                  : st === 'wrong'
                  ? 'bg-rose-50 border-rose-300 text-rose-900 hover:border-rose-500'
                  : st === 'neutral'
                  ? 'bg-yellow-50 border-yellow-300 text-purple-950 hover:border-purple-400'
                  : 'bg-purple-50/60 border-purple-200 text-purple-900/75 hover:border-pink-400'
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
        <span className="ml-1.5 text-xs font-mono-code tabular-nums text-purple-800/70 whitespace-nowrap">
          {currentIndex + 1} / {total}
        </span>
      </div>

      <button
        type="button"
        disabled={currentIndex >= total - 1}
        onClick={() => goTo(currentIndex + 1)}
        aria-label="Следующий вопрос"
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-purple-700 bg-purple-700 text-xs sm:text-sm font-bold text-white hover:bg-purple-800 disabled:opacity-35 disabled:bg-purple-200 disabled:border-purple-200 disabled:text-purple-700 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0 cursor-pointer"
      >
        <span>Дальше</span>
        <ChevronRight className="w-4 h-4 shrink-0" />
      </button>
    </div>
  );
};
