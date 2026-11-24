import React, { useState, useEffect, useRef } from 'react';
import {
  ExternalLink,
  Music,
  Globe2,
  Check,
  X,
  Eye,
  BookOpen,
  Sparkles,
  MessageSquareQuote,
  GitBranch,
} from 'lucide-react';
import {
  SHAKIRA_SONG,
  SONG_WORD_DICTIONARY,
  SONG_NEW_VOCABULARY,
  SONG_IDIOMS_QUIZ,
  SONG_VOCAB_CLOZE,
  SONG_CONDITIONALS_EXERCISES,
  PERU_HERO,
  PERU_PARAGRAPHS,
  PERU_WORD_DICTIONARY,
  PERU_COMPREHENSION,
  type WordEntry,
} from '../data/mediaAndReadingData';
import { stopSpanishSpeech } from '../utils/speech';
import { AudioPlayButton } from './AudioPlayButton';
import { ExerciseStepper, type StepStatus } from './ExerciseStepper';

interface WordPopoverState {
  tokenId: string;
  surface: string;
  key: string;
  entry: WordEntry;
  left: number;
  top: number;
  arrowLeft: number;
}

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

export const MediaReadingPage: React.FC = () => {
  const [songWordPopover, setSongWordPopover] = useState<WordPopoverState | null>(null);
  const lyricsBoxRef = useRef<HTMLDivElement | null>(null);
  const songPopoverRef = useRef<HTMLDivElement | null>(null);

  const [peruWordPopover, setPeruWordPopover] = useState<WordPopoverState | null>(null);
  const peruBoxRef = useRef<HTMLDivElement | null>(null);
  const peruPopoverRef = useRef<HTMLDivElement | null>(null);
  const [showPeruRu, setShowPeruRu] = useState<boolean>(false);
  const [peruQuizAnswers, setPeruQuizAnswers] = useState<Record<number, string>>({});

  // Post-song exercises state
  const [showSongVocab, setShowSongVocab] = useState<boolean>(false);
  const [idiomStep, setIdiomStep] = useState<number>(0);
  const [idiomAnswers, setIdiomAnswers] = useState<Record<number, string>>({});
  const [vocabStep, setVocabStep] = useState<number>(0);
  const [vocabAnswers, setVocabAnswers] = useState<Record<number, string>>({});
  const [condStep, setCondStep] = useState<number>(0);
  const [condAnswers, setCondAnswers] = useState<Record<number, string>>({});

  const idiomStatuses: StepStatus[] = SONG_IDIOMS_QUIZ.map((item) => {
    const ans = idiomAnswers[item.id];
    if (!ans) return 'unanswered';
    return ans === item.correctId ? 'correct' : 'wrong';
  });

  const vocabStatuses: StepStatus[] = SONG_VOCAB_CLOZE.map((item) => {
    const ans = vocabAnswers[item.id];
    if (!ans) return 'unanswered';
    return ans === item.correctId ? 'correct' : 'wrong';
  });

  const condStatuses: StepStatus[] = SONG_CONDITIONALS_EXERCISES.map((item) => {
    const ans = condAnswers[item.id];
    if (!ans) return 'unanswered';
    return ans === item.correctId ? 'correct' : 'wrong';
  });

  const currentIdiom = SONG_IDIOMS_QUIZ[idiomStep];
  const currentVocab = SONG_VOCAB_CLOZE[vocabStep];
  const currentCond = SONG_CONDITIONALS_EXERCISES[condStep];

  useEffect(() => {
    return () => {
      stopSpanishSpeech();
    };
  }, []);

  useEffect(() => {
    if (!songWordPopover && !peruWordPopover) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (
        songWordPopover &&
        !songPopoverRef.current?.contains(target) &&
        !target.closest('[data-song-word-btn="true"]')
      ) {
        setSongWordPopover(null);
      }

      if (
        peruWordPopover &&
        !peruPopoverRef.current?.contains(target) &&
        !target.closest('[data-peru-word-btn="true"]')
      ) {
        setPeruWordPopover(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSongWordPopover(null);
        setPeruWordPopover(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [songWordPopover, peruWordPopover]);

  const handleSongWordClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    rawWord: string,
    tokenId: string
  ) => {
    const key = cleanWordKey(rawWord);
    if (!key) return;

    if (songWordPopover?.tokenId === tokenId) {
      setSongWordPopover(null);
      return;
    }

    const entry: WordEntry = SONG_WORD_DICTIONARY[key] ?? {
      lemma: key,
      pos: 'слово',
      ru: 'Перевод не найден',
    };

    const boxEl = lyricsBoxRef.current;
    if (!boxEl) return;

    const pos = computePopoverPosition(event.currentTarget, boxEl);
    setPeruWordPopover(null);
    setSongWordPopover({
      tokenId,
      surface: rawWord,
      key,
      entry,
      ...pos,
    });
  };

  const renderClickableSongLine = (text: string, lineId: string) => {
    const tokens = text.split(/([A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)/g);

    return tokens.map((token, idx) => {
      const isWord = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+$/.test(token);
      if (!isWord) {
        return <React.Fragment key={idx}>{token}</React.Fragment>;
      }

      const tokenId = `${lineId}-${idx}`;
      const isSelected = songWordPopover?.tokenId === tokenId;

      return (
        <button
          key={idx}
          type="button"
          data-song-word-btn="true"
          onClick={(e) => handleSongWordClick(e, token, tokenId)}
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

  const handlePeruWordClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    rawWord: string,
    tokenId: string
  ) => {
    const key = cleanWordKey(rawWord);
    if (!key) return;

    if (peruWordPopover?.tokenId === tokenId) {
      setPeruWordPopover(null);
      return;
    }

    const entry: WordEntry = PERU_WORD_DICTIONARY[key] ?? {
      lemma: key,
      pos: 'слово',
      ru: 'См. перевод абзаца ниже',
    };

    const boxEl = peruBoxRef.current;
    if (!boxEl) return;

    const pos = computePopoverPosition(event.currentTarget, boxEl);
    setSongWordPopover(null);
    setPeruWordPopover({
      tokenId,
      surface: rawWord,
      key,
      entry,
      ...pos,
    });
  };

  const renderClickableParagraph = (text: string, paragraphId: string) => {
    const tokens = text.split(/([A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)/g);

    return tokens.map((token, idx) => {
      const isWord = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+$/.test(token);
      if (!isWord) {
        return <React.Fragment key={idx}>{token}</React.Fragment>;
      }

      const tokenId = `${paragraphId}-${idx}`;
      const key = cleanWordKey(token);
      const dictEntry = PERU_WORD_DICTIONARY[key];
      const isSelected = peruWordPopover?.tokenId === tokenId;
      const isCondMarker = dictEntry?.isConditionalMarker;

      return (
        <button
          key={idx}
          type="button"
          data-peru-word-btn="true"
          onClick={(e) => handlePeruWordClick(e, token, tokenId)}
          className={`inline px-0.5 rounded transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 ${
            isSelected
              ? 'bg-yellow-300 text-purple-950 font-bold'
              : isCondMarker
              ? 'underline decoration-purple-600 decoration-2 underline-offset-4 hover:bg-pink-100 text-[#241338] font-semibold'
              : 'hover:bg-pink-100/70 hover:text-[#241338]'
          }`}
        >
          {token}
        </button>
      );
    });
  };

  const renderWordPopover = (
    popover: WordPopoverState,
    refObj: React.RefObject<HTMLDivElement | null>,
    onClose: () => void
  ) => (
    <div
      ref={refObj}
      role="dialog"
      aria-label={`Перевод слова ${popover.surface}`}
      style={{
        left: `${popover.left}px`,
        top: `${popover.top}px`,
      }}
      className="absolute z-30 w-[260px] sm:w-[280px] p-4 rounded-2xl bg-white border-2 border-purple-400 shadow-xl space-y-2.5"
    >
      <span
        aria-hidden="true"
        style={{ left: `${popover.arrowLeft - 6}px` }}
        className="absolute -top-[7px] w-3 h-3 bg-white border-t-2 border-l-2 border-purple-400 rotate-45"
      />

      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="font-display text-xl font-bold text-[#241338] leading-tight">
            {popover.surface}
          </h4>
          <p className="text-[11px] text-purple-800/70 mt-0.5">{popover.entry.pos}</p>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          <AudioPlayButton text={popover.surface} variant="compact" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть перевод"
            className="p-1.5 text-purple-400 hover:text-pink-600 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-yellow-50/90 border border-yellow-300">
        <p className="text-sm font-bold text-[#241338]">{popover.entry.ru}</p>
      </div>

      <div className="text-xs text-purple-950/85 bg-purple-50/75 px-2.5 py-2 rounded-xl border border-purple-200/80">
        {popover.entry.infinitiveRu ? (
          <p>
            Инфинитив:{' '}
            <strong className="font-mono-code text-purple-800">{popover.entry.lemma}</strong>{' '}
            <span className="text-purple-900/75">({popover.entry.infinitiveRu})</span>
          </p>
        ) : (
          <p>
            Форма:{' '}
            <strong className="font-mono-code text-purple-950">{popover.entry.lemma}</strong>
          </p>
        )}
      </div>

      {popover.entry.note && (
        <p
          className={`text-[11px] leading-relaxed px-2.5 py-2 rounded-xl border ${
            popover.entry.isConditionalMarker
              ? 'bg-pink-50 border-pink-200 text-pink-950 font-semibold'
              : 'bg-purple-50/50 border-purple-200 text-purple-900/75'
          }`}
        >
          {popover.entry.note}
        </p>
      )}
    </div>
  );

  return (
    <div id="media-peru-section" className="space-y-10 pt-2">
      {/* SECTION 1: SONG — «Si te vas» — Shakira */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center shrink-0">
            <Music className="w-4 h-4" aria-hidden="true" />
          </div>
          <h3 className="font-display text-2xl font-bold text-[#241338]">
            «{SHAKIRA_SONG.title}» — {SHAKIRA_SONG.artist}
          </h3>
        </div>

        <div className="bg-white border border-purple-200 rounded-2xl p-5 sm:p-6 shadow-sm overflow-visible">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-2.5">
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-[#1E0F30] border border-purple-200 shadow-sm">
                <iframe
                  src={SHAKIRA_SONG.youtubeEmbedUrl}
                  title={`${SHAKIRA_SONG.title} — ${SHAKIRA_SONG.artist}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="flex items-center justify-between text-xs text-purple-900/65 px-0.5">
                <span className="font-mono-code">{SHAKIRA_SONG.year}</span>
                <a
                  href={SHAKIRA_SONG.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-pink-700 hover:text-pink-800 underline underline-offset-4"
                >
                  <span>Открыть на YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div
              ref={lyricsBoxRef}
              className="lg:col-span-7 relative rounded-2xl bg-purple-50/45 border border-purple-200/80 p-5 sm:p-6 space-y-5"
            >
              <p className="text-xs font-semibold text-purple-800/75">
                Нажимайте на слова в тексте, чтобы открыть перевод рядом со словом
              </p>

              <div className="space-y-5">
                {SHAKIRA_SONG.stanzas.map((stanza, sIdx) => (
                  <div
                    key={sIdx}
                    className="space-y-1.5 pb-4 border-b border-purple-200/60 last:border-b-0 last:pb-0"
                  >
                    {stanza.map((lineText, lIdx) => (
                      <p
                        key={`${sIdx}-${lIdx}`}
                        className="text-base sm:text-[17px] leading-[1.75] text-[#241338]"
                      >
                        {renderClickableSongLine(lineText, `s${sIdx}-l${lIdx}`)}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              {songWordPopover &&
                renderWordPopover(songWordPopover, songPopoverRef, () => setSongWordPopover(null))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1.5: POST-SONG EXERCISES (IDIOMS, 25 NEW WORDS & CONDITIONALS) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-pink-600 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#241338]">
              Упражнения к песне «Si te vas»
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setShowSongVocab((v) => !v)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-purple-950 bg-yellow-200/80 border border-yellow-400 rounded-xl hover:bg-yellow-300/80 transition-colors cursor-pointer self-start sm:self-center"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>
              {showSongVocab ? 'Скрыть словарь (25 слов)' : 'Словарь новых слов (25)'}
            </span>
          </button>
        </div>

        {showSongVocab && (
          <div className="bg-white border border-yellow-300 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-display text-lg font-bold text-[#241338]">
                Новые слова из песни
              </h4>
              <span className="text-xs font-mono-code font-bold text-purple-800/75">
                {SONG_NEW_VOCABULARY.length} слов
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {SONG_NEW_VOCABULARY.map((word) => (
                <div
                  key={word.id}
                  className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-purple-50/55 border border-purple-200/80"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#241338] leading-snug">
                      {word.es}{' '}
                      <span className="text-[11px] font-normal text-purple-800/65">
                        ({word.pos})
                      </span>
                    </p>
                    <p className="text-xs text-purple-950/80 leading-snug">{word.ru}</p>
                  </div>
                  <AudioPlayButton text={word.es.replace(/\s*\(.*?\)/g, '')} variant="compact" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* POST-SONG EX 1: ФРАЗЕОЛОГИЗМЫ ИЗ ПЕСНИ */}
        <div className="bg-white border border-purple-200 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                <MessageSquareQuote className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-display text-lg sm:text-xl font-bold text-[#241338]">
                  Упражнение 1 · Фразеологизмы из песни
                </h4>
                <p className="text-xs text-purple-900/70">
                  Выбери точное значение устойчивого выражения из «Si te vas»
                </p>
              </div>
            </div>
            <span className="text-xs font-mono-code font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-lg tabular-nums shrink-0">
              {Object.entries(idiomAnswers).filter(([id, val]) => {
                const q = SONG_IDIOMS_QUIZ.find((item) => item.id === Number(id));
                return q && q.correctId === val;
              }).length}
              /{SONG_IDIOMS_QUIZ.length}
            </span>
          </div>

          {(() => {
            const chosen = idiomAnswers[currentIdiom.id];
            const isCorrect = chosen === currentIdiom.correctId;

            return (
              <div className="space-y-4">
                <div className="p-4 sm:p-5 rounded-xl bg-purple-50/55 border border-purple-200/80 space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-display text-lg sm:text-xl font-bold text-purple-950">
                      «{currentIdiom.expression}»
                    </p>
                    <AudioPlayButton text={currentIdiom.contextEs} variant="compact" />
                  </div>
                  <p className="text-sm sm:text-base italic text-purple-950/85 leading-relaxed">
                    {currentIdiom.contextEs}
                  </p>
                </div>

                <p className="text-sm sm:text-base font-bold text-[#241338]">
                  {currentIdiom.id}. {currentIdiom.question}
                </p>

                <div className="space-y-2">
                  {currentIdiom.options.map((opt) => {
                    const isThis = chosen === opt.id;
                    const right = Boolean(chosen) && opt.id === currentIdiom.correctId;
                    const wrong = isThis && opt.id !== currentIdiom.correctId;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setIdiomAnswers((prev) => ({ ...prev, [currentIdiom.id]: opt.id }))
                        }
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-semibold transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                          right
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                            : wrong
                            ? 'bg-rose-50 border-rose-300 text-rose-950'
                            : 'bg-white border-purple-200 text-[#241338] hover:border-pink-400 hover:bg-pink-50/40'
                        }`}
                      >
                        <span>
                          <span className="font-mono-code text-xs font-bold text-purple-700 mr-2 uppercase">
                            {opt.id})
                          </span>
                          {opt.label}
                        </span>
                        {right && <Check className="w-4 h-4 text-emerald-700 shrink-0" />}
                        {wrong && <X className="w-4 h-4 text-rose-700 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {chosen && (
                  <div
                    className={`p-3.5 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                      isCorrect
                        ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                        : 'bg-yellow-50/90 border-yellow-300 text-purple-950'
                    }`}
                  >
                    {currentIdiom.explanation}
                  </div>
                )}

                <ExerciseStepper
                  currentIndex={idiomStep}
                  total={SONG_IDIOMS_QUIZ.length}
                  onChange={setIdiomStep}
                  statuses={idiomStatuses}
                />
              </div>
            );
          })()}
        </div>

        {/* POST-SONG EX 2: НОВЫЕ СЛОВА В КОНТЕКСТЕ */}
        <div className="bg-white border border-pink-200 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-display text-lg sm:text-xl font-bold text-[#241338]">
                  Упражнение 2 · Новые слова из песни в контексте
                </h4>
                <p className="text-xs text-purple-900/70">
                  Вставь подходящее слово из лексики песни по смыслу
                </p>
              </div>
            </div>
            <span className="text-xs font-mono-code font-bold text-pink-700 bg-pink-50 border border-pink-200 px-2.5 py-1 rounded-lg tabular-nums shrink-0">
              {Object.entries(vocabAnswers).filter(([id, val]) => {
                const q = SONG_VOCAB_CLOZE.find((item) => item.id === Number(id));
                return q && q.correctId === val;
              }).length}
              /{SONG_VOCAB_CLOZE.length}
            </span>
          </div>

          {(() => {
            const chosen = vocabAnswers[currentVocab.id];
            const isCorrect = chosen === currentVocab.correctId;
            const chosenOption = currentVocab.options.find((o) => o.id === chosen);
            const correctOption = currentVocab.options.find((o) => o.id === currentVocab.correctId);

            return (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                  <div className="md:col-span-5">
                    <div className="aspect-[4/3] w-full rounded-xl overflow-hidden border border-pink-200/90 bg-purple-50 shadow-sm">
                      <img
                        key={currentVocab.id}
                        src={currentVocab.imageUrl}
                        alt={currentVocab.imageAlt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-4">
                    <div className="p-4 sm:p-5 rounded-xl bg-pink-50/45 border border-pink-200/80">
                      <p className="text-base sm:text-lg font-semibold text-[#241338] leading-relaxed">
                        <span className="font-mono-code text-xs font-bold text-pink-700 mr-2">
                          {currentVocab.id}.
                        </span>
                        {currentVocab.sentenceBefore}
                        <span
                          className={`inline-block px-2.5 py-0.5 mx-1 rounded-lg border font-bold ${
                            !chosen
                              ? 'bg-white border-dashed border-purple-400 text-purple-700 min-w-[92px] text-center'
                              : isCorrect
                              ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                              : 'bg-rose-100 border-rose-400 text-rose-950'
                          }`}
                        >
                          {chosenOption ? chosenOption.label : '______'}
                        </span>
                        {currentVocab.sentenceAfter}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {currentVocab.options.map((opt) => {
                        const isThis = chosen === opt.id;
                        const right = Boolean(chosen) && opt.id === currentVocab.correctId;
                        const wrong = isThis && opt.id !== currentVocab.correctId;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() =>
                              setVocabAnswers((prev) => ({ ...prev, [currentVocab.id]: opt.id }))
                            }
                            className={`px-4 py-3 rounded-xl border text-sm font-bold transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                              right
                                ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                                : wrong
                                ? 'bg-rose-50 border-rose-300 text-rose-950'
                                : 'bg-white border-purple-200 text-[#241338] hover:border-pink-400 hover:bg-pink-50/40'
                            }`}
                          >
                            <span>
                              <span className="font-mono-code text-xs text-purple-700 mr-1.5 uppercase">
                                {opt.id})
                              </span>
                              {opt.label}
                            </span>
                            {right && <Check className="w-4 h-4 text-emerald-700 shrink-0" />}
                            {wrong && <X className="w-4 h-4 text-rose-700 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {chosen && (
                      <div
                        className={`p-4 rounded-xl border space-y-2 ${
                          isCorrect
                            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                            : 'bg-yellow-50/90 border-yellow-300 text-purple-950'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-xs sm:text-sm font-bold">
                            {isCorrect
                              ? 'Верно!'
                              : `Правильный вариант: «${correctOption?.label ?? ''}»`}
                          </p>
                          <AudioPlayButton text={currentVocab.fullSentenceEs} variant="compact" />
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed">
                          {currentVocab.ruTranslation}
                        </p>
                        <p className="text-xs text-purple-900/80 pt-1 border-t border-purple-200/60">
                          {currentVocab.vocabNote}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <ExerciseStepper
                  currentIndex={vocabStep}
                  total={SONG_VOCAB_CLOZE.length}
                  onChange={setVocabStep}
                  statuses={vocabStatuses}
                />
              </div>
            );
          })()}
        </div>

        {/* POST-SONG EX 3: УСЛОВНЫЕ ПРЕДЛОЖЕНИЯ ИЗ ПЕСНИ */}
        <div className="bg-white border border-purple-200 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-yellow-300 text-purple-950 flex items-center justify-center shrink-0">
                <GitBranch className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-display text-lg sm:text-xl font-bold text-[#241338]">
                  Упражнение 3 · Условные предложения из песни
                </h4>
                <p className="text-xs text-purple-900/70">
                  Выбери правильную форму глагола в условных конструкциях (si + indicativo)
                </p>
              </div>
            </div>
            <span className="text-xs font-mono-code font-bold text-purple-900 bg-yellow-100 border border-yellow-300 px-2.5 py-1 rounded-lg tabular-nums shrink-0">
              {Object.entries(condAnswers).filter(([id, val]) => {
                const q = SONG_CONDITIONALS_EXERCISES.find((item) => item.id === Number(id));
                return q && q.correctId === val;
              }).length}
              /{SONG_CONDITIONALS_EXERCISES.length}
            </span>
          </div>

          {(() => {
            const chosen = condAnswers[currentCond.id];
            const isCorrect = chosen === currentCond.correctId;
            const chosenOption = currentCond.options.find((o) => o.id === chosen);
            const correctOption = currentCond.options.find((o) => o.id === currentCond.correctId);

            return (
              <div className="space-y-4">
                <div className="p-4 sm:p-5 rounded-xl bg-purple-50/55 border border-purple-200/80">
                  <p className="text-base sm:text-lg font-semibold text-[#241338] leading-relaxed">
                    <span className="font-mono-code text-xs font-bold text-purple-700 mr-2">
                      {currentCond.id}.
                    </span>
                    {currentCond.sentenceBefore}
                    <span
                      className={`inline-block px-2.5 py-0.5 mx-1 rounded-lg border font-bold ${
                        !chosen
                          ? 'bg-white border-dashed border-purple-400 text-purple-700 min-w-[100px] text-center'
                          : isCorrect
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                          : 'bg-rose-100 border-rose-400 text-rose-950'
                      }`}
                    >
                      {chosenOption ? chosenOption.label : '______'}
                    </span>
                    {currentCond.sentenceAfter}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {currentCond.options.map((opt) => {
                    const isThis = chosen === opt.id;
                    const right = Boolean(chosen) && opt.id === currentCond.correctId;
                    const wrong = isThis && opt.id !== currentCond.correctId;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setCondAnswers((prev) => ({ ...prev, [currentCond.id]: opt.id }))
                        }
                        className={`px-4 py-3 rounded-xl border text-sm font-bold transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                          right
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                            : wrong
                            ? 'bg-rose-50 border-rose-300 text-rose-950'
                            : 'bg-white border-purple-200 text-[#241338] hover:border-pink-400 hover:bg-pink-50/40'
                        }`}
                      >
                        <span>
                          <span className="font-mono-code text-xs text-purple-700 mr-1.5 uppercase">
                            {opt.id})
                          </span>
                          {opt.label}
                        </span>
                        {right && <Check className="w-4 h-4 text-emerald-700 shrink-0" />}
                        {wrong && <X className="w-4 h-4 text-rose-700 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {chosen && (
                  <div
                    className={`p-4 rounded-xl border space-y-2 ${
                      isCorrect
                        ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                        : 'bg-yellow-50/90 border-yellow-300 text-purple-950'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold">
                          {isCorrect
                            ? 'Верно!'
                            : `Правильная форма: «${correctOption?.label ?? ''}»`}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-white/90 border border-purple-200 text-[11px] font-mono-code font-bold text-purple-900">
                          {currentCond.formula}
                        </span>
                      </div>
                      <AudioPlayButton text={currentCond.fullSentenceEs} variant="compact" />
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed">{currentCond.explanation}</p>
                  </div>
                )}

                <ExerciseStepper
                  currentIndex={condStep}
                  total={SONG_CONDITIONALS_EXERCISES.length}
                  onChange={setCondStep}
                  statuses={condStatuses}
                />
              </div>
            );
          })()}
        </div>
      </section>

      {/* SECTION 2: CLICKABLE PERU TEXT (ДЗ) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="w-8 h-8 rounded-xl bg-yellow-400 text-purple-950 flex items-center justify-center shrink-0">
              <Globe2 className="w-4 h-4" aria-hidden="true" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#241338]">Текст о Перу</h3>
            <span className="px-2.5 py-0.5 rounded-lg bg-yellow-300 border border-yellow-400 text-purple-950 text-xs font-extrabold tracking-wide uppercase">
              ДЗ
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowPeruRu((v) => !v)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-purple-900 bg-purple-100/80 rounded-xl hover:bg-purple-200/80 transition-colors cursor-pointer self-start sm:self-center"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showPeruRu ? 'Скрыть перевод абзацев' : 'Показать перевод абзацев'}</span>
          </button>
        </div>

        <div className="bg-white border border-pink-200 rounded-2xl shadow-sm overflow-visible">
          <div className="relative h-52 sm:h-64 bg-[#1E0F30] rounded-t-2xl overflow-hidden">
            <img
              src={PERU_HERO.imageUrl}
              alt={PERU_HERO.imageAlt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E0F30]/90 via-[#1E0F30]/35 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 text-white">
              <p className="text-xs font-semibold text-yellow-300">{PERU_HERO.subtitle}</p>
              <h4 className="font-display text-2xl sm:text-3xl font-bold mt-1">
                Perú: si viajas por los Andes, descubrirás otro tiempo
              </h4>
            </div>
          </div>

          <div ref={peruBoxRef} className="relative p-5 sm:p-7 space-y-6">
            {PERU_PARAGRAPHS.map((para, pIdx) => (
              <article
                key={para.id}
                className="space-y-2.5 pb-5 border-b border-purple-100 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h5 className="font-display text-lg font-bold text-[#241338]">
                      {pIdx + 1}. {para.titleEs}
                    </h5>
                    {showPeruRu && (
                      <p className="text-xs text-purple-900/65 mt-0.5">{para.titleRu}</p>
                    )}
                  </div>
                  <AudioPlayButton
                    text={para.es}
                    voiceName="Kore"
                    style="Engaging, warm Spanish documentary narrator"
                    variant="compact"
                  />
                </div>

                <p className="text-base sm:text-[17px] leading-[1.85] text-[#241338]">
                  {renderClickableParagraph(para.es, para.id)}
                </p>

                {showPeruRu && (
                  <p className="text-sm text-purple-950/80 leading-relaxed bg-yellow-50/70 p-3.5 rounded-xl border border-yellow-300/80">
                    {para.ru}
                  </p>
                )}
              </article>
            ))}

            {peruWordPopover &&
              renderWordPopover(peruWordPopover, peruPopoverRef, () => setPeruWordPopover(null))}
          </div>

          <div className="px-5 sm:px-7 py-5 bg-purple-50/55 border-t border-purple-100 rounded-b-2xl space-y-4">
            <h4 className="font-bold text-base text-[#241338]">Проверка понимания текста</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PERU_COMPREHENSION.map((q) => {
                const chosen = peruQuizAnswers[q.id];
                const isCorrect = chosen === q.correctId;
                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl bg-white border border-purple-200/80 flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-2.5">
                      <p className="text-sm font-bold text-[#241338] leading-snug">
                        {q.id}. {q.question}
                      </p>
                      <div className="space-y-1.5">
                        {q.options.map((opt) => {
                          const isThis = chosen === opt.id;
                          const right = Boolean(chosen) && opt.id === q.correctId;
                          const wrong = isThis && opt.id !== q.correctId;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() =>
                                setPeruQuizAnswers((p) => ({ ...p, [q.id]: opt.id }))
                              }
                              className={`w-full text-left px-3 py-2 rounded-lg border text-xs font-semibold transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                                right
                                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                                  : wrong
                                  ? 'bg-rose-50 border-rose-300 text-rose-950'
                                  : 'bg-purple-50/40 border-purple-200/80 text-[#241338] hover:border-pink-300 hover:bg-pink-50/50'
                              }`}
                            >
                              <span>{opt.label}</span>
                              {right && <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />}
                              {wrong && <X className="w-3.5 h-3.5 text-rose-700 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    {chosen && (
                      <p
                        className={`text-xs p-2.5 rounded-lg border leading-relaxed ${
                          isCorrect
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                            : 'bg-yellow-50/80 border-yellow-300 text-purple-950'
                        }`}
                      >
                        {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
