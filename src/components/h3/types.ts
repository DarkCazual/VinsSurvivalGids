export type LogoType = 
  | 'beeldmerk'
  | 'lettermerk'
  | 'woordmerk'
  | 'combinatiemerk'
  | 'embleem'
  | 'abstract'
  | 'mascotte';

export type ColorHarmony = 
  | 'complementair'
  | 'monochroom'
  | 'analoog'
  | 'triadisch'
  | 'tetradisch';

export type H3Tab = 'lijst' | 'generator' | 'kleuren' | 'typografie' | 'beeld' | 'huisstijl';

export interface LogoLijstData {
  welTags: string[];
  nietTags: string[];
  sfeerWoorden: [string, string, string] | string[];
  preferredType: LogoType | '';
}

export interface LogoGeneratorData {
  initials: string;
  subtitle: string;
  selectedLogoType: LogoType | '';
  selectedLogoUrl: string;
  selectedLogoPrompt: string;
  savedLogos: Partial<Record<LogoType, string>>;
}

export interface ColorPaletteData {
  primary: string; // Hoofdkleur
  accent: string;  // Steunkleur
  dark: string;    // Zwart-vervanger (berekend of custom)
  light: string;   // Wit-vervanger (berekend of custom)
  harmony: ColorHarmony;
  isConfirmed: boolean;
  recoloredLogoUrl: string | null;
}

export interface TypographyData {
  headingFont: string;
  bodyFont: string;
  headlineText: string;
  sublineText: string;
  isConfirmed: boolean;
}

export interface BrandImageryData {
  expression: 'lachend' | 'serieus';
  gaze: 'camera' | 'wegkijkend';
  lighting: 'licht' | 'donker';
  photos: string[];
  patternUrl: string | null;
  iconStyle: 'lijn' | 'vlak';
}

export interface H3Data {
  companyName: string;
  lijst: LogoLijstData;
  logo: LogoGeneratorData;
  colors: ColorPaletteData;
  typography: TypographyData;
  imagery: BrandImageryData;
  isCompleted: boolean;
  isRevealed: boolean;
  updatedAt: string;
}

export const DEFAULT_H3_DATA: H3Data = {
  companyName: "",
  lijst: {
    welTags: [],
    nietTags: [],
    sfeerWoorden: ["", "", ""],
    preferredType: "",
  },
  logo: {
    initials: "",
    subtitle: "",
    selectedLogoType: "",
    selectedLogoUrl: "",
    selectedLogoPrompt: "",
    savedLogos: {},
  },
  colors: {
    primary: "#1E3A8A",
    accent: "#DFB25A",
    dark: "#0F172A",
    light: "#F8FAFC",
    harmony: "complementair",
    isConfirmed: false,
    recoloredLogoUrl: null,
  },
  typography: {
    headingFont: "Montserrat",
    bodyFont: "Inter",
    headlineText: "",
    sublineText: "",
    isConfirmed: false,
  },
  imagery: {
    expression: "lachend",
    gaze: "camera",
    lighting: "licht",
    photos: [],
    patternUrl: null,
    iconStyle: "lijn",
  },
  isCompleted: false,
  isRevealed: false,
  updatedAt: new Date().toISOString(),
};
