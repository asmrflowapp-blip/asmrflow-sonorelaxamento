import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Configuração da OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { text, voice = 'alloy', speed = 1.0 } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Texto é obrigatório' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      // Retorna resposta simulada se não houver API key
      return NextResponse.json({
        success: true,
        audioUrl: `/sounds/generated-${Date.now()}.mp3`,
        message: 'Áudio simulado gerado (configure OPENAI_API_KEY para usar TTS real)'
      });
    }

    // Gerar áudio com OpenAI TTS
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: voice as 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer',
      input: text,
      speed: speed,
    });

    // Converter para buffer
    const buffer = Buffer.from(await mp3.arrayBuffer());

    // Em produção, você salvaria o arquivo em um storage (AWS S3, Vercel Blob, etc.)
    // Por enquanto, retornamos o buffer como base64 para demonstração
    const base64Audio = buffer.toString('base64');
    const audioDataUrl = `data:audio/mpeg;base64,${base64Audio}`;

    return NextResponse.json({
      success: true,
      audioUrl: audioDataUrl,
      message: 'Áudio gerado com sucesso'
    });

  } catch (error) {
    console.error('Erro na geração de TTS:', error);
    
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

// Endpoint para listar vozes disponíveis
export async function GET() {
  const voices = [
    { id: 'alloy', name: 'Alloy - Feminina Suave', gender: 'female' },
    { id: 'echo', name: 'Echo - Masculina Calma', gender: 'male' },
    { id: 'fable', name: 'Fable - Feminina Expressiva', gender: 'female' },
    { id: 'onyx', name: 'Onyx - Masculina Profunda', gender: 'male' },
    { id: 'nova', name: 'Nova - Feminina Energética', gender: 'female' },
    { id: 'shimmer', name: 'Shimmer - Feminina Suave', gender: 'female' }
  ];

  return NextResponse.json({ voices });
}