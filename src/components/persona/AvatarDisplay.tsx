"use client";

import React from "react";
import { PersonaData } from "./types";
import { AvatarHead, resolveHeadVariant } from "./AvatarHead";
import { Sparkles, DollarSign, Zap, Target } from "lucide-react";

interface AvatarDisplayProps {
  persona: PersonaData;
  className?: string;
  showHud?: boolean;
}


// De vectorkoppen (viewBox 448.68 x 531.57) schalen we in het 300x300 avatar-canvas
// zodat de kin op y=190 valt en de nek netjes onder de kraag van de kleding verdwijnt.
const HEAD_TRANSFORM = "translate(60.1 31.5) scale(0.42)";
// Hoofddeksels zijn getekend voor het oude hoofd; schuif ze naar de nieuwe kop.
const HAT_TRANSFORM = "translate(150 101) scale(1.08) translate(-150 -106)";
const HEADPHONE_TRANSFORM = "translate(150 128) scale(1.06) translate(-150 -137)";
const HAT_CLIP_Y: Partial<Record<string, number>> = { vakman: 100, hulpdiensten: 99, horeca: 98, student: 99, gepensioneerd: 98 };

export function AvatarDisplay({ persona, className = "", showHud = true }: AvatarDisplayProps) {
  const { gender, ageGroup, incomeLevel, jobSector, coreMotivation } = persona;

  // Unieke id's per avatar-instantie (meerdere avatars op een pagina mogen geen clip-id's delen)
  const uid = "av" + React.useId().replace(/[^a-zA-Z0-9_-]/g, "");

  // Vectorkop op basis van geslacht & leeftijd (bron: public/avatars/*.svg)
  const headVariant = resolveHeadVariant(gender, ageGroup);
  const wrinkleLevel = ageGroup === "65+" ? 2 : ageGroup === "41-64" ? 1 : 0;
  const isSenior = ageGroup === "65+";
  const hasGlasses = isSenior || jobSector === "tech" || jobSector === "ondernemer" || jobSector === "onderwijs" || jobSector === "politiek";
  const glassesColor = isSenior ? "#5B3A24" : "#C9973F";

  // Hoofddeksels: het haar wordt boven de rand weggeknipt zodat het niet door de pet heen steekt
  const isHigherStudent = (jobSector === "student" || jobSector === "scholier") && ageGroup !== "12-18";
  const hatClipY = jobSector && (jobSector !== "student" || isHigherStudent) ? HAT_CLIP_Y[jobSector] : undefined;
  const hasHat = hatClipY !== undefined;

  // Kledingkleur en accessoires op basis van inkomen
  let clothingColor = "#4B5563"; // budget (grijze hoodie)
  let clothingAccent = "#374151";
  let clothingType = "hoodie";

  if (incomeLevel === "budget") {
    clothingColor = "#4B5563"; // Simpele grijze hoodie
    clothingAccent = "#374151";
    clothingType = "hoodie";
  } else if (incomeLevel === "modaal") {
    clothingColor = "#1E3A8A"; // Nette navy gebreide trui / polo
    clothingAccent = "#3B82F6";
    clothingType = "sweater";
  } else if (incomeLevel === "hoog") {
    clothingColor = "#111827"; // Luxe diepzwart/navy maatpak
    clothingAccent = "#DFB25A"; // Gouden details
    clothingType = "suit";
  }

  // RPG Koopkracht score (0-3)
  const purchasingPower = incomeLevel === "budget" ? 1 : incomeLevel === "modaal" ? 2 : incomeLevel === "hoog" ? 3 : 0;

  // RPG Urgentiescore
  const urgencyLabel = 
    coreMotivation === "snelheid" ? "Zeer Hoog ⚡" : 
    coreMotivation === "kwaliteit" ? "Bewezen Kwaliteit 💎" : 
    coreMotivation === "prijs" ? "Scherpe Prijs 🏷️" : 
    coreMotivation === "ontzorging" ? "Totale Rust 🛡️" : 
    coreMotivation === "vertrouwen" ? "Vertrouwen 🤝" : "Nog niet gekozen";

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Outer game card container */}
      <div className="w-full relative rounded-2xl p-5 overflow-hidden bg-gradient-to-b from-[#2a170b]/95 to-[#160b06] border-2 border-[#dfb25a]/40 shadow-2xl backdrop-blur-md">
        
        {/* Glow achtergrond */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#dfb25a]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#a16e38]/25 rounded-full blur-3xl pointer-events-none" />

        {/* Bovenste HUD balk */}
        <div className="relative z-10 flex justify-between items-center mb-3 pb-2 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-bold tracking-wider text-[#dfb25a] uppercase">
              Persona Preview
            </span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-white/90 font-mono font-medium">
            {gender === "man" ? "Mannelijk" : "Vrouwelijk"} • {ageGroup} jr
          </span>
        </div>

        {/* Het centrale SVG Avatar Canvas */}
        <div className="relative z-10 w-full flex justify-center py-2">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72">
            
            <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-2xl overflow-visible">
              <defs>
                <radialGradient id="avatarSpotlight" cx="50%" cy="40%" r="62%">
                  <stop offset="0%" stopColor="#FBE39C" stopOpacity="0.85" />
                  <stop offset="35%" stopColor="#DFB25A" stopOpacity="0.75" />
                  <stop offset="70%" stopColor="#8A5A22" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#301A0B" stopOpacity="0.9" />
                </radialGradient>
                <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f7d57f" />
                  <stop offset="100%" stopColor="#b37c35" />
                </linearGradient>
                <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                
                {/* Beroeps- en uniformkleuren */}
                <linearGradient id="policeCrownGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1C3056" />
                  <stop offset="100%" stopColor="#0B1324" />
                </linearGradient>
                <linearGradient id="policeVisorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#222C3C" />
                  <stop offset="100%" stopColor="#06090F" />
                </linearGradient>
                <linearGradient id="policeGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE68A" />
                  <stop offset="45%" stopColor="#EAB308" />
                  <stop offset="100%" stopColor="#92400E" />
                </linearGradient>
                <linearGradient id="oovYellow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E2F835" />
                  <stop offset="100%" stopColor="#B4E300" />
                </linearGradient>
                <linearGradient id="hardHatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="stethoTube" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0D9488" />
                  <stop offset="100%" stopColor="#115E59" />
                </linearGradient>
                <linearGradient id="stethoChrome" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F8FAFC" />
                  <stop offset="50%" stopColor="#94A3B8" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>
                <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.4" />
                </filter>
                {hasHat && (
                  <clipPath id={`${uid}-hat`}>
                    <rect x="-50" y={hatClipY} width="400" height="400" />
                  </clipPath>
                )}
              </defs>

              {/* Achtergrond ring & spotlight */}
              <circle cx="150" cy="150" r="130" fill="url(#avatarSpotlight)" />
              <circle cx="150" cy="150" r="128" fill="none" stroke="#dfb25a" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="6 4" />

              {/* ===== VECTORKOP: hoofd, nek & haar (jouw tekening) + gezicht & bril ===== */}
              <g clipPath={hasHat ? `url(#${uid}-hat)` : undefined}>
                <g transform={HEAD_TRANSFORM}>
                  <AvatarHead
                    variant={headVariant}
                    wrinkleLevel={wrinkleLevel}
                    showGlasses={hasGlasses}
                    glassesColor={glassesColor}
                    idPrefix={uid}
                  />
                </g>
              </g>

              {/* ===== LICHAAM / SCHOUDERS / KLEDING ===== */}
              <g id="clothing" filter="url(#softShadow)">
                {clothingType === "hoodie" && (
                  <g>
                    <path
                      d="M 60 290 C 70 215, 110 205, 150 205 C 190 205, 230 215, 240 290 Z"
                      fill={clothingColor}
                    />
                    <path
                      d="M 115 205 C 130 230, 170 230, 185 205 C 180 235, 120 235, 115 205 Z"
                      fill={clothingAccent}
                    />
                    <line x1="135" y1="225" x2="135" y2="255" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
                    <line x1="165" y1="225" x2="165" y2="255" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
                  </g>
                )}

                {clothingType === "sweater" && (
                  <g>
                    <path
                      d="M 60 290 C 70 215, 110 205, 150 205 C 190 205, 230 215, 240 290 Z"
                      fill={clothingColor}
                    />
                    <polygon points="135,200 150,215 142,217" fill="#FFFFFF" />
                    <polygon points="165,200 150,215 158,217" fill="#FFFFFF" />
                    <path
                      d="M 125 205 Q 150 235 175 205 Q 150 220 125 205 Z"
                      fill={clothingAccent}
                    />
                  </g>
                )}

                {clothingType === "suit" && (
                  <g>
                    <path
                      d="M 55 290 C 65 210, 105 200, 150 200 C 195 200, 235 210, 245 290 Z"
                      fill="url(#suitGrad)"
                    />
                    <polygon points="135,195 165,195 150,260" fill="#FFFFFF" />
                    {gender === "man" ? (
                      <polygon points="146,210 154,210 156,275 150,285 144,275" fill="#991B1B" />
                    ) : (
                      <circle cx="150" cy="235" r="4" fill="url(#goldAccent)" />
                    )}
                    <polygon points="110,202 142,260 120,290 85,240" fill="#1e293b" />
                    <polygon points="190,202 158,260 180,290 215,240" fill="#1e293b" />
                    <circle cx="112" cy="232" r="3.5" fill="url(#goldAccent)" />
                    <rect x="180" y="245" width="22" height="4" rx="2" fill="#FFFFFF" />
                  </g>
                )}

                {/* ===== BEROEPSSPECIFIEKE UNIFORMDETAILS ===== */}
                
                {/* 1. VAKMAN: Veiligheidshesje met 3M reflectiestrepen en gereedschapszak */}
                {jobSector === "vakman" && (
                  <g id="craftsmanUniform">
                    <path d="M 68 250 L 98 214 L 114 222 L 86 280 Z" fill="#EA580C" opacity="0.95" />
                    <path d="M 232 250 L 202 214 L 186 222 L 214 280 Z" fill="#EA580C" opacity="0.95" />
                    <rect x="75" y="248" width="34" height="5" rx="1" fill="#FFFFFF" opacity="0.95" />
                    <rect x="191" y="248" width="34" height="5" rx="1" fill="#FFFFFF" opacity="0.95" />
                    <rect x="78" y="266" width="30" height="4" rx="1" fill="#FFFFFF" opacity="0.85" />
                    <rect x="192" y="266" width="30" height="4" rx="1" fill="#FFFFFF" opacity="0.85" />
                    <rect x="100" y="235" width="4" height="18" rx="1" fill="#EAB308" transform="rotate(-15 100 235)" />
                  </g>
                )}

                {/* 2. HULPDIENSTEN: Authentiek Nederlands Politie Uniform */}
                {jobSector === "hulpdiensten" && (
                  <g id="policeUniform">
                    {/* Operationeel polo / uniformhemd in politiedonkerblauw */}
                    <path d="M 60 290 C 70 215, 110 205, 150 205 C 190 205, 230 215, 240 290 Z" fill="#0C1527" />
                    
                    {/* Iconische Nederlandse OOV / BZK fluoriserend gele chevron strepen over de borst */}
                    <polygon points="76,268 116,238 126,245 84,277" fill="url(#oovYellow)" />
                    <polygon points="224,268 184,238 174,245 216,277" fill="url(#oovYellow)" />
                    {/* Witte retroreflecterende contrasterende bies */}
                    <polygon points="86,277 126,245 130,248 90,281" fill="#FFFFFF" opacity="0.9" />
                    <polygon points="214,277 174,245 170,248 210,281" fill="#FFFFFF" opacity="0.9" />

                    {/* Schouderpassanten (epauletten) met gouden rangstrepen */}
                    <rect x="68" y="236" width="28" height="9" rx="2" fill="#070C18" stroke="#1E293B" strokeWidth="0.8" />
                    <line x1="72" y1="240" x2="92" y2="240" stroke="url(#policeGold)" strokeWidth="1.8" />
                    <rect x="204" y="236" width="28" height="9" rx="2" fill="#070C18" stroke="#1E293B" strokeWidth="0.8" />
                    <line x1="208" y1="240" x2="228" y2="240" stroke="url(#policeGold)" strokeWidth="1.8" />

                    {/* Portofoon / communicatiemicrofoon op de schouder */}
                    <rect x="110" y="222" width="10" height="15" rx="2" fill="#1F2937" stroke="#374151" strokeWidth="1" />
                    <circle cx="115" cy="227" r="2.2" fill="#111827" />
                    <line x1="110" y1="237" x2="106" y2="252" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />

                    {/* Politie Borstbalkje (POLITIE badge) */}
                    <rect x="160" y="232" width="26" height="8" rx="1.5" fill="#070C18" stroke="#334155" strokeWidth="0.8" />
                    <text x="173" y="238" fontSize="4.5" fill="#FFFFFF" fontWeight="900" textAnchor="middle" letterSpacing="0.8" fontFamily="system-ui, sans-serif">POLITIE</text>
                  </g>
                )}

                {/* 3. HORECA: Professioneel wit koksbuis met rode foulard & dubbele knopen */}
                {jobSector === "horeca" && (
                  <g id="chefJacket">
                    <path d="M 60 290 C 70 215, 110 205, 150 205 C 190 205, 230 215, 240 290 Z" fill="#F8FAFC" />
                    <path d="M 132 205 Q 150 220 168 205 Q 150 214 132 205 Z" fill="#DC2626" />
                    <path d="M 125 208 L 140 290" stroke="#CBD5E1" strokeWidth="1.5" />
                    <circle cx="132" cy="225" r="3.2" fill="#0F172A" />
                    <circle cx="148" cy="225" r="3.2" fill="#0F172A" />
                    <circle cx="132" cy="245" r="3.2" fill="#0F172A" />
                    <circle cx="148" cy="245" r="3.2" fill="#0F172A" />
                    <circle cx="132" cy="265" r="3.2" fill="#0F172A" />
                    <circle cx="148" cy="265" r="3.2" fill="#0F172A" />
                  </g>
                )}

                {/* 4. TECH: Bedrijfspas / lanyard */}
                {jobSector === "tech" && (
                  <g id="techLanyard">
                    <path d="M 132 205 Q 150 260 150 264 Q 150 260 168 205" stroke="#0284C7" strokeWidth="2" fill="none" opacity="0.9" />
                    <rect x="142" y="264" width="16" height="22" rx="2" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1" />
                    <rect x="144" y="267" width="12" height="4" rx="1" fill="#0284C7" />
                    <circle cx="150" cy="276" r="2.5" fill="#94A3B8" />
                  </g>
                )}

                {/* 5. ZORG: Medische doktersjas/OK-pak met stethoscoop & badge */}
                {jobSector === "zorg" && (
                  <g id="medicalScrubs">
                    <path d="M 60 290 C 70 215, 110 205, 150 205 C 190 205, 230 215, 240 290 Z" fill="#0D9488" />
                    <polygon points="134,204 166,204 150,225" fill="#14B8A6" />
                    <rect x="174" y="235" width="18" height="24" rx="2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
                    <rect x="178" y="238" width="10" height="3" fill="#0D9488" rx="0.5" />
                    <path d="M 183 247 L 183 253 M 180 250 L 186 250" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" />
                    
                    {/* Verchroomde stethoscoop om de hals */}
                    <path d="M 124 204 C 114 240, 126 265, 146 265" stroke="url(#stethoTube)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                    <path d="M 176 204 C 186 240, 174 265, 154 265" stroke="url(#stethoTube)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                    <circle cx="150" cy="265" r="7" fill="url(#stethoChrome)" stroke="#334155" strokeWidth="1.2" />
                    <circle cx="150" cy="265" r="4.5" fill="#E2E8F0" />
                  </g>
                )}

                {/* 6. POLITIEK: Zijden das & gouden dasspeld */}
                {jobSector === "politiek" && (
                  <g id="politicalTie">
                    <polygon points="144,204 156,204 153,255 147,255" fill="#B91C1C" />
                    <polygon points="147,255 153,255 150,265" fill="#991B1B" />
                    <line x1="145" y1="230" x2="155" y2="230" stroke="url(#goldAccent)" strokeWidth="1.8" />
                  </g>
                )}

                {/* 7. STUDENT: Eresjerp (voor hoger onderwijs) */}
                {isHigherStudent && (
                  <g id="academicSash">
                    <path d="M 104 212 L 80 270 L 96 274 L 116 220 Z" fill="#B45309" />
                    <path d="M 196 212 L 220 270 L 204 274 L 184 220 Z" fill="#B45309" />
                    <line x1="106" y1="216" x2="88" y2="272" stroke="url(#goldAccent)" strokeWidth="1.5" />
                    <line x1="194" y1="216" x2="212" y2="272" stroke="url(#goldAccent)" strokeWidth="1.5" />
                  </g>
                )}
              </g>


              {/* ===== HOOFDDEKSELS: HOOGWAARDIGE BEROEPSELEMENTEN ===== */}
              <g transform={HAT_TRANSFORM}>
              
              {/* 1. VAKMAN BOUWHELM: 3D koepel, middenribbe, 3M reflexband & stootklep */}
              {jobSector === "vakman" && (
                <g id="hardHat" filter="url(#softShadow)">
                  <path d="M 102 106 C 102 60, 198 60, 198 106 Z" fill="url(#hardHatGrad)" stroke="#B45309" strokeWidth="1.5" />
                  {/* Midden verstevigingskam */}
                  <rect x="145" y="58" width="10" height="36" rx="3" fill="#D97706" stroke="#B45309" strokeWidth="0.8" />
                  <line x1="150" y1="60" x2="150" y2="92" stroke="#FEF3C7" strokeWidth="1.5" strokeLinecap="round" />
                  {/* 3M Veiligheids-reflexband */}
                  <path d="M 112 92 Q 150 98 188 92" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.95" />
                  {/* Stevige helmrand / klep net boven de wenkbrauwen */}
                  <path d="M 96 106 Q 150 117 204 106 L 200 101 Q 150 109 100 101 Z" fill="#D97706" stroke="#92400E" strokeWidth="1" />
                </g>
              )}

              {/* 2. HULPDIENSTEN: UITGEBREID NEDERLANDS POLITIE DIENSTPET (PEAKED SERVICE CAP) */}
              {jobSector === "hulpdiensten" && (
                <g id="policeCap" filter="url(#softShadow)">
                  {/* A. Peaked Cap Kroon / Bol in politienavy met authentieke vorm */}
                  <path
                    d="M 98 96 C 92 68, 112 48, 150 46 C 188 48, 208 68, 202 96 C 180 100, 120 100, 98 96 Z"
                    fill="url(#policeCrownGrad)"
                    stroke="#0B1324"
                    strokeWidth="1.5"
                  />
                  {/* Bovenste contournaad & plooien van de petstof */}
                  <path d="M 114 62 Q 150 56 186 62" stroke="#253D68" strokeWidth="1.2" fill="none" opacity="0.85" />
                  <line x1="150" y1="48" x2="150" y2="68" stroke="#0B1324" strokeWidth="1" opacity="0.5" />

                  {/* B. Gestructureerde zwarte petband */}
                  <path
                    d="M 101 94 C 114 96, 186 96, 199 94 L 200 106 C 186 111, 114 111, 100 106 Z"
                    fill="#080C14"
                    stroke="#04060A"
                    strokeWidth="1.2"
                  />

                  {/* C. Dubbele gevlochten gouden stormband (goud gallon) */}
                  <path
                    d="M 105 101 Q 150 107 195 101"
                    stroke="url(#policeGold)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Reliëf vlechtpatroon op de gouden stormband */}
                  <path
                    d="M 105 101 Q 150 107 195 101"
                    stroke="#FFF2A8"
                    strokeWidth="1.2"
                    strokeDasharray="4 3"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                  <path
                    d="M 107 102 Q 150 108 193 102"
                    stroke="#78350F"
                    strokeWidth="1"
                    strokeDasharray="2 4"
                    fill="none"
                    opacity="0.75"
                  />

                  {/* Gouden knopen / rozetten aan weerszijden van de stormband */}
                  <circle cx="105" cy="101" r="4.2" fill="url(#policeGold)" stroke="#78350F" strokeWidth="0.8" />
                  <circle cx="105" cy="101" r="1.8" fill="#FEF08A" />
                  <circle cx="195" cy="101" r="4.2" fill="url(#policeGold)" stroke="#78350F" strokeWidth="0.8" />
                  <circle cx="195" cy="101" r="1.8" fill="#FEF08A" />

                  {/* D. Hoogglans zwarte lakleren klep (patent leather visor) */}
                  <path
                    d="M 100 105 Q 150 113 200 105 C 199 120, 178 127, 150 127 C 122 127, 101 120, 100 105 Z"
                    fill="url(#policeVisorGrad)"
                    stroke="#000000"
                    strokeWidth="1.2"
                  />
                  {/* Randversteviging op de lakleren klep */}
                  <path d="M 103 107 Q 150 114 197 107" stroke="#1E293B" strokeWidth="1" fill="none" opacity="0.8" />
                  {/* Hoogglans spiegelreflectie op de lakleren klep */}
                  <path
                    d="M 115 113 Q 150 121 185 113"
                    stroke="#FFFFFF"
                    strokeWidth="2.2"
                    fill="none"
                    opacity="0.75"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 124 118 Q 150 124 176 118"
                    stroke="#94A3B8"
                    strokeWidth="1.2"
                    fill="none"
                    opacity="0.4"
                    strokeLinecap="round"
                  />

                  {/* E. Officieel Nederlands Politie Embleem (Gouden schild, vlam & lauwerkrans) */}
                  <g id="policeBadge" transform="translate(150, 76)">
                    {/* Gouden gloed */}
                    <circle cx="0" cy="0" r="13" fill="#EAB308" opacity="0.25" />

                    {/* Gouden schild / wetboek basis */}
                    <path
                      d="M -9 2 C -9 9, 0 13, 0 13 C 0 13, 9 9, 9 2 L 9 -4 L -9 -4 Z"
                      fill="url(#policeGold)"
                      stroke="#78350F"
                      strokeWidth="0.8"
                    />
                    {/* Lauwerkrans bladeren */}
                    <path d="M -11 -2 Q -13 5 -9 10" stroke="#DFB25A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <path d="M 11 -2 Q 13 5 9 10" stroke="#DFB25A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <circle cx="-11" cy="0" r="1.2" fill="#FEF08A" />
                    <circle cx="11" cy="0" r="1.2" fill="#FEF08A" />

                    {/* De Politievlam van waakzaamheid */}
                    <path
                      d="M 0 -13 C -3 -7, -4 -3, 0 1 C 4 -3, 3 -7, 0 -13 Z"
                      fill="#FEF08A"
                      stroke="#B45309"
                      strokeWidth="0.8"
                    />
                    <path
                      d="M 0 -10 C -1.5 -6, -2 -3, 0 0 C 2 -3, 1.5 -6, 0 -10 Z"
                      fill="#F59E0B"
                    />
                    <circle cx="0" cy="5" r="2" fill="#78350F" />
                  </g>
                </g>
              )}

              {/* 3. HORECA: Geplooide witte koksmuts (Toque Blanche) */}
              {jobSector === "horeca" && (
                <g id="chefHat" filter="url(#softShadow)">
                  <path
                    d="M 106 96 C 94 60, 110 32, 150 32 C 190 32, 206 60, 194 96 Z"
                    fill="#FFFFFF"
                    stroke="#CBD5E1"
                    strokeWidth="1.5"
                  />
                  {/* Plooien van de muts */}
                  <path d="M 124 40 Q 120 70 124 96" stroke="#E2E8F0" strokeWidth="1.8" fill="none" />
                  <path d="M 137 34 Q 135 68 137 96" stroke="#CBD5E1" strokeWidth="1.5" fill="none" />
                  <path d="M 150 32 Q 150 68 150 96" stroke="#94A3B8" strokeWidth="1.5" fill="none" />
                  <path d="M 163 34 Q 165 68 163 96" stroke="#CBD5E1" strokeWidth="1.5" fill="none" />
                  <path d="M 176 40 Q 180 70 176 96" stroke="#E2E8F0" strokeWidth="1.8" fill="none" />
                  {/* Stevige band om het voorhoofd */}
                  <rect x="104" y="94" width="92" height="11" rx="2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
                  <line x1="106" y1="99" x2="194" y2="99" stroke="#E2E8F0" strokeWidth="1" />
                </g>
              )}

              {/* 4. STUDENT: Afstudeerhoed (Mortarboard met kwast voor hoger onderwijs) */}
              {isHigherStudent && (
                <g id="graduationCap" filter="url(#softShadow)">
                  <path d="M 110 106 C 110 72, 190 72, 190 106 Z" fill="#1E293B" />
                  <polygon points="150,54 206,68 150,82 94,68" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
                  <circle cx="150" cy="68" r="3.5" fill="url(#goldAccent)" />
                  <path d="M 150 68 Q 184 72 190 94" stroke="url(#goldAccent)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                  <rect x="187" y="94" width="6" height="12" rx="1" fill="url(#goldAccent)" />
                </g>
              )}

              {/* 5. GEPENSIONEERD: Klassieke tweed flat cap */}
              {jobSector === "gepensioneerd" && (
                <g id="flatCap" filter="url(#softShadow)">
                  <path d="M 116 106 Q 150 114 184 106 L 182 101 Q 150 107 118 101 Z" fill="#44403C" stroke="#292524" strokeWidth="1" />
                  <path
                    d="M 102 104 C 102 66, 198 66, 198 104 Q 150 110 102 104 Z"
                    fill="#78716C"
                    stroke="#57534E"
                    strokeWidth="1.5"
                  />
                  <path d="M 150 70 L 150 107" stroke="#57534E" strokeWidth="1.2" opacity="0.7" strokeDasharray="3 2" />
                  <path d="M 116 98 Q 150 104 184 98" stroke="#57534E" strokeWidth="1.2" opacity="0.7" />
                  <circle cx="150" cy="70" r="3.2" fill="#44403C" />
                </g>
              )}
              </g>

              {/* 6. TECH: Professionele studio koptelefoon met cyan LED verlichting & microfoon */}
              {jobSector === "tech" && (
                <g transform={HEADPHONE_TRANSFORM}>
                <g id="bigHeadphones" filter="url(#softShadow)">
                  {/* Gevoerde hoofdband */}
                  <path d="M 106 135 C 100 58, 200 58, 194 135" stroke="#1E293B" strokeWidth="6" fill="none" strokeLinecap="round" />
                  <path d="M 120 74 C 130 68, 170 68, 180 74" stroke="#475569" strokeWidth="2" fill="none" strokeLinecap="round" />
                  {/* Oorschelp links */}
                  <rect x="94" y="122" width="16" height="30" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
                  <circle cx="102" cy="137" r="4.5" fill="none" stroke="#06B6D4" strokeWidth="1.8" />
                  {/* Oorschelp rechts */}
                  <rect x="190" y="122" width="16" height="30" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
                  <circle cx="198" cy="137" r="4.5" fill="none" stroke="#06B6D4" strokeWidth="1.8" />
                  {/* Microfoonarm */}
                  <path d="M 102 144 Q 106 162 124 164" stroke="#475569" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <circle cx="125" cy="164" r="3" fill="#06B6D4" />
                </g>
                </g>
              )}


              {/* Gouden Rolex/horloge bij hoog inkomen */}
              {incomeLevel === "hoog" && (
                <g id="luxuryWatch">
                  <circle cx="230" cy="275" r="9" fill="url(#goldAccent)" />
                  <circle cx="230" cy="275" r="6" fill="#1E293B" />
                  <line x1="230" y1="275" x2="230" y2="271" stroke="#DFB25A" strokeWidth="1.5" />
                  <line x1="230" y1="275" x2="233" y2="275" stroke="#DFB25A" strokeWidth="1.5" />
                </g>
              )}
            </svg>

            {/* Beroep badge zwevend rechtsboven */}
            <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-md border border-[#dfb25a]/60 text-[#dfb25a] px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
              <Sparkles className="w-3 h-3 text-[#dfb25a]" />
              <span className="capitalize">{jobSector === "student" || jobSector === "scholier" ? "Scholier / Student" : jobSector}</span>
            </div>

            {/* Prijs/Koopkracht badge linksonder */}
            <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-md border border-white/20 text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {incomeLevel === "budget" ? "Budget / Prijsbewust" : incomeLevel === "modaal" ? "Modaal / Kwaliteit" : "Vermogend / Premium"}
              </span>
            </div>
          </div>
        </div>

        {/* Onderste Game Stats HUD */}
        {showHud && (
          <div className="relative z-10 mt-3 pt-3 border-t border-white/10 space-y-2.5 text-xs text-white/80">
            {/* Karakter naam & samenvatting */}
            <div className="text-center pb-1">
              <h4 className="text-base font-extrabold text-white tracking-wide">
                {persona.name || (gender ? (gender === "man" ? "Klant Robert" : "Klant Sophie") : "Nieuwe Klantpersona")}
              </h4>
              <p className="text-[11px] text-[#dfb25a] font-medium">
                {ageGroup ? `${ageGroup} jaar` : "Leeftijd n.t.b."} • {incomeLevel === "hoog" ? "Maatpak / Hoge Koopkracht" : incomeLevel === "modaal" ? "Smart Casual / Gemiddeld" : incomeLevel === "budget" ? "Eenvoudig / Budget" : "Koopkracht n.t.b."}
              </p>
            </div>

            {/* RPG Stat Meters */}
            <div className="space-y-1.5 bg-black/40 p-2.5 rounded-xl border border-white/5">
              {/* Koopkracht Balk */}
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-white/70 flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-emerald-400" /> Koopkracht
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3].map((star) => (
                    <span
                      key={star}
                      className={`w-4 h-1.5 rounded-full ${
                        star <= purchasingPower ? "bg-emerald-400" : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Urgentie / Beslissnelheid */}
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-white/70 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" /> Koopmotief
                </span>
                <span className="font-semibold text-amber-300">
                  {urgencyLabel}
                </span>
              </div>

              {/* Primaire Kanaal */}
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-white/70 flex items-center gap-1">
                  <Target className="w-3 h-3 text-cyan-400" /> Hangout
                </span>
                <span className="font-semibold text-cyan-300 capitalize">
                  {persona.platforms && persona.platforms.length > 0 ? persona.platforms[0] : "Nog niet gekozen"}
                </span>
              </div>
            </div>

            {/* Dynamische context quote als die is ingevuld */}
            {persona.customContext && (
              <div className="p-2.5 rounded-lg bg-[#dfb25a]/10 border border-[#dfb25a]/25 text-[11px] italic text-[#f7d57f] leading-snug">
                &ldquo;{persona.customContext}&rdquo;
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
