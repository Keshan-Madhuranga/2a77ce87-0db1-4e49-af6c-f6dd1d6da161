export const STRANDS = [
  'Number and Algebra',
  'Measurement and Geometry',
  'Statistics and Probability',
] as const;
export type Strand = (typeof STRANDS)[number];

export const QUESTION_TYPES = ['multiple-choice'] as const;
export type QuestionType = (typeof QUESTION_TYPES)[number];

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  yearLevel: number;
}

export interface Assessment {
  id: string;
  name: string;
  questions: AssessmentQuestionRef[];
}

export interface AssessmentQuestionRef {
  questionId: string;
  position: number;
}

export interface Question {
  id: string;
  stem: string;
  type: QuestionType;
  strand: Strand;
  config: MultipleChoiceConfig;
}

export interface MultipleChoiceConfig {
  options: MultipleChoiceOption[];
  key: string;
  hint: string;
}
export interface MultipleChoiceOption {
  id: string;
  label: string;
  value: string;
}

export interface StudentResponse {
  id: string;
  assessmentId: string;
  assigned: string;
  started: string;
  completed?: string;
  student: StudentRef;
  responses: ResponseItem[];
  results: AssessmentResults;
}

export interface StudentRef {
  id: string;
  yearLevel: number;
}

export interface ResponseItem {
  questionId: string;
  response: string;
}

export interface AssessmentResults {
  rawScore: number;
}

export interface AppData {
  students: Student[];
  questions: Question[];
  assessments: Assessment[];
  studentResponses: StudentResponse[];
}
