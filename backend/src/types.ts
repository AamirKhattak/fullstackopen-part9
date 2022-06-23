export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

//-----------------------


export interface Diagnoses{
  code: string;
  name: string;
  latin?: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnoses['code']>;
}

export enum healthCheckRating{
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk"=3
}

interface HealthCheckEntry extends BaseEntry{
  type: "HealthCheck";
  healthCheckRating: healthCheckRating;
}

interface HospitalEntry extends BaseEntry{
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
};

interface OccupationalHealthcareEntry extends BaseEntry{
 type: "OccupationalHealthcare";
 employerName: string;
 sickLeave?:{
  startDate: string;
  endDate: string;
 };
};

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

// Define special omit for unions
// type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
// type EntryWithoutId = UnionOmit<Entry, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Patients{
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}
export type PublicPatient = Omit<Patients, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patients, 'id'>;