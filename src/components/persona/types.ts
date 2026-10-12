export type Gender = 'man' | 'vrouw';

export type AgeGroup = '12-18' | '18-25' | '26-40' | '41-64' | '65+';

export type IncomeLevel = 'budget' | 'modaal' | 'hoog';

export type JobSector = 
  | 'vakman' 
  | 'hulpdiensten'
  | 'horeca'
  | 'ondernemer' 
  | 'kantoor' 
  | 'tech' 
  | 'zorg' 
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
  gender: Gender | '';
  ageGroup: AgeGroup | '';
  incomeLevel: IncomeLevel | '';
  jobSector: JobSector | '';
  lifestyles: string[];
  housing: Housing | '';
  familySituation: FamilySituation | '';
  platforms: Platform[];
  coreMotivation: CoreMotivation | '';
  customContext: string;
}

export const EMPTY_PERSONA: PersonaData = {
  name: "",
  gender: '',
  ageGroup: '',
  incomeLevel: '',
  jobSector: '',
  lifestyles: [],
  housing: '',
  familySituation: '',
  platforms: [],
  coreMotivation: '',
  customContext: '',
};

export const DEFAULT_PERSONA: PersonaData = EMPTY_PERSONA;
