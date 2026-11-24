import React, { useEffect, useRef, useState } from 'react';
import {
  Sparkles,
  Image,
  PenTool,
  CircleAlert,
  Languages,
  BookText,
  Trophy,
  Check,
  X,
  RotateCcw,
} from 'lucide-react';
import {
  EX3_CHOICE,
  EX4_PICTURES,
  EX5_VERB_FORMS,
  EX6_FIND_ERRORS,
  EX7_TRANSLATE_SENTENCES,
  LESSON_TEXTS,
  TEXTOS_TF_STATEMENTS,
  TEXTOS_WORD_DICTIONARY,
  MINI_TEST_QUESTIONS,
  type WordEntry,
} from '../data/lessonData';
import { AudioPlayButton } from './AudioPlayButton';
import { ExerciseStepper, type StepStatus } from './ExerciseStepper';

const normalizeAnswer = (raw: string): string =>
  raw
    .trim()
    .toLowerCase()
    .replace(/[.,!?;:¿¡]/g, '')
    .replace(/\s+/g, ' ');

const stripAccents = (raw: string): string =>
  normalizeAnswer(raw)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const cleanWordKey = (token: string): string =>
  token
    .toLowerCase()
    .replace(/^[^a-záéíóúüñ]+|[^a-záéíóúüñ]+$/gi, '');

function computePopoverPosition(
  buttonEl: HTMLElement,
  boxEl: HTMLElement
): { left: number; top: number; arrowLeft: number } {
  const btnRect = buttonEl.getBoundingClientRect();
  const boxRect = boxEl.getBoundingClientRect();
  const popoverWidth = Math.min(280, Math.max(220, boxRect.width - 16));
  const halfWidth = popoverWidth / 2;
  const wordCenterX = btnRect.left - boxRect.left + btnRect.width / 2;
  const clampedCenterX = Math.max(
    halfWidth + 8,
    Math.min(boxRect.width - halfWidth - 8, wordCenterX)
  );
  const left = clampedCenterX - halfWidth;
  const top = btnRect.bottom - boxRect.top + 10;
  const arrowLeft = Math.max(18, Math.min(popoverWidth - 18, wordCenterX - left));
  return { left, top, arrowLeft };
}

interface Ex6Selection {
  type: 'token' | 'translation' | 'none';
  index?: number;
}

interface TextPopoverState {
  tokenId: string;
  surface: string;
  entry: WordEntry;
  left: number;
  top: number;
  arrowLeft: number;
}

export const ExercisesPage: React.FC = () => {
  const [ex5Index, setEx5Index] = useState(0);
  const [ex3Answers, setEx3Answers] = useState<Record<number, string>>({});

  const [ex6Index, setEx6Index] = useState(0);
  const [ex4Answers, setEx4Answers] = useState<Record<number, string>>({});

  const [ex7Index, setEx7Index] = useState(0);
  const [ex5Inputs, setEx5Inputs] = useState<Record<string, string>>({});
  const [ex5Checked, setEx5Checked] = useState<Record<number, boolean>>({});

  const [ex8Index, setEx8Index] = useState(0);
  const [ex6Selection, setEx6Selection] = useState<Record<number, Ex6Selection>>({});

  const [ex9Index, setEx9Index] = useState(0);
  const [ex7Inputs, setEx7Inputs] = useState<Record<number, string>>({});
  const [ex7Status, setEx7Status] = useState<Record<number, 'checked' | 'revealed'>>({});

  const [activeTextTab, setActiveTextTab] = useState<string>(LESSON_TEXTS[0].id);
  const [tfIndex, setTfIndex] = useState(0);
  const [tfAnswers, setTfAnswers] = useState<Record<number, boolean>>({});
  const [textPopover, setTextPopover] = useState<TextPopoverState | null>(null);

  const [testIndex, setTestIndex] = useState(0);
  const [testAnswers, setTestAnswers] = useState<Record<number, string>>({});

  const textBoxRef = useRef<HTMLDivElement | null>(null);
  const textPopoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!textPopover) return;
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (textPopoverRef.current?.contains(target)) return;
      if (target.closest('[data-text8-word="true"]')) return;
      setTextPopover(null);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setTextPopover(null);
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [textPopover]);

  const handleTextWordClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    rawWord: string,
    tokenId: string
  ) => {
    const key = cleanWordKey(rawWord);
    if (!key) return;
    if (textPopover?.tokenId === tokenId) {
      setTextPopover(null);
      return;
    }
    const entry: WordEntry = TEXTOS_WORD_DICTIONARY[key] ?? {
      lemma: key,
      pos: 'слово',
      ru: 'Слово из текста',
    };
    if (!textBoxRef.current) return;
    const pos = computePopoverPosition(event.currentTarget, textBoxRef.current);
    setTextPopover({
      tokenId,
      surface: rawWord,
      entry,
      ...pos,
    });
  };

  const renderClickableText8 = (text: string, prefix: string) => {
    const tokens = text.split(/([A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)/g);
    return tokens.map((token, idx) => {
      if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+$/.test(token)) {
        return <React.Fragment key={idx}>{token}</React.Fragment>;
      }
      const tokenId = `${prefix}-${idx}`;
      const isSelected = textPopover?.tokenId === tokenId;
      return (
        <button
          key={idx}
          type="button"
          data-text8-word="true"
          onClick={(e) => handleTextWordClick(e, token, tokenId)}
          className={`inline px-0.5 rounded transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 ${
            isSelected
              ? 'bg-yellow-300 text-purple-950 font-bold'
              : 'hover:bg-pink-100/80 hover:text-[#241338]'
          }`}
        >
          {token}
        </button>
      );
    });
  };

  // Задание 5 (EX3_CHOICE)
  const ex5Item = EX3_CHOICE[ex5Index];
  const ex5Chosen = ex3Answers[ex5Item.id];
  const ex5IsCorrect = ex5Chosen === ex5Item.correctAnswer;
  const ex5Statuses: StepStatus[] = EX3_CHOICE.map((item) => {
    const a = ex3Answers[item.id];
    if (!a) return 'unanswered';
    return a === item.correctAnswer ? 'correct' : 'wrong';
  });

  // Задание 6 (EX4_PICTURES)
  const ex6Item = EX4_PICTURES[ex6Index];
  const ex6Chosen = ex4Answers[ex6Item.id];
  const ex6IsCorrect = ex6Chosen === ex6Item.correctId;
  const ex6Statuses: StepStatus[] = EX4_PICTURES.map((item) => {
    const a = ex4Answers[item.id];
    if (!a) return 'unanswered';
    return a === item.correctId ? 'correct' : 'wrong';
  });

  // Задание 7 (EX5_VERB_FORMS)
  const ex7Item = EX5_VERB_FORMS[ex7Index];
  const ex7IsChecked = !!ex5Checked[ex7Item.id];
  const ex7BlankResults = ex7Item.blanks.map((blank, bIdx) => {
    const val = normalizeAnswer(ex5Inputs[`${ex7Item.id}-${bIdx}`] ?? '');
    return blank.accepted.some((acc) => normalizeAnswer(acc) === val);
  });
  const ex7AllRight = ex7IsChecked && ex7BlankResults.every(Boolean);
  const ex7Statuses: StepStatus[] = EX5_VERB_FORMS.map((q) => {
    if (!ex5Checked[q.id]) return 'unanswered';
    const ok = q.blanks.every((b, idx) =>
      b.accepted.some((acc) => normalizeAnswer(acc) === normalizeAnswer(ex5Inputs[`${q.id}-${idx}`] ?? ''))
    );
    return ok ? 'correct' : 'wrong';
  });

  // Задание 8 (EX6_FIND_ERRORS)
  const ex8Item = EX6_FIND_ERRORS[ex8Index];
  const ex8Tokens = ex8Item.sentenceEs.split(' ');
  const ex8Sel = ex6Selection[ex8Item.id];
  const isEx8SelectionCorrect = (
    item: (typeof EX6_FIND_ERRORS)[number],
    sel?: Ex6Selection
  ): boolean =>
    Boolean(
      sel &&
        ((item.errorType === 'token' &&
          sel.type === 'token' &&
          sel.index === item.wrongTokenIndex) ||
          (item.errorType === 'translation' && sel.type === 'translation') ||
          (item.errorType === 'none' && sel.type === 'none'))
    );
  const ex8IsCorrect = isEx8SelectionCorrect(ex8Item, ex8Sel);
  const ex8Statuses: StepStatus[] = EX6_FIND_ERRORS.map((item) => {
    const s = ex6Selection[item.id];
    if (!s) return 'unanswered';
    return isEx8SelectionCorrect(item, s) ? 'correct' : 'wrong';
  });

  // Задание 9 (EX7_TRANSLATE_SENTENCES)
  const ex9Item = EX7_TRANSLATE_SENTENCES[ex9Index];
  const ex9Raw = ex7Inputs[ex9Item.id] ?? '';
  const ex9Status = ex7Status[ex9Item.id];
  const ex9IsChecked = ex9Status === 'checked';
  const ex9IsRevealed = ex9Status === 'revealed';
  const ex9ExactMatch =
    ex9IsChecked &&
    ex9Item.acceptedVariants.some((v) => normalizeAnswer(v) === normalizeAnswer(ex9Raw));
  const ex9AccentCloseMatch =
    ex9IsChecked &&
    !ex9ExactMatch &&
    ex9Item.acceptedVariants.some((v) => stripAccents(v) === stripAccents(ex9Raw));
  const ex9Accepted = ex9ExactMatch || ex9AccentCloseMatch;
  const ex9Statuses: StepStatus[] = EX7_TRANSLATE_SENTENCES.map((item) => {
    const st = ex7Status[item.id];
    if (!st) return 'unanswered';
    if (st === 'revealed') return 'neutral';
    const raw = ex7Inputs[item.id] ?? '';
    const ok = item.acceptedVariants.some((v) => stripAccents(v) === stripAccents(raw));
    return ok ? 'correct' : 'wrong';
  });

  // Задание 10 (Тексты + Verdadero/Falso)
  const currentLessonText = LESSON_TEXTS.find((t) => t.id === activeTextTab) ?? LESSON_TEXTS[0];
  const activeTfStatements = TEXTOS_TF_STATEMENTS.filter((s) => s.textId === activeTextTab);
  const safeTfIndex = Math.min(tfIndex, Math.max(0, activeTfStatements.length - 1));
  const currentTf = activeTfStatements[safeTfIndex];
  const tfChosen = currentTf ? tfAnswers[currentTf.id] : undefined;
  const tfAnswered = tfChosen !== undefined;
  const tfIsCorrect = Boolean(currentTf && tfAnswered && tfChosen === currentTf.isTrue);
  const tfStatuses: StepStatus[] = activeTfStatements.map((st) => {
    const c = tfAnswers[st.id];
    if (c === undefined) return 'unanswered';
    return c === st.isTrue ? 'correct' : 'wrong';
  });

  // Мини-тест
  const currentTestQ = MINI_TEST_QUESTIONS[testIndex];
  const testChosen = testAnswers[currentTestQ.id];
  const testIsCorrect = testChosen === currentTestQ.correctId;
  const testStatuses: StepStatus[] = MINI_TEST_QUESTIONS.map((q) => {
    const a = testAnswers[q.id];
    if (!a) return 'unanswered';
    return a === q.correctId ? 'correct' : 'wrong';
  });
  const miniTestScore = MINI_TEST_QUESTIONS.filter((q) => testAnswers[q.id] === q.correctId).length;
  const miniTestDone = Object.keys(testAnswers).length === MINI_TEST_QUESTIONS.length;

  return (
    <div className="space-y-12">
      {/* Задание 5. Выбери правильную форму глагола (без переводов, со стрелочками) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-[#241338]">
              5. Выбери правильную форму глагола
            </h2>
            <p className="text-sm text-purple-900/70">
              Обращай внимание на время, маркеры и разницу между условием и косвенным вопросом
            </p>
          </div>
        </div>

        <div className="bg-white border border-purple-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
          <p className="font-semibold text-base sm:text-lg text-[#241338]">
            {ex5Item.id}. {ex5Item.promptEs}
          </p>

          <div className="flex flex-wrap gap-2.5">
            {ex5Item.options.map((opt) => {
              const isThis = ex5Chosen === opt;
              const right = Boolean(ex5Chosen) && opt === ex5Item.correctAnswer;
              const wrong = isThis && opt !== ex5Item.correctAnswer;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setEx3Answers((p) => ({ ...p, [ex5Item.id]: opt }))}
                  className={`px-4 py-2.5 rounded-xl border text-sm font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                    right
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                      : wrong
                      ? 'bg-rose-50 border-rose-300 text-rose-950'
                      : 'bg-purple-50/50 border-purple-200 text-[#241338] hover:border-pink-400 hover:bg-pink-50/40'
                  }`}
                >
                  <span>{opt}</span>
                  {right && <Check className="w-4 h-4 text-emerald-700" />}
                  {wrong && <X className="w-4 h-4 text-rose-700" />}
                </button>
              );
            })}
          </div>

          {ex5Chosen && (
            <p
              className={`text-xs p-3.5 rounded-xl border leading-relaxed ${
                ex5IsCorrect
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  : 'bg-yellow-50 border-yellow-300 text-purple-950'
              }`}
            >
              {ex5Item.explanationRu}
            </p>
          )}

          <ExerciseStepper
            currentIndex={ex5Index}
            total={EX3_CHOICE.length}
            onChange={setEx5Index}
            statuses={ex5Statuses}
          />
        </div>
      </section>

      {/* Задание 6. Ситуации по картинкам (со стрелочками) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-pink-600 text-white flex items-center justify-center shrink-0">
            <Image className="w-4 h-4" aria-hidden="true" />
          </div>
          <h2 className="font-display text-2xl font-bold text-[#241338]">
            6. Выбери грамматически правильную подпись на испанском
          </h2>
        </div>

        <div className="bg-white border border-purple-200 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            <div className="md:col-span-5 aspect-[4/3] md:aspect-auto rounded-xl bg-purple-100 overflow-hidden">
              <img
                src={ex6Item.imageUrl}
                alt={ex6Item.imageAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <p className="text-sm sm:text-base font-bold text-[#241338]">
                  {ex6Item.id}. {ex6Item.situationRu}
                </p>

                <div className="space-y-2.5">
                  {ex6Item.options.map((opt) => {
                    const isThis = ex6Chosen === opt.id;
                    const right = Boolean(ex6Chosen) && opt.id === ex6Item.correctId;
                    const wrong = isThis && opt.id !== ex6Item.correctId;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setEx4Answers((p) => ({ ...p, [ex6Item.id]: opt.id }))}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                          right
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                            : wrong
                            ? 'bg-rose-50 border-rose-300 text-rose-950'
                            : 'bg-purple-50/35 border-purple-200 text-[#241338] hover:border-pink-400 hover:bg-pink-50/40'
                        }`}
                      >
                        <span>{opt.es}</span>
                        {right && <Check className="w-4 h-4 text-emerald-700 shrink-0" />}
                        {wrong && <X className="w-4 h-4 text-rose-700 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {ex6Chosen && (
                <p
                  className={`text-xs p-3.5 rounded-xl border leading-relaxed ${
                    ex6IsCorrect
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                      : 'bg-yellow-50 border-yellow-300 text-purple-950'
                  }`}
                >
                  {ex6Item.explanationRu}
                </p>
              )}
            </div>
          </div>

          <ExerciseStepper
            currentIndex={ex6Index}
            total={EX4_PICTURES.length}
            onChange={setEx6Index}
            statuses={ex6Statuses}
          />
        </div>
      </section>

      {/* Задание 7. Поставь глаголы в нужную форму (со стрелочками) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-yellow-400 text-purple-950 flex items-center justify-center shrink-0">
            <PenTool className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-[#241338]">
              7. Поставь глаголы в нужную форму
            </h2>
            <p className="text-sm text-purple-900/70">
              Для будущего следствия принимаются и futuro simple, и конструкция ir a + infinitivo
              (например, iremos или vamos a ir)
            </p>
          </div>
        </div>

        <div className="bg-white border border-purple-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="text-sm sm:text-base text-[#241338] leading-loose flex flex-wrap items-center gap-1.5">
            <span className="font-bold text-purple-800 mr-1">{ex7Item.id}.</span>
            {ex7Item.parts.map((part, idx) => (
              <React.Fragment key={idx}>
                <span>{part}</span>
                {idx < ex7Item.blanks.length && (
                  <input
                    type="text"
                    value={ex5Inputs[`${ex7Item.id}-${idx}`] ?? ''}
                    onChange={(e) => {
                      setEx5Inputs((p) => ({ ...p, [`${ex7Item.id}-${idx}`]: e.target.value }));
                      if (ex7IsChecked) {
                        setEx5Checked((p) => ({ ...p, [ex7Item.id]: false }));
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setEx5Checked((p) => ({ ...p, [ex7Item.id]: true }));
                      }
                    }}
                    placeholder={ex7Item.blanks[idx].infinitive}
                    aria-label={`Глагол ${ex7Item.blanks[idx].infinitive}`}
                    className={`px-2.5 py-1 rounded-lg border-2 text-sm font-semibold w-40 sm:w-44 transition-colors focus:outline-none ${
                      ex7IsChecked
                        ? ex7BlankResults[idx]
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                          : 'bg-rose-50 border-rose-400 text-rose-950'
                        : 'bg-purple-50/40 border-purple-200 focus:border-purple-600 text-[#241338]'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-purple-900/65">{ex7Item.ruHint}</p>
            <button
              type="button"
              onClick={() => setEx5Checked((p) => ({ ...p, [ex7Item.id]: true }))}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-700 text-white hover:bg-purple-800 transition-colors cursor-pointer"
            >
              Проверить
            </button>
          </div>

          {ex7IsChecked && (
            <div
              className={`text-xs p-3.5 rounded-xl border space-y-1 ${
                ex7AllRight
                  ? 'bg-emerald-50/75 border-emerald-300 text-emerald-950'
                  : 'bg-yellow-50 border-yellow-300 text-purple-950'
              }`}
            >
              <p className="font-bold">
                {ex7AllRight
                  ? 'Отлично! Всё верно.'
                  : `Правильные варианты: ${ex7Item.blanks.map((b) => b.displayAnswer).join(' / ')}`}
              </p>
              <p className="leading-relaxed opacity-90">{ex7Item.explanationRu}</p>
            </div>
          )}

          <ExerciseStepper
            currentIndex={ex7Index}
            total={EX5_VERB_FORMS.length}
            onChange={setEx7Index}
            statuses={ex7Statuses}
          />
        </div>
      </section>

      {/* Задание 8. Найди ошибку (со стрелочками) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-pink-600 text-white flex items-center justify-center shrink-0">
            <CircleAlert className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-[#241338]">
              8. Найди ошибку (или проверь, есть ли она)
            </h2>
            <p className="text-sm text-purple-900/70">
              Нажми на ошибочное слово в испанской фразе, на неверный русский перевод или на кнопку
              «Ошибки нет ✓»
            </p>
          </div>
        </div>

        <div className="bg-white border border-purple-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-bold text-purple-800 mr-1">{ex8Item.id}.</span>
              {ex8Tokens.map((tok, idx) => {
                const pickedThis = ex8Sel?.type === 'token' && ex8Sel.index === idx;
                const isRightToken =
                  Boolean(ex8Sel) &&
                  ex8Item.errorType === 'token' &&
                  ex8Item.wrongTokenIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      setEx6Selection((p) => ({
                        ...p,
                        [ex8Item.id]: { type: 'token', index: idx },
                      }))
                    }
                    className={`px-2.5 py-1.5 rounded-lg border text-sm sm:text-base font-semibold transition-colors cursor-pointer ${
                      isRightToken
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                        : pickedThis
                        ? 'bg-rose-50 border-rose-400 text-rose-950'
                        : 'bg-purple-50/40 border-purple-200/80 text-[#241338] hover:border-pink-400 hover:bg-pink-50/60'
                    }`}
                  >
                    {tok}
                  </button>
                );
              })}
            </div>
            <AudioPlayButton text={ex8Item.fixedEs ?? ex8Item.sentenceEs} variant="compact" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <button
              type="button"
              onClick={() =>
                setEx6Selection((p) => ({ ...p, [ex8Item.id]: { type: 'translation' } }))
              }
              className={`text-left px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-colors cursor-pointer ${
                ex8Sel && ex8Item.errorType === 'translation'
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold'
                  : ex8Sel?.type === 'translation'
                  ? 'bg-rose-50 border-rose-400 text-rose-950 font-semibold'
                  : 'bg-yellow-50/60 border-yellow-300/80 text-purple-950/85 hover:border-pink-400'
              }`}
            >
              <span className="font-bold text-purple-800 mr-1.5">Перевод:</span>
              {ex8Item.translationRu}
            </button>

            <button
              type="button"
              onClick={() =>
                setEx6Selection((p) => ({ ...p, [ex8Item.id]: { type: 'none' } }))
              }
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                ex8Sel && ex8Item.errorType === 'none'
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                  : ex8Sel?.type === 'none'
                  ? 'bg-rose-50 border-rose-400 text-rose-950'
                  : 'bg-purple-50 border-purple-200 text-purple-900 hover:border-pink-400'
              }`}
            >
              Ошибки нет ✓
            </button>
          </div>

          {ex8Sel && (
            <div
              className={`text-xs p-3.5 rounded-xl border space-y-1 ${
                ex8IsCorrect
                  ? 'bg-emerald-50/75 border-emerald-300 text-emerald-950'
                  : 'bg-yellow-50 border-yellow-300 text-purple-950'
              }`}
            >
              <p className="font-bold">
                {ex8IsCorrect ? 'Точно! ' : 'Почти! '}
                <span className="text-purple-800">{ex8Item.trapLabel}</span>
              </p>
              <p className="leading-relaxed">{ex8Item.correctionRu}</p>
              {ex8Item.fixedEs && (
                <p className="font-semibold text-emerald-900 pt-0.5">✓ {ex8Item.fixedEs}</p>
              )}
              {ex8Item.fixedRu && (
                <p className="font-semibold text-emerald-900 pt-0.5">
                  ✓ Верный перевод: {ex8Item.fixedRu}
                </p>
              )}
            </div>
          )}

          <ExerciseStepper
            currentIndex={ex8Index}
            total={EX6_FIND_ERRORS.length}
            onChange={setEx8Index}
            statuses={ex8Statuses}
          />
        </div>
      </section>

      {/* Задание 9. Переведи на испанский (без жёлтых подсказок, со стрелочками) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center shrink-0">
            <Languages className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-[#241338]">
              9. Переведи на испанский
            </h2>
            <p className="text-sm text-purple-900/70">
              Переведи предложения самостоятельно (принимаются и futuro simple, и ir a + infinitivo)
            </p>
          </div>
        </div>

        <div className="bg-white border border-purple-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
          <p className="font-bold text-base sm:text-lg text-[#241338]">
            {ex9Item.id}. {ex9Item.ruPrompt}
          </p>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              value={ex9Raw}
              onChange={(e) => {
                setEx7Inputs((p) => ({ ...p, [ex9Item.id]: e.target.value }));
                if (ex9Status) {
                  setEx7Status((p) => {
                    const next = { ...p };
                    delete next[ex9Item.id];
                    return next;
                  });
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && ex9Raw.trim()) {
                  setEx7Status((p) => ({ ...p, [ex9Item.id]: 'checked' }));
                }
              }}
              placeholder="Напиши перевод на испанский…"
              aria-label={`Перевод предложения ${ex9Item.id}`}
              className={`flex-1 px-3.5 py-2.5 rounded-xl border-2 text-sm sm:text-base font-medium transition-colors focus:outline-none ${
                ex9IsChecked
                  ? ex9Accepted
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                    : 'bg-rose-50 border-rose-400 text-rose-950'
                  : 'bg-purple-50/40 border-purple-200 focus:border-purple-600 text-[#241338]'
              }`}
            />

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                disabled={!ex9Raw.trim()}
                onClick={() => setEx7Status((p) => ({ ...p, [ex9Item.id]: 'checked' }))}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-purple-700 text-white hover:bg-purple-800 disabled:opacity-40 whitespace-nowrap cursor-pointer"
              >
                Проверить
              </button>
              <button
                type="button"
                onClick={() => setEx7Status((p) => ({ ...p, [ex9Item.id]: 'revealed' }))}
                className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-purple-800 bg-purple-100/80 hover:bg-purple-200/80 whitespace-nowrap cursor-pointer"
              >
                Ответ
              </button>
            </div>
          </div>

          {(ex9IsChecked || ex9IsRevealed) && (
            <div
              className={`text-xs p-3.5 rounded-xl border space-y-1.5 ${
                ex9ExactMatch
                  ? 'bg-emerald-50/75 border-emerald-300 text-emerald-950'
                  : ex9AccentCloseMatch
                  ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                  : 'bg-purple-50/70 border-purple-200 text-purple-950'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-bold text-sm text-[#241338]">
                  {ex9ExactMatch
                    ? 'Отлично! Перевод верный.'
                    : ex9AccentCloseMatch
                    ? 'Верно по смыслу и грамматике (обрати внимание на ударения):'
                    : 'Пример правильного перевода:'}
                </p>
                <AudioPlayButton text={ex9Item.correctSentence} variant="compact" />
              </div>
              <p className="font-semibold text-sm text-purple-950">✓ {ex9Item.correctSentence}</p>
              <p className="leading-relaxed opacity-90">{ex9Item.explanationRu}</p>
            </div>
          )}

          <ExerciseStepper
            currentIndex={ex9Index}
            total={EX7_TRANSLATE_SENTENCES.length}
            onChange={setEx9Index}
            statuses={ex9Statuses}
          />
        </div>
      </section>

      {/* Задание 10. Тексты (кликабельные слова + Verdadero/Falso со стрелочками) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-yellow-400 text-purple-950 flex items-center justify-center shrink-0">
              <BookText className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-[#241338]">
                10. Тексты
              </h2>
              <p className="text-sm text-purple-900/70">
                Нажимайте на любое слово в тексте, чтобы увидеть перевод и инфинитив глагола
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 p-1 bg-purple-100/75 border border-purple-200 rounded-xl w-fit">
            {LESSON_TEXTS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setActiveTextTab(t.id);
                  setTfIndex(0);
                  setTextPopover(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  activeTextTab === t.id
                    ? 'bg-white text-purple-950 shadow-sm'
                    : 'text-purple-900/70 hover:text-purple-950'
                }`}
              >
                {t.tabLabel}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-purple-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6 overflow-visible">
          <div ref={textBoxRef} className="relative space-y-4">
            <div className="flex items-center justify-between gap-3 border-b border-purple-100 pb-3">
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#241338]">
                {currentLessonText.title}
              </h3>
              {!currentLessonText.isDialogue && currentLessonText.paragraphEs && (
                <AudioPlayButton
                  text={currentLessonText.paragraphEs}
                  label="Слушать текст"
                  showSlowButton
                />
              )}
            </div>

            {currentLessonText.isDialogue && currentLessonText.dialogueLines ? (
              <div className="space-y-3">
                {currentLessonText.dialogueLines.map((line, lIdx) => (
                  <div
                    key={lIdx}
                    className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-purple-50/45 border border-purple-100"
                  >
                    <p className="text-sm sm:text-base leading-relaxed text-[#241338]">
                      <strong className="font-bold text-purple-800 mr-1.5">
                        {line.speaker}:
                      </strong>
                      {renderClickableText8(line.es, `t1-l${lIdx}`)}
                    </p>
                    <AudioPlayButton
                      text={line.es}
                      voiceName={lIdx % 2 === 0 ? 'Kore' : 'Puck'}
                      variant="compact"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-base sm:text-[17px] leading-[1.85] text-[#241338]">
                {renderClickableText8(currentLessonText.paragraphEs ?? '', 't2-p')}
              </p>
            )}

            {textPopover && (
              <div
                ref={textPopoverRef}
                role="dialog"
                aria-label={`Перевод слова ${textPopover.surface}`}
                style={{
                  left: `${textPopover.left}px`,
                  top: `${textPopover.top}px`,
                }}
                className="absolute z-30 w-[260px] sm:w-[280px] p-4 rounded-2xl bg-white border-2 border-purple-400 shadow-xl space-y-2.5"
              >
                <span
                  aria-hidden="true"
                  style={{ left: `${textPopover.arrowLeft - 6}px` }}
                  className="absolute -top-[7px] w-3 h-3 bg-white border-t-2 border-l-2 border-purple-400 rotate-45"
                />

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-display text-xl font-bold text-[#241338] leading-tight">
                      {textPopover.surface}
                    </h4>
                    <p className="text-[11px] text-purple-800/70 mt-0.5">
                      {textPopover.entry.pos}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 shrink-0">
                    <AudioPlayButton text={textPopover.surface} variant="compact" />
                    <button
                      type="button"
                      onClick={() => setTextPopover(null)}
                      aria-label="Закрыть перевод"
                      className="p-1.5 text-purple-400 hover:text-pink-600 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-yellow-50/90 border border-yellow-300">
                  <p className="text-sm font-bold text-[#241338]">{textPopover.entry.ru}</p>
                </div>

                <div className="text-xs text-purple-950/85 bg-purple-50/75 px-2.5 py-2 rounded-xl border border-purple-200/80">
                  {textPopover.entry.infinitiveRu ? (
                    <p>
                      Инфинитив:{' '}
                      <strong className="font-mono-code text-purple-800">
                        {textPopover.entry.lemma}
                      </strong>{' '}
                      <span className="text-purple-900/75">
                        ({textPopover.entry.infinitiveRu})
                      </span>
                    </p>
                  ) : (
                    <p>
                      Форма:{' '}
                      <strong className="font-mono-code text-purple-950">
                        {textPopover.entry.lemma}
                      </strong>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {currentTf && (
            <div className="pt-5 border-t border-purple-100 space-y-3">
              <h4 className="font-bold text-base text-[#241338]">
                Verdadero o Falso ({currentLessonText.tabLabel})
              </h4>

              <div className="p-4 rounded-xl bg-purple-50/40 border border-purple-200/80 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-sm sm:text-base font-semibold text-[#241338]">
                    {safeTfIndex + 1}. {currentTf.statementEs}
                  </p>
                  <div className="flex items-center gap-2 shrink-0">
                    {[
                      { val: true, label: 'Verdadero' },
                      { val: false, label: 'Falso' },
                    ].map((btn) => {
                      const isThis = tfChosen === btn.val;
                      const right = tfAnswered && btn.val === currentTf.isTrue;
                      const wrong = isThis && btn.val !== currentTf.isTrue;
                      return (
                        <button
                          key={String(btn.val)}
                          type="button"
                          onClick={() =>
                            setTfAnswers((p) => ({ ...p, [currentTf.id]: btn.val }))
                          }
                          className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                            right
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                              : wrong
                              ? 'bg-rose-50 border-rose-300 text-rose-950'
                              : 'bg-white border-purple-200 text-purple-900 hover:border-pink-400'
                          }`}
                        >
                          {btn.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {tfAnswered && (
                  <p
                    className={`text-xs p-3 rounded-lg border ${
                      tfIsCorrect
                        ? 'bg-emerald-50/75 border-emerald-200 text-emerald-900'
                        : 'bg-yellow-50 border-yellow-300 text-purple-950'
                    }`}
                  >
                    {currentTf.explanationRu}
                  </p>
                )}
              </div>

              <ExerciseStepper
                currentIndex={safeTfIndex}
                total={activeTfStatements.length}
                onChange={setTfIndex}
                statuses={tfStatuses}
              />
            </div>
          )}
        </div>
      </section>

      {/* Мини-тест (со стрелочками) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center shrink-0">
            <Trophy className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-[#241338]">
              Мини-тест: проверь себя
            </h2>
            <p className="text-sm text-purple-900/70">
              5 быстрых вопросов по всем правилам и ловушкам урока
            </p>
          </div>
        </div>

        <div className="bg-white border border-purple-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
          <p className="font-bold text-base sm:text-lg text-[#241338]">
            {currentTestQ.id}. {currentTestQ.question}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {currentTestQ.options.map((opt) => {
              const isThis = testChosen === opt.id;
              const right = Boolean(testChosen) && opt.id === currentTestQ.correctId;
              const wrong = isThis && opt.id !== currentTestQ.correctId;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTestAnswers((p) => ({ ...p, [currentTestQ.id]: opt.id }))}
                  className={`text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                    right
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                      : wrong
                      ? 'bg-rose-50 border-rose-300 text-rose-950'
                      : 'bg-purple-50/40 border-purple-200 text-[#241338] hover:border-pink-400'
                  }`}
                >
                  <span>{opt.label}</span>
                  {right && <Check className="w-4 h-4 text-emerald-700 shrink-0" />}
                  {wrong && <X className="w-4 h-4 text-rose-700 shrink-0" />}
                </button>
              );
            })}
          </div>

          {testChosen && (
            <p
              className={`text-xs p-3.5 rounded-xl border ${
                testIsCorrect
                  ? 'bg-emerald-50/75 border-emerald-200 text-emerald-900'
                  : 'bg-yellow-50 border-yellow-300 text-purple-950'
              }`}
            >
              {currentTestQ.explanationRu}
            </p>
          )}

          {miniTestDone && (
            <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-300 flex flex-wrap items-center justify-between gap-3">
              <p className="font-display text-lg font-bold text-[#241338]">
                Итог мини-теста: <span className="text-pink-600">{miniTestScore}</span> из{' '}
                {MINI_TEST_QUESTIONS.length}
              </p>
              <button
                type="button"
                onClick={() => {
                  setTestAnswers({});
                  setTestIndex(0);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-700 text-white text-xs font-bold hover:bg-purple-800 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Пройти ещё раз
              </button>
            </div>
          )}

          <ExerciseStepper
            currentIndex={testIndex}
            total={MINI_TEST_QUESTIONS.length}
            onChange={setTestIndex}
            statuses={testStatuses}
          />
        </div>
      </section>
    </div>
  );
};
