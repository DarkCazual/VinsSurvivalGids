"use client";

import React, { useState } from "react";
import { KorChoice } from "./types";
import { 
  Percent, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  User, 
  Building, 
  Calculator,
  ArrowRight,
  Sparkles
} from "lucide-react";

interface KorWijzerProps {
  korChoice: KorChoice;
  onSelectChoice: (choice: KorChoice) => void;
}

export function KorWijzer({ korChoice, onSelectChoice }: KorWijzerProps) {
  const [customerType, setCustomerType] = useState<"b2c" | "b2b" | "mix" | null>("b2c");
  const [expectedRevenue, setExpectedRevenue] = useState<"onder_20k" | "boven_20k">("onder_20k");
  const [majorInvestments, setMajorInvestments] = useState<"weinig" | "veel">("weinig");

  // Automatisch KOR advies
  let korAdvice: "aanrader" | "afrader" | "twijfel" = "twijfel";
  let adviceExplanation = "";

  if (expectedRevenue === "boven_20k") {
    korAdvice = "afrader";
    adviceExplanation = "Je verwacht meer dan €20.000 omzet per kalenderjaar. De KOR is dan wettelijk niet toegestaan of vervalt zodra je de grens passeert.";
  } else if (customerType === "b2b") {
    korAdvice = "afrader";
    adviceExplanation = "Bij zakelijke klanten (B2B) is KOR vrijwel altijd nadelig! Bedrijven kunnen jouw btw toch terugvragen, maar jij mag je inkoop-btw (laptop, gereedschap, software) NIET aftrekken.";
  } else if (customerType === "b2c" && majorInvestments === "weinig") {
    korAdvice = "aanrader";
    adviceExplanation = "Gouden greep! Particulieren betalen inclusief btw. Zonder 21% btw kun je 21% goedkoper zijn of 21% extra marge in je zak steken. Bovendien hoef je geen elk kwartaal btw-aangifte te doen!";
  } else if (majorInvestments === "veel") {
    korAdvice = "twijfel";
    adviceExplanation = "Omdat je flinke investeringen gaat doen, loop je duizenden euro's aan btw-teruggave mis als je nu KOR kiest. Reken eerst door hoeveel inkoop-btw je misloopt.";
  } else {
    korAdvice = "twijfel";
    adviceExplanation = "Omdat je zowel particulieren als bedrijven bedient, hangt het af van je marge en inkoopkosten.";
  }

  return (
    <div className="space-y-8">
      
      {/* Introductie Header */}
      <div className="bg-[var(--section-bg)] p-6 sm:p-7 rounded-2xl border border-black/10 dark:border-white/10 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-[#dfb25a] uppercase tracking-wider mb-1.5">
          <Percent className="w-4 h-4 text-[#dfb25a]" /> Hoofdstuk 2 • Stap 2
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-[var(--text)] tracking-tight">
          De KOR-Wijzer (Kleineondernemersregeling)
        </h2>
        <p className="text-sm opacity-80 mt-1 max-w-2xl leading-relaxed">
          De KOR vrijstelt je van btw als je omzet onder de €20.000 per jaar blijft. 
          Klinkt aantrekkelijk, maar in het boek legt Vincent uit waarom het voor de ene starter een <strong>gouden zet</strong> is 
          en voor de ander een <strong>dure beginnersfout</strong>.
        </p>
      </div>

      {/* Interactieve KOR Simulator */}
      <div className="bg-gradient-to-br from-[var(--section-bg)] to-black/30 p-6 rounded-2xl border border-black/10 dark:border-white/10 space-y-6">
        <div className="flex items-center gap-2 text-sm font-extrabold text-[var(--text)]">
          <Calculator className="w-4 h-4 text-[#dfb25a]" />
          <span>KOR Geschiktheidscheck: beantwoord 3 snelle vragen</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Vraag 1: Wie zijn je klanten? */}
          <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-2.5">
            <label className="text-xs font-bold opacity-75 block">
              1. Aan wie verkoop je voornamelijk?
            </label>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => setCustomerType("b2c")}
                className={`w-full p-2 rounded-lg text-xs font-bold flex items-center justify-between transition border ${
                  customerType === "b2c"
                    ? "bg-[#dfb25a] text-black border-[#dfb25a]"
                    : "bg-black/10 dark:bg-white/10 border-transparent hover:border-white/20"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Particulieren (B2C)
                </span>
                <span className="text-[10px] font-normal opacity-80">Geen btw-aftrek</span>
              </button>

              <button
                type="button"
                onClick={() => setCustomerType("b2b")}
                className={`w-full p-2 rounded-lg text-xs font-bold flex items-center justify-between transition border ${
                  customerType === "b2b"
                    ? "bg-[#dfb25a] text-black border-[#dfb25a]"
                    : "bg-black/10 dark:bg-white/10 border-transparent hover:border-white/20"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5" /> Bedrijven (B2B)
                </span>
                <span className="text-[10px] font-normal opacity-80">Trekken btw af</span>
              </button>

              <button
                type="button"
                onClick={() => setCustomerType("mix")}
                className={`w-full p-2 rounded-lg text-xs font-bold flex items-center justify-between transition border ${
                  customerType === "mix"
                    ? "bg-[#dfb25a] text-black border-[#dfb25a]"
                    : "bg-black/10 dark:bg-white/10 border-transparent hover:border-white/20"
                }`}
              >
                <span>Mix van beide</span>
                <span className="text-[10px] font-normal opacity-80">50/50</span>
              </button>
            </div>
          </div>

          {/* Vraag 2: Verwachte omzet */}
          <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-2.5">
            <label className="text-xs font-bold opacity-75 block">
              2. Verwachte omzet in jaar 1
            </label>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => setExpectedRevenue("onder_20k")}
                className={`w-full p-2 rounded-lg text-xs font-bold flex items-center justify-between transition border ${
                  expectedRevenue === "onder_20k"
                    ? "bg-[#dfb25a] text-black border-[#dfb25a]"
                    : "bg-black/10 dark:bg-white/10 border-transparent hover:border-white/20"
                }`}
              >
                <span>Minder dan €20.000</span>
                <span className="text-[10px] font-normal opacity-80">KOR toegestaan</span>
              </button>

              <button
                type="button"
                onClick={() => setExpectedRevenue("boven_20k")}
                className={`w-full p-2 rounded-lg text-xs font-bold flex items-center justify-between transition border ${
                  expectedRevenue === "boven_20k"
                    ? "bg-[#dfb25a] text-black border-[#dfb25a]"
                    : "bg-black/10 dark:bg-white/10 border-transparent hover:border-white/20"
                }`}
              >
                <span>Meer dan €20.000</span>
                <span className="text-[10px] font-normal opacity-80">KOR vervalt</span>
              </button>
            </div>
          </div>

          {/* Vraag 3: Grote investeringen */}
          <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-2.5">
            <label className="text-xs font-bold opacity-75 block">
              3. Grote investeringen/inkoop?
            </label>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => setMajorInvestments("weinig")}
                className={`w-full p-2 rounded-lg text-xs font-bold flex items-center justify-between transition border ${
                  majorInvestments === "weinig"
                    ? "bg-[#dfb25a] text-black border-[#dfb25a]"
                    : "bg-black/10 dark:bg-white/10 border-transparent hover:border-white/20"
                }`}
              >
                <span>Weinig kosten / kennisdienst</span>
                <span className="text-[10px] font-normal opacity-80">&lt; €2.000</span>
              </button>

              <button
                type="button"
                onClick={() => setMajorInvestments("veel")}
                className={`w-full p-2 rounded-lg text-xs font-bold flex items-center justify-between transition border ${
                  majorInvestments === "veel"
                    ? "bg-[#dfb25a] text-black border-[#dfb25a]"
                    : "bg-black/10 dark:bg-white/10 border-transparent hover:border-white/20"
                }`}
              >
                <span>Veel machines/voorraad/auto</span>
                <span className="text-[10px] font-normal opacity-80">&gt; €5.000</span>
              </button>
            </div>
          </div>

        </div>

        {/* Dynamisch Advies Kaartje */}
        <div className={`p-5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
          korAdvice === "aanrader" 
            ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
            : korAdvice === "afrader"
            ? "bg-rose-500/15 border-rose-500/40 text-rose-300"
            : "bg-amber-500/15 border-amber-500/40 text-amber-300"
        }`}>
          <div className="space-y-1">
            <div className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
              {korAdvice === "aanrader" && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              {korAdvice === "afrader" && <XCircle className="w-4 h-4 text-rose-400" />}
              {korAdvice === "twijfel" && <AlertTriangle className="w-4 h-4 text-amber-400" />}
              <span>Advies: {korAdvice === "aanrader" ? "WEL meedoen met de KOR" : korAdvice === "afrader" ? "NIET meedoen met de KOR" : "Nog even afwachten / doorrekenen"}</span>
            </div>
            <p className="text-xs opacity-90 leading-relaxed max-w-2xl text-[var(--text)]">
              {adviceExplanation}
            </p>
          </div>

          <div className="flex gap-2 shrink-0">
            {korAdvice === "aanrader" && (
              <button
                type="button"
                onClick={() => onSelectChoice("ja")}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-extrabold text-xs shadow-md hover:brightness-110"
              >
                Kies KOR (Ja)
              </button>
            )}
            {korAdvice === "afrader" && (
              <button
                type="button"
                onClick={() => onSelectChoice("nee")}
                className="px-4 py-2 rounded-xl bg-rose-500 text-white font-extrabold text-xs shadow-md hover:brightness-110"
              >
                Geen KOR (Nee)
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Definitieve Keuze Selectie */}
      <div className="space-y-3 pt-4">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--text)] block">
          Wat geef je op bij de KvK inschrijving?
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onSelectChoice("ja")}
            className={`p-4 rounded-xl text-left border transition ${
              korChoice === "ja"
                ? "bg-[#dfb25a]/20 border-[#dfb25a] text-[#dfb25a] font-bold shadow-md"
                : "bg-[var(--section-bg)] border-black/10 dark:border-white/10 hover:border-white/20"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-sm">Ja, ik doe mee aan de KOR</span>
              {korChoice === "ja" && <CheckCircle2 className="w-4 h-4 text-[#dfb25a]" />}
            </div>
            <div className="text-[11px] opacity-75 font-normal">
              Geen btw op facturen, geen kwartaalaangifte, omzet &lt; €20k.
            </div>
          </button>

          <button
            type="button"
            onClick={() => onSelectChoice("nee")}
            className={`p-4 rounded-xl text-left border transition ${
              korChoice === "nee"
                ? "bg-[#dfb25a]/20 border-[#dfb25a] text-[#dfb25a] font-bold shadow-md"
                : "bg-[var(--section-bg)] border-black/10 dark:border-white/10 hover:border-white/20"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-sm">Nee, reguliere btw</span>
              {korChoice === "nee" && <CheckCircle2 className="w-4 h-4 text-[#dfb25a]" />}
            </div>
            <div className="text-[11px] opacity-75 font-normal">
              21% btw op facturen, elk kwartaal btw-aangifte, wel inkoop-btw terugvragen.
            </div>
          </button>

          <button
            type="button"
            onClick={() => onSelectChoice("uitzoeken")}
            className={`p-4 rounded-xl text-left border transition ${
              korChoice === "uitzoeken"
                ? "bg-[#dfb25a]/20 border-[#dfb25a] text-[#dfb25a] font-bold shadow-md"
                : "bg-[var(--section-bg)] border-black/10 dark:border-white/10 hover:border-white/20"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-sm">Nog uitzoeken</span>
              {korChoice === "uitzoeken" && <CheckCircle2 className="w-4 h-4 text-[#dfb25a]" />}
            </div>
            <div className="text-[11px] opacity-75 font-normal">
              Beslis ik later of bespreek ik met mijn boekhouder.
            </div>
          </button>
        </div>
      </div>

    </div>
  );
}
