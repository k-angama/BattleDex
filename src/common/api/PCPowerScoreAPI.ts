import Config from 'react-native-config';
import { CardEntity } from '../../features/home/domaine/entities/CardEntity';
import { RawCard, RawMatchResult, RawSearchCard } from './types';

type HttpMethod = 'GET' | 'POST';

export class PCPowerScoreAPI {
  constructor(
    private readonly baseUrl: string = Config.API_BASE_URL ??
      'https://api.example.com',
  ) {}

  private async request<T>(
    path: string,
    method: HttpMethod,
    body?: unknown,
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
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
}
