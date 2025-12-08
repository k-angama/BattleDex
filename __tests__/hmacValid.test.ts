import QuickCrypto from 'react-native-quick-crypto';
import { hmacValid } from '../src/common/utils/hmacValid';

jest.mock('react-native-quick-crypto', () => {
  const createHmac = jest.fn(() => {
    const update = jest.fn().mockReturnThis();
    const digest = jest.fn().mockReturnValue('mocked-signature');
    return { update, digest };
  });

  return {
    __esModule: true,
    default: { createHmac },
    createHmac,
  };
});

describe('hmacValid', () => {
  const fixedDate = new Date('2024-01-01T00:00:00.000Z');
  let randomSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(fixedDate);
    randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.5);
    jest.clearAllMocks();
  });

  afterEach(() => {
    randomSpy.mockRestore();
    jest.useRealTimers();
  });

  it('returns signed headers with canonical content', () => {
    const headers = hmacValid(
      'test-secret',
      'test-key',
      'post',
      '/v1/cards',
      '{"name":"Pikachu"}',
    );

    const nonce = '88888888-8888-4888-3888-888888888888';
    const canonical = [
      'POST',
      '/v1/cards',
      fixedDate.toISOString(),
      nonce,
      '{"name":"Pikachu"}',
    ].join('\n');

    const createHmacMock = QuickCrypto.createHmac as jest.Mock;
    const hmacInstance = createHmacMock.mock.results[0].value;

    expect(createHmacMock).toHaveBeenCalledWith('sha256', 'test-secret');
    expect(hmacInstance.update).toHaveBeenCalledWith(canonical);
    expect(hmacInstance.digest).toHaveBeenCalledWith('hex');

    expect(headers).toEqual({
      'X-Api-Key': 'test-key',
      'X-Date': fixedDate.toISOString(),
      'X-Nonce': nonce,
      'X-Signature': 'mocked-signature',
    });
  });
});
