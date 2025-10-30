import { input, select } from '@inquirer/prompts';
import { Command } from 'commander';
import { loadAppData } from './core/data-loader';
import { generateDiagnosticReport } from './reports';
import { AppData } from './models/types';

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
        output = generateDiagnosticReport();
        break;
      case 'progress':
        output = generateDiagnosticReport();
        break;
      case 'feedback':
        output = generateDiagnosticReport();
        break;
      default:
        console.log('Invalid report type selected.');
        return;
    }

    console.log('\n==============================');
    console.log(output);
    console.log('==============================\n');
  } catch (error) {
    console.error('Error running CLI:', error);
  }
}

program.action(runCLI);
program.parseAsync(process.argv);
