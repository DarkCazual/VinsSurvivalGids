"use client";

import React from "react";
import { AVATAR_HEAD_ART, type AvatarShape } from "./avatarHeads.generated";
import type { AgeGroup, Gender } from "./types";

/**
 * Vector-koppen (hoofd, nek & haar) komen uit public/avatars/*.svg.
 * Dit component tekent daar het gezicht bovenop: ogen, wenkbrauwen, wimpers,
 * neus, mond, blosjes, rimpels en (optioneel) een bril.
 *
 * Alle coördinaten hieronder zijn in het coördinatenstelsel van de SVG-bestanden
 * (viewBox 0 0 448.68 531.57).
 */

export type HeadVariant =
  | "man-kind"
  | "man-jong"
  | "man-volwassen"
  | "man-oud"
  | "vrouw-kind"
  | "vrouw-jong"
  | "vrouw-volwassen"
  | "vrouw-oud";

export function resolveHeadVariant(gender: Gender | "", ageGroup: AgeGroup | ""): HeadVariant {
  const g = gender === "man" ? "man" : "vrouw";
  const stage =
    ageGroup === "12-18"
      ? "kind"
      : ageGroup === "26-40" || ageGroup === "41-64"
        ? "volwassen"
        : ageGroup === "65+"
          ? "oud"
          : "jong";
  return `${g}-${stage}` as HeadVariant;
}

interface FaceConfig {
  cx: number;
  eyeY: number;
  eyeGap: number;
  browY: number;
  noseY: number;
  mouthY: number;
  mouthHalf: number;
  /** Linker/rechter gezichtsrand op ooghoogte (voor brillenpootjes) */
  faceLeft: number;
  faceRight: number;
  browColor: string;
  feminine: boolean;
  kid: boolean;
  senior: boolean;
  chinShadow: boolean;
}

const MAN_BASE = {
  cx: 213.5,
  eyeY: 234,
  eyeGap: 40,
  browY: 208,
  noseY: 281,
  mouthY: 316,
  mouthHalf: 16,
  faceLeft: 121,
  faceRight: 306,
  feminine: false,
  chinShadow: false,
};

const WOMAN_BASE = {
  cx: 213,
  eyeY: 240,
  eyeGap: 41,
  browY: 215,
  noseY: 288,
  mouthY: 322,
  mouthHalf: 16,
  faceLeft: 116,
  faceRight: 299,
  feminine: true,
  chinShadow: true,
};

/** Verschuift alle verticale/horizontale ankers (kleine afwijkingen tussen de tekeningen). */
function shift<T extends typeof MAN_BASE | typeof WOMAN_BASE>(base: T, dx: number, dy: number) {
  return {
    ...base,
    cx: base.cx + dx,
    faceLeft: base.faceLeft + dx,
    faceRight: base.faceRight + dx,
    eyeY: base.eyeY + dy,
    browY: base.browY + dy,
    noseY: base.noseY + dy,
    mouthY: base.mouthY + dy,
  };
}

const FACE_CONFIG: Record<HeadVariant, FaceConfig> = {
  "man-kind": { ...MAN_BASE, mouthY: 314, browColor: "#5a3f25", kid: true, senior: false },
  "man-jong": { ...MAN_BASE, browColor: "#5a3f25", kid: false, senior: false },
  // Baard & snor zitten al in de tekening: de mond valt in de huiduitsparing
  "man-volwassen": { ...MAN_BASE, cx: 214.6, noseY: 279, mouthY: 322.5, mouthHalf: 13, browColor: "#5c4329", kid: false, senior: false },
  "man-oud": {
    ...shift(MAN_BASE, 0.9, 1.8),
    noseY: 280.5,
    mouthY: 325.5,
    mouthHalf: 13,
    browColor: "#7d7d7d",
    kid: false,
    senior: true,
  },
  "vrouw-kind": { ...WOMAN_BASE, browColor: "#6b4f31", kid: true, senior: false },
  "vrouw-jong": { ...WOMAN_BASE, browColor: "#6b4f31", kid: false, senior: false },
  "vrouw-volwassen": { ...shift(WOMAN_BASE, 2.1, 1), browColor: "#6b4f31", kid: false, senior: false },
  "vrouw-oud": { ...shift(WOMAN_BASE, 0.3, 0.8), browColor: "#858585", kid: false, senior: true },
};

/** Huidskleuren van het gezicht in de SVG's — gebruikt als clip-masker voor de gelaatstrekken. */
const SKIN_FILLS = new Set(["#f1cdb5", "#f5cbb7"]);

const INK = "#2a1f19";

function renderShape(shape: AvatarShape, key: React.Key, fillOverride?: string) {
  return React.createElement(shape.tag, { key, ...shape.attrs, fill: fillOverride ?? shape.fill });
}

const BROW_MASC = "M -21 5 C -14 -3, 2 -7, 18 -3 C 21 -2, 21 4, 17 4 C 4 2, -8 4, -17 9 C -21 11, -24 8, -21 5 Z";
const BROW_FEM = "M -21 6 C -12 -5, 4 -8, 18 -1 C 20 0, 19 3, 16 2.5 C 4 -2.5, -8 -1, -18 8 C -21 9.5, -23 7.5, -21 6 Z";

interface AvatarHeadProps {
  variant: HeadVariant;
  /** 0 = geen, 1 = lichte rimpels (41-64), 2 = duidelijke rimpels (65+) */
  wrinkleLevel?: 0 | 1 | 2;
  showGlasses?: boolean;
  glassesColor?: string;
  /** Unieke prefix zodat meerdere avatars op één pagina geen clip-id's delen */
  idPrefix: string;
}

export function AvatarHead({ variant, wrinkleLevel = 0, showGlasses = false, glassesColor = "#C9973F", idPrefix }: AvatarHeadProps) {
  const art = AVATAR_HEAD_ART[variant] ?? AVATAR_HEAD_ART["man-jong"];
  const f = FACE_CONFIG[variant] ?? FACE_CONFIG["man-jong"];
  const clipId = `${idPrefix}-skin`;

  const shadow = f.feminine ? "#e0a48e" : "#d69c84";
  const sides = [-1, 1] as const;

  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          {art.shapes.map((s, i) => (SKIN_FILLS.has(s.fill) ? renderShape(s, i) : null))}
        </clipPath>
      </defs>

      {/* ===== Jouw vectortekening: nek, hoofd & haar ===== */}
      {art.shapes.map((s, i) => renderShape(s, i))}

      {/* ===== Gelaatstrekken (geclipt op de huid zodat een pony er netjes overheen valt) ===== */}
      <g clipPath={`url(#${clipId})`}>
        {/* Kinschaduw op de hals (bij de vrouwelijke tekeningen loopt gezicht in hals over) */}
        {f.chinShadow && (
          <path
            d={`M ${f.cx - 41} ${f.mouthY + 30} C ${f.cx - 28} ${f.mouthY + 50}, ${f.cx + 30} ${f.mouthY + 52}, ${f.cx + 43} ${f.mouthY + 34} C ${f.cx + 36} ${f.mouthY + 66}, ${f.cx - 34} ${f.mouthY + 66}, ${f.cx - 41} ${f.mouthY + 30} Z`}
            fill={shadow}
            opacity="0.55"
          />
        )}

        {/* Blosjes */}
        {(f.feminine || f.kid) &&
          sides.map((s) => (
            <ellipse
              key={`blush${s}`}
              cx={f.cx + s * (f.eyeGap + 14)}
              cy={f.eyeY + 33}
              rx="15"
              ry="8.5"
              fill="#f08c80"
              opacity={f.kid ? 0.35 : 0.26}
            />
          ))}

        {/* Rimpels */}
        {wrinkleLevel > 0 && (
          <g stroke={shadow} strokeWidth="2.6" strokeLinecap="round" fill="none" opacity="0.8">
            {/* Voorhoofd */}
            <path d={`M ${f.cx - 28} ${f.browY - 30} Q ${f.cx} ${f.browY - 35} ${f.cx + 28} ${f.browY - 30}`} />
            <path d={`M ${f.cx - 22} ${f.browY - 43} Q ${f.cx} ${f.browY - 47} ${f.cx + 22} ${f.browY - 43}`} />
            {wrinkleLevel > 1 && <path d={`M ${f.cx - 16} ${f.browY - 56} Q ${f.cx} ${f.browY - 59} ${f.cx + 16} ${f.browY - 56}`} />}

            {sides.map((s) => {
              const ex = f.cx + s * f.eyeGap;
              const x0 = ex + s * 15;
              return (
                <g key={`wr${s}`}>
                  {/* Kraaienpootjes */}
                  <path d={`M ${x0} ${f.eyeY - 3} l ${s * 8} -5`} />
                  <path d={`M ${x0 + s} ${f.eyeY + 2} l ${s * 9} 1`} />
                  {wrinkleLevel > 1 && <path d={`M ${x0} ${f.eyeY + 7} l ${s * 7} 5`} />}
                  {/* Neus-mondplooien */}
                  <path
                    d={`M ${f.cx + s * 14} ${f.noseY - 4} Q ${f.cx + s * 27} ${f.noseY + 16} ${f.cx + s * (f.mouthHalf + 8)} ${f.mouthY + 8}`}
                  />
                  {/* Wallen */}
                  {wrinkleLevel > 1 && <path d={`M ${ex - 8} ${f.eyeY + 16} Q ${ex} ${f.eyeY + 20} ${ex + 8} ${f.eyeY + 16}`} opacity="0.7" />}
                </g>
              );
            })}
            {/* Fronslijntje tussen de wenkbrauwen */}
            {wrinkleLevel > 1 && <path d={`M ${f.cx - 4} ${f.browY - 7} l 1 11`} opacity="0.7" />}
          </g>
        )}

        {/* Neus */}
        <g stroke={shadow} strokeLinecap="round" fill="none">
          {!f.kid && (
            <path
              d={`M ${f.cx + 4} ${f.noseY - 30} Q ${f.cx + 9} ${f.noseY - 14} ${f.cx + 7} ${f.noseY - 6}`}
              strokeWidth="3"
              opacity={f.feminine ? 0.4 : 0.55}
            />
          )}
          <path
            d={
              f.feminine || f.kid
                ? `M ${f.cx - 8} ${f.noseY - 2} Q ${f.cx - 1} ${f.noseY + 4} ${f.cx + 8} ${f.noseY - 2}`
                : `M ${f.cx - 10} ${f.noseY - 3} Q ${f.cx - 2} ${f.noseY + 5} ${f.cx + 9} ${f.noseY - 2}`
            }
            strokeWidth="3.6"
          />
        </g>

        {/* Mond */}
        {f.kid ? (
          <g>
            <path
              d={`M ${f.cx - 15} ${f.mouthY - 2} Q ${f.cx} ${f.mouthY + 18} ${f.cx + 15} ${f.mouthY - 2} Q ${f.cx} ${f.mouthY + 3} ${f.cx - 15} ${f.mouthY - 2} Z`}
              fill="#8e3b36"
            />
            <path
              d={`M ${f.cx - 9} ${f.mouthY + 0.3} Q ${f.cx} ${f.mouthY + 3.5} ${f.cx + 9} ${f.mouthY + 0.3} L ${f.cx + 8} ${f.mouthY + 3} Q ${f.cx} ${f.mouthY + 6} ${f.cx - 8} ${f.mouthY + 3} Z`}
              fill="#ffffff"
            />
          </g>
        ) : f.feminine ? (
          <g>
            <path
              d={`M ${f.cx - f.mouthHalf} ${f.mouthY} C ${f.cx - f.mouthHalf * 0.55} ${f.mouthY - 6}, ${f.cx - 4} ${f.mouthY - 7}, ${f.cx} ${f.mouthY - 3.5} C ${f.cx + 4} ${f.mouthY - 7}, ${f.cx + f.mouthHalf * 0.55} ${f.mouthY - 6}, ${f.cx + f.mouthHalf} ${f.mouthY} C ${f.cx + f.mouthHalf * 0.5} ${f.mouthY + 12}, ${f.cx - f.mouthHalf * 0.5} ${f.mouthY + 12}, ${f.cx - f.mouthHalf} ${f.mouthY} Z`}
              fill={f.senior ? "#c27a73" : "#c96a66"}
            />
            <path
              d={`M ${f.cx - f.mouthHalf + 1} ${f.mouthY} Q ${f.cx} ${f.mouthY + 4.5} ${f.cx + f.mouthHalf - 1} ${f.mouthY}`}
              stroke="#9c4744"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
            <ellipse cx={f.cx + 3} cy={f.mouthY + 6} rx="4.5" ry="1.8" fill="#ffffff" opacity="0.3" />
          </g>
        ) : (
          <g strokeLinecap="round" fill="none">
            <path
              d={`M ${f.cx - f.mouthHalf} ${f.mouthY} Q ${f.cx} ${f.mouthY + 9} ${f.cx + f.mouthHalf} ${f.mouthY}`}
              stroke="#9a5848"
              strokeWidth="4.2"
            />
            <path d={`M ${f.cx - 6} ${f.mouthY + 10} Q ${f.cx} ${f.mouthY + 12} ${f.cx + 6} ${f.mouthY + 10}`} stroke={shadow} strokeWidth="2.6" opacity="0.6" />
          </g>
        )}

        {/* Wenkbrauwen */}
        {sides.map((s) => (
          <path
            key={`brow${s}`}
            d={f.feminine || f.kid ? BROW_FEM : BROW_MASC}
            transform={`translate(${f.cx + s * f.eyeGap} ${f.browY})${s === 1 ? " scale(-1 1)" : ""}`}
            fill={f.browColor}
          />
        ))}

        {/* Ogen, ooglid & wimpers */}
        {sides.map((s) => {
          const ex = f.cx + s * f.eyeGap;
          const rx = f.kid ? 11 : 9;
          const ry = f.kid ? 12.5 : 10.5;
          return (
            <g key={`eye${s}`}>
              <ellipse cx={ex} cy={f.eyeY} rx={rx} ry={ry} fill={INK} />
              <circle cx={ex + 3} cy={f.eyeY - 3.5} r={f.kid ? 4 : 3} fill="#ffffff" />
              {f.kid && <circle cx={ex - 3.5} cy={f.eyeY + 4} r="1.6" fill="#ffffff" opacity="0.85" />}
              {f.feminine && (
                <g stroke={INK} strokeLinecap="round" fill="none">
                  <path d={`M ${ex - 12} ${f.eyeY - 6} Q ${ex} ${f.eyeY - 16} ${ex + 12} ${f.eyeY - 6}`} strokeWidth="3.4" />
                  <path d={`M ${ex + s * 10} ${f.eyeY - 8} L ${ex + s * 17} ${f.eyeY - 14}`} strokeWidth="3" />
                  <path d={`M ${ex + s * 5} ${f.eyeY - 11.5} L ${ex + s * 9} ${f.eyeY - 18.5}`} strokeWidth="2.8" />
                </g>
              )}
            </g>
          );
        })}
      </g>

      {/* ===== Bril ===== */}
      {showGlasses && (
        <g>
          <g fill="none" stroke={glassesColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
            <path d={`M ${f.cx - f.eyeGap - 25} ${f.eyeY - 8} L ${f.faceLeft} ${f.eyeY - 12}`} />
            <path d={`M ${f.cx + f.eyeGap + 25} ${f.eyeY - 8} L ${f.faceRight} ${f.eyeY - 12}`} />
            <path d={`M ${f.cx - f.eyeGap + 25} ${f.eyeY - 5} Q ${f.cx} ${f.eyeY - 13} ${f.cx + f.eyeGap - 25} ${f.eyeY - 5}`} />
          </g>
          {sides.map((s) => {
            const ex = f.cx + s * f.eyeGap;
            return (
              <g key={`lens${s}`}>
                <rect
                  x={ex - 25}
                  y={f.eyeY - 19}
                  width="50"
                  height="38"
                  rx="14"
                  fill="#ffffff"
                  fillOpacity="0.14"
                  stroke={glassesColor}
                  strokeWidth="5"
                />
                <path d={`M ${ex - 15} ${f.eyeY + 3} L ${ex - 6} ${f.eyeY - 10}`} stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" opacity="0.5" />
              </g>
            );
          })}
        </g>
      )}
    </g>
  );
}
