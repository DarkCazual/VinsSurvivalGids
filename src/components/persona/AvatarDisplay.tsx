"use client";

import React from "react";
import { PersonaData } from "./types";
import { Sparkles, DollarSign, Zap, Shield, Target } from "lucide-react";

interface AvatarDisplayProps {
  persona: PersonaData;
  className?: string;
  showHud?: boolean;
}

export function AvatarDisplay({ persona, className = "", showHud = true }: AvatarDisplayProps) {
  const { gender, ageGroup, incomeLevel, jobSector, coreMotivation } = persona;

  // Kleurenpalet voor de elementen
  const skinTone = "#F9CBB2";
  const skinShadow = "#EAA78B";
  const eyeColor = "#2C1810";
  
  // Haarkleur en stijl op basis van leeftijd
  let hairColor = "#3D2314"; // Bruin voor 18-40
  let hairHighlight = "#5C381E";
  let hasWrinkles = false;
  let hasGlasses = false;

  if (ageGroup === "18-25") {
    hairColor = "#2B1B17";
    hairHighlight = "#4A3226";
  } else if (ageGroup === "26-40") {
    hairColor = "#442D1C";
    hairHighlight = "#6B492F";
  } else if (ageGroup === "41-64") {
    hairColor = "#545353"; // Salt & pepper
    hairHighlight = "#888686";
    hasWrinkles = true;
  } else if (ageGroup === "65+") {
    hairColor = "#E2E8F0"; // Zilver / Wit
    hairHighlight = "#CBD5E1";
    hasWrinkles = true;
    hasGlasses = true;
  }

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
      <div className="w-full relative rounded-2xl p-5 overflow-hidden bg-gradient-to-b from-[#2a170b]/90 to-[#190d07] border-2 border-[#dfb25a]/40 shadow-2xl backdrop-blur-md">
        
        {/* Glow achtergrond */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#dfb25a]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#a16e38]/20 rounded-full blur-3xl pointer-events-none" />

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
            <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-2xl">
              <defs>
                <linearGradient id="avatarGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dfb25a" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#a16e38" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f7d57f" />
                  <stop offset="100%" stopColor="#b37c35" />
                </linearGradient>
                <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.3" />
                </filter>
              </defs>

              {/* Achtergrond ring & spotlight */}
              <circle cx="150" cy="150" r="130" fill="url(#avatarGlow)" />
              <circle cx="150" cy="150" r="128" fill="none" stroke="#dfb25a" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="6 4" />

              {/* ===== LICHAAM / SCHOUDERS / KLEDING ===== */}
              <g id="clothing" filter="url(#softShadow)">
                {clothingType === "hoodie" && (
                  /* Simpele casual hoodie / shirt */
                  <g>
                    {/* Schouders */}
                    <path
                      d="M 60 290 C 70 215, 110 205, 150 205 C 190 205, 230 215, 240 290 Z"
                      fill={clothingColor}
                    />
                    {/* Hoodie capuchon plooien */}
                    <path
                      d="M 115 205 C 130 230, 170 230, 185 205 C 180 235, 120 235, 115 205 Z"
                      fill={clothingAccent}
                    />
                    {/* Hoodie koordjes */}
                    <line x1="135" y1="225" x2="135" y2="255" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
                    <line x1="165" y1="225" x2="165" y2="255" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
                  </g>
                )}

                {clothingType === "sweater" && (
                  /* Nette sweater met kraagje */
                  <g>
                    <path
                      d="M 60 290 C 70 215, 110 205, 150 205 C 190 205, 230 215, 240 290 Z"
                      fill={clothingColor}
                    />
                    {/* Wit overhemd boordje onder de trui */}
                    <polygon points="135,200 150,215 142,217" fill="#FFFFFF" />
                    <polygon points="165,200 150,215 158,217" fill="#FFFFFF" />
                    {/* Ronde v-hals kraag */}
                    <path
                      d="M 125 205 Q 150 235 175 205 Q 150 220 125 205 Z"
                      fill={clothingAccent}
                    />
                  </g>
                )}

                {clothingType === "suit" && (
                  /* Luxe Italiaans maatpak met gouden revers speld */
                  <g>
                    {/* Pak schouders */}
                    <path
                      d="M 55 290 C 65 210, 105 200, 150 200 C 195 200, 235 210, 245 290 Z"
                      fill="url(#suitGrad)"
                    />
                    {/* Wit gesteven overhemd */}
                    <polygon points="135,195 165,195 150,260" fill="#FFFFFF" />
                    {/* Strakke das (voor man) of gouden ketting (voor vrouw) */}
                    {gender === "man" ? (
                      <polygon points="146,210 154,210 156,275 150,285 144,275" fill="#991B1B" />
                    ) : (
                      <circle cx="150" cy="235" r="4" fill="url(#goldAccent)" />
                    )}
                    {/* Revers van het colbert links & rechts */}
                    <polygon points="110,202 142,260 120,290 85,240" fill="#1e293b" />
                    <polygon points="190,202 158,260 180,290 215,240" fill="#1e293b" />
                    {/* Gouden VIP revers speld op linkerborst */}
                    <circle cx="112" cy="232" r="3.5" fill="url(#goldAccent)" />
                    <rect x="180" y="245" width="22" height="4" rx="2" fill="#FFFFFF" /> {/* Pochet */}
                  </g>
                )}

                {/* Beroepsgerelateerde toevoeging op kleding */}
                {jobSector === "vakman" && (
                  /* Neon oranje/geel veiligheidsaccent op schouders */
                  <g>
                    <path d="M 75 255 L 95 230 L 110 238 L 90 268 Z" fill="#F59E0B" opacity="0.9" />
                    <path d="M 225 255 L 205 230 L 190 238 L 210 268 Z" fill="#F59E0B" opacity="0.9" />
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
              <rect x="135" y="170" width="30" height="38" rx="4" fill={skinShadow} />
              <path d="M 135 185 Q 150 198 165 185 L 165 208 L 135 208 Z" fill={skinTone} opacity="0.6" />

              {/* ===== HOOFD & GEZICHT ===== */}
              <g id="head">
                {gender === "man" ? (
                  /* Mannelijke kaaklijn */
                  <path
                    d="M 110 130 C 110 185, 125 195, 150 195 C 175 195, 190 185, 190 130 C 190 85, 110 85, 110 130 Z"
                    fill={skinTone}
                  />
                ) : (
                  /* Vrouwelijke zachtere kaaklijn */
                  <path
                    d="M 114 130 C 114 180, 128 192, 150 192 C 172 192, 186 180, 186 130 C 186 85, 114 85, 114 130 Z"
                    fill={skinTone}
                  />
                )}

                {/* Oren */}
                <circle cx="109" cy="142" r="7" fill={skinTone} />
                <circle cx="191" cy="142" r="7" fill={skinTone} />
                {gender === "vrouw" && incomeLevel === "hoog" && (
                  /* Pareloorbel voor welgestelde dame */
                  <g>
                    <circle cx="109" cy="149" r="3" fill="#FFFFFF" />
                    <circle cx="191" cy="149" r="3" fill="#FFFFFF" />
                  </g>
                )}

                {/* Ogen */}
                <ellipse cx="134" cy="138" rx="5" ry="5.5" fill="#FFFFFF" />
                <circle cx="134" cy="138" r="3.2" fill={eyeColor} />
                <circle cx="135.5" cy="136.5" r="1.2" fill="#FFFFFF" />

                <ellipse cx="166" cy="138" rx="5" ry="5.5" fill="#FFFFFF" />
                <circle cx="166" cy="138" r="3.2" fill={eyeColor} />
                <circle cx="167.5" cy="136.5" r="1.2" fill="#FFFFFF" />

                {/* Wenkbrauwen */}
                {gender === "man" ? (
                  <g stroke={hairColor} strokeWidth="3" strokeLinecap="round">
                    <line x1="126" y1="128" x2="142" y2="127" />
                    <line x1="158" y1="127" x2="174" y2="128" />
                  </g>
                ) : (
                  <g stroke={hairColor} strokeWidth="2.2" strokeLinecap="round">
                    <path d="M 126 128 Q 135 124 143 127" fill="none" />
                    <path d="M 157 127 Q 165 124 174 128" fill="none" />
                  </g>
                )}

                {/* Neus */}
                <path d="M 150 136 L 148 152 L 153 152" fill="none" stroke={skinShadow} strokeWidth="2" strokeLinecap="round" />

                {/* Mond */}
                <path d="M 142 166 Q 150 173 158 166" fill="none" stroke="#C27161" strokeWidth="2.5" strokeLinecap="round" />

                {/* Leeftijdsdetails (Rimpeltjes & lachlijntjes bij 41+ en 65+) */}
                {hasWrinkles && (
                  <g stroke="#D48B6F" strokeWidth="1.2" strokeLinecap="round" opacity="0.75">
                    {/* Voorhoofdsrimpels */}
                    <line x1="135" y1="112" x2="165" y2="112" />
                    {ageGroup === "65+" && <line x1="138" y1="106" x2="162" y2="106" />}
                    {/* Kraaienpootjes bij ogen */}
                    <line x1="122" y1="136" x2="127" y2="138" />
                    <line x1="122" y1="140" x2="127" y2="140" />
                    <line x1="178" y1="136" x2="173" y2="138" />
                    <line x1="178" y1="140" x2="173" y2="140" />
                    {/* Lachplooien rond mond */}
                    <path d="M 137 160 Q 138 167 141 172" fill="none" />
                    <path d="M 163 160 Q 162 167 159 172" fill="none" />
                  </g>
                )}

                {/* Mannenbaard/stoppelbaard voor 26-64 */}
                {gender === "man" && (ageGroup === "26-40" || ageGroup === "41-64") && (
                  <path
                    d="M 125 155 C 125 185, 140 193, 150 193 C 160 193, 175 185, 175 155 C 172 178, 162 186, 150 186 C 138 186, 128 178, 125 155 Z"
                    fill={hairColor}
                    opacity="0.35"
                  />
                )}
              </g>

              {/* ===== HAARDRACHT ===== */}
              <g id="hair">
                {gender === "man" ? (
                  /* Mannen kapsel */
                  ageGroup === "65+" ? (
                    /* Senior man: zilver dunner haar aan zijkanten */
                    <g fill={hairColor}>
                      <path d="M 108 135 C 105 105, 115 95, 128 92 C 124 105, 115 125, 112 145 Z" />
                      <path d="M 192 135 C 195 105, 185 95, 172 92 C 176 105, 185 125, 188 145 Z" />
                      <path d="M 125 90 C 138 84, 162 84, 175 90 C 160 86, 140 86, 125 90 Z" opacity="0.6" />
                    </g>
                  ) : ageGroup === "18-25" ? (
                    /* Trendy moderne fade / kuif voor jongere */
                    <g fill={hairColor}>
                      <path d="M 106 130 C 106 88, 120 72, 150 72 C 180 72, 194 88, 194 130 C 194 110, 185 95, 150 95 C 115 95, 106 110, 106 130 Z" />
                      <path d="M 120 85 C 140 70, 170 75, 182 82 C 160 78, 135 80, 120 85 Z" fill={hairHighlight} />
                    </g>
                  ) : (
                    /* Nette strakke scheiding voor millennial / ervaren */
                    <g fill={hairColor}>
                      <path d="M 106 132 C 106 88, 125 80, 150 80 C 175 80, 194 88, 194 132 C 194 112, 185 98, 150 98 C 115 98, 106 112, 106 132 Z" />
                      <path d="M 125 86 C 145 80, 170 82, 185 89 C 160 84, 138 84, 125 86 Z" fill={hairHighlight} />
                    </g>
                  )
                ) : (
                  /* Vrouwen kapsel */
                  ageGroup === "65+" ? (
                    /* Senior dame: verzorgd krullend/kort zilver haar */
                    <g fill={hairColor}>
                      <path d="M 102 145 C 98 100, 110 75, 150 75 C 190 75, 202 100, 198 145 C 205 130, 204 95, 185 82 C 165 72, 135 72, 115 82 C 96 95, 95 130, 102 145 Z" />
                    </g>
                  ) : ageGroup === "18-25" ? (
                    /* Trendy lang haar met highlights */
                    <g fill={hairColor}>
                      <path d="M 100 175 C 95 110, 110 78, 150 78 C 190 78, 205 110, 200 175 C 206 140, 205 95, 185 85 C 165 76, 135 76, 115 85 C 95 95, 94 140, 100 175 Z" />
                      <path d="M 98 160 C 95 185, 105 210, 112 230 C 110 205, 105 180, 102 160 Z" />
                      <path d="M 202 160 C 205 185, 195 210, 188 230 C 190 205, 195 180, 198 160 Z" />
                    </g>
                  ) : (
                    /* Zakelijk chic halflang kapsel */
                    <g fill={hairColor}>
                      <path d="M 102 165 C 98 105, 112 80, 150 80 C 188 80, 202 105, 198 165 C 204 135, 202 96, 185 86 C 165 78, 135 78, 115 86 C 98 96, 96 135, 102 165 Z" />
                      <path d="M 100 155 C 96 180, 104 205, 110 215 C 108 195, 104 175, 102 155 Z" />
                      <path d="M 200 155 C 204 180, 196 205, 190 215 C 192 195, 196 175, 198 155 Z" />
                    </g>
                  )
                )}
              </g>

              {/* ===== ACCESSOIRES & BRIL ===== */}
              {(hasGlasses || jobSector === "tech" || jobSector === "ondernemer") && (
                /* Bril */
                <g stroke="#DFB25A" strokeWidth="2.5" fill="none" opacity="0.9">
                  {/* Linkerglas */}
                  <rect x="122" y="130" width="22" height="17" rx="4" />
                  {/* Rechterglas */}
                  <rect x="156" y="130" width="22" height="17" rx="4" />
                  {/* Brug */}
                  <line x1="144" y1="137" x2="156" y2="137" />
                  {/* Pootjes */}
                  <line x1="122" y1="136" x2="110" y2="138" />
                  <line x1="178" y1="136" x2="190" y2="138" />
                </g>
              )}

              {/* Vakman helm */}
              {jobSector === "vakman" && (
                <g id="hardHat" filter="url(#softShadow)">
                  <path d="M 112 96 C 112 60, 188 60, 188 96 L 202 102 L 98 102 Z" fill="#F59E0B" />
                  <rect x="145" y="65" width="10" height="20" rx="3" fill="#D97706" />
                </g>
              )}

              {/* Tech koptelefoon om nek */}
              {jobSector === "tech" && (
                <g id="headphones" stroke="#475569" strokeWidth="4" fill="none">
                  <path d="M 115 190 C 110 215, 190 215, 185 190" strokeLinecap="round" />
                  <rect x="108" y="180" width="12" height="20" rx="4" fill="#334155" stroke="none" />
                  <rect x="180" y="180" width="12" height="20" rx="4" fill="#334155" stroke="none" />
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
            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md border border-[#dfb25a]/50 text-[#dfb25a] px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
              <Sparkles className="w-3 h-3 text-[#dfb25a]" />
              <span className="capitalize">{jobSector}</span>
            </div>

            {/* Prijs/Koopkracht badge linksonder */}
            <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md border border-white/20 text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
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
