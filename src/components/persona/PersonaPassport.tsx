"use client";

import React, { useState } from "react";
import { PersonaData } from "./types";
import { AvatarDisplay } from "./AvatarDisplay";
import { 
  CheckCircle, 
  Copy, 
  Download, 
  Share2, 
  Sparkles, 
  ShieldCheck, 
  Globe, 
  Clock, 
  Heart, 
  Home, 
  Briefcase, 
  DollarSign, 
  Lightbulb,
  ExternalLink,
  Printer
} from "lucide-react";

interface PersonaPassportProps {
  persona: PersonaData;
  onEdit?: () => void;
}

export function PersonaPassport({ persona, onEdit }: PersonaPassportProps) {
  const [copied, setCopied] = useState(false);

  // Formatteer labels
  const ageLabels: Record<string, string> = {
    "18-25": "18 - 25 jaar (Jongvolwassen / Starter)",
    "26-40": "26 - 40 jaar (Millennial / Jonge Professional)",
    "41-64": "41 - 64 jaar (Ervaren / Gesetteld)",
    "65+": "65+ jaar (Senior / Gepensioneerd)",
  };

  const incomeLabels: Record<string, string> = {
    "budget": "Laag / Prijsbewust (let op elke euro, snit: casual hoodie)",
    "modaal": "Modaal / Gemiddeld (kwaliteit & nuchter, snit: smart knit)",
    "hoog": "Vermogend / Hoog (premium service & ontzorging, snit: luxe maatpak)",
  };

  const jobLabels: Record<string, string> = {
    "vakman": "Vakman / Bouw / Techniek 🔨",
    "hulpdiensten": "Hulpdiensten (Politie, Brandweer, Ambulance) 🚨",
    "horeca": "Horeca, Toerisme & Gastvrijheid 🍽️",
    "ondernemer": "Ondernemer / Directeur 💼",
    "kantoor": "Kantoor / Bedrijfsleven 🏢",
    "tech": "Tech / IT / Creatief 💻",
    "zorg": "Zorg & Welzijn 🩺",
    "onderwijs": "Onderwijs & Wetenschap 📚",
    "politiek": "Politiek, Overheid & Advocatuur ⚖️",
    "student": "Student (MBO / HBO / WO) 🎓",
    "werkzoekend": "Werkzoekend / Heroriëntatie 🔄",
    "gepensioneerd": "Gepensioneerd / Vrijgesteld 🏖️",
  };

  const housingLabels: Record<string, string> = {
    "stad": "Grote stad / Randstad (Appartement)",
    "dorp": "Dorp / Buitenwijk (Eengezinswoning met tuin)",
    "buitengebied": "Buitengebied / Landelijk (Vrijstaande woning)",
  };

  const familyLabels: Record<string, string> = {
    "single": "Alleenstaand / Single",
    "samenwonend": "Samenwonend (zonder kinderen)",
    "jong_gezin": "Jong gezin (baby / jonge kinderen)",
    "tieners": "Gezin met schoolgaande tieners",
    "spoed_ouders": "Tijdelijk / Noodsituatie (bijv. met kids bij ouders inwonend)",
    "senior_alleen": "Alleenstaand / Leeg nest",
  };

  const motivationLabels: Record<string, { title: string; pitch: string }> = {
    "snelheid": {
      title: "Snelheid & Directe Beschikbaarheid ⚡",
      pitch: "Deze klant betaalt liever meer als je morgen kunt beginnen. Wachttijden van maanden zijn een no-go.",
    },
    "kwaliteit": {
      title: "Bewezen Kwaliteit & Duurzaamheid 💎",
      pitch: "Wil de beste garantie en gerenommeerde merken. Eist vakmanschap en wil geen slapstick werk.",
    },
    "prijs": {
      title: "Scherpe Prijs & Transparante Offerte 🏷️",
      pitch: "Vergelijkt minstens 3 partijen. Heeft een strak budget en wil geen verborgen meerwerkkosten.",
    },
    "ontzorging": {
      title: "Totale Ontzorging & Gemak 🛡️",
      pitch: "Heeft het te druk. Wil de sleutel kunnen afgeven en een kant-en-klaar eindresultaat terugkrijgen.",
    },
    "vertrouwen": {
      title: "Persoonlijk Contact & Lokale Betrouwbaarheid 🤝",
      pitch: "Wil een bekende uit de regio, een warm telefoontje en recensies van echte buurtbewoners.",
    },
  };

  // Tool tips per platform
  const platformTools: Record<string, { tool: string; desc: string }> = {
    linkedin: {
      tool: "Taplio & LinkedIn Sales Navigator",
      desc: "Ideaal voor zakelijke beslissers. Deel thought-leadership en case studies.",
    },
    instagram: {
      tool: "Canva & Meta Business Suite",
      desc: "Toon esthetische voor-en-na resultaten en korte Reels van je werkproces.",
    },
    tiktok: {
      tool: "CapCut Video Editor",
      desc: "Plaats 'behind-the-scenes' video's en snelle tips om viraal te gaan onder starters.",
    },
    facebook: {
      tool: "Meta Lokale Advertenties & Buurtgroepen",
      desc: "Superkrachtig voor lokale diensten, mond-tot-mond en aanbevelingen van 35+ doelgroepen.",
    },
    google: {
      tool: "Google Mijn Bedrijf & Ubersuggest",
      desc: "Vang intentiegedreven zoekers op het exacte moment dat ze jouw dienst intypen.",
    },
    lokaal: {
      tool: "Fysieke Flyers & Lokale Sponsoring",
      desc: "Lokale sportclubs en dorpskranten zorgen voor ijzersterke naamsbekendheid.",
    },
  };

  // Genereer de AI-Ready Prompt om direct te kopiëren
  const generatedAIPrompt = `
Je bent een meesterlijke direct-response copywriter en marketingstrateeg voor mijn onderneming.
Gebruik het volgende gevalideerde Klantenpaspoort uit 'Vin's Survival Gids' als leidraad:

- Naam Persona: ${persona.name}
- Demografie: ${persona.gender === 'man' ? 'Man' : 'Vrouw'}, ${persona.ageGroup} jaar
- Koopkracht & Inkomen: ${incomeLabels[persona.incomeLevel]}
- Beroep: ${jobLabels[persona.jobSector]}
- Woonsituatie: ${housingLabels[persona.housing]}
- Gezinssituatie: ${familyLabels[persona.familySituation]}
- Interesses: ${persona.lifestyles.join(', ') || 'Niet gespecificeerd'}
- Actief op kanalen: ${persona.platforms.join(', ')}
- Belangrijkste Koopmotief / Urgentie: ${motivationLabels[persona.coreMotivation]?.title}
- Concrete Situatie & Pijnpunt: "${persona.customContext}"

Opdracht:
1. Schrijf een onweerstaanbare openingszin voor mijn website die direct inspeelt op zijn/haar grootste pijnpunt.
2. Schrijf een advertentietekst voor ${persona.platforms[0] || 'Facebook/Google'} waarin exact deze urgentie wordt weggenomen.
3. Noem de 3 grootste bezwaren die deze persoon zal hebben tijdens het verkoopgesprek en geef mij de perfecte tegenargumenten.
`.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedAIPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Paspoort Header met Knoppen */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[var(--section-bg)] p-4 rounded-xl border border-black/5 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-gradient-brand">
              Officieel Klantenpaspoort
            </h3>
            <p className="text-xs opacity-70">
              Gevalideerd profiel voor jouw marketing en verkoopstrategie
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-xs px-3 py-2 rounded-lg bg-[var(--surface)] border border-black/10 dark:border-white/10 font-bold hover:opacity-80 transition"
            >
              Karakter Aanpassen
            </button>
          )}

          <button
            onClick={handleCopy}
            className={`text-xs px-3.5 py-2 rounded-lg font-bold flex items-center gap-1.5 transition shadow-sm ${
              copied
                ? "bg-emerald-600 text-white"
                : "bg-gradient-brand text-white hover:opacity-90"
            }`}
          >
            {copied ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" /> Gekopieerd voor AI!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Kopieer als AI Prompt
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="text-xs px-3 py-2 rounded-lg bg-[var(--surface)] border border-black/10 dark:border-white/10 font-medium hover:opacity-80 transition flex items-center gap-1"
          >
            <Printer className="w-3.5 h-3.5" /> Print
          </button>
        </div>
      </div>

      {/* HET PASPOORT DOCUMENT (Visueel fysiek paspoort design) */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-[#dfb25a]/60 shadow-2xl bg-gradient-to-br from-[#1e1008] via-[#2a170c] to-[#120803] text-white p-6 sm:p-10 font-sans">
        
        {/* Subtiel watermerk / achtergrond patroon */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#dfb25a_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Gouden sierrand & paspoort header */}
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-[#dfb25a]/30 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-[#dfb25a] flex items-center justify-center bg-[#dfb25a]/10">
              <Sparkles className="w-6 h-6 text-[#dfb25a]" />
            </div>
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#dfb25a] font-bold block">
                Vin&apos;s Survival Gids • Doelgroep Paspoort
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                PASPOORT DER IDEALE KLANT
              </h2>
            </div>
          </div>

          <div className="text-right flex flex-col items-start sm:items-end">
            <span className="text-[10px] uppercase font-mono tracking-widest text-white/50">
              Document No.
            </span>
            <span className="text-sm font-mono font-bold text-[#dfb25a]">
              VSG-2026-{persona.gender === "man" ? "M" : "V"}{persona.ageGroup.replace("+", "")}-{(persona.name || "KLANT").slice(0, 3).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Paspoort Kern: Foto links + Gegevens rechts */}
        <div className="relative z-10 mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* LINKER KOLOM: Pasfoto & Officiële Stempel */}
          <div className="md:col-span-4 flex flex-col items-center">
            
            {/* Foto kader */}
            <div className="w-full max-w-[260px] relative rounded-2xl overflow-hidden p-1.5 bg-gradient-to-b from-[#dfb25a] to-[#8c5923] shadow-xl">
              <div className="rounded-xl overflow-hidden bg-[#180d06]">
                <AvatarDisplay persona={persona} showHud={false} className="w-full" />
              </div>

              {/* Officiële Stempel overlay */}
              <div className="absolute -bottom-3 -right-3 transform rotate-12 bg-red-600/90 text-white font-black text-[10px] tracking-widest uppercase px-3 py-1 rounded border-2 border-dashed border-white shadow-lg pointer-events-none">
                GEVALIDEERD
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className="text-lg font-black text-white block">
                {persona.name}
              </span>
              <span className="text-xs text-[#dfb25a] font-medium block">
                {ageLabels[persona.ageGroup]}
              </span>
            </div>

            {/* Quick badges */}
            <div className="mt-4 w-full flex flex-col gap-2">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10 text-xs">
                <Briefcase className="w-4 h-4 text-[#dfb25a] shrink-0" />
                <span className="truncate">{jobLabels[persona.jobSector]}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10 text-xs">
                <Home className="w-4 h-4 text-[#dfb25a] shrink-0" />
                <span className="truncate">{housingLabels[persona.housing]}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10 text-xs">
                <Heart className="w-4 h-4 text-[#dfb25a] shrink-0" />
                <span className="truncate">{familyLabels[persona.familySituation]}</span>
              </div>
            </div>

          </div>

          {/* RECHTER KOLOM: Het Verhaal, Urgentie, Kanalen & Strategie */}
          <div className="md:col-span-8 space-y-6">
            
            {/* 1. Het Gouden Koopmotief & Urgentie */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/30">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm mb-1.5">
                <Clock className="w-4 h-4" />
                <span>Hoofdreden om te Kopen: {motivationLabels[persona.coreMotivation]?.title}</span>
              </div>
              <p className="text-xs text-white/90 leading-relaxed font-medium">
                {motivationLabels[persona.coreMotivation]?.pitch}
              </p>
            </div>

            {/* 2. De Echte Praktijksituatie (Jouw specifieke context) */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-bold text-[#dfb25a] tracking-wider uppercase block">
                De Concrete Situatie &amp; Pijnpunt
              </span>
              <p className="text-sm text-white/90 italic leading-relaxed">
                &ldquo;{persona.customContext || "Geen specifieke situatie ingevuld. Voeg een concreet pijnpunt toe voor maximaal effect!"}&rdquo;
              </p>
            </div>

            {/* 3. Waar bevindt deze persona zich online? */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#dfb25a] tracking-wider uppercase flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                Online Hangouts &amp; Slimme Tools
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {persona.platforms.map((plat) => {
                  const info = platformTools[plat];
                  return (
                    <div
                      key={plat}
                      className="p-3 rounded-xl bg-black/40 border border-white/10 hover:border-[#dfb25a]/40 transition text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-white capitalize">
                          {plat}
                        </span>
                        <span className="text-[10px] text-[#dfb25a] font-mono px-1.5 py-0.5 rounded bg-[#dfb25a]/10">
                          Aanrader
                        </span>
                      </div>
                      {info && (
                        <>
                          <div className="text-[11px] font-bold text-emerald-400">
                            Tool: {info.tool}
                          </div>
                          <p className="text-[11px] text-white/70 leading-snug">
                            {info.desc}
                          </p>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Hoe overtuig je hem? (Survival Gids Verkoophack) */}
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-emerald-400" />
                <span>Vin&apos;s Gouden Verkoophack voor {persona.name}</span>
              </div>
              <p className="text-xs text-white/90 leading-relaxed">
                {persona.coreMotivation === "snelheid" && (
                  <>
                    Zet je doorlooptijd direct vetgedrukt in de kop van je offerte. Laat zien wanneer je begint en exact wanneer de oplevering is. Geef hem de gemoedsrust dat hij niet maandenlang hoeft te wachten!
                  </>
                )}
                {persona.coreMotivation === "kwaliteit" && (
                  <>
                    Gebruik foto&apos;s van eerdere hoogwaardige projecten en noem specifieke kwaliteitsgaranties (bijv. 10 jaar fabrieksgarantie). Benoem waarom jouw materialen superieur zijn aan goedkope alternatieven.
                  </>
                )}
                {persona.coreMotivation === "prijs" && (
                  <>
                    Geef een vaste 'geen verrassingen achteraf' prijsgarantie. Toon een heldere specificatie zodat hij precies ziet wat hij krijgt voor zijn geld, zonder verborgen toeslagen.
                  </>
                )}
                {persona.coreMotivation === "ontzorging" && (
                  <>
                    Benadruk dat jij alles regelt: van inkoop en montage tot de afvoer van puin en de eindschoonmaak. Hij hoeft alleen de deur open te doen.
                  </>
                )}
                {persona.coreMotivation === "vertrouwen" && (
                  <>
                    Nodig hem uit voor een kop koffie of kom vrijblijvend langs om zijn situatie ter plekke te bekijken. Laat recensies zien van mensen uit dezelfde woonplaats of buurt!
                  </>
                )}
              </p>
            </div>

          </div>
        </div>

        {/* Machine-Readable Zone (MRZ) Paspoort strook onderaan */}
        <div className="relative z-10 mt-8 pt-4 border-t border-[#dfb25a]/30">
          <div className="font-mono text-[10px] sm:text-xs text-[#dfb25a]/70 tracking-[0.2em] overflow-x-auto whitespace-nowrap select-all leading-relaxed">
            {`P<NLD<${persona.name.toUpperCase().replace(/[^A-Z]/g, '<')}${'<'.repeat(30)}`.slice(0, 44)}<br />
            {`VSG20269984NLD${persona.ageGroup.replace('+', '')}${persona.gender === 'man' ? 'M' : 'F'}${'<'.repeat(30)}9`.slice(0, 44)}
          </div>
        </div>

      </div>

    </div>
  );
}
