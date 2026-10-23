"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PersonaKompas } from "@/components/h2/PersonaKompas";
import { LogoLijst } from "@/components/h3/LogoLijst";
import { H3Data, DEFAULT_H3_DATA, LogoLijstData } from "@/components/h3/types";
import { 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  Sparkles, 
  ListFilter, 
  Palette, 
  Type, 
  Camera, 
  FileText, 
  CheckCircle2, 
  Crown,
  Eye,
  Layers
} from "lucide-react";

interface H3ClientProps {
  userId: string;
  userEmail: string;
}

export type H3Tab = "lijst" | "generator" | "kleuren" | "typografie" | "beeld" | "huisstijl";

export function H3Client({ userId, userEmail }: H3ClientProps) {
  const [activeTab, setActiveTab] = useState<H3Tab>("lijst");
  const [h3Data, setH3Data] = useState<H3Data>(DEFAULT_H3_DATA);
  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  // Laad data per gebruiker en haal eventueel de bedrijfsnaam uit H2
  useEffect(() => {
    try {
      // 1. Haal bedrijfsnaam op uit centrale brand state of H2 data
      const storedBrandName = localStorage.getItem(`vsg_brand_name_${userId}`) || "";

      // 2. Haal H3 data op
      const storageKey = `vsg_h3_data_${userId}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setH3Data({
          ...parsed,
          companyName: parsed.companyName || storedBrandName,
        });
      } else {
        setH3Data({
          ...DEFAULT_H3_DATA,
          companyName: storedBrandName,
        });
      }
    } catch (e) {
      console.error("Fout bij laden van H3 data:", e);
    }
  }, [userId]);

  const handleSave = () => {
    try {
      const updated = {
        ...h3Data,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(`vsg_h3_data_${userId}`, JSON.stringify(updated));
      setSavedStatus("Alles succesvol opgeslagen! 🎉");
      setTimeout(() => setSavedStatus(null), 4000);
    } catch (e) {
      console.error("Fout bij opslaan:", e);
    }
  };

  const updateLijst = (updatedLijst: LogoLijstData) => {
    setH3Data((prev) => {
      const next = { ...prev, lijst: updatedLijst };
      try {
        localStorage.setItem(`vsg_h3_data_${userId}`, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const navItems: { id: H3Tab; label: string; icon: React.ReactNode; isReady: boolean }[] = [
    { 
      id: "lijst", 
      label: "1. Jouw LIJST", 
      icon: <ListFilter className="w-4 h-4" />,
      isReady: h3Data.lijst.welTags.length >= 1 && h3Data.lijst.nietTags.length >= 1
    },
    { 
      id: "generator", 
      label: "2. Logo Generator", 
      icon: <Layers className="w-4 h-4" />,
      isReady: Boolean(h3Data.logo.selectedLogoType)
    },
    { 
      id: "kleuren", 
      label: "3. Kleurenpalet", 
      icon: <Palette className="w-4 h-4" />,
      isReady: h3Data.colors.isConfirmed
    },
    { 
      id: "typografie", 
      label: "4. Typografie", 
      icon: <Type className="w-4 h-4" />,
      isReady: h3Data.typography.isConfirmed
    },
    { 
      id: "beeld", 
      label: "5. Fotografie & Patronen", 
      icon: <Camera className="w-4 h-4" />,
      isReady: h3Data.imagery.photos.length >= 1
    },
    { 
      id: "huisstijl", 
      label: "6. Huisstijl & Reveal", 
      icon: <FileText className="w-4 h-4" />,
      isReady: h3Data.isRevealed
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text)] pb-20">
      
      {/* Zwevend Persona Kompas aan de zijkant */}
      <PersonaKompas userId={userId} />

      {/* Top Header */}
      <header className="border-b border-black/10 dark:border-white/10 bg-[var(--section-bg)]/80 backdrop-blur-md sticky top-0 z-30 px-4 py-3.5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all text-sm font-bold flex items-center gap-1.5 opacity-80 hover:opacity-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <div className="h-4 w-px bg-black/10 dark:bg-white/10" />
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#dfb25a] block">
                Hoofdstuk 3
              </span>
              <h1 className="font-extrabold text-sm sm:text-base tracking-tight leading-none">
                De Visuele Identiteit
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {h3Data.companyName && (
              <span className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#dfb25a]/15 text-[#dfb25a] text-xs font-black border border-[#dfb25a]/30">
                <Crown className="w-3.5 h-3.5 text-[#dfb25a]" />
                {h3Data.companyName}
              </span>
            )}

            <button
              type="button"
              onClick={handleSave}
              className="px-3 py-1.5 rounded-xl bg-black/10 dark:bg-white/10 hover:bg-emerald-500/20 hover:text-emerald-500 border border-black/10 dark:border-white/10 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Opslaan</span>
            </button>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hoofdcontainer */}
      <main className="max-w-6xl mx-auto px-4 pt-6 space-y-6">
        
        {/* Notificatie Toast */}
        {savedStatus && (
          <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 font-bold text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{savedStatus}</span>
          </div>
        )}

        {/* Stappen Navigatie Tab Bar */}
        <div className="bg-[var(--section-bg)] p-2 rounded-2xl border border-black/10 dark:border-white/10 shadow-sm overflow-x-auto">
          <div className="flex gap-1.5 min-w-max">
            {navItems.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 relative ${
                    isActive
                      ? "bg-gradient-to-r from-[#dfb25a] to-[#f7d57f] text-black shadow-md font-black"
                      : "hover:bg-black/5 dark:hover:bg-white/5 opacity-75 hover:opacity-100"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.isReady && (
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-black" : "bg-emerald-400"}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Actieve Tab Inhoud */}
        {activeTab === "lijst" && (
          <LogoLijst
            data={h3Data.lijst}
            companyName={h3Data.companyName}
            onChange={updateLijst}
            onNext={() => setActiveTab("generator")}
          />
        )}

        {activeTab === "generator" && (
          <div className="bg-[var(--section-bg)] p-8 rounded-2xl border border-black/10 dark:border-white/10 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#dfb25a]/20 text-[#dfb25a] flex items-center justify-center mx-auto border border-[#dfb25a]/40">
              <Layers className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-black">Stap 2: Logo Concepten Generator (Zwart-wit)</h2>
            <p className="text-xs opacity-75 max-w-lg mx-auto leading-relaxed">
              Hier worden zometeen 7 archetypes gelijktijdig gegenereerd voor <strong>{h3Data.companyName || "jouw merk"}</strong> op basis van Jouw LIJST (WEL: {h3Data.lijst.welTags.join(", ") || "nog niet ingevuld"}).
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setActiveTab("lijst")}
                className="px-4 py-2 rounded-xl border border-black/15 dark:border-white/15 text-xs font-bold"
              >
                ← Terug naar Jouw LIJST
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("kleuren")}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dfb25a] to-[#f7d57f] text-black font-black text-xs uppercase"
              >
                Naar Kleurenpalet →
              </button>
            </div>
          </div>
        )}

        {activeTab === "kleuren" && (
          <div className="bg-[var(--section-bg)] p-8 rounded-2xl border border-black/10 dark:border-white/10 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/40">
              <Palette className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-black">Stap 3: Kleurenpalet &amp; Harmonie-wiel</h2>
            <p className="text-xs opacity-75 max-w-lg mx-auto leading-relaxed">
              Het interactieve kleurenwiel (complementair, monochroom, analoog) en automatische berekening van de zwart- en wit-vervangers.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setActiveTab("generator")}
                className="px-4 py-2 rounded-xl border border-black/15 dark:border-white/15 text-xs font-bold"
              >
                ← Terug naar Logo
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("typografie")}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dfb25a] to-[#f7d57f] text-black font-black text-xs uppercase"
              >
                Naar Typografie →
              </button>
            </div>
          </div>
        )}

        {activeTab === "typografie" && (
          <div className="bg-[var(--section-bg)] p-8 rounded-2xl border border-black/10 dark:border-white/10 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto border border-purple-500/40">
              <Type className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-black">Stap 4: Typografie Matcher</h2>
            <p className="text-xs opacity-75 max-w-lg mx-auto leading-relaxed">
              De live banner preview met jouw bedrijfsnaam en payoff in Serif, Sans-serif of Script.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setActiveTab("kleuren")}
                className="px-4 py-2 rounded-xl border border-black/15 dark:border-white/15 text-xs font-bold"
              >
                ← Terug naar Kleurenpalet
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("beeld")}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dfb25a] to-[#f7d57f] text-black font-black text-xs uppercase"
              >
                Naar Fotografie →
              </button>
            </div>
          </div>
        )}

        {activeTab === "beeld" && (
          <div className="bg-[var(--section-bg)] p-8 rounded-2xl border border-black/10 dark:border-white/10 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <Camera className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-black">Stap 5: Fotografie &amp; Patronen</h2>
            <p className="text-xs opacity-75 max-w-lg mx-auto leading-relaxed">
              Upload van sfeerfoto&apos;s, beeldregels (blikrichting, belichting) en iconenstijl (lijn vs. vlak).
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setActiveTab("typografie")}
                className="px-4 py-2 rounded-xl border border-black/15 dark:border-white/15 text-xs font-bold"
              >
                ← Terug naar Typografie
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("huisstijl")}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dfb25a] to-[#f7d57f] text-black font-black text-xs uppercase"
              >
                Naar Huisstijldocument →
              </button>
            </div>
          </div>
        )}

        {activeTab === "huisstijl" && (
          <div className="bg-[var(--section-bg)] p-8 rounded-2xl border border-black/10 dark:border-white/10 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-[#dfb25a] flex items-center justify-center mx-auto border border-[#dfb25a]/40">
              <Sparkles className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-black">Stap 6: Het Huisstijldocument &amp; De Reveal</h2>
            <p className="text-xs opacity-75 max-w-lg mx-auto leading-relaxed">
              Het complete downloadbare merkpaspoort (PDF) en het onthulmoment waarop het hele platform jouw stijl overneemt!
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setActiveTab("beeld")}
                className="px-4 py-2 rounded-xl border border-black/15 dark:border-white/15 text-xs font-bold"
              >
                ← Terug naar Fotografie
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
