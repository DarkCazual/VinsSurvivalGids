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
  
  // DUIDELIJKE, CONTRASTRIJKE HAARKLEUREN (zodat het nooit wegvalt in de donkere achtergrond)
  let hairColor = "#824622"; // Warm kastanjebruin met veel diepte
  let hairHighlight = "#C68241"; // Warme gouden/honing highlights
  let hairRim = "#DFB25A"; // Lichte contourrand
  let hasWrinkles = false;
  let hasGlasses = false;

  if (ageGroup === "18-25") {
    // Jonge frisse warme kastanjebruine/karamel look
    hairColor = "#783E19";
    hairHighlight = "#C47C38";
    hairRim = "#F59E0B";
  } else if (ageGroup === "26-40") {
    // Warme espresso mocha met karamel highlights
    hairColor = "#5E331B";
    hairHighlight = "#9E5E30";
    hairRim = "#D97706";
  } else if (ageGroup === "41-64") {
    // Karakteristiek peper & zout (zilvergrijs met leisteen)
    hairColor = "#6B7280";
    hairHighlight = "#9CA3AF";
    hairRim = "#E5E7EB";
    hasWrinkles = true;
  } else if (ageGroup === "65+") {
    // Helder zilver/wit haar dat prachtig afsteekt
    hairColor = "#E2E8F0";
    hairHighlight = "#FFFFFF";
    hairRim = "#F8FAFC";
    hasWrinkles = true;
    hasGlasses = true;
  }

  // Kledingkleur en stijl op basis van inkomen
  let clothingColor = "#4B5563"; // budget (grijze hoodie)
  let clothingAccent = "#374151";
  let clothingType = "hoodie";

  if (incomeLevel === "budget") {
    clothingColor = "#4B5563"; // Casual hoodie
    clothingAccent = "#374151";
    clothingType = "hoodie";
  } else if (incomeLevel === "modaal") {
    clothingColor = "#1E3A8A"; // Smart navy gebreide merino trui
    clothingAccent = "#3B82F6";
    clothingType = "sweater";
  } else if (incomeLevel === "hoog") {
    clothingColor = "#0F172A"; // Luxe diepzwart/navy Italiaans maatpak
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
            
            {/* Halo / Cirkel ring achter het personage */}
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
                  /* Simpele casual hoodie / shirt */
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
                  /* Nette sweater met kraagje */
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
                  /* Luxe Italiaans maatpak met gouden revers speld */
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
                  /* Veiligheidshesje accenten */
                  <g>
                    <path d="M 75 255 L 95 230 L 110 238 L 90 268 Z" fill="#F59E0B" opacity="0.95" />
                    <path d="M 225 255 L 205 230 L 190 238 L 210 268 Z" fill="#F59E0B" opacity="0.95" />
                    <rect x="80" y="250" width="30" height="4" fill="#FFFFFF" opacity="0.8" />
                    <rect x="190" y="250" width="30" height="4" fill="#FFFFFF" opacity="0.8" />
                  </g>
                )}

                {jobSector === "hulpdiensten" && (
                  /* Hulpdienst epauletten en borstembleem */
                  <g>
                    <rect x="75" y="235" width="25" height="8" rx="2" fill="#1E3A8A" stroke="#DFB25A" strokeWidth="1" />
                    <rect x="200" y="235" width="25" height="8" rx="2" fill="#1E3A8A" stroke="#DFB25A" strokeWidth="1" />
                    <circle cx="120" cy="245" r="5" fill="#DFB25A" />
                  </g>
                )}

                {jobSector === "politiek" && (
                  /* Advocatentoga / Witte Bef (legal collar) */
                  <g>
                    <polygon points="144,204 156,204 153,245 147,245" fill="#FFFFFF" />
                    <line x1="150" y1="204" x2="150" y2="245" stroke="#CBD5E1" strokeWidth="1" />
                  </g>
                )}

                {jobSector === "zorg" && (
                  /* Stethoscoop over schouders */
                  <g stroke="#94A3B8" strokeWidth="3" fill="none">
                    <path d="M 120 205 C 115 250, 130 265, 150 265 C 170 265, 185 250, 180 205" />
                    <circle cx="150" cy="265" r="5" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
                  </g>
                )}
              </g>

              {/* ===== HALS ===== */}
              <rect x="135" y="168" width="30" height="38" rx="4" fill={skinShadow} />
              <path d="M 135 180 Q 150 194 165 180 L 165 206 L 135 206 Z" fill={skinTone} opacity="0.7" />

              {/* ===== HOOFD & GEZICHT ===== */}
              <g id="head">
                {gender === "man" ? (
                  /* VERFIJNDE, SLANKE MANNELIJKE KAAKLIJN (Niet meer te groot/zwaar) */
                  <path
                    d="M 112 128 C 112 170, 128 186, 150 186 C 172 186, 188 170, 188 128 C 188 88, 112 88, 112 128 Z"
                    fill={skinTone}
                  />
                ) : (
                  /* Vrouwelijke zachtere kaaklijn */
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

                {/* Wenkbrauwen met contrast */}
                {gender === "man" ? (
                  <g stroke={hairColor} strokeWidth="3.2" strokeLinecap="round">
                    <line x1="126" y1="126" x2="142" y2="125" />
                    <line x1="158" y1="125" x2="174" y2="126" />
                  </g>
                ) : (
                  <g stroke={hairColor} strokeWidth="2.4" strokeLinecap="round">
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

                {/* SUBTIELE, VERFIJNDE STOPPELS VOOR MANNEN 26-64 (Geen grote zware kin meer!) */}
                {gender === "man" && (ageGroup === "26-40" || ageGroup === "41-64") && (
                  <path
                    d="M 126 154 C 128 174, 138 181, 150 181 C 162 181, 172 174, 174 154 C 170 167, 160 174, 150 174 C 140 174, 130 167, 126 154 Z"
                    fill={hairColor}
                    opacity="0.22"
                  />
                )}
              </g>

              {/* ===== HAARDRACHT (MET HOOG CONTRAST & LICHTE RAND) ===== */}
              <g id="hair" filter="url(#softShadow)">
                {gender === "man" ? (
                  /* Mannen kapsel */
                  ageGroup === "65+" ? (
                    <g fill={hairColor} stroke={hairRim} strokeWidth="1">
                      <path d="M 108 135 C 105 105, 115 95, 128 92 C 124 105, 115 125, 112 145 Z" />
                      <path d="M 192 135 C 195 105, 185 95, 172 92 C 176 105, 185 125, 188 145 Z" />
                      <path d="M 125 90 C 138 84, 162 84, 175 90 C 160 86, 140 86, 125 90 Z" opacity="0.8" fill={hairHighlight} />
                    </g>
                  ) : ageGroup === "18-25" ? (
                    /* Jonge kuif met highlight */
                    <g fill={hairColor} stroke={hairRim} strokeWidth="1">
                      <path d="M 106 128 C 106 85, 120 70, 150 70 C 180 70, 194 85, 194 128 C 194 108, 185 92, 150 92 C 115 92, 106 108, 106 128 Z" />
                      <path d="M 120 83 C 140 68, 170 73, 182 80 C 160 76, 135 78, 120 83 Z" fill={hairHighlight} stroke="none" />
                    </g>
                  ) : (
                    /* Nette moderne scheiding */
                    <g fill={hairColor} stroke={hairRim} strokeWidth="1">
                      <path d="M 106 130 C 106 86, 125 78, 150 78 C 175 78, 194 86, 194 130 C 194 110, 185 95, 150 95 C 115 95, 106 110, 106 130 Z" />
                      <path d="M 125 84 C 145 78, 170 80, 185 87 C 160 82, 138 82, 125 84 Z" fill={hairHighlight} stroke="none" />
                    </g>
                  )
                ) : (
                  /* Vrouwen kapsel */
                  ageGroup === "65+" ? (
                    <g fill={hairColor} stroke={hairRim} strokeWidth="1">
                      <path d="M 102 145 C 98 98, 110 73, 150 73 C 190 73, 202 98, 198 145 C 205 130, 204 95, 185 80 C 165 70, 135 70, 115 80 C 96 95, 95 130, 102 145 Z" />
                    </g>
                  ) : ageGroup === "18-25" ? (
                    <g fill={hairColor} stroke={hairRim} strokeWidth="1">
                      <path d="M 100 175 C 95 108, 110 76, 150 76 C 190 76, 205 108, 200 175 C 206 140, 205 95, 185 83 C 165 74, 135 74, 115 83 C 95 95, 94 140, 100 175 Z" />
                      <path d="M 98 158 C 95 183, 105 208, 112 228 C 110 203, 105 178, 102 158 Z" />
                      <path d="M 202 158 C 205 183, 195 208, 188 228 C 190 203, 195 178, 198 158 Z" />
                      <path d="M 130 84 Q 150 76 170 84 Q 150 80 130 84 Z" fill={hairHighlight} stroke="none" />
                    </g>
                  ) : (
                    <g fill={hairColor} stroke={hairRim} strokeWidth="1">
                      <path d="M 102 165 C 98 103, 112 78, 150 78 C 188 78, 202 103, 198 165 C 204 135, 202 94, 185 84 C 165 76, 135 76, 115 84 C 98 94, 96 135, 102 165 Z" />
                      <path d="M 100 153 C 96 178, 104 203, 110 213 C 108 193, 104 173, 102 153 Z" />
                      <path d="M 200 153 C 204 178, 196 203, 190 213 C 192 193, 196 173, 198 153 Z" />
                    </g>
                  )
                )}
              </g>

              {/* ===== GROTE EN LEUKE BEROEPSHOOFDDEKSELS & ACCESSOIRES ===== */}
              
              {/* 1. GROTERE VAKMAN BOUWHELM */}
              {jobSector === "vakman" && (
                <g id="hardHat" filter="url(#softShadow)">
                  {/* Helm koepel - groter en hoger */}
                  <path d="M 98 98 C 98 48, 202 48, 202 98 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
                  {/* Helm rand / klep - breder */}
                  <path d="M 88 102 Q 150 114 212 102 L 204 94 Q 150 102 96 94 Z" fill="#D97706" />
                  {/* Verhoogde centrale verstevigingsrichel */}
                  <rect x="144" y="52" width="12" height="34" rx="4" fill="#B45309" />
                  {/* Witte reflecterende veiligheidsstreep */}
                  <path d="M 112 88 Q 150 96 188 88" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.9" />
                </g>
              )}

              {/* 2. HULPDIENSTEN POLITIE / BRANDWEER / AMBULANCE PET */}
              {jobSector === "hulpdiensten" && (
                <g id="policeCap" filter="url(#softShadow)">
                  {/* Cap kroon in diepblauw */}
                  <path d="M 94 92 C 96 52, 204 52, 206 92 Z" fill="#1E3A8A" stroke="#172554" strokeWidth="2" />
                  {/* Zwarte klep met glans */}
                  <path d="M 90 98 Q 150 115 210 98 L 204 92 Q 150 102 96 92 Z" fill="#0F172A" />
                  <path d="M 120 102 Q 150 110 180 102" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.4" />
                  {/* Gouden koord */}
                  <line x1="98" y1="92" x2="202" y2="92" stroke="#DFB25A" strokeWidth="3" />
                  {/* Gouden politie/brandweer ster badge */}
                  <polygon points="150,66 153,74 161,74 155,79 157,87 150,82 143,87 145,79 139,74 147,74" fill="#DFB25A" stroke="#B45309" strokeWidth="0.8" />
                </g>
              )}

              {/* 3. STUDENT AFSTUDEERHOED (Mortarboard) */}
              {jobSector === "student" && (
                <g id="graduationCap" filter="url(#softShadow)">
                  {/* Kap schedel */}
                  <path d="M 116 88 C 116 74, 184 74, 184 88 Z" fill="#1E293B" />
                  {/* Diamantvormige vierkante plank bovenop */}
                  <polygon points="150,42 224,62 150,82 76,62" fill="#0F172A" stroke="#334155" strokeWidth="2" />
                  {/* Knoop in midden */}
                  <circle cx="150" cy="62" r="3.5" fill="#DFB25A" />
                  {/* Gouden kwastje (tassel) dat afhangt */}
                  <path d="M 150 62 Q 192 68 200 92" stroke="#DFB25A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <rect x="197" y="92" width="7" height="14" rx="2" fill="#DFB25A" />
                </g>
              )}

              {/* 4. GEPENSIONEERD KLASSIEKE FLAT CAP (Baret / Golfpet) */}
              {jobSector === "gepensioneerd" && (
                <g id="flatCap" filter="url(#softShadow)">
                  <path d="M 94 98 C 96 65, 172 58, 206 86 L 214 96 Q 150 106 94 98 Z" fill="#78716C" stroke="#57534E" strokeWidth="1.5" />
                  <path d="M 108 96 Q 150 104 196 96" stroke="#44403C" strokeWidth="2" fill="none" />
                </g>
              )}

              {/* 5. TECH / CREATIEF GROTE OVER-EAR KOPTELEFOON */}
              {jobSector === "tech" && (
                <g id="bigHeadphones" filter="url(#softShadow)">
                  {/* Hoofdband over het hoofd */}
                  <path d="M 98 135 C 96 68, 204 68, 202 135" stroke="#334155" strokeWidth="7" fill="none" strokeLinecap="round" />
                  {/* Grote linker oorschelp */}
                  <rect x="90" y="120" width="18" height="34" rx="8" fill="#1E293B" stroke="#DFB25A" strokeWidth="1.5" />
                  {/* Grote rechter oorschelp */}
                  <rect x="192" y="120" width="18" height="34" rx="8" fill="#1E293B" stroke="#DFB25A" strokeWidth="1.5" />
                </g>
              )}

              {/* 6. BRIL (voor tech, ondernemer, 65+ of onderwijs) */}
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
