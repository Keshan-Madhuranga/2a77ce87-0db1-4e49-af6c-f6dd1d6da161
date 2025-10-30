import { promises as fs } from 'fs';
import path from 'path';
import { AppData, Student, Question, Assessment, StudentResponse } from '../models/types';
import { AppDataSchema } from '../models/schemas';
import { AppError, handleError } from '../util/error-handler';

async function loadJsonFile<T>(filePath: string): Promise<T> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch (error) {
    handleError(error, 'DataLoader-loadJsonFile');
    throw new AppError(`Failed to load file: ${filePath}`);
  }
}

export async function loadAppData(): Promise<AppData> {
  const baseDir = path.resolve(__dirname, '../../data');

  try {
    const [students, questions, assessments, studentResponses] = await Promise.all([
      loadJsonFile<Student[]>(path.join(baseDir, 'students.json')),
      loadJsonFile<Question[]>(path.join(baseDir, 'questions.json')),
      loadJsonFile<Assessment[]>(path.join(baseDir, 'assessments.json')),
      loadJsonFile<StudentResponse[]>(path.join(baseDir, 'student-responses.json')),
    ]);

    const parsed = AppDataSchema.safeParse({
      students,
      questions,
      assessments,
      studentResponses,
    });

    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const path = issue.path.length ? issue.path.join('.') : '(root)';
        console.error(`  • ${path}: ${issue.message}`);
      }
      throw new AppError('Data validation failed');
    }
    return parsed.data;
  } catch (error) {
    handleError(error, 'DataLoader-loadAppData');
    throw new AppError('Failed to load application data.');
  }
}
