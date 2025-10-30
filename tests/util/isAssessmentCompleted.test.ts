import { isAssessmentCompleted } from '../../src/util/reports';

describe('isAssessmentCompleted', () => {
  it('should return true when completed date exists', () => {
    expect(isAssessmentCompleted({ completed: '2021-12-16' } as any)).toBe(true);
  });

  it('should return false when completed date is missing', () => {
    expect(isAssessmentCompleted({} as any)).toBe(false);
  });
});
