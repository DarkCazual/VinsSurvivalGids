"use client";

import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { getBestTextColor, getContrastRatio } from "@/lib/color/colorUtils";

export function BrandThemeSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;

    const applyTheme = () => {
      try {
        let activeH3: any = null;
        let activeUserId: string | null = localStorage.getItem("vsg_active_user_id");

        if (activeUserId) {
          const raw = localStorage.getItem(`vsg_h3_data_${activeUserId}`);
          if (raw) {
            try {
              activeH3 = JSON.parse(raw);
            } catch (e) {}
          }
        }

        // Fallback: zoek eerste vsg_h3_data_ key als activeUserId nog niet gezet is
        if (!activeH3) {
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith("vsg_h3_data_")) {
              const raw = localStorage.getItem(key);
              if (raw) {
                try {
                  const parsed = JSON.parse(raw);
                  if (parsed.colors?.primary) {
                    activeH3 = parsed;
                    activeUserId = key.replace("vsg_h3_data_", "");
                    break;
                  }
                } catch (e) {}
              }
            }
          }
        }

        let isStyleActive = false;
        if (activeUserId) {
          const stylePref = localStorage.getItem(`vsg_custom_style_active_${activeUserId}`);
          // Alleen actief als expliciet "true", of standaard op true als kleuren zijn bevestigd en nog niet eerder handmatig uitgezet
          isStyleActive = stylePref === "true";
        }

        if (activeH3 && isStyleActive && activeH3.colors?.primary) {
          const { primary, accent, dark, light } = activeH3.colors;

          // Bereken WCAG-veilige tekstkleuren
          const onPrimary = getBestTextColor(primary, dark, light).textColor;
          const onAccent = getBestTextColor(accent, dark, light).textColor;

          const accentButtonBorder = getContrastRatio(accent, light) < 3.0 ? `1.5px solid ${dark}` : "none";

          // Injecteer primaire CSS variabelen
          root.style.setProperty("--brand-primary-start", primary);
          root.style.setProperty("--brand-primary-end", accent);
          root.style.setProperty("--brand-dark", dark);
          root.style.setProperty("--brand-light", light);
          root.style.setProperty("--on-primary", onPrimary);
          root.style.setProperty("--on-accent", onAccent);
          root.style.setProperty("--accent-btn-border", accentButtonBorder);

          // Detecteer Dark vs Light mode accuraat (zowel via class als via resolvedTheme)
          const isDarkMode = root.classList.contains("dark") || resolvedTheme === "dark";

          if (!isDarkMode) {
            // LIGHT MODE:
            // Achtergrond is de lichte merkkleur (off-white / cream), tekst is de donkere merkkleur
            root.style.setProperty("--surface", light || "#FAF8F5");
            root.style.setProperty("--text", dark || "#160C05");
            // Secties/cards krijgen een zachte, dekkende tint zodat tekst en knoppen perfect leesbaar zijn
            root.style.setProperty("--section-bg", `color-mix(in srgb, ${light || "#FAF8F5"} 92%, ${dark || "#160C05"} 8%)`);
          } else {
            // DARK MODE:
            // Achtergrond is de donkere merkkleur (diep espresso/zwart), tekst is de lichte merkkleur
            root.style.setProperty("--surface", dark || "#160C05");
            root.style.setProperty("--text", light || "#FAF8F5");
            // Secties/cards krijgen een subtiel lichtere tint van het donkere canvas
            root.style.setProperty("--section-bg", `color-mix(in srgb, ${dark || "#160C05"} 84%, ${light || "#FAF8F5"} 16%)`);
          }

          // Typografie
          if (activeH3.typography?.headingFont) {
            root.style.setProperty("--font-heading", `'${activeH3.typography.headingFont}', sans-serif`);
          }
          if (activeH3.typography?.bodyFont) {
            root.style.setProperty("--font-body", `'${activeH3.typography.bodyFont}', sans-serif`);
          }

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

    // 1. Luister naar aangepaste brand-stijlwijzigingen
    window.addEventListener("vsg_brand_style_changed", applyTheme);
    window.addEventListener("storage", applyTheme);

    // 2. Observeer DOM class veranderingen op <html> (dark mode toggle van next-themes)
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "class") {
          applyTheme();
          break;
        }
      }
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("vsg_brand_style_changed", applyTheme);
      window.removeEventListener("storage", applyTheme);
      observer.disconnect();
    };
  }, [resolvedTheme]);

  return null;
}
