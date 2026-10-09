"use client";

import React, { useState, useEffect } from "react";
import { PersonaData, DEFAULT_PERSONA } from "@/components/persona/types";
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

export function PersonaKompas() {
  const [isOpen, setIsOpen] = useState(false);
  const [persona, setPersona] = useState<PersonaData>(DEFAULT_PERSONA);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("vsg_h1_data");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.persona) {
          setPersona(parsed.persona);
        }
      }
    } catch (e) {
      console.error("Fout bij laden van persona voor kompas:", e);
    }
  }, []);

  return (
    <>
      {/* Vaste zwevende tab aan de rechterkant van het scherm */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2 pl-3 pr-2 py-2.5 rounded-l-2xl bg-gradient-to-l from-[#160c05] to-[#2a1b0b] border-y-2 border-l-2 border-[#dfb25a]/60 text-[#dfb25a] shadow-2xl hover:brightness-125 transition-all duration-300 backdrop-blur-md"
            title="Open Persona-Kompas"
          >
            <Compass className="w-5 h-5 text-[#dfb25a] animate-spin-slow" />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[10px] font-mono tracking-widest uppercase text-white/60">
                Persona Kompas
              </span>
              <span className="text-xs font-black text-white group-hover:text-[#dfb25a] transition">
                {persona.name || "Klant Sophie"}
              </span>
            </div>
            <ChevronLeft className="w-4 h-4 text-[#dfb25a]" />
          </button>
        )}
      </div>

      {/* Uitklappend paneel (Drawer) */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-[var(--surface)] border-l-2 border-[#dfb25a]/40 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
          
          <div className="p-5 sm:p-6 space-y-5">
            
            {/* Drawer Header */}
            <div className="flex justify-between items-center pb-3 border-b border-black/10 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#dfb25a]" />
                <h3 className="font-black text-base text-[var(--text)] tracking-tight">
                  Persona-Kompas
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Check-in Vraag uit het boek */}
            <div className="p-3.5 rounded-xl bg-[#dfb25a]/10 border border-[#dfb25a]/30 text-xs leading-relaxed space-y-1">
              <div className="font-extrabold text-[#dfb25a] flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                <Target className="w-3.5 h-3.5" /> De Gouden Vraag:
              </div>
              <p className="text-[var(--text)] italic font-medium">
                &ldquo;Zou <strong>{persona.name}</strong> deze naam direct snappen, vertrouwen en aanbevelen aan een vriend?&rdquo;
              </p>
            </div>

            {/* Mini Avatar Kaartje */}
            <div className="rounded-2xl p-4 bg-gradient-to-b from-[#2a170b] to-[#160b06] border border-[#dfb25a]/30 text-white space-y-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-[#dfb25a]">
                  <AvatarDisplay persona={persona} showHud={false} className="scale-75 -translate-y-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-sm font-extrabold">{persona.name}</div>
                  <div className="text-[11px] text-[#dfb25a] capitalize">
                    {persona.gender === "man" ? "Mannelijk" : "Vrouwelijk"} • {persona.ageGroup} jr
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
                  <span className="font-bold capitalize text-amber-300 truncate block">
                    {persona.coreMotivation}
                  </span>
                </div>
              </div>

              {/* Persona Quote */}
              {persona.customContext && (
                <div className="text-[11px] italic text-[#f7d57f] pt-1 leading-snug">
                  &ldquo;{persona.customContext}&rdquo;
                </div>
              )}
            </div>

            {/* Klankbord checklist */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-[11px] uppercase tracking-wider opacity-70">
                Snelle Klankbord Checklist:
              </div>
              <ul className="space-y-1.5 text-[11px] opacity-85">
                <li className="flex items-start gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Past het taalniveau bij {persona.name}?</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Klinkt het te duur of juist te goedkoop voor deze doelgroep?</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Roept de naam direct het gewenste koopmotief op?</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Drawer Footer */}
          <div className="p-5 border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full py-2 rounded-xl bg-[var(--section-bg)] border border-black/15 dark:border-white/15 text-xs font-bold hover:border-[#dfb25a] transition"
            >
              Sluit kompas
            </button>
          </div>

        </div>
      )}
    </>
  );
}
