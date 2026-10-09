"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BrandLogo } from "@/components/BrandLogo";
import { PersonaWizard } from "@/components/persona/PersonaWizard";
import { PersonaData, DEFAULT_PERSONA } from "@/components/persona/types";
import { 
  Lightbulb, 
  UserCheck, 
  Compass, 
  FileCheck, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Save, 
  Download, 
  Share2, 
  Trophy,
  ArrowLeft
} from "lucide-react";

interface H1ClientProps {
  userId: string;
  userEmail: string;
}

const EMPTY_IDEE = {
  aanbod: "",
  doelgroepKort: "",
  waaromJij: "",
};

const EMPTY_MISSIE = {
  doelgroep: "",
  resultaat: "",
  angst: "",
  oplossing: "",
};

export function H1Client({ userId, userEmail }: H1ClientProps) {
  // Actieve tab / stap binnen Hoofdstuk 1
  const [activeTab, setActiveTab] = useState<"idee" | "persona" | "missie" | "dossier">("persona");

  // State voor Stap 1: Idee - Schoon en leeg voor nieuwe accounts
  const [ideeData, setIdeeData] = useState(EMPTY_IDEE);

  // State voor Stap 2: Persona - Schoon en leeg voor nieuwe accounts
  const [personaData, setPersonaData] = useState<PersonaData>(DEFAULT_PERSONA);

  // State voor Stap 3: Missie & Belofte - Schoon en leeg voor nieuwe accounts
  const [missieData, setMissieData] = useState(EMPTY_MISSIE);

  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  // Laad data per specifieke gebruiker uit localStorage
  useEffect(() => {
    try {
      const storageKey = `vsg_h1_data_${userId}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.idee) setIdeeData(parsed.idee);
        if (parsed.persona) setPersonaData(parsed.persona);
        if (parsed.missie) setMissieData(parsed.missie);
      } else {
        // Schone start voor nieuwe gebruikers
        setIdeeData(EMPTY_IDEE);
        setPersonaData(DEFAULT_PERSONA);
        setMissieData(EMPTY_MISSIE);
      }
    } catch (e) {
      console.error("Fout bij laden van opgeslagen data:", e);
    }
  }, [userId]);

  const handleSaveAll = () => {
    try {
      const fullData = {
        idee: ideeData,
        persona: personaData,
        missie: missieData,
        updatedAt: new Date().toISOString(),
      };
      const storageKey = `vsg_h1_data_${userId}`;
      localStorage.setItem(storageKey, JSON.stringify(fullData));
      setSavedStatus("Alles succesvol opgeslagen! 🎉");
      setTimeout(() => setSavedStatus(null), 4000);
    } catch (e) {
      console.error(e);
    }
  };

  // Mad-libs samengestelde missiezin
  const completeMissionStatement = `Ik help ${missieData.doelgroep || "mijn ideale klanten"} om ${missieData.resultaat || "hun doel te bereiken"}, zelfs als ${missieData.angst || "ze tegen obstakels aanlopen"}, door middel van ${missieData.oplossing || "mijn unieke aanbod"}.`;

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text)] pb-16">
      
      {/* Top Header */}
      <header className="border-b border-black/10 dark:border-white/10 bg-[var(--surface)]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard" 
              className="text-xs sm:text-sm font-semibold opacity-70 hover:opacity-100 transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Dashboard
            </Link>
            <div className="h-4 w-px bg-black/15 dark:bg-white/15 hidden sm:block" />
            <span className="text-xs font-bold text-gradient-brand hidden sm:inline-block">
              Hoofdstuk 1: Het Denkwerk
            </span>
          </div>

          <div className="flex items-center gap-3">
            {savedStatus && (
              <span className="text-xs font-bold text-emerald-500 animate-pulse">
                {savedStatus}
              </span>
            )}
            <button
              onClick={handleSaveAll}
              className="text-xs px-3 py-1.5 rounded-lg bg-[var(--section-bg)] border border-black/10 dark:border-white/10 font-bold hover:border-[#dfb25a] transition flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-3.5 h-3.5 text-[#dfb25a]" /> Opslaan
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Banner & Tab Navigatie */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-4">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#dfb25a] mb-1">
            <Trophy className="w-4 h-4" /> Fundament van je onderneming
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gradient-brand">
            Hoofdstuk 1: Het Denkwerk
          </h1>
          <p className="text-sm opacity-75 mt-1 max-w-2xl">
            Bouw je idee om tot een ijzersterk fundament. Maak kennis met je ideale klant via de interactieve Persona Studio en formuleer een onweerstaanbare missie.
          </p>
        </div>

        {/* Tab Navigatie Balk */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-black/10 dark:border-white/10 no-scrollbar">
          <button
            onClick={() => setActiveTab("idee")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === "idee"
                ? "bg-gradient-brand text-white shadow-md"
                : "bg-[var(--section-bg)] opacity-70 hover:opacity-100"
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>1. Je Idee &amp; Aanbod</span>
          </button>

          <button
            onClick={() => setActiveTab("persona")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === "persona"
                ? "bg-gradient-brand text-white shadow-md"
                : "bg-[var(--section-bg)] opacity-70 hover:opacity-100"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>2. Persona Studio &amp; Paspoort</span>
          </button>

          <button
            onClick={() => setActiveTab("missie")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === "missie"
                ? "bg-gradient-brand text-white shadow-md"
                : "bg-[var(--section-bg)] opacity-70 hover:opacity-100"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>3. Missie &amp; Belofte</span>
          </button>

          <button
            onClick={() => setActiveTab("dossier")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === "dossier"
                ? "bg-gradient-brand text-white shadow-md"
                : "bg-[var(--section-bg)] opacity-70 hover:opacity-100"
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>4. Compleet Denkwerk Dossier</span>
          </button>
        </div>
      </div>

      {/* Tab Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
        
        {/* ================= TAB 1: IDEE & AANBOD ================= */}
        {activeTab === "idee" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-[var(--section-bg)] p-6 sm:p-8 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-black text-gradient-brand flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[#dfb25a]" /> Stap 1: Van vaag idee naar scherp aanbod
                </h2>
                <p className="text-xs sm:text-sm opacity-75 mt-1 leading-relaxed">
                  Denk niet in termen van &ldquo;een bedrijf starten&rdquo;, maar in <strong>één concreet aanbod voor één specifieke groep mensen</strong>.
                </p>
              </div>

              {/* Vraag 1 */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#dfb25a] block">
                  1. Wat ga je precies doen of verkopen? (Je kernaanbod)
                </label>
                <p className="text-xs opacity-70">
                  Hou het zo simpel mogelijk. Geen jargon.
                </p>
                <textarea
                  rows={2}
                  value={ideeData.aanbod}
                  onChange={(e) => setIdeeData({ ...ideeData, aanbod: e.target.value })}
                  placeholder="Bijv. Vloerverwarming installeren binnen 1 dag voor particulieren..."
                  className="w-full bg-[var(--surface)] border border-black/15 dark:border-white/20 p-3.5 rounded-xl font-medium focus:outline-none focus:border-[#dfb25a] text-sm"
                />
              </div>

              {/* Vraag 2 */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#dfb25a] block">
                  2. Voor wie is dit primair bedoeld?
                </label>
                <p className="text-xs opacity-70">
                  Wie heeft de hoogste nood of de grootste wens voor dit aanbod?
                </p>
                <input
                  type="text"
                  value={ideeData.doelgroepKort}
                  onChange={(e) => setIdeeData({ ...ideeData, doelgroepKort: e.target.value })}
                  placeholder="Bijv. Jonge gezinnen die net een klushuis hebben gekocht..."
                  className="w-full bg-[var(--surface)] border border-black/15 dark:border-white/20 p-3 rounded-xl font-medium focus:outline-none focus:border-[#dfb25a] text-sm"
                />
              </div>

              {/* Vraag 3 */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#dfb25a] block">
                  3. Waarom jij? (Jouw oneerlijke voordeel)
                </label>
                <p className="text-xs opacity-70">
                  Wat maakt jou sneller, betrouwbaarder of geschikter dan een willekeurige concurrent?
                </p>
                <textarea
                  rows={2}
                  value={ideeData.waaromJij}
                  onChange={(e) => setIdeeData({ ...ideeData, waaromJij: e.target.value })}
                  placeholder="Bijv. Ik garandeer installatie binnen 2 weken en werk 100% stofarm..."
                  className="w-full bg-[var(--surface)] border border-black/15 dark:border-white/20 p-3.5 rounded-xl font-medium focus:outline-none focus:border-[#dfb25a] text-sm"
                />
              </div>

              <div className="pt-4 border-t border-black/5 dark:border-white/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTab("persona")}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-brand text-white flex items-center gap-1.5 hover:opacity-90 shadow-md transition"
                >
                  Naar de Persona Studio <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: PERSONA BUILDER (DE GAME) ================= */}
        {activeTab === "persona" && (
          <div>
            <PersonaWizard 
              initialPersona={personaData} 
              onSave={(updated) => {
                setPersonaData(updated);
                handleSaveAll();
              }} 
            />

            <div className="mt-8 flex justify-between items-center bg-[var(--section-bg)] p-4 rounded-xl border border-black/5 dark:border-white/10">
              <button
                onClick={() => setActiveTab("idee")}
                className="text-xs px-4 py-2 rounded-lg bg-[var(--surface)] border border-black/10 dark:border-white/10 font-medium hover:opacity-80 transition"
              >
                ← Terug naar Stap 1 (Idee)
              </button>

              <button
                onClick={() => setActiveTab("missie")}
                className="text-xs px-5 py-2.5 rounded-lg bg-gradient-brand text-white font-bold hover:opacity-90 transition flex items-center gap-1.5 shadow-sm"
              >
                Door naar Stap 3 (Missie &amp; Belofte) <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 3: MISSIE & BELOFTE (MAD-LIBS) ================= */}
        {activeTab === "missie" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-[var(--section-bg)] p-6 sm:p-8 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-black text-gradient-brand flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#dfb25a]" /> Stap 3: Jouw Onweerstaanbare Belofte (Mad-Libs Formule)
                </h2>
                <p className="text-xs sm:text-sm opacity-75 mt-1 leading-relaxed">
                  Geen stoffige corporatie-teksten, maar een glasheldere belofte die direct op je website en in offertes kan worden geplaatst.
                </p>
              </div>

              {/* Mad Libs Invulvelden */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfb25a]">
                    1. Wie help je? (Doelgroep)
                  </label>
                  <input
                    type="text"
                    value={missieData.doelgroep}
                    onChange={(e) => setMissieData({ ...missieData, doelgroep: e.target.value })}
                    className="w-full bg-[var(--surface)] border border-black/15 dark:border-white/20 p-2.5 rounded-xl font-medium focus:outline-none focus:border-[#dfb25a] text-xs"
                    placeholder="jonge gezinnen en verhuizers"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfb25a]">
                    2. Welk droomresultaat bereiken ze?
                  </label>
                  <input
                    type="text"
                    value={missieData.resultaat}
                    onChange={(e) => setMissieData({ ...missieData, resultaat: e.target.value })}
                    className="w-full bg-[var(--surface)] border border-black/15 dark:border-white/20 p-2.5 rounded-xl font-medium focus:outline-none focus:border-[#dfb25a] text-xs"
                    placeholder="een warme, energiezuinige vloer"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfb25a]">
                    3. Zelfs als... (Grootste angst / pijnpunt)
                  </label>
                  <input
                    type="text"
                    value={missieData.angst}
                    onChange={(e) => setMissieData({ ...missieData, angst: e.target.value })}
                    className="w-full bg-[var(--surface)] border border-black/15 dark:border-white/20 p-2.5 rounded-xl font-medium focus:outline-none focus:border-[#dfb25a] text-xs"
                    placeholder="ze spoed hebben en krap bij ouders wonen"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfb25a]">
                    4. Door middel van... (Jouw werkwijze/aanbod)
                  </label>
                  <input
                    type="text"
                    value={missieData.oplossing}
                    onChange={(e) => setMissieData({ ...missieData, oplossing: e.target.value })}
                    className="w-full bg-[var(--surface)] border border-black/15 dark:border-white/20 p-2.5 rounded-xl font-medium focus:outline-none focus:border-[#dfb25a] text-xs"
                    placeholder="onze 2-weken spoedmontage en stofarm frezen"
                  />
                </div>
              </div>

              {/* Live Preview van de Samengestelde Missiezin */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#dfb25a]/15 to-[#a16e38]/15 border-2 border-[#dfb25a]/40 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#dfb25a] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Jouw Officiële Elevator Pitch &amp; Hero Tekst
                </span>
                <p className="text-sm sm:text-base font-extrabold leading-relaxed text-white dark:text-white">
                  &ldquo;{completeMissionStatement}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-black/5 dark:border-white/10 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setActiveTab("persona")}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium bg-[var(--surface)] border border-black/10 dark:border-white/10 hover:opacity-80 transition"
                >
                  ← Terug naar Persona Studio
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("dossier")}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-brand text-white flex items-center gap-1.5 hover:opacity-90 shadow-md transition"
                >
                  Bekijk Compleet Dossier <FileCheck className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: COMPLEET DENKWERK DOSSIER ================= */}
        {activeTab === "dossier" && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Voltooiings Banner */}
            <div className="bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-emerald-500/20 border-2 border-emerald-500/40 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-lg">
                  <Trophy className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">
                    Gefeliciteerd! Hoofdstuk 1 is Voltooid! 🎉
                  </h3>
                  <p className="text-xs text-white/80 mt-0.5">
                    Je fundament staat als een huis: een concreet aanbod, een uitgedokterde klantpersona en een ijzersterke belofte.
                  </p>
                </div>
              </div>

              <button
                onClick={handleSaveAll}
                className="px-6 py-3 rounded-xl bg-gradient-brand text-white font-extrabold text-xs shadow-lg hover:opacity-90 transition shrink-0 flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Alles Opslaan in Account
              </button>
            </div>

            {/* Dossier Samenvatting Kaarten */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Blok 1: Idee */}
              <div className="bg-[var(--section-bg)] p-5 rounded-2xl border border-black/5 dark:border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#dfb25a]">
                  <Lightbulb className="w-4 h-4" /> 1. Aanbod &amp; Voordeel
                </div>
                <div className="text-xs space-y-2">
                  <div>
                    <span className="opacity-60 block text-[10px]">Aanbod:</span>
                    <strong className="block text-sm">{ideeData.aanbod}</strong>
                  </div>
                  <div>
                    <span className="opacity-60 block text-[10px]">Doelgroep:</span>
                    <p className="opacity-90">{ideeData.doelgroepKort}</p>
                  </div>
                  <div>
                    <span className="opacity-60 block text-[10px]">Waarom jij:</span>
                    <p className="opacity-90">{ideeData.waaromJij}</p>
                  </div>
                </div>
              </div>

              {/* Blok 2: Persona Samenvatting */}
              <div className="bg-[var(--section-bg)] p-5 rounded-2xl border border-black/5 dark:border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#dfb25a]">
                  <UserCheck className="w-4 h-4" /> 2. Persona Paspoort
                </div>
                <div className="text-xs space-y-1.5">
                  <div className="font-extrabold text-sm">{personaData.name}</div>
                  <div className="opacity-80">
                    {personaData.gender === "man" ? "Man" : "Vrouw"} • {personaData.ageGroup} jr • {personaData.jobSector}
                  </div>
                  <div className="text-emerald-500 font-semibold capitalize">
                    Inkomen: {personaData.incomeLevel}
                  </div>
                  <div className="text-amber-500 font-semibold capitalize">
                    Koopmotief: {personaData.coreMotivation}
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => setActiveTab("persona")}
                      className="text-[11px] text-[#dfb25a] underline font-bold"
                    >
                      Bekijk volledig Klantpaspoort →
                    </button>
                  </div>
                </div>
              </div>

              {/* Blok 3: Missie Pitch */}
              <div className="bg-[var(--section-bg)] p-5 rounded-2xl border border-black/5 dark:border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#dfb25a]">
                  <Compass className="w-4 h-4" /> 3. De Belofte
                </div>
                <p className="text-xs italic leading-relaxed opacity-90">
                  &ldquo;{completeMissionStatement}&rdquo;
                </p>
                <div className="pt-2">
                  <Link
                    href="/h2"
                    className="inline-block text-xs font-bold text-gradient-brand underline"
                  >
                    Ga naar Hoofdstuk 2 (De Basis &amp; KvK) →
                  </Link>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

    </div>
  );
}
