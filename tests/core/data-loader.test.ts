import { loadAppData } from '../../src/core/data-loader';
import { promises as fs } from 'fs';
import { AppError } from '../../src/util/error-handler';
import { appData } from '../mocks/app-data.mock';

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
  },
}));

describe('Data Loader', () => {
  const mockReadFile = fs.readFile as jest.Mock;

  beforeEach(() => {
    mockReadFile.mockReset();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should load and validate all JSON files successfully', async () => {
    mockReadFile.mockResolvedValueOnce(JSON.stringify(appData.students));
    mockReadFile.mockResolvedValueOnce(JSON.stringify(appData.questions));
    mockReadFile.mockResolvedValueOnce(JSON.stringify(appData.assessments));
    mockReadFile.mockResolvedValueOnce(JSON.stringify(appData.studentResponses));

    const data = await loadAppData();
    expect(data.students[0].firstName).toBe('Tony');
    expect(data.questions[0].id).toBe('numeracy1');
  });

  it('should throw an AppError when file reading fails', async () => {
    mockReadFile.mockRejectedValueOnce(new Error('File read error'));
    await expect(loadAppData()).rejects.toThrow(AppError);
  });
});
