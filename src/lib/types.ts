export interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  createdAt: Date;
  sleepStreak: number;
  totalSessions: number;
}

export interface Sound {
  id: string;
  name: string;
  category: 'nature' | 'ambient' | 'voice' | 'mechanical' | 'meditation' | 'animal';
  url: string;
  duration: number;
  isPremium: boolean;
  icon: string;
}

export interface SoundControl {
  soundId: string;
  volume: number;
  echo: boolean;
  channel: 'left' | 'right' | 'both';
  isPlaying: boolean;
}

export interface Mix {
  id: string;
  name: string;
  userId: string;
  sounds: SoundControl[];
  createdAt: Date;
  isPublic: boolean;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  duration: number;
  voice: 'female' | 'male' | 'neutral';
  text: string;
  backgroundSound?: string;
  isPremium: boolean;
}

export interface Session {
  id: string;
  userId: string;
  type: 'sleep' | 'relax' | 'focus' | 'story' | 'meditation';
  duration: number;
  completedAt: Date;
  mixUsed?: string;
  storyUsed?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  unlockedAt?: Date;
}

export interface TTSRequest {
  text: string;
  voice: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
  speed: number;
}

export interface AudioPlayer {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
}