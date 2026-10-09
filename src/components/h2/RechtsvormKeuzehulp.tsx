"use client";

import React, { useState } from "react";
import { LegalForm } from "./types";
import { 
  Scale, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  User, 
  ShieldAlert, 
  ShieldCheck, 
  TrendingUp, 
  FileText, 
  ArrowRight,
  Sparkles
} from "lucide-react";

interface RechtsvormKeuzehulpProps {
  selectedForm: LegalForm;
  onSelectForm: (form: LegalForm) => void;
}

export function RechtsvormKeuzehulp({
  selectedForm,
  onSelectForm,
}: RechtsvormKeuzehulpProps) {
  // Quiz state voor de beslisboom
  const [partnerAnswer, setPartnerAnswer] = useState<"alleen" | "samen" | null>(null);
  const [riskAnswer, setRiskAnswer] = useState<"laag" | "hoog" | null>(null);
  const [profitAnswer, setProfitAnswer] = useState<"laag" | "hoog" | null>(null);

  // Bereken advies op basis van antwoorden
  let advisedForm: LegalForm | null = null;
  let adviceReason = "";

  if (partnerAnswer && riskAnswer && profitAnswer) {
    if (partnerAnswer === "samen") {
      if (riskAnswer === "hoog" || profitAnswer === "hoog") {
        advisedForm = "bv";
        adviceReason = "Omdat je samen start én met verhoogd risico of hoge winst rekent, beschermt een BV jullie privé-vermogen.";
      } else {
        advisedForm = "vof";
        adviceReason = "Je start samen en de risico's zijn overzichtelijk. Een VOF is eenvoudig op te richten en fiscaal aantrekkelijk.";
      }
    } else {
      // Alleen
      if (riskAnswer === "hoog" || profitAnswer === "hoog") {
        advisedForm = "bv";
        adviceReason = "Bij hoog financieel risico of een winst boven €100k biedt een BV privé-bescherming en belastingvoordeel.";
      } else {
        advisedForm = "eenmanszaak";
        adviceReason = "Dé perfecte no-nonsense start! Je profiteert van de startersaftrek, zelfstandigenaftrek en MKB-winstvrijstelling zonder notariskosten.";
      }
    }
  }

  const legalForms = [
    {
      id: "eenmanszaak" as LegalForm,
      title: "Eenmanszaak",
      badge: "Populair bij 85% van de starters",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      bestFor: "Je start alleen als zzp'er, freelancer of vakman",
      pros: [
        "Geen notaris nodig (alleen €80 KvK-inschrijving)",
        "Maximale belastingaftrek: Zelfstandigenaftrek, Startersaftrek & MKB-winstvrijstelling",
        "Eenvoudige administratie, geen publicatieplicht",
      ],
      cons: [
        "Aansprakelijkheid: je bent met je privévermogen aansprakelijk voor zakelijke schulden",
      ],
      tippingPoint: "Fiscaal het voordeligst tot circa €80.000 - €100.000 nettowinst per jaar.",
    },
    {
      id: "vof" as LegalForm,
      title: "VOF (Vennootschap onder Firma)",
      badge: "Samen ondernemen",
      badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      bestFor: "Je start samen met één of meerdere compagnons",
      pros: [
        "Eenvoudig op te richten zonder verplichte notaris",
        "Beide vennoten behouden ondernemersaftrek (indien voldaan aan urencriterium)",
        "Mogelijkheid tot inbreng van verschillende expertises",
      ],
      cons: [
        "Hoofdelijke aansprakelijkheid: jij bent ook aansprakelijk voor fouten van je partner!",
        "Goede vennootschapsovereenkomst is absoluut cruciaal",
      ],
      tippingPoint: "Ideaal voor partners die samen beginnen met beperkt financieel risico.",
    },
    {
      id: "bv" as LegalForm,
      title: "Besloten Vennootschap (BV)",
      badge: "Privé beschermd & Schaalbaar",
      badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      bestFor: "Groot risico, personeel, investeerders of hoge winsten",
      pros: [
        "Afgeschermde aansprakelijkheid: de BV is aansprakelijk, niet jouw privéhuis of spaargeld",
        "Professionele uitstraling bij grote zakelijke opdrachtgevers",
        "Aandelen makkelijk overdraagbaar aan investeerders",
      ],
      cons: [
        "Notariskosten bij oprichting (€400 - €1.000)",
        "DGA-salarisverplichting (gebruikelijkloonregeling)",
        "Jaarrekening moet officieel gedeponeerd worden bij de KvK",
      ],
      tippingPoint: "Interessant vanaf €100.000+ structurele winst óf bij substantieel aansprakelijkheidsrisico.",
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Introductie Header */}
      <div className="bg-[var(--section-bg)] p-6 sm:p-7 rounded-2xl border border-black/10 dark:border-white/10 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-[#dfb25a] uppercase tracking-wider mb-1.5">
          <Scale className="w-4 h-4 text-[#dfb25a]" /> Hoofdstuk 2 • Stap 2
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-[var(--text)] tracking-tight">
          De Rechtsvorm Keuzehulp
        </h2>
        <p className="text-sm opacity-80 mt-1 max-w-2xl leading-relaxed">
          In het boek waarschuwt Vincent: <em>&ldquo;Maak het in het begin niet ingewikkelder dan nodig. 
          Vrijwel elke starter begint met een eenmanszaak. Overstappen naar een BV kan later altijd nog.&rdquo;</em>
        </p>
      </div>

      {/* 3-Vragen Beslis Quiz */}
      <div className="bg-gradient-to-br from-[var(--section-bg)] to-black/30 p-6 rounded-2xl border border-black/10 dark:border-white/10 space-y-6">
        <div className="flex items-center gap-2 text-sm font-extrabold text-[var(--text)]">
          <Sparkles className="w-4 h-4 text-[#dfb25a]" />
          <span>Snelle 3-Vragen Beslisboom: ontdek jouw ideale match</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Vraag 1: Alleen of samen? */}
          <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-2.5">
            <label className="text-xs font-bold opacity-75 block">
              1. Start je alleen of samen?
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPartnerAnswer("alleen")}
                className={`p-2.5 rounded-lg text-xs font-bold flex flex-col items-center gap-1 transition border ${
                  partnerAnswer === "alleen"
                    ? "bg-[#dfb25a] text-black border-[#dfb25a]"
                    : "bg-black/10 dark:bg-white/10 border-transparent hover:border-white/20"
                }`}
              >
                <User className="w-4 h-4" /> Alleen
              </button>
              <button
                type="button"
                onClick={() => setPartnerAnswer("samen")}
                className={`p-2.5 rounded-lg text-xs font-bold flex flex-col items-center gap-1 transition border ${
                  partnerAnswer === "samen"
                    ? "bg-[#dfb25a] text-black border-[#dfb25a]"
                    : "bg-black/10 dark:bg-white/10 border-transparent hover:border-white/20"
                }`}
              >
                <Users className="w-4 h-4" /> Met partner(s)
              </button>
            </div>
          </div>

          {/* Vraag 2: Risico & Aansprakelijkheid */}
          <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-2.5">
            <label className="text-xs font-bold opacity-75 block">
              2. Hoe hoog zijn de risico&apos;s?
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRiskAnswer("laag")}
                className={`p-2.5 rounded-lg text-xs font-bold flex flex-col items-center gap-1 transition border ${
                  riskAnswer === "laag"
                    ? "bg-[#dfb25a] text-black border-[#dfb25a]"
                    : "bg-black/10 dark:bg-white/10 border-transparent hover:border-white/20"
                }`}
              >
                <ShieldCheck className="w-4 h-4" /> Laag / Normaal
              </button>
              <button
                type="button"
                onClick={() => setRiskAnswer("hoog")}
                className={`p-2.5 rounded-lg text-xs font-bold flex flex-col items-center gap-1 transition border ${
                  riskAnswer === "hoog"
                    ? "bg-[#dfb25a] text-black border-[#dfb25a]"
                    : "bg-black/10 dark:bg-white/10 border-transparent hover:border-white/20"
                }`}
              >
                <ShieldAlert className="w-4 h-4" /> Hoog / Schulden
              </button>
            </div>
          </div>

          {/* Vraag 3: Verwachte winst */}
          <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-2.5">
            <label className="text-xs font-bold opacity-75 block">
              3. Verwachte nettowinst per jaar
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setProfitAnswer("laag")}
                className={`p-2.5 rounded-lg text-xs font-bold flex flex-col items-center gap-1 transition border ${
                  profitAnswer === "laag"
                    ? "bg-[#dfb25a] text-black border-[#dfb25a]"
                    : "bg-black/10 dark:bg-white/10 border-transparent hover:border-white/20"
                }`}
              >
                <TrendingUp className="w-4 h-4" /> &lt; €80.000
              </button>
              <button
                type="button"
                onClick={() => setProfitAnswer("hoog")}
                className={`p-2.5 rounded-lg text-xs font-bold flex flex-col items-center gap-1 transition border ${
                  profitAnswer === "hoog"
                    ? "bg-[#dfb25a] text-black border-[#dfb25a]"
                    : "bg-black/10 dark:bg-white/10 border-transparent hover:border-white/20"
                }`}
              >
                <TrendingUp className="w-4 h-4" /> &gt; €100.000
              </button>
            </div>
          </div>

        </div>

        {/* Dynamisch Advies Kaartje */}
        {advisedForm && (
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#dfb25a]/20 to-emerald-500/20 border border-[#dfb25a]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in">
            <div className="space-y-1">
              <div className="text-xs font-bold text-[#dfb25a] uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Jouw advies:
              </div>
              <div className="text-base font-black text-[var(--text)] capitalize">
                {advisedForm === "eenmanszaak" ? "Eenmanszaak" : advisedForm === "vof" ? "VOF" : "Besloten Vennootschap (BV)"}
              </div>
              <p className="text-xs opacity-90 leading-relaxed max-w-xl">
                {adviceReason}
              </p>
            </div>
            
            <button
              type="button"
              onClick={() => onSelectForm(advisedForm)}
              className="text-xs px-4 py-2 rounded-xl bg-[#dfb25a] text-black font-extrabold hover:brightness-110 transition shrink-0 shadow-md flex items-center gap-1.5"
            >
              Neem advies over <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Rechtsvormen Vergelijkingsoverzicht */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {legalForms.map((item) => {
          const isSelected = selectedForm === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-2xl p-6 flex flex-col justify-between border transition-all duration-300 ${
                isSelected
                  ? "bg-gradient-to-b from-[#2a1b0b] to-[#160c05] border-2 border-[#dfb25a] shadow-xl ring-2 ring-[#dfb25a]/30"
                  : "bg-[var(--section-bg)] border-black/10 dark:border-white/10 hover:border-white/20 shadow-sm"
              }`}
            >
              <div className="space-y-4">
                
                {/* Header */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-black text-[var(--text)]">
                      {item.title}
                    </h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#dfb25a] font-medium">
                    {item.bestFor}
                  </p>
                </div>

                {/* Voordelen */}
                <div className="space-y-1.5 pt-2 border-t border-black/5 dark:border-white/10">
                  <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                    Grootste voordelen:
                  </div>
                  <ul className="space-y-1 text-xs opacity-85">
                    {item.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Nadelen / Aandachtspunten */}
                <div className="space-y-1.5 pt-2 border-t border-black/5 dark:border-white/10">
                  <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                    Belangrijk om te weten:
                  </div>
                  <ul className="space-y-1 text-xs opacity-85">
                    {item.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tipping point */}
                <div className="p-2.5 rounded-lg bg-black/20 text-[11px] italic opacity-80 border border-white/5">
                  💡 {item.tippingPoint}
                </div>

              </div>

              {/* Selecteer knop */}
              <div className="pt-5 mt-4 border-t border-black/5 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => onSelectForm(item.id)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                    isSelected
                      ? "bg-[#dfb25a] text-black font-extrabold shadow-md"
                      : "bg-black/10 dark:bg-white/10 hover:bg-[#dfb25a] hover:text-black"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isSelected ? "Geselecteerde rechtsvorm ✓" : "Kies deze rechtsvorm"}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
