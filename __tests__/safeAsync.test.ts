import { safeCall } from '../src/common/utils/safeAsync';

describe('safeCall', () => {
  it('returns result and sets state on success', async () => {
    const setter = jest.fn();
    const setterError = jest.fn();

    const [result, error] = await safeCall(
      async () => 'ok',
      setter,
      setterError,
    );

    expect(result).toBe('ok');
    expect(error).toBeNull();
    expect(setter).toHaveBeenCalledWith('ok');
    expect(setterError).not.toHaveBeenCalled();
  });

  it('handles thrown errors and sets fallback message', async () => {
    const setter = jest.fn();
    const setterError = jest.fn();

    const [result, error] = await safeCall(
      async () => {
        throw new Error('boom');
      },
      setter,
      setterError,
      { fallbackMessage: 'Fallback' },
    );

    expect(result).toBeNull();
    expect(error).toBe('Fallback');
    expect(setter).not.toHaveBeenCalled();
    expect(setterError).toHaveBeenCalledWith('Fallback');
  });
});
