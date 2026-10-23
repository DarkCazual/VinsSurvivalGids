"use client";

import React, { useEffect, useState } from "react";
import { H3Data } from "./types";
import { Sparkles, ArrowRight, X, Crown, CheckCircle2 } from "lucide-react";

interface BrandRevealModalProps {
  isOpen: boolean;
  data: H3Data;
  onClose: () => void;
  onViewDocument: () => void;
}

export function BrandRevealModal({
  isOpen,
  data,
  onClose,
  onViewDocument,
}: BrandRevealModalProps) {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowAnimation(true);
    } else {
      setShowAnimation(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const companyName = data.companyName || "Jouw Bedrijf";
  const subtitle = data.logo.subtitle || "Koffie & Ambacht";
  const { primary, accent, dark, light } = data.colors;
  const logoUrl = data.colors.recoloredLogoUrl || data.logo.selectedLogoUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      
      {/* Achtergrond Glow in de merkkleuren van de gebruiker */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-30 pointer-events-none transition-all duration-1000 -top-20 -left-20"
        style={{ backgroundColor: primary }}
      />
      <div 
        className="absolute w-[450px] h-[450px] rounded-full blur-3xl opacity-25 pointer-events-none transition-all duration-1000 -bottom-20 -right-20"
        style={{ backgroundColor: accent }}
      />

      <div className="relative w-full max-w-2xl bg-[#0f172a] text-white border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden text-center space-y-6">
        
        {/* Sluitknop */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gouden Sparkle Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dfb25a]/20 border border-[#dfb25a]/40 text-[#dfb25a] text-xs font-black tracking-wider uppercase">
          <Sparkles className="w-4 h-4 animate-spin text-[#dfb25a]" />
          <span>Huisstijl Onthulmoment</span>
        </div>

        {/* DE GROTE ZIN UIT HET BOEK */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#dfb25a]">
            Dit is jouw bedrijf.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Je hebt het denkwerk gedaan, je naam vastgesteld en je visuele fundament gelegd. Vanaf dit moment heeft jouw onderneming een tastbaar gezicht.
          </p>
        </div>

        {/* LOGO & NAAM ETALAGE CARD */}
        <div 
          className="p-8 rounded-2xl border border-white/15 shadow-inner relative overflow-hidden transition-all duration-700"
          style={{ 
            backgroundColor: light,
            color: dark 
          }}
        >
          <div className="space-y-4">
            
            {/* Logo Container */}
            <div className="flex justify-center">
              {logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt={companyName} 
                  className="max-h-28 object-contain drop-shadow-md"
                />
              ) : (
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg"
                  style={{ backgroundColor: primary, color: light }}
                >
                  {companyName.charAt(0)}
                </div>
              )}
            </div>

            {/* Bedrijfsnaam in het gekozen Heading Font */}
            <div className="space-y-1">
              <h3 
                className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                style={{ 
                  fontFamily: data.typography.headingFont,
                  color: primary
                }}
              >
                {companyName}
              </h3>

              {/* Ondertitel in gekozen Sans-serif met letter-spacing */}
              <p 
                className="text-xs uppercase font-bold tracking-widest"
                style={{ 
                  fontFamily: data.typography.bodyFont,
                  letterSpacing: "0.15em",
                  color: dark,
                  opacity: 0.8
                }}
              >
                {subtitle}
              </p>
            </div>

          </div>

          {/* 4 Merkkleuren bolletjes onderin de kaart */}
          <div className="pt-6 flex justify-center items-center gap-3 border-t border-black/10 mt-6">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold" style={{ color: dark }}>
              <span className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: primary }} />
              <span>{primary}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold" style={{ color: dark }}>
              <span className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: accent }} />
              <span>{accent}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold" style={{ color: dark }}>
              <span className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: dark }} />
              <span>{dark}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold" style={{ color: dark }}>
              <span className="w-4 h-4 rounded-full border border-black/20 shadow-sm" style={{ backgroundColor: light }} />
              <span>{light}</span>
            </div>
          </div>
        </div>

        {/* ACTIEKNOPPEN */}
        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
          <button
            type="button"
            onClick={onViewDocument}
            style={{
              background: `linear-gradient(135deg, ${primary}, ${accent})`,
              color: "#000000"
            }}
            className="px-6 py-3.5 rounded-2xl hover:brightness-110 font-black text-sm tracking-wide uppercase transition-all shadow-lg flex items-center justify-center gap-2 group"
          >
            <span>Bekijk je Huisstijldocument</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all"
          >
            Sluiten
          </button>
        </div>

      </div>

    </div>
  );
}
