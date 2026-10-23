"use client";

import React, { useState } from "react";
import { LogoGeneratorData, LogoLijstData, LogoType, ColorPaletteData } from "./types";
import { 
  Sparkles, 
  RefreshCw, 
  Maximize2, 
  Check, 
  ShieldAlert, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  X,
  Palette,
  Bot,
  Loader2
} from "lucide-react";

interface LogoGeneratorProps {
  data: LogoGeneratorData;
  lijst: LogoLijstData;
  colors?: ColorPaletteData;
  companyName: string;
  onChange: (updated: LogoGeneratorData) => void;
  onNext: () => void;
  onBack: () => void;
}

const LOGO_DESCRIPTIONS: Record<LogoType, { title: string; subtitle: string; example: string }> = {
  beeldmerk: {
    title: "Beeldmerk (Pictorial Mark)",
    subtitle: "Puur één herkenbaar icoon of symbool zonder tekst.",
    example: "Zoals de Apple-appel of de Twitter/X-vogel."
  },
  lettermerk: {
    title: "Lettermerk (Monogram)",
    subtitle: "Alleen de initialen in een krachtige typografische stijl.",
    example: "Zoals IBM, NASA, H&M of Louis Vuitton."
  },
  woordmerk: {
    title: "Woordmerk (Wordmark)",
    subtitle: "De volledige bedrijfsnaam in een uniek ontworpen lettertype.",
    example: "Zoals Google, Coca-Cola of Sony."
  },
  combinatiemerk: {
    title: "Combinatiemerk (Combination Mark)",
    subtitle: "Een beeldmerk en woordmerk harmonieus gecombineerd.",
    example: "Zoals Lacoste, Adidas of Burger King (meest gekozen type)."
  },
  embleem: {
    title: "Embleem (Emblem / Seal)",
    subtitle: "De naam en het icoon omsloten in een schild, zegel of badge.",
    example: "Zoals Starbucks, Harley-Davidson of Porsche."
  },
  abstract: {
    title: "Abstract Merk (Abstract Mark)",
    subtitle: "Een geometrische vorm die emotie en sfeer oproept.",
    example: "Zoals Nike (de swoosh), Pepsi of Airbnb."
  },
  mascotte: {
    title: "Mascotte Logo (Mascot)",
    subtitle: "Een getekend karakter dat het merk persoonlijkheid geeft.",
    example: "Zoals Michelin Man, KFC (Colonel) of Duolingo."
  }
};

export function LogoGenerator({ 
  data, 
  lijst, 
  colors,
  companyName, 
  onChange, 
  onNext, 
  onBack 
}: LogoGeneratorProps) {
  const [name, setName] = useState(companyName || "Café De Beer");
  const [subtitle, setSubtitle] = useState(data.subtitle || "Koffie & Ambacht");
  const [initials, setInitials] = useState(
    data.initials || 
    name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 3).join("").toUpperCase() || 
    "CDB"
  );
  const [zoomType, setZoomType] = useState<LogoType | null>(null);
  const [colorMode, setColorMode] = useState<"brand" | "bw">("brand");
  const [aiInsights, setAiInsights] = useState<Partial<Record<LogoType, string>>>({});
  const [loadingAi, setLoadingAi] = useState<LogoType | null>(null);

  // Kleurenpalet bepaling:
  // Als gebruiker al kleuren heeft in Stap 3: gebruik die!
  // Anders: standaard in de warme, stijlvolle Vin's Survival Gids huiskleuren (#dfb25a en #1a0f08)
  const isBrand = colorMode === "brand";
  const primaryColor = isBrand ? (colors?.isConfirmed ? colors.primary : "#dfb25a") : "#000000";
  const accentColor = isBrand ? (colors?.isConfirmed ? colors.accent : "#a16e38") : "#000000";
  const darkColor = isBrand ? (colors?.isConfirmed ? colors.dark : "#1a0f08") : "#000000";
  const lightColor = isBrand ? (colors?.isConfirmed ? colors.light : "#fdf9f1") : "#ffffff";

  const handleSelect = (type: LogoType) => {
    onChange({
      ...data,
      subtitle,
      initials,
      selectedLogoType: type,
    });
  };

  const handleGenerateAiInsight = async (type: LogoType) => {
    setLoadingAi(type);
    try {
      const res = await fetch("/api/logo/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          subtitle,
          logoType: type,
          welTags: lijst.welTags,
          nietTags: lijst.nietTags,
          sfeerWoorden: lijst.sfeerWoorden
        })
      });
      const result = await res.json();
      if (result.aiConcept) {
        setAiInsights(prev => ({ ...prev, [type]: result.aiConcept }));
      }
    } catch (e) {
      console.error("Fout bij genereren AI advies:", e);
    } finally {
      setLoadingAi(null);
    }
  };

  // Helper om SVG logo per archetype te renderen
  const renderLogoPreview = (type: LogoType, isLarge: boolean = false) => {
    const primaryTag = lijst.welTags[0]?.toLowerCase() || "ambacht";

    switch (type) {
      case "beeldmerk":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-4">
            <defs>
              <linearGradient id={`grad-bm-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={primaryColor} />
                <stop offset="100%" stopColor={accentColor} />
              </linearGradient>
            </defs>
            <g transform="translate(100, 100)">
              {/* Heraldiek schild met facetten */}
              <path 
                d="M 0 -70 L 60 -35 L 60 25 C 60 65, 0 85, 0 85 C 0 85, -60 65, -60 25 L -60 -35 Z" 
                fill={`url(#grad-bm-${type})`}
              />
              <path 
                d="M 0 -60 L 50 -28 L 50 20 C 50 55, 0 72, 0 72 C 0 72, -50 55, -50 20 L -50 -28 Z" 
                fill={isBrand ? darkColor : "#FFFFFF"}
              />
              {/* Icoon binnenin afgestemd op sfeer */}
              {primaryTag.includes("beer") ? (
                <g transform="scale(0.85)">
                  <circle cx="-16" cy="-24" r="8" fill={primaryColor} />
                  <circle cx="16" cy="-24" r="8" fill={primaryColor} />
                  <path d="M -25 -10 C -25 -25, 25 -25, 25 -10 C 25 15, 0 25, 0 25 C 0 25, -25 15, -25 -10 Z" fill={primaryColor} />
                  <ellipse cx="0" cy="5" rx="10" ry="7" fill={isBrand ? darkColor : "#FFFFFF"} />
                  <circle cx="0" cy="2" r="3" fill={primaryColor} />
                </g>
              ) : (
                <g>
                  <polygon points="0,-35 22,-5 12,25 -12,25 -22,-5" fill={primaryColor} />
                  <polygon points="0,-20 12,-2 6,15 -6,15 -12,-2" fill={isBrand ? darkColor : "#FFFFFF"} />
                  <circle cx="0" cy="-2" r="3" fill={primaryColor} />
                </g>
              )}
            </g>
          </svg>
        );

      case "lettermerk":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-4">
            <defs>
              <linearGradient id={`grad-lm-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={primaryColor} />
                <stop offset="100%" stopColor={accentColor} />
              </linearGradient>
            </defs>
            {/* Dubbel luxe achthoekig kader */}
            <polygon 
              points="60,20 140,20 180,60 180,140 140,180 60,180 20,140 20,60" 
              fill="none" 
              stroke={`url(#grad-lm-${type})`} 
              strokeWidth="4" 
            />
            <polygon 
              points="64,28 136,28 172,64 172,136 136,172 64,172 28,136 28,64" 
              fill="none" 
              stroke={primaryColor} 
              strokeWidth="1.5" 
              opacity="0.6"
            />
            <text
              x="100"
              y="118"
              fontSize={initials.length > 2 ? "44" : "56"}
              fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
              fontWeight="900"
              letterSpacing="3"
              textAnchor="middle"
              fill={primaryColor}
            >
              {initials}
            </text>
            <circle cx="100" cy="45" r="2.5" fill={accentColor} />
            <circle cx="100" cy="155" r="2.5" fill={accentColor} />
          </svg>
        );

      case "woordmerk":
        return (
          <svg viewBox="0 0 240 160" className="w-full h-full p-3">
            <defs>
              <linearGradient id={`grad-wm-${type}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={primaryColor} />
                <stop offset="50%" stopColor={accentColor} />
                <stop offset="100%" stopColor={primaryColor} />
              </linearGradient>
            </defs>
            {/* Woordmerk met decoratieve hairlines */}
            <line x1="30" y1="52" x2="210" y2="52" stroke={primaryColor} strokeWidth="1.5" opacity="0.4" />
            <polygon points="120,49 123,52 120,55 117,52" fill={accentColor} />
            
            <text
              x="120"
              y="85"
              fontSize={name.length > 15 ? "19" : name.length > 11 ? "23" : "28"}
              fontFamily="'Cinzel', 'Montserrat', Georgia, serif"
              fontWeight="900"
              letterSpacing="3"
              textAnchor="middle"
              fill={primaryColor}
            >
              {name.toUpperCase()}
            </text>

            <line x1="30" y1="102" x2="210" y2="102" stroke={primaryColor} strokeWidth="1.5" opacity="0.4" />
            <polygon points="120,99 123,102 120,105 117,102" fill={accentColor} />

            <text
              x="120"
              y="122"
              fontSize="8.5"
              fontFamily="'Montserrat', system-ui, sans-serif"
              fontWeight="700"
              letterSpacing="5"
              textAnchor="middle"
              fill={accentColor}
            >
              {subtitle ? subtitle.toUpperCase() : "ORIGINAL QUALITY"}
            </text>
          </svg>
        );

      case "combinatiemerk":
        return (
          <svg viewBox="0 0 220 180" className="w-full h-full p-3">
            <g transform="translate(110, 48)">
              {/* Kroon / Crest icoon */}
              <circle cx="0" cy="0" r="28" fill="none" stroke={primaryColor} strokeWidth="2.5" />
              <polygon points="0,-16 12,0 8,14 -8,14 -12,0" fill={primaryColor} />
              <circle cx="-16" cy="-4" r="2" fill={accentColor} />
              <circle cx="16" cy="-4" r="2" fill={accentColor} />
            </g>
            <text
              x="110"
              y="114"
              fontSize={name.length > 14 ? "18" : name.length > 10 ? "21" : "25"}
              fontFamily="'Montserrat', Georgia, sans-serif"
              fontWeight="900"
              letterSpacing="2.5"
              textAnchor="middle"
              fill={primaryColor}
            >
              {name.toUpperCase()}
            </text>
            <rect x="55" y="126" width="110" height="1" fill={accentColor} opacity="0.5" />
            <text
              x="110"
              y="142"
              fontSize="8"
              fontFamily="system-ui, sans-serif"
              fontWeight="800"
              letterSpacing="3.5"
              textAnchor="middle"
              fill={accentColor}
            >
              {subtitle.toUpperCase()}
            </text>
          </svg>
        );

      case "embleem":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-2">
            <g transform="translate(100, 100)">
              {/* Vintage circulaire zegel badge */}
              <circle cx="0" cy="0" r="76" fill="none" stroke={primaryColor} strokeWidth="3" />
              <circle cx="0" cy="0" r="70" fill="none" stroke={accentColor} strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="0" cy="0" r="64" fill="none" stroke={primaryColor} strokeWidth="1.5" />

              {/* Binnenste cirkel */}
              <circle cx="0" cy="0" r="42" fill={primaryColor} opacity="0.12" />

              <text
                x="0"
                y="-48"
                fontSize="8"
                fontFamily="'Montserrat', sans-serif"
                fontWeight="800"
                letterSpacing="4"
                textAnchor="middle"
                fill={primaryColor}
              >
                ★ AUTHENTIC ★
              </text>

              <text
                x="0"
                y="5"
                fontSize={name.length > 14 ? "14" : name.length > 10 ? "17" : "20"}
                fontFamily="'Cinzel', Georgia, serif"
                fontWeight="900"
                letterSpacing="1.5"
                textAnchor="middle"
                fill={primaryColor}
              >
                {name.length > 14 ? name.substring(0, 13) + "." : name.toUpperCase()}
              </text>

              <line x1="-30" y1="14" x2="30" y2="14" stroke={accentColor} strokeWidth="1.5" />

              <text
                x="0"
                y="27"
                fontSize="7.5"
                fontFamily="'Montserrat', sans-serif"
                fontWeight="700"
                letterSpacing="2.5"
                textAnchor="middle"
                fill={accentColor}
              >
                EST. 2026
              </text>

              <text
                x="0"
                y="54"
                fontSize="7"
                fontFamily="'Montserrat', sans-serif"
                fontWeight="800"
                letterSpacing="3"
                textAnchor="middle"
                fill={primaryColor}
              >
                {subtitle ? subtitle.substring(0, 16).toUpperCase() : "QUALITY FIRST"}
              </text>
            </g>
          </svg>
        );

      case "abstract":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-4">
            <defs>
              <linearGradient id={`grad-ab-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={primaryColor} />
                <stop offset="100%" stopColor={accentColor} />
              </linearGradient>
            </defs>
            <g transform="translate(100, 100)">
              {/* Dynamische gouden spiraal facetten */}
              <polygon points="0,-60 52,-30 0,0" fill={`url(#grad-ab-${type})`} />
              <polygon points="52,-30 52,30 0,0" fill={primaryColor} opacity="0.8" />
              <polygon points="52,30 0,60 0,0" fill={accentColor} />
              <polygon points="0,60 -52,30 0,0" fill={`url(#grad-ab-${type})`} opacity="0.9" />
              <polygon points="-52,30 -52,-30 0,0" fill={primaryColor} opacity="0.7" />
              <polygon points="-52,-30 0,-60 0,0" fill={accentColor} opacity="0.85" />
              <circle cx="0" cy="0" r="10" fill={isBrand ? darkColor : "#FFFFFF"} />
            </g>
          </svg>
        );

      case "mascotte":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-3">
            <g transform="translate(100, 85)">
              {/* Mascotte hoofd / badge */}
              <circle cx="0" cy="0" r="44" fill={primaryColor} opacity="0.15" />
              <circle cx="0" cy="0" r="40" fill="none" stroke={primaryColor} strokeWidth="3" />
              {/* Oren */}
              <circle cx="-28" cy="-30" r="14" fill={primaryColor} />
              <circle cx="-28" cy="-30" r="7" fill={isBrand ? darkColor : "#FFFFFF"} />
              <circle cx="28" cy="-30" r="14" fill={primaryColor} />
              <circle cx="28" cy="-30" r="7" fill={isBrand ? darkColor : "#FFFFFF"} />
              {/* Gezicht */}
              <circle cx="-14" cy="-8" r="4.5" fill={primaryColor} />
              <circle cx="14" cy="-8" r="4.5" fill={primaryColor} />
              <ellipse cx="0" cy="10" rx="14" ry="10" fill={primaryColor} />
              <ellipse cx="0" cy="6" rx="6" ry="4" fill={isBrand ? darkColor : "#FFFFFF"} />
              <path d="M -8 14 Q 0 22 8 14" fill="none" stroke={isBrand ? darkColor : "#FFFFFF"} strokeWidth="2.5" />
            </g>
            <text
              x="100"
              y="155"
              fontSize={name.length > 13 ? "15" : "18"}
              fontFamily="'Montserrat', sans-serif"
              fontWeight="900"
              letterSpacing="2"
              textAnchor="middle"
              fill={primaryColor}
            >
              {name.toUpperCase()}
            </text>
          </svg>
        );
    }
  };

  const types: LogoType[] = [
    "beeldmerk",
    "lettermerk",
    "woordmerk",
    "combinatiemerk",
    "embleem",
    "abstract",
    "mascotte"
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header & Uitleg */}
      <div className="bg-gradient-to-r from-[#2a170b] to-[#160b06] border-2 border-[var(--brand-primary-start,#dfb25a)]/40 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary-start,#dfb25a)] block mb-1">
              Stap 2 • Hoofdstuk 3: De Visuele Identiteit
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              De 7 Logo Archetypes
            </h1>
            <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Ontdek welk type logo het beste bij jouw merk past. Je kunt hieronder wisselen tussen de 
              <strong> merkkleuren</strong> en de klassieke <strong>zwart-wit weergave</strong>.
            </p>
          </div>

          {/* Kleurmodus Schakelaar */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-black/40 border border-white/10 shrink-0">
            <button
              type="button"
              onClick={() => setColorMode("brand")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                colorMode === "brand"
                  ? "bg-[var(--brand-primary-start,#dfb25a)] text-black font-black shadow-sm"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>{colors?.isConfirmed ? "Mijn Merkkleuren" : "Vin's Goud Stijl"}</span>
            </button>

            <button
              type="button"
              onClick={() => setColorMode("bw")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                colorMode === "bw"
                  ? "bg-white text-black font-black shadow-sm"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <span>Zwart-wit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Vaste Boek Waarschuwing */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-xs text-[var(--text)] flex items-start gap-3 leading-relaxed">
        <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold text-amber-500 uppercase tracking-wide text-[11px]">
            Belangrijke regel uit het boek:
          </strong>
          <p className="opacity-90 mt-0.5">
            Dit zijn conceptuele voorbeelden om te ontdekken welk archetype bij jouw merkfilosofie past. 
            Laat je definitieve logo altijd uitwerken door een professional en <strong>eis altijd een vectorbestand (.svg, .ai of .eps)</strong>.
          </p>
        </div>
      </div>

      {/* Invoervelden voor Bedrijfsnaam en Ondertitel */}
      <div className="bg-[var(--section-bg)] p-5 rounded-2xl border border-black/10 dark:border-white/10 shadow-sm grid sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--text)] block mb-1">
            Bedrijfsnaam op het logo:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[var(--surface)] border border-black/15 dark:border-white/20 p-2.5 rounded-xl font-bold text-sm focus:outline-none focus:border-[var(--brand-primary-start,#dfb25a)] text-[var(--text)]"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--text)] block mb-1">
            Ondertitel / Payoff (optioneel):
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full bg-[var(--surface)] border border-black/15 dark:border-white/20 p-2.5 rounded-xl font-medium text-sm focus:outline-none focus:border-[var(--brand-primary-start,#dfb25a)] text-[var(--text)]"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--text)] block mb-1">
            Initialen (voor Lettermerk):
          </label>
          <input
            type="text"
            maxLength={4}
            value={initials}
            onChange={(e) => setInitials(e.target.value.toUpperCase())}
            className="w-full bg-[var(--surface)] border border-black/15 dark:border-white/20 p-2.5 rounded-xl font-bold text-sm uppercase tracking-widest focus:outline-none focus:border-[var(--brand-primary-start,#dfb25a)] text-[var(--text)]"
          />
        </div>
      </div>

      {/* Grid met de 7 Archetype Kaarten */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {types.map((type) => {
          const info = LOGO_DESCRIPTIONS[type];
          const isSelected = data.selectedLogoType === type;
          const aiInsight = aiInsights[type];
          const isAiLoading = loadingAi === type;

          return (
            <div
              key={type}
              className={`rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md ${
                isSelected
                  ? "border-[var(--brand-primary-start,#dfb25a)] ring-2 ring-[var(--brand-primary-start,#dfb25a)]/30 bg-[var(--surface)]"
                  : "border-black/10 dark:border-white/10 bg-[var(--surface)] hover:border-black/30 dark:hover:border-white/30"
              }`}
            >
              {/* Type Titel & Subtitle */}
              <div className="p-4 border-b border-black/5 dark:border-white/5 space-y-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-sm text-[var(--text)] tracking-tight">
                    {info.title.split("(")[0]}
                  </h3>
                  {isSelected && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 font-black text-[10px] flex items-center gap-1">
                      <Check className="w-3 h-3" /> Gekozen
                    </span>
                  )}
                </div>
                <p className="text-[11px] opacity-70 leading-snug line-clamp-2">
                  {info.subtitle}
                </p>
              </div>

              {/* Logo Preview Canvas */}
              <div 
                className="aspect-square flex items-center justify-center p-4 transition-colors"
                style={{ backgroundColor: colorMode === "brand" ? (colors?.isConfirmed ? colors.light : "#fdf9f1") : "#ffffff" }}
              >
                {renderLogoPreview(type)}
              </div>

              {/* AI Advies box indien opgevraagd */}
              {aiInsight && (
                <div className="p-3 bg-[var(--brand-primary-start,#dfb25a)]/10 border-t border-[var(--brand-primary-start,#dfb25a)]/20 text-[11px] text-[var(--text)] space-y-1">
                  <div className="font-bold flex items-center gap-1 text-[10px] uppercase text-[var(--brand-primary-start,#dfb25a)]">
                    <Bot className="w-3.5 h-3.5" /> AI Design Advies:
                  </div>
                  <p className="opacity-90 leading-relaxed italic">{aiInsight}</p>
                </div>
              )}

              {/* Knoppenbalk onderaan kaart */}
              <div className="p-3 border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setZoomType(type)}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-[var(--surface)] border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 text-[11px] font-bold text-[var(--text)] flex items-center justify-center gap-1 transition"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Vergroten</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleGenerateAiInsight(type)}
                    disabled={isAiLoading}
                    title="Vraag Gemini AI om designadvies voor dit archetype"
                    className="py-1.5 px-2 rounded-lg bg-[var(--surface)] border border-black/10 dark:border-white/10 hover:border-[var(--brand-primary-start,#dfb25a)] text-[11px] font-bold text-[var(--brand-primary-start,#dfb25a)] flex items-center justify-center gap-1 transition"
                  >
                    {isAiLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                    <span>AI Advies</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelect(type)}
                  className={`w-full py-2 rounded-xl text-xs font-black uppercase tracking-wider transition shadow-sm ${
                    isSelected
                      ? "bg-emerald-500 text-white"
                      : "bg-gradient-to-r from-[var(--brand-primary-start,#dfb25a)] to-[var(--brand-primary-end,#a16e38)] text-[var(--on-primary,#000000)] hover:brightness-105"
                  }`}
                >
                  {isSelected ? "Gekozen Type ✓" : "Dit type kies ik"}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Zoom Modal */}
      {zoomType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[var(--surface)] rounded-3xl border border-black/15 dark:border-white/20 p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-black/10 dark:border-white/10 pb-3">
              <div>
                <h3 className="font-black text-lg text-[var(--text)]">
                  {LOGO_DESCRIPTIONS[zoomType].title}
                </h3>
                <p className="text-xs opacity-75">{LOGO_DESCRIPTIONS[zoomType].example}</p>
              </div>
              <button
                type="button"
                onClick={() => setZoomType(null)}
                className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div 
              className="h-72 rounded-2xl flex items-center justify-center p-6 border border-black/10 shadow-inner"
              style={{ backgroundColor: colorMode === "brand" ? (colors?.isConfirmed ? colors.light : "#fdf9f1") : "#ffffff" }}
            >
              {renderLogoPreview(zoomType, true)}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setZoomType(null)}
                className="px-4 py-2 rounded-xl border border-black/15 dark:border-white/15 text-xs font-bold text-[var(--text)]"
              >
                Sluiten
              </button>
              <button
                type="button"
                onClick={() => {
                  handleSelect(zoomType);
                  setZoomType(null);
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[var(--brand-primary-start,#dfb25a)] to-[var(--brand-primary-end,#a16e38)] text-[var(--on-primary,#000000)] text-xs font-black uppercase tracking-wider shadow-md"
              >
                Dit Type Kiezen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigatie Knoppen */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-black/10 dark:border-white/10">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-black/15 dark:border-white/15 text-xs font-bold text-[var(--text)]"
        >
          ← Terug naar Jouw LIJST
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!data.selectedLogoType}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
            data.selectedLogoType
              ? "bg-gradient-to-r from-[var(--brand-primary-start,#dfb25a)] to-[var(--brand-primary-end,#a16e38)] text-[var(--on-primary,#000000)] hover:brightness-110"
              : "bg-black/10 dark:bg-white/10 opacity-50 cursor-not-allowed text-[var(--text)]"
          }`}
        >
          <span>Naar Stap 3: Kleurenpalet</span>
          <span>→</span>
        </button>
      </div>

    </div>
  );
}
