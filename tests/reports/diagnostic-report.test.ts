import { generateDiagnosticReport } from '../../src/reports';
import { AppData } from '../../src/models/types';
import { appData } from '../mocks/app-data.mock';
import { AppError } from '../../src/util/error-handler';

describe('Diagnostic Report', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  it('should generate a correct diagnostic report summary', () => {
    const report = generateDiagnosticReport(appData as AppData, 'student1');
    expect(report).toContain('Tony Stark');
    expect(report).toContain('Numeracy');
    expect(report).toContain('Number and Algebra');
  });

  it('should handle missing student', () => {
    expect(() => generateDiagnosticReport(appData as AppData, 'missing')).toThrow(AppError);
  });
});
