
import { NewDiaryEntry, Weather, Visibility, Gender, NewPatient } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }

  return comment;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isWeather = (param: any): param is Weather => {
  return Object.values(Weather).includes(param);
};

const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isWeather(weather)) {
      throw new Error('Incorrect or missing weather: ' + weather);
  }
  return weather;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isVisibility = (param: any): param is Visibility => {
  return Object.values(Visibility).includes(param);
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!visibility || !isVisibility(visibility)) {
      throw new Error('Incorrect or missing visibility: ' + visibility);
  }
  return visibility;
};

type Fields = { comment : unknown, date: unknown, weather: unknown, visibility: unknown };

const toNewDiaryEntry = ({ comment, date, weather, visibility } : Fields): NewDiaryEntry => {

  const newEntry: NewDiaryEntry = {
    comment: parseComment(comment),
    date: parseDate(date),
    weather: parseWeather(weather),
    visibility: parseVisibility(visibility)
  };

  return newEntry;
};

export default toNewDiaryEntry;

//-------------------

const parseName = (name: unknown): string => {
  if(!name || !isString(name)){
    throw new Error('Incorrect or missing name');
  }
  return name;
}

const parseSSN = (ssn: unknown): string => {
  if(!ssn || !isString(ssn)){
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
}

const parseOccupation = (occupation: unknown): string => {
  if(!occupation || !isString(occupation)){
    throw new Error('Incorrect or missing ssn');
  }
  return occupation;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
}

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isGender(gender)){
    throw new Error('Incorrect or missing gender ' + gender);
  }
  return gender;
}

type PatientFields = {name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: any};

export const toNewPatient = ( {name, dateOfBirth, ssn, gender, occupation, entries}: PatientFields): NewPatient => { 
  let newEntries = entries ? entries : new Array();
  
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: newEntries
  };
  return newPatient;
}