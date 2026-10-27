export const WEEKDAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
export type Weekday = (typeof WEEKDAYS)[number];

declare const studyDateBrand: unique symbol;
export type StudyDate = string & { readonly [studyDateBrand]: true };

export function asStudyDate(value: string): StudyDate {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) throw new Error('Study dates must use YYYY-MM-DD.');
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    throw new Error('Study date is not a valid calendar day.');
  }
  return value as StudyDate;
}

export type StudySubject = {
  id: string;
  name: string;
  tone: 'violet' | 'blue' | 'rose' | 'sage';
};

export type StudySessionStatus = 'planned' | 'in-progress' | 'completed' | 'skipped';

export type StudySession = {
  id: string;
  subjectId: StudySubject['id'];
  title: string;
  scheduledDate: StudyDate;
  startTime: string;
  durationMinutes: number;
  status: StudySessionStatus;
  repeatScheduleId?: string;
};

export type StudyPlan = {
  id: string;
  date: StudyDate;
  sessions: StudySession[];
  isSample: boolean;
};

export type RepeatSchedule = {
  id: string;
  subjectId: StudySubject['id'];
  frequency: 'daily' | 'weekly';
  interval: number;
  weekdays: Weekday[];
  startDate: StudyDate;
  endDate: StudyDate | null;
  timeOfDay: string;
  durationMinutes: number;
  active: boolean;
};

export type StudyValidationIssue = {
  fieldPath: string;
  code: 'required' | 'format' | 'range' | 'reference';
  message: string;
};

const isTime = (value: string) => /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
const isStudyDate = (value: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};
const isDuration = (value: number) => Number.isInteger(value) && value >= 5 && value <= 240;

export function validateStudySession(session: StudySession, subjectIds: string[], repeatScheduleIds: string[] = []): StudyValidationIssue[] {
  const issues: StudyValidationIssue[] = [];
  if (!subjectIds.includes(session.subjectId)) issues.push({ fieldPath: 'subjectId', code: 'reference', message: 'Choose a subject in your library.' });
  if (session.title.trim().length === 0) issues.push({ fieldPath: 'title', code: 'required', message: 'Add a short session title.' });
  if (!isStudyDate(session.scheduledDate)) issues.push({ fieldPath: 'scheduledDate', code: 'format', message: 'Choose a valid study date.' });
  if (!isTime(session.startTime)) issues.push({ fieldPath: 'startTime', code: 'format', message: 'Use a local time in HH:MM format.' });
  if (!isDuration(session.durationMinutes)) issues.push({ fieldPath: 'durationMinutes', code: 'range', message: 'Choose a duration from 5 to 240 minutes.' });
  if (session.repeatScheduleId && !repeatScheduleIds.includes(session.repeatScheduleId)) {
    issues.push({ fieldPath: 'repeatScheduleId', code: 'reference', message: 'Choose an existing repeat schedule or remove the reference.' });
  }
  return issues;
}

export function validateRepeatSchedule(schedule: RepeatSchedule, subjectIds: string[]): StudyValidationIssue[] {
  const issues: StudyValidationIssue[] = [];
  if (!subjectIds.includes(schedule.subjectId)) issues.push({ fieldPath: 'subjectId', code: 'reference', message: 'Choose a subject in your library.' });
  if (!Number.isInteger(schedule.interval) || schedule.interval < 1 || schedule.interval > 52) {
    issues.push({ fieldPath: 'interval', code: 'range', message: 'Repeat interval must be between 1 and 52.' });
  }
  if (schedule.frequency === 'weekly' && schedule.weekdays.length === 0) {
    issues.push({ fieldPath: 'weekdays', code: 'required', message: 'Choose at least one weekday for a weekly schedule.' });
  }
  if (schedule.frequency === 'daily' && schedule.weekdays.length > 0) {
    issues.push({ fieldPath: 'weekdays', code: 'range', message: 'Daily schedules do not use weekday selections.' });
  }
  if (new Set(schedule.weekdays).size !== schedule.weekdays.length) {
    issues.push({ fieldPath: 'weekdays', code: 'range', message: 'Choose each weekday only once.' });
  }
  if (!isStudyDate(schedule.startDate) || (schedule.endDate !== null && !isStudyDate(schedule.endDate))) {
    issues.push({ fieldPath: 'dates', code: 'format', message: 'Choose valid start and end dates.' });
  } else if (schedule.endDate !== null && schedule.endDate < schedule.startDate) {
    issues.push({ fieldPath: 'endDate', code: 'range', message: 'End date cannot be earlier than start date.' });
  }
  if (!isTime(schedule.timeOfDay)) issues.push({ fieldPath: 'timeOfDay', code: 'format', message: 'Use a local time in HH:MM format.' });
  if (!isDuration(schedule.durationMinutes)) issues.push({ fieldPath: 'durationMinutes', code: 'range', message: 'Choose a duration from 5 to 240 minutes.' });
  return issues;
}

export function formatStudyDate(value: StudyDate): { weekday: string; day: string; monthYear: string; full: string } {
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return {
    weekday: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date),
    day: new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date),
    monthYear: new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date),
    full: new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(date),
  };
}
