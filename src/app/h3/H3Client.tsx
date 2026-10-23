"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PersonaKompas } from "@/components/h2/PersonaKompas";
import { LogoLijst } from "@/components/h3/LogoLijst";
import { LogoGenerator } from "@/components/h3/LogoGenerator";
import { KleurenPalet } from "@/components/h3/KleurenPalet";
import { TypografieMatcher } from "@/components/h3/TypografieMatcher";
import { FotografiePatronen } from "@/components/h3/FotografiePatronen";
import { HuisstijlDocument } from "@/components/h3/HuisstijlDocument";
import { BrandRevealModal } from "@/components/h3/BrandRevealModal";
import { 
  H3Data, 
  DEFAULT_H3_DATA, 
  LogoLijstData,
  LogoGeneratorData,
  ColorPaletteData,
  TypographyData,
  BrandImageryData
} from "@/components/h3/types";
import { 
  ArrowLeft, 
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
  EyeOff,
  Layers,
  Check
} from "lucide-react";

export type H3Tab = "lijst" | "generator" | "kleuren" | "typografie" | "beeld" | "huisstijl";

interface H3ClientProps {
  userId: string;
  userEmail: string;
  initialTab?: H3Tab;
}

export function H3Client({ userId, userEmail, initialTab = "lijst" }: H3ClientProps) {
  const [activeTab, setActiveTab] = useState<H3Tab>(initialTab);
  const [h3Data, setH3Data] = useState<H3Data>(DEFAULT_H3_DATA);
  const [savedStatus, setSavedStatus] = useState<string | null>(null);
  const [useCustomStyle, setUseCustomStyle] = useState(false);
  const [showRevealModal, setShowRevealModal] = useState(false);

  // Laad data per gebruiker en haal eventueel de bedrijfsnaam uit H2 / centrale brand state
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
          ...DEFAULT_H3_DATA,
          ...parsed,
          companyName: parsed.companyName || storedBrandName,
        });
      } else {
        setH3Data({
          ...DEFAULT_H3_DATA,
          companyName: storedBrandName,
        });
      }

      // Check of custom style actief was
      const storedStylePref = localStorage.getItem(`vsg_custom_style_active_${userId}`);
      if (storedStylePref === "true") {
        setUseCustomStyle(true);
      }
    } catch (e) {
      console.error("Fout bij laden van H3 data:", e);
    }
  }, [userId]);

  // CSS Variabelen injectie bij "Bekijk in mijn stijl"
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    if (useCustomStyle && h3Data.colors.isConfirmed) {
      root.style.setProperty("--brand-primary-start", h3Data.colors.primary);
      root.style.setProperty("--brand-primary-end", h3Data.colors.accent);
      root.style.setProperty("--brand-dark", h3Data.colors.dark);
      root.style.setProperty("--brand-light", h3Data.colors.light);
      if (h3Data.typography.headingFont) {
        root.style.setProperty("--font-heading", h3Data.typography.headingFont);
      }
      if (h3Data.typography.bodyFont) {
        root.style.setProperty("--font-body", h3Data.typography.bodyFont);
      }
    } else {
      root.style.removeProperty("--brand-primary-start");
      root.style.removeProperty("--brand-primary-end");
      root.style.removeProperty("--brand-dark");
      root.style.removeProperty("--brand-light");
      root.style.removeProperty("--font-heading");
      root.style.removeProperty("--font-body");
    }

    try {
      localStorage.setItem(`vsg_custom_style_active_${userId}`, String(useCustomStyle));
    } catch (e) {}
  }, [useCustomStyle, h3Data.colors, h3Data.typography, userId]);

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

  // State update helpers met directe localStorage synchronisatie
  const updateLijst = (updatedLijst: LogoLijstData) => {
    setH3Data((prev) => {
      const next = { ...prev, lijst: updatedLijst, updatedAt: new Date().toISOString() };
      try {
        localStorage.setItem(`vsg_h3_data_${userId}`, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const updateLogo = (updatedLogo: LogoGeneratorData) => {
    setH3Data((prev) => {
      const next = { ...prev, logo: updatedLogo, updatedAt: new Date().toISOString() };
      try {
        localStorage.setItem(`vsg_h3_data_${userId}`, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const updateColors = (updatedColors: ColorPaletteData) => {
    setH3Data((prev) => {
      const next = { ...prev, colors: updatedColors, updatedAt: new Date().toISOString() };
      try {
        localStorage.setItem(`vsg_h3_data_${userId}`, JSON.stringify(next));
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("vsg_brand_style_changed"));
        }
      } catch (e) {}
      return next;
    });
  };

  const updateTypography = (updatedTypography: TypographyData) => {
    setH3Data((prev) => {
      const next = { ...prev, typography: updatedTypography, updatedAt: new Date().toISOString() };
      try {
        localStorage.setItem(`vsg_h3_data_${userId}`, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const updateImagery = (updatedImagery: BrandImageryData) => {
    setH3Data((prev) => {
      const next = { ...prev, imagery: updatedImagery, updatedAt: new Date().toISOString() };
      try {
        localStorage.setItem(`vsg_h3_data_${userId}`, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // Automatische check of alle stappen klaar zijn voor het onthulmoment
  const isCoreReady = Boolean(
    h3Data.companyName && 
    h3Data.logo.selectedLogoType && 
    h3Data.colors.isConfirmed && 
    h3Data.typography.isConfirmed
  );

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
      isReady: h3Data.isRevealed || isCoreReady
    },
  ];

  const handleRevealClose = () => {
    setShowRevealModal(false);
    setH3Data(prev => {
      const next = { ...prev, isRevealed: true };
      try {
        localStorage.setItem(`vsg_h3_data_${userId}`, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const handleRevealViewDocument = () => {
    handleRevealClose();
    setActiveTab("huisstijl");
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text)] pb-24 transition-colors duration-500">
      
      {/* Zwevend Persona Kompas aan de zijkant */}
      <PersonaKompas userId={userId} />

      {/* Brand Reveal Onthulmoment Modal */}
      <BrandRevealModal
        isOpen={showRevealModal}
        data={h3Data}
        onClose={handleRevealClose}
        onViewDocument={handleRevealViewDocument}
      />

      {/* Top Header */}
      <header className="border-b border-black/10 dark:border-white/10 bg-[var(--section-bg)]/85 backdrop-blur-md sticky top-0 z-30 px-4 py-3.5 shadow-sm transition-colors">
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

          <div className="flex items-center gap-2 sm:gap-2.5">
            {h3Data.companyName && (
              <span className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dfb25a]/15 text-[#dfb25a] text-xs font-black border border-[#dfb25a]/30 shadow-xs">
                <Crown className="w-3.5 h-3.5 text-[#dfb25a]" />
                {h3Data.companyName}
              </span>
            )}

            {/* "Bekijk in mijn stijl" / "Bekijk in basisstijl" toggle uit sectie 5.3 van de master spec */}
            {h3Data.colors.isConfirmed && (
              <button
                type="button"
                onClick={() => setUseCustomStyle(!useCustomStyle)}
                title="Wissel tussen de standaard stijl en jouw eigen gekozen huisstijl"
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                  useCustomStyle 
                    ? "bg-[#dfb25a] text-black border-[#dfb25a] font-black"
                    : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 opacity-80 hover:opacity-100"
                }`}
              >
                {useCustomStyle ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span className="hidden lg:inline">
                  {useCustomStyle ? "Mijn stijl actief" : "Bekijk in mijn stijl"}
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={handleSave}
              className="px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-500 border border-black/10 dark:border-white/10 text-xs font-bold transition-all flex items-center gap-1.5"
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
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 relative ${
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

        {/* Stap 1: Jouw LIJST */}
        {activeTab === "lijst" && (
          <LogoLijst
            data={h3Data.lijst}
            companyName={h3Data.companyName}
            onChange={updateLijst}
            onNext={() => setActiveTab("generator")}
          />
        )}

        {/* Stap 2: Logo Concepten Generator (Zwart-wit) */}
        {activeTab === "generator" && (
          <LogoGenerator
            data={h3Data.logo}
            lijst={h3Data.lijst}
            companyName={h3Data.companyName}
            onChange={updateLogo}
            onNext={() => setActiveTab("kleuren")}
            onBack={() => setActiveTab("lijst")}
          />
        )}

        {/* Stap 3: Kleurenpalet & Harmonie-wiel */}
        {activeTab === "kleuren" && (
          <KleurenPalet
            data={h3Data.colors}
            companyName={h3Data.companyName}
            selectedLogoType={h3Data.logo.selectedLogoType}
            logoUrl={h3Data.logo.selectedLogoUrl}
            onChange={updateColors}
            onNext={() => setActiveTab("typografie")}
            onBack={() => setActiveTab("generator")}
          />
        )}

        {/* Stap 4: Typografie Matcher */}
        {activeTab === "typografie" && (
          <TypografieMatcher
            data={h3Data.typography}
            colors={h3Data.colors}
            companyName={h3Data.companyName}
            onChange={updateTypography}
            onNext={() => {
              // Als kleuren en logo er al zijn, toon het onthulmoment!
              if (isCoreReady && !h3Data.isRevealed) {
                setShowRevealModal(true);
              }
              setActiveTab("beeld");
            }}
            onBack={() => setActiveTab("kleuren")}
          />
        )}

        {/* Stap 5: Fotografie & Patronen */}
        {activeTab === "beeld" && (
          <FotografiePatronen
            data={h3Data.imagery}
            onChange={updateImagery}
            onNext={() => {
              if (isCoreReady && !h3Data.isRevealed) {
                setShowRevealModal(true);
              }
              setActiveTab("huisstijl");
            }}
            onBack={() => setActiveTab("typografie")}
          />
        )}

        {/* Stap 6: Huisstijldocument & De Brand Reveal */}
        {activeTab === "huisstijl" && (
          <HuisstijlDocument
            data={h3Data}
            userId={userId}
            isCustomStyleActive={useCustomStyle}
            onToggleCustomStyle={() => setUseCustomStyle(!useCustomStyle)}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onTriggerReveal={() => setShowRevealModal(true)}
          />
        )}

      </main>
    </div>
  );
}
