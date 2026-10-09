"use client";

import React, { useState } from "react";
import { 
  FileText, 
  MapPin, 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  Info
} from "lucide-react";

interface SbiOmschrijverProps {
  businessAddress: string;
  postalCity: string;
  activitiesDescription: string;
  onChangeAddress: (addr: string) => void;
  onChangePostalCity: (city: string) => void;
  onChangeActivities: (desc: string) => void;
}

export function SbiOmschrijver({
  businessAddress,
  postalCity,
  activitiesDescription,
  onChangeAddress,
  onChangePostalCity,
  onChangeActivities,
}: SbiOmschrijverProps) {
  const [selectedExample, setSelectedExample] = useState<string | null>(null);

  // Vaagheids- & Te-eng-detector
  const text = activitiesDescription.toLowerCase().trim();
  const isTooShort = text.length > 0 && text.length < 20;
  const isVague = text.includes("advies") || text.includes("oplossingen") || text.includes("dienstverlening") || text.includes("totaalconcept");
  const isVeryGood = text.length >= 30 && !isVague;

  const exampleTemplates = [
    {
      sector: "Installatie & Techniek",
      text: "Installatie, montage en onderhoud van vloerverwarming, warmtetechniek en aanverwante installatietechnische werkzaamheden voor particulieren en bedrijven.",
    },
    {
      sector: "Marketing, IT & Web",
      text: "Dienstverlening op het gebied van softwareontwikkeling, webdesign, online marketing en advisering over digitale merkidentiteit.",
    },
    {
      sector: "Horeca & Catering",
      text: "Exploitatie van een horecagelegenheid, verzorging van catering op locatie en verkoop van ambachtelijke etenswaren en dranken.",
    },
    {
      sector: "Zakelijke Dienstverlening & Coaching",
      text: "Bedrijfsadvies, interim management, training en persoonlijke coaching op het gebied van leiderschap en organisatieontwikkeling.",
    },
    {
      sector: "Creatief, Fotografie & Video",
      text: "Grafisch ontwerp, fotografie, videoproductie, visuele communicatie en contentcreatie voor online en offline media.",
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-[var(--section-bg)] p-6 sm:p-7 rounded-2xl border border-black/10 dark:border-white/10 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-[#dfb25a] uppercase tracking-wider mb-1.5">
          <FileText className="w-4 h-4 text-[#dfb25a]" /> Hoofdstuk 2 • Stap 2
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-[var(--text)] tracking-tight">
          Bedrijfsadres &amp; KvK Activiteitenomschrijving
        </h2>
        <p className="text-sm opacity-80 mt-1 max-w-2xl leading-relaxed">
          Bij het inschrijven vraagt de KvK: <em>&ldquo;Wat gaat je bedrijf concreet doen?&rdquo;</em> 
          Op basis hiervan bepalen zij jouw <strong>SBI-code</strong> (Standaard Bedrijfsindeling). 
          In het boek geeft Vincent de gouden regel: <strong>niet te vaag, maar ook niet te eng!</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Kolom 1: De Activiteitenomschrijving */}
        <div className="bg-[var(--section-bg)] p-6 rounded-2xl border border-black/10 dark:border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text)]">
                Omschrijving van activiteiten
              </label>
              <span className="text-[11px] opacity-60">
                {activitiesDescription.length} tekens
              </span>
            </div>

            <textarea
              rows={4}
              value={activitiesDescription}
              onChange={(e) => onChangeActivities(e.target.value)}
              placeholder="Bijv. Installatie en montage van vloerverwarming, renovatiewerk en aanverwante technische dienstverlening..."
              className="w-full text-xs sm:text-sm p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 focus:outline-none focus:border-[#dfb25a] transition text-[var(--text)] leading-relaxed resize-none"
            />

            {/* Live Feedback Melder */}
            {isTooShort && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Dit is nog erg kort. Noem minstens 2 of 3 concrete diensten of producten.</span>
              </div>
            )}

            {isVague && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Let op de vaagheid: vermijd containerbegrippen als &lsquo;advies&rsquo; of &lsquo;totaalconcept&rsquo; zonder te noemen wáárin.</span>
              </div>
            )}

            {isVeryGood && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Uitstekend geformuleerd! Duidelijk wat je doet, met ruimte voor groei.</span>
              </div>
            )}

            {/* Inspiratie templates */}
            <div className="pt-2">
              <div className="text-xs font-bold opacity-75 mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-[#dfb25a]" /> Snelle sjablonen uit het boek:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {exampleTemplates.map((tpl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onChangeActivities(tpl.text)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#dfb25a] hover:text-[#dfb25a] transition"
                  >
                    + {tpl.sector}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/20 text-[11px] opacity-75 border border-white/5 space-y-1">
            <strong>💡 Waarom &lsquo;en aanverwante werkzaamheden&rsquo; toevoegen?</strong>
            <p>
              Als je dit zinnetje toevoegt, mag je later ook gerelateerde klussen aannemen zonder dat je direct je inschrijving hoeft te wijzigen bij de KvK.
            </p>
          </div>
        </div>

        {/* Kolom 2: Bedrijfsadres & Vestiging */}
        <div className="bg-[var(--section-bg)] p-6 rounded-2xl border border-black/10 dark:border-white/10 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text)]">
              <MapPin className="w-4 h-4 text-[#dfb25a]" />
              <span>Vestigingsadres van de onderneming</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold opacity-75 block">
                Straatnaam en huisnummer
              </label>
              <input
                type="text"
                value={businessAddress}
                onChange={(e) => onChangeAddress(e.target.value)}
                placeholder="Bijv. Dorpsstraat 42 of Werkpand 10A"
                className="w-full text-xs sm:text-sm p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 focus:outline-none focus:border-[#dfb25a] transition text-[var(--text)]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold opacity-75 block">
                Postcode en Plaats
              </label>
              <input
                type="text"
                value={postalCity}
                onChange={(e) => onChangePostalCity(e.target.value)}
                placeholder="Bijv. 1012 AB Amsterdam"
                className="w-full text-xs sm:text-sm p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 focus:outline-none focus:border-[#dfb25a] transition text-[var(--text)]"
              />
            </div>

            {/* Adres privacy & huurwoning checklist */}
            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs space-y-2 text-blue-300">
              <div className="font-bold flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-400" /> Schrijf je in op je thuisadres?
              </div>
              <ul className="space-y-1 opacity-90 text-[11px] list-disc list-inside">
                <li>Bij een <strong>huurwoning</strong>: controleer of je huurcontract inschrijving van een bedrijf toestaat.</li>
                <li><strong>Privacy</strong>: bij een eenmanszaak is het vestigingsadres deels openbaar in het Handelsregister. Vanaf 2024 kun je je woonadres afschermen als er een alternatief postadres is.</li>
              </ul>
            </div>
          </div>

          <div className="text-[11px] opacity-60 italic text-right">
            Deze gegevens worden meegenomen op je KvK-Spiekbriefje.
          </div>
        </div>

      </div>

    </div>
  );
}
