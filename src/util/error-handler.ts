export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleError(error: unknown, context?: string): void {
  const prefix = context ? `[${context}] ` : '';
  if (error instanceof AppError) {
    console.error(`❌ ${prefix}${error.message}`);
  } else if (error instanceof Error) {
    console.error(`❌ ${prefix}Unexpected error: ${error.message}`);
  } else {
    console.error(`❌ ${prefix}An unknown error occurred.`);
  }
}
