import React, { useState } from 'react';
import { Headphones, Users, Volume2, MessageCircleQuestion, Check, X } from 'lucide-react';
import {
  EX1_MINIMAL_PAIRS,
  CHARACTER_TAGS,
  EX2_CHARACTERS,
  LISTEN_MATCH_PICTURES,
  WHO_SAID_SPEAKERS,
  WHO_SAID_ITEMS,
} from '../data/lessonData';
import { AudioPlayButton } from './AudioPlayButton';
import { ExerciseStepper, type StepStatus } from './ExerciseStepper';

export const AudioAndHeroSection: React.FC = () => {
  const [ex1Index, setEx1Index] = useState(0);
  const [ex1Answers, setEx1Answers] = useState<Record<number, string>>({});

  const [ex2Index, setEx2Index] = useState(0);
  const [ex2Answers, setEx2Answers] = useState<Record<string, string>>({});

  const [ex3Index, setEx3Index] = useState(0);
  const [listenPicAnswers, setListenPicAnswers] = useState<Record<number, string>>({});

  const [ex4Index, setEx4Index] = useState(0);
  const [whoSaidAnswers, setWhoSaidAnswers] = useState<Record<number, string>>({});

  const ex1Current = EX1_MINIMAL_PAIRS[ex1Index];
  const ex1Chosen = ex1Answers[ex1Current.id];
  const ex1Correct = ex1Chosen === ex1Current.correctId;
  const ex1Statuses: StepStatus[] = EX1_MINIMAL_PAIRS.map((q) => {
    const a = ex1Answers[q.id];
    if (!a) return 'unanswered';
    return a === q.correctId ? 'correct' : 'wrong';
  });

  const ex2Current = EX2_CHARACTERS[ex2Index];
  const ex2Chosen = ex2Answers[ex2Current.id];
  const ex2Correct = ex2Chosen === ex2Current.correctTagId;
  const ex2Statuses: StepStatus[] = EX2_CHARACTERS.map((ch) => {
    const a = ex2Answers[ch.id];
    if (!a) return 'unanswered';
    return a === ch.correctTagId ? 'correct' : 'wrong';
  });

  const ex3Current = LISTEN_MATCH_PICTURES[ex3Index];
  const ex3Chosen = listenPicAnswers[ex3Current.id];
  const ex3Correct = ex3Chosen === ex3Current.correctOptionId;
  const ex3Statuses: StepStatus[] = LISTEN_MATCH_PICTURES.map((item) => {
    const a = listenPicAnswers[item.id];
    if (!a) return 'unanswered';
    return a === item.correctOptionId ? 'correct' : 'wrong';
  });

  const ex4Current = WHO_SAID_ITEMS[ex4Index];
  const ex4Chosen = whoSaidAnswers[ex4Current.id];
  const ex4Correct = ex4Chosen === ex4Current.correctSpeakerId;
  const ex4Statuses: StepStatus[] = WHO_SAID_ITEMS.map((item) => {
    const a = whoSaidAnswers[item.id];
    if (!a) return 'unanswered';
    return a === item.correctSpeakerId ? 'correct' : 'wrong';
  });

  return (
    <div className="space-y-12">
      {/* Задание 1. Послушай и выбери, какая фраза прозвучала */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center shrink-0">
            <Headphones className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-[#241338]">
              Задание 1. Послушай и выбери, какая фраза прозвучала
            </h2>
            <p className="text-sm text-purple-900/70">
              Варианты очень похожи и отличаются только временами из таблицы — послушай запись (есть
              режим 0.8×) и отметь точную фразу
            </p>
          </div>
        </div>

        <div className="bg-white border border-purple-200 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            <div className="md:col-span-5 aspect-[4/3] md:aspect-auto rounded-xl bg-purple-100 overflow-hidden">
              <img
                src={ex1Current.imageUrl}
                alt={ex1Current.imageAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div className="space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono-code font-bold text-purple-700 tabular-nums">
                    Аудио #{ex1Current.id} из {EX1_MINIMAL_PAIRS.length}
                  </span>
                  <AudioPlayButton
                    text={ex1Current.audioEs}
                    label="Слушать фразу"
                    showSlowButton
                  />
                </div>

                <div className="space-y-2.5">
                  {ex1Current.options.map((opt) => {
                    const isThis = ex1Chosen === opt.id;
                    const right = Boolean(ex1Chosen) && opt.id === ex1Current.correctId;
                    const wrong = isThis && opt.id !== ex1Current.correctId;

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setEx1Answers((p) => ({ ...p, [ex1Current.id]: opt.id }))
                        }
                        className={`w-full text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                          right
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                            : wrong
                            ? 'bg-rose-50 border-rose-300 text-rose-950'
                            : 'bg-purple-50/35 border-purple-200 text-[#241338] hover:border-pink-400 hover:bg-pink-50/40'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {right && <Check className="w-4 h-4 text-emerald-700 shrink-0" />}
                        {wrong && <X className="w-4 h-4 text-rose-700 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {ex1Chosen && (
                <div
                  className={`text-xs p-3.5 rounded-xl border leading-relaxed space-y-1 ${
                    ex1Correct
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : 'bg-yellow-50 border-yellow-300 text-purple-950'
                  }`}
                >
                  <p className="font-mono-code font-bold text-purple-800">
                    {ex1Current.formulaTag}
                  </p>
                  <p className="font-semibold text-[#241338]">{ex1Current.meaningRu}</p>
                  <p className="opacity-90">{ex1Current.explanationRu}</p>
                </div>
              )}
            </div>
          </div>

          <ExerciseStepper
            currentIndex={ex1Index}
            total={EX1_MINIMAL_PAIRS.length}
            onChange={setEx1Index}
            statuses={ex1Statuses}
          />
        </div>
      </section>

      {/* Задание 2. Кто о чём говорит? (перелистывание стрелочками, без подсказок) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-yellow-400 text-purple-950 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-[#241338]">
              Задание 2. Кто о чём говорит?
            </h2>
            <p className="text-sm text-purple-900/70">
              Прочитай или послушай реплику героя и подбери тип условной ситуации
            </p>
          </div>
        </div>

        <div className="bg-white border border-purple-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-xl font-bold text-[#241338]">{ex2Current.name}</h3>
            <AudioPlayButton text={ex2Current.quoteEs} label="Слушать" showSlowButton />
          </div>

          <p className="text-base sm:text-lg font-medium text-[#241338] bg-purple-50/60 p-4 rounded-xl border border-purple-100 leading-relaxed">
            «{ex2Current.quoteEs}»
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {CHARACTER_TAGS.map((tag) => {
              const isThis = ex2Chosen === tag.id;
              const right = Boolean(ex2Chosen) && tag.id === ex2Current.correctTagId;
              const wrong = isThis && tag.id !== ex2Current.correctTagId;

              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => setEx2Answers((p) => ({ ...p, [ex2Current.id]: tag.id }))}
                  className={`px-4 py-3 rounded-xl border text-xs sm:text-sm font-bold transition-colors text-left flex items-center justify-between gap-2 cursor-pointer ${
                    right
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                      : wrong
                      ? 'bg-rose-50 border-rose-300 text-rose-950'
                      : 'bg-white border-purple-200 text-purple-900 hover:border-pink-400 hover:bg-pink-50/40'
                  }`}
                >
                  <span>{tag.label}</span>
                  {right && <Check className="w-4 h-4 text-emerald-700 shrink-0" />}
                  {wrong && <X className="w-4 h-4 text-rose-700 shrink-0" />}
                </button>
              );
            })}
          </div>

          {ex2Chosen && (
            <p
              className={`text-xs p-3.5 rounded-xl border leading-relaxed ${
                ex2Correct
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  : 'bg-yellow-50 border-yellow-300 text-purple-950'
              }`}
            >
              {ex2Current.explanationRu}
            </p>
          )}

          <ExerciseStepper
            currentIndex={ex2Index}
            total={EX2_CHARACTERS.length}
            onChange={setEx2Index}
            statuses={ex2Statuses}
          />
        </div>
      </section>

      {/* Задание 3. Услышь предложение и выбери картинку (перелистывание стрелочками) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-pink-600 text-white flex items-center justify-center shrink-0">
            <Volume2 className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-[#241338]">
              Задание 3. Услышь предложение и выбери картинку
            </h2>
            <p className="text-sm text-purple-900/70">
              Послушай условное предложение на испанском и нажми на картинку, которая подходит по
              смыслу
            </p>
          </div>
        </div>

        <div className="bg-white border border-purple-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <span className="text-xs font-mono-code font-bold text-purple-800 tabular-nums">
              Аудио-ситуация #{ex3Current.id} из {LISTEN_MATCH_PICTURES.length}
            </span>
            <AudioPlayButton
              text={ex3Current.audioEs}
              label="Слушать предложение"
              showSlowButton
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {ex3Current.options.map((opt) => {
              const isThis = ex3Chosen === opt.id;
              const right = Boolean(ex3Chosen) && opt.id === ex3Current.correctOptionId;
              const wrong = isThis && opt.id !== ex3Current.correctOptionId;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() =>
                    setListenPicAnswers((p) => ({ ...p, [ex3Current.id]: opt.id }))
                  }
                  className={`group relative rounded-xl overflow-hidden border-2 transition-all text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 ${
                    right
                      ? 'border-emerald-500 ring-2 ring-emerald-200'
                      : wrong
                      ? 'border-rose-400 ring-2 ring-rose-200'
                      : 'border-purple-200 hover:border-pink-400'
                  }`}
                >
                  <div className="aspect-[4/3] w-full bg-purple-100 overflow-hidden">
                    <img
                      src={opt.imageUrl}
                      alt={opt.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                    />
                  </div>
                  {(right || wrong) && (
                    <div
                      className={`px-3 py-1.5 text-xs font-bold flex items-center justify-between gap-1 ${
                        right ? 'bg-emerald-50 text-emerald-900' : 'bg-rose-50 text-rose-900'
                      }`}
                    >
                      <span>{right ? 'Верно' : 'Не подходит'}</span>
                      {right ? (
                        <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-rose-700 shrink-0" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {ex3Chosen && (
            <div
              className={`text-xs p-3.5 rounded-xl border space-y-1 ${
                ex3Correct
                  ? 'bg-emerald-50/75 border-emerald-300 text-emerald-950'
                  : 'bg-yellow-50 border-yellow-300 text-purple-950'
              }`}
            >
              <p className="font-bold text-sm text-[#241338]">«{ex3Current.audioEs}»</p>
              <p className="leading-relaxed opacity-90">{ex3Current.explanationRu}</p>
            </div>
          )}

          <ExerciseStepper
            currentIndex={ex3Index}
            total={LISTEN_MATCH_PICTURES.length}
            onChange={setEx3Index}
            statuses={ex3Statuses}
          />
        </div>
      </section>

      {/* Задание 4. Кто это сказал? (говорящие на одном месте, мультяшные картинки, подписи только на испанском, фразы перелистываются) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center shrink-0">
            <MessageCircleQuestion className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-[#241338]">
              Задание 4. ¿Quién lo dijo?
            </h2>
            <p className="text-sm text-purple-900/70">
              Перелистывай аудиореплики и выбирай, кто из персонажей их произнёс
            </p>
          </div>
        </div>

        <div className="bg-white border border-purple-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
          {/* Зона текущей реплики */}
          <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-0.5">
              <p className="text-xs font-mono-code font-bold text-purple-700 tabular-nums">
                Реплика #{ex4Current.id} из {WHO_SAID_ITEMS.length}
              </p>
              <p className="text-sm font-semibold text-[#241338]">
                Послушай фразу и нажми на нужного персонажа ниже
              </p>
            </div>
            <AudioPlayButton
              text={ex4Current.audioEs}
              voiceName={ex4Current.voiceName}
              label="Слушать реплику"
              showSlowButton
            />
          </div>

          {/* Говорящие всегда остаются на одном месте — мультяшные картинки, только испанские подписи */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {WHO_SAID_SPEAKERS.map((speaker) => {
              const isThis = ex4Chosen === speaker.id;
              const right = Boolean(ex4Chosen) && speaker.id === ex4Current.correctSpeakerId;
              const wrong = isThis && speaker.id !== ex4Current.correctSpeakerId;

              return (
                <button
                  key={speaker.id}
                  type="button"
                  onClick={() =>
                    setWhoSaidAnswers((p) => ({ ...p, [ex4Current.id]: speaker.id }))
                  }
                  className={`group rounded-xl overflow-hidden border-2 transition-all text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 ${
                    right
                      ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-200'
                      : wrong
                      ? 'border-rose-400 bg-rose-50/60 ring-2 ring-rose-200'
                      : 'border-purple-200 bg-white hover:border-pink-400'
                  }`}
                >
                  <div className="aspect-[4/3] w-full bg-purple-50 overflow-hidden">
                    <img
                      src={speaker.imageUrl}
                      alt={speaker.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-200"
                    />
                  </div>
                  <div className="px-3 py-2.5 flex items-center justify-between gap-1.5">
                    <p className="text-sm font-bold text-[#241338] leading-tight">
                      {speaker.labelEs}
                    </p>
                    {right && <Check className="w-4 h-4 text-emerald-700 shrink-0" />}
                    {wrong && <X className="w-4 h-4 text-rose-700 shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>

          {ex4Chosen && (
            <div
              className={`text-xs p-3.5 rounded-xl border space-y-1 ${
                ex4Correct
                  ? 'bg-emerald-50/75 border-emerald-300 text-emerald-950'
                  : 'bg-yellow-50 border-yellow-300 text-purple-950'
              }`}
            >
              <p className="font-bold text-sm text-[#241338]">«{ex4Current.audioEs}»</p>
              <p className="leading-relaxed opacity-90">{ex4Current.explanationRu}</p>
            </div>
          )}

          <ExerciseStepper
            currentIndex={ex4Index}
            total={WHO_SAID_ITEMS.length}
            onChange={setEx4Index}
            statuses={ex4Statuses}
          />
        </div>
      </section>
    </div>
  );
};
