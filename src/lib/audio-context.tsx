'use client';

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { SoundControl, AudioPlayer } from '@/lib/types';
import { SOUNDS } from '@/lib/constants';

interface AudioContextType {
  currentMix: SoundControl[];
  audioPlayer: AudioPlayer;
  isTimerActive: boolean;
  timerDuration: number;
  timeRemaining: number;
  
  // Controles de som
  addSoundToMix: (soundId: string) => void;
  removeSoundFromMix: (soundId: string) => void;
  updateSoundControl: (soundId: string, updates: Partial<SoundControl>) => void;
  clearMix: () => void;
  
  // Controles de reprodução
  playMix: () => void;
  pauseMix: () => void;
  stopMix: () => void;
  setVolume: (volume: number) => void;
  
  // Timer
  startTimer: (minutes: number) => void;
  stopTimer: () => void;
  
  // TTS
  generateVoice: (text: string, voice: string) => Promise<string>;
  playGeneratedAudio: (audioUrl: string) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentMix, setCurrentMix] = useState<SoundControl[]>([]);
  const [audioPlayer, setAudioPlayer] = useState<AudioPlayer>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7
  });
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerDuration, setTimerDuration] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const generatedAudioRef = useRef<HTMLAudioElement | null>(null);

  // Inicializar elementos de áudio
  useEffect(() => {
    SOUNDS.forEach(sound => {
      if (!audioRefs.current[sound.id]) {
        const audio = new Audio();
        // Usar URLs de exemplo para demonstração (em produção, usar arquivos reais)
        audio.src = `https://www.soundjay.com/misc/sounds-1015.mp3`; // URL de exemplo
        audio.loop = true;
        audio.volume = 0;
        audio.preload = 'none';
        audioRefs.current[sound.id] = audio;
      }
    });

    return () => {
      // Cleanup
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
      if (generatedAudioRef.current) {
        generatedAudioRef.current.pause();
        generatedAudioRef.current.src = '';
      }
    };
  }, []);

  // Timer
  useEffect(() => {
    if (isTimerActive && timeRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            stopTimer();
            stopMix();
            // Reproduzir mensagem de fim
            playEndMessage();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isTimerActive, timeRemaining]);

  const addSoundToMix = (soundId: string) => {
    if (currentMix.length >= 5) return; // Limite de 5 sons
    if (currentMix.some(s => s.soundId === soundId)) return; // Já existe

    const newSoundControl: SoundControl = {
      soundId,
      volume: 0.5,
      echo: false,
      channel: 'both',
      isPlaying: false
    };

    setCurrentMix([...currentMix, newSoundControl]);
  };

  const removeSoundFromMix = (soundId: string) => {
    // Parar o áudio se estiver tocando
    const audio = audioRefs.current[soundId];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    setCurrentMix(currentMix.filter(s => s.soundId !== soundId));
  };

  const updateSoundControl = (soundId: string, updates: Partial<SoundControl>) => {
    setCurrentMix(currentMix.map(sound => 
      sound.soundId === soundId ? { ...sound, ...updates } : sound
    ));

    // Aplicar mudanças no áudio
    const audio = audioRefs.current[soundId];
    if (audio && updates.volume !== undefined) {
      audio.volume = updates.volume * audioPlayer.volume;
    }
  };

  const clearMix = () => {
    // Parar todos os áudios
    currentMix.forEach(sound => {
      const audio = audioRefs.current[sound.soundId];
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    setCurrentMix([]);
    setAudioPlayer(prev => ({ ...prev, isPlaying: false }));
  };

  const playMix = async () => {
    for (const sound of currentMix) {
      const audio = audioRefs.current[sound.soundId];
      if (audio) {
        audio.volume = sound.volume * audioPlayer.volume;
        try {
          await audio.play();
        } catch (error) {
          console.warn(`Erro ao reproduzir som ${sound.soundId}:`, error);
        }
      }
    }

    setAudioPlayer(prev => ({ ...prev, isPlaying: true }));
  };

  const pauseMix = () => {
    currentMix.forEach(sound => {
      const audio = audioRefs.current[sound.soundId];
      if (audio) {
        audio.pause();
      }
    });

    setAudioPlayer(prev => ({ ...prev, isPlaying: false }));
  };

  const stopMix = () => {
    currentMix.forEach(sound => {
      const audio = audioRefs.current[sound.soundId];
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    setAudioPlayer(prev => ({ 
      ...prev, 
      isPlaying: false, 
      currentTime: 0 
    }));
  };

  const setVolume = (volume: number) => {
    setAudioPlayer(prev => ({ ...prev, volume }));
    
    // Aplicar volume a todos os áudios ativos
    currentMix.forEach(sound => {
      const audio = audioRefs.current[sound.soundId];
      if (audio) {
        audio.volume = sound.volume * volume;
      }
    });

    // Aplicar ao áudio gerado também
    if (generatedAudioRef.current) {
      generatedAudioRef.current.volume = volume;
    }
  };

  const startTimer = (minutes: number) => {
    const seconds = minutes * 60;
    setTimerDuration(seconds);
    setTimeRemaining(seconds);
    setIsTimerActive(true);
  };

  const stopTimer = () => {
    setIsTimerActive(false);
    setTimeRemaining(0);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const generateVoice = async (text: string, voice: string): Promise<string> => {
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voice,
          speed: 0.9 // Velocidade mais lenta para ASMR
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro na geração de áudio');
      }

      return data.audioUrl;
    } catch (error) {
      console.error('Erro na geração de TTS:', error);
      // Fallback para áudio simulado
      return `data:audio/mpeg;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT`;
    }
  };

  const playGeneratedAudio = (audioUrl: string) => {
    if (generatedAudioRef.current) {
      generatedAudioRef.current.pause();
    }

    generatedAudioRef.current = new Audio(audioUrl);
    generatedAudioRef.current.volume = audioPlayer.volume;
    
    generatedAudioRef.current.play().catch(error => {
      console.error('Erro ao reproduzir áudio gerado:', error);
    });
  };

  const playEndMessage = async () => {
    // Gerar mensagem de fim do timer
    try {
      const endMessageUrl = await generateVoice(
        'Seu tempo de relaxamento chegou ao fim. Agora descanse... bons sonhos.',
        'nova'
      );
      playGeneratedAudio(endMessageUrl);
    } catch (error) {
      console.error('Erro ao reproduzir mensagem de fim:', error);
    }
  };

  return (
    <AudioContext.Provider value={{
      currentMix,
      audioPlayer,
      isTimerActive,
      timerDuration,
      timeRemaining,
      addSoundToMix,
      removeSoundFromMix,
      updateSoundControl,
      clearMix,
      playMix,
      pauseMix,
      stopMix,
      setVolume,
      startTimer,
      stopTimer,
      generateVoice,
      playGeneratedAudio
    }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}