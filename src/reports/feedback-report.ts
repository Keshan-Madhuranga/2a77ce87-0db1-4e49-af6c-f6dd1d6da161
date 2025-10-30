import { format, parse } from 'date-fns';
import { AppData } from '../models/types';
import { getLatestCompletedResponse } from '../util/reports';

export function generateFeedbackReport(
  data: AppData,
  studentId: string,
  assessmentId: string = 'assessment1',
): string {
  const student = data.students.find(student => student.id === studentId);
  if (!student) return 'Student not found.';

  const responses = data.studentResponses.filter(
    response => response.student.id === studentId && response.assessmentId === assessmentId,
  );

  if (responses.length <= 0) {
    return `${student.firstName} ${student.lastName} has assigned/attempted assessments.`;
  }

  const latest = getLatestCompletedResponse(responses);
  if (!latest) {
    return `${student.firstName} ${student.lastName} has no completed assessments.`;
  }

  const assessment = data.assessments.find(assessment => assessment.id === latest.assessmentId);
  if (!assessment) return 'Assessment not found.';

  const parsedDate = parse(latest.completed!, 'dd/MM/yyyy HH:mm:ss', new Date());
  const dateStr = format(new Date(parsedDate), 'do MMMM yyyy hh:mm a');
  const totalQuestions = latest.responses.length;
  const correctCount = latest.results.rawScore;

  let output = `${student.firstName} ${student.lastName} recently completed ${assessment?.name} assessment on ${dateStr}\n`;
  output += `He got ${correctCount} questions right out of ${totalQuestions}. Feedback for wrong answers given below\n\n`;

  for (const response of latest.responses) {
    const question = data.questions.find(question => question.id === response.questionId);
    if (!question) continue;

    if (response.response !== question.config.key) {
      const yourAns = question.config.options.find(option => option.id === response.response);
      const correctAns = question.config.options.find(option => option.id === question.config.key);

      output += `Question: ${question.stem}\n`;
      output += `Your answer: ${yourAns?.label} with value ${yourAns?.value}\n`;
      output += `Right answer: ${correctAns?.label} with value ${correctAns?.value}\n`;
      output += `Hint: ${question.config.hint}\n\n`;
    }
  }

  return output.trim();
}
