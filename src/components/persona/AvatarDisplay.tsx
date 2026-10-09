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
  
  // Haarkleur en stijl: verzorgd zilver/grijs kapsel voor 65+, stralend warm goudblond voor 18-64
  const isSenior = ageGroup === "65+";
  const hairColor = isSenior ? "#E2E8F0" : "#E5BF55";       // Fris verzorgd zilver/lichtgrijs (65+) vs warm goudblond
  const hairHighlight = isSenior ? "#FFFFFF" : "#FEF08A";   // Heldere witte glans (65+) vs lichte zonneblonde highlights
  const hairLowlight = isSenior ? "#94A3B8" : "#C6922C";    // Zacht leisteengrijs voor diepte (65+) vs donkerblonde aanzet
  const eyebrowColor = isSenior ? "#64748B" : "#9C6E23";    // Gedistingeerde zilver-grijze wenkbrauwen (65+) vs warm blond

  const hasWrinkles = ageGroup === "41-64" || ageGroup === "65+";
  const hasGlasses = ageGroup === "65+";
  const hasHat = jobSector === "vakman" || jobSector === "hulpdiensten" || jobSector === "horeca" || jobSector === "student" || jobSector === "gepensioneerd";

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
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.4" />
                </filter>
              </defs>

              {/* Achtergrond ring & spotlight */}
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

              {/* ===== ACHTERSTE HAARMASSA (VOOR VROUWEN NATUURLIJK EN NIET TE BREED) ===== */}
              {gender === "vrouw" ? (
                <g id="backHairWoman" filter="url(#softShadow)">
                  {/* Elegante haarval achter het hoofd en over de schouders - begint netjes achter de kaak/oren (y:120) */}
                  <path
                    d="M 112 120 C 102 120, 96 160, 96 234 C 103 236, 113 205, 114 168 L 186 168 C 187 205, 197 236, 204 234 C 204 160, 198 120, 188 120 Z"
                    fill={hairLowlight}
                  />
                  {/* Lokken die over de schouders vallen */}
                  <path
                    d="M 98 232 C 94 185, 96 142, 106 122 C 111 122, 114 175, 111 220 Z"
                    fill={hairColor}
                  />
                  <path
                    d="M 202 232 C 206 185, 204 142, 194 122 C 189 122, 186 175, 189 220 Z"
                    fill={hairColor}
                  />
                  {/* Glansstrepen op vallend haar */}
                  <path d="M 100 148 Q 96 188 104 225" stroke={hairHighlight} strokeWidth="1.8" fill="none" opacity="0.8" strokeLinecap="round" />
                  <path d="M 200 148 Q 204 188 196 225" stroke={hairHighlight} strokeWidth="1.8" fill="none" opacity="0.8" strokeLinecap="round" />
                </g>
              ) : (
                <g id="backHairMan">
                  {/* Nette nektapering voor de man achter het hoofd */}
                  <path
                    d="M 108 155 C 108 182, 118 192, 134 192 L 166 192 C 182 192, 192 182, 192 155 Z"
                    fill={hairLowlight}
                  />
                </g>
              )}

              {/* ===== HOOFD & GEZICHT ===== */}
              <g id="head">
                {/* Volledige dekkende schedel en kaak van kruin (y:75) tot kin (y:186) */}
                <path
                  d="M 112 135 C 112 172, 128 186, 150 186 C 172 186, 188 172, 188 135 C 188 75, 112 75, 112 135 Z"
                  fill={skinTone}
                />

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

                {/* Wenkbrauwen */}
                {gender === "man" ? (
                  <g stroke={eyebrowColor} strokeWidth="3" strokeLinecap="round">
                    <line x1="126" y1="126" x2="142" y2="125" />
                    <line x1="158" y1="125" x2="174" y2="126" />
                  </g>
                ) : (
                  <g stroke={eyebrowColor} strokeWidth="2.2" strokeLinecap="round">
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
                    fill={eyebrowColor}
                    opacity="0.18"
                  />
                )}
              </g>

              {/* ===== HAAR VOORZIJDE (PROPORTIONEEL, STIJLVOL & CLIPVRIJ ONDER PETJES) ===== */}
              <g id="hair" filter="url(#softShadow)">
                {hasHat ? (
                  /* ONDER-DE-PET HAAR: Alleen nette zijlokken / bakkebaarden die onder de rand uitkomen */
                  gender === "man" ? (
                    <g id="underCapHairMan">
                      {/* Nette bakkebaarden voor de oren */}
                      <path d="M 112 110 L 112 136 C 112 138, 115 138, 116 135 L 117 112 Z" fill={hairColor} />
                      <path d="M 188 110 L 188 136 C 188 138, 185 138, 184 135 L 183 112 Z" fill={hairColor} />
                    </g>
                  ) : (
                    <g id="underCapHairWoman">
                      {/* Vrouwelijke zijlokken die elegant onder de pet vallen */}
                      <path
                        d="M 104 112 C 100 146, 100 195, 108 230 C 112 232, 114 220, 113 198 C 110 168, 111 135, 114 114 Z"
                        fill={hairColor}
                      />
                      <path
                        d="M 196 112 C 200 146, 200 195, 192 230 C 188 232, 186 220, 187 198 C 190 168, 189 135, 186 114 Z"
                        fill={hairColor}
                      />
                      <path d="M 104 138 Q 102 175 109 220" stroke={hairHighlight} strokeWidth="1.8" fill="none" opacity="0.85" strokeLinecap="round" />
                      <path d="M 196 138 Q 198 175 191 220" stroke={hairHighlight} strokeWidth="1.8" fill="none" opacity="0.85" strokeLinecap="round" />
                    </g>
                  )
                ) : (
                  /* VOLLEDIG KAPSEL (GEEN HOOFDDEKSEL): Modern, strak en natuurlijk volume */
                  gender === "man" ? (
                    <g id="styledHairMan">
                      {/* Stijlvolle mannelijke coupe: sluit natuurlijk aan op schedel (top y:65) */}
                      <path
                        d="M 109 138 C 106 100, 112 66, 150 65 C 188 66, 194 100, 191 138 C 187 118, 180 106, 168 108 C 152 110, 144 100, 132 102 C 120 105, 114 118, 109 138 Z"
                        fill={hairColor}
                      />
                      {/* Schaduw/diepte aan de slapen */}
                      <path
                        d="M 111 132 C 110 95, 120 74, 150 74 C 180 74, 190 95, 189 132 C 181 112, 168 104, 150 104 C 132 104, 119 112, 111 132 Z"
                        fill={hairLowlight}
                        opacity="0.25"
                      />
                      {/* Zachte textuur & highlight op de kruin */}
                      <path
                        d="M 124 76 C 138 68, 162 68, 176 76 C 162 72, 138 72, 124 76 Z"
                        fill={hairHighlight}
                      />
                      {/* Kuif/lok detail over het voorhoofd */}
                      <path
                        d="M 132 100 C 144 94, 158 94, 168 100 C 158 97, 144 97, 132 100 Z"
                        fill={hairHighlight}
                        opacity="0.9"
                      />
                    </g>
                  ) : (
                    <g id="styledHairWoman">
                      {/* Elegante vrouwelijke bob/laagjes: natuurlijke breedte (top y:63) */}
                      <path
                        d="M 102 142 C 98 90, 110 64, 150 63 C 190 64, 202 90, 198 142 C 192 118, 182 104, 168 106 C 152 108, 142 100, 132 102 C 118 105, 108 118, 102 142 Z"
                        fill={hairColor}
                      />
                      {/* Diepte onder de kruin */}
                      <path
                        d="M 106 130 C 104 85, 118 72, 150 72 C 182 72, 196 85, 194 130 C 186 108, 168 100, 150 100 C 132 100, 114 108, 106 130 Z"
                        fill={hairLowlight}
                        opacity="0.25"
                      />
                      {/* Zachte glans op de kruin */}
                      <path
                        d="M 122 73 C 136 66, 164 66, 178 73 C 164 69, 136 69, 122 73 Z"
                        fill={hairHighlight}
                      />
                      {/* Zachte lokken langs de wangen */}
                      <path
                        d="M 102 136 C 99 170, 98 204, 106 230 C 110 232, 113 222, 111 202 C 108 174, 109 146, 106 134 Z"
                        fill={hairColor}
                      />
                      <path
                        d="M 198 136 C 201 170, 202 204, 194 230 C 190 232, 187 222, 189 202 C 192 174, 191 146, 194 134 Z"
                        fill={hairColor}
                      />
                      <path d="M 104 145 Q 101 185 108 222" stroke={hairHighlight} strokeWidth="1.8" fill="none" opacity="0.85" strokeLinecap="round" />
                      <path d="M 196 145 Q 199 185 192 222" stroke={hairHighlight} strokeWidth="1.8" fill="none" opacity="0.85" strokeLinecap="round" />
                    </g>
                  )
                )}
              </g>

              {/* ===== HOOFDDEKSELS: PERFECT PASSEND OP DE SCHEDEL, NATUURLIJK & CLIPVRIJ ===== */}
              
              {/* 1. VAKMAN BOUWHELM: Sluit perfect aan op de schedel en rand boven de wenkbrauwen */}
              {jobSector === "vakman" && (
                <g id="hardHat" filter="url(#softShadow)">
                  {/* Koepel van de helm */}
                  <path d="M 104 106 C 104 62, 196 62, 196 106 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
                  {/* Middenribbe / verstevigingskam */}
                  <rect x="146" y="60" width="8" height="34" rx="2" fill="#D97706" />
                  {/* Veiligheids-reflexstreep */}
                  <path d="M 115 93 Q 150 99 185 93" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9" />
                  {/* Stevige helmrand / klep net boven de wenkbrauwen */}
                  <path d="M 98 106 Q 150 116 202 106 L 198 102 Q 150 108 102 102 Z" fill="#D97706" />
                </g>
              )}

              {/* 2. HULPDIENSTEN POLITIE / DIENSTPET */}
              {jobSector === "hulpdiensten" && (
                <g id="policeCap" filter="url(#softShadow)">
                  {/* Navy petkap */}
                  <path d="M 104 104 C 102 65, 198 65, 196 104 Z" fill="#1E3A8A" stroke="#172554" strokeWidth="1.5" />
                  {/* Band en gouden bies */}
                  <rect x="105" y="99" width="90" height="6" fill="#172554" />
                  <line x1="105" y1="102" x2="195" y2="102" stroke="#DFB25A" strokeWidth="2" strokeDasharray="4 2" />
                  {/* Glanzende zwarte klep */}
                  <path d="M 104 104 Q 150 118 196 104 Q 150 110 104 104 Z" fill="#0A0F1D" />
                  <path d="M 120 107 Q 150 112 180 107" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.4" strokeLinecap="round" />
                  {/* Gouden politie-embleem */}
                  <polygon points="150,80 153,86 159,86 154,90 156,96 150,93 144,96 146,90 141,86 147,86" fill="#DFB25A" stroke="#B45309" strokeWidth="0.8" />
                </g>
              )}

              {/* 3. HORECA KOKSMUTS */}
              {jobSector === "horeca" && (
                <g id="chefHat" filter="url(#softShadow)">
                  {/* Geplooide witte koksmuts */}
                  <path
                    d="M 112 98 C 100 66, 114 44, 150 44 C 186 44, 200 66, 188 98 Z"
                    fill="#FFFFFF"
                    stroke="#CBD5E1"
                    strokeWidth="1.5"
                  />
                  <path d="M 132 52 Q 130 76 132 98" stroke="#CBD5E1" strokeWidth="1.2" fill="none" />
                  <path d="M 150 45 Q 150 74 150 98" stroke="#CBD5E1" strokeWidth="1.4" fill="none" />
                  <path d="M 168 52 Q 170 76 168 98" stroke="#CBD5E1" strokeWidth="1.2" fill="none" />
                  <rect x="108" y="96" width="84" height="9" rx="2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
                </g>
              )}

              {/* 4. STUDENT AFSTUDEERHOED */}
              {jobSector === "student" && (
                <g id="graduationCap" filter="url(#softShadow)">
                  {/* Schedelkap die het hoofd omsluit */}
                  <path d="M 110 106 C 110 72, 190 72, 190 106 Z" fill="#1E293B" />
                  {/* Diamant-vierkant mortarboard */}
                  <polygon points="150,56 204,70 150,84 96,70" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
                  {/* Gouden kwastje */}
                  <circle cx="150" cy="70" r="3" fill="#DFB25A" />
                  <path d="M 150 70 Q 182 74 188 94" stroke="#DFB25A" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <rect x="186" y="94" width="5" height="10" rx="1" fill="#DFB25A" />
                </g>
              )}

              {/* 5. GEPENSIONEERD FLAT CAP */}
              {jobSector === "gepensioneerd" && (
                <g id="flatCap" filter="url(#softShadow)">
                  {/* Klassieke platte wollen pet (ivy / newsboy cap) */}
                  <path d="M 118 106 Q 150 113 182 106 L 180 102 Q 150 107 120 102 Z" fill="#44403C" />
                  <path
                    d="M 104 104 C 104 68, 196 68, 196 104 Q 150 110 104 104 Z"
                    fill="#78716C"
                    stroke="#57534E"
                    strokeWidth="1.5"
                  />
                  {/* Tweed naden */}
                  <path d="M 150 72 L 150 107" stroke="#57534E" strokeWidth="1" opacity="0.6" strokeDasharray="3 2" />
                  <path d="M 116 98 Q 150 104 184 98" stroke="#57534E" strokeWidth="1" opacity="0.6" />
                  {/* Knoopje bovenop */}
                  <circle cx="150" cy="72" r="3" fill="#57534E" />
                </g>
              )}

              {/* 6. TECH KOPTELEFOON */}
              {jobSector === "tech" && (
                <g id="bigHeadphones" filter="url(#softShadow)">
                  <path d="M 106 135 C 102 60, 198 60, 194 135" stroke="#334155" strokeWidth="5" fill="none" strokeLinecap="round" />
                  <rect x="96" y="124" width="14" height="28" rx="6" fill="#1E293B" stroke="#DFB25A" strokeWidth="1.5" />
                  <rect x="190" y="124" width="14" height="28" rx="6" fill="#1E293B" stroke="#DFB25A" strokeWidth="1.5" />
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
