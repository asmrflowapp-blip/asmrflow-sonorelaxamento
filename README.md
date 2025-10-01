# 🎧 ASMRFlow – Sono & Relaxamento

Um aplicativo completo de ASMR personalizado para sono, relaxamento e foco, desenvolvido com Next.js 15, React 19 e integração com OpenAI TTS.

## ✨ Funcionalidades Principais

### 🏠 **Tela Inicial**
- Logo e slogan do app
- Botões de acesso rápido:
  - "Quero dormir rápido" → Sons de sono
  - "Quero relaxar" → Biblioteca de sons
  - "Criar meu mix" → Criador de mix personalizado
- Sistema de autenticação integrado

### 🔐 **Sistema de Autenticação**
- Cadastro com e-mail e senha
- Login seguro
- Área do usuário personalizada
- Histórico de sessões e estatísticas
- Sistema de conquistas (achievements)

### 🎵 **Biblioteca de Sons ASMR**
Sons disponíveis:
- **Natureza**: Chuva suave, vento na floresta, gotas d'água, ondas do mar
- **Ambiente**: Lareira crepitante
- **Mecânicos**: Digitação suave, folheando páginas
- **Vozes**: Sussurros relaxantes

**Controles avançados para cada som:**
- Slider de volume individual
- Toggle de efeito eco
- Seleção de canal (esquerdo/direito/ambos)
- Botão de teste individual

### 🎨 **Criador de Mix Sonoro**
- Combine até 5 sons simultaneamente
- Ajuste volume, eco e canal de cada som
- Controles de reprodução (Play/Pause/Stop)
- Volume master
- Salvar mixes com nomes personalizados
- Compartilhar e exportar mixes
- Função de download em JSON

### ⏰ **Timer Inteligente**
- Opções: 20, 40, 60 e 90 minutos
- Barra de progresso visual
- Mensagem de fim personalizada com TTS
- Parada automática do áudio
- Integração com sistema de sessões

### 🎙️ **Gerador de Voz IA (OpenAI TTS)**
- **6 vozes disponíveis**:
  - Alloy - Feminina Suave
  - Echo - Masculina Calma
  - Fable - Feminina Expressiva
  - Onyx - Masculina Profunda
  - Nova - Feminina Energética
  - Shimmer - Feminina Suave

- **Funcionalidades**:
  - Campo de texto livre para narração
  - Frases pré-definidas de meditação
  - Botão "Frase Aleatória" para inspiração
  - Velocidade otimizada para ASMR (0.9x)
  - Reprodução instantânea do áudio gerado

### 📚 **Histórias & Sessões Guiadas**
- **Histórias narradas**:
  - "Caminhada na Floresta"
  - "Pôr do Sol na Praia"
  - "Meditação na Montanha"
- Sons de fundo integrados
- Diferentes vozes (feminina, masculina, neutra)
- Sessões de respiração guiada

### 👤 **Área do Usuário**
- **Estatísticas pessoais**:
  - Sequência de dias usando o app
  - Total de sessões completadas
  - Número de mixes criados
  - Conquistas desbloqueadas

- **Histórico detalhado**:
  - Sessões recentes com tipo e duração
  - Mixes salvos
  - Progresso de conquistas

### 💎 **Sistema Premium**
**Versão Gratuita:**
- Sons básicos (chuva, vento, lareira, gotas d'água)
- 2 gerações de TTS por semana
- Mixes limitados
- Histórias básicas

**Versão Premium (R$ 9,90/mês ou R$ 89,90/ano):**
- Biblioteca completa de sons
- TTS ilimitado com todas as vozes
- Mixes ilimitados
- Todas as histórias e sessões
- Downloads offline
- Sem anúncios
- Vozes premium exclusivas

### 🏆 **Sistema de Conquistas**
- **Primeira Noite**: Complete sua primeira sessão de sono
- **Uma Semana Zen**: Use o app por 7 dias consecutivos
- **Mestre dos Mixes**: Crie 5 mixes personalizados
- **Amante de Histórias**: Ouça 10 histórias completas
- **Guru da Meditação**: Complete 50 sessões de meditação

## 🛠️ **Tecnologias Utilizadas**

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4 com design system personalizado
- **UI Components**: Shadcn/ui (Radix UI)
- **Ícones**: Lucide React
- **IA**: OpenAI TTS API para geração de vozes
- **Estado**: Context API com hooks personalizados
- **Armazenamento**: LocalStorage (produção: banco de dados)

## 🎨 **Design System**

**Paleta de Cores:**
- **Primária**: Gradiente roxo para rosa (#8B5CF6 → #EC4899)
- **Background**: Gradiente escuro (slate-900 → purple-900 → slate-900)
- **Acentos**: Azul escuro, lilás e branco suave
- **Premium**: Dourado (#F59E0B) para elementos premium

**Tipografia:**
- **Fontes**: Inter, Geist Sans, Geist Mono
- **Hierarquia**: Títulos em branco, textos em purple-200
- **Responsividade**: Mobile-first design

## 🚀 **Como Usar**

### 1. **Configuração Inicial**
```bash
# Instalar dependências (já incluídas)
npm install

# Configurar variável de ambiente (opcional)
OPENAI_API_KEY=sua_chave_aqui
```

### 2. **Primeiro Acesso**
1. Abra o aplicativo
2. Crie uma conta ou faça login
3. Explore os sons na biblioteca
4. Crie seu primeiro mix personalizado

### 3. **Criando um Mix ASMR**
1. Vá para "Biblioteca de Sons"
2. Clique no botão "+" nos sons desejados
3. Ajuste volume, eco e canal de cada som
4. Vá para "Mixer" e clique em "Play"
5. Configure o timer se desejar
6. Salve seu mix com um nome personalizado

### 4. **Usando o Gerador de Voz**
1. Acesse "Histórias & Sessões Guiadas"
2. Escolha uma voz no "Gerador de Voz IA"
3. Digite seu texto ou use "Frase Aleatória"
4. Clique em "Gerar Áudio"
5. O áudio será reproduzido automaticamente

### 5. **Acompanhando Progresso**
1. Acesse "Meu Perfil"
2. Veja suas estatísticas e conquistas
3. Acompanhe seu histórico de sessões
4. Desbloqueie novas conquistas usando o app

## 🔧 **Configuração da API OpenAI**

Para usar o gerador de voz real:

1. **Obtenha uma API Key da OpenAI**:
   - Acesse [platform.openai.com](https://platform.openai.com)
   - Crie uma conta e gere uma API key

2. **Configure a variável de ambiente**:
   - Clique no banner laranja que aparecerá na interface
   - Adicione: `OPENAI_API_KEY=sua_chave_aqui`

3. **Sem API Key**:
   - O app funciona normalmente com áudio simulado
   - Todas as outras funcionalidades permanecem ativas

## 📱 **Responsividade**

O aplicativo é totalmente responsivo:
- **Mobile**: Layout otimizado para telas pequenas
- **Tablet**: Aproveitamento do espaço adicional
- **Desktop**: Interface completa com todos os recursos

## 🔒 **Segurança e Privacidade**

- Dados do usuário armazenados localmente
- Senhas não são armazenadas (simulação de auth)
- API calls seguras para OpenAI
- Sem coleta de dados pessoais desnecessários

## 🎯 **Casos de Uso**

### **Para Dormir**
1. Escolha sons de chuva + vento
2. Configure timer para 60 minutos
3. Ajuste volume baixo
4. Ative o timer e relaxe

### **Para Trabalhar/Estudar**
1. Use sons de digitação + papel
2. Volume médio sem timer
3. Canal "ambos" para imersão
4. Pause quando necessário

### **Para Meditação**
1. Gere uma sessão de respiração com TTS
2. Adicione som de fundo (água)
3. Use timer de 20 minutos
4. Foque na voz guiada

### **Para Relaxamento**
1. Combine lareira + chuva
2. Adicione sussurros suaves
3. Configure eco para ambiente
4. Crie e salve como "Mix Relaxante"

## 🚀 **Próximas Funcionalidades**

- Upload de sons personalizados
- Integração com Spotify/Apple Music
- Modo offline completo
- Sincronização entre dispositivos
- Análise de padrões de sono
- Recomendações personalizadas por IA
- Comunidade de usuários
- Playlists colaborativas

---

**ASMRFlow** - Transforme seu momento de relaxamento em uma experiência única e personalizada! 🎧✨