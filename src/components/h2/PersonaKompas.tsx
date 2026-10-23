"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PersonaData } from "@/components/persona/types";
import { AvatarDisplay } from "@/components/persona/AvatarDisplay";
import { 
  Compass, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Sparkles, 
  Target, 
  Zap, 
  DollarSign, 
  UserCheck 
} from "lucide-react";

interface PersonaKompasProps {
  userId: string;
}

export function PersonaKompas({ userId }: PersonaKompasProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [persona, setPersona] = useState<PersonaData | null>(null);
  const [brandColors, setBrandColors] = useState<{ primary: string; accent: string; dark: string } | null>(null);

  useEffect(() => {
    if (!userId) {
      setPersona(null);
      setBrandColors(null);
      return;
    }

    const loadData = () => {
      try {
        const storageKey = `vsg_h1_data_${userId}`;
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.persona && parsed.persona.name?.trim()) {
            setPersona(parsed.persona);
          } else {
            setPersona(null);
          }
        } else {
          setPersona(null);
        }

        // H3 Merkkleuren laden (alleen actief als custom style aan staat)
        const isCustomActive = localStorage.getItem(`vsg_custom_style_active_${userId}`) === "true";
        const h3Raw = localStorage.getItem(`vsg_h3_data_${userId}`);
        if (h3Raw && isCustomActive) {
          const parsedH3 = JSON.parse(h3Raw);
          if (parsedH3.colors?.primary) {
            setBrandColors({
              primary: parsedH3.colors.primary,
              accent: parsedH3.colors.accent || parsedH3.colors.primary,
              dark: parsedH3.colors.dark || "#160c05"
            });
            return;
          }
        }
        setBrandColors(null);
      } catch (e) {
        console.error("Fout bij laden van persona/kleuren voor kompas:", e);
        setBrandColors(null);
      }
    };

    loadData();
    window.addEventListener("vsg_brand_style_changed", loadData);
    window.addEventListener("storage", loadData);
    return () => {
      window.removeEventListener("vsg_brand_style_changed", loadData);
      window.removeEventListener("storage", loadData);
    };
  }, [userId]);

  const primary = brandColors?.primary || "var(--brand-primary-start, #dfb25a)";
  const accent = brandColors?.accent || "var(--brand-primary-end, #a16e38)";
  const darkBg = brandColors?.dark || "var(--brand-dark, #160c05)";

  return (
    <>
      {/* Vaste zwevende tab aan de rechterkant van het scherm - reageert live op merkkleuren */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2 pl-3.5 pr-2 py-3 rounded-l-2xl border-y-2 border-l-2 shadow-2xl hover:brightness-110 transition-all duration-300 backdrop-blur-md"
            style={{
              backgroundColor: darkBg,
              borderColor: primary,
              color: primary
            }}
            title="Open Persona-Kompas"
          >
            <Compass className="w-5 h-5 animate-spin-slow" style={{ color: primary }} />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[10px] font-mono tracking-widest uppercase opacity-75">
                Persona Kompas
              </span>
              <span className="text-xs font-bold transition text-white group-hover:opacity-100">
                {persona?.name || "Nog niet ontworpen"}
              </span>
            </div>
            <ChevronLeft className="w-4 h-4" style={{ color: primary }} />
          </button>
        )}
      </div>

      {/* Uitklappend paneel (Drawer) */}
      {isOpen && (
        <div 
          className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-[var(--surface)] border-l-2 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300"
          style={{ borderColor: primary }}
        >
          
          <div className="p-5 sm:p-6 space-y-5">
            
            {/* Drawer Header */}
            <div className="flex justify-between items-center pb-3 border-b border-black/10 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5" style={{ color: primary }} />
                <h3 className="font-black text-base text-[var(--text)] tracking-tight">
                  Persona-Kompas
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition text-[var(--text)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {persona ? (
              <>
                {/* Check-in Vraag uit het boek */}
                <div 
                  className="p-3.5 rounded-xl text-xs leading-relaxed space-y-1 border"
                  style={{ 
                    backgroundColor: brandColors ? `color-mix(in srgb, ${brandColors.primary} 12%, transparent)` : "rgba(223, 178, 90, 0.12)",
                    borderColor: brandColors ? `color-mix(in srgb, ${brandColors.primary} 35%, transparent)` : "rgba(223, 178, 90, 0.35)"
                  }}
                >
                  <div 
                    className="font-extrabold flex items-center gap-1.5 text-[11px] uppercase tracking-wider"
                    style={{ color: primary }}
                  >
                    <Target className="w-3.5 h-3.5" /> De Gouden Vraag:
                  </div>
                  <p className="text-[var(--text)] italic font-medium">
                    &ldquo;Zou <strong>{persona.name}</strong> dit ontwerp en deze kleuren direct snappen, vertrouwen en aanbevelen aan een vriend?&rdquo;
                  </p>
                </div>

                {/* Mini Avatar Kaartje */}
                <div 
                  className="rounded-2xl p-4 border text-white space-y-3 shadow-lg"
                  style={{
                    backgroundColor: darkBg,
                    borderColor: brandColors ? `color-mix(in srgb, ${brandColors.primary} 35%, transparent)` : "rgba(223, 178, 90, 0.35)"
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2"
                      style={{ borderColor: primary }}
                    >
                      <AvatarDisplay persona={persona} showHud={false} className="scale-75 -translate-y-5" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-sm font-extrabold text-white">{persona.name}</div>
                      <div 
                        className="text-[11px] capitalize font-bold"
                        style={{ color: primary }}
                      >
                        {persona.gender === "man" ? "Mannelijk" : persona.gender === "vrouw" ? "Vrouwelijk" : ""} • {persona.ageGroup ? `${persona.ageGroup} jr` : ""}
                      </div>
                      <div className="text-[10px] text-white/70 capitalize">
                        {persona.jobSector} • {persona.housing}
                      </div>
                    </div>
                  </div>

                  {/* RPG Stats */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[10px]">
                    <div className="p-2 rounded-lg bg-black/30 border border-white/5 space-y-0.5">
                      <span className="text-white/60 flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-emerald-400" /> Koopkracht:
                      </span>
                      <span className="font-bold capitalize text-emerald-300">
                        {persona.incomeLevel}
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-black/30 border border-white/5 space-y-0.5">
                      <span className="text-white/60 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-400" /> Motief:
                      </span>
                      <span className="font-bold capitalize text-amber-300">
                        {persona.coreMotivation || "Kwaliteit"}
                      </span>
                    </div>
                  </div>

                  {/* Context of Frustratie Citaat */}
                  {persona.customContext && (
                    <div className="pt-1 text-[11px] italic text-white/80 border-t border-white/10">
                      &ldquo;{persona.customContext}&rdquo;
                    </div>
                  )}
                </div>

                {/* Toetsvragen voor dit hoofdstuk */}
                <div className="space-y-2 text-xs">
                  <span className="font-extrabold text-[var(--text)] uppercase text-[10px] tracking-wider block">
                    Checklist voor jouw doelgroep:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[var(--text)] opacity-85">
                    <li className="flex items-start gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Past dit logo-type bij de leefwereld van {persona.name}?</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Stralen deze kleuren de juiste emotie en betrouwbaarheid uit?</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Is de gekozen typografie helder en direct leesbaar?</span>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <div 
                className="p-5 rounded-2xl border text-xs space-y-4"
                style={{
                  backgroundColor: brandColors ? `color-mix(in srgb, ${brandColors.primary} 10%, transparent)` : "rgba(223, 178, 90, 0.1)",
                  borderColor: brandColors ? `color-mix(in srgb, ${brandColors.primary} 30%, transparent)` : "rgba(223, 178, 90, 0.3)"
                }}
              >
                <div className="flex items-center gap-2 font-extrabold text-sm" style={{ color: primary }}>
                  <Compass className="w-4 h-4" />
                  <span>Geen Klantpersona Opgeslagen</span>
                </div>
                <p className="opacity-80 leading-relaxed text-xs text-[var(--text)]">
                  Je hebt in Hoofdstuk 1 nog geen klantpersona opgeslagen voor dit account. 
                  Zodra je in Hoofdstuk 1 je ideale klant ontwerpt, kijkt deze hier realtime met je mee over je schouder bij het ontwerpen van je huisstijl!
                </p>
                <div>
                  <Link
                    href="/h1"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${primary}, ${accent})`,
                      color: "var(--on-primary, #ffffff)"
                    }}
                  >
                    Open Hoofdstuk 1 (Persona Studio) →
                  </Link>
                </div>
              </div>
            )}

          </div>

          {/* Drawer Footer */}
          <div className="p-5 border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 rounded-xl border border-black/15 dark:border-white/15 text-xs font-bold transition hover:opacity-80"
              style={{
                backgroundColor: "var(--surface)",
                color: "var(--text)"
              }}
            >
              Sluit kompas
            </button>
          </div>

        </div>
      )}
    </>
  );
}
