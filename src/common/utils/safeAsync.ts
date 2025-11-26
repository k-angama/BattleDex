import type React from 'react';

type ErrorResult<T> = readonly [T | null, string | null];

type SafeCallOptions = {
  operation?: string;
  fallbackMessage?: string;
  logError?: boolean;
};

export async function safeCall<T>(
  task: () => Promise<T>,
  setter?:
    | React.Dispatch<React.SetStateAction<T>>
    | React.Dispatch<React.SetStateAction<T | null>>,
  setterErrorMessage?: React.Dispatch<React.SetStateAction<string | null>>,
  options: SafeCallOptions = {},
): Promise<ErrorResult<T>> {
  const {
    operation = 'Operation',
    fallbackMessage = 'An error occurred',
    logError = true,
  } = options;

  try {
    const result = await task();
    setter?.(result);
    return [result, null] as const;
  } catch (err) {
    let userMessage = fallbackMessage;

    if (err instanceof Error) {
      // Customize based on error type
      if (err.message.includes('network') || err.message.includes('fetch')) {
        userMessage = 'Network error. Please check your connection.';
      } else if (err.message.includes('timeout')) {
        userMessage = 'Request timed out. Please try again.';
      }

      if (logError) {
        console.error(`[${operation}] ${err.message}`, err);
      }
    } else {
      if (logError) {
        console.error(`[${operation}] Unexpected error:`, err);
      }
    }

    setterErrorMessage?.(userMessage);
    return [null, userMessage] as const;
  }
}

/**
 * Variant of safeCall that always returns a value. If the task throws,
 * the provided fallback is returned and error handling mirrors safeCall.
 */
export async function safeCallWithFallback<T>(
  task: () => Promise<T>,
  fallback: T,
  setter?:
    | React.Dispatch<React.SetStateAction<T>>
    | React.Dispatch<React.SetStateAction<T | null>>,
  setterErrorMessage?: React.Dispatch<React.SetStateAction<string | null>>,
  options: SafeCallOptions = {},
): Promise<readonly [T, string | null]> {
  const [result, error] = await safeCall(
    task,
    setter,
    setterErrorMessage,
    options,
  );
  return [result ?? fallback, error];
}
