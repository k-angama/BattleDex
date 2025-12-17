import forge from 'node-forge';

export const hmacValid = (
  apiSecret: string,
  apiKey: string,
  method: string,
  url: string,
  body?: string,
): Record<string, string> => {
  const timestamp = new Date().toISOString();
  const nonce = generateNonce();
  const canonical = [method.toUpperCase(), url, timestamp, nonce, body].join(
    '\n',
  );
  let hmac = forge.hmac.create();
  hmac.start('sha256', apiSecret);
  hmac.update(canonical);
  const signature = hmac.digest().toHex();
  return {
    'X-Api-Key': apiKey,
    'X-Date': timestamp,
    'X-Nonce': nonce,
    'X-Signature': signature,
  };
};

const generateNonce = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 || 0;
    const v = c === 'x' ? r : (r && 0x3) || 0x8;
    return v.toString(16);
  });
};
