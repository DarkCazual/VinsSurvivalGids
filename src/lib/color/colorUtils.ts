// Kleur- en contrastberekeningen volgens WCAG 2.1 en het boek van Vincent Rothengatter

export interface HSL {
  h: number; // 0 - 360
  s: number; // 0 - 100
  l: number; // 0 - 100
}

export interface RGB {
  r: number; // 0 - 255
  g: number; // 0 - 255
  b: number; // 0 - 255
}

export interface CMYK {
  c: number; // 0 - 100
  m: number; // 0 - 100
  y: number; // 0 - 100
  k: number; // 0 - 100
}

// HEX -> RGB
export function hexToRgb(hex: string): RGB {
  let clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    clean = clean.split("").map((c) => c + c).join("");
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) return { r: 30, g: 20, b: 15 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

// RGB -> HEX
export function rgbToHex({ r, g, b }: RGB): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const toHex = (n: number) => clamp(n).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

// RGB -> HSL
export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)) * 60;
        break;
      case gNorm:
        h = ((bNorm - rNorm) / delta + 2) * 60;
        break;
      case bNorm:
        h = ((rNorm - gNorm) / delta + 4) * 60;
        break;
    }
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// HSL -> RGB
export function hslToRgb({ h, s, l }: HSL): RGB {
  const sNorm = s / 100;
  const lNorm = l / 100;

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let rPrime = 0;
  let gPrime = 0;
  let bPrime = 0;

  if (h >= 0 && h < 60) {
    rPrime = c; gPrime = x; bPrime = 0;
  } else if (h >= 60 && h < 120) {
    rPrime = x; gPrime = c; bPrime = 0;
  } else if (h >= 120 && h < 180) {
    rPrime = 0; gPrime = c; bPrime = x;
  } else if (h >= 180 && h < 240) {
    rPrime = 0; gPrime = x; bPrime = c;
  } else if (h >= 240 && h < 300) {
    rPrime = x; gPrime = 0; bPrime = c;
  } else if (h >= 300 && h < 360) {
    rPrime = c; gPrime = 0; bPrime = x;
  }

  return {
    r: Math.round((rPrime + m) * 255),
    g: Math.round((gPrime + m) * 255),
    b: Math.round((bPrime + m) * 255),
  };
}

// HEX -> HSL
export function hexToHsl(hex: string): HSL {
  return rgbToHsl(hexToRgb(hex));
}

// HSL -> HEX
export function hslToHex(hsl: HSL): string {
  return rgbToHex(hslToRgb(hsl));
}

// RGB -> Indicatieve CMYK (voor drukwerk indicatie)
export function rgbToCmyk({ r, g, b }: RGB): CMYK {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const k = 1 - Math.max(rNorm, gNorm, bNorm);
  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  const c = (1 - rNorm - k) / (1 - k);
  const m = (1 - gNorm - k) / (1 - k);
  const y = (1 - bNorm - k) / (1 - k);

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

export function hexToCmyk(hex: string): CMYK {
  return rgbToCmyk(hexToRgb(hex));
}

// Relatieve luminantie volgens WCAG 2.1
export function getLuminance(rgb: RGB): number {
  const a = [rgb.r, rgb.g, rgb.b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

// Contrastverhouding (1:1 tot 21:1)
export function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hexToRgb(hex1));
  const lum2 = getLuminance(hexToRgb(hex2));
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  const ratio = (brightest + 0.05) / (darkest + 0.05);
  return Number(ratio.toFixed(2));
}

// Automatische berekening van de Zwart-vervanger (diepe tint van hoofdkleur, l ≈ 12%, s ≤ 35%)
export function calculateDarkReplacement(primaryHex: string): string {
  const hsl = hexToHsl(primaryHex);
  return hslToHex({
    h: hsl.h,
    s: Math.min(hsl.s, 32),
    l: 12,
  });
}

// Automatische berekening van de Wit-vervanger (zachte lichte tint, l ≈ 96%, s ≈ 25%)
export function calculateLightReplacement(primaryHex: string): string {
  const hsl = hexToHsl(primaryHex);
  return hslToHex({
    h: hsl.h,
    s: Math.min(hsl.s, 24),
    l: 97,
  });
}

// Bereken harmoniekleuren op basis van de hoofdkleur
export function getHarmonyColors(primaryHex: string): {
  complementair: string[];
  monochroom: string[];
  analoog: string[];
  triadisch: string[];
  tetradisch: string[];
} {
  const { h, s, l } = hexToHsl(primaryHex);

  const wrap = (val: number) => (val + 360) % 360;

  return {
    complementair: [
      hslToHex({ h: wrap(h + 180), s: Math.min(s, 90), l: l > 50 ? l - 10 : l + 10 }),
    ],
    monochroom: [
      hslToHex({ h, s: Math.max(s - 15, 25), l: Math.min(l + 25, 88) }),
      hslToHex({ h, s: Math.min(s + 10, 95), l: Math.max(l - 18, 25) }),
      hslToHex({ h, s: Math.max(s - 30, 20), l: Math.max(l - 30, 15) }),
    ],
    analoog: [
      hslToHex({ h: wrap(h - 30), s, l }),
      hslToHex({ h: wrap(h + 30), s, l }),
    ],
    triadisch: [
      hslToHex({ h: wrap(h + 120), s: Math.min(s, 85), l }),
      hslToHex({ h: wrap(h + 240), s: Math.min(s, 85), l }),
    ],
    tetradisch: [
      hslToHex({ h: wrap(h + 60), s, l }),
      hslToHex({ h: wrap(h + 180), s, l }),
      hslToHex({ h: wrap(h + 240), s, l }),
    ],
  };
}

// Checkt of twee kleuren 'trillend contrast' veroorzaken (hoog verzadigd en ongeveer gelijke luminantie)
export function hasVibratingContrast(hex1: string, hex2: string): boolean {
  const hsl1 = hexToHsl(hex1);
  const hsl2 = hexToHsl(hex2);
  const isHighSat = hsl1.s > 60 && hsl2.s > 60;
  const isSimilarLightness = Math.abs(hsl1.l - hsl2.l) < 20;
  return isHighSat && isSimilarLightness;
}
