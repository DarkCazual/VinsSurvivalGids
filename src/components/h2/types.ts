/**
 * Types voor Hoofdstuk 2: De Basis
 * Vin's Survival Gids Platform
 */

export type NameType = 'beschrijvend' | 'suggestief' | 'associatief' | 'verzonnen';

export interface NameChecklist {
  hardopGezegd: boolean;        // "Goedemiddag, u spreekt met..."
  geenSpelfout: boolean;        // Aan de telefoon direct duidelijk
  googleCorrigeertNiet: boolean;// Geen Rebrandt-effect ("Bedoelde u...")
  domeinVrij: boolean;          // .nl / .com beschikbaar
  kvkVrij: boolean;             // Geen directe concurrentie in handelsregister
  toekomstbestendig: boolean;   // Past over 3 jaar bij groei
}

export interface NameOption {
  id: string;
  name: string;
  type: NameType;
  checks: NameChecklist;
  notes?: string;
}

export type LegalForm = 'eenmanszaak' | 'vof' | 'bv' | 'twijfel';

export type KorChoice = 'ja' | 'nee' | 'uitzoeken';

export interface H2Data {
  names: NameOption[];
  winningName: string | null;
  legalForm: LegalForm;
  korChoice: KorChoice;
  businessAddress: string;
  postalCity: string;
  activitiesDescription: string;
  sbiSectorHint: string;
  checklist: {
    idProofReady: boolean;
    nameFinalized: boolean;
    legalFormDecided: boolean;
    korDecided: boolean;
    appointmentBooked: boolean;
  };
  updatedAt?: string;
}

export const DEFAULT_H2_DATA: H2Data = {
  names: [
    {
      id: "name-1",
      name: "",
      type: "beschrijvend",
      checks: {
        hardopGezegd: false,
        geenSpelfout: false,
        googleCorrigeertNiet: false,
        domeinVrij: false,
        kvkVrij: false,
        toekomstbestendig: false,
      },
      notes: "",
    },
    {
      id: "name-2",
      name: "",
      type: "suggestief",
      checks: {
        hardopGezegd: false,
        geenSpelfout: false,
        googleCorrigeertNiet: false,
        domeinVrij: false,
        kvkVrij: false,
        toekomstbestendig: false,
      },
      notes: "",
    },
    {
      id: "name-3",
      name: "",
      type: "verzonnen",
      checks: {
        hardopGezegd: false,
        geenSpelfout: false,
        googleCorrigeertNiet: false,
        domeinVrij: false,
        kvkVrij: false,
        toekomstbestendig: false,
      },
      notes: "",
    },
  ],
  winningName: null,
  legalForm: "eenmanszaak",
  korChoice: "uitzoeken",
  businessAddress: "",
  postalCity: "",
  activitiesDescription: "",
  sbiSectorHint: "",
  checklist: {
    idProofReady: false,
    nameFinalized: false,
    legalFormDecided: false,
    korDecided: false,
    appointmentBooked: false,
  },
};
