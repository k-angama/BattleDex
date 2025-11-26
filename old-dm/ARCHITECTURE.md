# 🗺️ BattleDex Architecture & Component Map

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         App.tsx                                 │
│                    (Entry Point)                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SearchScreen.tsx                             │
│                  (Main Feature)                                 │
├──────────┬──────────────┬──────────────┬───────────┬─────────┤
│ StateBox │ SearchLogic  │ FilterLogic  │ Selection │ Navigation│
└──────────┴──────────────┴──────────────┴───────────┴─────────┤
          │
          ├─────────────────────────────────────────┐
          │                                         │
          ▼                                         ▼
    ┌───────────────┐                     ┌──────────────────┐
    │  Components   │                     │   Utilities      │
    ├───────────────┤                     ├──────────────────┤
    │ SearchBar     │                     │ powerScoreCalc   │
    │ FilterChips   │                     │ mockCardData     │
    │ CardCard      │                     │ Types            │
    │ EmptyState    │                     │                  │
    └───────────────┘                     └──────────────────┘
          │
          └─────────────────────────────────────────┐
                                                   │
                    ┌──────────────────────────────┐
                    │                              │
                    ▼                              ▼
        ┌─────────────────────┐      ┌──────────────────────┐
        │  Card Detail Modal  │      │ Comparison Screen    │
        └─────────────────────┘      └──────────────────────┘
```

## Component Hierarchy

```
App
  └── SearchScreen
       ├── SearchBar
       ├── FilterChips
       ├── Selection Bar (conditional)
       ├── FlatList
       │    └── CardCard (repeating)
       │         ├── Header (name, types, HP)
       │         ├── Stats Row (attacks, weaknesses, etc.)
       │         └── Compare Button
       └── Modal (Card Details)
            └── CardDetailView
                 ├── Header
                 └── FlatList
                      ├── Card Info Section
                      ├── Power Score Section
                      ├── Attacks Section
                      ├── Weaknesses Section
                      ├── Resistances Section
                      └── Compare Button
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                       User Input                                │
├─────────────────────────────────────────────────────────────────┤
│  - Type in search bar
│  - Tap type filter chip
│  - Select card for comparison
│  - Tap card details
│  - Tap compare button
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                   State Management                              │
├─────────────────────────────────────────────────────────────────┤
│  searchQuery → useState
│  selectedTypes → useState
│  selectedCards → useState
│  selectedCard → useState
│  cardDetailModal → useState
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Data Processing                               │
├─────────────────────────────────────────────────────────────────┤
│  useMemo: searchCards() → filteredCards
│  useMemo: map with calculatePowerScore() → cardsWithScores
│  useMemo: calculatePowerScore() → power scores
│  useMemo: compareCards() → winner determination
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                   UI Rendering                                  │
├─────────────────────────────────────────────────────────────────┤
│  - SearchBar with current query
│  - FilterChips with selected types
│  - Selection bar (if cards selected)
│  - FlatList with CardCard components
│  - Modal with detailed card info
│  - ComparisonScreen with battle results
└─────────────────────────────────────────────────────────────────┘
```

## File Dependency Graph

```
App.tsx
  ├── SearchScreen.tsx
  │    ├── SearchBar.tsx
  │    │    └── (React Native components)
  │    │
  │    ├── FilterChips.tsx
  │    │    └── (React Native components)
  │    │
  │    ├── CardCard.tsx
  │    │    ├── types/index.ts
  │    │    └── (React Native components)
  │    │
  │    ├── EmptyState.tsx
  │    │    └── (React Native components)
  │    │
  │    ├── CardDetailView (inline)
  │    │    └── (React Native components)
  │    │
  │    ├── types/index.ts
  │    ├── utils/mockCardData.ts
  │    └── utils/powerScoreCalculator.ts
  │
  ├── ComparisonScreen.tsx
  │    ├── types/index.ts
  │    ├── utils/powerScoreCalculator.ts
  │    └── (React Native components)
  │
  └── (React Native core)

Legend:
─── Direct import
• • • Indirect dependency
```

## State Management Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ Component: SearchScreen                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  State Variables:                                               │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ const [searchQuery, setSearchQuery] = useState("")    │    │
│  │ const [selectedTypes, setSelectedTypes] = useState([])│    │
│  │ const [selectedCards, setSelectedCards] = useState([])│    │
│  │ const [cardDetailModal, setCardDetailModal] = useState│    │
│  │ const [selectedCard, setSelectedCard] = useState(null)│    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                 │
│  Derived State (useMemo):                                       │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ const filteredCards = useMemo(() => {                 │    │
│  │   return searchCards(query) filtered by types         │    │
│  │ }, [searchQuery, selectedTypes])                      │    │
│  │                                                        │    │
│  │ const cardsWithScores = useMemo(() => {               │    │
│  │   return filteredCards with power scores calculated   │    │
│  │ }, [filteredCards])                                   │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                 │
│  Event Handlers (useCallback):                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ handleClearSearch() → setSearchQuery("")              │    │
│  │ handleToggleType(type) → update selectedTypes         │    │
│  │ handleCardPress(card) → show modal                    │    │
│  │ handleComparePress(card) → toggle card selection     │    │
│  │ handleStartComparison() → navigate to comparison     │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Comparison Screen State

```
┌─────────────────────────────────────────────────────────────────┐
│ Component: ComparisonScreen                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Props Received:                                                │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ card1: PokemonCard                                    │    │
│  │ card2: PokemonCard                                    │    │
│  │ onBack: () => void (optional)                         │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                 │
│  Computed Values (useMemo):                                     │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ score1 = calculatePowerScore(card1, card2)            │    │
│  │ score2 = calculatePowerScore(card2, card1)            │    │
│  │ { winner, margin } = compareCards(card1, card2)      │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                 │
│  Rendering:                                                     │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ VS Header
│  │ Power Score Comparison
│  │ Winner Announcement (🏆)
│  │ Detailed Stats Breakdown
│  │ Power Score Analysis
│  │ Type Comparison
│  │ Weaknesses Comparison
│  │ Resistances Comparison
│  └────────────────────────────────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Algorithm Flow: Power Score Calculation

```
INPUT: PokemonCard, (optional) opponent: PokemonCard
│
├─ STEP 1: Calculate HP Contribution
│  └─ hpContribution = min((card.hp / 300) × 25, 25)
│
├─ STEP 2: Calculate Attack Contribution
│  ├─ totalAttackDamage = sum of all attack damages
│  ├─ averageAttackDamage = totalAttackDamage / attacks.length
│  └─ attackContribution = min((avgDamage / 200) × 35, 35)
│
├─ STEP 3: Calculate Weakness Contribution
│  ├─ weaknessCount = card.weaknesses.length
│  └─ weaknessContribution = max(15 - weaknessCount × 5, 0)
│
├─ STEP 4: Calculate Resistance Contribution
│  ├─ resistanceCount = card.resistances.length
│  └─ resistanceContribution = min(resistanceCount × 3, 15)
│
├─ STEP 5: Calculate Type Advantage
│  ├─ If opponent provided:
│  │  └─ typeAdvantage = TYPE_EFFECTIVENESS[card.type][opponent.type]
│  └─ Else:
│     └─ typeAdvantage = 1 (neutral)
│
├─ STEP 6: Combine Offensive Power
│  └─ offensivePower = attackContribution + (typeAdvantage × 10)
│
├─ STEP 7: Combine Defensive Power
│  └─ defensivePower = hpContribution + weaknessContribution + resistanceContribution
│
├─ STEP 8: Calculate Final Score
│  └─ totalPowerScore = min((offensivePower + defensivePower) / 2, 100)
│
└─ OUTPUT: PowerScore object with breakdown
```

## Search Algorithm Flow

```
INPUT: searchQuery (string), selectedTypes (string[])
│
├─ searchCards(query)
│  ├─ If query is empty → return all MOCK_CARDS
│  ├─ Else:
│  │  ├─ Convert query to lowercase
│  │  └─ Filter MOCK_CARDS where:
│  │     ├─ card.name.includes(lowerQuery) OR
│  │     ├─ card.types.some(type => type.includes(lowerQuery)) OR
│  │     └─ card.set?.includes(lowerQuery)
│  └─ Return filtered results
│
├─ If selectedTypes.length > 0 → filter by types
│  └─ Keep only cards where:
│     └─ card.types.some(type => selectedTypes.includes(type))
│
└─ OUTPUT: filteredCards (PokemonCard[])
```

## Component Interaction Sequence

```
SCENARIO: User compares two cards

1. User opens app
   └─ App.tsx renders
      └─ SearchScreen displays

2. User searches for "Charizard"
   └─ handleSearchChange()
      ├─ setSearchQuery("Charizard")
      └─ filteredCards recalculated (useMemo)

3. User taps first card "Compare" button
   └─ handleComparePress(charizard)
      ├─ selectedCards = [charizard]
      └─ Selection bar appears

4. User searches for "Blastoise"
   └─ handleSearchChange()
      ├─ setSearchQuery("Blastoise")
      └─ Results update

5. User taps second card "Compare" button
   └─ handleComparePress(blastoise)
      ├─ selectedCards = [charizard, blastoise]
      └─ "Compare Now" button enabled

6. User taps "Compare Now"
   └─ onComparePress(selectedCards)
      └─ Navigate to ComparisonScreen

7. ComparisonScreen receives props
   ├─ score1 = calculatePowerScore(charizard, blastoise)
   ├─ score2 = calculatePowerScore(blastoise, charizard)
   ├─ winner = compareCards(charizard, blastoise)
   └─ Display results

8. User reviews comparison
   └─ Can scroll to see all stats
      ├─ Power scores
      ├─ HP comparison
      ├─ Attack comparison
      ├─ Weakness/Resistance analysis
      └─ Type advantages

9. User taps back
   └─ Navigate back to SearchScreen
```

## Type System Overview

```
PokemonCard
  ├── id: string
  ├── name: string
  ├── image: string
  ├── hp: number
  ├── types: string[] (1-2 types)
  ├── attacks: Attack[]
  │   ├── name: string
  │   ├── cost: string[]
  │   ├── damage: number
  │   └── description?: string
  ├── weaknesses: Weakness[]
  │   ├── type: string
  │   └── value: string
  ├── resistances: Resistance[]
  │   ├── type: string
  │   └── value: string
  ├── rarity?: string
  ├── set?: string
  └── setNumber?: string

PowerScore
  ├── total: number (0-100)
  ├── offensivePower: number
  ├── defensivePower: number
  ├── typeAdvantage: number
  └── breakdown
      ├── hpContribution: number
      ├── attackContribution: number
      ├── weaknessContribution: number
      └── resistanceContribution: number
```

## Color Theme System

```
TypeColors Map
├── fire: #FF6B6B
├── water: #4ECDC4
├── grass: #95E1D3
├── electric: #FFE66D
├── psychic: #FF6B9D
├── ice: #A8E6CF
├── dragon: #6C63FF
├── dark: #2F3E46
├── fairy: #FFB3E6
├── normal: #D9D9D9
├── flying: #B4E7FF
├── poison: #C77DFF
├── ground: #D4A373
├── rock: #CFCFCF
├── bug: #AAE66D
├── ghost: #D9B3FF
└── steel: #C0C0C0

Usage:
├── Card header background
├── Type tag background
├── Power score color
├── Winner highlight
└── Filter chip selected state
```

---

This architecture ensures:
✅ Clean separation of concerns
✅ Reusable components
✅ Efficient data flow
✅ Easy to extend
✅ Type-safe throughout
✅ Performance optimized with useMemo/useCallback
