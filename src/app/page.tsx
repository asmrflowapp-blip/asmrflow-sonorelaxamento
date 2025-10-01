'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  Timer, 
  Moon, 
  Leaf, 
  Palette, 
  User, 
  Settings, 
  Crown, 
  Heart,
  Download,
  Share2,
  Plus,
  Minus,
  RotateCcw,
  Award,
  TrendingUp,
  Clock,
  Music,
  BookOpen,
  Sparkles,
  Flame,
  FileText,
  Zap,
  Star,
  Circle,
  VolumeX,
  Save,
  FolderOpen,
  RotateCw,
  AlertCircle
} from 'lucide-react';
import { AuthProvider, useAuth } from '@/lib/auth-context';
import { AudioProvider, useAudio } from '@/lib/audio-context';
import { SOUNDS, STORIES, TIMER_OPTIONS, VOICE_OPTIONS, MEDITATION_PHRASES } from '@/lib/constants';
import { formatTime, formatDuration, getGreeting, downloadMix } from '@/lib/utils';
import { Sound, Story, Mix } from '@/lib/types';

// Componente de ícone dinâmico para sons
const SoundIcon = ({ iconName, className = "w-5 h-5" }: { iconName: string; className?: string }) => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    'Circle': Circle,
    'Flame': Flame,
    'FileText': FileText,
    'Heart': Heart,
    'Clock': Clock,
    'Zap': Zap,
    'Star': Star,
    'VolumeX': VolumeX,
    'Leaf': Leaf,
    'Music': Music,
    'Volume2': Volume2,
    'Moon': Moon,
    'BookOpen': BookOpen
  };
  
  const IconComponent = iconMap[iconName] || Circle;
  return <IconComponent className={className} />;
};

// Sistema de áudio melhorado com tratamento de erros
const useLocalAudio = () => {
  const [audioElements, setAudioElements] = useState<{ [key: string]: HTMLAudioElement }>({});
  const [playingStates, setPlayingStates] = useState<{ [key: string]: boolean }>({});
  const [volumes, setVolumes] = useState<{ [key: string]: number }>({});
  const [loops, setLoops] = useState<{ [key: string]: boolean }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});

  const initializeAudio = (soundId: string, url: string) => {
    if (!audioElements[soundId]) {
      setLoadingStates(prev => ({ ...prev, [soundId]: true }));
      
      const audio = new Audio();
      audio.crossOrigin = "anonymous";
      audio.preload = "metadata";
      
      // Configurar eventos de erro
      audio.addEventListener('error', (e) => {
        console.error(`Erro ao carregar áudio ${soundId}:`, e);
        setErrors(prev => ({ ...prev, [soundId]: 'Erro ao carregar áudio' }));
        setLoadingStates(prev => ({ ...prev, [soundId]: false }));
        setPlayingStates(prev => ({ ...prev, [soundId]: false }));
      });

      // Configurar eventos de sucesso
      audio.addEventListener('loadedmetadata', () => {
        setLoadingStates(prev => ({ ...prev, [soundId]: false }));
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[soundId];
          return newErrors;
        });
      });

      audio.addEventListener('canplaythrough', () => {
        setLoadingStates(prev => ({ ...prev, [soundId]: false }));
      });

      audio.addEventListener('ended', () => {
        if (!audio.loop) {
          setPlayingStates(prev => ({ ...prev, [soundId]: false }));
        }
      });

      // Configurar propriedades
      audio.loop = loops[soundId] || false;
      audio.volume = volumes[soundId] || 0.5;
      
      // Tentar carregar o áudio
      try {
        audio.src = url;
        audio.load();
      } catch (error) {
        console.error(`Erro ao definir src para ${soundId}:`, error);
        setErrors(prev => ({ ...prev, [soundId]: 'URL inválida' }));
        setLoadingStates(prev => ({ ...prev, [soundId]: false }));
      }

      setAudioElements(prev => ({ ...prev, [soundId]: audio }));
    }
  };

  const playSound = async (soundId: string, url: string) => {
    try {
      initializeAudio(soundId, url);
      const audio = audioElements[soundId];
      
      if (audio && !errors[soundId]) {
        setPlayingStates(prev => ({ ...prev, [soundId]: true }));
        
        // Tentar reproduzir
        const playPromise = audio.play();
        
        if (playPromise !==                       {/* Áudio de Chuva Suave ASMR */}
                      <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Circle className="w-4 h-4 text-blue-400" />
                          <span className="text-blue-300 text-sm font-medium">Chuva Suave ASMR</span>
                        </div>
                        <audio 
                          controls 
                          className="w-full"
                          preload="metadata"
                          style={{ height: '32px' }}
                        >
                          <source src="https://www.soundjay.com/misc/sounds/rain-01.wav" type="audio/wav" />
                          <source src="https://archive.org/download/RainThunder/Rain.mp3" type="audio/mpeg" />
                          <source src="https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-one/zapsplat_nature_rain_light_on_leaves_loop_001_24004.mp3" type="audio/mpeg" />
                          Seu navegador não suporta o elemento de áudio.
                        </audio>
                        <div className="text-xs text-blue-200 mt-1">
                          Som relaxante de chuva para meditação e sono
                        </div>
                      </div>) {
          await playPromise;
        }
      }
    } catch (error) {
      console.error(`Erro ao reproduzir ${soundId}:`, error);
      setErrors(prev => ({ ...prev, [soundId]: 'Erro na reprodução' }));
      setPlayingStates(prev => ({ ...prev, [soundId]: false }));
    }
  };

  const pauseSound = (soundId: string) => {
    const audio = audioElements[soundId];
    if (audio) {
      audio.pause();
      setPlayingStates(prev => ({ ...prev, [soundId]: false }));
    }
  };

  const stopSound = (soundId: string) => {
    const audio = audioElements[soundId];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setPlayingStates(prev => ({ ...prev, [soundId]: false }));
    }
  };

  const setVolume = (soundId: string, volume: number) => {
    const audio = audioElements[soundId];
    if (audio) {
      audio.volume = volume;
    }
    setVolumes(prev => ({ ...prev, [soundId]: volume }));
  };

  const setLoop = (soundId: string, loop: boolean) => {
    const audio = audioElements[soundId];
    if (audio) {
      audio.loop = loop;
    }
    setLoops(prev => ({ ...prev, [soundId]: loop }));
  };

  const stopAllSounds = () => {
    Object.keys(audioElements).forEach(soundId => {
      stopSound(soundId);
    });
  };

  const clearError = (soundId: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[soundId];
      return newErrors;
    });
  };

  return {
    playSound,
    pauseSound,
    stopSound,
    setVolume,
    setLoop,
    stopAllSounds,
    clearError,
    playingStates,
    volumes,
    loops,
    errors,
    loadingStates
  };
};

function ASMRFlowApp() {
  const [currentView, setCurrentView] = useState<'home' | 'sounds' | 'mixer' | 'stories' | 'profile' | 'auth' | 'library'>('home');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showSavedMixesModal, setShowSavedMixesModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user, login, register, logout, upgradeToPremium, getUserSessions, getUserMixes, getUnlockedAchievements } = useAuth();
  const { 
    currentMix, 
    audioPlayer, 
    isTimerActive, 
    timeRemaining,
    addSoundToMix,
    removeSoundFromMix,
    updateSoundControl,
    clearMix,
    playMix,
    pauseMix,
    stopMix,
    setVolume: setGlobalVolume,
    startTimer,
    stopTimer,
    generateVoice,
    playGeneratedAudio
  } = useAudio();

  // Sistema de áudio local
  const localAudio = useLocalAudio();

  // Estados para formulários
  const [authForm, setAuthForm] = useState({ email: '', password: '', name: '' });
  const [mixName, setMixName] = useState('');
  const [selectedTimer, setSelectedTimer] = useState(20);
  const [ttsText, setTtsText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('alloy');
  const [savedMixes, setSavedMixes] = useState<Mix[]>([]);
  const [activeSounds, setActiveSounds] = useState<Set<string>>(new Set());

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let success = false;
      if (authMode === 'login') {
        success = await login(authForm.email, authForm.password);
      } else {
        success = await register(authForm.email, authForm.password, authForm.name);
      }

      if (success) {
        setCurrentView('home');
        setAuthForm({ email: '', password: '', name: '' });
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveMix = () => {
    if (!user || activeSounds.size === 0) return;

    const activeSoundsArray = Array.from(activeSounds);
    const mixSounds = activeSoundsArray.map(soundId => ({
      soundId,
      volume: localAudio.volumes[soundId] || 0.5,
      isPlaying: localAudio.playingStates[soundId] || false,
      echo: false,
      channel: 'both' as const
    }));

    const mixData: Mix = {
      id: Date.now().toString(),
      name: mixName || `Mix Zen ${new Date().toLocaleDateString()}`,
      userId: user.id,
      sounds: mixSounds,
      createdAt: new Date(),
      isPublic: false
    };

    setSavedMixes(prev => [...prev, mixData]);
    setMixName('');
    
    // Simular salvamento no backend
    console.log('Mix salvo:', mixData);
  };

  const handleLoadMix = (mix: Mix) => {
    // Parar todos os sons atuais
    localAudio.stopAllSounds();
    setActiveSounds(new Set());
    
    // Carregar sons do mix salvo
    const newActiveSounds = new Set<string>();
    mix.sounds.forEach(soundControl => {
      newActiveSounds.add(soundControl.soundId);
      localAudio.setVolume(soundControl.soundId, soundControl.volume);
      
      if (soundControl.isPlaying) {
        const sound = SOUNDS.find(s => s.id === soundControl.soundId);
        if (sound) {
          localAudio.playSound(soundControl.soundId, sound.url);
        }
      }
    });
    
    setActiveSounds(newActiveSounds);
    setShowSavedMixesModal(false);
  };

  const handlePlaySound = (soundId: string) => {
    const sound = SOUNDS.find(s => s.id === soundId);
    if (!sound) return;

    // Limpar erro anterior se existir
    if (localAudio.errors[soundId]) {
      localAudio.clearError(soundId);
    }

    if (localAudio.playingStates[soundId]) {
      localAudio.pauseSound(soundId);
      setActiveSounds(prev => {
        const newSet = new Set(prev);
        newSet.delete(soundId);
        return newSet;
      });
    } else {
      localAudio.playSound(soundId, sound.url);
      setActiveSounds(prev => new Set(prev).add(soundId));
    }
  };

  const handleGenerateTTS = async () => {
    if (!ttsText.trim()) return;

    setIsLoading(true);
    try {
      const audioUrl = await generateVoice(ttsText, selectedVoice);
      playGeneratedAudio(audioUrl);
    } catch (error) {
      console.error('TTS error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSounds = user?.isPremium ? SOUNDS : SOUNDS.filter(s => !s.isPremium);
  const filteredStories = user?.isPremium ? STORIES : STORIES.filter(s => !s.isPremium);

  // Tela de autenticação
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Circle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">ASMRFlow</CardTitle>
            <CardDescription className="text-purple-200">Sono & Relaxamento</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as 'login' | 'register')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="register">Cadastrar</TabsTrigger>
              </TabsList>
              
              <form onSubmit={handleAuth} className="space-y-4">
                {authMode === 'register' && (
                  <div>
                    <Label htmlFor="name" className="text-white">Nome</Label>
                    <Input
                      id="name"
                      type="text"
                      value={authForm.name}
                      onChange={(e) => setAuthForm({...authForm, name: e.target.value})}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                )}
                
                <div>
                  <Label htmlFor="email" className="text-white">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={authForm.email}
                    onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="password" className="text-white">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={authForm.password}
                    onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="••••••••"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Carregando...' : (authMode === 'login' ? 'Entrar' : 'Cadastrar')}
                </Button>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Tela principal do app
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Circle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">ASMRFlow</h1>
              <p className="text-sm text-purple-200">{getGreeting()}, {user.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {!user.isPremium && (
              <Button
                onClick={() => setShowPremiumModal(true)}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                size="sm"
              >
                <Crown className="w-4 h-4 mr-1" />
                Premium
              </Button>
            )}
            
            <Button
              onClick={() => setCurrentView('profile')}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <User className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-black/10 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 overflow-x-auto">
            <Button
              onClick={() => setCurrentView('home')}
              variant={currentView === 'home' ? 'default' : 'ghost'}
              className={currentView === 'home' 
                ? 'bg-purple-600 hover:bg-purple-700 transition-all duration-300 hover:scale-105' 
                : 'text-white hover:bg-white/10 transition-all duration-300 hover:scale-105'
              }
            >
              <Moon className="w-4 h-4 mr-2" />
              Início
            </Button>
            
            <Button
              onClick={() => setCurrentView('library')}
              variant={currentView === 'library' ? 'default' : 'ghost'}
              className={currentView === 'library' 
                ? 'bg-purple-600 hover:bg-purple-700 transition-all duration-300 hover:scale-105' 
                : 'text-white hover:bg-white/10 transition-all duration-300 hover:scale-105'
              }
            >
              <Music className="w-4 h-4 mr-2" />
              Biblioteca de Sons
            </Button>
            
            <Button
              onClick={() => setCurrentView('mixer')}
              variant={currentView === 'mixer' ? 'default' : 'ghost'}
              className={currentView === 'mixer' 
                ? 'bg-purple-600 hover:bg-purple-700 transition-all duration-300 hover:scale-105' 
                : 'text-white hover:bg-white/10 transition-all duration-300 hover:scale-105'
              }
            >
              <Palette className="w-4 h-4 mr-2" />
              Mixer
            </Button>
            
            <Button
              onClick={() => setCurrentView('stories')}
              variant={currentView === 'stories' ? 'default' : 'ghost'}
              className={currentView === 'stories' 
                ? 'bg-purple-600 hover:bg-purple-700 transition-all duration-300 hover:scale-105' 
                : 'text-white hover:bg-white/10 transition-all duration-300 hover:scale-105'
              }
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Histórias
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 pb-24">
        {/* Tela Inicial */}
        {currentView === 'home' && (
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-white/10 hover:bg-white/5 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl"
                    onClick={() => setCurrentView('library')}>
                <CardContent className="p-6 text-center">
                  <Moon className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Quero dormir rápido</h3>
                  <p className="text-purple-200 text-sm">Sons relaxantes para adormecer</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-600/20 to-teal-600/20 border-white/10 hover:bg-white/5 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl"
                    onClick={() => setCurrentView('library')}>
                <CardContent className="p-6 text-center">
                  <Leaf className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Quero relaxar</h3>
                  <p className="text-purple-200 text-sm">Biblioteca de sons ASMR</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-white/10 hover:bg-white/5 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl"
                    onClick={() => setCurrentView('mixer')}>
                <CardContent className="p-6 text-center">
                  <Palette className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Criar meu mix</h3>
                  <p className="text-purple-200 text-sm">Combine sons personalizados</p>
                </CardContent>
              </Card>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white">{user.sleepStreak}</div>
                  <div className="text-sm text-purple-200">Dias seguidos</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white">{user.totalSessions}</div>
                  <div className="text-sm text-purple-200">Sessões totais</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white">{savedMixes.length}</div>
                  <div className="text-sm text-purple-200">Mixes criados</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white">{getUnlockedAchievements().length}</div>
                  <div className="text-sm text-purple-200">Conquistas</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Biblioteca de Sons */}
        {currentView === 'library' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Biblioteca de Sons</h2>
              <div className="flex gap-2">
                {!user.isPremium && (
                  <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300">
                    {SOUNDS.filter(s => !s.isPremium).length} de {SOUNDS.length} sons disponíveis
                  </Badge>
                )}
                <Button
                  onClick={() => setShowSavedMixesModal(true)}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <FolderOpen className="w-4 h-4 mr-1" />
                  Meus Mixes ({savedMixes.length})
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSounds.map((sound) => {
                const isPlaying = localAudio.playingStates[sound.id] || false;
                const volume = localAudio.volumes[sound.id] || 0.5;
                const loop = localAudio.loops[sound.id] || false;
                const hasError = localAudio.errors[sound.id];
                const isLoading = localAudio.loadingStates[sound.id];

                return (
                  <Card key={sound.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <SoundIcon iconName={sound.icon} className="w-5 h-5 text-purple-400" />
                          <h3 className="font-semibold text-white">{sound.name}</h3>
                        </div>
                        {sound.isPremium && !user.isPremium && (
                          <Crown className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                      
                      <div className="text-sm text-purple-200 mb-3">
                        {formatDuration(sound.duration)} • {sound.category}
                      </div>

                      {/* Áudio de Chuva Suave ASMR */}
                      <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Circle className="w-4 h-4 text-blue-400" />
                          <span className="text-blue-300 text-sm font-medium">Chuva Suave ASMR</span>
                        </div>
                        <audio 
                          controls 
                          className="w-full"
                          preload="metadata"
                          style={{ height: '32px' }}
                        >
                          <source src="https://www.soundjay.com/misc/sounds/rain-01.wav" type="audio/wav" />
                          <source src="https://archive.org/download/RainThunder/Rain.mp3" type="audio/mpeg" />
                          <source src="https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-one/zapsplat_nature_rain_light_on_leaves_loop_001_24004.mp3" type="audio/mpeg" />
                          Seu navegador não suporta o elemento de áudio.
                        </audio>
                        <div className="text-xs text-blue-200 mt-1">
                          Som relaxante de chuva para meditação e sono
                        </div>
                      </div>

                      {/* Controles de Volume */}
                      <div className="space-y-3 mb-3">
                        <div>
                          <Label className="text-white text-xs mb-1 block">Volume</Label>
                          <Slider
                            value={[volume * 100]}
                            onValueChange={([value]) => 
                              localAudio.setVolume(sound.id, value / 100)
                            }
                            max={100}
                            step={1}
                            className="mt-1"
                            disabled={hasError}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Label className="text-white text-xs">Loop</Label>
                            <Switch
                              checked={loop}
                              onCheckedChange={(checked) => 
                                localAudio.setLoop(sound.id, checked)
                              }
                              size="sm"
                              disabled={hasError}
                            />
                          </div>
                          <div className="text-xs text-purple-300">
                            {Math.round(volume * 100)}%
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handlePlaySound(sound.id)}
                          className={`flex-1 transition-all duration-300 hover:scale-105 ${
                            isPlaying 
                              ? 'bg-red-600 hover:bg-red-700' 
                              : 'bg-purple-600 hover:bg-purple-700'
                          }`}
                          disabled={(sound.isPremium && !user.isPremium) || isLoading}
                        >
                          {isLoading ? (
                            <RotateCw className="w-4 h-4 mr-1 animate-spin" />
                          ) : isPlaying ? (
                            <Pause className="w-4 h-4 mr-1" />
                          ) : (
                            <Play className="w-4 h-4 mr-1" />
                          )}
                          {isLoading ? 'Carregando...' : isPlaying ? 'Pausar' : 'Tocar'}
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => localAudio.stopSound(sound.id)}
                          disabled={!isPlaying || hasError}
                          className="border-white/20 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                        >
                          <Square className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Salvar Mix */}
            {activeSounds.size > 0 && (
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    Salvar Mix Zen
                  </h3>
                  
                  <div className="flex gap-3">
                    <Input
                      placeholder="Nome do mix (ex: Mix Zen)"
                      value={mixName}
                      onChange={(e) => setMixName(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                    
                    <Button
                      onClick={handleSaveMix}
                      className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 hover:scale-105"
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      Salvar Mix
                    </Button>
                  </div>
                  
                  <div className="mt-3 text-sm text-purple-200">
                    Mix atual: {activeSounds.size} som(ns) ativos
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Criador de Mix */}
        {currentView === 'mixer' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Criador de Mix</h2>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    localAudio.stopAllSounds();
                    setActiveSounds(new Set());
                  }}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Limpar Tudo
                </Button>
              </div>
            </div>

            {/* Player Controls */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="text-center text-purple-200">
                  {activeSounds.size === 0 
                    ? "Vá para Biblioteca de Sons para ativar sons no seu mix"
                    : `${activeSounds.size} som(ns) ativos no mix`
                  }
                </div>
                
                {activeSounds.size > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
                    {Array.from(activeSounds).map(soundId => {
                      const sound = SOUNDS.find(s => s.id === soundId);
                      const isPlaying = localAudio.playingStates[soundId];
                      return sound ? (
                        <div key={soundId} className="bg-white/5 rounded-lg p-2 text-center">
                          <SoundIcon iconName={sound.icon} className="w-4 h-4 mx-auto mb-1 text-purple-400" />
                          <div className="text-xs text-white">{sound.name}</div>
                          <div className={`text-xs ${isPlaying ? 'text-green-400' : 'text-gray-400'}`}>
                            {isPlaying ? 'Tocando' : 'Pausado'}
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Timer */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Timer className="w-5 h-5" />
                    Timer Inteligente
                  </h3>
                  
                  {isTimerActive && (
                    <div className="text-2xl font-mono text-purple-300">
                      {formatTime(timeRemaining)}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <Select
                    value={selectedTimer.toString()}
                    onValueChange={(value) => setSelectedTimer(parseInt(value))}
                    disabled={isTimerActive}
                  >
                    <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TIMER_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value.toString()}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    onClick={() => isTimerActive ? stopTimer() : startTimer(selectedTimer)}
                    className={isTimerActive 
                      ? "bg-red-600 hover:bg-red-700 transition-all duration-300 hover:scale-105" 
                      : "bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-105"
                    }
                  >
                    {isTimerActive ? 'Parar Timer' : 'Iniciar Timer'}
                  </Button>
                </div>

                {isTimerActive && (
                  <Progress 
                    value={(timeRemaining / (selectedTimer * 60)) * 100} 
                    className="mt-4"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Histórias e TTS */}
        {currentView === 'stories' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Histórias & Sessões Guiadas</h2>

            {/* TTS Generator */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Circle className="w-5 h-5" />
                  Gerador de Voz IA
                </CardTitle>
                <CardDescription className="text-purple-200">
                  Crie áudios personalizados com vozes suaves
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-white">Escolha a voz</Label>
                  <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {VOICE_OPTIONS.map(voice => (
                        <SelectItem key={voice.id} value={voice.id}>
                          {voice.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white">Texto para narrar</Label>
                  <Textarea
                    placeholder="Digite o texto que será narrado com voz suave..."
                    value={ttsText}
                    onChange={(e) => setTtsText(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-24"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleGenerateTTS}
                    disabled={!ttsText.trim() || isLoading}
                    className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 hover:scale-105"
                  >
                    {isLoading ? 'Gerando...' : 'Gerar Áudio'}
                  </Button>
                  
                  <Button
                    onClick={() => setTtsText(MEDITATION_PHRASES[Math.floor(Math.random() * MEDITATION_PHRASES.length)])}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                  >
                    <Star className="w-4 h-4 mr-1" />
                    Frase Aleatória
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stories Library */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredStories.map((story) => (
                <Card key={story.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-white">{story.title}</h3>
                        <p className="text-sm text-purple-200 mt-1">{story.description}</p>
                      </div>
                      {story.isPremium && !user.isPremium && (
                        <Crown className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                      )}
                    </div>
                    
                    <div className="text-xs text-purple-300 mb-3">
                      {formatDuration(story.duration)} • Voz {story.voice === 'female' ? 'feminina' : story.voice === 'male' ? 'masculina' : 'neutra'}
                    </div>

                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-300 hover:scale-105"
                      disabled={story.isPremium && !user.isPremium}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Ouvir História
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Profile */}
        {currentView === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Meu Perfil</h2>

            {/* User Info */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{user.name}</h3>
                    <p className="text-purple-200">{user.email}</p>
                    <Badge className={user.isPremium ? "bg-yellow-500/20 text-yellow-300" : "bg-gray-500/20 text-gray-300"}>
                      {user.isPremium ? 'Premium' : 'Gratuito'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Conquistas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {getUnlockedAchievements().map((achievement) => (
                    <div key={achievement.id} className="bg-white/5 rounded-lg p-3 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
                      <div className="text-2xl mb-1">{achievement.icon}</div>
                      <div className="text-sm font-semibold text-white">{achievement.title}</div>
                      <div className="text-xs text-purple-200">{achievement.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Sessions */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Sessões Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {getUserSessions().slice(0, 5).map((session, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-all duration-300 rounded px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center">
                          {session.type === 'sleep' && <Moon className="w-4 h-4 text-purple-400" />}
                          {session.type === 'relax' && <Leaf className="w-4 h-4 text-green-400" />}
                          {session.type === 'story' && <BookOpen className="w-4 h-4 text-blue-400" />}
                        </div>
                        <div>
                          <div className="text-white text-sm capitalize">{session.type}</div>
                          <div className="text-purple-200 text-xs">{formatDuration(session.duration)}</div>
                        </div>
                      </div>
                      <div className="text-purple-200 text-xs">
                        {new Date(session.completedAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Modal Meus Mixes */}
      <Dialog open={showSavedMixesModal} onOpenChange={setShowSavedMixesModal}>
        <DialogContent className="bg-slate-900 border-white/20 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <FolderOpen className="w-6 h-6 text-purple-500" />
              Meus Mixes Salvos
            </DialogTitle>
            <DialogDescription className="text-purple-200">
              Carregue seus mixes personalizados salvos
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {savedMixes.length === 0 ? (
              <div className="text-center py-8 text-purple-200">
                <Music className="w-12 h-12 mx-auto mb-3 text-purple-400" />
                <p>Nenhum mix salvo ainda</p>
                <p className="text-sm">Crie e salve seus primeiros mixes na Biblioteca de Sons</p>
              </div>
            ) : (
              savedMixes.map((mix) => (
                <Card key={mix.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{mix.name}</h3>
                        <p className="text-sm text-purple-200">
                          {mix.sounds.length} sons • Criado em {new Date(mix.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleLoadMix(mix)}
                        className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 hover:scale-105"
                        size="sm"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Carregar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Premium Modal */}
      <Dialog open={showPremiumModal} onOpenChange={setShowPremiumModal}>
        <DialogContent className="bg-slate-900 border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Crown className="w-6 h-6 text-yellow-500" />
              ASMRFlow Premium
            </DialogTitle>
            <DialogDescription className="text-purple-200">
              Desbloqueie todo o potencial do seu relaxamento
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Recursos Premium:</h4>
                <ul className="space-y-2 text-sm text-purple-200">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Biblioteca completa de sons
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Mixes ilimitados
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Todas as histórias
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Vozes IA premium
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Downloads offline
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Sem anúncios
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white">R$ 9,90</div>
                  <div className="text-sm text-yellow-300">por mês</div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white">R$ 89,90</div>
                  <div className="text-sm text-purple-300">por ano</div>
                  <Badge className="bg-green-500/20 text-green-300 mt-1">25% OFF</Badge>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  upgradeToPremium();
                  setShowPremiumModal(false);
                }}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Assinar Premium
              </Button>
              
              <Button
                onClick={() => setShowPremiumModal(false)}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                Talvez depois
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function Page() {
  return (
    <AuthProvider>
      <AudioProvider>
        <ASMRFlowApp />
      </AudioProvider>
    </AuthProvider>
  );
}