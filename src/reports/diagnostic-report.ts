import { format, parse } from 'date-fns';
import { AppData } from '../models/types';
import { getLatestCompletedResponse } from '../util/reports';
import { AppError, handleError } from '../util/error-handler';

export function generateDiagnosticReport(
  data: AppData,
  studentId: string,
  assessmentId: string = 'assessment1',
): string {
  try {
    const student = data.students.find(student => student.id === studentId);
    if (!student) throw new AppError('Student not found.');

    const responses = data.studentResponses.filter(
      response => response.student.id === studentId && response.assessmentId === assessmentId,
    );
    if (responses.length <= 0) {
      throw new AppError(
        `${student.firstName} ${student.lastName} has assigned/attempted assessments.`,
      );
    }

    const latest = getLatestCompletedResponse(responses);
    if (!latest) {
      throw new AppError(`${student.firstName} ${student.lastName} has no completed assessments.`);
    }

    const assessment = data.assessments.find(assessment => assessment.id === latest.assessmentId);
    if (!assessment) throw new AppError('Assessment not found.');

    const parsedDate = parse(latest.completed!, 'dd/MM/yyyy HH:mm:ss', new Date());
    const dateStr = format(new Date(parsedDate), 'do MMMM yyyy hh:mm a');
    const totalQuestions = latest.responses.length;

    let correctCount = 0;
    const strandStats: Record<string, { correct: number; total: number }> = {};

    for (const response of latest.responses) {
      const question = data.questions.find(question => question.id === response.questionId);
      if (!question) continue;

      const strand = question.strand;
      if (!strandStats[strand]) {
        strandStats[strand] = { correct: 0, total: 0 };
      }

      strandStats[strand].total++;
      if (response.response === question.config.key) {
        correctCount++;
        strandStats[strand].correct++;
      }
    }

    let output = `${student.firstName} ${student.lastName} recently completed ${assessment.name} assessment on ${dateStr}\n`;
    output += `He got ${correctCount} questions right out of ${totalQuestions}. Details by strand given below:\n\n`;

    for (const [strand, stats] of Object.entries(strandStats)) {
      output += `${strand}: ${stats.correct} out of ${stats.total} correct\n`;
    }

    return output.trim();
  } catch (error) {
    handleError(error, 'DiagnosticReport');
    throw new AppError('Failed to generate diagnostic report.');
  }
}
