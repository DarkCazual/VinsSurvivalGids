"use client";

import React, { useEffect, useState } from "react";
import { BearIcon } from "./BearIcon";
import { Crown } from "lucide-react";

interface BrandLogoProps {
  title?: string;
  userId?: string;
}

export function BrandLogo({ title = "Vin's Survival Gids", userId }: BrandLogoProps) {
  const [customBrand, setCustomBrand] = useState<{
    companyName: string;
    logoUrl: string | null;
    isCustomActive: boolean;
  }>({
    companyName: "",
    logoUrl: null,
    isCustomActive: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkBrand = () => {
      try {
        let h3Data: any = null;
        let uId = userId;

        // Als userId niet direct meegegeven is, zoek in localStorage
        if (!uId) {
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith("vsg_h3_data_")) {
              uId = key.replace("vsg_h3_data_", "");
              break;
            }
          }
        }

        if (uId) {
          const raw = localStorage.getItem(`vsg_h3_data_${uId}`);
          if (raw) {
            h3Data = JSON.parse(raw);
          }
          const stylePref = localStorage.getItem(`vsg_custom_style_active_${uId}`);
          const isActive = stylePref === "true" || (stylePref === null && h3Data?.colors?.isConfirmed);

          if (h3Data && isActive && (h3Data.companyName || h3Data.logo?.selectedLogoUrl)) {
            setCustomBrand({
              companyName: h3Data.companyName || "",
              logoUrl: h3Data.colors?.recoloredLogoUrl || h3Data.logo?.selectedLogoUrl || null,
              isCustomActive: true,
            });
            return;
          }
        }

        setCustomBrand({ companyName: "", logoUrl: null, isCustomActive: false });
      } catch (e) {
        console.error("Fout bij laden van merk in BrandLogo:", e);
      }
    };

    checkBrand();
    window.addEventListener("vsg_brand_style_changed", checkBrand);
    window.addEventListener("storage", checkBrand);

    return () => {
      window.removeEventListener("vsg_brand_style_changed", checkBrand);
      window.removeEventListener("storage", checkBrand);
    };
  }, [userId]);

  // Als de gebruiker zijn eigen huisstijl actief heeft
  if (customBrand.isCustomActive && (customBrand.companyName || customBrand.logoUrl)) {
    return (
      <div className="flex items-center gap-3">
        <div 
          className="w-11 h-11 rounded-xl flex items-center justify-center p-1.5 shadow-lg border border-black/10 dark:border-white/10 shrink-0 overflow-hidden"
          style={{ 
            backgroundColor: "var(--surface)", 
            borderColor: "var(--brand-primary-start)" 
          }}
        >
          {customBrand.logoUrl ? (
            <img 
              src={customBrand.logoUrl} 
              alt={customBrand.companyName || "Logo"} 
              className="w-full h-full object-contain"
            />
          ) : (
            <div 
              className="w-full h-full rounded-lg flex items-center justify-center font-black text-base uppercase"
              style={{ 
                backgroundColor: "var(--brand-primary-start)", 
                color: "var(--on-primary)" 
              }}
            >
              {customBrand.companyName ? customBrand.companyName.charAt(0) : "V"}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h1 
              className="text-lg sm:text-xl font-extrabold tracking-tight drop-shadow-xs"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {customBrand.companyName || title}
            </h1>
            <span 
              className="text-[9px] uppercase font-black px-1.5 py-0.5 rounded-full border flex items-center gap-0.5"
              style={{
                backgroundColor: "var(--brand-primary-start)",
                color: "var(--on-primary)",
                borderColor: "var(--brand-primary-end)"
              }}
              title="Jouw eigen huisstijl is actief op het platform"
            >
              <Crown className="w-2.5 h-2.5" />
              <span>Jouw Merk</span>
            </span>
          </div>
          {title && title !== customBrand.companyName && (
            <span className="text-[11px] font-semibold opacity-60 block leading-tight">
              {title}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Standaard weergave uit het boek (Beer icoon)
  return (
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 bg-[#26160d] rounded-xl flex items-center justify-center p-2 shadow-lg border-2 border-[#a16e38]/30 shrink-0">
        <BearIcon className="w-full h-full drop-shadow-md" />
      </div>
      {title && (
        <h1 className="text-xl font-bold tracking-tight drop-shadow-sm font-heading">
          {title}
        </h1>
      )}
    </div>
  );
}
