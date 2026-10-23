"use client";

import React, { useState, useEffect, useRef } from "react";
import { ColorPaletteData, ColorHarmony, LogoType } from "./types";
import { 
  hexToRgb, 
  hexToCmyk, 
  getContrastRatio, 
  getHarmonyColors, 
  calculateDarkReplacement, 
  calculateLightReplacement, 
  hasVibratingContrast,
  hexToHsl,
  hslToHex,
  getBestTextColor,
  extractColorsFromImage
} from "@/lib/color/colorUtils";
import { 
  Sparkles, 
  Palette, 
  Check, 
  AlertTriangle, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  Eye,
  RefreshCw,
  ExternalLink,
  Upload,
  Pipette,
  Image as ImageIcon,
  CheckCircle2
} from "lucide-react";

interface KleurenPaletProps {
  data: ColorPaletteData;
  companyName: string;
  selectedLogoType: LogoType | "";
  logoUrl?: string;
  onChange: (updated: ColorPaletteData) => void;
  onNext: () => void;
  onBack: () => void;
}

const COLOR_MEANINGS = [
  { name: "Blauw", hex: "#1E3A8A", meaning: "Vertrouwen, autoriteit, degelijkheid, stabiliteit (populair in tech, finance, zorg)." },
  { name: "Groen", hex: "#059669", meaning: "Groei, duurzaamheid, rust, natuurlijk, gezondheid (duurzaam, tuin, bio)." },
  { name: "Oker / Goud", hex: "#DFB25A", meaning: "Kwaliteit, ambacht, warmte, premium gevoel (horeca, meubelmaker, directie)." },
  { name: "Oranje", hex: "#EA580C", meaning: "Energie, nuchterheid, actie, toegankelijk, vrolijk (bouw, sport, jeugd)." },
  { name: "Rood", hex: "#DC2626", meaning: "Passie, urgentie, daadkracht, warmte (eten, hulpdiensten, sport)." },
  { name: "Paars", hex: "#7C3AED", meaning: "Luxe, creativiteit, wijsheid, mysterie (coaching, design, innovatie)." },
  { name: "Bruin", hex: "#78350F", meaning: "Aards, robuust, ambachtelijk, betrouwbaar (houtbewerking, koffie, outdoor)." },
  { name: "Antraciet", hex: "#1F2937", meaning: "Modern, strak, zakelijk, tijdloos, minimalistisch (architectuur, software)." },
];

export function KleurenPalet({ 
  data, 
  companyName, 
  selectedLogoType,
  logoUrl,
  onChange, 
  onNext, 
  onBack 
}: KleurenPaletProps) {
  const [primary, setPrimary] = useState(data.primary || "#1E3A8A");
  const [accent, setAccent] = useState(data.accent || "#DFB25A");
  const [dark, setDark] = useState(data.dark || calculateDarkReplacement(primary));
  const [light, setLight] = useState(data.light || calculateLightReplacement(primary));
  const [harmony, setHarmony] = useState<ColorHarmony>(data.harmony || "complementair");
  const [showPsychology, setShowPsychology] = useState(false);

  // Kleurextractie uit upload state
  const [extractedColors, setExtractedColors] = useState<string[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Bereken harmoniekleuren
  const harmonies = getHarmonyColors(primary);
  const activeHarmonies = harmonies[harmony] || [];

  // Bereken de beste tekstkleuren volgens WCAG 2.1 (Sectie 5.4)
  const bestTextOnPrimary = getBestTextColor(primary, dark, light);
  const bestTextOnAccent = getBestTextColor(accent, dark, light);
  const bestTextOnDark = getBestTextColor(dark, dark, light);
  const bestTextOnLight = getBestTextColor(light, dark, light);

  const contrastDarkOnLight = getContrastRatio(dark, light);
  const isVibrating = hasVibratingContrast(primary, accent);
  const accentButtonBorder = getContrastRatio(accent, light) < 3.0 ? `1.5px solid ${dark}` : "none";

  const handlePrimaryChange = (newHex: string) => {
    setPrimary(newHex);
    const newDark = calculateDarkReplacement(newHex);
    const newLight = calculateLightReplacement(newHex);
    setDark(newDark);
    setLight(newLight);

    // Update automatisch steunkleur bij wisseling hoofdkleur
    const newHarmonies = getHarmonyColors(newHex);
    const newAccent = newHarmonies[harmony]?.[0] || accent;
    setAccent(newAccent);

    onChange({
      ...data,
      primary: newHex,
      accent: newAccent,
      dark: newDark,
      light: newLight,
      harmony,
    });
  };

  const handleSelectAccent = (newAccent: string) => {
    setAccent(newAccent);
    onChange({
      ...data,
      primary,
      accent: newAccent,
      dark,
      light,
      harmony,
    });
  };

  const handleSelectHarmony = (newHarmony: ColorHarmony) => {
    setHarmony(newHarmony);
    const cand = harmonies[newHarmony]?.[0];
    if (cand) {
      setAccent(cand);
      onChange({
        ...data,
        primary,
        accent: cand,
        dark,
        light,
        harmony: newHarmony,
      });
    }
  };

  // Upload handler voor afbeeldingen & logo's
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setUploadPreview(result);
      processImageForColors(result);
    };
    reader.readAsDataURL(file);
  };

  const processImageForColors = (imageUrl: string) => {
    setIsExtracting(true);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = async () => {
      const colors = await extractColorsFromImage(img, 6);
      setExtractedColors(colors);
      setIsExtracting(false);

      // Als er bruikbare kleuren zijn, pas de eerste 2 meteen toe
      if (colors.length >= 1) {
        handlePrimaryChange(colors[0]);
      }
      if (colors.length >= 2) {
        handleSelectAccent(colors[1]);
      }
    };
    img.onerror = () => {
      setIsExtracting(false);
    };
    img.src = imageUrl;
  };

  // Pipet tool via Native EyeDropper API (in moderne Chrome/Edge)
  const handleEyeDropper = async () => {
    if (typeof window !== "undefined" && "EyeDropper" in window) {
      try {
        const eyeDropper = new (window as any).EyeDropper();
        const result = await eyeDropper.open();
        if (result?.sRGBHex) {
          handlePrimaryChange(result.sRGBHex);
        }
      } catch (e) {
        // Gebruiker heeft geannuleerd
      }
    } else {
      // Fallback
      fileInputRef.current?.click();
    }
  };

  const confirmPalette = () => {
    onChange({
      ...data,
      primary,
      accent,
      dark,
      light,
      harmony,
      isConfirmed: true,
    });

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("vsg_brand_style_changed"));
    }

    onNext();
  };

  const rgbPrimary = hexToRgb(primary);
  const cmykPrimary = hexToCmyk(primary);
  const rgbAccent = hexToRgb(accent);
  const cmykAccent = hexToCmyk(accent);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header & Uitleg */}
      <div className="bg-gradient-to-r from-[#2a170b] to-[#160b06] border-2 border-[#dfb25a]/40 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#dfb25a] block mb-1">
              Stap 3 • Hoofdstuk 3: De Visuele Identiteit
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Het Kleurenpalet &amp; Harmonie-wiel
            </h1>
            <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Volgens het boek bestaat een professionele huisstijl uit 4 kleuren: een <strong>hoofdkleur</strong>, 
              een <strong>steunkleur</strong>, een <strong>zwart-vervanger</strong> en een <strong>wit-vervanger</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPsychology(!showPsychology)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold transition-all text-[#dfb25a]"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{showPsychology ? "Verberg Kleurenpsychologie" : "Kleurenpsychologie"}</span>
              {showPsychology ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Uitklapbaar kleurenpsychologie blok uit het boek */}
        {showPsychology && (
          <div className="mt-5 pt-4 border-t border-white/15 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {COLOR_MEANINGS.map((c) => (
              <div 
                key={c.name}
                onClick={() => handlePrimaryChange(c.hex)}
                className="p-3 rounded-xl bg-black/40 border border-white/10 hover:border-[#dfb25a] cursor-pointer transition-all flex items-start gap-2.5"
              >
                <span className="w-4 h-4 rounded-full mt-0.5 shrink-0 shadow-sm" style={{ backgroundColor: c.hex }} />
                <div>
                  <h4 className="font-extrabold text-xs text-white flex items-center gap-1.5">
                    {c.name}
                    <span className="font-mono text-[10px] text-white/50">{c.hex}</span>
                  </h4>
                  <p className="text-[11px] text-white/70 leading-snug mt-0.5">{c.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Waarschuwing Trillend Contrast (Sectie 5.4 uit boek) */}
      {isVibrating && (
        <div className="p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-500/50 text-amber-200 flex items-start gap-3 text-xs leading-relaxed">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold text-amber-300">Waarschuwing: Trillend Contrast!</strong>
            <p>
              Jouw hoofd- en steunkleur zijn allebei zeer fel en ongeveer even licht. Naast elkaar gaan ze &apos;trillen&apos; aan de ogen. 
              Maak één van de twee iets donkerder of rustiger voor een betere uitstraling.
            </p>
          </div>
        </div>
      )}

      {/* Waarschuwing WCAG Contrast Fallback (Sectie 5.4 uit boek) */}
      {(bestTextOnPrimary.isFallback || bestTextOnAccent.isFallback) && (
        <div className="p-4 rounded-2xl bg-blue-500/15 border border-blue-500/40 text-blue-200 flex items-start gap-3 text-xs leading-relaxed">
          <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold text-blue-300">WCAG 2.1 Contrastwaarschuwing:</strong>
            <p>
              {bestTextOnPrimary.isFallback ? bestTextOnPrimary.warning : bestTextOnAccent.warning}
            </p>
          </div>
        </div>
      )}

      {/* NIEUW: Kleuren Uploaden & Extraheren Blok */}
      <div className="bg-[var(--section-bg)] p-5 rounded-2xl border border-black/10 dark:border-white/10 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#dfb25a]/20 text-[#dfb25a] flex items-center justify-center">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[var(--text)]">
                Kleuren uploaden uit jouw foto of logo
              </h3>
              <p className="text-xs opacity-75">
                Upload een sfeerfoto, logo of inspiratiebeeld. Ons systeem extraheert automatisch de dominante merkkleuren.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="file" 
              ref={fileInputRef}
              accept="image/*" 
              onChange={handleImageFileChange}
              className="hidden" 
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-[#dfb25a]/20 hover:text-[#dfb25a] border border-black/10 dark:border-white/10 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Afbeelding</span>
            </button>

            {logoUrl && (
              <button
                type="button"
                onClick={() => {
                  setUploadPreview(logoUrl);
                  processImageForColors(logoUrl);
                }}
                className="px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-[#dfb25a]/20 hover:text-[#dfb25a] border border-black/10 dark:border-white/10 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Gebruik Gegenereerd Logo</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleEyeDropper}
              title="Kies een kleur direct van het scherm (Pipet)"
              className="p-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-xs font-bold transition-all"
            >
              <Pipette className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Geëxtraheerde Kleuren Swatches */}
        {extractedColors.length > 0 && (
          <div className="pt-3 border-t border-black/5 dark:border-white/5 space-y-2">
            <span className="text-[11px] font-bold opacity-75 uppercase tracking-wider block">
              Gevonden Kleuren in afbeelding (klik om toe te wijzen):
            </span>
            <div className="flex flex-wrap gap-2.5 items-center">
              {uploadPreview && (
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-black/20 shrink-0">
                  <img src={uploadPreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              {extractedColors.map((hex, i) => (
                <div key={i} className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[var(--surface)] border border-black/10 shadow-xs">
                  <span className="w-7 h-7 rounded-lg shadow-inner" style={{ backgroundColor: hex }} />
                  <div className="text-[10px] space-y-0.5">
                    <span className="font-mono font-bold block">{hex}</span>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => handlePrimaryChange(hex)}
                        className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 hover:bg-[#dfb25a] hover:text-black font-semibold text-[9px] transition-all"
                      >
                        Hoofd
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectAccent(hex)}
                        className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 hover:bg-[#dfb25a] hover:text-black font-semibold text-[9px] transition-all"
                      >
                        Steun
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Twee kolommen: Kleurkiezer + Harmonie-wiel links | 4-kleuren kaarten & Preview rechts */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Linker kolom: Kleurenwiel & Harmonies (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* A. Hoofdkleur Kiezen */}
          <div className="bg-[var(--section-bg)] p-6 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-base font-black text-[var(--text)]">1. Kies jouw Hoofdkleur</h2>
                <p className="text-xs opacity-75">Bepaalt de sfeer en berekent automatisch je zwart- en wit-vervanger.</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={primary}
                  onChange={(e) => handlePrimaryChange(e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent"
                />
                <input
                  type="text"
                  value={primary.toUpperCase()}
                  onChange={(e) => handlePrimaryChange(e.target.value)}
                  className="w-24 px-2 py-1.5 rounded-lg border border-black/15 dark:border-white/15 bg-[var(--surface)] text-xs font-mono font-bold uppercase"
                />
              </div>
            </div>

            {/* Snelle sector presets */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/5 dark:border-white/5">
              <span className="text-[11px] font-bold opacity-60 self-center mr-1">Inspiratie:</span>
              {[
                { label: "Ambacht Oker", hex: "#DFB25A" },
                { label: "Modern Navy", hex: "#1E3A8A" },
                { label: "Duurzaam Groen", hex: "#059669" },
                { label: "Robuust Bordeaux", hex: "#831843" },
                { label: "Tech Cyan", hex: "#0284C7" },
                { label: "Zwart-Antraciet", hex: "#1F2937" },
              ].map((p) => (
                <button
                  key={p.hex}
                  type="button"
                  onClick={() => handlePrimaryChange(p.hex)}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 bg-black/5 dark:bg-white/5 hover:border-[#dfb25a] border border-transparent transition-all"
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.hex }} />
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* B. Interactief Kleurenwiel & Harmonieën */}
          <div className="bg-[var(--section-bg)] p-6 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm space-y-4">
            <div>
              <h2 className="text-base font-black text-[var(--text)]">2. Kies jouw Steunkleur via het Harmonie-wiel</h2>
              <p className="text-xs opacity-75">
                Kies een kleurenharmonie en klik op één van de berekende kleuren om deze als steunkleur in te stellen.
              </p>
            </div>

            {/* Harmonie Selector Knoppen */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
              {(["complementair", "monochroom", "analoog", "triadisch", "tetradisch"] as ColorHarmony[]).map((h) => {
                const isSelected = harmony === h;
                return (
                  <button
                    key={h}
                    type="button"
                    onClick={() => handleSelectHarmony(h)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                      isSelected
                        ? "bg-[#dfb25a] text-black border-[#dfb25a] shadow-sm font-black"
                        : "bg-black/5 dark:bg-white/5 border-transparent hover:border-black/20 dark:hover:border-white/20 text-[var(--text)] opacity-80"
                    }`}
                  >
                    {h}
                  </button>
                );
              })}
            </div>

            {/* Canva-stijl Kleurenwiel Visualisatie */}
            <div className="py-4 flex flex-col sm:flex-row items-center justify-center gap-6 bg-black/5 dark:bg-white/5 rounded-2xl p-4">
              
              {/* SVG Kleurenwiel */}
              <div className="relative w-44 h-44 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <defs>
                    <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff0000" />
                      <stop offset="17%" stopColor="#ffff00" />
                      <stop offset="33%" stopColor="#00ff00" />
                      <stop offset="50%" stopColor="#00ffff" />
                      <stop offset="67%" stopColor="#0000ff" />
                      <stop offset="83%" stopColor="#ff00ff" />
                      <stop offset="100%" stopColor="#ff0000" />
                    </linearGradient>
                  </defs>

                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#rainbow)"
                    strokeWidth="16"
                  />

                  {/* Marker voor Hoofdkleur */}
                  {(() => {
                    const hsl = hexToHsl(primary);
                    const rad = (hsl.h * Math.PI) / 180;
                    const cx = 50 + 40 * Math.cos(rad);
                    const cy = 50 + 40 * Math.sin(rad);
                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r="6"
                        fill={primary}
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        className="drop-shadow-md"
                      />
                    );
                  })()}

                  {/* Marker voor Steunkleur */}
                  {(() => {
                    const hsl = hexToHsl(accent);
                    const rad = (hsl.h * Math.PI) / 180;
                    const cx = 50 + 40 * Math.cos(rad);
                    const cy = 50 + 40 * Math.sin(rad);
                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r="5"
                        fill={accent}
                        stroke="#000000"
                        strokeWidth="2"
                        className="drop-shadow-md"
                      />
                    );
                  })()}
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] uppercase font-black opacity-60">Harmonie</span>
                  <span className="text-xs font-black capitalize text-[var(--text)]">{harmony}</span>
                </div>
              </div>

              {/* Berekende opties voor deze harmonie */}
              <div className="space-y-2 w-full max-w-xs">
                <span className="text-xs font-bold opacity-75 block">
                  Berekende opties ({activeHarmonies.length}):
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {activeHarmonies.map((hex, idx) => {
                    const isSelected = accent.toLowerCase() === hex.toLowerCase();
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectAccent(hex)}
                        className={`p-2.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                          isSelected
                            ? "border-[#dfb25a] ring-2 ring-[#dfb25a]/30 shadow-md bg-[var(--surface)]"
                            : "border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 bg-[var(--surface)]/70"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-5 h-5 rounded-lg border border-black/10 shadow-sm shrink-0" 
                            style={{ backgroundColor: hex }} 
                          />
                          <span className="font-mono text-xs font-bold text-[var(--text)] uppercase">{hex}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#dfb25a]" />}
                      </button>
                    );
                  })}
                </div>

                <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 text-[11px] opacity-80 leading-snug">
                  💡 <strong>Vincents favoriet:</strong> Eén complementaire accentkleur voor maximale aandacht, met monochrome tinten voor rust en gezag.
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Rechter kolom: Het 4-kleuren palet & Live Mini-site preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Het 4-kleuren Palet Bord */}
          <div className="bg-[var(--section-bg)] p-6 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm space-y-4">
            <h2 className="text-base font-black text-[var(--text)]">Jouw 4-Kleuren Merkbord</h2>

            <div className="grid grid-cols-2 gap-3">
              {/* 1. Hoofdkleur */}
              <div 
                className="rounded-xl p-3 border border-black/10 shadow-sm" 
                style={{ backgroundColor: primary, color: bestTextOnPrimary.textColor }}
              >
                <span className="text-[10px] font-black uppercase tracking-wider block opacity-80">Hoofdkleur</span>
                <span className="font-mono text-sm font-black block mt-1">{primary}</span>
                <span className="text-[9px] opacity-75 font-mono block">RGB {rgbPrimary.r},{rgbPrimary.g},{rgbPrimary.b}</span>
                <span className="text-[9px] opacity-75 font-mono block">CMYK {cmykPrimary.c},{cmykPrimary.m},{cmykPrimary.y},{cmykPrimary.k}</span>
              </div>

              {/* 2. Steunkleur */}
              <div 
                className="rounded-xl p-3 border border-black/10 shadow-sm" 
                style={{ backgroundColor: accent, color: bestTextOnAccent.textColor }}
              >
                <span className="text-[10px] font-black uppercase tracking-wider block opacity-80">Steunkleur</span>
                <span className="font-mono text-sm font-black block mt-1">{accent}</span>
                <span className="text-[9px] opacity-75 font-mono block">RGB {rgbAccent.r},{rgbAccent.g},{rgbAccent.b}</span>
                <span className="text-[9px] opacity-75 font-mono block">CMYK {cmykAccent.c},{cmykAccent.m},{cmykAccent.y},{cmykAccent.k}</span>
              </div>

              {/* 3. Zwart-vervanger */}
              <div 
                className="rounded-xl p-3 border border-black/10 shadow-sm" 
                style={{ backgroundColor: dark, color: bestTextOnDark.textColor }}
              >
                <span className="text-[10px] font-black uppercase tracking-wider block opacity-80">Zwart-vervanger</span>
                <span className="font-mono text-sm font-black block mt-1">{dark}</span>
                <span className="text-[9px] opacity-75 block">Tekst &amp; diepte</span>
              </div>

              {/* 4. Wit-vervanger */}
              <div 
                className="rounded-xl p-3 border border-black/10 shadow-sm" 
                style={{ backgroundColor: light, color: bestTextOnLight.textColor }}
              >
                <span className="text-[10px] font-black uppercase tracking-wider block opacity-80">Wit-vervanger</span>
                <span className="font-mono text-sm font-black block mt-1">{light}</span>
                <span className="text-[9px] opacity-75 block">Achtergrond &amp; rust</span>
              </div>
            </div>

            {/* Contrast-badges */}
            <div className="pt-2 border-t border-black/5 dark:border-white/5 space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="opacity-75 text-[11px]">Leesbaarheid Tekst (Zwart op Wit):</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  {contrastDarkOnLight}:1 (AAA ✓)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-75 text-[11px]">Contrast op Hoofdkleur:</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  bestTextOnPrimary.ratio >= 4.5 ? "bg-emerald-500/20 text-emerald-500" : "bg-amber-500/20 text-amber-500"
                }`}>
                  {bestTextOnPrimary.ratio}:1 ({bestTextOnPrimary.ratio >= 4.5 ? "AA ✓" : "Fallback"})
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-75 text-[11px]">Contrast op Steunkleur:</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  bestTextOnAccent.ratio >= 4.5 ? "bg-emerald-500/20 text-emerald-500" : "bg-amber-500/20 text-amber-500"
                }`}>
                  {bestTextOnAccent.ratio}:1 ({bestTextOnAccent.ratio >= 4.5 ? "AA ✓" : "Fallback"})
                </span>
              </div>
            </div>
          </div>

          {/* Live Mini-Website Preview */}
          <div className="bg-[var(--section-bg)] p-4 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[var(--text)] flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#dfb25a]" /> Live Mini-Website Preview
            </span>

            {/* Browser frame preview met gegarandeerde WCAG-contrasten */}
            <div 
              className="rounded-xl overflow-hidden shadow-lg border border-black/10 text-xs transition-colors duration-300"
              style={{ backgroundColor: light, color: dark }}
            >
              {/* Browser balk */}
              <div 
                className="px-3 py-1.5 flex items-center justify-between border-b" 
                style={{ backgroundColor: primary, color: bestTextOnPrimary.textColor }}
              >
                <span className="font-extrabold text-[11px] truncate">{companyName || "Café De Beer"}</span>
                <span className="w-2.5 h-2.5 rounded-full shadow-xs" style={{ backgroundColor: accent }} />
              </div>

              {/* Mini Hero */}
              <div className="p-4 space-y-2.5">
                <h4 className="font-black text-sm leading-tight" style={{ color: dark }}>
                  Het adres voor vakmanschap en passie.
                </h4>
                <p className="text-[11px] opacity-80 leading-relaxed" style={{ color: dark }}>
                  Geen concessies aan kwaliteit. Ontdek onze unieke aanpak en ervaar het verschil.
                </p>
                <div className="pt-1">
                  <button
                    type="button"
                    className="px-3.5 py-1.5 rounded-lg font-black text-[11px] shadow-sm transition-transform active:scale-95"
                    style={{ 
                      backgroundColor: accent, 
                      color: bestTextOnAccent.textColor,
                      border: accentButtonBorder 
                    }}
                  >
                    Neem contact op →
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Navigatie & Bevestiging */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-black/10 dark:border-white/10">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-black/15 dark:border-white/15 text-xs font-bold"
        >
          ← Terug naar Logo
        </button>

        <button
          type="button"
          onClick={confirmPalette}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#dfb25a] to-[#f7d57f] text-black font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <span>Bevestig Palet &amp; Naar Stap 4: Typografie</span>
          <span>→</span>
        </button>
      </div>

    </div>
  );
}
