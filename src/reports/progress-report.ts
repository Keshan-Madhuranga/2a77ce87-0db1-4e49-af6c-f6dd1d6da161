import { format, parse } from 'date-fns';
import { AppData } from '../models/types';
import { isAssessmentCompleted } from '../util/reports';
import { AppError, handleError } from '../util/error-handler';

export function generateProgressReport(
  data: AppData,
  studentId: string,
  assessmentId: string = 'assessment1',
): string {
  try {
    const student = data.students.find(student => student.id === studentId);
    if (!student) throw new AppError('Student not found.');

    const responses = data.studentResponses
      .filter(
        response =>
          response.student.id === studentId &&
          isAssessmentCompleted(response) &&
          response.assessmentId === assessmentId,
      )
      .sort((a, b) => new Date(a.completed!).getTime() - new Date(b.completed!).getTime());

    if (responses.length < 2) {
      throw new AppError(
        `${student.firstName} ${student.lastName} does not have enough completed assessments to show progress.`,
      );
    }

    const assessment = data.assessments.find(
      assessment => assessment.id === responses[0].assessmentId,
    );
    const oldest = responses[0];
    const latest = responses[responses.length - 1];

    let output = `${student.firstName} ${student.lastName} has completed ${assessment?.name} assessment ${responses.length} times in total. Date and raw score given below:\n\n`;

    for (const response of responses) {
      const parsedDate = parse(latest.completed!, 'dd/MM/yyyy HH:mm:ss', new Date());
      const dateStr = format(new Date(parsedDate), 'do MMMM yyyy');
      output += `Date: ${dateStr}, Raw Score: ${response.results.rawScore} out of ${response.responses.length}\n`;
    }

    const improvement = latest.results.rawScore - oldest.results.rawScore;
    output += `\n${student.firstName} ${student.lastName} got ${improvement} more correct in the recent completed assessment than the oldest.`;

    return output.trim();
  } catch (error) {
    handleError(error, 'ProgressReport');
    throw new AppError('Failed to generate progress report.');
  }
}
