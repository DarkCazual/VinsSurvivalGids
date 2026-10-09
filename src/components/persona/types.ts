export type Gender = 'man' | 'vrouw';

export type AgeGroup = '18-25' | '26-40' | '41-64' | '65+';

export type IncomeLevel = 'budget' | 'modaal' | 'hoog';

export type JobSector = 
  | 'vakman' 
  | 'ondernemer' 
  | 'kantoor' 
  | 'tech' 
  | 'zorg' 
  | 'hulpdiensten'
  | 'onderwijs'
  | 'politiek'
  | 'student'
  | 'werkzoekend'
  | 'gepensioneerd';

export type Housing = 'stad' | 'dorp' | 'buitengebied';

export type FamilySituation = 
  | 'single' 
  | 'samenwonend' 
  | 'jong_gezin' 
  | 'tieners' 
  | 'spoed_ouders' 
  | 'senior_alleen';

export type Platform = 
  | 'linkedin' 
  | 'instagram' 
  | 'tiktok' 
  | 'facebook' 
  | 'google' 
  | 'lokaal';

export type CoreMotivation = 
  | 'snelheid' 
  | 'kwaliteit' 
  | 'prijs' 
  | 'ontzorging' 
  | 'vertrouwen';

export interface PersonaData {
  name: string;
  gender: Gender;
  ageGroup: AgeGroup;
  incomeLevel: IncomeLevel;
  jobSector: JobSector;
  lifestyles: string[];
  housing: Housing;
  familySituation: FamilySituation;
  platforms: Platform[];
  coreMotivation: CoreMotivation;
  customContext: string;
}

export const DEFAULT_PERSONA: PersonaData = {
  name: "Jan de Boer",
  gender: 'man',
  ageGroup: '26-40',
  incomeLevel: 'modaal',
  jobSector: 'kantoor',
  lifestyles: ['familie', 'klussen'],
  housing: 'dorp',
  familySituation: 'jong_gezin',
  platforms: ['linkedin', 'facebook', 'google'],
  coreMotivation: 'snelheid',
  customContext: 'Heeft met spoed vloerverwarming nodig: woont met 2 jonge kinderen tijdelijk bij zijn ouders en wil binnen 4 weken verhuizen.',
};
