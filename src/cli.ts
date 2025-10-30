import { input, select } from '@inquirer/prompts';
import { Command } from 'commander';
import { loadAppData } from './core/data-loader';
import {
  generateDiagnosticReport,
  generateProgressReport,
  generateFeedbackReport,
} from './reports';
import { AppData } from './models/types';
import { handleError } from './util/error-handler';

const program = new Command();

program
  .name('assessment-reporter')
  .description('CLI tool to generate student assessment reports')
  .version('1.0.0');

async function runCLI(): Promise<void> {
  try {
    const data: AppData = await loadAppData();

    const studentId: string = await input({ message: 'Student ID:' });

    const reportType = await select({
      message: 'Select report to generate:',
      choices: [
        { name: 'Diagnostic Report', value: 'diagnostic' },
        { name: 'Progress Report', value: 'progress' },
        { name: 'Feedback Report', value: 'feedback' },
      ],
    });

    let output: string = '';
    switch (reportType) {
      case 'diagnostic':
        output = generateDiagnosticReport(data, studentId);
        break;
      case 'progress':
        output = generateProgressReport(data, studentId);
        break;
      case 'feedback':
        output = generateFeedbackReport(data, studentId);
        break;
      default:
        throw new Error('Invalid report type selected.');
    }

    console.log('\n==============================');
    console.log(output);
    console.log('==============================\n');
  } catch (error) {
    handleError(error, 'CLI');
  }
}

program.action(runCLI);
program.parseAsync(process.argv);
