import React from 'react';
import { EggMood } from '../types/game';

interface EggCharacterProps {
  mood: EggMood;
  hp: number;
  shieldActive?: 'rain' | 'sun' | 'wind' | 'care' | null;
  dodgeOffset?: 'left' | 'right' | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const EggCharacter: React.FC<EggCharacterProps> = ({
  mood,
  hp,
  shieldActive = null,
  dodgeOffset = null,
  size = 'lg',
  className = '',
}) => {
  const sizeClass =
    size === 'sm'
      ? 'w-28 h-32'
      : size === 'md'
        ? 'w-36 h-44 sm:w-44 sm:h-52'
        : 'w-44 h-52 sm:w-52 sm:h-60';

  const motionClass =
    mood === 'broken'
      ? ''
      : mood === 'desperate' || mood === 'scared'
        ? 'animate-egg-shake'
        : mood === 'happy' || mood === 'legendary' || mood === 'relieved'
          ? 'animate-egg-wobble'
          : 'animate-float-slow';

  const dodgeTransform =
    dodgeOffset === 'left'
      ? '-translate-x-10 -rotate-12'
      : dodgeOffset === 'right'
        ? 'translate-x-10 rotate-12'
        : 'translate-x-0 rotate-0';

  const showLightCrack = hp <= 70 && hp > 35 && mood !== 'broken';
  const showHeavyCrack = hp <= 35 && mood !== 'broken';

  if (mood === 'broken') {
    return (
      <div className={`relative flex items-center justify-center ${sizeClass} ${className}`}>
        <svg viewBox="0 0 220 240" className="w-full h-full drop-shadow-md" aria-label="Ovo quebrado">
          {/* Puddle / yolk spill */}
          <ellipse cx="110" cy="195" rx="86" ry="26" fill="#FFD166" opacity="0.9" />
          <ellipse cx="128" cy="198" rx="48" ry="15" fill="#FFB703" opacity="0.7" />
          <circle cx="110" cy="182" r="24" fill="#FFB703" />
          <circle cx="102" cy="174" r="6" fill="#FFF3B0" opacity="0.85" />

          {/* Left broken shell */}
          <path
            d="M42 150 C38 182, 65 204, 102 200 L95 168 L112 152 L88 136 L68 152 Z"
            fill="#FFF7EB"
            stroke="#6D4C41"
            strokeWidth="4.5"
            strokeLinejoin="round"
            transform="rotate(-14 75 170)"
          />
          {/* Right broken shell */}
          <path
            d="M178 150 C182 182, 155 204, 118 200 L124 166 L108 148 L134 134 L154 152 Z"
            fill="#FFF7EB"
            stroke="#6D4C41"
            strokeWidth="4.5"
            strokeLinejoin="round"
            transform="rotate(14 145 170)"
          />

          {/* Little dizzy face on yolk */}
          <path d="M98 178 L104 184 M104 178 L98 184" stroke="#4A342E" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M116 178 L122 184 M122 178 L116 184" stroke="#4A342E" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M104 192 Q110 187 116 192" fill="none" stroke="#4A342E" strokeWidth="2.5" strokeLinecap="round" />

          {/* Little floating egg spirit / halo */}
          <g className="animate-float-slow">
            <ellipse cx="110" cy="84" rx="28" ry="34" fill="#FFFFFF" opacity="0.75" stroke="#BC9B8B" strokeWidth="2.5" strokeDasharray="4 3" />
            <ellipse cx="110" cy="40" rx="18" ry="5" fill="none" stroke="#FFD166" strokeWidth="3.5" />
            <circle cx="101" cy="80" r="2.5" fill="#6D4C41" />
            <circle cx="119" cy="80" r="2.5" fill="#6D4C41" />
            <path d="M105 90 Q110 86 115 90" fill="none" stroke="#6D4C41" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center transition-transform duration-200 ease-out ${dodgeTransform} ${sizeClass} ${className}`}
    >
      {/* Protective Umbrella Overlay */}
      {shieldActive === 'rain' && (
        <svg
          viewBox="0 0 200 120"
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-28 z-20 pointer-events-none drop-shadow-sm animate-pop-in"
        >
          <path
            d="M20 75 C20 25, 180 25, 180 75 Q150 62 130 75 Q100 62 70 75 Q45 62 20 75 Z"
            fill="#FF8FA3"
            stroke="#6D4C41"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M100 25 L100 105 Q100 116 90 116"
            fill="none"
            stroke="#6D4C41"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <circle cx="100" cy="23" r="4" fill="#FFD166" stroke="#6D4C41" strokeWidth="3" />
        </svg>
      )}

      {/* Protective Palm Shade Overlay */}
      {shieldActive === 'sun' && (
        <svg
          viewBox="0 0 200 110"
          className="absolute -top-9 left-1/2 -translate-x-1/2 w-48 h-26 z-20 pointer-events-none drop-shadow-sm animate-pop-in"
        >
          <path
            d="M15 72 Q100 12 185 68 Q135 58 100 72 Q65 58 15 72 Z"
            fill="#52B788"
            stroke="#2D6A4F"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path d="M35 65 Q100 32 165 62" fill="none" stroke="#95D5B2" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}

      {/* Main Egg SVG */}
      <svg
        viewBox="0 0 200 240"
        className={`w-full h-full drop-shadow-[0_12px_18px_rgba(109,76,65,0.16)] ${motionClass}`}
        role="img"
        aria-label={`Ovo com expressão ${mood}`}
      >
        {/* Ground Shadow */}
        <ellipse cx="100" cy="222" rx="58" ry="11" fill="#6D4C41" opacity="0.14" />

        {/* Legendary Crown */}
        {mood === 'legendary' && (
          <g transform="translate(65, 6)">
            <path
              d="M6 34 L12 10 L26 22 L35 4 L44 22 L58 10 L64 34 Z"
              fill="#FFD166"
              stroke="#6D4C41"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <circle cx="35" cy="23" r="4.5" fill="#FF8FA3" />
            <circle cx="17" cy="25" r="3" fill="#7EC8E3" />
            <circle cx="53" cy="25" r="3" fill="#7EC8E3" />
          </g>
        )}

        {/* Egg Body */}
        <path
          d="M100 34 C144 34, 168 98, 168 144 C168 188, 138 214, 100 214 C62 214, 32 188, 32 144 C32 98, 56 34, 100 34 Z"
          fill="#FFF8EC"
          stroke="#6D4C41"
          strokeWidth="5"
        />

        {/* Warm Pastel Shading */}
        <path
          d="M148 92 C160 120, 160 162, 138 192 C126 205, 112 209, 98 209 C125 204, 146 176, 146 138 C146 116, 145 102, 148 92 Z"
          fill="#F6E6CF"
          opacity="0.7"
        />

        {/* Highlight Gloss */}
        <ellipse
          cx="68"
          cy="78"
          rx="12"
          ry="22"
          transform="rotate(-22 68 78)"
          fill="#FFFFFF"
          opacity="0.9"
        />
        <circle cx="58" cy="108" r="5" fill="#FFFFFF" opacity="0.85" />

        {/* Crack overlays based on HP */}
        {showLightCrack && (
          <path
            d="M146 105 L132 117 L138 127 L125 136"
            fill="none"
            stroke="#6D4C41"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {showHeavyCrack && (
          <g>
            <path
              d="M146 105 L130 118 L139 129 L121 140 L127 152"
              fill="none"
              stroke="#6D4C41"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M44 158 L60 150 L57 164 L72 162"
              fill="none"
              stroke="#6D4C41"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Cute pink Band-Aid */}
            <g transform="translate(120, 150) rotate(-25)">
              <rect x="0" y="0" width="32" height="14" rx="5" fill="#FFD6E0" stroke="#6D4C41" strokeWidth="2.5" />
              <line x1="11" y1="3" x2="11" y2="11" stroke="#FF8FA3" strokeWidth="2" />
              <line x1="21" y1="3" x2="21" y2="11" stroke="#FF8FA3" strokeWidth="2" />
            </g>
          </g>
        )}

        {/* Rosy Cheeks */}
        <ellipse
          cx="62"
          cy="142"
          rx="11"
          ry="6.5"
          fill={mood === 'scared' || mood === 'desperate' ? '#B8D8EB' : '#FFB3C1'}
          opacity="0.85"
        />
        <ellipse
          cx="138"
          cy="142"
          rx="11"
          ry="6.5"
          fill={mood === 'scared' || mood === 'desperate' ? '#B8D8EB' : '#FFB3C1'}
          opacity="0.85"
        />

        {/* FACIAL EXPRESSIONS */}
        {(mood === 'happy' || mood === 'legendary') && (
          <g>
            {/* Happy sparkling eyes */}
            <circle cx="77" cy="122" r="8.5" fill="#4A342E" />
            <circle cx="74" cy="119" r="3" fill="#FFFFFF" />
            <circle cx="80" cy="125" r="1.5" fill="#FFFFFF" />

            <circle cx="123" cy="122" r="8.5" fill="#4A342E" />
            <circle cx="120" cy="119" r="3" fill="#FFFFFF" />
            <circle cx="126" cy="125" r="1.5" fill="#FFFFFF" />

            {/* Big happy smile */}
            <path
              d="M86 144 Q100 160 114 144 Z"
              fill="#FF8FA3"
              stroke="#4A342E"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
          </g>
        )}

        {mood === 'chill' && (
          <g>
            <circle cx="77" cy="124" r="7.5" fill="#4A342E" />
            <circle cx="74.5" cy="121.5" r="2.6" fill="#FFFFFF" />
            <circle cx="123" cy="124" r="7.5" fill="#4A342E" />
            <circle cx="120.5" cy="121.5" r="2.6" fill="#FFFFFF" />
            <path
              d="M90 144 Q100 152 110 144"
              fill="none"
              stroke="#4A342E"
              strokeWidth="3.8"
              strokeLinecap="round"
            />
          </g>
        )}

        {mood === 'relieved' && (
          <g>
            {/* Happy curved closed eyes ^ ^ */}
            <path d="M68 125 Q77 115 86 125" fill="none" stroke="#4A342E" strokeWidth="4" strokeLinecap="round" />
            <path d="M114 125 Q123 115 132 125" fill="none" stroke="#4A342E" strokeWidth="4" strokeLinecap="round" />
            <path
              d="M89 144 Q100 155 111 144"
              fill="none"
              stroke="#4A342E"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        )}

        {mood === 'scared' && (
          <g>
            {/* Wide startled eyes */}
            <circle cx="76" cy="122" r="10.5" fill="#FFFFFF" stroke="#4A342E" strokeWidth="3.5" />
            <circle cx="76" cy="123" r="4" fill="#4A342E" />
            <circle cx="124" cy="122" r="10.5" fill="#FFFFFF" stroke="#4A342E" strokeWidth="3.5" />
            <circle cx="124" cy="123" r="4" fill="#4A342E" />
            {/* Worried eyebrows */}
            <path d="M66 105 L84 109" stroke="#4A342E" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M134 105 L116 109" stroke="#4A342E" strokeWidth="3.5" strokeLinecap="round" />
            {/* Little O mouth */}
            <ellipse cx="100" cy="148" rx="7" ry="9" fill="#FF8FA3" stroke="#4A342E" strokeWidth="3.5" />
            {/* Sweat drop */}
            <path
              d="M150 86 Q158 98 150 104 Q142 98 150 86 Z"
              fill="#7EC8E3"
              stroke="#4A342E"
              strokeWidth="2.5"
            />
          </g>
        )}

        {mood === 'sad' && (
          <g>
            {/* Teary eyes */}
            <circle cx="77" cy="124" r="8" fill="#4A342E" />
            <circle cx="74" cy="121" r="2.8" fill="#FFFFFF" />
            <ellipse cx="73" cy="136" rx="3.5" ry="5" fill="#7EC8E3" />

            <circle cx="123" cy="124" r="8" fill="#4A342E" />
            <circle cx="120" cy="121" r="2.8" fill="#FFFFFF" />
            <ellipse cx="127" cy="136" rx="3.5" ry="5" fill="#7EC8E3" />

            {/* Sad eyebrows */}
            <path d="M66 112 Q75 107 84 111" fill="none" stroke="#4A342E" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M116 111 Q125 107 134 112" fill="none" stroke="#4A342E" strokeWidth="3.5" strokeLinecap="round" />

            {/* Wobble frown */}
            <path
              d="M86 152 Q100 140 114 152"
              fill="none"
              stroke="#4A342E"
              strokeWidth="3.8"
              strokeLinecap="round"
            />
          </g>
        )}

        {mood === 'desperate' && (
          <g>
            {/* > < squeezed panic eyes */}
            <path d="M67 115 L84 123 L67 131" fill="none" stroke="#4A342E" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M133 115 L116 123 L133 131" fill="none" stroke="#4A342E" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
            {/* Wavy screaming mouth */}
            <path
              d="M82 148 Q91 139 100 148 Q109 157 118 148 Q112 163 100 163 Q88 163 82 148 Z"
              fill="#FF6B6B"
              stroke="#4A342E"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Sweat drops */}
            <path d="M44 96 Q36 108 44 114 Q52 108 44 96 Z" fill="#7EC8E3" stroke="#4A342E" strokeWidth="2.5" />
            <path d="M156 96 Q164 108 156 114 Q148 108 156 96 Z" fill="#7EC8E3" stroke="#4A342E" strokeWidth="2.5" />
          </g>
        )}

        {/* Cozy Scarf Overlay when warming up */}
        {shieldActive === 'wind' && (
          <g>
            <path
              d="M42 168 Q100 186 158 168 L154 186 Q100 202 46 186 Z"
              fill="#FF8FA3"
              stroke="#6D4C41"
              strokeWidth="3.5"
            />
            <path
              d="M122 180 L138 210 L118 214 L106 186 Z"
              fill="#FF758F"
              stroke="#6D4C41"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* Cute tiny waving arms */}
        <path
          d="M34 142 Q18 134 22 120"
          fill="none"
          stroke="#6D4C41"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d="M166 142 Q182 134 178 120"
          fill="none"
          stroke="#6D4C41"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Care Hearts Overlay */}
      {shieldActive === 'care' && (
        <div className="absolute inset-0 pointer-events-none flex items-start justify-center">
          <span className="text-3xl animate-bounce">💖</span>
        </div>
      )}
    </div>
  );
};

export const PadlockIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 64 64"
    className={`w-12 h-12 ${className}`}
    aria-hidden="true"
  >
    <path
      d="M20 28 V20 C20 12.5, 44 12.5, 44 20 V28"
      fill="none"
      stroke="#6D4C41"
      strokeWidth="4.5"
      strokeLinecap="round"
    />
    <rect
      x="14"
      y="27"
      width="36"
      height="28"
      rx="8"
      fill="#FFD166"
      stroke="#6D4C41"
      strokeWidth="4"
    />
    <path
      d="M32 37 C30 34, 25 35, 25 39 C25 43, 32 47, 32 47 C32 47, 39 43, 39 39 C39 35, 34 34, 32 37 Z"
      fill="#FF8FA3"
      stroke="#6D4C41"
      strokeWidth="2.2"
    />
  </svg>
);
