import { APICardsRepository } from '../APICardsRepository';
import { SearchCardSuggestionEntity } from '../entities/SearchCardSuggestionEntity';

export class APICardsMockRepository implements APICardsRepository {
  async getCardNames(name: string): Promise<SearchCardSuggestionEntity[]> {
    await new Promise<void>(async resolve => {
      await setTimeout(resolve, 500);
    });
    return [
      {
        id: '1',
        title: 'Pikachu',
        subtitle: 'HP 60',
        imageUrl: 'https://images.pokemontcg.io/base1/58.png',
      },
      {
        id: '1a',
        title: 'Pikachu',
        subtitle: 'HP 90',
        imageUrl: 'https://images.pokemontcg.io/sm115/30.png',
      },
      {
        id: '1b',
        title: 'Pikachu',
        subtitle: 'HP 110',
        imageUrl: 'https://images.pokemontcg.io/swsh4/44.png',
      },
      {
        id: '1c',
        title: 'Pikachu',
        subtitle: 'HP 120',
        imageUrl: 'https://images.pokemontcg.io/swsh35/31.png',
      },
      {
        id: '1d',
        title: 'Pikachu',
        subtitle: 'HP 130',
        imageUrl: 'https://images.pokemontcg.io/swsh45/37.png',
      },
      {
        id: '1e',
        title: 'Pikachu',
        subtitle: 'HP 140',
        imageUrl: 'https://images.pokemontcg.io/swsh7/49.png',
      },
      {
        id: '2',
        title: 'Charmander',
        subtitle: 'HP 39',
        imageUrl: 'https://example.com/charmander.png',
      },
      {
        id: '2a',
        title: 'Charmander',
        subtitle: 'HP 80',
        imageUrl: 'https://images.pokemontcg.io/sm115/2.png',
      },
      {
        id: '2b',
        title: 'Charmander',
        subtitle: 'HP 100',
        imageUrl: 'https://images.pokemontcg.io/sv2/27.png',
      },
      {
        id: '21',
        title: 'Charmander',
        subtitle: 'HP 139',
        imageUrl: 'https://example.com/charmander.png',
      },
      {
        id: '3',
        title: 'Bulbasaur',
        subtitle: 'HP 39',
        imageUrl: 'https://example.com/bulbasaur.png',
      },
      {
        id: '3a',
        title: 'Bulbasaur',
        subtitle: 'HP 80',
        imageUrl: 'https://images.pokemontcg.io/swsh45/1.png',
      },
      {
        id: '4',
        title: 'Squirtle',
        subtitle: 'HP 39',
        imageUrl: 'https://example.com/squirtle.png',
      },
      {
        id: '5',
        title: 'Eevee',
        subtitle: 'HP 39',
        imageUrl: 'https://example.com/eevee.png',
      },
      {
        id: '6',
        title: 'Jigglypuff',
        subtitle: 'HP 39',
        imageUrl: 'https://example.com/jigglypuff.png',
      },
      {
        id: '7',
        title: 'Meowth',
        subtitle: 'HP 39',
        imageUrl: 'https://example.com/meowth.png',
      },
      {
        id: '8',
        title: 'Psyduck',
        subtitle: 'HP 39',
        imageUrl: 'https://example.com/psyduck.png',
      },
      {
        id: '9',
        title: 'Snorlax',
        subtitle: 'HP 39',
        imageUrl: 'https://example.com/snorlax.png',
      },
    ].filter(card => card.title.toLowerCase().includes(name.toLowerCase()));
  }
}
