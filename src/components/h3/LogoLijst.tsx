"use client";

import React, { useState } from "react";
import { LogoLijstData, LogoType } from "./types";
import { 
  Sparkles, 
  Plus, 
  X, 
  Check, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldAlert, 
  CheckCircle2, 
  Layers,
  Shapes,
  Type,
  FileBadge2,
  Smile,
  Compass
} from "lucide-react";

interface LogoLijstProps {
  data: LogoLijstData;
  companyName: string;
  onChange: (updated: LogoLijstData) => void;
  onNext: () => void;
}

interface LogoTypeInfo {
  type: LogoType;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ReactNode;
  example: string;
}

export const LOGO_TYPES: LogoTypeInfo[] = [
  {
    type: "beeldmerk",
    title: "Beeldmerk",
    subtitle: "Puur symbool of icoon",
    desc: "Alleen een herkenbaar krachtig icoon, zonder tekst. Vraagt een sterke associatie.",
    icon: <Shapes className="w-5 h-5 text-amber-400" />,
    example: "Bv. Apple, Nike Swoosh, Twitter-vogel",
  },
  {
    type: "lettermerk",
    title: "Lettermerk",
    subtitle: "Monogram / Initialen",
    desc: "De initialen van jouw bedrijfsnaam in een krachtige, unieke typografische stijl.",
    icon: <Type className="w-5 h-5 text-blue-400" />,
    example: "Bv. IBM, NASA, HBO, Louis Vuitton",
  },
  {
    type: "woordmerk",
    title: "Woordmerk",
    subtitle: "Typografische naam",
    desc: "Alleen jouw volledige naam gezet in een opvallend en herkenbaar lettertype.",
    icon: <span className="font-serif font-black text-emerald-400 text-sm">Aa</span>,
    example: "Bv. Google, Coca-Cola, Philips, Visa",
  },
  {
    type: "combinatiemerk",
    title: "Combinatiemerk",
    subtitle: "Icoon + Bedrijfsnaam",
    desc: "De gouden standaard voor starters: een herkenbaar beeldmerk gecombineerd met je naam.",
    icon: <Layers className="w-5 h-5 text-purple-400" />,
    example: "Bv. Burger King, Lacoste, Puma, Adidas",
  },
  {
    type: "embleem",
    title: "Embleem",
    subtitle: "Badge, zegel of schild",
    desc: "Tekst en illustratie gevangen in een strakke badge of authentiek keurmerk.",
    icon: <FileBadge2 className="w-5 h-5 text-[#dfb25a]" />,
    example: "Bv. Starbucks, Harley-Davidson, Porsche",
  },
  {
    type: "abstract",
    title: "Abstract merk",
    subtitle: "Geometrisch & conceptueel",
    desc: "Geen letterlijk plaatje, maar een abstracte vorm die dynamiek of betrouwbaarheid ademt.",
    icon: <Compass className="w-5 h-5 text-cyan-400" />,
    example: "Bv. Airbnb, Pepsi, Audi, Spotify",
  },
  {
    type: "mascotte",
    title: "Mascotte",
    subtitle: "Geïllustreerd karakter",
    desc: "Een getekend figuur of karakter dat sympathie, humor of ambacht uitstraalt.",
    icon: <Smile className="w-5 h-5 text-rose-400" />,
    example: "Bv. Michelin mannetje, KFC Kolonel, Café De Beer",
  },
];

const SUGGESTED_WEL = [
  "Ambachtelijk gereedschap",
  "Natuur / Blad",
  "Schild / Veiligheid",
  "Minimalistisch monogram",
  "Geometrische lijnen",
  "Ster / Kompas",
  "Vlam / Energie",
  "Pijl / Groei",
  "Dierenfiguur",
  "Architectonisch",
];

const SUGGESTED_NIET = [
  "Geen lachend stripfiguurtje",
  "Geen standaard gloeilamp",
  "Geen krullerige tierelantijntjes",
  "Geen standaard wereldbol",
  "Geen puzzelstukjes",
  "Geen te dunne lijntjes",
  "Geen cliché handdruk",
  "Geen complexe 3D effecten",
];

export function LogoLijst({ data, companyName, onChange, onNext }: LogoLijstProps) {
  const [welInput, setWelInput] = useState("");
  const [nietInput, setNietInput] = useState("");
  const [showCafeDeBeer, setShowCafeDeBeer] = useState(false);

  const addWelTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed || data.welTags.includes(trimmed)) return;
    onChange({
      ...data,
      welTags: [...data.welTags, trimmed],
    });
    setWelInput("");
  };

  const removeWelTag = (tagToRemove: string) => {
    onChange({
      ...data,
      welTags: data.welTags.filter((t) => t !== tagToRemove),
    });
  };

  const addNietTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed || data.nietTags.includes(trimmed)) return;
    onChange({
      ...data,
      nietTags: [...data.nietTags, trimmed],
    });
    setNietInput("");
  };

  const removeNietTag = (tagToRemove: string) => {
    onChange({
      ...data,
      nietTags: data.nietTags.filter((t) => t !== tagToRemove),
    });
  };

  const updateSfeer = (index: number, val: string) => {
    const newSfeer = [...data.sfeerWoorden];
    newSfeer[index] = val;
    onChange({
      ...data,
      sfeerWoorden: newSfeer,
    });
  };

  const selectPreferredType = (type: LogoType) => {
    onChange({
      ...data,
      preferredType: data.preferredType === type ? "" : type,
    });
  };

  const isComplete = data.welTags.length >= 1 && data.nietTags.length >= 1;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Introductie & Kop */}
      <div className="bg-gradient-to-r from-[#2a170b] to-[#160b06] border-2 border-[#dfb25a]/40 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#dfb25a]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#dfb25a]">
                Stap 1 • Hoofdstuk 3: De Visuele Identiteit
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Jouw LIJST: Wat WEL en wat NIET in je logo?
            </h1>
            <p className="text-white/80 text-sm mt-1 max-w-2xl">
              Voor {companyName ? <strong className="text-[#dfb25a]">{companyName}</strong> : "jouw onderneming"}. 
              Voordat je met AI of een ontwerper aan de slag gaat, leg je eerst de grenzen vast.
              Kleur laten we nog bewust even weg: we focussen puur op de symbolen en sfeer.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCafeDeBeer(!showCafeDeBeer)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold transition-all text-[#dfb25a]"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{showCafeDeBeer ? "Verberg Café De Beer" : "Voorbeeld Café De Beer"}</span>
            {showCafeDeBeer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Uitklapbaar voorbeeld van Café De Beer uit het boek */}
        {showCafeDeBeer && (
          <div className="mt-5 pt-4 border-t border-white/15 text-xs text-white/90 grid sm:grid-cols-3 gap-4 bg-black/40 p-4 rounded-xl">
            <div>
              <span className="font-bold text-[#dfb25a] block mb-1">✓ WEL in het logo:</span>
              <p className="opacity-90 leading-relaxed">
                Een woeste berenkop, houten textuur, bierschuim, klauwen.
              </p>
            </div>
            <div>
              <span className="font-bold text-rose-400 block mb-1">✗ NIET in het logo:</span>
              <p className="opacity-90 leading-relaxed">
                Geen lachende stripfiguur-beer, geen theekopjes, geen krulletters.
              </p>
            </div>
            <div>
              <span className="font-bold text-amber-300 block mb-1">🎭 3 Sfeerwoorden:</span>
              <p className="opacity-90 leading-relaxed">
                Stoer, ambachtelijk, nuchter gezellig.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Sectie 1: De 7 Logotypes verkennen */}
      <div className="bg-[var(--section-bg)] p-6 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-black text-[var(--text)] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#dfb25a]" />
            1. Kies eventueel je voorkeurs-logotype (of verken ze straks allemaal)
          </h2>
          <p className="text-xs opacity-75 mt-0.5">
            Elk type heeft een eigen psychologische werking. In stap 2 genereert de tool automatisch alle 7 types zwart-op-wit voor je.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {LOGO_TYPES.map((lt) => {
            const isSelected = data.preferredType === lt.type;
            return (
              <button
                key={lt.type}
                type="button"
                onClick={() => selectPreferredType(lt.type)}
                className={`text-left p-4 rounded-xl border-2 transition-all flex flex-col justify-between relative group ${
                  isSelected
                    ? "border-[#dfb25a] bg-[#dfb25a]/10 shadow-md ring-2 ring-[#dfb25a]/30"
                    : "border-black/10 dark:border-white/10 hover:border-[#dfb25a]/50 bg-black/5 dark:bg-white/5"
                }`}
              >
                {isSelected && (
                  <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#dfb25a] text-black flex items-center justify-center text-xs font-bold">
                    ✓
                  </span>
                )}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-black/10 dark:bg-white/10">
                      {lt.icon}
                    </div>
                    <span className="font-extrabold text-sm text-[var(--text)]">{lt.title}</span>
                  </div>
                  <p className="text-[11px] font-medium text-[#dfb25a] mb-1.5">{lt.subtitle}</p>
                  <p className="text-xs opacity-80 leading-relaxed mb-3">{lt.desc}</p>
                </div>
                <div className="pt-2 border-t border-black/5 dark:border-white/10 text-[10px] opacity-70 italic">
                  {lt.example}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sectie 2: De WEL en NIET lijsten */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* WEL Kaart */}
        <div className="bg-[var(--section-bg)] p-6 rounded-2xl border-2 border-emerald-500/30 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs">
                ✓
              </span>
              <h3 className="text-base font-black text-[var(--text)]">
                Wat wil je WEL terugzien?
              </h3>
            </div>
            <p className="text-xs opacity-75 mb-3 leading-relaxed">
              Denk aan symbolen, objecten, gereedschap, natuur, architectuur of vormen die passen bij jouw vak en passie.
            </p>

            {/* Invoerveld */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={welInput}
                onChange={(e) => setWelInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addWelTag(welInput);
                  }
                }}
                placeholder="Bv. kompas, klauw, berg, minimalistisch..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-[var(--surface)] text-sm focus:border-emerald-500 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => addWelTag(welInput)}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-all"
              >
                <Plus className="w-4 h-4" /> Voeg toe
              </button>
            </div>

            {/* Gekozen WEL tags */}
            <div className="min-h-[50px] p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-dashed border-emerald-500/40 flex flex-wrap gap-1.5 items-center">
              {data.welTags.length === 0 ? (
                <span className="text-xs opacity-50 italic">Nog geen WEL-elementen toegevoegd...</span>
              ) : (
                data.welTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/40 text-xs font-bold"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeWelTag(tag)}
                      className="hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Suggesties */}
          <div className="pt-3 border-t border-black/5 dark:border-white/5">
            <span className="text-[11px] font-bold opacity-70 block mb-1.5">Snelle suggesties:</span>
            <div className="flex flex-wrap gap-1">
              {SUGGESTED_WEL.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => addWelTag(sug)}
                  disabled={data.welTags.includes(sug)}
                  className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/5 dark:bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-500 transition-all border border-black/5 dark:border-white/5 disabled:opacity-30"
                >
                  + {sug}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* NIET Kaart */}
        <div className="bg-[var(--section-bg)] p-6 rounded-2xl border-2 border-rose-500/30 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center font-bold text-xs">
                ✗
              </span>
              <h3 className="text-base font-black text-[var(--text)]">
                Wat mag er absoluut NIET in?
              </h3>
            </div>
            <p className="text-xs opacity-75 mb-3 leading-relaxed">
              Jouw no-go zone. Welke clichés, overgebruikte symbolen of stijlen wil je koste wat kost vermijden?
            </p>

            {/* Invoerveld */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={nietInput}
                onChange={(e) => setNietInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addNietTag(nietInput);
                  }
                }}
                placeholder="Bv. geen kroontje, geen poppetje, geen krullen..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-[var(--surface)] text-sm focus:border-rose-500 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => addNietTag(nietInput)}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-all"
              >
                <Plus className="w-4 h-4" /> Voeg toe
              </button>
            </div>

            {/* Gekozen NIET tags */}
            <div className="min-h-[50px] p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-dashed border-rose-500/40 flex flex-wrap gap-1.5 items-center">
              {data.nietTags.length === 0 ? (
                <span className="text-xs opacity-50 italic">Nog geen No-Go elementen toegevoegd...</span>
              ) : (
                data.nietTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/40 text-xs font-bold"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeNietTag(tag)}
                      className="hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Suggesties */}
          <div className="pt-3 border-t border-black/5 dark:border-white/5">
            <span className="text-[11px] font-bold opacity-70 block mb-1.5">Veelvoorkomende valkuilen:</span>
            <div className="flex flex-wrap gap-1">
              {SUGGESTED_NIET.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => addNietTag(sug)}
                  disabled={data.nietTags.includes(sug)}
                  className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/5 dark:bg-white/5 hover:bg-rose-500/20 hover:text-rose-500 transition-all border border-black/5 dark:border-white/5 disabled:opacity-30"
                >
                  + {sug}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Sectie 3: Sfeer in 3 woorden */}
      <div className="bg-[var(--section-bg)] p-6 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-black text-[var(--text)] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#dfb25a]" />
            3. De sfeer in drie woorden
          </h3>
          <p className="text-xs opacity-75 mt-0.5">
            Welke drie kernwoorden omschrijven de uitstraling van jouw onderneming? (Bv. *nuchter, betrouwbaar, premium* of *stoer, snel, ambachtelijk*)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[0, 1, 2].map((idx) => (
            <div key={idx} className="relative">
              <span className="absolute left-3.5 top-3 text-xs font-bold opacity-40">#{idx + 1}</span>
              <input
                type="text"
                value={data.sfeerWoorden[idx] || ""}
                onChange={(e) => updateSfeer(idx, e.target.value)}
                placeholder={idx === 0 ? "Bv. Nuchter" : idx === 1 ? "Bv. Ambachtelijk" : "Bv. Betrouwbaar"}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-[var(--surface)] text-sm font-medium focus:border-[#dfb25a] outline-none transition-all"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Afsluiting & Doorgang naar Stap 2 */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-black/10 dark:border-white/10">
        <div className="text-xs text-[var(--text)] opacity-75">
          {isComplete ? (
            <span className="text-emerald-500 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Jouw LIJST is compleet en klaar voor de logo generator!
            </span>
          ) : (
            <span>Vul minimaal 1 WEL-element en 1 NIET-element in om verder te gaan.</span>
          )}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={!isComplete}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#dfb25a] to-[#f7d57f] text-black font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          <span>Naar Stap 2: Logo Generator (Zwart-wit)</span>
          <span>→</span>
        </button>
      </div>

    </div>
  );
}
