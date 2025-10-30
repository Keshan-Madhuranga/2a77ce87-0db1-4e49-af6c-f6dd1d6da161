import { z } from 'zod';

export const StudentSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  yearLevel: z.number().int().positive(),
});

export const AssessmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  questions: z.array(
    z.object({
      questionId: z.string(),
      position: z.number().int().positive(),
    }),
  ),
});

export const MultipleChoiceOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
});

export const MultipleChoiceConfigSchema = z.object({
  options: z.array(MultipleChoiceOptionSchema),
  key: z.string(),
  hint: z.string(),
});

export const QuestionSchema = z.object({
  id: z.string(),
  stem: z.string(),
  type: z.enum(['multiple-choice']),
  strand: z.enum(['Number and Algebra', 'Measurement and Geometry', 'Statistics and Probability']),
  config: MultipleChoiceConfigSchema,
});

export const StudentRefSchema = z.object({
  id: z.string(),
  yearLevel: z.number().int().positive(),
});

export const ResponseItemSchema = z.object({
  questionId: z.string(),
  response: z.string(),
});

export const AssessmentResultsSchema = z.object({
  rawScore: z.number().int().nonnegative(),
});

export const StudentResponseSchema = z.object({
  id: z.string(),
  assessmentId: z.string(),
  assigned: z.string(),
  started: z.string(),
  completed: z.string().optional(),
  student: StudentRefSchema,
  responses: z.array(ResponseItemSchema),
  results: AssessmentResultsSchema,
});

export const AppDataSchema = z.object({
  students: z.array(StudentSchema),
  questions: z.array(QuestionSchema),
  assessments: z.array(AssessmentSchema),
  studentResponses: z.array(StudentResponseSchema),
});
