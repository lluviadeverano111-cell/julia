import {
  STATIC_AUDIO_BY_TEXT,
  STATIC_AUDIO_BY_VOICE,
  type AudioSpriteEntry,
} from '../data/audioManifest';

export interface SpeakOptions {
  voiceName?: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr';
  style?: string;
  rate?: number;
  onLoadingStart?: () => void;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (msg: string) => void;
}

let audioCtx: AudioContext | null = null;
let activeSource: AudioBufferSourceNode | null = null;
let activeGain: GainNode | null = null;
let activeHtmlAudio: HTMLAudioElement | null = null;
let activeHtmlTimer: number | null = null;
let currentRequestId = 0;

const decodedBufferCache = new Map<string, Promise<AudioBuffer>>();

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtxCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtxCtor) return null;
    audioCtx = new AudioCtxCtor();
  }
  return audioCtx;
}

function loadSpriteBuffer(src: string, ctx: AudioContext): Promise<AudioBuffer> {
  const existing = decodedBufferCache.get(src);
  if (existing) return existing;

  const promise = fetch(src)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status} loading ${src}`);
      return res.arrayBuffer();
    })
    .then((arrayBuf) => ctx.decodeAudioData(arrayBuf.slice(0)))
    .catch((err) => {
      decodedBufferCache.delete(src);
      throw err;
    });

  decodedBufferCache.set(src, promise);
  return promise;
}

export function stopSpanishSpeech(): void {
  currentRequestId += 1;

  if (activeSource) {
    try {
      activeSource.onended = null;
      activeSource.stop();
      activeSource.disconnect();
    } catch {
      // Ignore already-stopped source errors
    }
    activeSource = null;
  }

  if (activeGain) {
    try {
      activeGain.disconnect();
    } catch {
      // Ignore disconnect errors
    }
    activeGain = null;
  }

  if (activeHtmlTimer !== null) {
    window.clearTimeout(activeHtmlTimer);
    activeHtmlTimer = null;
  }

  if (activeHtmlAudio) {
    try {
      activeHtmlAudio.pause();
      activeHtmlAudio.onended = null;
      activeHtmlAudio.onerror = null;
    } catch {
      // Ignore audio pause errors
    }
    activeHtmlAudio = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore synthesis cancel errors
    }
  }
}

function pickBestSpanishVoice(
  voices: SpeechSynthesisVoice[],
  voiceName?: SpeakOptions['voiceName']
): SpeechSynthesisVoice | undefined {
  const esVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('es'));
  if (esVoices.length === 0) return undefined;

  const preferMale = voiceName === 'Puck' || voiceName === 'Charon' || voiceName === 'Fenrir';
  const maleHints = ['jorge', 'alvaro', 'álvaro', 'diego', 'pablo', 'carlos', 'raul', 'raúl', 'tomas', 'tomás', 'male'];
  const femaleHints = ['monica', 'mónica', 'elvira', 'helena', 'laura', 'lucia', 'lucía', 'paulina', 'conchita', 'female'];
  const qualityHints = ['natural', 'neural', 'google español', 'google spanish', 'premium', 'enhanced'];

  const score = (v: SpeechSynthesisVoice): number => {
    const name = v.name.toLowerCase();
    const lang = v.lang.toLowerCase();
    let s = 0;
    if (lang === 'es-es') s += 30;
    else if (lang.startsWith('es-es')) s += 25;
    else if (lang === 'es-mx' || lang === 'es-us') s += 15;
    else s += 10;

    if (qualityHints.some((h) => name.includes(h))) s += 40;
    if (preferMale && maleHints.some((h) => name.includes(h))) s += 20;
    if (!preferMale && femaleHints.some((h) => name.includes(h))) s += 20;
    if (!v.localService) s += 8;
    return s;
  };

  return [...esVoices].sort((a, b) => score(b) - score(a))[0];
}

async function fallbackBrowserSpeech(
  text: string,
  requestId: number,
  options?: SpeakOptions
): Promise<void> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    options?.onEnd?.();
    return;
  }

  let voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) {
    await new Promise<void>((resolve) => {
      const timer = window.setTimeout(resolve, 250);
      const onVoices = () => {
        window.clearTimeout(timer);
        window.speechSynthesis.removeEventListener?.('voiceschanged', onVoices);
        resolve();
      };
      window.speechSynthesis.addEventListener?.('voiceschanged', onVoices);
    });
    voices = window.speechSynthesis.getVoices();
  }

  if (requestId !== currentRequestId) {
    options?.onEnd?.();
    return;
  }

  try {
    const utterance = new SpeechSynthesisUtterance(text);
    const preferred = pickBestSpanishVoice(voices, options?.voiceName);
    if (preferred) utterance.voice = preferred;
    utterance.lang = preferred?.lang || 'es-ES';
    const requestedRate = options?.rate ?? 1;
    utterance.rate = requestedRate < 0.95 ? Math.max(0.65, requestedRate * 0.92) : 0.92;
    utterance.pitch = 1;
    utterance.onstart = () => {
      if (requestId === currentRequestId) options?.onStart?.();
    };
    utterance.onend = () => {
      if (requestId === currentRequestId) options?.onEnd?.();
    };
    utterance.onerror = () => {
      if (requestId === currentRequestId) options?.onEnd?.();
    };
    window.speechSynthesis.speak(utterance);
  } catch {
    options?.onEnd?.();
  }
}

async function playWithHtmlAudio(
  entry: AudioSpriteEntry,
  requestId: number,
  options?: SpeakOptions
): Promise<void> {
  const audio = new Audio(entry.src);
  const rate = options?.rate ?? 1;
  audio.playbackRate = rate;
  const pitchAware = audio as HTMLAudioElement & {
    preservesPitch?: boolean;
    mozPreservesPitch?: boolean;
    webkitPreservesPitch?: boolean;
  };
  pitchAware.preservesPitch = true;
  pitchAware.mozPreservesPitch = true;
  pitchAware.webkitPreservesPitch = true;
  activeHtmlAudio = audio;

  const padStart = Math.max(0, entry.start - 0.03);
  const rawDurationSec = Math.max(0.08, entry.end - padStart + 0.08);
  const durationMs = Math.max(100, Math.round((rawDurationSec / rate) * 1000));

  const finish = () => {
    if (activeHtmlTimer !== null) {
      window.clearTimeout(activeHtmlTimer);
      activeHtmlTimer = null;
    }
    if (activeHtmlAudio === audio) {
      try {
        audio.pause();
      } catch {
        // Ignore pause error
      }
      activeHtmlAudio = null;
    }
    if (requestId === currentRequestId) {
      options?.onEnd?.();
    }
  };

  audio.onerror = () => {
    if (requestId === currentRequestId) {
      options?.onError?.('Не удалось воспроизвести аудиофайл');
    }
    finish();
  };

  try {
    await new Promise<void>((resolve, reject) => {
      if (audio.readyState >= 1) {
        resolve();
        return;
      }
      audio.onloadedmetadata = () => resolve();
      audio.onerror = () => reject(new Error('Failed to load audio metadata'));
    });

    if (requestId !== currentRequestId) {
      options?.onEnd?.();
      return;
    }

    audio.currentTime = padStart;
    audio.playbackRate = rate;
    await audio.play();
    if (requestId !== currentRequestId) {
      audio.pause();
      return;
    }
    options?.onStart?.();
    activeHtmlTimer = window.setTimeout(finish, durationMs);
  } catch {
    finish();
  }
}

export async function speakSpanish(text: string, options?: SpeakOptions): Promise<void> {
  stopSpanishSpeech();
  const requestId = ++currentRequestId;

  const cleanText = text.trim();
  if (!cleanText) {
    options?.onEnd?.();
    return;
  }

  const voiceName = options?.voiceName ?? 'Kore';
  const entry =
    STATIC_AUDIO_BY_VOICE[`${voiceName}::${cleanText}`] ??
    STATIC_AUDIO_BY_TEXT[cleanText] ??
    STATIC_AUDIO_BY_TEXT[cleanText.toLowerCase()];

  if (!entry) {
    await fallbackBrowserSpeech(cleanText, requestId, options);
    return;
  }

  const rate = options?.rate ?? 1;

  // Use HTMLAudioElement with preservesPitch for slow playback so pitch stays natural and clear
  if (Math.abs(rate - 1) > 0.02) {
    await playWithHtmlAudio(entry, requestId, options);
    return;
  }

  const ctx = getAudioContext();
  if (!ctx) {
    await playWithHtmlAudio(entry, requestId, options);
    return;
  }

  const resumePromise = ctx.state === 'suspended' ? ctx.resume() : Promise.resolve();

  const isCached = decodedBufferCache.has(entry.src);
  if (!isCached) {
    options?.onLoadingStart?.();
  }

  try {
    const [, buffer] = await Promise.all([resumePromise, loadSpriteBuffer(entry.src, ctx)]);
    if (requestId !== currentRequestId) {
      options?.onEnd?.();
      return;
    }

    const padStart = Math.max(0, entry.start - 0.03);
    const maxAvail = Math.max(0.05, buffer.duration - padStart);
    const duration = Math.min(maxAvail, Math.max(0.05, entry.end - padStart + 0.08));

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    // Gentle high-presence clarity filter + click-free fade envelope
    const clarityFilter = ctx.createBiquadFilter();
    clarityFilter.type = 'peaking';
    clarityFilter.frequency.value = 3200;
    clarityFilter.Q.value = 1.0;
    clarityFilter.gain.value = 2.0;

    const gain = ctx.createGain();
    const now = ctx.currentTime;
    const fadeSec = Math.min(0.015, duration * 0.2);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(1.0, now + fadeSec);
    gain.gain.setValueAtTime(1.0, Math.max(now + fadeSec, now + duration - fadeSec));
    gain.gain.linearRampToValueAtTime(0.001, now + duration);

    source.connect(clarityFilter);
    clarityFilter.connect(gain);
    gain.connect(ctx.destination);

    source.onended = () => {
      if (activeSource === source) activeSource = null;
      if (activeGain === gain) activeGain = null;
      if (requestId === currentRequestId) {
        options?.onEnd?.();
      }
    };

    activeSource = source;
    activeGain = gain;
    options?.onStart?.();
    source.start(now, padStart, duration);
  } catch {
    if (requestId !== currentRequestId) {
      options?.onEnd?.();
      return;
    }
    await playWithHtmlAudio(entry, requestId, options);
  }
}
