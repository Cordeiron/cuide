import { ActiveChallenge, ChallengeDefinition, EndingType } from '../types/game';

export const TOTAL_CHALLENGES_PER_RUN = 12;

export interface LevelInfo {
  level: number;
  title: string;
  timeMultiplier: number;
  intensityBonus: number;
}

export function getLevelForChallenge(challengeNumber: number): LevelInfo {
  if (challengeNumber <= 2) {
    return { level: 1, title: 'Cuidadora iniciante', timeMultiplier: 1.0, intensityBonus: 0 };
  }
  if (challengeNumber <= 5) {
    return { level: 2, title: 'Guardiã do ovo', timeMultiplier: 0.92, intensityBonus: 1 };
  }
  if (challengeNumber <= 8) {
    return { level: 3, title: 'Protetora profissional', timeMultiplier: 0.85, intensityBonus: 2 };
  }
  if (challengeNumber <= 10) {
    return { level: 4, title: 'Especialista em ovos', timeMultiplier: 0.78, intensityBonus: 2 };
  }
  return { level: 5, title: 'Lenda mundial dos ovos', timeMultiplier: 0.72, intensityBonus: 3 };
}

export const CHALLENGES_CATALOG: ChallengeDefinition[] = [
  {
    id: 'cat',
    visual: 'cat',
    emoji: '🐱',
    title: 'UM GATO ESTÁ CHEGANDO!',
    description: 'O gato achou que o ovo é uma bolinha de lã! Clique rápido para espantá-lo!',
    actionHint: 'Toque rápido várias vezes para enxotar o gato',
    mechanic: 'mash',
    baseDurationSec: 6.5,
    baseRequiredTaps: 8,
    actionButtonLabel: 'ESPANTAR O GATO! 🧹',
    successMessage: 'Xô, bichano! O gato saiu correndo atrás de um novelo imaginário.',
    failMessage: 'O gato deu um tapinha de patinha no ovo! Que susto!',
    damageOnFail: 20,
    ownerEventMessages: [
      'Por que tem um gato perto dele???',
      'REBECA, NÃO DEIXA O GATO BRINCAR COM MEU OVO!',
    ],
    eggMoodDuring: 'scared',
    accentColor: '#FF8FA3',
  },
  {
    id: 'dog',
    visual: 'dog',
    emoji: '🐶',
    title: 'O CACHORRO QUER O OVO!',
    description: 'Ele acha que é uma bolinha nova! Escolha o que fazer para distrair o doguinho!',
    actionHint: 'Escolha a melhor distração antes que ele abocanhe',
    mechanic: 'choice',
    baseDurationSec: 7.0,
    choices: [
      {
        id: 'snack',
        label: '🦴 Jogar um petisco bem longe',
        isCorrect: true,
        feedback: 'Boa, Rebeca! Ele saiu abanando o rabo atrás do ossinho!',
      },
      {
        id: 'bark',
        label: '🗣️ Latir de volta pra ele',
        isCorrect: false,
        feedback: 'Ele achou que era brincadeira e pulou em cima do ovo!',
      },
      {
        id: 'stare',
        label: '👀 Encarar ele sério',
        isCorrect: false,
        feedback: 'Ele lambeu o ovo inteiro enquanto você encarava!',
      },
    ],
    successMessage: 'Doguinho distraído com sucesso! Ele agora está dormindo feliz.',
    failMessage: 'O cachorro deu uma babada no ovo achando que era brinquedo!',
    damageOnFail: 18,
    ownerEventMessages: [
      'EU OUVI UM LATIDO AÍ?!',
      'Rebeca, o cachorro não sabe que é um ovo frágil!!',
    ],
    eggMoodDuring: 'scared',
    accentColor: '#FFD166',
  },
  {
    id: 'rain',
    visual: 'rain',
    emoji: '🌧️',
    title: 'COMEÇOU A CHOVER!',
    description: 'Chuva de repente! Segure o botão do guarda-chuva até a nuvem ir embora!',
    actionHint: 'Pressione e SEGURE o botão sem soltar',
    mechanic: 'hold',
    baseDurationSec: 6.5,
    baseHoldSec: 2.3,
    actionButtonLabel: 'SEGURAR GUARDA-CHUVA ☂️',
    successMessage: 'Seco e quentinho! Nem uma gotinha encostou na casca.',
    failMessage: 'O ovo tomou banho de chuva e ficou gripado!',
    damageOnFail: 18,
    ownerEventMessages: [
      'TA CHOVENDO AÍ?! NÃO DEIXA ELE MOLHAR!',
      'Rebeca, ovo resfriado não dá certo!!',
    ],
    eggMoodDuring: 'sad',
    accentColor: '#7EC8E3',
  },
  {
    id: 'hen',
    visual: 'hen',
    emoji: '🐔',
    title: 'UMA GALINHA APARECEU!',
    description: 'Ela está olhando desconfiada e quer recuperar o ovo! Resolva na diplomacia!',
    actionHint: 'Escolha a reação mais esperta para acalmar a galinha',
    mechanic: 'choice',
    baseDurationSec: 7.2,
    choices: [
      {
        id: 'corn',
        label: '🌽 Oferecer milho fresquinho',
        isCorrect: true,
        feedback: 'Suborno aceito! A galinha foi embora feliz bicando milho!',
      },
      {
        id: 'run',
        label: '🏃 Gritar "ESSE OVO É MEU!"',
        isCorrect: false,
        feedback: 'Ela ficou furiosa e bicou a casca do ovo!',
      },
      {
        id: 'mirror',
        label: '🥚 Mostrar outra foto de ovo',
        isCorrect: false,
        feedback: 'Ela ficou ainda mais confusa e partiu pra cima!',
      },
    ],
    successMessage: 'Diplomacia nota 10, Rebeca! A dona galinha seguiu viagem.',
    failMessage: 'A galinha deu uma bicada de aviso na casca!',
    damageOnFail: 20,
    ownerEventMessages: [
      'Uma galinha?! Rebeca, NÃO ENTREGA MEU OVO!',
      'Explica pra ela que esse ovo tem dona!!',
    ],
    eggMoodDuring: 'desperate',
    accentColor: '#F4A261',
  },
  {
    id: 'pigeon',
    visual: 'pigeon',
    emoji: '🐦',
    title: 'POMBOS ESTÃO SE APROXIMANDO!',
    description: 'Um bando de pombos quer fazer ninho em cima do ovo! Toque em cada pombo!',
    actionHint: 'Toque diretamente em todos os pombos na tela',
    mechanic: 'targets',
    baseDurationSec: 7.0,
    targetCount: 4,
    targetEmoji: '🐦',
    targetLabel: 'Espantar!',
    successMessage: 'Todos os pombos foram espantados! Espaço aéreo limpo.',
    failMessage: 'Os pombos quase sequestraram o ovo pra praça!',
    damageOnFail: 19,
    ownerEventMessages: [
      'Pombos?! Que bairro é esse, Rebeca?!',
      'AFASTA ESSES POMBOS DO MEU OVO!',
    ],
    eggMoodDuring: 'scared',
    accentColor: '#90E0EF',
  },
  {
    id: 'fall',
    visual: 'fall',
    emoji: '💥',
    title: 'O OVO ESTÁ CAINDO!',
    description: 'ELE ESCORREGOU DA MESA!! Clique muito rápido para segurar antes do chão!',
    actionHint: 'Clique sem parar para amortecer a queda!',
    mechanic: 'mash',
    baseDurationSec: 5.5,
    baseRequiredTaps: 9,
    actionButtonLabel: 'SEGURAR O OVO!! 🤲',
    successMessage: 'REFLEXO DE GOLEIRA, REBECA!! Pegou no último centímetro!',
    failMessage: 'PLOC! Ele bateu de quina no tapete! Ai minha pressão!',
    damageOnFail: 26,
    ownerEventMessages: [
      'REBECA, POR QUE ELE TÁ VOANDO?!',
      'NÃO DEIXA ELE QUEBRAR!! PELO AMOR DE DEUS!',
    ],
    eggMoodDuring: 'desperate',
    accentColor: '#FF6B6B',
  },
  {
    id: 'thief',
    visual: 'thief',
    emoji: '🕵️',
    title: 'ALGUÉM QUER ROUBAR O OVO!',
    description: 'Um ladrão mascarado está tentando levar o ovo! Toque rápido para impedir!',
    actionHint: 'Bata na mão do ladrão clicando rápido!',
    mechanic: 'mash',
    baseDurationSec: 6.2,
    baseRequiredTaps: 10,
    actionButtonLabel: 'IMPEDIR O ROUBO! 👋',
    successMessage: 'O ladrão saiu correndo gritando "Essa Rebeca é braba demais!"',
    failMessage: 'O ladrão quase levou e ainda deu um trisco na casca!',
    damageOnFail: 22,
    ownerEventMessages: [
      'CADÊ MEU OVO?! TEM ALGUÉM AÍ?!',
      'REBECA, CHAMA A POLÍCIA DO OVO!',
    ],
    eggMoodDuring: 'desperate',
    accentColor: '#6D4C41',
  },
  {
    id: 'sun',
    visual: 'sun',
    emoji: '🔥',
    title: 'O SOL ESTÁ MUITO FORTE!',
    description: 'Vai virar ovo frito no asfalto! Segure a folha de sombra até refrescar!',
    actionHint: 'Pressione e SEGURE para manter a sombra',
    mechanic: 'hold',
    baseDurationSec: 6.8,
    baseHoldSec: 2.5,
    actionButtonLabel: 'COLOCAR NA SOMBRA 🌴',
    successMessage: 'Fresquinho e protegido do calor! O ovo agradece.',
    failMessage: 'O ovo quase começou a chiar! Ficou suando frio!',
    damageOnFail: 20,
    ownerEventMessages: [
      'Rebeca, não quero omelete hoje não!!',
      'PÕE ELE NA SOMBRA, MULHER!',
    ],
    eggMoodDuring: 'sad',
    accentColor: '#FFB703',
  },
  {
    id: 'rock',
    visual: 'rock',
    emoji: '🪨',
    title: 'UMA PEDRA ESTÁ ROLANDO!',
    description: 'Cuidado! Uma pedra gigante vem rolando! Desvie o ovo para o lado seguro!',
    actionHint: 'Veja de que lado vem a pedra e desvie pro lado OPOSTO',
    mechanic: 'dodge',
    baseDurationSec: 5.5,
    successMessage: 'Desvio perfeito! A pedra passou raspando e não arranhou nada!',
    failMessage: 'BOING! A pedra deu um esbarrão no ovo!',
    damageOnFail: 24,
    ownerEventMessages: [
      'QUE BARULHO DE PEDRA FOI ESSE?!',
      'REBECA, TIRA ELE DA FRENTE!',
    ],
    eggMoodDuring: 'desperate',
    accentColor: '#A98467',
  },
  {
    id: 'fox',
    visual: 'fox',
    emoji: '🦊',
    title: 'UMA RAPOSA ESTÁ SE APROXIMANDO!',
    description: 'Olhar faminto detectado! Toque na raposa várias vezes para assustá-la!',
    actionHint: 'Toque direto na raposa ou clique rápido para assustar',
    mechanic: 'targets',
    baseDurationSec: 6.8,
    targetCount: 4,
    targetEmoji: '🦊',
    targetLabel: 'Xô Raposa!',
    successMessage: 'Raposa despachada! Hoje não vai ter omelete pra ela.',
    failMessage: 'A raposa chegou perto demais e deu um susto terrível no ovo!',
    damageOnFail: 22,
    ownerEventMessages: [
      'UMA RAPOSA?! ONDE VOCÊ LEVOU MEU OVO, REBECA?!',
      'PROTEGE ESSE OVO COM SUA VIDA!',
    ],
    eggMoodDuring: 'scared',
    accentColor: '#E76F51',
  },
  {
    id: 'bee',
    visual: 'bee',
    emoji: '🐝',
    title: 'UM ENXAME DE ABELHAS!',
    description: 'Elas acharam que o ovo é uma colmeia estilosa! Espante todas as abelhas!',
    actionHint: 'Toque em todas as abelhas zumbindo na tela',
    mechanic: 'targets',
    baseDurationSec: 7.0,
    targetCount: 5,
    targetEmoji: '🐝',
    targetLabel: 'Shoo!',
    successMessage: 'Nenhuma picada! Rebeca, você tem mira de precisão.',
    failMessage: 'Bzzzz! As abelhas deixaram o ovo todo assustado!',
    damageOnFail: 17,
    ownerEventMessages: [
      'Tô ouvindo zumbido no áudio, Rebeca?!',
      'Cuidado com as abelhas!!',
    ],
    eggMoodDuring: 'scared',
    accentColor: '#FFD166',
  },
  {
    id: 'wind',
    visual: 'wind',
    emoji: '❄️',
    title: 'BATEU UM VENTO GELADO!',
    description: 'O ovo está batendo o queixo de frio! Abrace e segure o cachecol nele!',
    actionHint: 'Pressione e SEGURE para aquecer o ovo',
    mechanic: 'hold',
    baseDurationSec: 6.5,
    baseHoldSec: 2.2,
    actionButtonLabel: 'AQUECER COM CACHECOL 🧣',
    successMessage: 'Aqueceu todinho! E ainda recuperou um pouquinho de energia.',
    failMessage: 'Brrr! O ovo congelou os dedinhos imaginários!',
    damageOnFail: 16,
    healOnSuccess: 6,
    ownerEventMessages: [
      'Fecha a janela, Rebeca! Ele tá tremendo!',
      'Dá um abraço quentinho nele!',
    ],
    eggMoodDuring: 'sad',
    accentColor: '#90E0EF',
  },
  {
    id: 'banana',
    visual: 'banana',
    emoji: '🍌',
    title: 'CASCA DE BANANA NO CAMINHO!',
    description: 'O ovo começou a rolar igual desenho animado! O que você faz?!',
    actionHint: 'Escolha rápido antes que ele escorregue',
    mechanic: 'choice',
    baseDurationSec: 6.2,
    choices: [
      {
        id: 'pillow',
        label: '🛋️ Jogar uma almofada fofinha',
        isCorrect: true,
        feedback: 'Pouso macio de cinema! Nem balançou a gema!',
      },
      {
        id: 'kick',
        label: '🦶 Chutar a banana mais longe',
        isCorrect: false,
        feedback: 'Você escorregou na banana junto com o ovo!',
      },
      {
        id: 'scream',
        label: '😱 Só gritar "AI MEU DEUS"',
        isCorrect: false,
        feedback: 'Gritar não parou a gravidade, Rebeca!',
      },
    ],
    successMessage: 'Almofada salvadora! Aterrisagem 10/10.',
    failMessage: 'ESCORREGOU! Quase rolou escada abaixo!',
    damageOnFail: 20,
    ownerEventMessages: [
      'QUEM DEIXOU CASCA DE BANANA NO CHÃO?!',
      'REBECA, OLHA ONDE VOCÊ PISA!',
    ],
    eggMoodDuring: 'desperate',
    accentColor: '#FFE066',
  },
  {
    id: 'raccoon',
    visual: 'raccoon',
    emoji: '🦝',
    title: 'UM GUAXINIM CURIOSO!',
    description: 'Ele acha que o ovo é um ovo de Páscoa recheado! Feche a cesta rápido!',
    actionHint: 'Clique rápido para proteger a cesta!',
    mechanic: 'mash',
    baseDurationSec: 6.4,
    baseRequiredTaps: 9,
    actionButtonLabel: 'PROTEGER A CESTA! 🧺',
    successMessage: 'O guaxinim desistiu e foi procurar lixo chique em outro lugar.',
    failMessage: 'O guaxinim deu uma mordidinha exploratória! Que susto!',
    damageOnFail: 19,
    ownerEventMessages: [
      'DE ONDE SAIU UM GUAXINIM, REBECA?!',
      'ISSO NÃO É OVO DE PÁSCOA NÃO!',
    ],
    eggMoodDuring: 'scared',
    accentColor: '#8D99AE',
  },
  {
    id: 'ufo',
    visual: 'ufo',
    emoji: '🛸',
    title: 'UM DISCO VOADOR QUER O OVO!',
    description: 'Alienígenas querem estudar o ovo mais fofo da Terra! Segure ele no chão!',
    actionHint: 'Clique sem parar para puxar o ovo de volta!',
    mechanic: 'mash',
    baseDurationSec: 6.5,
    baseRequiredTaps: 10,
    actionButtonLabel: 'PUXAR PRO CHÃO! 🧲',
    successMessage: 'Os ETs desistiram e mandaram um joinha lá de cima!',
    failMessage: 'O raio trator deu um chacoalhão no ovo antes de soltar!',
    damageOnFail: 21,
    ownerEventMessages: [
      'REBECA, TEM LUZ VERDE NO CÉU?!',
      'NÃO DEIXA OS ETS LEVAREM MEU OVO!',
    ],
    eggMoodDuring: 'desperate',
    accentColor: '#72EFDD',
  },
  {
    id: 'gossip',
    visual: 'gossip',
    emoji: '📱',
    title: 'FOFOCA QUENTE NO CELULAR!',
    description: 'Chegou uma mensagem com "VOCÊ NÃO VAI ACREDITAR"! Mas o ovo precisa de atenção!',
    actionHint: 'NÃO caia na tentação! Foque no ovo!',
    mechanic: 'choice',
    baseDurationSec: 6.0,
    choices: [
      {
        id: 'focus',
        label: '🥚 IGNORAR FOFOCA E CUIDAR DO OVO',
        isCorrect: true,
        feedback: 'Autocontrole lendário, Rebeca! A fofoca espera, o ovo não!',
      },
      {
        id: 'read',
        label: '👀 SÓ DAR UMA ESPIADINHA NA FOFOCA...',
        isCorrect: false,
        feedback: 'Você olhou pro lado 2 segundos e o ovo rolou da almofada!',
      },
    ],
    successMessage: 'Foco total! O ovo se sentiu a prioridade número 1.',
    failMessage: 'A fofoca nem era tão boa e o ovo ainda caiu no chão!',
    damageOnFail: 18,
    healOnSuccess: 5,
    ownerEventMessages: [
      'Rebeca, larga o celular um segundo!!',
      'Eu vi você ficando online no WhatsApp!',
    ],
    eggMoodDuring: 'sad',
    accentColor: '#FF8FA3',
  },
  {
    id: 'care',
    visual: 'care',
    emoji: '💖',
    title: 'MOMENTO CARINHO DA REBECA!',
    description: 'O ovo está carente e quer um dengo! Faça um carinho bem caprichado pra recuperar vida!',
    actionHint: 'Segure para dar um abraço quentinho no ovo (+Vida)',
    mechanic: 'hold',
    baseDurationSec: 6.5,
    baseHoldSec: 1.8,
    actionButtonLabel: 'FAZER CARINHO NO OVO 💖',
    successMessage: 'Ownnn! O ovo ficou todo corado e recuperou energia!',
    failMessage: 'O ovo ficou esperando o carinho e fez biquinho...',
    damageOnFail: 5,
    healOnSuccess: 14,
    ownerEventMessages: [
      'Dá um abracinho nele por mim, Rebeca!',
      'Ele ama quando você cuida com carinho ❤️',
    ],
    eggMoodDuring: 'happy',
    accentColor: '#FF8FA3',
  },
];

export function buildChallengePlaylist(count: number = TOTAL_CHALLENGES_PER_RUN): ChallengeDefinition[] {
  // Always ensure variety, include iconic prompt events early/mid, and include 1-2 care moments
  const coreIds = ['cat', 'dog', 'rain', 'hen', 'pigeon', 'fall', 'thief', 'sun', 'rock', 'fox'];
  const extraIds = ['bee', 'wind', 'banana', 'raccoon', 'ufo', 'gossip'];

  const shuffle = <T,>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const byId = new Map(CHALLENGES_CATALOG.map((c) => [c.id, c]));
  const pickedCore = shuffle(coreIds).slice(0, 7);
  const pickedExtra = shuffle(extraIds).slice(0, 4);
  const combined = shuffle([...pickedCore, ...pickedExtra]).map((id) => byId.get(id)!);

  // Insert a care/healing challenge around challenge #6 or #7
  const careChallenge = byId.get('care')!;
  const insertIdx = Math.min(combined.length, 5 + Math.floor(Math.random() * 2));
  combined.splice(insertIdx, 0, careChallenge);

  return combined.slice(0, count);
}

export function createActiveChallenge(
  def: ChallengeDefinition,
  challengeNumber: number
): ActiveChallenge {
  const levelInfo = getLevelForChallenge(challengeNumber);
  const totalTimeSec = Number(Math.max(4.0, def.baseDurationSec * levelInfo.timeMultiplier).toFixed(1));
  const tapsRequired = def.baseRequiredTaps
    ? def.baseRequiredTaps + levelInfo.intensityBonus
    : 8;
  const holdRequiredSec = def.baseHoldSec
    ? Number(Math.min(totalTimeSec - 1.4, def.baseHoldSec + levelInfo.intensityBonus * 0.15).toFixed(1))
    : 2.0;

  const targetCount = def.targetCount
    ? Math.min(7, def.targetCount + (levelInfo.level >= 4 ? 1 : 0))
    : 0;

  // Generate well-spaced targets around the stage
  const targets = Array.from({ length: targetCount }, (_, i) => {
    const angle = (i / Math.max(1, targetCount)) * Math.PI * 2 + Math.random() * 0.6;
    const radiusX = 26 + Math.random() * 14;
    const radiusY = 24 + Math.random() * 14;
    const x = Math.round(Math.min(84, Math.max(16, 50 + Math.cos(angle) * radiusX)));
    const y = Math.round(Math.min(78, Math.max(18, 48 + Math.sin(angle) * radiusY)));
    return { id: i + 1, x, y, hit: false };
  });

  // Shuffle choices if choice mechanic
  const definition: ChallengeDefinition = def.choices
    ? {
        ...def,
        choices: [...def.choices].sort(() => Math.random() - 0.5),
      }
    : def;

  return {
    definition,
    challengeNumber,
    totalTimeSec,
    timeLeftSec: totalTimeSec,
    progress: 0,
    tapsDone: 0,
    tapsRequired,
    holdElapsedSec: 0,
    holdRequiredSec,
    targets,
    dangerSide: Math.random() < 0.5 ? 'left' : 'right',
    resolved: false,
  };
}

export function determineEnding(hp: number, score: number): EndingType {
  if (hp <= 0) return 'tragic';
  if (score >= 2200 && hp >= 85) return 'legendary';
  if (hp >= 65 || (score >= 1650 && hp >= 50)) return 'perfect';
  return 'chaotic';
}

export interface EndingMetadata {
  type: EndingType;
  badge: string;
  title: string;
  message: string;
  subtext: string;
  accentBg: string;
  accentText: string;
  borderColor: string;
}

export const ENDINGS_INFO: Record<EndingType, EndingMetadata> = {
  legendary: {
    type: 'legendary',
    badge: 'FINAL LENDÁRIO 👑',
    title: 'A MAIOR DA HISTÓRIA!',
    message: 'REBECA É OFICIALMENTE A MELHOR CUIDADORA DE OVOS DO MUNDO!',
    subtext: 'O ovo voltou até mais brilhante do que quando eu saí. Você merece uma estátua!',
    accentBg: 'bg-[#FFF3B0]',
    accentText: 'text-[#8C5800]',
    borderColor: 'border-[#FFD166]',
  },
  perfect: {
    type: 'perfect',
    badge: 'FINAL PERFEITO ❤️',
    title: 'MISSÃO CUMPRIDA!',
    message: 'REBECA, VOCÊ CONSEGUIU! EU SABIA QUE PODIA CONFIAR EM VOCÊ!',
    subtext: 'Inteiro, feliz e sem nenhum trauma grave. Já pode colocar no currículo!',
    accentBg: 'bg-[#FFD6E0]',
    accentText: 'text-[#9B2242]',
    borderColor: 'border-[#FF8FA3]',
  },
  chaotic: {
    type: 'chaotic',
    badge: 'FINAL CAÓTICO 😂',
    title: 'SOBREVIVEU POR UM FIO!',
    message: 'Rebeca... eu perdi aproximadamente 15 anos de vida acompanhando essa aventura.',
    subtext: 'O ovo sobreviveu, com alguns curativos e muita história pra contar!',
    accentBg: 'bg-[#D6EEFF]',
    accentText: 'text-[#1D4E73]',
    borderColor: 'border-[#7EC8E3]',
  },
  tragic: {
    type: 'tragic',
    badge: 'FINAL TRÁGICO 💔',
    title: 'VIROU OMELETE...',
    message: 'REBECA... EU CONFIEI EM VOCÊ.',
    subtext: 'Descanse em paz, pequeno ovo. Ele era tão jovem e tinha tantos sonhos...',
    accentBg: 'bg-[#F3E5D8]',
    accentText: 'text-[#6D4C41]',
    borderColor: 'border-[#BC9B8B]',
  },
};

export const OWNER_GENERIC_QUESTIONS = [
  'Rebeca, tá tudo bem com meu ovo?',
  'Você tem certeza?',
  'REBECA, NÃO ME DECEPCIONE!',
  'EU CONFIEI EM VOCÊ!',
  'CADÊ MEU OVO?',
];

export const OWNER_GOOD_REACTIONS = [
  'Rebeca, estou começando a acreditar que escolhi a pessoa certa.',
  'Olha ela!! Reflexo de milhões!',
  'Meu ovo tá sendo tratado igual realeza ❤️',
  'Que orgulho dessa cuidadora oficial!',
];

export const OWNER_BAD_REACTIONS = [
  'Rebeca, por que estou recebendo notícias de um ovo em perigo?',
  'EU SAÍ POR CINCO MINUTOS, REBECA!',
  'REBECA, PELO AMOR DE DEUS!',
  'Tô ouvindo barulho de casca trincando daqui!!',
];

export const OWNER_NEAR_END_MESSAGE =
  'Rebeca, independentemente do resultado, preciso conversar com você sobre esse ovo.';
