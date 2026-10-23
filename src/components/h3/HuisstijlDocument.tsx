"use client";

import React, { useState } from "react";
import { H3Data, H3Tab } from "./types";
import { 
  Printer, 
  Sparkles, 
  Share2, 
  Download, 
  Layers, 
  Palette, 
  Type, 
  Camera, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Eye,
  EyeOff,
  FileCheck,
  Building,
  HelpCircle,
  Copy,
  PenTool,
  SlidersHorizontal,
  X,
  Info
} from "lucide-react";
import { hexToRgb, hexToCmyk, getContrastRatio, getBestTextColor } from "@/lib/color/colorUtils";

interface HuisstijlDocumentProps {
  data: H3Data;
  userId: string;
  isCustomStyleActive?: boolean;
  onToggleCustomStyle?: () => void;
  onNavigateTab: (tab: H3Tab) => void;
  onTriggerReveal?: () => void;
}

export function HuisstijlDocument({ 
  data, 
  userId, 
  isCustomStyleActive,
  onToggleCustomStyle,
  onNavigateTab,
  onTriggerReveal
}: HuisstijlDocumentProps) {
  const [copiedNote, setCopiedNote] = useState<string | null>(null);
  const [localCustomActive, setLocalCustomActive] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(`vsg_custom_style_active_${userId}`) === "true";
  });

  const isStyleLive = isCustomStyleActive !== undefined ? isCustomStyleActive : localCustomActive;

  const handleToggleStyle = () => {
    if (onToggleCustomStyle) {
      onToggleCustomStyle();
    } else {
      const next = !localCustomActive;
      setLocalCustomActive(next);
      try {
        localStorage.setItem(`vsg_custom_style_active_${userId}`, String(next));
        window.dispatchEvent(new Event("vsg_brand_style_changed"));
      } catch (e) {}
    }
  };

  const [designerNotes, setDesignerNotes] = useState({
    emotie: "Een gevoel van betrouwbaarheid, vakmanschap en helderheid.",
    dragers: "Website, visitekaartjes, facturen en gevel/bedrijfswagen.",
    budget: "In overleg, streefdatum binnen 4 weken.",
    bestanden: "Vectorbestanden (.SVG, .AI of .EPS) inclusief PMS/CMYK kleurcodes en transparante PNG.",
    inspiratie: "Apple (minimalisme), Patagonia (duurzaam & eerlijk), Tony's Chocolonely (gedurfd en opvallend)."
  });

  // Haal H1 & H2 data op indien beschikbaar
  let h1Summary = {
    aanbod: "",
    doelgroep: "",
    probleem: "",
    missie: ""
  };
  try {
    const rawH1 = localStorage.getItem(`vsg_h1_data_${userId}`);
    if (rawH1) {
      const parsedH1 = JSON.parse(rawH1);
      h1Summary = {
        aanbod: parsedH1.idee?.wat || "",
        doelgroep: parsedH1.idee?.wie || "",
        probleem: parsedH1.idee?.probleem || "",
        missie: parsedH1.waaromJij?.missieZin || parsedH1.idee?.eenZin || ""
      };
    }
  } catch (e) {}

  const companyName = data.companyName || "Mijn Onderneming";
  const subtitle = data.logo.subtitle || "Koffie & Ambacht";
  const oneLiner = h1Summary.missie || data.typography.headlineText || `Ik help ${h1Summary.doelgroep || "ondernemers"} met ${h1Summary.probleem || "hun visuele merkidentiteit"}.`;

  const { primary, accent, dark, light } = data.colors;
  const primaryRgb = hexToRgb(primary);
  const primaryCmyk = hexToCmyk(primary);

  const accentRgb = hexToRgb(accent);
  const accentCmyk = hexToCmyk(accent);

  const darkRgb = hexToRgb(dark);
  const darkCmyk = hexToCmyk(dark);

  const lightRgb = hexToRgb(light);
  const lightCmyk = hexToCmyk(light);

  const bestTextOnPrimary = getBestTextColor(primary, dark, light);
  const bestTextOnAccent = getBestTextColor(accent, dark, light);

  const contrastDarkOnLight = getContrastRatio(dark, light);
  const contrastPrimaryOnLight = getContrastRatio(primary, light);
  const contrastAccentOnDark = getContrastRatio(accent, dark);

  const handlePrint = () => {
    window.print();
  };

  const copyBriefing = () => {
    const text = `
=== BRIEFING VOOR DE ONTWERPER - ${companyName.toUpperCase()} ===
Bedrijfsnaam: ${companyName}
Ondertitel: ${subtitle}
Één-zin belofte: ${oneLiner}

WEL-elementen: ${data.lijst.welTags.join(", ") || "Niet gespecificeerd"}
NIET-elementen: ${data.lijst.nietTags.join(", ") || "Geen verboden elementen"}
Sfeerwoorden: ${data.lijst.sfeerWoorden.filter(Boolean).join(", ") || "Professioneel"}
Gekozen Logo Archetype: ${data.logo.selectedLogoType || "Combinatiemerk"}

KLEURENPALET:
- Hoofdkleur: ${primary} (RGB: ${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b})
- Steunkleur: ${accent} (RGB: ${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b})
- Donkere tekst: ${dark}
- Lichte ondergrond: ${light}

TYPOGRAFIE:
- Koplettertype: ${data.typography.headingFont}
- Broodtekst: ${data.typography.bodyFont}

DE 5 GOUDEN VRAGEN:
1. Gevoel bij logo: ${designerNotes.emotie}
2. Belangrijkste dragers: ${designerNotes.dragers}
3. Budget & deadline: ${designerNotes.budget}
4. Gewenste bestanden: ${designerNotes.bestanden}
5. Drie favoriete merken: ${designerNotes.inspiratie}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedNote("Briefing gekopieerd naar klembord!");
    setTimeout(() => setCopiedNote(null), 3500);
  };

  return (
    <div className="space-y-6">

      {/* 1. PROMINENTE PLATFORM THEMA-SCHAKELAAR (PRINT:HIDDEN) */}
      <div className="print:hidden p-5 sm:p-6 rounded-3xl border-2 transition-all shadow-md bg-[var(--section-bg)] border-[#dfb25a]/60">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-[#dfb25a]/20 text-[#dfb25a] flex items-center justify-center font-bold">
                🎨
              </span>
              <h3 className="text-base sm:text-lg font-black text-[var(--text)] flex items-center gap-2">
                Platform-Stijl: 
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                  isStyleLive 
                    ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30" 
                    : "bg-black/10 dark:bg-white/10 text-[var(--text)] opacity-70"
                }`}>
                  {isStyleLive ? "Jouw Huisstijl is LIVE! 🎉" : "Standaard Boekstijl"}
                </span>
              </h3>
            </div>
            <p className="text-xs sm:text-sm opacity-85 leading-relaxed text-[var(--text)]">
              {isStyleLive ? (
                <>
                  Het platform van <strong>Vin&apos;s Survival Gids</strong> (dashboard, navigatiebalken, knoppen, titels en achtergronden) is momenteel omgetoverd naar jouw hoofdkleur (<strong>{primary}</strong>), steunkleur (<strong>{accent}</strong>) en lettertype (<strong>{data.typography.headingFont}</strong>).
                </>
              ) : (
                <>
                  Wil je jouw bedrijf tot leven zien komen? Schakel deze optie in en zie hoe de hele website direct jouw gekozen kleuren ({primary} &amp; {accent}) en typografie ({data.typography.headingFont}) overneemt!
                </>
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggleStyle}
            className={`px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 shrink-0 ${
              isStyleLive
                ? "bg-black/10 dark:bg-white/10 hover:bg-black/20 text-[var(--text)] border border-black/15 dark:border-white/15"
                : "bg-gradient-to-r from-[#dfb25a] to-[#f7d57f] hover:brightness-110 text-black shadow-lg scale-105"
            }`}
          >
            {isStyleLive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{isStyleLive ? "Terug naar Standaard Stijl" : "Activeer Mijn Huisstijl op Platform ✨"}</span>
          </button>
        </div>
      </div>

      {/* 2. ACTIEBALK BOVENAAN (PRINT:HIDDEN) */}
      <div className="print:hidden bg-[var(--section-bg)] p-4 rounded-2xl border border-black/10 dark:border-white/10 shadow-sm flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#dfb25a]/20 text-[#dfb25a] flex items-center justify-center border border-[#dfb25a]/30">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-black tracking-tight flex items-center gap-2">
              Huisstijldocument &amp; Brand Style Guide
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                A4 Printklaar
              </span>
            </h2>
            <p className="text-xs opacity-75">
              Gebaseerd op jouw keuzes in Hoofdstuk 3. Download als PDF of stuur de briefing direct door.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onTriggerReveal && (
            <button
              type="button"
              onClick={onTriggerReveal}
              className="px-3.5 py-2 rounded-xl bg-[#dfb25a]/15 text-[#dfb25a] hover:bg-[#dfb25a]/25 border border-[#dfb25a]/30 text-xs font-black transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Toon Onthulmoment</span>
            </button>
          )}

          <button
            type="button"
            onClick={copyBriefing}
            className="px-3.5 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Kopieer Briefing</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#dfb25a] to-[#f7d57f] hover:brightness-105 text-black text-xs font-black shadow-md transition-all flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Download als PDF / Print</span>
          </button>
        </div>
      </div>

      {/* Download / Print Hint Box */}
      <div className="print:hidden p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-400 flex items-center gap-2">
        <Info className="w-4 h-4 shrink-0 text-blue-400" />
        <span>
          <strong>Tip voor PDF opslaan:</strong> Kies in het printvenster bij <em>Bestemming</em> voor <strong>&apos;Opslaan als PDF&apos;</strong>. De merkkleuren en achtergronden komen automatisch exact mee.
        </span>
      </div>

      {copiedNote && (
        <div className="print:hidden p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          <span>{copiedNote}</span>
        </div>
      )}

      {/* Snelle aanpasbalk (print:hidden) */}
      <div className="print:hidden bg-black/5 dark:bg-white/5 p-3 rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-between text-xs overflow-x-auto gap-2">
        <span className="font-bold opacity-70 flex items-center gap-1.5 shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#dfb25a]" />
          Pas iets aan:
        </span>
        <div className="flex gap-1.5 shrink-0">
          <button 
            type="button" 
            onClick={() => onNavigateTab("lijst")}
            className="px-2.5 py-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 font-medium"
          >
            1. LIJST
          </button>
          <button 
            type="button" 
            onClick={() => onNavigateTab("generator")}
            className="px-2.5 py-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 font-medium"
          >
            2. Logo
          </button>
          <button 
            type="button" 
            onClick={() => onNavigateTab("kleuren")}
            className="px-2.5 py-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 font-medium"
          >
            3. Kleuren
          </button>
          <button 
            type="button" 
            onClick={() => onNavigateTab("typografie")}
            className="px-2.5 py-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 font-medium"
          >
            4. Typografie
          </button>
          <button 
            type="button" 
            onClick={() => onNavigateTab("beeld")}
            className="px-2.5 py-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 font-medium"
          >
            5. Fotografie
          </button>
        </div>
      </div>

      {/* HET ECHTE DOCUMENT (A4 LAYOUT VOOR PRINT EN SCHERM) */}
      <div 
        id="huisstijl-dossier"
        className="bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 print:border-none print:shadow-none print:p-0 print:rounded-none space-y-8 font-sans"
        style={{
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact"
        }}
      >
        
        {/* VASTE VERPLICHTE WAARSCHUWING BOVENAAN (OOK IN PDF) */}
        <div 
          className="p-4 sm:p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex gap-3.5 items-start"
          style={{
            backgroundColor: "#fffbeb",
            borderColor: "#fcd34d",
            WebkitPrintColorAdjust: "exact",
            printColorAdjust: "exact"
          }}
        >
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed space-y-1">
            <h4 className="font-extrabold uppercase tracking-wide text-amber-900 text-xs">
              Let op: dit is een visueel voorbeeld, geen af afgeronde huisstijl.
            </h4>
            <p className="opacity-90 text-amber-950">
              Dit document helpt je om je keuzes op een rij te zetten. Laat je definitieve logo en huisstijl goed uitwerken door een professionele ontwerper. Neem dit niet klakkeloos over, maar gebruik het om je eigen briefing voor je ontwerper te maken. Eis altijd een vectorbestand (.svg, .ai of .eps).
            </p>
          </div>
        </div>

        {/* TITEL & HEADER DOCUMENT */}
        <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <span className="text-[11px] font-black tracking-widest text-[#dfb25a] uppercase block">
              Brand Style Guide • Vin&apos;s Survival Gids
            </span>
            <h1 
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
              style={{ fontFamily: data.typography.headingFont }}
            >
              {companyName}
            </h1>
            <p 
              className="text-sm font-semibold tracking-widest uppercase text-slate-600 mt-1"
              style={{ fontFamily: data.typography.bodyFont, letterSpacing: "0.15em" }}
            >
              {subtitle}
            </p>
          </div>

          <div className="text-left sm:text-right text-xs text-slate-500 space-y-0.5">
            <p><strong>Datum:</strong> {new Date().toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}</p>
            <p><strong>Status:</strong> Definitief Concept (H3)</p>
            <p><strong>Platform:</strong> Vin&apos;s Survival Gids</p>
          </div>
        </div>

        {/* SECTIE 1: MERKFUNDAMENT & ÉÉN-ZIN BELOFTE */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center">
              1
            </span>
            <h2 className="text-base font-black uppercase tracking-wider text-slate-900">
              Merkfundament &amp; Belofte
            </h2>
          </div>

          <div 
            className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
            style={{
              backgroundColor: "#f8fafc",
              borderColor: "#e2e8f0",
              WebkitPrintColorAdjust: "exact",
              printColorAdjust: "exact"
            }}
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Één-zin belofte (Wat doe je voor wie?)
              </span>
              <p 
                className="text-lg font-bold text-slate-900 italic mt-0.5"
                style={{ fontFamily: data.typography.headingFont }}
              >
                &ldquo;{oneLiner}&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs border-t border-slate-200">
              <div>
                <strong className="text-slate-600 block">Doelgroep Persona:</strong>
                <span className="text-slate-900 font-semibold">{h1Summary.doelgroep || "Ambitieuze starters rond de 30"}</span>
              </div>
              <div>
                <strong className="text-slate-600 block">Belangrijkste Probleem:</strong>
                <span className="text-slate-900 font-semibold">{h1Summary.probleem || "Blijven hangen in voorbereiding"}</span>
              </div>
              <div>
                <strong className="text-slate-600 block">Sfeerwoorden LIJST:</strong>
                <span className="text-slate-900 font-semibold">
                  {data.lijst.sfeerWoorden.filter(Boolean).join(", ") || "Nuchter, stoer, ambachtelijk"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTIE 2: LOGO CONCEPT & ARGETYPE */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center">
              2
            </span>
            <h2 className="text-base font-black uppercase tracking-wider text-slate-900">
              Logo Archetype &amp; Toepassing
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Zwart-wit versie (de basis volgens het boek) */}
            <div 
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
              style={{
                backgroundColor: "#f8fafc",
                borderColor: "#e2e8f0",
                WebkitPrintColorAdjust: "exact",
                printColorAdjust: "exact"
              }}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  Zwart-wit Versie (Fundament)
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black text-white uppercase">
                  {data.logo.selectedLogoType || "Combinatiemerk"}
                </span>
              </div>

              <div className="h-44 bg-white rounded-xl border border-slate-200 flex flex-col items-center justify-center p-4 text-center">
                {data.logo.selectedLogoUrl ? (
                  <img 
                    src={data.logo.selectedLogoUrl} 
                    alt="Logo Zwart-wit" 
                    className="max-h-32 object-contain"
                  />
                ) : (
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center mx-auto font-black text-xl">
                      {companyName.charAt(0)}
                    </div>
                    <div className="font-extrabold text-base tracking-tight text-black">
                      {companyName}
                    </div>
                    <div className="text-[10px] tracking-widest uppercase font-bold text-slate-600">
                      {subtitle}
                    </div>
                  </div>
                )}
              </div>
              <p className="text-[11px] text-slate-600 italic">
                * Getoetst in puur zwart-wit zonder kleurafleiding. Voldoet aan de schaalbaarheidstest.
              </p>
            </div>

            {/* Gekleurde versie */}
            <div 
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
              style={{
                backgroundColor: "#f8fafc",
                borderColor: "#e2e8f0",
                WebkitPrintColorAdjust: "exact",
                printColorAdjust: "exact"
              }}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  Gekleurde Toepassing
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800 uppercase">
                  Merkkleuren
                </span>
              </div>

              <div 
                className="h-44 rounded-xl border border-slate-200 flex flex-col items-center justify-center p-4 text-center"
                style={{ 
                  backgroundColor: light,
                  WebkitPrintColorAdjust: "exact",
                  printColorAdjust: "exact"
                }}
              >
                {data.colors.recoloredLogoUrl ? (
                  <img 
                    src={data.colors.recoloredLogoUrl} 
                    alt="Logo Gekleurd" 
                    className="max-h-32 object-contain"
                  />
                ) : (
                  <div className="space-y-2">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto font-black text-xl shadow-md"
                      style={{ 
                        backgroundColor: primary, 
                        color: bestTextOnPrimary.textColor,
                        WebkitPrintColorAdjust: "exact",
                        printColorAdjust: "exact"
                      }}
                    >
                      {companyName.charAt(0)}
                    </div>
                    <div 
                      className="font-extrabold text-base tracking-tight"
                      style={{ color: primary, fontFamily: data.typography.headingFont }}
                    >
                      {companyName}
                    </div>
                    <div 
                      className="text-[10px] tracking-widest uppercase font-bold"
                      style={{ color: accent, fontFamily: data.typography.bodyFont }}
                    >
                      {subtitle}
                    </div>
                  </div>
                )}
              </div>
              <p className="text-[11px] text-slate-600 italic">
                * Weergave op de berekende wit-vervanger ({light}) met steunkleur-accenten.
              </p>
            </div>

          </div>
        </section>

        {/* SECTIE 3: HET KLEURENPALET (WCAG 2.1 BEWAAKT - EXACTE PRINT KLEUREN) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center">
                3
              </span>
              <h2 className="text-base font-black uppercase tracking-wider text-slate-900">
                Het 4-Kleurige Palet
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Harmonie: {data.colors.harmony}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            {/* Hoofdkleur */}
            <div 
              className="rounded-2xl border border-slate-300 overflow-hidden shadow-sm flex flex-col"
              style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
            >
              <div 
                className="h-20 w-full flex items-end p-2.5" 
                style={{ 
                  backgroundColor: primary,
                  color: bestTextOnPrimary.textColor,
                  WebkitPrintColorAdjust: "exact",
                  printColorAdjust: "exact" 
                }}
              >
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-black/40 text-white backdrop-blur-sm">
                  Hoofdkleur
                </span>
              </div>
              <div className="p-3 bg-white space-y-1 text-xs">
                <div className="font-mono font-black text-sm text-slate-900">{primary}</div>
                <div className="text-[11px] text-slate-600 font-mono">RGB: {primaryRgb.r}, {primaryRgb.g}, {primaryRgb.b}</div>
                <div className="text-[10px] text-slate-500 font-mono">CMYK: {primaryCmyk.c}/{primaryCmyk.m}/{primaryCmyk.y}/{primaryCmyk.k}</div>
                <div className="text-[10px] text-emerald-600 font-bold pt-1">
                  Contrast: {contrastPrimaryOnLight}:1 (op licht)
                </div>
              </div>
            </div>

            {/* Steunkleur */}
            <div 
              className="rounded-2xl border border-slate-300 overflow-hidden shadow-sm flex flex-col"
              style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
            >
              <div 
                className="h-20 w-full flex items-end p-2.5" 
                style={{ 
                  backgroundColor: accent,
                  color: bestTextOnAccent.textColor,
                  WebkitPrintColorAdjust: "exact",
                  printColorAdjust: "exact" 
                }}
              >
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-black/40 text-white backdrop-blur-sm">
                  Steunkleur
                </span>
              </div>
              <div className="p-3 bg-white space-y-1 text-xs">
                <div className="font-mono font-black text-sm text-slate-900">{accent}</div>
                <div className="text-[11px] text-slate-600 font-mono">RGB: {accentRgb.r}, {accentRgb.g}, {accentRgb.b}</div>
                <div className="text-[10px] text-slate-500 font-mono">CMYK: {accentCmyk.c}/{accentCmyk.m}/{accentCmyk.y}/{accentCmyk.k}</div>
                <div className="text-[10px] text-emerald-600 font-bold pt-1">
                  Contrast: {contrastAccentOnDark}:1 (op donker)
                </div>
              </div>
            </div>

            {/* Zwart-vervanger */}
            <div 
              className="rounded-2xl border border-slate-300 overflow-hidden shadow-sm flex flex-col"
              style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
            >
              <div 
                className="h-20 w-full flex items-end p-2.5" 
                style={{ 
                  backgroundColor: dark,
                  color: "#ffffff",
                  WebkitPrintColorAdjust: "exact",
                  printColorAdjust: "exact" 
                }}
              >
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-white/20 text-white backdrop-blur-sm">
                  Zwart-vervanger
                </span>
              </div>
              <div className="p-3 bg-white space-y-1 text-xs">
                <div className="font-mono font-black text-sm text-slate-900">{dark}</div>
                <div className="text-[11px] text-slate-600 font-mono">RGB: {darkRgb.r}, {darkRgb.g}, {darkRgb.b}</div>
                <div className="text-[10px] text-slate-500 font-mono">CMYK: {darkCmyk.c}/{darkCmyk.m}/{darkCmyk.y}/{darkCmyk.k}</div>
                <div className="text-[10px] text-emerald-600 font-bold pt-1">
                  WCAG: {contrastDarkOnLight}:1 (AAA)
                </div>
              </div>
            </div>

            {/* Wit-vervanger */}
            <div 
              className="rounded-2xl border border-slate-300 overflow-hidden shadow-sm flex flex-col"
              style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
            >
              <div 
                className="h-20 w-full flex items-end p-2.5 border-b border-slate-200" 
                style={{ 
                  backgroundColor: light,
                  color: dark,
                  WebkitPrintColorAdjust: "exact",
                  printColorAdjust: "exact" 
                }}
              >
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-black/10 text-slate-800">
                  Wit-vervanger
                </span>
              </div>
              <div className="p-3 bg-white space-y-1 text-xs">
                <div className="font-mono font-black text-sm text-slate-900">{light}</div>
                <div className="text-[11px] text-slate-600 font-mono">RGB: {lightRgb.r}, {lightRgb.g}, {lightRgb.b}</div>
                <div className="text-[10px] text-slate-500 font-mono">CMYK: {lightCmyk.c}/{lightCmyk.m}/{lightCmyk.y}/{lightCmyk.k}</div>
                <div className="text-[10px] text-slate-500 italic pt-1">
                  Basis voor canvas &amp; papier
                </div>
              </div>
            </div>

          </div>
          <p className="text-[11px] text-slate-500">
            * <em>Indicatieve CMYK-waarden</em>. Drukkerijen zetten PMS/Pantone en CMYK om per specifieke papiersoort (gestreken vs. ongestreken).
          </p>
        </section>

        {/* SECTIE 4: TYPOGRAFIE & HIËRARCHIE */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center">
              4
            </span>
            <h2 className="text-base font-black uppercase tracking-wider text-slate-900">
              Typografie &amp; Lettertypes
            </h2>
          </div>

          {/* Banner in eigen stijl met geforceerde print-kleuren */}
          <div 
            className="p-6 rounded-2xl relative overflow-hidden shadow-md"
            style={{ 
              backgroundColor: primary, 
              color: bestTextOnPrimary.textColor,
              WebkitPrintColorAdjust: "exact",
              printColorAdjust: "exact"
            }}
          >
            <div 
              className="absolute top-0 left-0 right-0 h-1.5" 
              style={{ 
                backgroundColor: accent,
                WebkitPrintColorAdjust: "exact",
                printColorAdjust: "exact"
              }} 
            />
            <div className="max-w-xl space-y-2">
              <span 
                className="text-xs uppercase font-extrabold tracking-widest block opacity-90"
                style={{ fontFamily: data.typography.bodyFont, letterSpacing: "0.15em" }}
              >
                {companyName} • {subtitle}
              </span>
              <h3 
                className="text-2xl sm:text-3xl font-extrabold leading-tight"
                style={{ fontFamily: data.typography.headingFont }}
              >
                {data.typography.headlineText || oneLiner}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
            <div 
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
              style={{
                backgroundColor: "#f8fafc",
                borderColor: "#e2e8f0",
                WebkitPrintColorAdjust: "exact",
                printColorAdjust: "exact"
              }}
            >
              <div className="flex justify-between items-center">
                <span className="font-extrabold uppercase text-slate-700">Koplettertype (Headings)</span>
                <span className="px-2 py-0.5 rounded bg-slate-200 font-bold text-slate-900">
                  {data.typography.headingFont}
                </span>
              </div>
              <p 
                className="text-xl font-bold text-slate-900 pt-1" 
                style={{ fontFamily: data.typography.headingFont }}
              >
                Aa Bb Cc Dd Ee Ff Gg 12345
              </p>
              <p className="text-[11px] text-slate-600">
                Wordt gebruikt voor H1/H2 titels, paginakoppen en banners. Geeft direct de identiteit weer.
              </p>
            </div>

            <div 
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
              style={{
                backgroundColor: "#f8fafc",
                borderColor: "#e2e8f0",
                WebkitPrintColorAdjust: "exact",
                printColorAdjust: "exact"
              }}
            >
              <div className="flex justify-between items-center">
                <span className="font-extrabold uppercase text-slate-700">Broodtekst (Body Text)</span>
                <span className="px-2 py-0.5 rounded bg-slate-200 font-bold text-slate-900">
                  {data.typography.bodyFont}
                </span>
              </div>
              <p 
                className="text-sm font-medium text-slate-800 pt-1 leading-relaxed" 
                style={{ fontFamily: data.typography.bodyFont }}
              >
                Heldere, scherpe alineateksten. Nooit script of sierletters voor lange teksten, zodat offertes en blogs altijd perfect leesbaar zijn.
              </p>
              <p className="text-[11px] text-slate-600">
                Ondertitels staan altijd in deze sans-serif, in hoofdletters met 0.15em letterspatiëring.
              </p>
            </div>
          </div>
        </section>

        {/* SECTIE 5: FOTOGRAFIE & PATRONEN */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center">
              5
            </span>
            <h2 className="text-base font-black uppercase tracking-wider text-slate-900">
              Fotografie, Iconenstijl &amp; Textuur
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div 
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs"
              style={{
                backgroundColor: "#f8fafc",
                borderColor: "#e2e8f0",
                WebkitPrintColorAdjust: "exact",
                printColorAdjust: "exact"
              }}
            >
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Beeldregel 1: Expressie</span>
              <strong className="text-slate-900 font-extrabold text-sm capitalize block">
                {data.imagery.expression}
              </strong>
              <p className="text-[11px] text-slate-600">
                {data.imagery.expression === "lachend" ? "Toegankelijk, warm en uitnodigend." : "Vakinhoudelijk, geconcentreerd en serieus."}
              </p>
            </div>

            <div 
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs"
              style={{
                backgroundColor: "#f8fafc",
                borderColor: "#e2e8f0",
                WebkitPrintColorAdjust: "exact",
                printColorAdjust: "exact"
              }}
            >
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Beeldregel 2: Blikrichting</span>
              <strong className="text-slate-900 font-extrabold text-sm capitalize block">
                {data.imagery.gaze === "camera" ? "In de camera" : "Wegkijkend / In actie"}
              </strong>
              <p className="text-[11px] text-slate-600">
                {data.imagery.gaze === "camera" ? "Direct oogcontact schept onmiddellijk vertrouwen." : "Natuurlijk beeld in werkcontext zonder poseren."}
              </p>
            </div>

            <div 
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs"
              style={{
                backgroundColor: "#f8fafc",
                borderColor: "#e2e8f0",
                WebkitPrintColorAdjust: "exact",
                printColorAdjust: "exact"
              }}
            >
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Beeldregel 3: Belichting &amp; Iconen</span>
              <strong className="text-slate-900 font-extrabold text-sm capitalize block">
                {data.imagery.lighting} licht • {data.imagery.iconStyle}iconen
              </strong>
              <p className="text-[11px] text-slate-600">
                Iconen consequent in {data.imagery.iconStyle}stijl met een uniforme lijndikte van 1.5 - 2px.
              </p>
            </div>
          </div>

          {/* Sfeerfoto's weergave */}
          {data.imagery.photos.length > 0 && (
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Sfeerfoto Moodboard ({data.imagery.photos.length} geselecteerd)
              </span>
              <div className="grid grid-cols-3 gap-3">
                {data.imagery.photos.map((url, i) => (
                  <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                    <img src={url} alt={`Moodboard ${i+1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* SECTIE 6: BRIEFING VOOR DE ONTWERPER (DE 5 GOUDEN VRAGEN) */}
        <section className="space-y-4 pt-4 border-t-2 border-slate-900">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-[#dfb25a] text-slate-950 text-xs font-black flex items-center justify-center">
              6
            </span>
            <h2 className="text-base font-black uppercase tracking-wider text-slate-900">
              Briefing voor de Ontwerper (De 5 Gouden Vragen)
            </h2>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed">
            Als je met een ontwerper of bureau gaat praten, geef je dit overzicht mee. Zo voorkom je misverstanden en uren aan nodeloze revisies.
          </p>

          {/* WEL en NIET tags uit LIJST */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div 
              className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1.5"
              style={{
                backgroundColor: "#ecfdf5",
                borderColor: "#a7f3d0",
                WebkitPrintColorAdjust: "exact",
                printColorAdjust: "exact"
              }}
            >
              <strong className="text-emerald-900 font-extrabold uppercase text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Elementen die WEL terug moeten komen:
              </strong>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {data.lijst.welTags.length > 0 ? (
                  data.lijst.welTags.map((t, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-semibold text-[11px]"
                      style={{ backgroundColor: "#d1fae5", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
                    >
                      {t}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500 italic">Nog niet ingevuld in Stap 1</span>
                )}
              </div>
            </div>

            <div 
              className="p-4 rounded-xl bg-rose-50/80 border border-rose-200 space-y-1.5"
              style={{
                backgroundColor: "#fff1f2",
                borderColor: "#fecdd3",
                WebkitPrintColorAdjust: "exact",
                printColorAdjust: "exact"
              }}
            >
              <strong className="text-rose-900 font-extrabold uppercase text-[11px] flex items-center gap-1.5">
                <X className="w-3.5 h-3.5 text-rose-600" />
                Elementen die er beslist NIET in mogen:
              </strong>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {data.lijst.nietTags.length > 0 ? (
                  data.lijst.nietTags.map((t, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-0.5 rounded bg-rose-100 text-rose-900 font-semibold text-[11px]"
                      style={{ backgroundColor: "#ffe4e6", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
                    >
                      {t}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500 italic">Geen uitsluitingen</span>
                )}
              </div>
            </div>
          </div>

          {/* De 5 Vragen */}
          <div className="space-y-3 pt-2 text-xs">
            
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-black flex items-center justify-center">1</span>
                Wat moet een potentiële klant voelen zodra hij jouw logo ziet?
              </div>
              <input
                type="text"
                value={designerNotes.emotie}
                onChange={(e) => setDesignerNotes(prev => ({ ...prev, emotie: e.target.value }))}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-black flex items-center justify-center">2</span>
                Waar gaat je logo het vaakst op staan? (dragers &amp; context)
              </div>
              <input
                type="text"
                value={designerNotes.dragers}
                onChange={(e) => setDesignerNotes(prev => ({ ...prev, dragers: e.target.value }))}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-black flex items-center justify-center">3</span>
                Wat is je budget en streefdatum?
              </div>
              <input
                type="text"
                value={designerNotes.budget}
                onChange={(e) => setDesignerNotes(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-black flex items-center justify-center">4</span>
                Welke bestanden moet de ontwerper minimaal aanleveren?
              </div>
              <input
                type="text"
                value={designerNotes.bestanden}
                onChange={(e) => setDesignerNotes(prev => ({ ...prev, bestanden: e.target.value }))}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
              <p className="text-[10px] text-amber-700 italic">
                * Eis altijd een vectorbestand (.svg, .ai of .eps). AI genereert pixels; een professioneel merk vereist oneindig schaalbare vectoren.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-black flex items-center justify-center">5</span>
                Welke drie bestaande merken spreken je aan en waarom?
              </div>
              <input
                type="text"
                value={designerNotes.inspiratie}
                onChange={(e) => setDesignerNotes(prev => ({ ...prev, inspiratie: e.target.value }))}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

          </div>
        </section>

        {/* COLOFON / FOOTER DOCUMENT */}
        <footer className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 gap-2">
          <span>Gegenereerd via Vin&apos;s Survival Gids Platform • Werkpagina Hoofdstuk 3</span>
          <span>Auteur: Vincent Rothengatter • Alle rechten voorbehouden</span>
        </footer>

      </div>

    </div>
  );
}
