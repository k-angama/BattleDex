import { CardEntity } from '../../features/home/domaine/entities/CardEntity';
import { CompareCardsPreviewEntity } from '../../features/home/domaine/entities/CompareCardsPreviewEntity';

const aquaGuardian: CardEntity = {
  id: '1',
  name: 'Aqua Guardian',
  type: 'Water',
  hp: '180',
  imageUrl: 'https://images.pokemontcg.io/base1/4_hires.png',
  attacks: [
    {
      name: 'Tidal Wave',
      damage: 90,
      cost: [
        { name: 'Water', type: 'water' },
        { name: 'Water', type: 'water' },
        { name: 'Colorless', type: 'colorless' },
      ],
    },
    {
      name: 'Bubble Armor',
      damage: 60,
      cost: [
        { name: 'Water', type: 'water' },
        { name: 'Colorless', type: 'colorless' },
      ],
    },
  ],
  setName: 'Base Set',
  weaknesses: [{ name: 'Electric', type: 'electric', value: '×2' }],
  resistances: [{ name: 'Fire', type: 'fire', value: '-30' }],
  metaUsageRate: 0.18,
  staticScore: '85',
};

const pyroblazeDragon: CardEntity = {
  id: '2',
  name: 'Pyroblaze Dragon',
  type: 'Fire',
  hp: '200',
  imageUrl: 'https://images.pokemontcg.io/base1/2_hires.png',
  attacks: [
    {
      name: 'Inferno Burst',
      damage: 110,
      cost: [{ name: 'Colorless', type: 'colorless' }],
    },
    {
      name: 'Scorching Tail',
      damage: 80,
      cost: [
        { name: 'Colorless', type: 'colorless' },
        { name: 'Colorless', type: 'colorless' },
        { name: 'Colorless', type: 'colorless' },
      ],
    },
  ],
  weaknesses: [{ name: 'Water', type: 'water', value: '×2' }],
  resistances: [{ name: 'Grass', type: 'grass', value: '-20' }],
  metaUsageRate: 0.25,
  setName: 'Base Set',
  staticScore: '90',
};

const stormcallerFalcon: CardEntity = {
  id: '3',
  name: 'Stormcaller Falcon',
  type: 'Lightning',
  hp: '160',
  imageUrl:
    'https://www.tcgdex.net/_next/image?url=https%3A%2F%2Fassets.tcgdex.net%2Fen%2Fbw%2Fbw8%2F2%2Fhigh.webp&w=384&q=100',
  attacks: [
    {
      name: 'Thunder Dive',
      damage: 95,
      cost: [
        { name: 'Lightning', type: 'lightning' },
        { name: 'Lightning', type: 'lightning' },
        { name: 'Colorless', type: 'colorless' },
      ],
    },
    {
      name: 'Sky Shock',
      damage: 70,
      cost: [
        { name: 'Lightning', type: 'lightning' },
        { name: 'Colorless', type: 'colorless' },
      ],
    },
  ],
  weaknesses: [{ name: 'Rock', type: 'rock', value: '×2' }],
  resistances: [{ name: 'Metal', type: 'metal', value: '-20' }],
  metaUsageRate: 0.12,
  setName: 'Base Set',
  staticScore: '82',
};

const obsidianGolem: CardEntity = {
  id: '4',
  name: 'Obsidian Golem',
  type: 'Rock',
  hp: '210',
  imageUrl:
    'https://www.tcgdex.net/_next/image?url=https%3A%2F%2Fassets.tcgdex.net%2Fen%2Fbw%2Fbw8%2F8%2Fhigh.webp&w=384&q=100',
  attacks: [
    {
      name: 'Quake Fist',
      damage: 100,
      cost: [
        { name: 'Fighting', type: 'fighting' },
        { name: 'Fighting', type: 'fighting' },
        { name: 'Colorless', type: 'colorless' },
        { name: 'Colorless', type: 'colorless' },
      ],
    },
    {
      name: 'Stone Wall',
      damage: 60,
      cost: [
        { name: 'Fighting', type: 'fighting' },
        { name: 'Colorless', type: 'colorless' },
        { name: 'Colorless', type: 'colorless' },
      ],
    },
  ],
  weaknesses: [{ name: 'Water', type: 'water', value: '×2' }],
  resistances: [{ name: 'Electric', type: 'electric', value: '-30' }],
  metaUsageRate: 0.2,
  setName: 'Base Set',
  staticScore: '87',
};

const auroraSerpent: CardEntity = {
  id: '5',
  name: 'Aurora Serpent',
  type: 'Dragon',
  hp: '190',
  imageUrl: 'https://images.pokemontcg.io/base2/4_hires.png',
  attacks: [
    {
      name: 'Prismatic Bite',
      damage: 85,
      cost: [{ name: 'Colorless', type: 'colorless' }],
    },
    {
      name: 'Chromatic Spiral',
      damage: 120,
      cost: [{ name: 'Dragon', type: 'dragon' }],
    },
  ],
  weaknesses: [{ name: 'Fairy', type: 'fairy', value: '×2' }],
  resistances: [{ name: 'Fire', type: 'fire', value: '-20' }],
  metaUsageRate: 0.3,
  setName: 'Base Set',
  staticScore: '88',
};

export const compareCardsPreviewMock: CompareCardsPreviewEntity[] = [
  {
    id: '1',
    winner: 'card2',
    loseCard: aquaGuardian,
    windCard: pyroblazeDragon,
    comparisonDate: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
  {
    id: '2',
    winner: 'card2',
    loseCard: stormcallerFalcon,
    windCard: obsidianGolem,
    comparisonDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  },
  {
    id: '3',
    winner: 'draw',
    loseCard: aquaGuardian,
    windCard: obsidianGolem,
    comparisonDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
  },
  {
    id: '4',
    winner: 'card2',
    loseCard: obsidianGolem,
    windCard: auroraSerpent,
    comparisonDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
  },
];
