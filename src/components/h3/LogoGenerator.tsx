"use client";

import React, { useState } from "react";
import { LogoGeneratorData, LogoLijstData, LogoType } from "./types";
import { 
  Sparkles, 
  RefreshCw, 
  Maximize2, 
  Check, 
  ShieldAlert, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  X
} from "lucide-react";

interface LogoGeneratorProps {
  data: LogoGeneratorData;
  lijst: LogoLijstData;
  companyName: string;
  onChange: (updated: LogoGeneratorData) => void;
  onNext: () => void;
  onBack: () => void;
}

export function LogoGenerator({ 
  data, 
  lijst, 
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
  const [seed, setSeed] = useState(1);

  const handleSelect = (type: LogoType) => {
    onChange({
      ...data,
      subtitle,
      initials,
      selectedLogoType: type,
    });
  };

  const regenerate = () => {
    setSeed(s => s + 1);
  };

  // Helper om SVG logo per type te renderen (scherpe pure zwart-wit vector graphics)
  const renderLogoPreview = (type: LogoType, isLarge: boolean = false) => {
    const primaryIcon = lijst.welTags[0]?.toLowerCase() || "ambacht";
    const size = isLarge ? 300 : 160;

    switch (type) {
      case "beeldmerk":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-4" fill="currentColor">
            {primaryIcon.includes("beer") ? (
              <g transform="translate(100, 100) scale(0.8)">
                <path d="M -50 -10 C -50 -40, -20 -60, 0 -60 C 20 -60, 50 -40, 50 -10 C 50 30, 25 60, 0 60 C -25 60, -50 30, -50 -10 Z" />
                <circle cx="-35" cy="-45" r="14" />
                <circle cx="35" cy="-45" r="14" />
                <path d="M -20 -5 L -5 5 L -10 15 L 0 8 L 10 15 L 5 5 L 20 -5 Z" fill="#FFFFFF" />
              </g>
            ) : primaryIcon.includes("berg") ? (
              <g transform="translate(100, 100)">
                <polygon points="0,-50 -60,40 60,40" />
                <polygon points="0,-50 -20,-10 0,0 20,-10" fill="#FFFFFF" />
                <polygon points="25,-20 -10,40 60,40" opacity="0.6" />
              </g>
            ) : (
              <g transform="translate(100, 100)">
                <path d="M 0 -60 L 50 -20 L 50 35 C 50 65, 0 80, 0 80 C 0 80, -50 65, -50 35 L -50 -20 Z" />
                <path d="M 0 -45 L 35 -15 L 35 30 C 35 50, 0 65, 0 65 C 0 65, -35 50, -35 30 L -35 -15 Z" fill="#FFFFFF" />
                <polygon points="0,-25 15,20 0,10 -15,20" />
              </g>
            )}
          </svg>
        );

      case "lettermerk":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-4 flex items-center justify-center">
            <rect x="25" y="25" width="150" height="150" fill="none" stroke="currentColor" strokeWidth="8" rx="20" />
            <text
              x="100"
              y="118"
              fontSize={initials.length > 2 ? "44" : "56"}
              fontFamily="system-ui, sans-serif"
              fontWeight="900"
              letterSpacing="2"
              textAnchor="middle"
              fill="currentColor"
            >
              {initials}
            </text>
            <line x1="50" y1="140" x2="150" y2="140" stroke="currentColor" strokeWidth="4" />
          </svg>
        );

      case "woordmerk":
        return (
          <svg viewBox="0 0 240 160" className="w-full h-full p-3 flex items-center justify-center">
            <text
              x="120"
              y="85"
              fontSize={name.length > 14 ? "20" : name.length > 10 ? "24" : "30"}
              fontFamily="Georgia, serif"
              fontWeight="900"
              letterSpacing="2.5"
              textAnchor="middle"
              fill="currentColor"
            >
              {name.toUpperCase()}
            </text>
            <line x1="40" y1="102" x2="200" y2="102" stroke="currentColor" strokeWidth="2.5" />
            <text
              x="120"
              y="120"
              fontSize="9"
              fontFamily="system-ui, sans-serif"
              fontWeight="700"
              letterSpacing="6"
              textAnchor="middle"
              fill="currentColor"
            >
              EST. 2026
            </text>
          </svg>
        );

      case "combinatiemerk":
        return (
          <svg viewBox="0 0 220 180" className="w-full h-full p-3 flex flex-col items-center justify-center">
            {/* Icoon boven */}
            <g transform="translate(110, 50)">
              <circle cx="0" cy="0" r="28" />
              <polygon points="-12,-10 12,-10 0,16" fill="#FFFFFF" />
            </g>
            {/* Naam onder */}
            <text
              x="110"
              y="120"
              fontSize={name.length > 14 ? "17" : "21"}
              fontFamily="system-ui, sans-serif"
              fontWeight="900"
              letterSpacing="1.5"
              textAnchor="middle"
              fill="currentColor"
            >
              {name.toUpperCase()}
            </text>
            {subtitle && (
              <text
                x="110"
                y="142"
                fontSize="9"
                fontFamily="system-ui, sans-serif"
                fontWeight="600"
                letterSpacing="3"
                textAnchor="middle"
                opacity="0.8"
                fill="currentColor"
              >
                {subtitle.toUpperCase()}
              </text>
            )}
          </svg>
        );

      case "embleem":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-3">
            <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="6" />
            <circle cx="100" cy="100" r="77" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
            <circle cx="100" cy="100" r="52" fill="none" stroke="currentColor" strokeWidth="3" />
            {/* Sterretjes */}
            <polygon points="100,58 103,66 111,66 104,71 107,79 100,74 93,79 96,71 89,66 97,66" fill="currentColor" />
            <text
              x="100"
              y="108"
              fontSize={name.length > 12 ? "14" : "18"}
              fontFamily="system-ui, sans-serif"
              fontWeight="900"
              letterSpacing="1"
              textAnchor="middle"
              fill="currentColor"
            >
              {name}
            </text>
            <text
              x="100"
              y="126"
              fontSize="7.5"
              fontFamily="system-ui, sans-serif"
              fontWeight="800"
              letterSpacing="3"
              textAnchor="middle"
              opacity="0.8"
              fill="currentColor"
            >
              ORIGINAL BRAND
            </text>
          </svg>
        );

      case "abstract":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-4 flex items-center justify-center">
            <g transform="translate(100, 100)">
              <path d="M 0 -55 C 35 -55, 60 -25, 45 15 C 30 55, -30 65, -45 25 C -60 -15, -35 -55, 0 -55 Z" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
              <circle cx="0" cy="0" r="16" />
              <line x1="-30" y1="40" x2="45" y2="-40" stroke="currentColor" strokeWidth="5" />
            </g>
          </svg>
        );

      case "mascotte":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full p-3 flex flex-col items-center">
            <g transform="translate(100, 75)">
              {/* Vriendelijke mascotte kop */}
              <circle cx="0" cy="0" r="42" fill="currentColor" />
              <circle cx="-16" cy="-6" r="6" fill="#FFFFFF" />
              <circle cx="16" cy="-6" r="6" fill="#FFFFFF" />
              <circle cx="-15" cy="-6" r="3" />
              <circle cx="17" cy="-6" r="3" />
              <path d="M -16 14 Q 0 28 16 14" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />
              {/* Oortjes / petje */}
              <polygon points="-24,-38 0,-60 24,-38" fill="currentColor" />
            </g>
            <text
              x="100"
              y="155"
              fontSize={name.length > 12 ? "16" : "20"}
              fontFamily="system-ui, sans-serif"
              fontWeight="900"
              letterSpacing="1"
              textAnchor="middle"
              fill="currentColor"
            >
              {name}
            </text>
          </svg>
        );

      default:
        return null;
    }
  };

  const logotypes: { type: LogoType; label: string; desc: string }[] = [
    { type: "beeldmerk", label: "1. Beeldmerk", desc: "Puur symbool of icoon" },
    { type: "lettermerk", label: "2. Lettermerk", desc: "Monogram / Initialen" },
    { type: "woordmerk", label: "3. Woordmerk", desc: "Strakke typografische naam" },
    { type: "combinatiemerk", label: "4. Combinatiemerk", desc: "Icoon + naam + ondertitel" },
    { type: "embleem", label: "5. Embleem", desc: "Klassiek schild of zegel" },
    { type: "abstract", label: "6. Abstract merk", desc: "Geometrisch & conceptueel" },
    { type: "mascotte", label: "7. Mascotte", desc: "Sympathiek karakter-logo" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Intro en Instellingen */}
      <div className="bg-[var(--section-bg)] p-6 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#dfb25a] block mb-1">
              Stap 2 • Hoofdstuk 3: De Visuele Identiteit
            </span>
            <h1 className="text-2xl font-black text-[var(--text)] tracking-tight">
              Logo Concepten: 7 Archetypes in Zwart-Wit
            </h1>
            <p className="text-xs opacity-75 mt-0.5">
              Gebaseerd op Jouw LIJST (WEL: {lijst.welTags.join(", ") || "geen"}). Kies het logo-archetype dat het beste bij jouw merk past.
            </p>
          </div>

          <button
            type="button"
            onClick={regenerate}
            className="px-4 py-2 rounded-xl bg-black/10 dark:bg-white/10 hover:bg-[#dfb25a]/20 hover:text-[#dfb25a] text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Nieuwe variaties
          </button>
        </div>

        {/* Input velden voor naam, ondertitel en initialen */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div>
            <label className="text-[11px] font-bold opacity-75 block mb-1">Bedrijfsnaam:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-black/15 dark:border-white/15 bg-[var(--surface)] text-sm font-bold focus:border-[#dfb25a] outline-none"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold opacity-75 block mb-1">Ondertitel / Payoff (optioneel):</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Bv. Koffie & Ambacht"
              className="w-full px-3 py-2 rounded-xl border border-black/15 dark:border-white/15 bg-[var(--surface)] text-sm focus:border-[#dfb25a] outline-none"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold opacity-75 block mb-1">Initialen voor Lettermerk:</label>
            <input
              type="text"
              maxLength={4}
              value={initials}
              onChange={(e) => setInitials(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 rounded-xl border border-black/15 dark:border-white/15 bg-[var(--surface)] text-sm font-mono font-bold tracking-widest focus:border-[#dfb25a] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Vaste Disclaimer uit het boek (Niet wegklikbaar) */}
      <div className="p-4 rounded-xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex gap-3 items-start leading-relaxed shadow-sm">
        <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold block mb-0.5">Let op: dit zijn visuele concepten om je richting te bepalen, geen eindlogo.</strong>
          Dit helpt je ontdekken welk type logo écht bij je past. AI maakt pixels, geen vectorbestanden, en letters kloppen niet altijd 100%. Laat je definitieve logo straks altijd uitwerken door een professional en eis altijd een vectorbestand (.svg, .ai of .eps).
        </div>
      </div>

      {/* Raster van de 7 logotypes in zwart-wit */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {logotypes.map((lt) => {
          const isSelected = data.selectedLogoType === lt.type;
          return (
            <div
              key={lt.type}
              className={`rounded-2xl border-2 transition-all p-4 flex flex-col justify-between bg-[var(--section-bg)] relative overflow-hidden group shadow-sm ${
                isSelected 
                  ? "border-[#dfb25a] ring-2 ring-[#dfb25a]/40 bg-[#dfb25a]/5" 
                  : "border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30"
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 bg-[#dfb25a] text-black px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md z-10">
                  <Check className="w-3 h-3" /> Gekozen type
                </div>
              )}

              {/* Header van de kaart */}
              <div className="mb-3">
                <span className="font-black text-xs text-[var(--text)] block">{lt.label}</span>
                <span className="text-[11px] opacity-70 block">{lt.desc}</span>
              </div>

              {/* Wit canvas met het Zwart-wit logo */}
              <div className="w-full aspect-square bg-white text-black rounded-xl border border-black/15 shadow-inner flex items-center justify-center relative overflow-hidden my-2">
                {renderLogoPreview(lt.type)}
                
                {/* Vergroten knop */}
                <button
                  type="button"
                  onClick={() => setZoomType(lt.type)}
                  className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Vergroten"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Kies knop */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => handleSelect(lt.type)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? "bg-[#dfb25a] text-black font-black"
                      : "bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-[var(--text)]"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-4 h-4" /> Dit type is geselecteerd
                    </>
                  ) : (
                    "Kies dit type"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Vergroot Modal */}
      {zoomType && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-black p-6 rounded-2xl max-w-lg w-full relative shadow-2xl animate-scaleUp">
            <button
              type="button"
              onClick={() => setZoomType(null)}
              className="absolute top-4 right-4 p-1 rounded-full bg-black/10 hover:bg-black/20 text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-black text-lg mb-1 capitalize">Voorbeeld: {zoomType}</h3>
            <p className="text-xs opacity-70 mb-4">Puur zwart op wit vector weergave.</p>
            <div className="w-full aspect-square border border-black/15 rounded-xl flex items-center justify-center p-6 bg-white">
              {renderLogoPreview(zoomType, true)}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  handleSelect(zoomType);
                  setZoomType(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#dfb25a] text-black font-black text-xs uppercase"
              >
                Kies dit logo &amp; Sluiten
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
          className="px-5 py-2.5 rounded-xl border border-black/15 dark:border-white/15 text-xs font-bold"
        >
          ← Terug naar Jouw LIJST
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!data.selectedLogoType}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#dfb25a] to-[#f7d57f] text-black font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          <span>Naar Stap 3: Kleurenpalet &amp; Harmonie-wiel</span>
          <span>→</span>
        </button>
      </div>

    </div>
  );
}
