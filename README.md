# BattleDex

A mobile app that compares Pokémon cards and determines which one is stronger based on real battle statistics.

## Overview

BattleDex lets you select any two Pokémon cards and instantly see which one wins in a matchup. The app calculates a Power Score using HP, damage output, energy costs, type effectiveness, and weaknesses/resistances. Results are displayed side-by-side with a clear winner announcement.

## Tech Stack

- **Framework**: React Native 0.82
- **Language**: TypeScript
- **Navigation**: React Navigation (Native Stack)
- **Architecture**: MVVM with feature-specific hooks
- **Database**: @op-engineering/op-sqlite
- **Theming**: Custom theme provider with light/dark modes
- **API**: PCPowerScoreAPI with mapper layer
- **Testing**: Jest + @testing-library/react-native

---

## Getting Started

### Prerequisites

Complete the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment) before proceeding.

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. **iOS only**: Install CocoaPods dependencies

   ```bash
   # First time setup
   bundle install

   # Install pods (run after every native dependency update)
   bundle exec pod install
   ```

### Running the App

#### Android

```bash
npm run android        # Production environment
npm run dev:android    # Development environment
npm run mock:android   # Mock data environment
```

#### iOS

```bash
npm run ios           # Production environment
npm run dev:ios       # Development environment
npm run mock:ios      # Mock data environment
```

The Metro bundler starts automatically with these commands.

---

## Available Scripts

### Development

| Command              | Description                   |
| -------------------- | ----------------------------- |
| `npm start`          | Start Metro bundler           |
| `npm run dev:start`  | Start with `.env.dev` config  |
| `npm run mock:start` | Start with `.env.mock` config |

### Building & Running

| Command                   | Description                        |
| ------------------------- | ---------------------------------- |
| `npm run android`         | Launch Android app                 |
| `npm run ios`             | Launch iOS app                     |
| `npm run release:android` | Android debug build (release mode) |
| `npm run build:android`   | Android production bundle          |
| `npm run build:ios`       | iOS production build               |

### Android Emulator

| Command             | Description                   |
| ------------------- | ----------------------------- |
| `npm run emu:list`  | List available emulators      |
| `npm run emu:start` | Start Pixel_2_API_29 emulator |

### Code Quality

| Command            | Description               |
| ------------------ | ------------------------- |
| `npm run lint`     | Run ESLint checks         |
| `npm run lint:fix` | Auto-fix ESLint issues    |
| `npm run format`   | Format code with Prettier |
| `npm test`         | Run Jest test suite       |

---

## Project Structure

```
src/
├── common/
│   ├── components/        # Reusable UI components
│   ├── db/               # CompareLocalDatabase (op-sqlite)
│   ├── utils/            # Time formatting, async helpers
│   └── styles/           # Theme provider, colors, spacing, typography
│
├── features/
│   ├── card/
│   │   ├── data/         # Repositories, mappers
│   │   ├── domain/       # Entities, mocks
│   │   └── presentation/ # Screens, components, viewModels, DI
│   │
│   ├── compare/
│   │   ├── data/         # API and DB repositories
│   │   ├── domain/       # Entities, mocks
│   │   └── presentation/ # Screens, components, viewModels, DI
│   │
│   └── home/
│       ├── data/         # API/DB repositories, mappers
│       ├── domain/       # Entities, mocks, use cases
│       └── presentation/ # Screens, components, viewModels, DI
│
└── App.tsx               # Root component with providers
```

---

## Architecture

### Design Pattern: MVVM

Each feature follows the Model-View-ViewModel pattern with clear separation of concerns:

- **View**: React components in `presentation/` folders
- **ViewModel**: Custom hooks (`useHomeScreenViewModel`, `useCardScreenViewModel`, etc.)
- **Model**: Entities and repositories in `domain/` and `data/` folders

### Key Architectural Concepts

#### ViewModels

Feature-specific hooks manage:

- Data fetching and state management
- Loading and error states
- UI-ready data transformation

Examples: `useHomeScreenViewModel`, `useCardScreenViewModel`, `useCompareScreenViewModel`

#### Dependency Injection

Each feature route imports repositories through DI helpers (`homeScreenDI`, `cardScreenDI`, `compareScreenDI`). These helpers select API or mock implementations based on `DATA_SOURCE` environment variables.

#### Use Cases

Business logic lives in dedicated use case classes (e.g., `SearchCardNamesUseCase`) to keep logic consistent and reusable across features.

#### Repositories

**API Repositories:**

- Call `PCPowerScoreAPI` endpoints (`GET /v1/cards/:name`, `POST /v1/compare`)
- Transform DTOs using mapper classes (`SearchCardMapper`, `MatchResultMapper`)

**Database Repositories:**

- Use `CompareLocalDatabase` (op-sqlite) for local persistence
- Convert database rows via mappers (`StoredCardMapper`, `ComparePreviewMapper`)

#### Common Utilities

- `safeCall` / `safeCallWithFallback`: Standardized async error handling
- `formatTimeAgo`: Human-readable timestamps
- `ErrorMessage`: Consistent error display component

---

## Theming & Styling

### Theme System

- Light and dark themes defined in `src/common/styles/`
- `ThemeProvider` automatically selects theme based on system preferences
- Access theme via `useTheme()` hook

### Style Hooks

Components use feature-specific style hooks for theme-aware styling:

- `useSearchBarStyles`
- `useDuelCardStyles`
- Navigation headers adapt to theme automatically

### Design Tokens

- Colors: Primary, secondary, background, text variants
- Spacing: Consistent margins and padding scales
- Typography: Standardized font sizes and weights

---

## Configuration & Environment

### Environment Files

- `.env` - Production configuration
- `.env.dev` - Development configuration
- `.env.mock` - Mock data configuration

### Environment Variables

- `API_BASE_URL`: Backend API endpoint
- `DATA_SOURCE`: Selects real API vs. mock repositories

### API Integration

- `PCPowerScoreAPI` wraps HTTP communication
- Mapper classes transform API responses to domain entities
- Error handling via `safeCall` wrappers provides user-friendly messages

---

## Navigation

Three main routes powered by React Navigation Native Stack:

1. **Home** - Card search and comparison history
2. **Card** - Detailed card information
3. **Compare** - Side-by-side comparison results

### Navigation Features

- Large title behavior on Home screen
- Safe area handling for iOS notches
- Theme-aware header styling
- Smooth transitions between screens

---

## Database

### CompareLocalDatabase

Uses `@op-engineering/op-sqlite` for local persistence:

- Stores comparison history
- Serializes card entities as JSON
- Provides fast retrieval for recent matches

### Database Operations

- `DBSaveCardRepositoryImpl`: Serializes and saves card comparisons
- `ComparePreviewMapper`: Converts database rows to preview entities
- Efficient querying for history lists

---

## Testing

### Test Stack

- **Jest**: Test runner
- **@testing-library/react-native**: Component testing utilities

### Mocking

Native modules are mocked in `__mocks__/`:

- `react-native-config`
- `@op-engineering/op-sqlite`

### Test Coverage

Current tests cover:

- `useHomeScreenViewModel` logic
- Repository mock interactions via `safeCall`

**Extend testing** by adding suites for:

- Compare and card viewModels
- Mapper classes
- API error scenarios

---

## Resources

### React Native

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting)

### Libraries

- [op-sqlite Documentation](https://github.com/OP-Engineering/op-sqlite)
- [React Native Config](https://github.com/luggit/react-native-config)

---

## 🧑‍💻 Author

**k.angama**  
[GitHub](https://github.com/k-angama) • [LinkedIn](https://www.linkedin.com/in/karim-angama)
