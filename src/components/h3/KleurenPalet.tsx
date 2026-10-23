"use client";

import React, { useState, useEffect } from "react";
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
  hslToHex
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
  ExternalLink
} from "lucide-react";

interface KleurenPaletProps {
  data: ColorPaletteData;
  companyName: string;
  selectedLogoType: LogoType | "";
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

  // Bereken harmoniekleuren
  const harmonies = getHarmonyColors(primary);
  const activeHarmonies = harmonies[harmony] || [];

  // Bereken contrasten
  const contrastTextOnPrimary = getContrastRatio(primary, light);
  const contrastTextOnAccent = getContrastRatio(accent, dark);
  const contrastDarkOnLight = getContrastRatio(dark, light);
  const isVibrating = hasVibratingContrast(primary, accent);

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

        {/* Uitklapbaar kleurenpsychologie blok uit het boek */}
        {showPsychology && (
          <div className="mt-5 pt-4 border-t border-white/15 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {COLOR_MEANINGS.map((c) => (
              <div 
                key={c.name}
                onClick={() => handlePrimaryChange(c.hex)}
                className="p-3 rounded-xl bg-black/40 border border-white/10 hover:border-[#dfb25a] cursor-pointer transition-all flex items-start gap-2.5"
              >
                <span className="w-4 h-4 rounded-full shrink-0 mt-0.5" style={{ backgroundColor: c.hex }} />
                <div>
                  <span className="font-bold text-xs text-white block">{c.name}</span>
                  <p className="text-[11px] text-white/70 leading-snug mt-0.5">{c.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Waarschuwing bij trillend contrast */}
      {isVibrating && (
        <div className="p-4 rounded-xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex gap-3 items-center shadow-sm">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
          <div>
            <strong className="font-bold">Waarschuwing: Trillend contrast gedetecteerd!</strong>
            <p className="text-[11px] mt-0.5">
              Jouw hoofd- en steunkleur zijn allebei zeer fel en ongeveer even licht. Naast elkaar gaan ze &apos;trillen&apos; aan de ogen. 
              Maak één van de twee iets donkerder of rustiger voor een betere uitstraling.
            </p>
          </div>
        </div>
      )}

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
                  {/* Regenboog ring */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="url(#rainbow)" strokeWidth="16" />
                  
                  {/* Hoofdkleur marker */}
                  {(() => {
                    const hsl = hexToHsl(primary);
                    const rad = (hsl.h * Math.PI) / 180;
                    const cx = 50 + 40 * Math.cos(rad);
                    const cy = 50 + 40 * Math.sin(rad);
                    return (
                      <circle cx={cx} cy={cy} r="6" fill={primary} stroke="#FFFFFF" strokeWidth="2.5" />
                    );
                  })()}

                  {/* Steunkleur marker */}
                  {(() => {
                    const hsl = hexToHsl(accent);
                    const rad = (hsl.h * Math.PI) / 180;
                    const cx = 50 + 40 * Math.cos(rad);
                    const cy = 50 + 40 * Math.sin(rad);
                    return (
                      <circle cx={cx} cy={cy} r="5" fill={accent} stroke="#000000" strokeWidth="2" />
                    );
                  })()}
                </svg>

                {/* Middelpunt logo of label */}
                <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[var(--surface)] shadow-md border border-black/10 dark:border-white/10 flex flex-col items-center justify-center text-[10px] font-black text-center leading-tight">
                  <span className="text-[#dfb25a]">360°</span>
                  <span className="opacity-60 text-[8px]">Harmonie</span>
                </div>
              </div>

              {/* Berekende Harmonie Tegels */}
              <div className="flex-1 space-y-2 w-full">
                <span className="text-xs font-bold text-[var(--text)] block">
                  Berekende opties voor <strong className="capitalize text-[#dfb25a]">{harmony}</strong>:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {activeHarmonies.map((hex, idx) => {
                    const isSelected = accent.toLowerCase() === hex.toLowerCase();
                    return (
                      <button
                        key={`${hex}-${idx}`}
                        type="button"
                        onClick={() => handleSelectAccent(hex)}
                        className={`p-2.5 rounded-xl border-2 transition-all flex items-center justify-between group ${
                          isSelected 
                            ? "border-[#dfb25a] bg-[#dfb25a]/10 shadow-sm" 
                            : "border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 bg-[var(--surface)]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-lg border border-black/10 shadow-inner" style={{ backgroundColor: hex }} />
                          <span className="font-mono text-xs font-bold">{hex}</span>
                        </div>
                        {isSelected ? (
                          <span className="w-4 h-4 rounded-full bg-[#dfb25a] text-black flex items-center justify-center text-[10px] font-bold">✓</span>
                        ) : (
                          <span className="text-[10px] opacity-50 group-hover:opacity-100">Kies</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Recept tip uit het boek */}
                <p className="text-[11px] opacity-70 italic pt-1 leading-snug">
                  💡 <strong>Vincents favoriete recept:</strong> &ldquo;Gebruik één complementaire steunkleur om knoppen direct te laten opvallen, en monochrome rusttinten voor achtergronden.&rdquo;
                </p>
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
              <div className="rounded-xl p-3 border border-black/10 shadow-sm" style={{ backgroundColor: primary, color: light }}>
                <span className="text-[10px] font-black uppercase tracking-wider block opacity-80">Hoofdkleur</span>
                <span className="font-mono text-sm font-black block mt-1">{primary}</span>
                <span className="text-[9px] opacity-75 font-mono block">RGB {rgbPrimary.r},{rgbPrimary.g},{rgbPrimary.b}</span>
                <span className="text-[9px] opacity-75 font-mono block">CMYK {cmykPrimary.c},{cmykPrimary.m},{cmykPrimary.y},{cmykPrimary.k}</span>
              </div>

              {/* 2. Steunkleur */}
              <div className="rounded-xl p-3 border border-black/10 shadow-sm" style={{ backgroundColor: accent, color: dark }}>
                <span className="text-[10px] font-black uppercase tracking-wider block opacity-80">Steunkleur</span>
                <span className="font-mono text-sm font-black block mt-1">{accent}</span>
                <span className="text-[9px] opacity-75 font-mono block">RGB {rgbAccent.r},{rgbAccent.g},{rgbAccent.b}</span>
                <span className="text-[9px] opacity-75 font-mono block">CMYK {cmykAccent.c},{cmykAccent.m},{cmykAccent.y},{cmykAccent.k}</span>
              </div>

              {/* 3. Zwart-vervanger */}
              <div className="rounded-xl p-3 border border-black/10 shadow-sm" style={{ backgroundColor: dark, color: light }}>
                <span className="text-[10px] font-black uppercase tracking-wider block opacity-80">Zwart-vervanger</span>
                <span className="font-mono text-sm font-black block mt-1">{dark}</span>
                <span className="text-[9px] opacity-75 block">Tekst &amp; diepte</span>
              </div>

              {/* 4. Wit-vervanger */}
              <div className="rounded-xl p-3 border border-black/10 shadow-sm" style={{ backgroundColor: light, color: dark }}>
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
                  contrastTextOnPrimary >= 4.5 ? "bg-emerald-500/20 text-emerald-500" : "bg-amber-500/20 text-amber-500"
                }`}>
                  {contrastTextOnPrimary}:1 ({contrastTextOnPrimary >= 4.5 ? "AA ✓" : "Let op"})
                </span>
              </div>
            </div>
          </div>

          {/* Live Mini-Website Preview */}
          <div className="bg-[var(--section-bg)] p-4 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[var(--text)] flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#dfb25a]" /> Live Mini-Website Preview
            </span>

            {/* Browser frame preview */}
            <div 
              className="rounded-xl overflow-hidden shadow-lg border border-black/10 text-xs transition-colors duration-300"
              style={{ backgroundColor: light, color: dark }}
            >
              {/* Browser balk */}
              <div className="px-3 py-1.5 flex items-center justify-between border-b" style={{ backgroundColor: primary, color: light }}>
                <span className="font-extrabold text-[11px] truncate">{companyName || "Café De Beer"}</span>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
              </div>

              {/* Mini Hero */}
              <div className="p-4 space-y-2.5">
                <h4 className="font-black text-sm leading-tight">
                  Het adres voor vakmanschap en passie.
                </h4>
                <p className="text-[11px] opacity-80 leading-relaxed">
                  Geen concessies aan kwaliteit. Ontdek onze unieke aanpak en ervaar het verschil.
                </p>
                <div className="pt-1">
                  <button
                    type="button"
                    className="px-3.5 py-1.5 rounded-lg font-black text-[11px] shadow-sm transition-transform active:scale-95"
                    style={{ backgroundColor: accent, color: dark }}
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
