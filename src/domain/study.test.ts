import { describe, expect, it } from 'vitest';
import { sampleRepeatSchedules, sampleStudyPlan, studySubjects } from '../data/sampleStudyPlan';
import { asStudyDate, formatStudyDate, validateRepeatSchedule, validateStudySession, type RepeatSchedule } from './study';

describe('Stillroom study session and repeat schedule contracts', () => {
  const subjectIds = studySubjects.map(subject => subject.id);
  const scheduleIds = sampleRepeatSchedules.map(schedule => schedule.id);

  it('keeps all sample sessions aligned to the plan date and known subjects', () => {
    expect(sampleStudyPlan.isSample).toBe(true);
    expect(sampleStudyPlan.sessions).toHaveLength(3);
    for (const session of sampleStudyPlan.sessions) {
      expect(session.scheduledDate).toBe(sampleStudyPlan.date);
      expect(validateStudySession(session, subjectIds, scheduleIds)).toEqual([]);
    }
  });

  it('rejects invalid session time, duration, and subject references', () => {
    const invalidSession = {
      ...sampleStudyPlan.sessions[0],
      subjectId: 'unknown-subject',
      startTime: '25:00',
      durationMinutes: 0,
    };
    const issues = validateStudySession(invalidSession, subjectIds, scheduleIds);

    expect(issues.map(issue => issue.fieldPath)).toEqual(['subjectId', 'startTime', 'durationMinutes']);
  });

  it('validates weekly repeat choices and date ranges', () => {
    expect(validateRepeatSchedule(sampleRepeatSchedules[0], subjectIds)).toEqual([]);

    const invalid = {
      ...sampleRepeatSchedules[0],
      weekdays: ['tue', 'tue'] as RepeatSchedule['weekdays'],
      startDate: asStudyDate('2026-11-01'),
      endDate: asStudyDate('2026-10-27'),
    };
    const issues = validateRepeatSchedule(invalid, subjectIds);
    expect(issues).toContainEqual(expect.objectContaining({ fieldPath: 'weekdays', code: 'range' }));
    expect(issues).toContainEqual(expect.objectContaining({ fieldPath: 'endDate', code: 'range' }));

    const dailyWithWeekday = { ...sampleRepeatSchedules[0], frequency: 'daily' as const, weekdays: ['tue'] as RepeatSchedule['weekdays'] };
    expect(validateRepeatSchedule(dailyWithWeekday, subjectIds)).toContainEqual(expect.objectContaining({
      fieldPath: 'weekdays',
      message: 'Daily schedules do not use weekday selections.',
    }));
  });

  it('validates calendar dates and formats the plan date without timezone shifts', () => {
    expect(() => asStudyDate('2026-02-30')).toThrow('Study date is not a valid calendar day.');
    expect(formatStudyDate(asStudyDate('2026-10-27'))).toEqual({
      weekday: 'Tuesday',
      day: '27',
      monthYear: 'October 2026',
      full: 'Tuesday, October 27',
    });
  });
});
