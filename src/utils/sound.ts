// Local browser sound synthesizer using Web Audio API (no external audio assets needed)

class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  constructor() {
    try {
      const saved = localStorage.getItem('rebeca_ovo_muted');
      if (saved === 'true') {
        this.muted = true;
      }
    } catch {
      // Ignore storage errors
    }
  }

  private getContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return null;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    try {
      localStorage.setItem('rebeca_ovo_muted', String(this.muted));
    } catch {
      // Ignore
    }
    if (!this.muted) {
      this.playClick();
    }
    return this.muted;
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume: number = 0.14,
    delay: number = 0,
    slideToFreq?: number
  ) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (slideToFreq) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(40, slideToFreq), now + duration);
    }

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  public playClick() {
    this.playTone(540, 0.07, 'sine', 0.12, 0, 720);
  }

  public playTap() {
    this.playTone(680, 0.055, 'triangle', 0.11, 0, 880);
  }

  public playSuccess() {
    this.playTone(523.25, 0.12, 'triangle', 0.14, 0); // C5
    this.playTone(659.25, 0.12, 'triangle', 0.14, 0.08); // E5
    this.playTone(783.99, 0.18, 'triangle', 0.15, 0.16); // G5
    this.playTone(1046.5, 0.24, 'sine', 0.12, 0.24); // C6
  }

  public playFail() {
    this.playTone(310, 0.16, 'sawtooth', 0.09, 0, 220);
    this.playTone(215, 0.28, 'sawtooth', 0.09, 0.14, 130);
  }

  public playScared() {
    this.playTone(520, 0.08, 'sine', 0.11, 0, 760);
    this.playTone(760, 0.1, 'sine', 0.1, 0.07, 480);
  }

  public playEventAlert() {
    this.playTone(587.33, 0.09, 'triangle', 0.13, 0);
    this.playTone(880, 0.14, 'triangle', 0.13, 0.09);
  }

  public playMessagePop() {
    this.playTone(840, 0.06, 'sine', 0.08, 0, 1120);
  }

  public playLevelUp() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    notes.forEach((n, idx) => {
      this.playTone(n, 0.14, 'triangle', 0.13, idx * 0.07);
    });
  }

  public playCrack() {
    // Crisp crack noise + dramatic descending notes
    const ctx = this.getContext();
    if (ctx) {
      const bufferSize = ctx.sampleRate * 0.18;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.22));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1800;
      const gain = ctx.createGain();
      gain.gain.value = 0.25;
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    }
    this.playTone(349.23, 0.22, 'sawtooth', 0.09, 0.18);
    this.playTone(329.63, 0.22, 'sawtooth', 0.09, 0.4);
    this.playTone(311.13, 0.22, 'sawtooth', 0.09, 0.62);
    this.playTone(293.66, 0.55, 'sawtooth', 0.1, 0.84, 240);
  }

  public playVictory(isLegendary: boolean) {
    const melody = isLegendary
      ? [523.25, 659.25, 783.99, 1046.5, 987.77, 1046.5, 1318.51]
      : [523.25, 659.25, 783.99, 1046.5];
    melody.forEach((freq, i) => {
      this.playTone(freq, i === melody.length - 1 ? 0.42 : 0.15, 'triangle', 0.15, i * 0.11);
    });
  }
}

export const sound = new SoundEngine();
