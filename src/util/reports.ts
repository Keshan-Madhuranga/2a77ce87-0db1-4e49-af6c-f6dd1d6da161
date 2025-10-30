import { StudentResponse } from '../models/types';

export function getLatestCompletedResponse(
  responses: StudentResponse[],
): StudentResponse | undefined {
  const completed = responses.filter(isAssessmentCompleted);
  return completed.sort(
    (a, b) => new Date(b.completed!).getTime() - new Date(a.completed!).getTime(),
  )[0];
}

export const isAssessmentCompleted = (response: StudentResponse): boolean =>
  Boolean(response.completed);
