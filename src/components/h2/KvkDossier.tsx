"use client";

import React, { useState } from "react";
import { H2Data } from "./types";
import { checkLinks } from "@/config/links";
import { 
  FileCheck, 
  CheckCircle2, 
  Printer, 
  Copy, 
  ExternalLink, 
  Calendar, 
  CreditCard, 
  MapPin, 
  Building2, 
  Scale, 
  Percent, 
  FileText,
  AlertCircle,
  Crown
} from "lucide-react";

interface KvkDossierProps {
  data: H2Data;
  onUpdateChecklist: (key: keyof H2Data["checklist"], val: boolean) => void;
}

export function KvkDossier({ data, onUpdateChecklist }: KvkDossierProps) {
  const [copied, setCopied] = useState(false);

  const { winningName, legalForm, korChoice, businessAddress, postalCity, activitiesDescription, checklist } = data;

  const handleCopyDossier = () => {
    const textToCopy = `=== KVK INSCHRIJF-SPIEKBRIEFJE (VIN'S SURVIVAL GIDS) ===
Bedrijfsnaam: ${winningName || "[Nog niet gekozen]"}
Rechtsvorm: ${legalForm.toUpperCase()}
KOR-deelname: ${korChoice === "ja" ? "Ja (btw-vrijgesteld)" : korChoice === "nee" ? "Nee (reguliere btw)" : "Nog nader te bepalen"}
Vestigingsadres: ${businessAddress || "-"}, ${postalCity || "-"}

Activiteitenomschrijving:
${activitiesDescription || "[Nog niet ingevuld]"}

Checklist:
- Geldig ID klaar: ${checklist.idProofReady ? "Ja" : "Nee"}
- KvK Afspraak gepland: ${checklist.appointmentBooked ? "Ja" : "Nog doen"}
======================================================`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      
      {/* Introductie Header */}
      <div className="bg-[var(--section-bg)] p-6 sm:p-7 rounded-2xl border border-black/10 dark:border-white/10 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-[#dfb25a] uppercase tracking-wider mb-1.5">
          <FileCheck className="w-4 h-4 text-[#dfb25a]" /> Hoofdstuk 2 • Stap 2
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-[var(--text)] tracking-tight">
          Het KvK Inschrijf-Spiekbriefje &amp; Checklist
        </h2>
        <p className="text-sm opacity-80 mt-1 max-w-2xl leading-relaxed">
          Alles wat je in Hoofdstuk 2 hebt ingevuld komt hier samen op één overzichtelijk spiekbriefje. 
          Leg dit naast je wanneer je de officiële online vooraanmelding op KvK.nl invult, 
          of print het uit voor je fysieke afspraak!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kolom 1: De Officiële KvK Checklist */}
        <div className="lg:col-span-1 bg-[var(--section-bg)] p-6 rounded-2xl border border-black/10 dark:border-white/10 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text)]">
              <Calendar className="w-4 h-4 text-[#dfb25a]" />
              <span>Stappenplan voor je afspraak</span>
            </div>

            <div className="space-y-2.5">
              
              {/* 1. ID bewijs */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={checklist.idProofReady}
                  onChange={(e) => onUpdateChecklist("idProofReady", e.target.checked)}
                  className="mt-0.5 rounded text-[#dfb25a]"
                />
                <div className="flex-1">
                  <div className="font-bold">Geldig paspoort of ID-kaart klaarliggen</div>
                  <div className="text-[10px] opacity-70 mt-0.5">
                    Let op: een rijbewijs wordt bij inschrijving NIET altijd geaccepteerd!
                  </div>
                </div>
              </label>

              {/* 2. Bedrijfsnaam */}
              <div className={`p-3 rounded-xl text-xs flex items-center justify-between border ${
                winningName ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 font-medium" : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 opacity-70"
              }`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 ${winningName ? "text-emerald-400" : "opacity-40"}`} />
                  <div>
                    <span className="font-bold">Bedrijfsnaam gekozen</span>
                    {winningName && <div className="text-[11px] text-[#dfb25a] font-black">{winningName}</div>}
                  </div>
                </div>
              </div>

              {/* 3. Rechtsvorm */}
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold">Rechtsvorm:</span>{" "}
                  <span className="uppercase font-mono">{legalForm}</span>
                </div>
              </div>

              {/* 4. KOR Besluit */}
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold">KOR Besluit:</span>{" "}
                  <span className="capitalize">{korChoice === "ja" ? "Wel KOR" : korChoice === "nee" ? "Geen KOR" : "Nog uitzoeken"}</span>
                </div>
              </div>

              {/* 5. KvK Afspraak */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={checklist.appointmentBooked}
                  onChange={(e) => onUpdateChecklist("appointmentBooked", e.target.checked)}
                  className="mt-0.5 rounded text-[#dfb25a]"
                />
                <div className="flex-1">
                  <div className="font-bold">Afspraak geboekt bij KvK kantoor</div>
                  <div className="text-[10px] opacity-70 mt-0.5">
                    Plan minimaal 1 à 2 weken van tevoren in verband met drukte.
                  </div>
                </div>
              </label>

            </div>
          </div>

          <a
            href={checkLinks.kvkAfspraak}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-[#dfb25a] text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-md hover:brightness-110 transition"
          >
            <span>Plan afspraak op KvK.nl</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Kolom 2 & 3: Het Officiële Spiekbriefje Document (A4 look) */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          
          <div className="bg-gradient-to-b from-[#1c1208] to-[#110a05] text-[#f7d57f] border-2 border-[#dfb25a]/50 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden font-sans space-y-6">
            
            {/* Achtergrond watermerk effect */}
            <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none select-none text-9xl font-black">
              KVK
            </div>

            {/* Document Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-5 border-b border-[#dfb25a]/30 gap-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
                  ● Officieel Inschrijf-Dossier
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  <span>{winningName || "Nog geen winnende naam gekozen"}</span>
                  {winningName && <Crown className="w-5 h-5 text-[#dfb25a] fill-[#dfb25a]" />}
                </h3>
              </div>

              <div className="text-right text-xs opacity-75 font-mono">
                <div>Vin&apos;s Survival Gids Platform</div>
                <div className="text-[10px]">Klaar voor Handelsregister</div>
              </div>
            </div>

            {/* Raster met de kerngegevens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="p-3.5 rounded-xl bg-black/40 border border-[#dfb25a]/20 space-y-1">
                <span className="text-[10px] uppercase font-bold text-white/50 flex items-center gap-1">
                  <Scale className="w-3 h-3 text-[#dfb25a]" /> Gekozen Rechtsvorm
                </span>
                <div className="text-sm font-extrabold text-white capitalize">
                  {legalForm === "eenmanszaak" ? "Eenmanszaak" : legalForm === "vof" ? "VOF (Vennootschap onder firma)" : "Besloten Vennootschap (BV)"}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-[#dfb25a]/20 space-y-1">
                <span className="text-[10px] uppercase font-bold text-white/50 flex items-center gap-1">
                  <Percent className="w-3 h-3 text-[#dfb25a]" /> Btw &amp; KOR-Status
                </span>
                <div className="text-sm font-extrabold text-white">
                  {korChoice === "ja" ? "Deelnemen aan KOR (vrijgesteld)" : korChoice === "nee" ? "Geen KOR (reguliere 21% btw)" : "Nader te bepalen met boekhouder"}
                </div>
              </div>

              <div className="sm:col-span-2 p-3.5 rounded-xl bg-black/40 border border-[#dfb25a]/20 space-y-1">
                <span className="text-[10px] uppercase font-bold text-white/50 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#dfb25a]" /> Vestigingsadres
                </span>
                <div className="text-sm font-bold text-white">
                  {businessAddress || postalCity ? `${businessAddress || ""}, ${postalCity || ""}` : "Nog geen vestigingsadres ingevuld"}
                </div>
              </div>

              <div className="sm:col-span-2 p-4 rounded-xl bg-black/40 border border-[#dfb25a]/20 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-white/50 flex items-center gap-1">
                  <FileText className="w-3 h-3 text-[#dfb25a]" /> Activiteitenomschrijving (voor SBI-code)
                </span>
                <p className="text-xs leading-relaxed text-white/90 italic">
                  {activitiesDescription ? `“${activitiesDescription}”` : "Vul hier jouw activiteitenomschrijving in bij het vorige tabblad."}
                </p>
              </div>

            </div>

            {/* Footer advies van Vincent */}
            <div className="pt-3 border-t border-[#dfb25a]/20 flex items-center justify-between text-[11px] text-white/70">
              <span className="italic">
                💡 Neem je legitimatiebewijs mee en betaal de eenmalige €80 inschrijfkosten per pin.
              </span>
              <span className="font-bold text-[#dfb25a]">
                Veel succes! 🚀
              </span>
            </div>

          </div>

          {/* Download & Copy knoppenbalk */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleCopyDossier}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[var(--section-bg)] border border-black/15 dark:border-white/15 hover:border-[#dfb25a] font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <Copy className="w-4 h-4 text-[#dfb25a]" />
              <span>{copied ? "Gekopieerd naar klembord! ✓" : "Kopieer als tekst"}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="py-2.5 px-5 rounded-xl bg-[var(--section-bg)] border border-black/15 dark:border-white/15 hover:border-[#dfb25a] font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <Printer className="w-4 h-4 text-[#dfb25a]" />
              <span>Print spiekbriefje</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
