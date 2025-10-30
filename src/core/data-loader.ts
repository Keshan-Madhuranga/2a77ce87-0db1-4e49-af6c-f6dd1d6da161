import { promises as fs } from 'fs';
import path from 'path';
import { AppData, Student, Question, Assessment, StudentResponse } from '../models/types';

async function loadJsonFile<T>(filePath: string): Promise<T> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Failed to load file: ${filePath}`);
    throw error;
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

    return {
      students,
      questions,
      assessments,
      studentResponses,
    };
  } catch (error) {
    console.error('Error loading application data:', error);
    throw error;
  }
}
