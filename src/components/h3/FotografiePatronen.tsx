"use client";

import React, { useState } from "react";
import { BrandImageryData } from "./types";
import { 
  Camera, 
  Sparkles, 
  Check, 
  HelpCircle, 
  Upload, 
  ChevronDown, 
  ChevronUp, 
  Shapes,
  Maximize2,
  Trash2,
  CheckCircle2
} from "lucide-react";

interface FotografiePatronenProps {
  data: BrandImageryData;
  onChange: (updated: BrandImageryData) => void;
  onNext: () => void;
  onBack: () => void;
}

const PRESET_PHOTOS = [
  { id: "p1", title: "Ambacht & Werkplaats", url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80", tag: "Ambacht" },
  { id: "p2", title: "Koffie & Gastvrijheid", url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80", tag: "Horeca" },
  { id: "p3", title: "Moderne Architectuur & Tech", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80", tag: "Zakelijk" },
  { id: "p4", title: "Persoonlijk Contact & Vertrouwen", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80", tag: "Dienstverlening" },
  { id: "p5", title: "Buitenleven & Natuur", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=80", tag: "Natuur" },
  { id: "p6", title: "Design & Creatief Proces", url: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&auto=format&fit=crop&q=80", tag: "Creatief" },
];

const PATTERN_OPTIONS = [
  { id: "wood", name: "Hout & Textuur", desc: "Ambachtelijk, natuurlijk, robuust", bg: "radial-gradient(ellipse at center, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.2) 100%)" },
  { id: "grid", name: "Technisch Raster", desc: "Modern, precies, gestructureerd", bg: "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)" },
  { id: "dots", name: "Stippenpatroon", desc: "Fris, speels, vriendelijk", bg: "radial-gradient(circle, rgba(0,0,0,0.1) 1.5px, transparent 1.5px)" },
  { id: "clean", name: "Puur & Minimalistisch", desc: "Zonder patroon, pure rust", bg: "none" },
];

export function FotografiePatronen({
  data,
  onChange,
  onNext,
  onBack,
}: FotografiePatronenProps) {
  const [expression, setExpression] = useState(data.expression || "lachend");
  const [gaze, setGaze] = useState(data.gaze || "camera");
  const [lighting, setLighting] = useState(data.lighting || "licht");
  const [photos, setPhotos] = useState<string[]>(data.photos.length > 0 ? data.photos : [PRESET_PHOTOS[0].url]);
  const [patternUrl, setPatternUrl] = useState<string | null>(data.patternUrl || "wood");
  const [iconStyle, setIconStyle] = useState<"lijn" | "vlak">(data.iconStyle || "lijn");
  const [showExplanation, setShowExplanation] = useState(false);

  const togglePhoto = (url: string) => {
    let next: string[];
    if (photos.includes(url)) {
      next = photos.filter(p => p !== url);
    } else {
      if (photos.length >= 3) {
        next = [...photos.slice(1), url];
      } else {
        next = [...photos, url];
      }
    }
    setPhotos(next);
    onChange({
      ...data,
      expression,
      gaze,
      lighting,
      photos: next,
      patternUrl,
      iconStyle,
    });
  };

  const updateRules = (
    newExp: typeof expression,
    newGaze: typeof gaze,
    newLight: typeof lighting,
    newIcon: typeof iconStyle,
    newPat: typeof patternUrl
  ) => {
    setExpression(newExp);
    setGaze(newGaze);
    setLighting(newLight);
    setIconStyle(newIcon);
    setPatternUrl(newPat);
    onChange({
      ...data,
      expression: newExp,
      gaze: newGaze,
      lighting: newLight,
      photos,
      patternUrl: newPat,
      iconStyle: newIcon,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          togglePhoto(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const isReady = photos.length >= 1;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2a170b] to-[#160b06] border-2 border-[#dfb25a]/40 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#dfb25a] block mb-1">
              Stap 5 • Hoofdstuk 3: De Visuele Identiteit
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Fotografie &amp; Patronen: Jouw Beeldtaal
            </h1>
            <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Een consistente beeldstijl zorgt voor rust en herkenning. Stel hier je 3 gouden beeldregels in en kies 1 tot 3 sfeerfoto&apos;s voor je moodboard.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold transition-all text-[#dfb25a]"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{showExplanation ? "Verberg Beeldregels" : "Beeldregels uit het boek"}</span>
            {showExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Uitleg uit het boek */}
        {showExplanation && (
          <div className="mt-5 pt-4 border-t border-white/15 grid sm:grid-cols-3 gap-4 text-xs text-white/90 bg-black/40 p-4 rounded-xl">
            <div>
              <span className="font-bold text-[#dfb25a] block mb-1">1. Mensen en Expressie:</span>
              <p className="opacity-80 leading-relaxed">
                Kies bewust: warm en toegankelijk lachend, of gefocust, serieus en vakkundig aan het werk.
              </p>
            </div>
            <div>
              <span className="font-bold text-cyan-400 block mb-1">2. Blikrichting:</span>
              <p className="opacity-80 leading-relaxed">
                Kijkt de persoon recht in de lens (direct contact) of weg (documentair, alsof je over de schouder meekijkt)?
              </p>
            </div>
            <div>
              <span className="font-bold text-amber-300 block mb-1">3. Consistentie in licht:</span>
              <p className="opacity-80 leading-relaxed">
                Meng nooit donkere, schimmige smartphone-foto&apos;s met overbelichte witte stockbeelden. Kies één stijl.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* De 3 Beeldregels Keuzekaarten */}
      <div className="bg-[var(--section-bg)] p-6 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-black text-[var(--text)]">1. Jouw Drie Gouden Beeldregels</h2>
          <p className="text-xs opacity-75 mt-0.5">
            Deze regels gaan straks letterlijk in jouw Huisstijldocument als richtlijn voor fotograven en contentcreatie.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          
          {/* Regel 1: Expressie */}
          <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-2">
            <span className="text-[11px] font-bold text-[#dfb25a] uppercase tracking-wider block">Expressie</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => updateRules("lachend", gaze, lighting, iconStyle, patternUrl)}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all border ${
                  expression === "lachend"
                    ? "bg-[#dfb25a] text-black border-[#dfb25a] font-black"
                    : "bg-[var(--surface)] text-[var(--text)] border-black/10 dark:border-white/10 opacity-75"
                }`}
              >
                😄 Lachend
              </button>
              <button
                type="button"
                onClick={() => updateRules("serieus", gaze, lighting, iconStyle, patternUrl)}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all border ${
                  expression === "serieus"
                    ? "bg-[#dfb25a] text-black border-[#dfb25a] font-black"
                    : "bg-[var(--surface)] text-[var(--text)] border-black/10 dark:border-white/10 opacity-75"
                }`}
              >
                🎯 Gefocust
              </button>
            </div>
          </div>

          {/* Regel 2: Blikrichting */}
          <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-2">
            <span className="text-[11px] font-bold text-[#dfb25a] uppercase tracking-wider block">Blikrichting</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => updateRules(expression, "camera", lighting, iconStyle, patternUrl)}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all border ${
                  gaze === "camera"
                    ? "bg-[#dfb25a] text-black border-[#dfb25a] font-black"
                    : "bg-[var(--surface)] text-[var(--text)] border-black/10 dark:border-white/10 opacity-75"
                }`}
              >
                👀 In camera
              </button>
              <button
                type="button"
                onClick={() => updateRules(expression, "wegkijkend", lighting, iconStyle, patternUrl)}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all border ${
                  gaze === "wegkijkend"
                    ? "bg-[#dfb25a] text-black border-[#dfb25a] font-black"
                    : "bg-[var(--surface)] text-[var(--text)] border-black/10 dark:border-white/10 opacity-75"
                }`}
              >
                🛠️ In actie
              </button>
            </div>
          </div>

          {/* Regel 3: Belichting */}
          <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-2">
            <span className="text-[11px] font-bold text-[#dfb25a] uppercase tracking-wider block">Belichting</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => updateRules(expression, gaze, "licht", iconStyle, patternUrl)}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all border ${
                  lighting === "licht"
                    ? "bg-[#dfb25a] text-black border-[#dfb25a] font-black"
                    : "bg-[var(--surface)] text-[var(--text)] border-black/10 dark:border-white/10 opacity-75"
                }`}
              >
                ☀️ Helder &amp; Licht
              </button>
              <button
                type="button"
                onClick={() => updateRules(expression, gaze, "donker", iconStyle, patternUrl)}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all border ${
                  lighting === "donker"
                    ? "bg-[#dfb25a] text-black border-[#dfb25a] font-black"
                    : "bg-[var(--surface)] text-[var(--text)] border-black/10 dark:border-white/10 opacity-75"
                }`}
              >
                🌙 Sfeervol / Donker
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Sfeerfoto Moodboard Selectie (1-3 foto's) */}
      <div className="bg-[var(--section-bg)] p-6 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h2 className="text-base font-black text-[var(--text)] flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#dfb25a]" />
              2. Sfeerfoto&apos;s voor je Moodboard ({photos.length}/3 geselecteerd)
            </h2>
            <p className="text-xs opacity-75 mt-0.5">
              Klik op de foto&apos;s om ze aan je moodboard toe te voegen of upload je eigen beeld.
            </p>
          </div>

          <label className="px-3.5 py-1.5 rounded-xl bg-black/10 dark:bg-white/10 hover:bg-[#dfb25a]/20 hover:text-[#dfb25a] text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 border border-black/10 dark:border-white/10">
            <Upload className="w-3.5 h-3.5" /> Upload eigen foto
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {/* Fototegels */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PRESET_PHOTOS.map((p) => {
            const isSelected = photos.includes(p.url);
            return (
              <div
                key={p.id}
                onClick={() => togglePhoto(p.url)}
                className={`rounded-xl overflow-hidden border-2 cursor-pointer transition-all relative aspect-square group shadow-sm ${
                  isSelected 
                    ? "border-[#dfb25a] ring-2 ring-[#dfb25a]/40 scale-95" 
                    : "border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30"
                }`}
              >
                <img src={p.url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2 text-white">
                  <span className="text-[10px] font-bold leading-tight truncate">{p.title}</span>
                </div>
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#dfb25a] text-black flex items-center justify-center text-xs font-bold shadow-md">
                    ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Patronen & Iconenstijl */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Patroon / Textuur */}
        <div className="bg-[var(--section-bg)] p-6 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-black text-[var(--text)]">3. Patroon of Achtergrondtextuur</h3>
            <p className="text-xs opacity-75 mt-0.5">Voor subtiele achtergronden op visitekaartjes, offertemappen of banners.</p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {PATTERN_OPTIONS.map((pat) => {
              const isSelected = patternUrl === pat.id;
              return (
                <div
                  key={pat.id}
                  onClick={() => updateRules(expression, gaze, lighting, iconStyle, pat.id)}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? "border-[#dfb25a] bg-[#dfb25a]/10 font-black shadow-sm"
                      : "border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 bg-[var(--surface)]"
                  }`}
                >
                  <span className="text-xs font-bold text-[var(--text)] block">{pat.name}</span>
                  <span className="text-[10px] opacity-70 block mt-0.5">{pat.desc}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Iconenstijl: Lijn vs. Vlak */}
        <div className="bg-[var(--section-bg)] p-6 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-black text-[var(--text)]">4. Jouw Iconenstijl</h3>
            <p className="text-xs opacity-75 mt-0.5">Consistentie is heilig: kies óf voor minimalistische lijnen, óf voor stevige vlakken.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => updateRules(expression, gaze, lighting, "lijn", patternUrl)}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                iconStyle === "lijn"
                  ? "border-[#dfb25a] bg-[#dfb25a]/10 font-black shadow-sm"
                  : "border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 bg-[var(--surface)]"
              }`}
            >
              <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center border-2 border-current rounded-lg">
                <span className="w-3 h-3 border border-current rounded-full" />
              </div>
              <span className="text-xs font-bold block text-[var(--text)]">Lijnstijl (Outlined)</span>
              <span className="text-[10px] opacity-70 block mt-0.5">Verfijnd, strak &amp; subtiel</span>
            </button>

            <button
              type="button"
              onClick={() => updateRules(expression, gaze, lighting, "vlak", patternUrl)}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                iconStyle === "vlak"
                  ? "border-[#dfb25a] bg-[#dfb25a]/10 font-black shadow-sm"
                  : "border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 bg-[var(--surface)]"
              }`}
            >
              <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center bg-current text-[var(--surface)] rounded-lg">
                <span className="w-3 h-3 bg-[var(--surface)] rounded-full" />
              </div>
              <span className="text-xs font-bold block text-[var(--text)]">Vlakstijl (Filled)</span>
              <span className="text-[10px] opacity-70 block mt-0.5">Krachtig, direct &amp; opvallend</span>
            </button>
          </div>
        </div>

      </div>

      {/* Navigatie Knoppen */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-black/10 dark:border-white/10">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-black/15 dark:border-white/15 text-xs font-bold"
        >
          ← Terug naar Typografie
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!isReady}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#dfb25a] to-[#f7d57f] text-black font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          <span>Naar Stap 6: Huisstijldocument &amp; Brand Reveal</span>
          <span>→</span>
        </button>
      </div>

    </div>
  );
}
