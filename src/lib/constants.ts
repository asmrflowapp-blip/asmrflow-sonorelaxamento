import { Sound, Story, Achievement } from './types';

export const SOUNDS: Sound[] = [
  // Sons base solicitados - USANDO URLS VÁLIDAS DE DEMONSTRAÇÃO
  {
    id: 'rain',
    name: 'Chuva Suave',
    category: 'nature',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 3600,
    isPremium: false,
    icon: 'Circle'
  },
  {
    id: 'wind',
    name: 'Vento na Floresta',
    category: 'nature',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 3600,
    isPremium: false,
    icon: 'Leaf'
  },
  {
    id: 'fire',
    name: 'Lareira Crepitante',
    category: 'ambient',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 3600,
    isPremium: false,
    icon: 'Flame'
  },
  {
    id: 'keyboard',
    name: 'Digitação de Teclado',
    category: 'mechanical',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 1800,
    isPremium: false,
    icon: 'FileText'
  },
  {
    id: 'paper',
    name: 'Folheando Papel',
    category: 'mechanical',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 1800,
    isPremium: false,
    icon: 'FileText'
  },
  {
    id: 'water-drops',
    name: 'Gotas d\'Água',
    category: 'nature',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 3600,
    isPremium: false,
    icon: 'Circle'
  },
  {
    id: 'soft-voice',
    name: 'Voz Suave',
    category: 'voice',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 2400,
    isPremium: false,
    icon: 'Heart'
  },
  // Sons adicionais para enriquecer a biblioteca
  {
    id: 'ocean',
    name: 'Ondas do Mar',
    category: 'nature',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 3600,
    isPremium: true,
    icon: 'Circle'
  },
  {
    id: 'birds',
    name: 'Pássaros Cantando',
    category: 'nature',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 3600,
    isPremium: false,
    icon: 'Music'
  },
  {
    id: 'thunder',
    name: 'Trovões Distantes',
    category: 'nature',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 3600,
    isPremium: true,
    icon: 'Zap'
  },
  {
    id: 'cafe',
    name: 'Café Aconchegante',
    category: 'ambient',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 3600,
    isPremium: true,
    icon: 'Heart'
  },
  {
    id: 'library',
    name: 'Biblioteca Silenciosa',
    category: 'ambient',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 3600,
    isPremium: true,
    icon: 'BookOpen'
  },
  {
    id: 'meditation-bowl',
    name: 'Tigela Tibetana',
    category: 'meditation',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 1800,
    isPremium: false,
    icon: 'Circle'
  },
  {
    id: 'white-noise',
    name: 'Ruído Branco',
    category: 'ambient',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 3600,
    isPremium: false,
    icon: 'Volume2'
  },
  {
    id: 'pink-noise',
    name: 'Ruído Rosa',
    category: 'ambient',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 3600,
    isPremium: true,
    icon: 'Volume2'
  },
  {
    id: 'brown-noise',
    name: 'Ruído Marrom',
    category: 'ambient',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 3600,
    isPremium: true,
    icon: 'Volume2'
  },
  {
    id: 'forest-night',
    name: 'Floresta Noturna',
    category: 'nature',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 3600,
    isPremium: true,
    icon: 'Moon'
  },
  {
    id: 'cat-purr',
    name: 'Ronronar de Gato',
    category: 'animal',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 1800,
    isPremium: false,
    icon: 'Heart'
  },
  {
    id: 'vinyl-crackle',
    name: 'Vinil Crepitando',
    category: 'ambient',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 3600,
    isPremium: true,
    icon: 'Music'
  },
  {
    id: 'clock-ticking',
    name: 'Relógio Fazendo Tique-Taque',
    category: 'mechanical',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 3600,
    isPremium: false,
    icon: 'Clock'
  }
];

export const STORIES: Story[] = [
  {
    id: 'forest-walk',
    title: 'Caminhada na Floresta',
    description: 'Uma jornada relaxante por uma floresta encantada',
    duration: 900,
    voice: 'female',
    text: 'Você está caminhando por uma trilha suave na floresta. O ar está fresco e limpo. Você pode ouvir o canto dos pássaros ao longe...',
    backgroundSound: 'wind',
    isPremium: false
  },
  {
    id: 'beach-sunset',
    title: 'Pôr do Sol na Praia',
    description: 'Relaxe observando o pôr do sol em uma praia tranquila',
    duration: 1200,
    voice: 'neutral',
    text: 'Você está sentado na areia morna de uma praia deserta. O sol está se pondo no horizonte, pintando o céu com cores douradas...',
    backgroundSound: 'ocean',
    isPremium: true
  },
  {
    id: 'mountain-meditation',
    title: 'Meditação na Montanha',
    description: 'Uma sessão de meditação no topo de uma montanha serena',
    duration: 1800,
    voice: 'male',
    text: 'Você está no topo de uma montanha, sentindo a brisa suave em seu rosto. Respire profundamente e sinta a paz ao seu redor...',
    isPremium: true
  },
  {
    id: 'garden-peace',
    title: 'Jardim da Paz',
    description: 'Encontre tranquilidade em um jardim secreto',
    duration: 1080,
    voice: 'female',
    text: 'Você descobriu um jardim secreto, cheio de flores perfumadas e borboletas coloridas. Sente-se em um banco de pedra e respire a paz...',
    backgroundSound: 'birds',
    isPremium: false
  },
  {
    id: 'starry-night',
    title: 'Noite Estrelada',
    description: 'Contemple as estrelas em uma noite clara',
    duration: 1500,
    voice: 'neutral',
    text: 'Você está deitado em um campo aberto, olhando para o céu estrelado. Cada estrela conta uma história de paz e serenidade...',
    backgroundSound: 'forest-night',
    isPremium: true
  },
  {
    id: 'cozy-cabin',
    title: 'Cabana Aconchegante',
    description: 'Relaxe em uma cabana aquecida pela lareira',
    duration: 1350,
    voice: 'male',
    text: 'Você está em uma cabana de madeira, aquecido pelo calor da lareira. O som do fogo crepitando traz uma sensação de lar...',
    backgroundSound: 'fire',
    isPremium: false
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-night',
    title: 'Primeira Noite',
    description: 'Complete sua primeira sessão de sono',
    icon: '🌙',
    requirement: 1
  },
  {
    id: 'week-streak',
    title: 'Uma Semana Zen',
    description: 'Use o app por 7 dias consecutivos',
    icon: '🔥',
    requirement: 7
  },
  {
    id: 'mix-master',
    title: 'Mestre dos Mixes',
    description: 'Crie 5 mixes personalizados',
    icon: '🎵',
    requirement: 5
  },
  {
    id: 'story-lover',
    title: 'Amante de Histórias',
    description: 'Ouça 10 histórias completas',
    icon: '📚',
    requirement: 10
  },
  {
    id: 'meditation-guru',
    title: 'Guru da Meditação',
    description: 'Complete 50 sessões de meditação',
    icon: '🧘',
    requirement: 50
  },
  {
    id: 'sound-explorer',
    title: 'Explorador de Sons',
    description: 'Teste todos os sons disponíveis',
    icon: '🎧',
    requirement: 20
  },
  {
    id: 'night-owl',
    title: 'Coruja Noturna',
    description: 'Use o app após 22h por 10 vezes',
    icon: '🦉',
    requirement: 10
  },
  {
    id: 'zen-master',
    title: 'Mestre Zen',
    description: 'Complete 100 sessões de relaxamento',
    icon: '☯️',
    requirement: 100
  }
];

export const MEDITATION_PHRASES = [
  'Respire profundamente... inspire paz... expire tensão...',
  'Sinta seu corpo relaxando... cada músculo se soltando...',
  'Você está em um lugar seguro e tranquilo...',
  'Deixe seus pensamentos fluírem como nuvens no céu...',
  'Concentre-se apenas na sua respiração... inspire... expire...',
  'Sinta a calma tomando conta de todo seu ser...',
  'Você está completamente relaxado e em paz...',
  'Agora descanse... bons sonhos...',
  'Permita que a tranquilidade flua através de você...',
  'Cada respiração traz mais paz e serenidade...',
  'Solte todas as preocupações do dia...',
  'Você merece este momento de paz...',
  'Sinta-se envolvido por uma energia calmante...',
  'Deixe que o relaxamento tome conta de todo seu corpo...',
  'Você está exatamente onde precisa estar...',
  'Permita-se simplesmente ser... sem pressa, sem pressão...'
];

export const TIMER_OPTIONS = [
  { label: '20 minutos', value: 20 },
  { label: '40 minutos', value: 40 },
  { label: '60 minutos', value: 60 },
  { label: '90 minutos', value: 90 }
];

export const VOICE_OPTIONS = [
  { id: 'alloy', name: 'Feminina Suave', gender: 'female' },
  { id: 'echo', name: 'Masculina Calma', gender: 'male' },
  { id: 'fable', name: 'Feminina Melodiosa', gender: 'female' },
  { id: 'onyx', name: 'Masculina Profunda', gender: 'male' },
  { id: 'nova', name: 'Neutra Relaxante', gender: 'neutral' },
  { id: 'shimmer', name: 'Feminina Cristalina', gender: 'female' }
] as const;