import React, { useMemo, useState } from 'react';
import { Table2, RotateCcw, Check, X } from 'lucide-react';
import { FORMULA_MATCH_ROWS } from '../data/lessonData';
import { AudioPlayButton } from './AudioPlayButton';

export const FormulaTableExercise: React.FC = () => {
  const [selectedExampleId, setSelectedExampleId] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<boolean>(false);

  const shuffledExamples = useMemo(() => {
    const arr = [...FORMULA_MATCH_ROWS];
    return arr.sort((a, b) => ((a.id.charCodeAt(1) * 7) % 5) - ((b.id.charCodeAt(1) * 7) % 5));
  }, []);

  const usedExampleIds = useMemo(() => new Set(Object.values(assignments)), [assignments]);

  const handleAssignToRow = (rowId: string) => {
    if (!selectedExampleId) return;
    setAssignments((prev) => {
      const next: Record<string, string> = {};
      for (const [k, v] of Object.entries(prev)) {
        if (v !== selectedExampleId) next[k] = v;
      }
      next[rowId] = selectedExampleId;
      return next;
    });
    setSelectedExampleId(null);
    setChecked(false);
  };

  const handleClearRow = (rowId: string) => {
    setAssignments((prev) => {
      const next = { ...prev };
      delete next[rowId];
      return next;
    });
    setChecked(false);
  };

  const handleReset = () => {
    setAssignments({});
    setSelectedExampleId(null);
    setChecked(false);
  };

  const correctCount = FORMULA_MATCH_ROWS.filter((row) => assignments[row.id] === row.id).length;

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-pink-600 text-white flex items-center justify-center shrink-0">
            <Table2 className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-[#241338]">
              Подбери новые примеры по формуле
            </h2>
            <p className="text-sm text-purple-900/70">
              Выбери предложение сверху и нажми на подходящую формулу в таблице
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-purple-800 bg-purple-100/80 hover:bg-purple-200/80 transition-colors self-start sm:self-center cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Сбросить</span>
        </button>
      </div>

      <div className="bg-white border border-purple-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
        <div className="flex flex-wrap gap-2">
          {shuffledExamples.map((ex) => {
            const isUsed = usedExampleIds.has(ex.id);
            const isSelected = selectedExampleId === ex.id;
            return (
              <button
                key={ex.id}
                type="button"
                onClick={() => setSelectedExampleId(isSelected ? null : ex.id)}
                className={`text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-yellow-300 border-yellow-500 text-purple-950 shadow-sm ring-2 ring-purple-500'
                    : isUsed
                    ? 'bg-purple-50/40 border-purple-200/60 text-purple-900/45 line-through'
                    : 'bg-purple-50/70 border-purple-200 text-[#241338] hover:border-pink-400 hover:bg-pink-50/50'
                }`}
              >
                {ex.correctExampleEs}
              </button>
            );
          })}
        </div>

        <div className="space-y-2.5">
          {FORMULA_MATCH_ROWS.map((row) => {
            const assignedId = assignments[row.id];
            const assignedObj = FORMULA_MATCH_ROWS.find((r) => r.id === assignedId);
            const isRight = checked && assignedId === row.id;
            const isWrong = checked && Boolean(assignedId) && assignedId !== row.id;
            return (
              <div
                key={row.id}
                onClick={() => handleAssignToRow(row.id)}
                className={`p-4 rounded-xl border transition-colors ${
                  selectedExampleId ? 'cursor-pointer hover:border-pink-400' : ''
                } ${
                  isRight
                    ? 'bg-emerald-50/75 border-emerald-400'
                    : isWrong
                    ? 'bg-rose-50/75 border-rose-300'
                    : selectedExampleId
                    ? 'bg-yellow-50/40 border-purple-300'
                    : 'bg-purple-50/30 border-purple-200/80'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
                  <div className="lg:col-span-6 space-y-0.5">
                    <p className="font-mono-code text-xs font-bold text-purple-900">
                      {row.formulaLabel}
                    </p>
                    <p className="text-xs text-purple-900/70">{row.meaningRu}</p>
                  </div>

                  <div className="lg:col-span-6">
                    {assignedObj ? (
                      <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white border border-purple-200">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#241338]">
                            {assignedObj.correctExampleEs}
                          </p>
                          {checked && (
                            <p className="text-xs text-purple-900/65 mt-0.5">
                              {assignedObj.correctExampleRu}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <AudioPlayButton text={assignedObj.correctExampleEs} variant="compact" />
                          {isRight && <Check className="w-4 h-4 text-emerald-700" />}
                          {isWrong && <X className="w-4 h-4 text-rose-700" />}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClearRow(row.id);
                            }}
                            aria-label="Убрать пример"
                            className="p-1 text-purple-400 hover:text-pink-600 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="px-3 py-2.5 rounded-xl border border-dashed border-purple-300 text-xs text-purple-700/70">
                        {selectedExampleId
                          ? 'Нажмите сюда, чтобы вставить выбранный пример'
                          : 'Сначала выберите пример выше'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => setChecked(true)}
            disabled={Object.keys(assignments).length === 0}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-700 text-white hover:bg-purple-800 disabled:opacity-40 transition-colors cursor-pointer"
          >
            Проверить таблицу
          </button>

          {checked && (
            <p className="text-sm font-bold text-[#241338]">
              Результат: <span className="text-pink-600">{correctCount}</span> из{' '}
              {FORMULA_MATCH_ROWS.length}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
