# 🚀 BattleDex Quick Start Guide

## Installation & Setup (5 minutes)

### Prerequisites

- Node.js 20+ installed
- npm or yarn
- Xcode (for iOS) or Android Studio (for Android)

### Step 1: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 2: Install iOS Pods (iOS only)

```bash
cd ios
pod install
cd ..
```

### Step 3: Start Development Server

```bash
npm start
```

You should see:

```
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  React Native Dev Server
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
...
```

### Step 4: Run on Device/Simulator

**iOS:**

```bash
npm run ios
```

**Android:**

```bash
npm run android
```

---

## 🎮 Using the App

### Search for Cards

1. **Type in search box**

   - Search by name: "Charizard"
   - Filter by type: "water", "fire", etc.
   - Filter by set: "Base Set"

2. **Use type filters**

   - Tap type chips to filter (Fire, Water, Grass, etc.)
   - Multi-select supported

3. **View card details**
   - Tap any card to see full details
   - Modal shows attacks, weaknesses, resistances
   - View power score breakdown

### Compare Two Cards

1. **Select cards**

   - Tap "⚔️ Compare" on first card
   - Tap "⚔️ Compare" on second card
   - Selection bar shows "2/2 cards selected"

2. **Start comparison**

   - Tap "⚔️ Compare Now" button
   - Navigate to comparison screen

3. **View results**
   - See winner with victory margin
   - Detailed stat breakdown
   - Power score analysis
   - Type advantage display

---

## 📁 Important Files

| File                                | Purpose           |
| ----------------------------------- | ----------------- |
| `App.tsx`                           | App entry point   |
| `src/screens/SearchScreen.tsx`      | Main search UI    |
| `src/screens/ComparisonScreen.tsx`  | Battle comparison |
| `src/utils/powerScoreCalculator.ts` | Scoring algorithm |
| `src/utils/mockCardData.ts`         | Sample card data  |
| `src/types/index.ts`                | Type definitions  |

---

## 🔄 Common Tasks

### Add New Mock Card

Edit `src/utils/mockCardData.ts`:

```typescript
export const MOCK_CARDS: PokemonCard[] = [
  {
    id: '7',
    name: 'Mewtwo',
    image: '🔮',
    hp: 60,
    types: ['psychic'],
    attacks: [{ name: 'Psychic', cost: ['psychic', 'colorless'], damage: 20 }],
    weaknesses: [{ type: 'dark', value: '×2' }],
    resistances: [],
    rarity: 'Rare Holo',
    set: 'Base Set',
  },
  // ... more cards
];
```

### Modify Power Score

Edit `src/utils/powerScoreCalculator.ts`:

```typescript
// Change HP weight from 25 to 30
const hpContribution = Math.min((card.hp / 300) * 30, 30);
```

### Add New Type

Edit `TYPE_EFFECTIVENESS` and `POKEMON_TYPES`:

```typescript
const TYPE_EFFECTIVENESS: Record<string, Record<string, number>> = {
  // ... existing types
  stellar: { fire: 2, water: 0.5 }, // New type
};

export const POKEMON_TYPES = [
  // ... existing types
  'stellar', // Add to filter list
];
```

---

## 🎨 Customize Colors

Edit colors in `src/components/CardCard.tsx` and other files:

```typescript
const TYPE_COLORS: Record<string, string> = {
  fire: '#FF6B6B', // Change this
  water: '#4ECDC4', // Or this
  // ... more colors
};
```

---

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Run Linter

```bash
npm run lint
```

### Format Code

```bash
npm run format
```

---

## 📱 Build for Production

### iOS

```bash
# Build app
npm run build:ios

# or use Xcode
open ios/BattleDex.xcworkspace
# Select "BattleDex" target → Build → Archive
```

### Android

```bash
# Build APK
npm run build:android

# or use Android Studio
android studio
```

---

## 🐛 Troubleshooting

### "Module not found" error

```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
```

### "Pod not installed" error (iOS)

```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
npm run ios
```

### Metro bundler crashes

```bash
# Clear cache
npx react-native start --reset-cache
```

### App won't start

```bash
# Check logs
npm start
# Look for errors in terminal

# Try clearing app data
npm run ios -- --simulator="iPhone 15"
```

---

## 📚 Next Steps

1. **Replace Mock Data**

   - Integrate TCGdex API
   - Fetch real card data
   - Add pagination

2. **Add Navigation**

   - Install React Navigation
   - Create screen navigator
   - Add tabs/drawer

3. **Add Persistence**

   - Save favorites to AsyncStorage
   - Create deck builder
   - Store user preferences

4. **Deploy**
   - Submit to App Store
   - Submit to Google Play
   - Set up CI/CD

---

## 📖 Documentation

- **Features:** See `FEATURES.md`
- **Search Screen:** See `SEARCH_SCREEN_GUIDE.md`
- **API Reference:** See inline code comments

---

## 💡 Pro Tips

1. **Use React DevTools**

   ```bash
   npm install -g react-devtools
   react-devtools
   ```

2. **Enable Fast Refresh**

   - Just save file, app updates automatically!

3. **Use Console for Debugging**

   ```typescript
   console.log('Debug info:', variable);
   console.warn('Warning message');
   console.error('Error message');
   ```

4. **Performance Tips**
   - Use `React.memo()` for expensive components
   - Use `useMemo()` for heavy calculations
   - Use `useCallback()` for event handlers

---

## 🎓 Learning Resources

- [React Native Docs](https://reactnative.dev)
- [React Native Paper](https://reactnativepaper.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Pokémon TCG API](https://tcgdex.dev)

---

## ✨ Features at a Glance

| Feature          | Status | Location                |
| ---------------- | ------ | ----------------------- |
| Card Search      | ✅     | SearchScreen.tsx        |
| Type Filters     | ✅     | FilterChips.tsx         |
| Power Score      | ✅     | powerScoreCalculator.ts |
| Comparison       | ✅     | ComparisonScreen.tsx    |
| Card Details     | ✅     | SearchScreen modal      |
| Multi-select     | ✅     | SearchScreen.tsx        |
| Favorites        | 🔄     | Planned                 |
| Deck Builder     | 🔄     | Planned                 |
| Battle Simulator | 🔄     | Planned                 |

---

## 📞 Support

Need help? Check these resources:

1. **GitHub Issues** - Report bugs
2. **React Native Discord** - Community help
3. **Stack Overflow** - Search existing solutions
4. **Code Comments** - Check inline documentation

---

**Happy Battling! ⚡🎮**

For updates and news, follow the project and star ⭐ on GitHub!
