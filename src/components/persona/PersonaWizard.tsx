"use client";

import React, { useState } from "react";
import { 
  PersonaData, 
  DEFAULT_PERSONA, 
  Gender, 
  AgeGroup, 
  IncomeLevel, 
  JobSector, 
  Housing, 
  FamilySituation, 
  Platform, 
  CoreMotivation 
} from "./types";
import { AvatarDisplay } from "./AvatarDisplay";
import { PersonaPassport } from "./PersonaPassport";
import { 
  User, 
  Users, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Award, 
  Zap, 
  DollarSign, 
  Briefcase, 
  Home, 
  Heart, 
  Globe, 
  Compass, 
  HelpCircle,
  Clock,
  Layers,
  Flame
} from "lucide-react";

interface PersonaWizardProps {
  initialPersona?: PersonaData;
  onSave?: (persona: PersonaData) => void;
}

export function PersonaWizard({ initialPersona, onSave }: PersonaWizardProps) {
  const [persona, setPersona] = useState<PersonaData>(initialPersona || DEFAULT_PERSONA);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showPassport, setShowPassport] = useState<boolean>(false);

  const totalSteps = 5;

  const updatePersona = <K extends keyof PersonaData>(key: K, value: PersonaData[K]) => {
    setPersona((prev) => ({ ...prev, [key]: value }));
  };

  const toggleLifestyle = (item: string) => {
    setPersona((prev) => {
      const exists = prev.lifestyles.includes(item);
      const newLifestyles = exists
        ? prev.lifestyles.filter((l) => l !== item)
        : [...prev.lifestyles, item];
      return { ...prev, lifestyles: newLifestyles };
    });
  };

  const togglePlatform = (platform: Platform) => {
    setPersona((prev) => {
      const exists = prev.platforms.includes(platform);
      const newPlatforms = exists
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform];
      return { ...prev, platforms: newPlatforms };
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowPassport(true);
      if (onSave) onSave(persona);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Knoppen en opties configuratie
  const ageOptions: { value: AgeGroup; label: string; desc: string; icon: string }[] = [
    { value: "18-25", label: "18 - 25 jaar", desc: "Jongvolwassen, student of starter", icon: "🌱" },
    { value: "26-40", label: "26 - 40 jaar", desc: "Millennial, gezinsstichter, ambitieus", icon: "🚀" },
    { value: "41-64", label: "41 - 64 jaar", desc: "Ervaren, gevestigd vermogen, doorgewinterd", icon: "💼" },
    { value: "65+", label: "65+ jaar", desc: "Senior, gepensioneerd, levensgenieter", icon: "👑" },
  ];

  const incomeOptions: { value: IncomeLevel; label: string; clothes: string; desc: string; stars: string }[] = [
    { 
      value: "budget", 
      label: "Budget / Starter", 
      clothes: "Casual hoodie / t-shirt", 
      desc: "Let scherp op elke euro, zoekt voordelige en praktische oplossingen.",
      stars: "★☆☆"
    },
    { 
      value: "modaal", 
      label: "Modaal / Gemiddeld", 
      clothes: "Smart knitwear / nette polo", 
      desc: "Waardeert betrouwbaarheid en goede prijs-kwaliteitverhouding.",
      stars: "★★☆"
    },
    { 
      value: "hoog", 
      label: "Hoog / Vermogend", 
      clothes: "Luxe maatpak met gouden accenten", 
      desc: "Wil absolute topkwaliteit en ontzorging. Prijs is ondergeschikt.",
      stars: "★★★"
    },
  ];

  const jobOptions: { value: JobSector; label: string; icon: string; desc: string }[] = [
    { value: "vakman", label: "Vakman / Techniek", icon: "🔨", desc: "Bouw, montage, installatie" },
    { value: "ondernemer", label: "Ondernemer / Directeur", icon: "💼", desc: "MKB, ZZP of leidinggevend" },
    { value: "kantoor", label: "Kantoor / Corporate", icon: "🏢", desc: "Finance, overheid, consultancy" },
    { value: "tech", label: "Tech / Creatief", icon: "💻", desc: "Software, design, marketing" },
    { value: "zorg", label: "Zorg & Welzijn", icon: "🩺", desc: "Onderwijs, medisch, sociaal" },
    { value: "gepensioneerd", label: "Gepensioneerd", icon: "🏖️", desc: "Veel vrije tijd en rust" },
  ];

  const familyOptions: { value: FamilySituation; label: string; desc: string }[] = [
    { value: "single", label: "Alleenstaand", desc: "Beslist autonoom en snel" },
    { value: "samenwonend", label: "Samenwonend", desc: "Overlegt met partner" },
    { value: "jong_gezin", label: "Jong gezin met baby/peuters", desc: "Drukke levensfase, veiligheid & gemak" },
    { value: "tieners", label: "Gezin met opgroeiende tieners", desc: "Ruimte en praktische oplossingen nodig" },
    { value: "spoed_ouders", label: "Tijdelijk / Noodsituatie", desc: "Bijv. woont met kids bij ouders, hoge druk!" },
    { value: "senior_alleen", label: "Leeg nest / Alleen", desc: "Comfort en overzicht" },
  ];

  const housingOptions: { value: Housing; label: string; desc: string; icon: string }[] = [
    { value: "stad", label: "Grote stad", desc: "Appartement / dynamische omgeving", icon: "🏙️" },
    { value: "dorp", label: "Dorp of buitenwijk", desc: "Eengezinswoning met tuin", icon: "🏡" },
    { value: "buitengebied", label: "Buitengebied", desc: "Vrijstaande woning / rust", icon: "🌲" },
  ];

  const lifestyleTags = [
    "Klussen & Doe-het-zelf",
    "Gezin & Kinderen",
    "Sport & Gezondheid",
    "Reizen & Vakanties",
    "Tech & Gadgets",
    "Tuinieren & Buitenleven",
    "Koken & Gastronomie",
    "Auto's & Motoren",
  ];

  const platformOptions: { value: Platform; label: string; icon: string; toolTip: string }[] = [
    { value: "linkedin", label: "LinkedIn", icon: "💼", toolTip: "Tip: Taplio voor posts" },
    { value: "facebook", label: "Facebook", icon: "👥", toolTip: "Tip: Lokale groepen" },
    { value: "instagram", label: "Instagram", icon: "📸", toolTip: "Tip: Reels & Canva" },
    { value: "tiktok", label: "TikTok", icon: "🎵", toolTip: "Tip: CapCut video's" },
    { value: "google", label: "Google Zoekers", icon: "🔍", toolTip: "Tip: Google Bedrijfsprofiel" },
    { value: "lokaal", label: "Lokaal Mond-tot-mond", icon: "🤝", toolTip: "Tip: Lokale sponsoring" },
  ];

  const motivationOptions: { value: CoreMotivation; title: string; icon: string; desc: string }[] = [
    { 
      value: "snelheid", 
      title: "Snelheid & Spoed", 
      icon: "⚡", 
      desc: "Heeft haast! Wil per direct beginnen, kan niet maanden wachten." 
    },
    { 
      value: "kwaliteit", 
      title: "Beste Kwaliteit & Duurzaamheid", 
      icon: "💎", 
      desc: "Wil geen compromissen, eist A-merken en jarenlange garantie." 
    },
    { 
      value: "prijs", 
      title: "Scherpste Prijs & Budget", 
      icon: "🏷️", 
      desc: "Heeft een strikt budget, vergelijkt offertes en telt elke euro." 
    },
    { 
      value: "ontzorging", 
      title: "Volledige Ontzorging & Geen Gedoe", 
      icon: "🛡️", 
      desc: "Geen tijd of zin om zelf iets te doen; wil sleutelklare oplevering." 
    },
    { 
      value: "vertrouwen", 
      title: "Persoonlijk Contact & Lokale Betrouwbaarheid", 
      icon: "🤝", 
      desc: "Wil iemand die in de buurt zit, vriendelijk is en zijn afspraken nakomt." 
    },
  ];

  // Als we in paspoort-modus zitten:
  if (showPassport) {
    return (
      <PersonaPassport 
        persona={persona} 
        onEdit={() => setShowPassport(false)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Boventitels en Voortgangsindicator */}
      <div className="bg-[var(--section-bg)] p-5 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#dfb25a]/20 text-[#dfb25a] border border-[#dfb25a]/40">
                Level {currentStep} van {totalSteps}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-gradient-brand">
                Persona Studio: Karakter Creator
              </h2>
            </div>
            <p className="text-xs sm:text-sm opacity-70 mt-1">
              Kies de eigenschappen van jouw ideale klant. Zie zijn uiterlijk direct rechts transformeren!
            </p>
          </div>

          <button
            onClick={() => setShowPassport(true)}
            className="text-xs px-3.5 py-2 rounded-xl bg-[var(--surface)] border border-[#dfb25a]/50 text-[#dfb25a] font-bold hover:bg-[#dfb25a]/10 transition flex items-center gap-1.5 shadow-sm"
          >
            <Award className="w-4 h-4" /> Bekijk Paspoort
          </button>
        </div>

        {/* Progressie Bar */}
        <div className="w-full h-2.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-brand transition-all duration-500 ease-out rounded-full"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Grid: Links het Keuzemenu, Rechts de Live Avatar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LINKER KOLOM: Het Keuzemenu (7 van 12 breed) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[var(--section-bg)] p-6 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm space-y-6">
            
            {/* ================= STAP 1: GESLACHT & LEEFTIJD ================= */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-black flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gradient-brand text-white text-xs flex items-center justify-center font-bold">1</span>
                    Kies Geslacht &amp; Leeftijd
                  </h3>
                  <p className="text-xs opacity-75 mt-1">
                    Begin bij de basis. Dit bepaalt de fundamenten van je avatar.
                  </p>
                </div>

                {/* Geslacht Keuze */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-80 block">
                    1. Geslacht
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => updatePersona("gender", "man")}
                      className={`p-4 rounded-xl border-2 text-left transition flex items-center gap-3 ${
                        persona.gender === "man"
                          ? "border-[#dfb25a] bg-[#dfb25a]/15 shadow-md"
                          : "border-black/10 dark:border-white/10 bg-[var(--surface)] hover:border-[#dfb25a]/50"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-500 flex items-center justify-center text-xl shrink-0">
                        👨
                      </div>
                      <div>
                        <div className="font-bold text-sm">Man</div>
                        <div className="text-xs opacity-70">Mannelijk personage</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => updatePersona("gender", "vrouw")}
                      className={`p-4 rounded-xl border-2 text-left transition flex items-center gap-3 ${
                        persona.gender === "vrouw"
                          ? "border-[#dfb25a] bg-[#dfb25a]/15 shadow-md"
                          : "border-black/10 dark:border-white/10 bg-[var(--surface)] hover:border-[#dfb25a]/50"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-500 flex items-center justify-center text-xl shrink-0">
                        👩
                      </div>
                      <div>
                        <div className="font-bold text-sm">Vrouw</div>
                        <div className="text-xs opacity-70">Vrouwelijk personage</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Leeftijd Keuze */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-80 block">
                    2. Leeftijdscategorie
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ageOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => updatePersona("ageGroup", opt.value)}
                        className={`p-3.5 rounded-xl border-2 text-left transition flex items-center gap-3 ${
                          persona.ageGroup === opt.value
                            ? "border-[#dfb25a] bg-[#dfb25a]/15 shadow-md"
                            : "border-black/10 dark:border-white/10 bg-[var(--surface)] hover:border-[#dfb25a]/50"
                        }`}
                      >
                        <span className="text-2xl">{opt.icon}</span>
                        <div>
                          <div className="font-bold text-sm flex items-center gap-2">
                            {opt.label}
                            {opt.value === "65+" && (
                              <span className="text-[10px] bg-amber-500/20 text-amber-500 font-semibold px-1.5 py-0.2 rounded">
                                Zilver haar
                              </span>
                            )}
                          </div>
                          <div className="text-xs opacity-70">{opt.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Naam van het karakter */}
                <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/10">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-80 block">
                    Geef deze klant een voorbeeldfictieve naam
                  </label>
                  <input
                    type="text"
                    value={persona.name}
                    onChange={(e) => updatePersona("name", e.target.value)}
                    placeholder="Bijv. Mark de Vries of Sandra Jansen"
                    className="w-full bg-[var(--surface)] border border-black/15 dark:border-white/20 px-4 py-2.5 rounded-xl font-medium focus:outline-none focus:border-[#dfb25a]"
                  />
                </div>
              </div>
            )}

            {/* ================= STAP 2: INKOMEN & KLEDINGSTIJL ================= */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-black flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gradient-brand text-white text-xs flex items-center justify-center font-bold">2</span>
                    Inkomen &amp; Kledingstijl
                  </h3>
                  <p className="text-xs opacity-75 mt-1">
                    Het inkomen bepaalt direct de kleding en accessoires van de avatar!
                  </p>
                </div>

                <div className="space-y-3">
                  {incomeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => updatePersona("incomeLevel", opt.value)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition flex items-start justify-between gap-4 ${
                        persona.incomeLevel === opt.value
                          ? "border-[#dfb25a] bg-[#dfb25a]/15 shadow-md"
                          : "border-black/10 dark:border-white/10 bg-[var(--surface)] hover:border-[#dfb25a]/50"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm sm:text-base">{opt.label}</span>
                          <span className="text-xs font-mono font-bold text-[#dfb25a]">{opt.stars}</span>
                        </div>
                        <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          👔 Kledingstijl: {opt.clothes}
                        </div>
                        <p className="text-xs opacity-70 leading-relaxed">
                          {opt.desc}
                        </p>
                      </div>
                      <div className="text-xl shrink-0">
                        {opt.value === "budget" ? "👕" : opt.value === "modaal" ? "🧶" : "🤵"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ================= STAP 3: BEROEP & LEVENSSTIJL ================= */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-black flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gradient-brand text-white text-xs flex items-center justify-center font-bold">3</span>
                    Beroep &amp; Interesses
                  </h3>
                  <p className="text-xs opacity-75 mt-1">
                    Wat doet jouw klant in het dagelijks leven? Dit voegt props en attributen toe aan je personage.
                  </p>
                </div>

                {/* Beroep */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-80 block">
                    Beroepssector
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {jobOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => updatePersona("jobSector", opt.value)}
                        className={`p-3.5 rounded-xl border-2 text-left transition flex items-center gap-3 ${
                          persona.jobSector === opt.value
                            ? "border-[#dfb25a] bg-[#dfb25a]/15 shadow-md"
                            : "border-black/10 dark:border-white/10 bg-[var(--surface)] hover:border-[#dfb25a]/50"
                        }`}
                      >
                        <span className="text-2xl">{opt.icon}</span>
                        <div>
                          <div className="font-bold text-sm">{opt.label}</div>
                          <div className="text-xs opacity-70">{opt.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interesses Chips */}
                <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/10">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-80 block">
                    Interesses &amp; Vrije tijd (selecteer meerdere)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {lifestyleTags.map((tag) => {
                      const isSelected = persona.lifestyles.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleLifestyle(tag)}
                          className={`text-xs px-3 py-1.5 rounded-full font-medium transition flex items-center gap-1.5 ${
                            isSelected
                              ? "bg-gradient-brand text-white shadow-sm"
                              : "bg-[var(--surface)] border border-black/10 dark:border-white/10 hover:border-[#dfb25a]/50"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ================= STAP 4: WONEN, GEZIN & HANGOUTS ================= */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-black flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gradient-brand text-white text-xs flex items-center justify-center font-bold">4</span>
                    Wonen, Gezin &amp; Online Hangouts
                  </h3>
                  <p className="text-xs opacity-75 mt-1">
                    Waar woont hij, hoe ziet zijn huishouden eruit en op welke platforms is hij actief?
                  </p>
                </div>

                {/* Gezinssituatie */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-80 block">
                    Gezinssituatie
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {familyOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => updatePersona("familySituation", opt.value)}
                        className={`p-3 rounded-xl border-2 text-left transition ${
                          persona.familySituation === opt.value
                            ? "border-[#dfb25a] bg-[#dfb25a]/15 shadow-md"
                            : "border-black/10 dark:border-white/10 bg-[var(--surface)] hover:border-[#dfb25a]/50"
                        }`}
                      >
                        <div className="font-bold text-xs">{opt.label}</div>
                        <div className="text-[11px] opacity-70">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Woonsituatie */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-80 block">
                    Woonlocatie &amp; Omgeving
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {housingOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => updatePersona("housing", opt.value)}
                        className={`p-3 rounded-xl border-2 text-center transition flex flex-col items-center gap-1 ${
                          persona.housing === opt.value
                            ? "border-[#dfb25a] bg-[#dfb25a]/15 shadow-md"
                            : "border-black/10 dark:border-white/10 bg-[var(--surface)] hover:border-[#dfb25a]/50"
                        }`}
                      >
                        <span className="text-xl">{opt.icon}</span>
                        <span className="font-bold text-xs">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Online Hangouts */}
                <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/10">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-80 block">
                    Waar bevindt hij/zij zich online? (Kies platforms)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {platformOptions.map((opt) => {
                      const isSelected = persona.platforms.includes(opt.value);
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => togglePlatform(opt.value)}
                          className={`p-3 rounded-xl border-2 text-left transition flex items-center justify-between gap-2 ${
                            isSelected
                              ? "border-[#dfb25a] bg-[#dfb25a]/15 shadow-md"
                              : "border-black/10 dark:border-white/10 bg-[var(--surface)] hover:border-[#dfb25a]/50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{opt.icon}</span>
                            <span className="font-bold text-xs">{opt.label}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#dfb25a]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ================= STAP 5: KOOPMOTIEF & URGENTIE ================= */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-black flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gradient-brand text-white text-xs flex items-center justify-center font-bold">5</span>
                    Het Cruciale Koopmotief &amp; Pijnpunt
                  </h3>
                  <p className="text-xs opacity-75 mt-1">
                    Wat is voor deze specifieke klant de doorslaggevende reden om bij jou te kopen?
                  </p>
                </div>

                {/* Primaire reden */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-80 block">
                    Belangrijkste criterium in jouw vakgebied
                  </label>
                  <div className="space-y-2.5">
                    {motivationOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => updatePersona("coreMotivation", opt.value)}
                        className={`w-full p-3.5 rounded-xl border-2 text-left transition flex items-start gap-3 ${
                          persona.coreMotivation === opt.value
                            ? "border-[#dfb25a] bg-[#dfb25a]/15 shadow-md"
                            : "border-black/10 dark:border-white/10 bg-[var(--surface)] hover:border-[#dfb25a]/50"
                        }`}
                      >
                        <span className="text-2xl shrink-0">{opt.icon}</span>
                        <div>
                          <div className="font-extrabold text-sm">{opt.title}</div>
                          <div className="text-xs opacity-75 leading-relaxed">{opt.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* De specifieke context / situatie van de gebruiker (voorbeeld uit de user request!) */}
                <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/10">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-80 block">
                    Beschrijf zijn/haar specifieke situatie &amp; pijnpunt
                  </label>
                  <p className="text-xs opacity-70">
                    Bijvoorbeeld: Als je vloerverwarming aanbiedt: &ldquo;Woont nu met 2 jonge kinderen tijdelijk bij zijn ouders, dus snelheid en oplevering binnen 3 weken is cruciaal!&rdquo;
                  </p>
                  <textarea
                    rows={3}
                    value={persona.customContext}
                    onChange={(e) => updatePersona("customContext", e.target.value)}
                    placeholder="Typ hier zijn/haar specifieke situatie..."
                    className="w-full bg-[var(--surface)] border border-black/15 dark:border-white/20 p-3 rounded-xl font-medium focus:outline-none focus:border-[#dfb25a] text-sm resize-none"
                  />
                </div>
              </div>
            )}

            {/* Navigatieknoppen onderaan het keuzemenu */}
            <div className="pt-4 border-t border-black/5 dark:border-white/10 flex justify-between items-center">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                  currentStep === 1
                    ? "opacity-30 cursor-not-allowed"
                    : "bg-[var(--surface)] border border-black/10 dark:border-white/10 hover:opacity-80"
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Vorige
              </button>

              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-brand text-white flex items-center gap-1.5 hover:opacity-90 shadow-md transition"
              >
                {currentStep === totalSteps ? (
                  <>
                    Genereer Paspoort <Award className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Volgende stap <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* RECHTER KOLOM: De Live Avatar Display (Sticky Character Sheet) (5 van 12 breed) */}
        <div className="lg:col-span-5 sticky top-6">
          <div className="space-y-4">
            <AvatarDisplay persona={persona} />

            {/* Snelle feedback badge */}
            <div className="p-3.5 rounded-xl bg-[var(--section-bg)] border border-black/5 dark:border-white/10 text-xs flex items-start gap-2.5 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#dfb25a] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-gradient-brand block">
                  Karakter reageert live!
                </span>
                <span className="opacity-75 leading-relaxed text-[11px]">
                  Verander van leeftijd, beroep of inkomen om te zien hoe de kleding (hoodie vs pak), gezichtslijnen en accessoires direct meeveranderen.
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
