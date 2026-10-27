import { asStudyDate, type RepeatSchedule, type StudyPlan, type StudySubject } from '../domain/study';

export const studySubjects: StudySubject[] = [
  { id: 'statistics', name: 'Statistics', tone: 'violet' },
  { id: 'biology', name: 'Biology', tone: 'blue' },
  { id: 'spanish', name: 'Spanish', tone: 'rose' },
];

export const sampleRepeatSchedules: RepeatSchedule[] = [
  {
    id: 'spanish-tuesday-practice',
    subjectId: 'spanish',
    frequency: 'weekly',
    interval: 1,
    weekdays: ['tue'],
    startDate: asStudyDate('2026-10-27'),
    endDate: null,
    timeOfDay: '13:30',
    durationMinutes: 25,
    active: true,
  },
];

// Fictional example only; the plan is kept in memory and resets on reload.
export const sampleStudyPlan: StudyPlan = {
  id: 'sample-plan-2026-10-27',
  date: asStudyDate('2026-10-27'),
  isSample: true,
  sessions: [
    { id: 'session-statistics', subjectId: 'statistics', title: 'Chapter 04', scheduledDate: asStudyDate('2026-10-27'), startTime: '09:00', durationMinutes: 45, status: 'in-progress' },
    { id: 'session-biology', subjectId: 'biology', title: 'Cell structures', scheduledDate: asStudyDate('2026-10-27'), startTime: '10:15', durationMinutes: 35, status: 'planned' },
    { id: 'session-spanish', subjectId: 'spanish', title: 'Listening practice', scheduledDate: asStudyDate('2026-10-27'), startTime: '13:30', durationMinutes: 25, status: 'planned', repeatScheduleId: 'spanish-tuesday-practice' },
  ],
};
