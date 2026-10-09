"use client";

import React, { useState } from "react";
import { NameOption, NameType, NameChecklist } from "./types";
import { checkLinks, slugifyDomain } from "@/config/links";
import { 
  Trophy, 
  Search, 
  Globe, 
  Building2, 
  ShieldCheck, 
  ExternalLink, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Crown,
  Volume2,
  PhoneCall,
  Flame,
  ArrowRight
} from "lucide-react";

interface NaamTesterProps {
  names: NameOption[];
  winningName: string | null;
  onUpdateName: (id: string, updated: Partial<NameOption>) => void;
  onSelectWinner: (name: string) => void;
}

export function NaamTester({
  names,
  winningName,
  onUpdateName,
  onSelectWinner,
}: NaamTesterProps) {
  const [showRebrandtStory, setShowRebrandtStory] = useState(false);
  const [selectedTypeModal, setSelectedTypeModal] = useState<NameType | null>(null);

  const nameTypesMeta: Record<NameType, { label: string; icon: string; short: string; pros: string; cons: string; example: string }> = {
    beschrijvend: {
      label: "Beschrijvend",
      icon: "🏷️",
      short: "Je zegt letterlijk wat je doet",
      pros: "Iedereen begrijpt direct wat je aanbiedt. Goed voor lokale vindbaarheid.",
      cons: "Kan saai overkomen en knelt als je later je diensten uitbreidt.",
      example: "Epe Marketing, De Fietsenmaker, Vloerverwarming Zwolle",
    },
    suggestief: {
      label: "Suggestief",
      icon: "✨",
      short: "Roept een gevoel of associatie op",
      pros: "Klinkt direct professioneel en als een echt merk. Blijft beter hangen.",
      cons: "Vraagt een seconde denkwerk bij de klant.",
      example: "GreenSpark, WarmeVoeten, BrightVision, Bloom & Wild",
    },
    associatief: {
      label: "Associatief",
      icon: "🍎",
      short: "Een krachtige metafoor zonder directe link",
      pros: "Enorm onderscheidend, maximale merkwaarde op lange termijn.",
      cons: "Kost tijd en marketing om lading aan het woord te geven.",
      example: "Apple (computers), Patagonia (kleding), Puma (schoenen)",
    },
    verzonnen: {
      label: "Verzonnen",
      icon: "🔮",
      short: "Volledig uniek, niet-bestaand woord",
      pros: "Domeinnaam en handelsnaam zijn vrijwel altijd direct vrij. Geen taalbarrière.",
      cons: "Betekent in het begin helemaal niets. Vraagt uitleg en herhaling.",
      example: "Zalando, Spotify, Kodak, Bol",
    },
  };

  const checklistItems: { key: keyof NameChecklist; label: string; icon: any; tip: string }[] = [
    {
      key: "hardopGezegd",
      label: "Hardop gezegd: 'Goedemiddag, met [Naam]'",
      icon: Volume2,
      tip: "Rol het vlot over je tong of struikel je erover?",
    },
    {
      key: "geenSpelfout",
      label: "Geen spellingsproblemen aan de telefoon",
      icon: PhoneCall,
      tip: "Hoe vaak moet je het uitleggen met 'met een dubbele s of c/k'?",
    },
    {
      key: "googleCorrigeertNiet",
      label: "Google corrigeert hem niet naar een ander woord",
      icon: Search,
      tip: "De beroemde Rebrandt-test. Als Google vraagt 'Bedoelde u...', verlies je klanten.",
    },
    {
      key: "domeinVrij",
      label: "Het .nl (of .com) domein is beschikbaar",
      icon: Globe,
      tip: "Controleer of het hoofddomein vrij is voor registratie.",
    },
    {
      key: "kvkVrij",
      label: "Bij de KvK heet geen concurrent in jouw branche al zo",
      icon: Building2,
      tip: "Vermijd verwarring en juridische sommaties in hetzelfde werkgebied.",
    },
    {
      key: "toekomstbestendig",
      label: "Past nog steeds als je over 3 jaar groeit",
      icon: Flame,
      tip: "Beperkt de naam je niet als je andere diensten of producten toevoegt?",
    },
  ];

  const calculateScore = (checks: NameChecklist) => {
    return Object.values(checks).filter(Boolean).length;
  };

  return (
    <div className="space-y-8">
      
      {/* Introductie & Het Boek Principe */}
      <div className="bg-[var(--section-bg)] p-6 sm:p-7 rounded-2xl border border-black/10 dark:border-white/10 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#dfb25a] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#dfb25a]" /> Hoofdstuk 2 • Stap 1
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text)] tracking-tight">
              De Grote Bedrijfsnaam Battle
            </h2>
            <p className="text-sm opacity-80 leading-relaxed">
              In het boek adviseert Vincent om altijd **minimaal 3 serieuze namen** tegen elkaar af te wegen. 
              Kies niet op onderbuikgevoel alleen: test de vindbaarheid, zeg de naam hardop en controleer de KvK.
            </p>
          </div>

          <button
            onClick={() => setShowRebrandtStory(!showRebrandtStory)}
            className="self-start md:self-auto text-xs px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 font-bold hover:bg-amber-500/20 transition flex items-center gap-2 shrink-0 shadow-sm"
          >
            <AlertTriangle className="w-4 h-4" />
            {showRebrandtStory ? "Sluit 'Rebrandt' valkuil" : "Lees de 'Rebrandt' valkuil ⚠️"}
          </button>
        </div>

        {/* Uitklapbaar Kennisblok: De Rebrandt Anekdote */}
        {showRebrandtStory && (
          <div className="mt-5 p-4 sm:p-5 rounded-xl bg-black/40 border border-amber-500/30 text-xs leading-relaxed space-y-2 animate-in fade-in slide-in-from-top-2">
            <div className="font-extrabold text-amber-400 flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4" /> De Rebrandt-valkuil uit het boek:
            </div>
            <p className="opacity-90">
              Een schilder dacht origineel te zijn en noemde zijn bedrijf <strong>&ldquo;Rebrandt Schilderwerken&rdquo;</strong> (een knipoog naar Rembrandt). 
              Het probleem? Iedereen die hem zocht op Google kreeg de melding: <em>&ldquo;Bedoelde u: Rembrandt Schilderwerken?&rdquo;</em>. 
              Vervolgens kregen potentiële klanten alleen pagina&apos;s over het Rijksmuseum en concurrenten te zien. 
              Hij was virtueel onvindbaar en kon na een jaar zijn hele inschrijving en busbelettering overdoen.
            </p>
            <p className="text-[#dfb25a] font-semibold">
              Les uit het boek: Als Google denkt dat jouw naam een typefout is van een populairder woord, kies een andere naam!
            </p>
          </div>
        )}
      </div>

      {/* De 3 Naamkaarten Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {names.map((item, index) => {
          const score = calculateScore(item.checks);
          const isWinner = winningName === item.name && item.name.trim().length > 0;
          const currentMeta = nameTypesMeta[item.type];
          const hasName = item.name.trim().length > 0;

          return (
            <div
              key={item.id}
              className={`relative flex flex-col justify-between rounded-2xl p-5 sm:p-6 transition-all duration-300 ${
                isWinner 
                  ? "bg-gradient-to-b from-[#2a1b0b] to-[#160c05] border-2 border-[#dfb25a] shadow-2xl scale-[1.01] ring-2 ring-[#dfb25a]/30" 
                  : "bg-[var(--section-bg)] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 shadow-sm"
              }`}
            >
              {/* Winner badge */}
              {isWinner && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#f7d57f] to-[#dfb25a] text-black text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 z-20">
                  <Crown className="w-3.5 h-3.5 fill-black" /> Gekozen Bedrijfsnaam
                </div>
              )}

              <div className="space-y-5">
                
                {/* Header van de kaart */}
                <div className="flex justify-between items-center pb-3 border-b border-black/5 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center font-mono font-bold text-xs">
                      #{index + 1}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                      Optie {index + 1}
                    </span>
                  </div>

                  {/* Score badge */}
                  <div className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${
                    score >= 5 ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                    score >= 3 ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                    "bg-white/10 text-white/60"
                  }`}>
                    <Trophy className="w-3 h-3" />
                    <span>{score}/6 punten</span>
                  </div>
                </div>

                {/* Naam Invoerveld */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold tracking-wide opacity-80 block">
                    Bedrijfsnaam
                  </label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => onUpdateName(item.id, { name: e.target.value })}
                    placeholder={`Bijv. ${index === 0 ? "Epe Montage" : index === 1 ? "WarmteVast" : "Novarise"}`}
                    className="w-full text-base sm:text-lg font-black tracking-tight px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 focus:outline-none focus:border-[#dfb25a] transition text-[var(--text)]"
                  />
                </div>

                {/* Type selectie */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold tracking-wide opacity-80">
                      Type naam
                    </label>
                    <button
                      type="button"
                      onClick={() => setSelectedTypeModal(item.type)}
                      className="text-[11px] text-[#dfb25a] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <HelpCircle className="w-3 h-3" /> Wat is dit?
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-1.5">
                    {(Object.keys(nameTypesMeta) as NameType[]).map((typeKey) => {
                      const isSelected = item.type === typeKey;
                      const meta = nameTypesMeta[typeKey];
                      return (
                        <button
                          key={typeKey}
                          type="button"
                          onClick={() => onUpdateName(item.id, { type: typeKey })}
                          className={`text-left p-2 rounded-lg text-xs font-medium transition border flex items-center gap-1.5 ${
                            isSelected
                              ? "bg-[#dfb25a]/15 border-[#dfb25a] text-[#dfb25a] font-bold"
                              : "bg-black/5 dark:bg-white/5 border-transparent hover:border-black/15 dark:hover:border-white/15 opacity-80"
                          }`}
                        >
                          <span>{meta.icon}</span>
                          <span className="truncate">{meta.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="text-[11px] opacity-70 italic pt-0.5">
                    {currentMeta.short}
                  </div>
                </div>

                {/* Directe Live Check Knoppen */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold tracking-wide opacity-80 block">
                    Live Checkers (1-klik)
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    
                    {/* Google test */}
                    <a
                      href={hasName ? checkLinks.google(item.name) : "#"}
                      target={hasName ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg font-bold flex items-center justify-between border transition ${
                        hasName 
                          ? "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-blue-500/50 hover:text-blue-400"
                          : "opacity-40 cursor-not-allowed bg-black/5 dark:bg-white/5 border-transparent"
                      }`}
                      title={hasName ? `Zoek '${item.name}' op Google` : "Vul eerst een naam in"}
                    >
                      <span className="flex items-center gap-1.5">
                        <Search className="w-3.5 h-3.5 text-blue-400" /> Google
                      </span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>

                    {/* SIDN / Domein */}
                    <a
                      href={hasName ? checkLinks.domainHosting(item.name) : "#"}
                      target={hasName ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg font-bold flex items-center justify-between border transition ${
                        hasName 
                          ? "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-emerald-500/50 hover:text-emerald-400"
                          : "opacity-40 cursor-not-allowed bg-black/5 dark:bg-white/5 border-transparent"
                      }`}
                      title={hasName ? `Check of ${slugifyDomain(item.name)}.nl vrij is` : "Vul eerst een naam in"}
                    >
                      <span className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-emerald-400" /> .NL Domein
                      </span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>

                    {/* KvK Handelsregister */}
                    <a
                      href={hasName ? checkLinks.kvk(item.name) : "#"}
                      target={hasName ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg font-bold flex items-center justify-between border transition ${
                        hasName 
                          ? "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-amber-500/50 hover:text-amber-400"
                          : "opacity-40 cursor-not-allowed bg-black/5 dark:bg-white/5 border-transparent"
                      }`}
                      title={hasName ? `Zoek '${item.name}' in het KvK Handelsregister` : "Vul eerst een naam in"}
                    >
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-amber-400" /> KvK Register
                      </span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>

                    {/* Merkenregister BOIP */}
                    <a
                      href={hasName ? checkLinks.boip(item.name) : "#"}
                      target={hasName ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg font-bold flex items-center justify-between border transition ${
                        hasName 
                          ? "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-purple-500/50 hover:text-purple-400"
                          : "opacity-40 cursor-not-allowed bg-black/5 dark:bg-white/5 border-transparent"
                      }`}
                      title={hasName ? `Check merk '${item.name}' bij BOIP` : "Vul eerst een naam in"}
                    >
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Merkenrecht
                      </span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>

                  </div>
                </div>

                {/* 6 Praktijkcriteria Checklist */}
                <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/10">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold tracking-wide opacity-80">
                      Praktijkcriteria ({score}/6)
                    </label>
                    <span className="text-[11px] opacity-60">Vink aan wat klopt:</span>
                  </div>

                  <div className="space-y-1.5">
                    {checklistItems.map((chk) => {
                      const isChecked = item.checks[chk.key];
                      const Icon = chk.icon;
                      return (
                        <label
                          key={chk.key}
                          className={`flex items-start gap-2.5 p-2 rounded-lg text-xs cursor-pointer select-none transition border ${
                            isChecked
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 font-medium"
                              : "bg-black/5 dark:bg-white/5 border-transparent hover:border-black/10 dark:hover:border-white/10 opacity-75"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              const newChecks = { ...item.checks, [chk.key]: e.target.checked };
                              onUpdateName(item.id, { checks: newChecks });
                            }}
                            className="mt-0.5 rounded text-[#dfb25a] focus:ring-0"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-1 font-semibold leading-tight">
                              <Icon className="w-3 h-3 shrink-0" />
                              <span>{chk.label}</span>
                            </div>
                            <div className="text-[10px] opacity-70 mt-0.5">
                              {chk.tip}
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Onderste Actie: Kies als Winnaar */}
              <div className="pt-5 mt-4 border-t border-black/5 dark:border-white/10">
                <button
                  type="button"
                  disabled={!hasName}
                  onClick={() => onSelectWinner(item.name)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md ${
                    !hasName
                      ? "opacity-30 cursor-not-allowed bg-black/10 dark:bg-white/10"
                      : isWinner
                      ? "bg-gradient-to-r from-[#dfb25a] to-[#f7d57f] text-black ring-2 ring-[#dfb25a]"
                      : "bg-[var(--surface)] hover:bg-[#dfb25a] hover:text-black border border-black/15 dark:border-white/15"
                  }`}
                >
                  <Crown className={`w-4 h-4 ${isWinner ? "fill-black" : ""}`} />
                  {isWinner ? "Dit is mijn winnende naam! 👑" : "Kies als officiële naam"}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Uitleg Modal voor Naamtypes */}
      {selectedTypeModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--section-bg)] border border-[#dfb25a]/40 max-w-lg w-full rounded-2xl p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 text-base font-extrabold text-[var(--text)]">
                <span className="text-xl">{nameTypesMeta[selectedTypeModal].icon}</span>
                <span>{nameTypesMeta[selectedTypeModal].label}</span>
              </div>
              <button
                onClick={() => setSelectedTypeModal(null)}
                className="text-xs px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 font-bold"
              >
                Sluiten ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-[var(--text)]/90">
              <div>
                <strong className="text-[#dfb25a] block mb-0.5">Wat is het?</strong>
                <p>{nameTypesMeta[selectedTypeModal].short}</p>
              </div>

              <div>
                <strong className="text-emerald-400 block mb-0.5">Voordelen:</strong>
                <p>{nameTypesMeta[selectedTypeModal].pros}</p>
              </div>

              <div>
                <strong className="text-rose-400 block mb-0.5">Valkuilen:</strong>
                <p>{nameTypesMeta[selectedTypeModal].cons}</p>
              </div>

              <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                <strong className="text-amber-300 block mb-0.5">Voorbeelden uit het boek:</strong>
                <p className="font-mono text-[11px] text-white/80">{nameTypesMeta[selectedTypeModal].example}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedTypeModal(null)}
              className="w-full py-2 rounded-xl bg-[#dfb25a] text-black font-bold text-xs"
            >
              Begrepen, terug naar de battle
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
