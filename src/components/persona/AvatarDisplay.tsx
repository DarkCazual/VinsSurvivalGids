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
  
  // STRALEND BLOND HAAR (Volledig dekkend, geen gat of transparantie meer!)
  const hairColor = "#E5BF55";      // Rijk warm goudblond
  const hairHighlight = "#FEF08A";  // Lichte zonneblonde highlights
  const hairLowlight = "#C6922C";   // Donkerblonde aanzet / diepte
  const eyebrowColor = "#9C6E23";   // Warme wenkbrauwen passend bij blond

  const hasWrinkles = ageGroup === "41-64" || ageGroup === "65+";
  const hasGlasses = ageGroup === "65+";

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

              {/* ===== VOLLEDIG DEKKENDE ACHTERSTE HAARMASSA (VOORKOMT ELK GAT OF TRANSPARANTIE NAAR DE ACHTERGROND) ===== */}
              {gender === "vrouw" ? (
                <g id="backHairWoman" filter="url(#softShadow)">
                  {/* Massieve volle haardos achter het hoofd en over de schouders */}
                  <path
                    d="M 86 240 C 76 195, 78 115, 96 70 C 114 46, 186 46, 204 70 C 222 115, 224 195, 214 240 C 204 242, 192 210, 188 165 L 112 165 C 108 210, 96 242, 86 240 Z"
                    fill={hairLowlight}
                  />
                  {/* Vallende blonde lokken langs de hals */}
                  <path
                    d="M 90 238 C 84 190, 88 135, 98 120 C 104 120, 108 175, 104 220 Z"
                    fill={hairColor}
                  />
                  <path
                    d="M 210 238 C 216 190, 212 135, 202 120 C 196 120, 192 175, 196 220 Z"
                    fill={hairColor}
                  />
                  {/* Glansstrepen op vallend haar */}
                  <path d="M 92 145 Q 88 185 98 225" stroke={hairHighlight} strokeWidth="2.5" fill="none" opacity="0.8" strokeLinecap="round" />
                  <path d="M 208 145 Q 212 185 202 225" stroke={hairHighlight} strokeWidth="2.5" fill="none" opacity="0.8" strokeLinecap="round" />
                </g>
              ) : (
                <g id="backHairMan">
                  {/* Nette blonde nektapering voor de man achter het hoofd */}
                  <path
                    d="M 108 155 C 108 182, 118 192, 134 192 L 166 192 C 182 192, 192 182, 192 155 Z"
                    fill={hairLowlight}
                  />
                </g>
              )}

              {/* ===== HOOFD & GEZICHT (MET VOLLEDIG MASSIEVE SCHEDEL) ===== */}
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

              {/* ===== BLOND HAAR VOORZIJDE (MASSIEF, VOL VOLUME, GEEN GAT OF BRUINE LEEGTE!) ===== */}
              <g id="hair" filter="url(#softShadow)">
                {gender === "man" ? (
                  /* MANNEN BLOND KAPSEL: Sluit de schedel volledig af van kruin (y:52) tot voorhoofd (y:105) */
                  <g>
                    {/* Volledige massieve blonde haardos over de kruin */}
                    <path
                      d="M 104 140 C 98 90, 108 52, 150 50 C 192 52, 202 90, 196 140 C 190 114, 182 100, 166 104 C 150 108, 142 98, 130 102 C 118 106, 110 115, 104 140 Z"
                      fill={hairColor}
                    />
                    {/* Diepte / aanzet bij de slapen */}
                    <path
                      d="M 106 130 C 104 80, 118 62, 150 62 C 182 62, 196 80, 194 130 C 184 105, 168 96, 150 96 C 132 96, 116 105, 106 130 Z"
                      fill={hairLowlight}
                      opacity="0.28"
                    />
                    {/* Lichtblonde highlights bovenop de kruin */}
                    <path
                      d="M 118 70 C 135 56, 165 56, 182 70 C 165 64, 135 64, 118 70 Z"
                      fill={hairHighlight}
                    />
                    {/* Speelse blonde lok/kuif over het voorhoofd */}
                    <path
                      d="M 128 98 C 144 88, 160 88, 172 98 C 160 93, 142 93, 128 98 Z"
                      fill={hairHighlight}
                    />
                  </g>
                ) : (
                  /* VROUWEN BLOND KAPSEL: Volledig massief volume over de kruin + elegante lokken */
                  <g>
                    {/* Volledige massieve blonde kruin die de schedel en het voorhoofd prachtig omlijst */}
                    <path
                      d="M 94 150 C 88 80, 106 48, 150 46 C 194 48, 212 80, 206 150 C 198 116, 186 98, 168 102 C 150 106, 140 98, 130 100 C 114 104, 102 116, 94 150 Z"
                      fill={hairColor}
                    />
                    {/* Dieptepartij voor extra natuurlijk blond effect */}
                    <path
                      d="M 100 135 C 98 75, 118 58, 150 58 C 182 58, 202 75, 200 135 C 190 102, 168 92, 150 92 C 132 92, 110 102, 100 135 Z"
                      fill={hairLowlight}
                      opacity="0.25"
                    />
                    {/* Zon-opgelichte blonde glans bovenop */}
                    <path
                      d="M 118 65 C 135 52, 165 52, 182 65 C 165 58, 135 58, 118 65 Z"
                      fill={hairHighlight}
                    />
                    {/* Zachte blonde pony / lok accenten op het voorhoofd */}
                    <path
                      d="M 124 101 C 140 93, 162 93, 176 101 C 162 96, 138 96, 124 101 Z"
                      fill={hairHighlight}
                      opacity="0.9"
                    />
                    {/* Voorste vallende lokken langs het gezicht */}
                    <path
                      d="M 94 140 C 90 178, 88 215, 98 244 C 104 246, 107 236, 104 212 C 100 182, 102 152, 98 138 Z"
                      fill={hairColor}
                    />
                    <path
                      d="M 206 140 C 210 178, 212 215, 202 244 C 196 246, 193 236, 196 212 C 200 182, 198 152, 202 138 Z"
                      fill={hairColor}
                    />
                    {/* Glansstrepen op de vallende lokken */}
                    <path d="M 96 150 Q 92 195 101 235" stroke={hairHighlight} strokeWidth="2" fill="none" opacity="0.85" strokeLinecap="round" />
                    <path d="M 204 150 Q 208 195 199 235" stroke={hairHighlight} strokeWidth="2" fill="none" opacity="0.85" strokeLinecap="round" />
                  </g>
                )}
              </g>

              {/* ===== HOOFDDEKSELS: GOED PASSEND OP DE SCHEDEL, NIET TE BREED, NIET ZWEVEND ===== */}
              
              {/* 1. VAKMAN BOUWHELM: Sluit perfect aan op de schedel en rand net boven wenkbrauw */}
              {jobSector === "vakman" && (
                <g id="hardHat" filter="url(#softShadow)">
                  <path d="M 106 104 C 106 66, 194 66, 194 104 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
                  <path d="M 100 106 Q 150 114 200 106 L 196 100 Q 150 106 104 100 Z" fill="#D97706" />
                  <rect x="146" y="62" width="8" height="26" rx="2" fill="#B45309" />
                  <path d="M 116 94 Q 150 100 184 94" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9" />
                </g>
              )}

              {/* 2. HULPDIENSTEN POLITIE / DIENSTPET */}
              {jobSector === "hulpdiensten" && (
                <g id="policeCap" filter="url(#softShadow)">
                  <path d="M 104 104 C 104 68, 196 68, 196 104 Z" fill="#1E3A8A" stroke="#172554" strokeWidth="1.5" />
                  <path d="M 102 106 Q 150 116 198 106 Q 150 110 102 106 Z" fill="#0A0F1D" />
                  <line x1="106" y1="102" x2="194" y2="102" stroke="#DFB25A" strokeWidth="2" />
                  <polygon points="150,80 153,87 160,87 154,92 156,99 150,95 144,99 146,92 140,87 147,87" fill="#DFB25A" stroke="#B45309" strokeWidth="0.8" />
                </g>
              )}

              {/* 3. HORECA KOKSMUTS */}
              {jobSector === "horeca" && (
                <g id="chefHat" filter="url(#softShadow)">
                  <path
                    d="M 112 98 C 100 68, 110 44, 150 44 C 190 44, 200 68, 188 98 Z"
                    fill="#FFFFFF"
                    stroke="#CBD5E1"
                    strokeWidth="1.5"
                  />
                  <path d="M 134 52 Q 130 78 132 98" stroke="#CBD5E1" strokeWidth="1" fill="none" />
                  <path d="M 150 45 Q 150 75 150 98" stroke="#CBD5E1" strokeWidth="1.2" fill="none" />
                  <path d="M 166 52 Q 170 78 168 98" stroke="#CBD5E1" strokeWidth="1" fill="none" />
                  <rect x="108" y="98" width="84" height="8" rx="2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
                </g>
              )}

              {/* 4. STUDENT AFSTUDEERHOED */}
              {jobSector === "student" && (
                <g id="graduationCap" filter="url(#softShadow)">
                  <path d="M 114 100 C 114 84, 186 84, 186 100 Z" fill="#1E293B" />
                  <polygon points="150,60 198,72 150,84 102,72" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
                  <circle cx="150" cy="72" r="3" fill="#DFB25A" />
                  <path d="M 150 72 Q 182 76 188 94" stroke="#DFB25A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                  <rect x="186" y="94" width="5" height="10" rx="1" fill="#DFB25A" />
                </g>
              )}

              {/* 5. GEPENSIONEERD FLAT CAP */}
              {jobSector === "gepensioneerd" && (
                <g id="flatCap" filter="url(#softShadow)">
                  <path
                    d="M 104 104 C 104 74, 168 70, 196 94 L 198 104 Q 150 110 104 104 Z"
                    fill="#78716C"
                    stroke="#57534E"
                    strokeWidth="1.5"
                  />
                  <path d="M 112 102 Q 150 108 188 102" stroke="#44403C" strokeWidth="1.5" fill="none" />
                </g>
              )}

              {/* 6. TECH KOPTELEFOON */}
              {jobSector === "tech" && (
                <g id="bigHeadphones" filter="url(#softShadow)">
                  <path d="M 106 135 C 102 74, 198 74, 194 135" stroke="#334155" strokeWidth="5" fill="none" strokeLinecap="round" />
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
