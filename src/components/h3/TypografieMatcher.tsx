"use client";

import React, { useState } from "react";
import { TypographyData, ColorPaletteData } from "./types";
import { 
  Type, 
  Sparkles, 
  Check, 
  HelpCircle, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp,
  Layers
} from "lucide-react";

interface TypografieMatcherProps {
  data: TypographyData;
  colors: ColorPaletteData;
  companyName: string;
  onChange: (updated: TypographyData) => void;
  onNext: () => void;
  onBack: () => void;
}

interface FontOption {
  name: string;
  category: "serif" | "sans" | "script";
  cssFamily: string;
  vibe: string;
  idealFor: string;
}

export const FONTS: FontOption[] = [
  // Serif
  { name: "Playfair Display", category: "serif", cssFamily: "'Playfair Display', Georgia, serif", vibe: "Klassiek & Luxe", idealFor: "Mode, high-end horeca, advocatuur" },
  { name: "Lora", category: "serif", cssFamily: "'Lora', Georgia, serif", vibe: "Warm & Literair", idealFor: "Boeken, consultancy, journalistiek" },
  { name: "DM Serif Display", category: "serif", cssFamily: "'DM Serif Display', Georgia, serif", vibe: "Krachtig & Statig", idealFor: "Redactie, ambachtelijke merken" },
  { name: "Zilla Slab", category: "serif", cssFamily: "'Zilla Slab', Georgia, serif", vibe: "Robuust & Industrieel", idealFor: "Techniek, constructie, werkplaats" },

  // Sans-serif
  { name: "Montserrat", category: "sans", cssFamily: "'Montserrat', system-ui, sans-serif", vibe: "Modern & Geometrisch", idealFor: "Startups, architectuur, marketing" },
  { name: "Inter", category: "sans", cssFamily: "'Inter', system-ui, sans-serif", vibe: "Strak & Neutraal", idealFor: "Software, tech, moderne diensten" },
  { name: "Archivo", category: "sans", cssFamily: "'Archivo', system-ui, sans-serif", vibe: "Krachtig & Doeltreffend", idealFor: "Bouw, automotive, transport" },
  { name: "Work Sans", category: "sans", cssFamily: "'Work Sans', system-ui, sans-serif", vibe: "Vriendelijk & Zakelijk", idealFor: "HR, onderwijs, financiën" },

  // Script
  { name: "Caveat", category: "script", cssFamily: "'Caveat', cursive", vibe: "Persoonlijk & Spontaan", idealFor: "Koffietentjes, creatieven, workshops" },
  { name: "Dancing Script", category: "script", cssFamily: "'Dancing Script', cursive", vibe: "Vloeiend & Feestelijk", idealFor: "Evenementen, patisserie, bloemen" },
  { name: "Pacifico", category: "script", cssFamily: "'Pacifico', cursive", vibe: "Retro & Zomers", idealFor: "IJssalons, foodtrucks, surf/outdoor" },
  { name: "Satisfy", category: "script", cssFamily: "'Satisfy', cursive", vibe: "Elegant & Handgeschreven", idealFor: "Boetieks, handgemaakt, styling" },
];

export function TypografieMatcher({
  data,
  colors,
  companyName,
  onChange,
  onNext,
  onBack,
}: TypografieMatcherProps) {
  const [headingFont, setHeadingFont] = useState(data.headingFont || "Montserrat");
  const [bodyFont, setBodyFont] = useState(data.bodyFont || "Inter");
  const [headline, setHeadline] = useState(
    data.headlineText || `Ambacht en kwaliteit bij ${companyName || "Café De Beer"}`
  );
  const [subline, setSubline] = useState(data.sublineText || "ECHT VAKMANSCHAP SINDS 2026");
  const [showExplanation, setShowExplanation] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"all" | "serif" | "sans" | "script">("all");

  const selectedHeadingOption = FONTS.find(f => f.name === headingFont) || FONTS[4];
  const isScript = selectedHeadingOption.category === "script";

  const handleSelectHeading = (fontName: string) => {
    setHeadingFont(fontName);
    onChange({
      ...data,
      headingFont: fontName,
      bodyFont,
      headlineText: headline,
      sublineText: subline,
    });
  };

  const handleSelectBody = (fontName: string) => {
    setBodyFont(fontName);
    onChange({
      ...data,
      headingFont,
      bodyFont: fontName,
      headlineText: headline,
      sublineText: subline,
    });
  };

  const confirmTypography = () => {
    onChange({
      ...data,
      headingFont,
      bodyFont,
      headlineText: headline,
      sublineText: subline,
      isConfirmed: true,
    });
    onNext();
  };

  const filteredFonts = activeCategory === "all" 
    ? FONTS 
    : FONTS.filter(f => f.category === activeCategory);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2a170b] to-[#160b06] border-2 border-[#dfb25a]/40 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#dfb25a] block mb-1">
              Stap 4 • Hoofdstuk 3: De Visuele Identiteit
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              De Typografie Matcher: Banners in jouw merkkleuren
            </h1>
            <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Kies het lettertype voor je <strong>titels</strong> (karakter en herkenbaarheid) en voor je <strong>platte tekst</strong> (maximale leesbaarheid).
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold transition-all text-[#dfb25a]"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{showExplanation ? "Verberg Fontgids" : "Fontgids uit het boek"}</span>
            {showExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Uitleg uit het boek */}
        {showExplanation && (
          <div className="mt-5 pt-4 border-t border-white/15 grid sm:grid-cols-3 gap-4 text-xs text-white/90 bg-black/40 p-4 rounded-xl">
            <div>
              <span className="font-bold text-[#dfb25a] block mb-1">1. Serif (met schreven):</span>
              <p className="opacity-80 leading-relaxed">
                Klassiek, gezag, geschiedenis en luxe. Geeft een gevoel van traditie en betrouwbaarheid.
              </p>
            </div>
            <div>
              <span className="font-bold text-cyan-400 block mb-1">2. Sans-serif (schreefloos):</span>
              <p className="opacity-80 leading-relaxed">
                Modern, strak, no-nonsense en digitaal. Onmisbaar voor vlot leesbare broodtekst.
              </p>
            </div>
            <div>
              <span className="font-bold text-rose-400 block mb-1">3. Script (handgeschreven):</span>
              <p className="opacity-80 leading-relaxed">
                Persoonlijk en creatief. <em>Let op:</em> gebruik dit alleen voor korte titels of accenten, nooit voor lange alinea&apos;s!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Waarschuwing bij Script lettertype */}
      {isScript && (
        <div className="p-4 rounded-xl bg-blue-500/10 border-2 border-blue-500/30 text-blue-900 dark:text-blue-200 text-xs flex gap-3 items-center shadow-sm">
          <AlertCircle className="w-5 h-5 text-blue-500 shrink-0" />
          <div>
            <strong className="font-bold">Tip uit het boek:</strong>
            <p className="text-[11px] mt-0.5">
              Je hebt gekozen voor een sierlijk scriptlettertype ({headingFont}). Prima voor een krachtige titel of logo-accent, maar houd het daarbij! Voor je lopende tekst gebruiken we automatisch een strakke sans-serif.
            </p>
          </div>
        </div>
      )}

      {/* Tekst Invoer & Categorie Filter */}
      <div className="bg-[var(--section-bg)] p-6 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-[var(--text)] block mb-1">Jouw test-titel / Slogan:</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-[var(--surface)] text-sm font-medium focus:border-[#dfb25a] outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[var(--text)] block mb-1">Jouw ondertitel (in hoofdletters):</label>
            <input
              type="text"
              value={subline}
              onChange={(e) => setSubline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-[var(--surface)] text-sm font-medium focus:border-[#dfb25a] outline-none"
            />
          </div>
        </div>

        {/* Categorie Tabs */}
        <div className="flex gap-2 pt-2 border-t border-black/5 dark:border-white/5">
          <span className="text-xs font-bold opacity-60 self-center mr-1">Filter stijl:</span>
          {[
            { id: "all", label: "Alle 12 lettertypes" },
            { id: "serif", label: "Serif (Klassiek)" },
            { id: "sans", label: "Sans-serif (Modern)" },
            { id: "script", label: "Script (Sierlijk)" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? "bg-[#dfb25a] text-black shadow-sm font-black"
                  : "bg-black/5 dark:bg-white/5 opacity-75 hover:opacity-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* De 12 Banners in Merkkleuren van de Gebruiker */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFonts.map((f) => {
          const isSelected = headingFont === f.name;
          return (
            <div
              key={f.name}
              onClick={() => handleSelectHeading(f.name)}
              className={`rounded-2xl p-5 border-2 cursor-pointer transition-all flex flex-col justify-between relative overflow-hidden shadow-md group ${
                isSelected
                  ? "ring-4 ring-[#dfb25a] border-[#dfb25a] scale-[1.01]"
                  : "border-black/15 hover:border-[#dfb25a]/60 hover:shadow-xl"
              }`}
              style={{ backgroundColor: colors.primary, color: colors.light }}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 bg-[#dfb25a] text-black px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md z-10">
                  <Check className="w-3 h-3" /> Gekozen Titel Font
                </div>
              )}

              {/* Banner Top Info */}
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/15">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold opacity-75">
                  {f.name} • {f.vibe}
                </span>
                <span className="text-[10px] opacity-60 italic">{f.idealFor}</span>
              </div>

              {/* Grote Titel in dit specifieke font */}
              <div className="my-3">
                <h3 
                  className="text-xl sm:text-2xl font-black leading-tight drop-shadow-sm"
                  style={{ fontFamily: f.cssFamily }}
                >
                  {headline}
                </h3>
                
                {/* Ondertitel in gekozen sans-serif met letterspatiëring */}
                <p 
                  className="text-[11px] font-bold tracking-[0.2em] uppercase mt-2 opacity-85"
                  style={{ color: colors.accent }}
                >
                  {subline}
                </p>
              </div>

              {/* Banner Voet */}
              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[10px]">
                <span className="opacity-75">
                  Geschikt voor headers, uithangbord &amp; visitekaartje
                </span>
                <span className="font-bold underline text-[#dfb25a] group-hover:translate-x-0.5 transition-transform">
                  {isSelected ? "Geselecteerd ✓" : "Kies dit lettertype →"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Secundair: Tekstlettertype kiezen (Broodtekst) */}
      <div className="bg-[var(--section-bg)] p-6 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-black text-[var(--text)]">2. Kies jouw Secundaire Tekstlettertype (voor alinea&apos;s &amp; website)</h2>
          <p className="text-xs opacity-75 mt-0.5">
            Volgens het boek gebruik je voor alinea&apos;s en documenten altijd een hyperleesbare sans-serif.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["Inter", "Montserrat", "Work Sans", "Archivo"].map((font) => {
            const isSelected = bodyFont === font;
            return (
              <button
                key={font}
                type="button"
                onClick={() => handleSelectBody(font)}
                className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                  isSelected
                    ? "border-[#dfb25a] bg-[#dfb25a]/10 font-black shadow-sm"
                    : "border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 bg-[var(--surface)] font-medium"
                }`}
              >
                <span className="text-sm block text-[var(--text)]">{font}</span>
                <span className="text-[10px] opacity-60 block mt-0.5">
                  {isSelected ? "Gekozen broodtekst ✓" : "Kies als broodtekst"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigatie Knoppen */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-black/10 dark:border-white/10">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-black/15 dark:border-white/15 text-xs font-bold"
        >
          ← Terug naar Kleurenpalet
        </button>

        <button
          type="button"
          onClick={confirmTypography}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#dfb25a] to-[#f7d57f] text-black font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <span>Bevestig Typografie &amp; Naar Stap 5: Fotografie</span>
          <span>→</span>
        </button>
      </div>

    </div>
  );
}
