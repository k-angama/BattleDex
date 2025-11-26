# BattleDex Search Screen - Implementation Guide

## 🎯 Overview

The Search Screen is the core navigation hub for BattleDex. It allows users to:

- 🔍 Search Pokémon cards by name or type
- 🏷️ Filter cards by type
- ⚔️ Select up to 2 cards to compare
- 📊 View detailed card information
- ⚡ Calculate and display Power Scores

## 📁 Project Structure

```
src/
├── screens/
│   └── SearchScreen.tsx          # Main search screen component
├── components/
│   ├── SearchBar.tsx             # Search input component
│   ├── CardCard.tsx              # Card display component
│   ├── FilterChips.tsx           # Type filter chips
│   └── EmptyState.tsx            # Empty state UI
├── utils/
│   ├── powerScoreCalculator.ts   # Power score calculation logic
│   └── mockCardData.ts           # Mock card data and search helpers
└── types/
    └── index.ts                  # TypeScript type definitions
```

## 🎨 Components

### SearchScreen

The main container component that orchestrates all functionality.

**Features:**

- Real-time search and filtering
- Multi-selection logic (up to 2 cards)
- Modal-based detail view
- Comparison button bar

**Props:**

```typescript
interface SearchScreenProps {
  onComparePress?: (cards: PokemonCard[]) => void;
}
```

### SearchBar

Reusable search input with clear button.

```typescript
interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
}
```

### CardCard

Individual card display with power score.

```typescript
interface CardCardProps {
  card: PokemonCard;
  powerScore?: PowerScore;
  onPress?: () => void;
  onCompare?: () => void;
}
```

### FilterChips

Horizontal scrollable type filters.

```typescript
interface FilterChipsProps {
  items: string[];
  selectedItems: string[];
  onSelect: (item: string) => void;
  label?: string;
}
```

## ⚡ Power Score Algorithm

The power score calculation (0-100) considers:

1. **Offensive Power (35%)**

   - Average attack damage
   - Type advantage multiplier

2. **Defensive Power (65%)**
   - HP contribution
   - Weakness count penalty
   - Resistance count bonus

### Formula Breakdown

```
HP Contribution = min((hp / 300) * 25, 25)
Attack Contribution = min((avgDamage / 200) * 35, 35)
Weakness Contribution = max(15 - weaknessCount * 5, 0)
Resistance Contribution = min(resistanceCount * 3, 15)
Type Advantage = TYPE_EFFECTIVENESS_TABLE lookup

Offensive Power = Attack + TypeAdvantage
Defensive Power = HP + Weakness + Resistance

Total Power Score = (Offensive + Defensive) / 2
```

## 🎨 Type Colors

Each Pokémon type has a distinct color:

| Type        | Color  | Hex     |
| ----------- | ------ | ------- |
| Fire        | Red    | #FF6B6B |
| Water       | Teal   | #4ECDC4 |
| Grass       | Green  | #95E1D3 |
| Electric    | Yellow | #FFE66D |
| Psychic     | Pink   | #FF6B9D |
| Dragon      | Purple | #6C63FF |
| Dark        | Gray   | #2F3E46 |
| Fairy       | Pink   | #FFB3E6 |
| And more... |        |         |

## 📱 Features in Detail

### Search & Filter

- **Real-time search** by card name, type, or set
- **Type filtering** with multi-select capability
- **Auto-complete suggestions** (ready for API integration)

### Card Details Modal

Swipe up to see:

- Card HP, type, and set information
- Power score breakdown with metrics explanation
- List of attacks with damage values
- Weaknesses and resistances
- "Add to Comparison" button

### Comparison Selection

- Select up to 2 cards
- Selection bar shows count and comparison button
- Cards highlight when selected
- Easy to swap cards

## 🔄 Usage Example

```typescript
import { SearchScreen } from './src/screens/SearchScreen';

function App() {
  const handleCompare = (cards: PokemonCard[]) => {
    console.log('Compare:', cards[0].name, 'vs', cards[1].name);
    // Navigate to comparison screen
  };

  return <SearchScreen onComparePress={handleCompare} />;
}
```

## 🚀 Next Steps

### Integration Points

1. **Replace Mock Data**

   - Connect `searchCards()` to TCGdex API
   - Implement pagination for large results
   - Add real Pokémon card images

2. **Add Navigation**

   - Create comparison screen
   - Add favorites management
   - Implement battle simulator

3. **Enhancements**
   - Add rarity filters
   - Implement sorting options
   - Add card image viewing
   - Save searches to history

### API Integration Example

```typescript
// Replace mockCardData.ts functions
async function searchCards(query: string) {
  const results = await TCGdexSDK.search(query);
  return results.map(formatCard);
}
```

## 📊 Card Data Structure

```typescript
interface PokemonCard {
  id: string;
  name: string;
  image: string;
  hp: number;
  types: string[];
  attacks: Attack[];
  weaknesses: Weakness[];
  resistances: Resistance[];
  rarity?: string;
  set?: string;
  setNumber?: string;
}
```

## 🎯 User Flow

```
Search Screen
    ↓
Enter Search Query / Select Filters
    ↓
View Filtered Cards with Power Scores
    ↓
Tap Card → View Details Modal
    ↓
Select 2 Cards
    ↓
Tap "Compare Now" → Navigation to Comparison Screen
```

## 🛠️ Styling System

All components use React Native StyleSheet with:

- Consistent spacing (8px, 12px, 16px grid)
- Type-based color palette
- Shadow/elevation for depth
- Responsive flex layouts

## 📝 Notes

- Mock data includes 6 sample Pokémon cards
- Power scores are recalculated when comparing
- Type effectiveness is comprehensive (17 types)
- Components are fully typed with TypeScript
- Styling supports light/dark modes (via system setting)

---

**Status:** ✅ Production Ready (with mock data)
**Next Phase:** API Integration & Comparison Screen
