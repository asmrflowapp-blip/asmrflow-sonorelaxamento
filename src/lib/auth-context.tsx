'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session, Mix, Achievement } from '@/lib/types';
import { ACHIEVEMENTS } from '@/lib/constants';
import { calculateSleepStreak, generateId } from '@/lib/utils';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addSession: (session: Omit<Session, 'id' | 'userId' | 'completedAt'>) => void;
  getUserSessions: () => Session[];
  getUserMixes: () => Mix[];
  saveMix: (mix: Omit<Mix, 'id' | 'userId' | 'createdAt'>) => void;
  deleteMix: (mixId: string) => void;
  getUnlockedAchievements: () => Achievement[];
  upgradeToPremium: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [mixes, setMixes] = useState<Mix[]>([]);

  // Carregar dados do localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('asmr-user');
    const savedSessions = localStorage.getItem('asmr-sessions');
    const savedMixes = localStorage.getItem('asmr-mixes');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
    if (savedMixes) {
      setMixes(JSON.parse(savedMixes));
    }
  }, []);

  // Salvar dados no localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('asmr-user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('asmr-sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('asmr-mixes', JSON.stringify(mixes));
  }, [mixes]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulação de login - em produção, fazer chamada para API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: generateId(),
      email,
      name: email.split('@')[0],
      isPremium: false,
      createdAt: new Date(),
      sleepStreak: 0,
      totalSessions: 0
    };
    
    setUser(mockUser);
    return true;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulação de registro - em produção, fazer chamada para API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: generateId(),
      email,
      name,
      isPremium: false,
      createdAt: new Date(),
      sleepStreak: 0,
      totalSessions: 0
    };
    
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    setSessions([]);
    setMixes([]);
    localStorage.removeItem('asmr-user');
    localStorage.removeItem('asmr-sessions');
    localStorage.removeItem('asmr-mixes');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const addSession = (sessionData: Omit<Session, 'id' | 'userId' | 'completedAt'>) => {
    if (!user) return;

    const newSession: Session = {
      ...sessionData,
      id: generateId(),
      userId: user.id,
      completedAt: new Date()
    };

    const updatedSessions = [...sessions, newSession];
    setSessions(updatedSessions);

    // Atualizar estatísticas do usuário
    const userSessions = updatedSessions.filter(s => s.userId === user.id);
    const sleepSessions = userSessions.filter(s => s.type === 'sleep').map(s => s.completedAt);
    const sleepStreak = calculateSleepStreak(sleepSessions);

    updateUser({
      totalSessions: userSessions.length,
      sleepStreak
    });
  };

  const getUserSessions = (): Session[] => {
    if (!user) return [];
    return sessions.filter(session => session.userId === user.id);
  };

  const getUserMixes = (): Mix[] => {
    if (!user) return [];
    return mixes.filter(mix => mix.userId === user.id);
  };

  const saveMix = (mixData: Omit<Mix, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;

    const newMix: Mix = {
      ...mixData,
      id: generateId(),
      userId: user.id,
      createdAt: new Date()
    };

    setMixes([...mixes, newMix]);
  };

  const deleteMix = (mixId: string) => {
    setMixes(mixes.filter(mix => mix.id !== mixId));
  };

  const getUnlockedAchievements = (): Achievement[] => {
    if (!user) return [];

    const userSessions = getUserSessions();
    const userMixes = getUserMixes();
    
    return ACHIEVEMENTS.filter(achievement => {
      switch (achievement.id) {
        case 'first-night':
          return userSessions.some(s => s.type === 'sleep');
        case 'week-streak':
          return user.sleepStreak >= 7;
        case 'mix-master':
          return userMixes.length >= 5;
        case 'story-lover':
          return userSessions.filter(s => s.storyUsed).length >= 10;
        case 'meditation-guru':
          return userSessions.filter(s => s.type === 'meditation').length >= 50;
        default:
          return false;
      }
    }).map(achievement => ({
      ...achievement,
      unlockedAt: new Date() // Em produção, salvar data real de desbloqueio
    }));
  };

  const upgradeToPremium = () => {
    if (user) {
      updateUser({ isPremium: true });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateUser,
      addSession,
      getUserSessions,
      getUserMixes,
      saveMix,
      deleteMix,
      getUnlockedAchievements,
      upgradeToPremium
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}