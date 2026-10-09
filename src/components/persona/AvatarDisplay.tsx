"use client";

import React from "react";
import { PersonaData } from "./types";
import { Sparkles, DollarSign, Zap, Target } from "lucide-react";

interface AvatarDisplayProps {
  persona: PersonaData;
  className?: string;
  showHud?: boolean;
}

export function AvatarDisplay({ persona, className = "", showHud = true }: AvatarDisplayProps) {
  const { gender, ageGroup, incomeLevel, jobSector, coreMotivation } = persona;

  // Kleurenpalet voor huidskleur
  const skinTone = "#F9CBB2";
  const skinShadow = "#E8A386";
  const eyeColor = "#1F2937";
  
  // NATUURLIJK BLOND HAARPALET MET DONKERBLOND EN LICHTBLOND VARIATIES
  // "gewoon het hele haar blond met lichte donker blond en licht blond variaties"
  const darkBlonde = "#B8860B";   // Donkerblond / honing aanzet & diepte
  const midBlonde = "#E5BF55";    // Natuurlijk goudblond hoofdmassa
  const lightBlonde = "#FEF08A";  // Lichtblond / zonnelokken
  const brightBlonde = "#FFFBEB"; // Heldere glansaccenten
  const eyebrowBlonde = "#9A6B1F"; // Warme wenkbrauwen passend bij blond

  const hasWrinkles = ageGroup === "41-64" || ageGroup === "65+";
  const hasGlasses = ageGroup === "65+";

  // Beroepen met een passend hoofddeksel
  const hasFullHat = 
    jobSector === "vakman" || 
    jobSector === "hulpdiensten" || 
    jobSector === "horeca" || 
    jobSector === "student" || 
    jobSector === "gepensioneerd";

  // Kledingkleur en stijl op basis van inkomen
  let clothingColor = "#4B5563";
  let clothingAccent = "#374151";
  let clothingType = "hoodie";

  if (incomeLevel === "budget") {
    clothingColor = "#4B5563"; // Casual hoodie
    clothingAccent = "#374151";
    clothingType = "hoodie";
  } else if (incomeLevel === "modaal") {
    clothingColor = "#1E3A8A"; // Smart navy trui
    clothingAccent = "#3B82F6";
    clothingType = "sweater";
  } else if (incomeLevel === "hoog") {
    clothingColor = "#0F172A"; // Luxe donker maatpak
    clothingAccent = "#DFB25A"; // Gouden details
    clothingType = "suit";
  }

  // RPG Koopkracht score (1-3)
  const purchasingPower = incomeLevel === "budget" ? 1 : incomeLevel === "modaal" ? 2 : 3;

  // RPG Urgentiescore
  const urgencyLabel = 
    coreMotivation === "snelheid" ? "Zeer Hoog ⚡" : 
    coreMotivation === "kwaliteit" ? "Bewezen Kwaliteit 💎" : 
    coreMotivation === "prijs" ? "Scherpe Prijs 🏷️" : 
    coreMotivation === "ontzorging" ? "Totale Rust 🛡️" : "Vertrouwen 🤝";

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
                <linearGradient id="avatarGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dfb25a" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#a16e38" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f7d57f" />
                  <stop offset="100%" stopColor="#b37c35" />
                </linearGradient>
                <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0a0f1d" />
                </linearGradient>
                <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.4" />
                </filter>
              </defs>

              {/* Achtergrond ring & subtiele cirkel */}
              <circle cx="150" cy="150" r="130" fill="url(#avatarGlow)" />
              <circle cx="150" cy="150" r="128" fill="none" stroke="#dfb25a" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="6 4" />

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

                {/* Beroepsspecifieke kledingdetails */}
                {jobSector === "vakman" && (
                  <g>
                    <path d="M 75 255 L 95 230 L 110 238 L 90 268 Z" fill="#F59E0B" opacity="0.95" />
                    <path d="M 225 255 L 205 230 L 190 238 L 210 268 Z" fill="#F59E0B" opacity="0.95" />
                    <rect x="80" y="250" width="30" height="4" fill="#FFFFFF" opacity="0.8" />
                    <rect x="190" y="250" width="30" height="4" fill="#FFFFFF" opacity="0.8" />
                  </g>
                )}

                {jobSector === "hulpdiensten" && (
                  <g>
                    <rect x="75" y="235" width="25" height="8" rx="2" fill="#1E3A8A" stroke="#DFB25A" strokeWidth="1" />
                    <rect x="200" y="235" width="25" height="8" rx="2" fill="#1E3A8A" stroke="#DFB25A" strokeWidth="1" />
                    <circle cx="120" cy="245" r="5" fill="#DFB25A" />
                  </g>
                )}

                {jobSector === "horeca" && (
                  <g>
                    <rect x="115" y="205" width="70" height="85" fill="#F8FAFC" opacity="0.95" />
                    <line x1="138" y1="205" x2="138" y2="290" stroke="#CBD5E1" strokeWidth="1" />
                    <circle cx="132" cy="225" r="3" fill="#1E293B" />
                    <circle cx="144" cy="225" r="3" fill="#1E293B" />
                    <circle cx="132" cy="245" r="3" fill="#1E293B" />
                    <circle cx="144" cy="245" r="3" fill="#1E293B" />
                    <circle cx="132" cy="265" r="3" fill="#1E293B" />
                    <circle cx="144" cy="265" r="3" fill="#1E293B" />
                  </g>
                )}

                {jobSector === "politiek" && (
                  <g>
                    <polygon points="144,204 156,204 153,245 147,245" fill="#FFFFFF" />
                    <line x1="150" y1="204" x2="150" y2="245" stroke="#CBD5E1" strokeWidth="1" />
                  </g>
                )}

                {jobSector === "zorg" && (
                  <g stroke="#94A3B8" strokeWidth="3" fill="none">
                    <path d="M 120 205 C 115 250, 130 265, 150 265 C 170 265, 185 250, 180 205" />
                    <circle cx="150" cy="265" r="5" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
                  </g>
                )}
              </g>

              {/* ===== HALS ===== */}
              <rect x="135" y="168" width="30" height="38" rx="4" fill={skinShadow} />
              <path d="M 135 180 Q 150 194 165 180 L 165 206 L 135 206 Z" fill={skinTone} opacity="0.7" />

              {/* ===== ACHTERSTE HAARLAAG (VOOR VROUWEN MET LANG HAAR) ===== */}
              {gender === "vrouw" && (
                <g id="backHair" filter="url(#softShadow)">
                  {/* Donkerblonde dieptelaag achter schouders */}
                  <path d="M 94 135 C 90 180, 100 215, 108 238 C 104 205, 100 170, 98 135 Z" fill={darkBlonde} />
                  <path d="M 206 135 C 210 180, 200 215, 192 238 C 196 205, 200 170, 202 135 Z" fill={darkBlonde} />
                  {/* Goudblonde hoofdmassa */}
                  <path d="M 98 138 C 94 175, 104 210, 112 232 C 108 200, 104 165, 102 138 Z" fill={midBlonde} />
                  <path d="M 202 138 C 206 175, 196 210, 188 232 C 192 200, 196 165, 198 138 Z" fill={midBlonde} />
                  {/* Lichtblonde highlights op vallende lokken */}
                  <path d="M 101 150 Q 98 185 108 222" stroke={lightBlonde} strokeWidth="2" fill="none" opacity="0.9" />
                  <path d="M 199 150 Q 202 185 192 222" stroke={lightBlonde} strokeWidth="2" fill="none" opacity="0.9" />
                </g>
              )}

              {/* ===== HOOFD & GEZICHT ===== */}
              <g id="head">
                {gender === "man" ? (
                  /* Mannelijke kaaklijn */
                  <path
                    d="M 112 128 C 112 170, 128 186, 150 186 C 172 186, 188 170, 188 128 C 188 88, 112 88, 112 128 Z"
                    fill={skinTone}
                  />
                ) : (
                  /* Vrouwelijke zachte kaaklijn */
                  <path
                    d="M 114 128 C 114 174, 128 186, 150 186 C 172 186, 186 174, 186 128 C 186 86, 114 86, 114 128 Z"
                    fill={skinTone}
                  />
                )}

                {/* Oren */}
                <circle cx="110" cy="140" r="7" fill={skinTone} />
                <circle cx="190" cy="140" r="7" fill={skinTone} />
                {gender === "vrouw" && incomeLevel === "hoog" && (
                  <g>
                    <circle cx="110" cy="147" r="3" fill="#FFFFFF" />
                    <circle cx="190" cy="147" r="3" fill="#FFFFFF" />
                  </g>
                )}

                {/* Ogen */}
                <ellipse cx="134" cy="136" rx="5" ry="5.5" fill="#FFFFFF" />
                <circle cx="134" cy="136" r="3.2" fill={eyeColor} />
                <circle cx="135.5" cy="134.5" r="1.2" fill="#FFFFFF" />

                <ellipse cx="166" cy="136" rx="5" ry="5.5" fill="#FFFFFF" />
                <circle cx="166" cy="136" r="3.2" fill={eyeColor} />
                <circle cx="167.5" cy="134.5" r="1.2" fill="#FFFFFF" />

                {/* Wenkbrauwen (passend warm blond) */}
                {gender === "man" ? (
                  <g stroke={eyebrowBlonde} strokeWidth="3" strokeLinecap="round">
                    <line x1="126" y1="126" x2="142" y2="125" />
                    <line x1="158" y1="125" x2="174" y2="126" />
                  </g>
                ) : (
                  <g stroke={eyebrowBlonde} strokeWidth="2.2" strokeLinecap="round">
                    <path d="M 126 126 Q 135 122 143 125" fill="none" />
                    <path d="M 157 125 Q 165 122 174 126" fill="none" />
                  </g>
                )}

                {/* Neus */}
                <path d="M 150 134 L 148 150 L 153 150" fill="none" stroke={skinShadow} strokeWidth="2" strokeLinecap="round" />

                {/* Mond */}
                <path d="M 142 163 Q 150 170 158 163" fill="none" stroke="#C27161" strokeWidth="2.5" strokeLinecap="round" />

                {/* Rimpeltjes bij 41+ en 65+ */}
                {hasWrinkles && (
                  <g stroke="#D48B6F" strokeWidth="1.2" strokeLinecap="round" opacity="0.75">
                    <line x1="135" y1="110" x2="165" y2="110" />
                    {ageGroup === "65+" && <line x1="138" y1="104" x2="162" y2="104" />}
                    <line x1="122" y1="134" x2="127" y2="136" />
                    <line x1="122" y1="138" x2="127" y2="138" />
                    <line x1="178" y1="134" x2="173" y2="136" />
                    <line x1="178" y1="138" x2="173" y2="138" />
                    <path d="M 137 157 Q 138 164 141 169" fill="none" />
                    <path d="M 163 157 Q 162 164 159 169" fill="none" />
                  </g>
                )}

                {/* Subtiele blonde stoppelbaard voor mannen 26-64 */}
                {gender === "man" && (ageGroup === "26-40" || ageGroup === "41-64") && (
                  <path
                    d="M 126 154 C 128 174, 138 181, 150 181 C 162 181, 172 174, 174 154 C 170 167, 160 174, 150 174 C 140 174, 130 167, 126 154 Z"
                    fill={eyebrowBlonde}
                    opacity="0.16"
                  />
                )}
              </g>

              {/* ===== BLOND HAAR MET NATUURLIJKE VARIATIES (DONKERBLOND & LICHTBLOND) ===== */}
              {/* Als er GEEN volle hoed over het hoofd zit: toon het volledige kapsel */}
              {!hasFullHat && (
                <g id="fullBlondeHair" filter="url(#softShadow)">
                  {gender === "man" ? (
                    /* MANNELIJK BLOND KAPSEL MET NATUURLIJKE LOKKEN & HIGHLIGHTS */
                    <g>
                      {/* 1. Basis dieptevolume in donkerblond (#B8860B) */}
                      <path
                        d="M 104 130 C 104 80, 120 66, 150 66 C 180 66, 196 80, 196 130 C 196 110, 185 96, 150 96 C 115 96, 104 110, 104 130 Z"
                        fill={darkBlonde}
                      />
                      {/* Bakkebaarden donkerblond */}
                      <path d="M 108 126 L 111 138 L 115 130 Z" fill={darkBlonde} />
                      <path d="M 192 126 L 189 138 L 185 130 Z" fill={darkBlonde} />

                      {/* 2. Goudblonde hoofdmassa (#E5BF55) met natuurlijke lokken over het voorhoofd */}
                      <path
                        d="M 106 126 C 106 78, 122 68, 150 68 C 178 68, 194 78, 194 126 C 192 108, 182 98, 168 102 C 154 106, 142 98, 130 105 C 120 110, 110 116, 106 126 Z"
                        fill={midBlonde}
                      />

                      {/* 3. Lichtblonde zonnelokken (#FEF08A) & kuifpartij */}
                      <path
                        d="M 118 84 C 136 68, 164 70, 178 78 C 160 74, 140 76, 124 86 Z"
                        fill={lightBlonde}
                      />
                      {/* Speelse blonde lokken die over het voorhoofd vallen */}
                      <path
                        d="M 126 98 C 134 108, 142 110, 148 105 C 142 100, 136 96, 126 98 Z"
                        fill={lightBlonde}
                      />
                      <path
                        d="M 152 102 C 160 112, 170 110, 174 104 C 168 101, 160 98, 152 102 Z"
                        fill={lightBlonde}
                      />

                      {/* 4. Heldere blonde glanslijnen (#FFFBEB) */}
                      <path d="M 128 76 Q 146 72 166 76" stroke={brightBlonde} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
                      <path d="M 134 84 Q 150 80 162 84" stroke={brightBlonde} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7" />
                    </g>
                  ) : (
                    /* VROUWELIJK BLOND KAPSEL MET NATUURLIJKE LOKKEN & HIGHLIGHTS */
                    <g>
                      {/* 1. Donkerblonde basis & haarparting (#B8860B) */}
                      <path
                        d="M 98 142 C 94 94, 112 68, 150 68 C 188 68, 206 94, 202 142 C 206 118, 202 88, 185 78 C 165 68, 135 68, 115 78 C 98 88, 94 118, 98 142 Z"
                        fill={darkBlonde}
                      />

                      {/* 2. Goudblonde middellaag met lokken langs het gezicht (#E5BF55) */}
                      <path
                        d="M 100 148 C 98 90, 114 70, 150 70 C 186 70, 202 90, 200 148 C 196 115, 185 96, 166 102 C 150 108, 142 100, 132 104 C 115 110, 104 125, 100 148 Z"
                        fill={midBlonde}
                      />

                      {/* 3. Lichtblonde gezicht-omlijstende lokken (#FEF08A) */}
                      <path
                        d="M 112 100 C 122 114, 126 135, 122 152 C 120 134, 118 116, 112 100 Z"
                        fill={lightBlonde}
                      />
                      <path
                        d="M 188 100 C 178 114, 174 135, 178 152 C 180 134, 182 116, 188 100 Z"
                        fill={lightBlonde}
                      />

                      {/* 4. Lichtblond volume bovenop met glans (#FEF08A & #FFFBEB) */}
                      <path
                        d="M 120 78 C 138 70, 162 70, 180 78 C 162 74, 138 74, 120 78 Z"
                        fill={lightBlonde}
                      />
                      <path d="M 128 74 Q 150 70 172 74" stroke={brightBlonde} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
                    </g>
                  )}
                </g>
              )}

              {/* ===== BLONDE HAARLOKKEN LANGS DE ZIJKANT ONDER EEN HOED/PET ===== */}
              {hasFullHat && (
                <g id="hatUnderHair">
                  {/* Bakkebaarden & oorlokken in blond met donker/licht variatie */}
                  <path d="M 108 122 C 106 130, 108 140, 112 144 C 111 136, 110 128, 109 122 Z" fill={darkBlonde} />
                  <path d="M 192 122 C 194 130, 192 140, 188 144 C 189 136, 190 128, 191 122 Z" fill={darkBlonde} />
                  <path d="M 109 124 C 108 132, 109 138, 112 142 Z" fill={lightBlonde} opacity="0.9" />
                  <path d="M 191 124 C 192 132, 191 138, 188 142 Z" fill={lightBlonde} opacity="0.9" />

                  {/* Vrouwelijk vallend haar onder de hoed */}
                  {gender === "vrouw" && (
                    <g>
                      <path d="M 100 135 C 96 165, 104 205, 112 225 C 108 198, 104 165, 100 135 Z" fill={midBlonde} />
                      <path d="M 200 135 C 204 165, 196 205, 188 225 C 192 198, 196 165, 200 135 Z" fill={midBlonde} />
                      <path d="M 99 145 Q 98 180 108 215" stroke={lightBlonde} strokeWidth="1.8" fill="none" opacity="0.8" />
                      <path d="M 201 145 Q 202 180 192 215" stroke={lightBlonde} strokeWidth="1.8" fill="none" opacity="0.8" />
                    </g>
                  )}
                </g>
              )}

              {/* ===== HOOFDDEKSELS: PERFECT GEPROPORTIONEERD, NIET TE BREED, STRAK OP HET HOOFD ===== */}
              
              {/* 1. VAKMAN BOUWHELM: Strak over de schedel, breedte 98px (ipv 140px), klep net boven de wenkbrauwen */}
              {jobSector === "vakman" && (
                <g id="hardHat" filter="url(#softShadow)">
                  {/* Helm koepel: zit direct op de schedel (top y: 70, sluit aan op y: 114) */}
                  <path
                    d="M 104 114 C 102 68, 198 68, 196 114 Z"
                    fill="#F59E0B"
                    stroke="#D97706"
                    strokeWidth="2"
                  />
                  {/* Stevige helmrand / klep: netjes 100px breed (x: 100 tot 200), lipje op y: 118 (vlak boven wenkbrauw) */}
                  <path
                    d="M 98 114 Q 150 122 202 114 L 198 108 Q 150 114 102 108 Z"
                    fill="#D97706"
                  />
                  {/* Centrale verstevigingsrichel over de top */}
                  <rect x="145" y="66" width="10" height="36" rx="3" fill="#B45309" />
                  {/* Witte reflecterende veiligheidsstreep over de boog */}
                  <path
                    d="M 112 98 Q 150 104 188 98"
                    stroke="#FFFFFF"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.95"
                  />
                </g>
              )}

              {/* 2. HULPDIENSTEN POLITIE / DIENSTPET: Slank, strak op het voorhoofd met glanzende klep */}
              {jobSector === "hulpdiensten" && (
                <g id="policeCap" filter="url(#softShadow)">
                  {/* Cap kroon in marineblauw (breedte 96px, top y: 68) */}
                  <path
                    d="M 102 112 C 100 66, 200 66, 198 112 Z"
                    fill="#1E3A8A"
                    stroke="#172554"
                    strokeWidth="2"
                  />
                  {/* Zwarte band strak om het voorhoofd */}
                  <path d="M 106 108 Q 150 116 194 108 L 192 116 Q 150 122 108 116 Z" fill="#0F172A" />
                  {/* Glanzende klep laag over de wenkbrauwen (y: 114 tot 122) */}
                  <path
                    d="M 104 114 Q 150 124 196 114 Q 150 118 104 114 Z"
                    fill="#0A0F1D"
                    stroke="#000000"
                    strokeWidth="0.8"
                  />
                  <path d="M 125 117 Q 150 121 175 117" stroke="#FFFFFF" strokeWidth="1.5" fill="none" opacity="0.4" />
                  {/* Gouden gedraaid koord */}
                  <path d="M 106 112 Q 150 118 194 112" stroke="#DFB25A" strokeWidth="2.5" fill="none" />
                  {/* Gouden politie ster badge */}
                  <polygon points="150,84 153,92 161,92 155,97 157,104 150,100 143,104 145,97 139,92 147,92" fill="#DFB25A" stroke="#B45309" strokeWidth="0.8" />
                </g>
              )}

              {/* 3. HORECA KOKSMUTS: Geproportioneerd over het hoofd (niet torenhoog) */}
              {jobSector === "horeca" && (
                <g id="chefHat" filter="url(#softShadow)">
                  {/* Witte geplooide wolk (top y: 46, breedte 96px) */}
                  <path
                    d="M 110 110 C 94 78, 104 46, 150 44 C 196 46, 206 78, 190 110 Z"
                    fill="#FFFFFF"
                    stroke="#CBD5E1"
                    strokeWidth="1.8"
                  />
                  {/* Plooilijntjes */}
                  <path d="M 132 54 Q 128 85 130 108" stroke="#94A3B8" strokeWidth="1.2" fill="none" opacity="0.5" />
                  <path d="M 150 46 Q 150 82 150 108" stroke="#94A3B8" strokeWidth="1.5" fill="none" opacity="0.5" />
                  <path d="M 168 54 Q 172 85 170 108" stroke="#94A3B8" strokeWidth="1.2" fill="none" opacity="0.5" />
                  {/* Band strak om het voorhoofd (y: 108 tot 118, breedte 88px) */}
                  <rect x="106" y="108" width="88" height="11" rx="2.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
                </g>
              )}

              {/* 4. STUDENT AFSTUDEERHOED (Mortarboard): Goed passend, 104px breed */}
              {jobSector === "student" && (
                <g id="graduationCap" filter="url(#softShadow)">
                  {/* Schedelkapje direct op het hoofd */}
                  <path d="M 116 114 C 116 90, 184 90, 184 114 Z" fill="#1E293B" />
                  {/* Diamant plank netjes geproportioneerd (breedte 108px) */}
                  <polygon points="150,56 204,70 150,84 96,70" fill="#0F172A" stroke="#334155" strokeWidth="1.8" />
                  {/* Knoop & zwierige gouden tassel */}
                  <circle cx="150" cy="70" r="3.5" fill="#DFB25A" />
                  <path d="M 150 70 Q 186 76 194 100" stroke="#DFB25A" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                  <rect x="191" y="100" width="6" height="14" rx="1.5" fill="#DFB25A" />
                </g>
              )}

              {/* 5. GEPENSIONEERD FLAT CAP: Strak over de kruin */}
              {jobSector === "gepensioneerd" && (
                <g id="flatCap" filter="url(#softShadow)">
                  <path
                    d="M 102 116 C 100 74, 172 68, 198 100 L 200 114 Q 150 122 102 116 Z"
                    fill="#78716C"
                    stroke="#57534E"
                    strokeWidth="1.8"
                  />
                  <path d="M 112 114 Q 150 120 188 114" stroke="#44403C" strokeWidth="2" fill="none" />
                </g>
              )}

              {/* 6. TECH KOPTELEFOON: Slank over de oren */}
              {jobSector === "tech" && (
                <g id="bigHeadphones" filter="url(#softShadow)">
                  <path d="M 104 135 C 100 74, 200 74, 196 135" stroke="#334155" strokeWidth="6" fill="none" strokeLinecap="round" />
                  <rect x="94" y="122" width="16" height="32" rx="7" fill="#1E293B" stroke="#DFB25A" strokeWidth="1.5" />
                  <rect x="190" y="122" width="16" height="32" rx="7" fill="#1E293B" stroke="#DFB25A" strokeWidth="1.5" />
                </g>
              )}

              {/* 7. BRIL (voor tech, ondernemer, onderwijs, politiek of 65+) */}
              {(hasGlasses || jobSector === "tech" || jobSector === "ondernemer" || jobSector === "onderwijs" || jobSector === "politiek") && (
                <g stroke="#DFB25A" strokeWidth="2.5" fill="none" opacity="0.95">
                  <rect x="122" y="128" width="22" height="17" rx="4" />
                  <rect x="156" y="128" width="22" height="17" rx="4" />
                  <line x1="144" y1="135" x2="156" y2="135" />
                  <line x1="122" y1="134" x2="110" y2="136" />
                  <line x1="178" y1="134" x2="190" y2="136" />
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
              <span className="capitalize">{jobSector}</span>
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
                {persona.name || (gender === "man" ? "Klant Robert" : "Klant Sophie")}
              </h4>
              <p className="text-[11px] text-[#dfb25a] font-medium">
                {ageGroup} jaar • {incomeLevel === "hoog" ? "Maatpak / Hoge Koopkracht" : incomeLevel === "modaal" ? "Smart Casual / Gemiddeld" : "Eenvoudig / Budget"}
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
                  {persona.platforms[0] || "Google"}
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
