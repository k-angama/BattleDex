import Config from 'react-native-config';
import { CardEntity } from '../../features/home/domaine/entities/CardEntity';
import { hmacValid } from '../utils/hmacValid';
import { getAcceptLanguage } from '../utils/locale';
import { RawCard, RawMatchResult, RawSearchCard } from './types';

type HttpMethod = 'GET' | 'POST';

export class PCPowerScoreAPI {
  constructor(private readonly baseUrl: string = Config.API_BASE_URL ?? '') {}

  private async request<T>(
    path: string,
    method: HttpMethod,
    body?: unknown,
  ): Promise<T> {
    const requestUrl = this.buildUrl(path);
    const serializedBody =
      body === undefined ? undefined : JSON.stringify(body);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept-Language': getAcceptLanguage(),
    };

    Object.assign(
      headers,
      this.buildSignatureHeaders(method, path, serializedBody),
    );

    const response = await fetch(requestUrl, {
      method,
      headers,
      body: serializedBody,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  }

  async searchCardsByName(name: string): Promise<RawSearchCard[]> {
    return this.request<RawSearchCard[]>(
      `/v1/cards/${encodeURIComponent(name)}`,
      'GET',
    );
  }

  async searchCardById(id: string): Promise<RawCard> {
    return this.request<RawCard>(`/v1/card/${encodeURIComponent(id)}`, 'GET');
  }

  async compareCards(
    card1: CardEntity,
    card2: CardEntity,
  ): Promise<RawMatchResult> {
    return this.request<RawMatchResult>(`/v1/compare`, 'POST', {
      card1,
      card2,
    });
  }

  private buildUrl(path: string) {
    const normalizedBase = this.baseUrl.replace(/\/+$/, '');
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${normalizedBase}${normalizedPath}`;
  }

  private buildSignatureHeaders(
    method: HttpMethod,
    url: string,
    body?: string,
  ) {
    const secret = Config.API_SECRET as string;
    const apiKey = Config.API_KEY as string;

    return hmacValid(secret, apiKey, method, url, body);
  }
}
