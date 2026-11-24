import React from 'react';
import { ThreatVisualType } from '../types/game';

interface ThreatIllustrationProps {
  visual: ThreatVisualType;
  dangerSide?: 'left' | 'right';
}

export const ThreatIllustration: React.FC<ThreatIllustrationProps> = ({
  visual,
  dangerSide = 'left',
}) => {
  switch (visual) {
    case 'cat':
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 animate-egg-wobble drop-shadow-sm">
          {/* Mischievous Cat */}
          <path d="M24 44 L18 16 L46 30 Z" fill="#F4A261" stroke="#4A342E" strokeWidth="4" strokeLinejoin="round" />
          <path d="M96 44 L102 16 L74 30 Z" fill="#F4A261" stroke="#4A342E" strokeWidth="4" strokeLinejoin="round" />
          <ellipse cx="60" cy="64" rx="40" ry="34" fill="#F4A261" stroke="#4A342E" strokeWidth="4" />
          <ellipse cx="45" cy="58" rx="6" ry="8" fill="#4A342E" />
          <ellipse cx="75" cy="58" rx="6" ry="8" fill="#4A342E" />
          <circle cx="43" cy="55" r="2" fill="#FFF" />
          <circle cx="73" cy="55" r="2" fill="#FFF" />
          <polygon points="60,68 55,63 65,63" fill="#FF8FA3" />
          <path d="M52 74 Q60 80 60 72 Q60 80 68 74" fill="none" stroke="#4A342E" strokeWidth="3" strokeLinecap="round" />
          <line x1="16" y1="64" x2="32" y2="66" stroke="#4A342E" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="16" y1="72" x2="32" y2="71" stroke="#4A342E" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="104" y1="64" x2="88" y2="66" stroke="#4A342E" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="104" y1="72" x2="88" y2="71" stroke="#4A342E" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'dog':
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 animate-egg-wobble drop-shadow-sm">
          {/* Floppy ears */}
          <ellipse cx="22" cy="56" rx="12" ry="26" transform="rotate(15 22 56)" fill="#A98467" stroke="#4A342E" strokeWidth="4" />
          <ellipse cx="98" cy="56" rx="12" ry="26" transform="rotate(-15 98 56)" fill="#A98467" stroke="#4A342E" strokeWidth="4" />
          <circle cx="60" cy="60" r="36" fill="#E9C46A" stroke="#4A342E" strokeWidth="4" />
          <ellipse cx="60" cy="72" rx="18" ry="14" fill="#FFF3B0" />
          <circle cx="46" cy="52" r="5.5" fill="#4A342E" />
          <circle cx="74" cy="52" r="5.5" fill="#4A342E" />
          <ellipse cx="60" cy="66" rx="7" ry="5" fill="#4A342E" />
          <path d="M55 77 Q60 90 65 77 Z" fill="#FF8FA3" stroke="#4A342E" strokeWidth="2.5" />
        </svg>
      );

    case 'rain':
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 animate-float-slow drop-shadow-sm">
          <path
            d="M28 66 C16 66, 14 48, 28 45 C30 28, 56 22, 68 35 C78 26, 98 32, 96 48 C108 50, 106 66, 92 66 Z"
            fill="#A8DADC"
            stroke="#4A342E"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path d="M36 78 L31 94" stroke="#457B9D" strokeWidth="4" strokeLinecap="round" />
          <path d="M60 76 L55 96" stroke="#457B9D" strokeWidth="4" strokeLinecap="round" />
          <path d="M84 78 L79 94" stroke="#457B9D" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'hen':
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 animate-egg-wobble drop-shadow-sm">
          {/* Comb */}
          <path d="M46 28 C44 16, 56 14, 58 24 C62 12, 74 16, 70 28 Z" fill="#FF6B6B" stroke="#4A342E" strokeWidth="3.5" />
          <ellipse cx="60" cy="64" rx="34" ry="34" fill="#FFFFFF" stroke="#4A342E" strokeWidth="4" />
          {/* Angry/suspicious eyes */}
          <circle cx="46" cy="56" r="5" fill="#4A342E" />
          <circle cx="74" cy="56" r="5" fill="#4A342E" />
          <line x1="38" y1="48" x2="52" y2="52" stroke="#4A342E" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="82" y1="48" x2="68" y2="52" stroke="#4A342E" strokeWidth="3.5" strokeLinecap="round" />
          {/* Beak */}
          <polygon points="60,72 51,62 69,62" fill="#FFB703" stroke="#4A342E" strokeWidth="3" strokeLinejoin="round" />
          <ellipse cx="60" cy="78" rx="6" ry="7" fill="#FF6B6B" stroke="#4A342E" strokeWidth="2.5" />
        </svg>
      );

    case 'sun':
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 animate-egg-wobble drop-shadow-sm">
          <circle cx="60" cy="60" r="28" fill="#FFB703" stroke="#6D4C41" strokeWidth="4" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="60"
              y1="14"
              x2="60"
              y2="24"
              stroke="#FB8500"
              strokeWidth="5"
              strokeLinecap="round"
              transform={`rotate(${deg} 60 60)`}
            />
          ))}
          <rect x="42" y="52" width="15" height="9" rx="2" fill="#4A342E" />
          <rect x="63" y="52" width="15" height="9" rx="2" fill="#4A342E" />
          <line x1="57" y1="55" x2="63" y2="55" stroke="#4A342E" strokeWidth="3" />
          <path d="M52 72 Q60 77 68 72" fill="none" stroke="#4A342E" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'rock':
      return (
        <div className="flex items-center gap-2">
          {dangerSide === 'left' && <span className="text-2xl font-bold text-[#E76F51] animate-pulse">➡️</span>}
          <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 animate-egg-shake drop-shadow-sm">
            <path
              d="M28 84 L18 54 L38 26 L76 22 L100 46 L96 84 L62 96 Z"
              fill="#B09E99"
              stroke="#4A342E"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            <path d="M42 40 L58 52 L50 66" fill="none" stroke="#6D4C41" strokeWidth="3" strokeLinecap="round" />
            <circle cx="76" cy="58" r="5" fill="#8C7A75" />
          </svg>
          {dangerSide === 'right' && <span className="text-2xl font-bold text-[#E76F51] animate-pulse">⬅️</span>}
        </div>
      );

    case 'thief':
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 animate-egg-wobble drop-shadow-sm">
          <circle cx="60" cy="62" r="34" fill="#FFDAB9" stroke="#4A342E" strokeWidth="4" />
          {/* Beanie */}
          <path d="M26 52 C28 20, 92 20, 94 52 Z" fill="#4A342E" />
          {/* Bandit mask */}
          <rect x="30" y="48" width="60" height="20" rx="10" fill="#2B2D42" />
          <circle cx="46" cy="58" r="4.5" fill="#FFFFFF" />
          <circle cx="74" cy="58" r="4.5" fill="#FFFFFF" />
          <circle cx="47" cy="58" r="2" fill="#2B2D42" />
          <circle cx="75" cy="58" r="2" fill="#2B2D42" />
          <path d="M52 80 Q60 76 68 80" fill="none" stroke="#4A342E" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'ufo':
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 animate-float-slow drop-shadow-sm">
          {/* Tractor beam */}
          <polygon points="44,68 76,68 96,112 24,112" fill="#72EFDD" opacity="0.45" />
          {/* Dome */}
          <path d="M40 46 C40 24, 80 24, 80 46 Z" fill="#A8DADC" stroke="#4A342E" strokeWidth="3.5" />
          {/* Saucer */}
          <ellipse cx="60" cy="52" rx="44" ry="15" fill="#8D99AE" stroke="#4A342E" strokeWidth="4" />
          <circle cx="34" cy="52" r="4" fill="#FFD166" />
          <circle cx="60" cy="55" r="4" fill="#FF8FA3" />
          <circle cx="86" cy="52" r="4" fill="#FFD166" />
        </svg>
      );

    default:
      // Clean illustrated badge card for remaining cute threats (fox, bee, wind, banana, raccoon, pigeon, fall, gossip, care)
      const emojiMap: Record<ThreatVisualType, { icon: string; bg: string }> = {
        cat: { icon: '🐱', bg: '#FFE5EC' },
        dog: { icon: '🐶', bg: '#FFF3B0' },
        rain: { icon: '🌧️', bg: '#D6EEFF' },
        hen: { icon: '🐔', bg: '#FFE8D6' },
        pigeon: { icon: '🐦', bg: '#D6EEFF' },
        fall: { icon: '💥', bg: '#FFD6E0' },
        thief: { icon: '🕵️', bg: '#EDE0D4' },
        sun: { icon: '☀️', bg: '#FFF3B0' },
        rock: { icon: '🪨', bg: '#EDE0D4' },
        fox: { icon: '🦊', bg: '#FFE5D9' },
        bee: { icon: '🐝', bg: '#FFF3B0' },
        wind: { icon: '❄️', bg: '#E0FBFC' },
        banana: { icon: '🍌', bg: '#FFF3B0' },
        raccoon: { icon: '🦝', bg: '#E5E5E5' },
        ufo: { icon: '🛸', bg: '#E0FBFC' },
        gossip: { icon: '📱', bg: '#FFD6E0' },
        care: { icon: '💖', bg: '#FFD6E0' },
      };
      const item = emojiMap[visual];
      return (
        <div
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl border-4 border-[#6D4C41] flex items-center justify-center shadow-sm animate-egg-wobble"
          style={{ backgroundColor: item.bg }}
        >
          <span className="text-5xl select-none" role="img" aria-label={visual}>
            {item.icon}
          </span>
        </div>
      );
  }
};
