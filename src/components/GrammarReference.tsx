import React, { useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  GRAMMAR_TABLE,
  TRAPS_DATA,
  EXTRA_EXAMPLES,
  LESSON_VOCAB,
} from '../data/lessonData';
import { AudioPlayButton } from './AudioPlayButton';

const SLIDES = [
  '1. Таблица времён',
  '2. Ловушки',
  '3. Примеры',
  '4. Словарь',
];

export const GrammarReference: React.FC = () => {
  const [slideIdx, setSlideIdx] = useState<number>(0);

  const goPrev = () => setSlideIdx((i) => Math.max(0, i - 1));
  const goNext = () => setSlideIdx((i) => Math.min(SLIDES.length - 1, i + 1));

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4" aria-hidden="true" />
          </div>
          <h2 className="font-display text-2xl font-bold text-[#241338]">Шпаргалка</h2>
        </div>

        <div className="flex items-center gap-1 p-1 bg-purple-100/75 border border-purple-200 rounded-xl w-fit overflow-x-auto">
          {SLIDES.map((label, idx) => (
            <button
              key={label}
              type="button"
              onClick={() => setSlideIdx(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                slideIdx === idx
                  ? 'bg-white text-purple-950 shadow-sm'
                  : 'text-purple-900/70 hover:text-purple-950'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-purple-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
        {slideIdx === 0 && (
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-[#241338]">
              1. Таблица времён: si + indicativo
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-purple-200 text-xs text-purple-800/80 uppercase tracking-wide">
                    <th className="py-2.5 pr-4 font-bold">Придаточное (условие)</th>
                    <th className="py-2.5 pr-4 font-bold">Главное (следствие)</th>
                    <th className="py-2.5 pr-4 font-bold">Значение</th>
                    <th className="py-2.5 font-bold">Пример</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-100">
                  {GRAMMAR_TABLE.map((row) => (
                    <tr key={row.id} className="align-top hover:bg-purple-50/40">
                      <td className="py-3 pr-4 font-mono-code text-xs font-bold text-purple-800 whitespace-nowrap sm:whitespace-normal">
                        {row.ifClause}
                      </td>
                      <td className="py-3 pr-4 font-mono-code text-xs font-semibold text-pink-700">
                        {row.mainClause}
                      </td>
                      <td className="py-3 pr-4 text-xs text-purple-950/80">{row.meaningRu}</td>
                      <td className="py-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-[#241338] text-sm">{row.exampleEs}</p>
                            <p className="text-xs text-purple-900/65 mt-0.5">{row.exampleRu}</p>
                          </div>
                          <AudioPlayButton text={row.exampleEs} variant="compact" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {slideIdx === 1 && (
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-[#241338]">
              2. Главные ловушки (на них чаще всего ошибаются!)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TRAPS_DATA.map((trap) => (
                <div
                  key={trap.id}
                  className="p-4 rounded-2xl bg-purple-50/45 border border-purple-200 space-y-2.5"
                >
                  <h4 className="font-bold text-sm text-[#241338]">{trap.title}</h4>
                  <div className="space-y-1.5 text-xs">
                    <p className="px-3 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
                      <strong className="font-bold">✗ Неверно:</strong> {trap.wrong}
                    </p>
                    <p className="px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                      <strong className="font-bold">✓ Верно:</strong> {trap.right}
                    </p>
                  </div>
                  <p className="text-xs text-purple-900/80 leading-relaxed">{trap.explanationRu}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {slideIdx === 2 && (
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-[#241338]">
              3. Живые примеры с озвучкой
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {EXTRA_EXAMPLES.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-yellow-50/55 border border-yellow-300/80 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <p className="text-[11px] font-mono-code font-bold text-purple-800">{ex.tag}</p>
                    <p className="font-semibold text-sm sm:text-base text-[#241338]">{ex.es}</p>
                    <p className="text-xs text-purple-900/70">{ex.ru}</p>
                  </div>
                  <AudioPlayButton text={ex.es} variant="compact" />
                </div>
              ))}
            </div>
          </div>
        )}

        {slideIdx === 3 && (
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-[#241338]">
              4. Полезный словарь урока
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {LESSON_VOCAB.map((item) => (
                <div
                  key={item.es}
                  className="px-3.5 py-2.5 rounded-xl bg-purple-50/50 border border-purple-200/80 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-bold text-sm text-[#241338]">{item.es}</p>
                    <p className="text-xs text-purple-900/70">{item.ru}</p>
                  </div>
                  <AudioPlayButton text={item.es} variant="compact" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-purple-100 flex items-center justify-between">
          <button
            type="button"
            onClick={goPrev}
            disabled={slideIdx === 0}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-purple-200 text-purple-900 bg-white hover:bg-purple-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Назад</span>
          </button>

          <span className="text-xs font-mono-code font-bold text-purple-800/75">
            {slideIdx + 1} / {SLIDES.length}
          </span>

          <button
            type="button"
            onClick={goNext}
            disabled={slideIdx === SLIDES.length - 1}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-pink-600 text-white hover:bg-pink-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <span>Далее</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
