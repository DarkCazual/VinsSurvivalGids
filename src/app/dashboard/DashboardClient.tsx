"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BrandLogo } from "@/components/BrandLogo";
import { createClient } from "@/lib/supabase/client";
import { Lock, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

interface DashboardClientProps {
  userId: string;
  userEmail: string;
}

export function DashboardClient({ userId, userEmail }: DashboardClientProps) {
  const [h1Status, setH1Status] = useState<"not_started" | "in_progress" | "completed">("not_started");
  const [h2Status, setH2Status] = useState<"not_started" | "in_progress" | "completed">("not_started");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Laad voortgang per gebruiker
  useEffect(() => {
    if (!userId) return;

    // Verwijder eventuele oude unscoped test-keys die ooit zijn opgeslagen
    try {
      localStorage.removeItem("vsg_h1_data");
      localStorage.removeItem("vsg_h2_data");
      localStorage.removeItem("vsg_brand_name");
      localStorage.removeItem("vsg_h1_data_gast-gebruiker");
      localStorage.removeItem("vsg_h2_data_gast-gebruiker");
      localStorage.removeItem("vsg_brand_name_gast-gebruiker");
    } catch (e) {}

    try {
      const h1Raw = localStorage.getItem(`vsg_h1_data_${userId}`);
      if (h1Raw) {
        const h1 = JSON.parse(h1Raw);
        const hasAanbod = Boolean(h1.idee?.aanbod?.trim() && h1.idee?.doelgroepKort?.trim());
        const hasPersona = Boolean(h1.persona?.name?.trim() && h1.persona?.gender && h1.persona?.ageGroup);
        const hasMissie = Boolean(h1.missie?.doelgroep?.trim() && h1.missie?.resultaat?.trim());

        if (h1.isCompleted || (hasAanbod && hasPersona && hasMissie)) {
          setH1Status("completed");
        } else if (hasAanbod || hasPersona || hasMissie) {
          setH1Status("in_progress");
        } else {
          setH1Status("not_started");
        }
      } else {
        setH1Status("not_started");
      }

      const h2Raw = localStorage.getItem(`vsg_h2_data_${userId}`);
      if (h2Raw) {
        const h2 = JSON.parse(h2Raw);
        const hasName = Boolean(h2.winningName?.trim());
        const hasChecklist = Boolean(h2.checklist?.idProofReady || h2.checklist?.appointmentBooked);

        if (hasName && hasChecklist) {
          setH2Status("completed");
        } else if (hasName || hasChecklist || h2.names?.some((n: { name?: string }) => Boolean(n.name?.trim()))) {
          setH2Status("in_progress");
        } else {
          setH2Status("not_started");
        }
      } else {
        setH2Status("not_started");
      }
    } catch (e) {
      console.error("Fout bij laden van voortgang:", e);
    }
  }, [userId]);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      // Verwijder legacy localStorage keys
      localStorage.removeItem("vsg_h1_data");
      localStorage.removeItem("vsg_h2_data");
      localStorage.removeItem("vsg_brand_name");
      localStorage.removeItem("vsg_h1_data_gast-gebruiker");
      localStorage.removeItem("vsg_h2_data_gast-gebruiker");
      localStorage.removeItem("vsg_brand_name_gast-gebruiker");

      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (e) {
      console.error("Fout bij uitloggen:", e);
    } finally {
      window.location.href = "/login";
    }
  };

  const isH2Unlocked = h1Status === "completed";

  return (
    <div className="min-h-screen bg-[var(--surface)] p-6">
      <header className="max-w-4xl mx-auto flex justify-between items-center py-6 mb-8 border-b border-gray-200 dark:border-white/10">
        <BrandLogo title="Dashboard" />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <span className="text-sm font-medium opacity-80">
            {userEmail}
          </span>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isLoggingOut}
            className="text-sm font-medium text-red-600 dark:text-red-400 hover:opacity-70 transition-opacity"
          >
            {isLoggingOut ? "Bezig met uitloggen..." : "Uitloggen"}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        
        {/* Voortgangsoverzicht */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* Hoofdstuk 1 */}
          <div className="bg-[var(--section-bg)] p-6 rounded-2xl shadow-sm border border-black/10 dark:border-white/10 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#dfb25a] uppercase tracking-wider">
                  Hoofdstuk 1 • Het Denkwerk
                </span>
                {h1Status === "completed" ? (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Voltooid
                  </span>
                ) : h1Status === "in_progress" ? (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-bold border border-amber-500/30">
                    In uitvoering ⏳
                  </span>
                ) : (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 font-bold border border-blue-500/30">
                    Nog niet gestart
                  </span>
                )}
              </div>
              <h2 className="font-black text-xl mb-1 text-[var(--text)]">Je idee, Persona &amp; Belofte</h2>
              <p className="text-sm opacity-80 mb-6 leading-relaxed">
                Maak je idee concreet, ontwerp je ideale klantpaspoort in de Persona Studio en formuleer je belofte.
              </p>
            </div>

            <Link
              href="/h1"
              className="inline-flex items-center justify-center gap-2 bg-[var(--surface)] border border-black/15 dark:border-white/15 px-4 py-2.5 rounded-xl font-bold text-xs hover:border-[#dfb25a] hover:text-[#dfb25a] transition-all shadow-sm"
            >
              {h1Status === "completed" 
                ? "Open Hoofdstuk 1 (Bewerken) →" 
                : h1Status === "in_progress"
                ? "Verder met Hoofdstuk 1 →"
                : "Start Hoofdstuk 1 (Het Denkwerk) →"}
            </Link>
          </div>

          {/* Hoofdstuk 2 */}
          {isH2Unlocked ? (
            <div className="bg-gradient-to-br from-[var(--section-bg)] to-amber-950/20 p-6 rounded-2xl shadow-lg border-2 border-[#dfb25a]/50 relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#dfb25a] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#dfb25a] animate-pulse" />
                    Hoofdstuk 2 • De Basis
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#dfb25a]/20 text-[#dfb25a] font-black border border-[#dfb25a]/40">
                    {h2Status === "completed" ? "Voltooid ✓" : h2Status === "in_progress" ? "In uitvoering ⏳" : "Klaar om te starten 🚀"}
                  </span>
                </div>
                <h2 className="font-black text-xl mb-1 text-[var(--text)]">De Naamtester &amp; KvK Gids</h2>
                <p className="text-sm opacity-80 mb-6 leading-relaxed">
                  Test je bedrijfsnaam in de 3-namen battle, ontdek je rechtsvorm, doorloop de KOR-wijzer en print je KvK-spiekbriefje.
                </p>
              </div>

              <Link
                href="/h2"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#dfb25a] to-[#f7d57f] text-black px-4 py-2.5 rounded-xl font-black text-xs shadow-md hover:brightness-110 transition-all uppercase tracking-wider"
              >
                {h2Status === "completed" ? "Open Hoofdstuk 2 (KvK Dossier) →" : "Start Hoofdstuk 2 (Naam & KvK) →"}
              </Link>
            </div>
          ) : (
            <div className="bg-[var(--section-bg)] opacity-75 p-6 rounded-2xl shadow-sm border border-black/10 dark:border-white/10 relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold opacity-60 uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" /> Hoofdstuk 2 • De Basis
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-black/10 dark:bg-white/10 opacity-70 font-bold border border-black/10 dark:border-white/10">
                    Vergrendeld 🔒
                  </span>
                </div>
                <h2 className="font-bold text-xl mb-1 text-[var(--text)] opacity-80">De Naamtester &amp; KvK Gids</h2>
                <p className="text-sm opacity-70 mb-6 leading-relaxed">
                  Rond eerst Hoofdstuk 1 (je idee, persona en belofte) af om dit hoofdstuk en je KvK-voorbereiding te ontgrendelen.
                </p>
              </div>

              <Link
                href="/h1"
                className="inline-flex items-center justify-center gap-2 bg-[var(--surface)] border border-black/10 dark:border-white/10 px-4 py-2.5 rounded-xl font-medium text-xs opacity-80 hover:opacity-100 hover:border-[#dfb25a] transition-all"
              >
                Rond eerst Hoofdstuk 1 af om te ontgrendelen →
              </Link>
            </div>
          )}

        </div>

        {/* Volgende fasen preview */}
        <div className="grid gap-6 md:grid-cols-2 opacity-50">
          <div className="bg-[var(--section-bg)] p-5 rounded-2xl border border-black/5 dark:border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Hoofdstuk 3</span>
            <h3 className="font-bold text-sm text-[var(--text)]">De Visuele Identiteit</h3>
            <p className="text-xs opacity-75 mt-0.5">Logo-generator, kleurenpalet &amp; typografie.</p>
          </div>
          <div className="bg-[var(--section-bg)] p-5 rounded-2xl border border-black/5 dark:border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Hoofdstuk 4</span>
            <h3 className="font-bold text-sm text-[var(--text)]">Schrijfstijl voor AI</h3>
            <p className="text-xs opacity-75 mt-0.5">Brand-voice, tone of voice &amp; contentprompts.</p>
          </div>
        </div>

      </main>
    </div>
  );
}
