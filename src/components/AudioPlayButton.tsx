import React, { useState } from 'react';
import { Volume2, Loader2, Square, Turtle } from 'lucide-react';
import { speakSpanish, stopSpanishSpeech, type SpeakOptions } from '../utils/speech';

interface AudioPlayButtonProps {
  text: string;
  label?: string;
  voiceName?: SpeakOptions['voiceName'];
  style?: string;
  variant?: 'default' | 'compact';
  showSlowButton?: boolean;
}

export const AudioPlayButton: React.FC<AudioPlayButtonProps> = ({
  text,
  label,
  voiceName = 'Kore',
  style,
  variant = 'default',
  showSlowButton = false,
}) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'playing'>('idle');
  const [activeMode, setActiveMode] = useState<'normal' | 'slow'>('normal');

  const triggerPlay = (e: React.MouseEvent<HTMLButtonElement>, mode: 'normal' | 'slow') => {
    e.stopPropagation();
    if ((status === 'playing' || status === 'loading') && activeMode === mode) {
      stopSpanishSpeech();
      setStatus('idle');
      return;
    }

    setActiveMode(mode);
    speakSpanish(text, {
      voiceName,
      style,
      rate: mode === 'slow' ? 0.8 : 1,
      onLoadingStart: () => setStatus('loading'),
      onStart: () => setStatus('playing'),
      onEnd: () => setStatus('idle'),
      onError: () => setStatus('idle'),
    });
  };

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={(e) => triggerPlay(e, 'normal')}
        aria-label={status === 'playing' ? 'Остановить озвучку' : `Прослушать: ${text}`}
        title={status === 'playing' ? 'Остановить' : 'Послушать'}
        className={`p-1.5 rounded-lg transition-colors shrink-0 cursor-pointer ${
          status === 'playing'
            ? 'bg-pink-600 text-white'
            : 'text-purple-700 hover:bg-purple-100 hover:text-purple-950'
        }`}
      >
        {status === 'loading' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : status === 'playing' ? (
          <Square className="w-3.5 h-3.5 fill-current" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </button>
    );
  }

  const isPlayingNormal = status === 'playing' && activeMode === 'normal';
  const isLoadingNormal = status === 'loading' && activeMode === 'normal';
  const isPlayingSlow = status === 'playing' && activeMode === 'slow';
  const isLoadingSlow = status === 'loading' && activeMode === 'slow';

  return (
    <div className="inline-flex items-center gap-1.5 shrink-0">
      <button
        type="button"
        onClick={(e) => triggerPlay(e, 'normal')}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
          isPlayingNormal
            ? 'bg-pink-600 text-white'
            : 'bg-purple-100 text-purple-900 hover:bg-purple-200'
        }`}
      >
        {isLoadingNormal ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : isPlayingNormal ? (
          <Square className="w-3.5 h-3.5 fill-current" />
        ) : (
          <Volume2 className="w-3.5 h-3.5" />
        )}
        <span>{isPlayingNormal ? 'Стоп' : label ?? 'Слушать'}</span>
      </button>

      {showSlowButton && (
        <button
          type="button"
          onClick={(e) => triggerPlay(e, 'slow')}
          title="Послушать медленно и чётко (0.8×)"
          aria-label="Послушать медленно и чётко"
          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
            isPlayingSlow
              ? 'bg-pink-600 border-pink-600 text-white'
              : 'bg-yellow-50 border-yellow-300 text-purple-950 hover:bg-yellow-100'
          }`}
        >
          {isLoadingSlow ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : isPlayingSlow ? (
            <Square className="w-3 h-3 fill-current" />
          ) : (
            <Turtle className="w-3.5 h-3.5" />
          )}
          <span>{isPlayingSlow ? 'Стоп' : '0.8×'}</span>
        </button>
      )}
    </div>
  );
};
