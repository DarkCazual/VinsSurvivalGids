"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NaamTester } from "@/components/h2/NaamTester";
import { RechtsvormKeuzehulp } from "@/components/h2/RechtsvormKeuzehulp";
import { KorWijzer } from "@/components/h2/KorWijzer";
import { SbiOmschrijver } from "@/components/h2/SbiOmschrijver";
import { KvkDossier } from "@/components/h2/KvkDossier";
import { PersonaKompas } from "@/components/h2/PersonaKompas";
import { H2Data, DEFAULT_H2_DATA, NameOption, LegalForm, KorChoice } from "@/components/h2/types";
import { 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  Sparkles, 
  Crown, 
  CheckCircle2, 
  Scale, 
  Percent, 
  FileText, 
  FileCheck, 
  Swords, 
  ShieldCheck 
} from "lucide-react";

interface H2ClientProps {
  userEmail: string;
}

export function H2Client({ userEmail }: H2ClientProps) {
  const [activeTab, setActiveTab] = useState<"naamtester" | "rechtsvorm" | "kor" | "activiteiten" | "dossier">("naamtester");
  const [h2Data, setH2Data] = useState<H2Data>(DEFAULT_H2_DATA);
  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  // Laad data uit localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("vsg_h2_data");
      if (saved) {
        setH2Data(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Fout bij laden van H2 data:", e);
    }
  }, []);

  const handleSave = () => {
    try {
      const updated = {
        ...h2Data,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem("vsg_h2_data", JSON.stringify(updated));
      
      // Sla ook de winnende naam op in centrale brand context
      if (h2Data.winningName) {
        localStorage.setItem("vsg_brand_name", h2Data.winningName);
      }

      setSavedStatus("Alles succesvol opgeslagen! 🎉");
      setTimeout(() => setSavedStatus(null), 4000);
    } catch (e) {
      console.error("Fout bij opslaan:", e);
    }
  };

  const updateNameOption = (id: string, updated: Partial<NameOption>) => {
    setH2Data((prev) => {
      const newNames = prev.names.map((item) => (item.id === id ? { ...item, ...updated } : item));
      const next = { ...prev, names: newNames };
      try {
        localStorage.setItem("vsg_h2_data", JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const selectWinner = (winningName: string) => {
    setH2Data((prev) => {
      const next = {
        ...prev,
        winningName,
        checklist: {
          ...prev.checklist,
          nameFinalized: true,
        },
      };
      try {
        localStorage.setItem("vsg_h2_data", JSON.stringify(next));
        localStorage.setItem("vsg_brand_name", winningName);
      } catch (e) {}
      return next;
    });
    setSavedStatus(`'${winningName}' gekroond tot officiële naam! 👑`);
    setTimeout(() => setSavedStatus(null), 4000);
  };

  const updateLegalForm = (legalForm: LegalForm) => {
    setH2Data((prev) => {
      const next = {
        ...prev,
        legalForm,
        checklist: {
          ...prev.checklist,
          legalFormDecided: true,
        },
      };
      try {
        localStorage.setItem("vsg_h2_data", JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const updateKorChoice = (korChoice: KorChoice) => {
    setH2Data((prev) => {
      const next = {
        ...prev,
        korChoice,
        checklist: {
          ...prev.checklist,
          korDecided: korChoice !== "uitzoeken",
        },
      };
      try {
        localStorage.setItem("vsg_h2_data", JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const updateChecklistItem = (key: keyof H2Data["checklist"], val: boolean) => {
    setH2Data((prev) => {
      const next = {
        ...prev,
        checklist: {
          ...prev.checklist,
          [key]: val,
        },
      };
      try {
        localStorage.setItem("vsg_h2_data", JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text)] pb-20 selection:bg-[#dfb25a] selection:text-black">
      
      {/* Top Header */}
      <header className="border-b border-black/10 dark:border-white/10 bg-[var(--surface)]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard" 
              className="text-xs sm:text-sm font-semibold opacity-70 hover:opacity-100 transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Dashboard
            </Link>

            <div className="h-4 w-px bg-black/15 dark:bg-white/15 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gradient-brand hidden sm:inline-block">
                Hoofdstuk 2: De Basis
              </span>
              {h2Data.winningName && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#dfb25a]/20 text-[#dfb25a] font-black border border-[#dfb25a]/30 flex items-center gap-1 shadow-sm">
                  <Crown className="w-3 h-3 fill-[#dfb25a]" /> {h2Data.winningName}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {savedStatus && (
              <span className="text-xs font-bold text-emerald-400 animate-pulse hidden sm:inline-block">
                {savedStatus}
              </span>
            )}
            
            <button
              onClick={handleSave}
              className="text-xs px-3.5 py-1.5 rounded-lg bg-[var(--section-bg)] border border-black/10 dark:border-white/10 font-bold hover:border-[#dfb25a] transition flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-3.5 h-3.5 text-[#dfb25a]" /> Opslaan
            </button>

            <ThemeToggle />
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-6 sm:space-y-8">
        
        {/* Navigatie Tabs per Onderdeel */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[var(--section-bg)] border border-black/10 dark:border-white/10 overflow-x-auto shadow-sm">
          
          <button
            onClick={() => setActiveTab("naamtester")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap shrink-0 ${
              activeTab === "naamtester"
                ? "bg-[#dfb25a] text-black shadow-md font-black"
                : "opacity-75 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            <span>1. Naamtester</span>
            {h2Data.winningName && <Crown className="w-3 h-3 fill-current ml-0.5" />}
          </button>

          <button
            onClick={() => setActiveTab("rechtsvorm")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap shrink-0 ${
              activeTab === "rechtsvorm"
                ? "bg-[#dfb25a] text-black shadow-md font-black"
                : "opacity-75 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>2. Rechtsvorm Keuze</span>
          </button>

          <button
            onClick={() => setActiveTab("kor")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap shrink-0 ${
              activeTab === "kor"
                ? "bg-[#dfb25a] text-black shadow-md font-black"
                : "opacity-75 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <Percent className="w-3.5 h-3.5" />
            <span>3. KOR-Wijzer</span>
          </button>

          <button
            onClick={() => setActiveTab("activiteiten")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap shrink-0 ${
              activeTab === "activiteiten"
                ? "bg-[#dfb25a] text-black shadow-md font-black"
                : "opacity-75 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>4. Adres &amp; Activiteiten</span>
          </button>

          <button
            onClick={() => setActiveTab("dossier")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap shrink-0 ${
              activeTab === "dossier"
                ? "bg-[#dfb25a] text-black shadow-md font-black"
                : "opacity-75 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>5. KvK Inschrijf-Dossier</span>
          </button>

        </div>

        {/* Tab Content Rendering */}
        <div className="transition-all duration-200">
          {activeTab === "naamtester" && (
            <NaamTester
              names={h2Data.names}
              winningName={h2Data.winningName}
              onUpdateName={updateNameOption}
              onSelectWinner={selectWinner}
            />
          )}

          {activeTab === "rechtsvorm" && (
            <RechtsvormKeuzehulp
              selectedForm={h2Data.legalForm}
              onSelectForm={updateLegalForm}
            />
          )}

          {activeTab === "kor" && (
            <KorWijzer
              korChoice={h2Data.korChoice}
              onSelectChoice={updateKorChoice}
            />
          )}

          {activeTab === "activiteiten" && (
            <SbiOmschrijver
              businessAddress={h2Data.businessAddress}
              postalCity={h2Data.postalCity}
              activitiesDescription={h2Data.activitiesDescription}
              onChangeAddress={(addr) => setH2Data((p) => ({ ...p, businessAddress: addr }))}
              onChangePostalCity={(city) => setH2Data((p) => ({ ...p, postalCity: city }))}
              onChangeActivities={(desc) => setH2Data((p) => ({ ...p, activitiesDescription: desc }))}
            />
          )}

          {activeTab === "dossier" && (
            <KvkDossier
              data={h2Data}
              onUpdateChecklist={updateChecklistItem}
            />
          )}
        </div>

        {/* Volgende / Vorige Stappen Footer */}
        <div className="pt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-xs opacity-75">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Automatisch bewaard in jouw browser.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {activeTab !== "naamtester" && (
              <button
                type="button"
                onClick={() => {
                  if (activeTab === "rechtsvorm") setActiveTab("naamtester");
                  if (activeTab === "kor") setActiveTab("rechtsvorm");
                  if (activeTab === "activiteiten") setActiveTab("kor");
                  if (activeTab === "dossier") setActiveTab("activiteiten");
                }}
                className="py-2.5 px-4 rounded-xl bg-[var(--section-bg)] border border-black/15 dark:border-white/15 text-xs font-bold hover:border-[#dfb25a] transition"
              >
                ← Vorige stap
              </button>
            )}

            {activeTab !== "dossier" ? (
              <button
                type="button"
                onClick={() => {
                  if (activeTab === "naamtester") setActiveTab("rechtsvorm");
                  if (activeTab === "rechtsvorm") setActiveTab("kor");
                  if (activeTab === "kor") setActiveTab("activiteiten");
                  if (activeTab === "activiteiten") setActiveTab("dossier");
                }}
                className="flex-1 sm:flex-initial py-2.5 px-5 rounded-xl bg-[#dfb25a] text-black text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md hover:brightness-110 transition"
              >
                <span>Volgende stap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                href="/dashboard"
                className="flex-1 sm:flex-initial py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#dfb25a] to-[#f7d57f] text-black text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:brightness-110 transition"
              >
                <span>Klaar met Hoofdstuk 2! Terug naar Dashboard</span>
                <Sparkles className="w-4 h-4 fill-black" />
              </Link>
            )}
          </div>
        </div>

      </main>

      {/* Zwevend Persona-Kompas */}
      <PersonaKompas />

    </div>
  );
}
