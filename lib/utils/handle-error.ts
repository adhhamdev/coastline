export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleSupabaseError(error: any): AppError {
  // Check if it's already an AppError
  if (error instanceof AppError) {
    return error;
  }

  // Handle Supabase storage errors
  if (error?.error?.statusCode === 413 || error?.statusCode === 413) {
    return new AppError(
      'File size too large. Maximum file size is 2MB.',
      413,
      'FILE_TOO_LARGE'
    );
  }

  if (error?.error?.statusCode === 400 || error?.statusCode === 400) {
    return new AppError(
      'Invalid request. Please check your input.',
      400,
      'INVALID_REQUEST'
    );
  }

  if (error?.error?.statusCode === 404 || error?.statusCode === 404) {
    return new AppError(
      'Resource not found.',
      404,
      'NOT_FOUND'
    );
  }

  if (error?.error?.statusCode === 409 || error?.statusCode === 409) {
    return new AppError(
      'A conflict occurred. Please try again.',
      409,
      'CONFLICT'
    );
  }

  // Handle specific Supabase error codes
  switch (error?.code) {
    case '22001':
      return new AppError(
        'The input value is too long.',
        400,
        'VALUE_TOO_LONG'
      );
    case '23505':
      return new AppError(
        'This item already exists.',
        409,
        'DUPLICATE_ENTRY'
      );
    case '23503':
      return new AppError(
        'This operation would violate referential integrity.',
        400,
        'FOREIGN_KEY_VIOLATION'
      );
    case '42P01':
      return new AppError(
        'The requested resource does not exist.',
        404,
        'RESOURCE_NOT_FOUND'
      );
    default:
      return new AppError(
        'An unexpected error occurred. Please try again later.',
        500,
        'INTERNAL_SERVER_ERROR'
      );
  }
}
