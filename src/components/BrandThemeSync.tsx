"use client";

import React, { useEffect, useState } from "react";
import { getBestTextColor, getContrastRatio } from "@/lib/color/colorUtils";

export function BrandThemeSync() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const applyTheme = () => {
      try {
        // Vind actieve H3 data door te zoeken naar vsg_h3_data_ keys in localStorage
        let activeH3: any = null;
        let activeUserId: string | null = null;
        let isStyleActive = false;

        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith("vsg_h3_data_")) {
            const raw = localStorage.getItem(key);
            if (raw) {
              const parsed = JSON.parse(raw);
              if (parsed.colors?.isConfirmed) {
                activeH3 = parsed;
                activeUserId = key.replace("vsg_h3_data_", "");
                break;
              }
            }
          }
        }

        if (activeUserId) {
          const stylePref = localStorage.getItem(`vsg_custom_style_active_${activeUserId}`);
          // Standaard actief zodra de gebruiker zijn kleuren heeft bevestigd of op 'Bekijk in mijn stijl' heeft geklikt
          isStyleActive = stylePref === "true" || stylePref === null;
        }

        const root = document.documentElement;

        if (activeH3 && isStyleActive && activeH3.colors?.isConfirmed) {
          const { primary, accent, dark, light } = activeH3.colors;

          // Bereken de veiligste, WCAG-bewaakte tekstkleuren
          const onPrimary = getBestTextColor(primary, dark, light).textColor;
          const onAccent = getBestTextColor(accent, dark, light).textColor;
          const onDark = getBestTextColor(dark, dark, light).textColor;
          const onLight = getBestTextColor(light, dark, light).textColor;

          // Knoppen in de steunkleur die minder dan 3:1 contrast hebben met de achtergrond
          const accentButtonBorder = getContrastRatio(accent, light) < 3.0 ? `1.5px solid ${dark}` : "none";

          // Injecteer CSS variabelen
          root.style.setProperty("--brand-primary-start", primary);
          root.style.setProperty("--brand-primary-end", accent);
          root.style.setProperty("--brand-dark", dark);
          root.style.setProperty("--brand-light", light);
          root.style.setProperty("--on-primary", onPrimary);
          root.style.setProperty("--on-accent", onAccent);
          root.style.setProperty("--accent-btn-border", accentButtonBorder);

          // Pas oppervlakte- en tekstkleuren aan
          const isDarkMode = root.classList.contains("dark");
          if (!isDarkMode) {
            root.style.setProperty("--surface", light);
            root.style.setProperty("--text", dark);
            root.style.setProperty("--section-bg", `${primary}0D`); // 5% subtiele tint van hoofdkleur
          } else {
            root.style.setProperty("--surface", dark);
            root.style.setProperty("--text", light);
            root.style.setProperty("--section-bg", `${light}12`); // subtiele lichte tint
          }

          // Typografie
          if (activeH3.typography?.headingFont) {
            root.style.setProperty("--font-heading", `'${activeH3.typography.headingFont}', sans-serif`);
          }
          if (activeH3.typography?.bodyFont) {
            root.style.setProperty("--font-body", `'${activeH3.typography.bodyFont}', sans-serif`);
          }

          // Paginatitel
          if (activeH3.companyName) {
            document.title = `${activeH3.companyName} • Vin's Survival Gids`;
          }
        } else {
          // Reset naar standaardspecificaties van het boek
          root.style.removeProperty("--brand-primary-start");
          root.style.removeProperty("--brand-primary-end");
          root.style.removeProperty("--brand-dark");
          root.style.removeProperty("--brand-light");
          root.style.removeProperty("--on-primary");
          root.style.removeProperty("--on-accent");
          root.style.removeProperty("--accent-btn-border");
          root.style.removeProperty("--surface");
          root.style.removeProperty("--section-bg");
          root.style.removeProperty("--text");
          root.style.removeProperty("--font-heading");
          root.style.removeProperty("--font-body");
          document.title = "Vin's Survival Gids";
        }
      } catch (e) {
        console.error("Fout in BrandThemeSync:", e);
      }
    };

    // Voer direct uit
    applyTheme();

    // Luister naar custom events en opslagwijzigingen
    window.addEventListener("vsg_brand_style_changed", applyTheme);
    window.addEventListener("storage", applyTheme);

    return () => {
      window.removeEventListener("vsg_brand_style_changed", applyTheme);
      window.removeEventListener("storage", applyTheme);
    };
  }, []);

  return null;
}
