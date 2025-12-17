import { CardEntity } from '../../features/home/domaine/entities/CardEntity';
import { searchCardSuggestionsMock } from './searchCardSuggestions.mock';

type CardTemplate = {
  type: string;
  weaknesses: CardEntity['weaknesses'];
  resistances: CardEntity['resistances'];
};

const cardTemplates: Record<string, CardTemplate> = {
  pikachu: {
    type: 'Electric',
    weaknesses: [{ type: 'ground', name: 'Ground', value: '×2' }],
    resistances: [{ type: 'steel', name: 'Steel', value: '-20' }],
  },
  charmander: {
    type: 'Fire',
    weaknesses: [{ type: 'water', name: 'Water', value: '×2' }],
    resistances: [{ type: 'grass', name: 'Grass', value: '-20' }],
  },
  bulbasaur: {
    type: 'Grass',
    weaknesses: [{ type: 'fire', name: 'Fire', value: '×2' }],
    resistances: [{ type: 'water', name: 'Water', value: '-20' }],
  },
  squirtle: {
    type: 'Water',
    weaknesses: [{ type: 'electric', name: 'Electric', value: '×2' }],
    resistances: [{ type: 'fire', name: 'Fire', value: '-20' }],
  },
  eevee: {
    type: 'Colorless',
    weaknesses: [{ type: 'fighting', name: 'Fighting', value: '×2' }],
    resistances: [{ type: 'psychic', name: 'Psychic', value: '-20' }],
  },
  jigglypuff: {
    type: 'Colorless',
    weaknesses: [{ type: 'fighting', name: 'Fighting', value: '×2' }],
    resistances: [{ type: 'dark', name: 'Dark', value: '-20' }],
  },
  meowth: {
    type: 'Colorless',
    weaknesses: [{ type: 'fighting', name: 'Fighting', value: '×2' }],
    resistances: [{ type: 'psychic', name: 'Psychic', value: '-20' }],
  },
  psyduck: {
    type: 'Water',
    weaknesses: [{ type: 'electric', name: 'Electric', value: '×2' }],
    resistances: [{ type: 'fire', name: 'Fire', value: '-20' }],
  },
  snorlax: {
    type: 'Colorless',
    weaknesses: [{ type: 'fighting', name: 'Fighting', value: '×2' }],
    resistances: [{ type: 'psychic', name: 'Psychic', value: '-30' }],
  },
  mewtwo: {
    type: 'Psychic',
    weaknesses: [{ type: 'psychic', name: 'Psychic', value: '×2' }],
    resistances: [{ type: 'fighting', name: 'Fighting', value: '-30' }],
  },
  gyarados: {
    type: 'Water',
    weaknesses: [{ type: 'electric', name: 'Electric', value: '×2' }],
    resistances: [{ type: 'fighting', name: 'Fighting', value: '-20' }],
  },
  onix: {
    type: 'Fighting',
    weaknesses: [{ type: 'grass', name: 'Grass', value: '×2' }],
    resistances: [{ type: 'electric', name: 'Electric', value: '-20' }],
  },
};

const buildAttacks = (name: string, hp: number): CardEntity['attacks'] => {
  const base = Math.max(20, Math.floor(hp / 2));
  return [
    {
      name: `${name} Strike`,
      damage: base,
      cost: [{ type: 'colorless', name: 'Colorless' }],
    },
    {
      name: `${name} Burst`,
      damage: base + 20,
      cost: [
        { type: 'colorless', name: 'Colorless' },
        { type: 'colorless', name: 'Colorless' },
      ],
    },
  ];
};

export const suggestionToCard = (id: string): CardEntity | null => {
  const suggestion = searchCardSuggestionsMock.find(card => card.id === id);
  if (!suggestion) {
    return null;
  }
  const hpMatch = suggestion.subtitle.match(/(\d+)/);
  const hp = hpMatch ? parseInt(hpMatch[1], 10) : 60;
  const key = suggestion.title.toLowerCase();
  const template = cardTemplates[key] ?? {
    type: 'Colorless',
    weaknesses: [{ type: 'colorless', name: 'Colorless', value: '×2' }],
    resistances: [{ type: 'colorless', name: 'Colorless', value: '-20' }],
  };
  return {
    id: suggestion.id,
    name: suggestion.title,
    type: template.type,
    hp,
    setName: 'Mock Set',
    imageUrl: suggestion.imageUrl,
    attacks: buildAttacks(suggestion.title, hp),
    weaknesses: template.weaknesses,
    resistances: template.resistances,
    rarity: 'Common',
  };
};

export const detailCardsMock: Record<string, CardEntity> = Object.fromEntries(
  searchCardSuggestionsMock
    .map(s => suggestionToCard(s.id))
    .filter((c): c is CardEntity => c !== null)
    .map(c => [c.id, c]),
);
