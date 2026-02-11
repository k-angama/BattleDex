# Copilot Instructions for BattleDex

## How to Request Help from Copilot

When you ask Copilot for advice or implementation approach:

1. **For design/architecture questions**: Copilot will provide **multiple options/approaches** before writing code
2. **Each option will include**:

- Pros and cons
- When to use it
- Estimated effort

3. **You can then**:

- Choose your preferred approach
- Ask for clarifications
- Request modifications

4. **Only after you confirm**: Copilot will proceed with the code implementation

This ensures better alignment between your vision and the implementation.

## Critical Architecture Rule: Screen Organization

When creating features in this React Native project, follow this pattern:

### Multiple Screens (2+) in a Feature

✅ **Create a separate subdirectory for EACH screen** under `presentation/`

```
src/features/{featureName}/
├── domaine/
├── data/
└── presentation/
    ├── {screenName1}/                    ← Screen 1 directory
    │   ├── {ScreenName1}Screen.tsx
    │   ├── {screenName1}ScreenDI.ts
    │   ├── {screenName1}ScreenRoute.ts
    │   ├── use{ScreenName1}ScreenViewModel.tsx
    │   ├── styles/
    │   │   └── {screenName1}Screen.styles.ts
    │   └── components/
    │       └── styles/
    │
    └── {screenName2}/                    ← Screen 2 directory
        ├── {ScreenName2}Screen.tsx
        ├── {screenName2}ScreenDI.ts
        ├── {screenName2}ScreenRoute.ts
        ├── use{ScreenName2}ScreenViewModel.tsx
        └── styles/
            └── {screenName2}Screen.styles.ts
```

**Example**: `collection` feature has 2 screens:

- `presentation/collection/` - Main collections list
- `presentation/collectionGroup/` - Individual group details

### Single Screen in a Feature

✅ **NO subdirectory** - Keep files flat in `presentation/`

```
src/features/{featureName}/
├── domaine/
├── data/
└── presentation/                         ← NO subdirectory!
    ├── {ScreenName}Screen.tsx
    ├── {screenName}ScreenDI.ts
    ├── {screenName}ScreenRoute.ts
    ├── use{ScreenName}ScreenViewModel.tsx
    ├── styles/
    │   └── {screenName}Screen.styles.ts
    └── components/
        └── styles/
```

**Example**: `card` feature has 1 screen:

- `presentation/CardScreen.tsx` (directly in presentation/)
- `presentation/cardScreenDI.ts`
- `presentation/useCardScreenViewModel.tsx`

## Clean Architecture Layers

```
src/features/{featureName}/
├── domaine/          # Entities & repository interfaces
│   ├── entities/
│   │   └── {EntityName}.ts       ← Business entities
│   └── {RepositoryName}.ts       ← Repository interfaces
├── data/             # Repository implementations
│   └── {RepositoryName}Impl.ts
└── presentation/     # UI components & screens
    └── {screenName}/
        ├── {ScreenName}Screen.tsx
        ├── components/
        └── styles/
```

### Domain Layer (domaine/)

- **entities/**: Define TypeScript interfaces for business entities
  ```typescript
  // domaine/entities/CollectionGroupEntity.ts
  export interface CollectionGroupEntity {
    id: string;
    name: string;
    cardCount: number;
    color: string;
  }
  ```
- **Repository Interfaces**: Define contracts for data access
  ```typescript
  // domaine/SavedCardsRepository.ts
  export interface SavedCardsRepository {
    getSavedCards(): CardEntity[];
    addCard(card: CardEntity): void;
  }
  ```

## Required Files per Screen

Every screen needs:

1. `{ScreenName}Screen.tsx` - Main component (default export, use `observer()` if reactive)
2. `use{ScreenName}ScreenViewModel.tsx` - Business logic hook
3. `{screenName}ScreenDI.ts` - Dependency injection
4. `{screenName}ScreenRoute.ts` - Route configuration
5. `styles/{screenName}Screen.styles.ts` - Memoized styles

## Naming Conventions

| Type              | Pattern                  | Example                            |
| ----------------- | ------------------------ | ---------------------------------- |
| Directories       | camelCase                | `collection`, `collectionGroup`    |
| Screen Components | PascalCase + `Screen`    | `CollectionScreen.tsx`             |
| ViewModels        | `use` + PascalCase       | `useCollectionScreenViewModel.tsx` |
| Styles            | camelCase + `.styles.ts` | `collectionScreen.styles.ts`       |
| DI Files          | camelCase + `DI.ts`      | `collectionScreenDI.ts`            |
| Routes            | camelCase + `Route.ts`   | `collectionScreenRoute.ts`         |

## Navigation Route Parameters

When navigating between screens that pass parameters, **always define the route type** in NavigationScreen.tsx:

### Step 1: Define Route Params Type

In `src/features/navigation/presentation/NavigationScreen.tsx`, create a param list type for your stack:

```typescript
// Example: Collection feature with multiple screens
export type CollectionGroupStackParamList = {
  CollectionGroup: undefined; // No params needed
  Collection: {
    collectionGroupId: string; // Required param
    collectionName: string; // Required param
  };
};
```

### Step 2: Pass Params When Navigating

In your screen component, pass the typed parameters:

```typescript
const handlePressCard = useCallback(
  (item: CollectionGroupEntity) => {
    navigation.navigate('Collection', {
      collectionGroupId: item.id,
      collectionName: item.name,
    });
  },
  [navigation],
);
```

### Step 3: Extract Params in Destination Screen

In the destination screen, use `useRoute()` to access params:

```typescript
import { useRoute } from '@react-navigation/native';

const CollectionScreen = observer(() => {
  const route = useRoute();
  const collectionName = (route.params as any)?.collectionName || 'Default';

  // Use collectionName for screen title, etc.
  return <View>{/* UI */}</View>;
});
```

### Benefits

- ✅ **Type Safety** - TypeScript catches mismatched params at compile time
- ✅ **Self-Documenting** - Clear what params each route accepts
- ✅ **Auto-Completion** - VS Code autocompletes available params when navigating
- ✅ **Easy Refactoring** - Changing a param ripples through all usages

## Common Patterns

### Screen Component

```typescript
import { observer } from 'mobx-react-lite';

const ScreenName = observer(() => {
  const { styles } = useStyles();
  const { data } = useScreenNameViewModel();

  return <SafeAreaView style={styles.container}>{/* UI */}</SafeAreaView>;
});

export default ScreenName;
```

### ViewModel Hook

```typescript
export function useScreenNameViewModel({
  repository = repositoryInstance,
}: ViewModelParams = {}) {
  const data = useMemo(() => repository.getData(), [repository]);
  return { data };
}
```

### Styles Hook (Always memoized with theme)

```typescript
export const useStyles = () => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: theme.colors.background, // Use theme
          padding: theme.spacing.lg, // Use theme
        },
      }),
    [theme],
  );

  return { styles };
};
```

### List Item Components

When creating items for a list, FlatList, or grid:

✅ **Create reusable components** in `components/` directory
✅ **Keep component styles** in `components/styles/` subdirectory

```
presentation/{screenName}/
├── {ScreenName}Screen.tsx
├── components/
│   ├── {ItemName}Item.tsx              ← List/grid item component
│   ├── {ComponentName}.tsx             ← Other components
│   └── styles/
│       ├── {itemName}Item.styles.ts    ← Item component styles
│       └── {componentName}.styles.ts   ← Other component styles
└── styles/
    └── {screenName}Screen.styles.ts
```

**Example**: CollectionGroup screen with cards

```
presentation/collectionGroup/
├── CollectionGroupScreen.tsx
├── components/
│   ├── CollectionGroupCard.tsx         ← Card item component (exported or inline)
│   └── styles/
│       └── collectionGroupCard.styles.ts
└── styles/
    └── collectionGroupScreen.styles.ts
```

```typescript
// CollectionGroupCard.tsx (named export with entity import)
import type { CollectionGroupEntity } from '../../../domaine/entities/CollectionGroupEntity';

export interface CollectionGroupCardProps {
  item: CollectionGroupEntity;
}

export function CollectionGroupCard({ item }: CollectionGroupCardProps) {
  const { styles } = useStyles();

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>{/* Card content */}</View>
    </View>
  );
}
```

```typescript
// collectionGroupCard.styles.ts
export const useStyles = () => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        cardContainer: {
          /* styles */
        },
        cardHeader: {
          /* styles */
        },
        // ... other styles
      }),
    [theme],
  );

  return { styles };
};
```

## Mock-First Repository Pattern

When creating features with data access, follow this **mock-first** pattern before implementing real database operations:

### Step 1: Create Repository Interface

Define the contract in `domaine/repositories/`:

```typescript
// domaine/repositories/{EntityName}Repository.ts
export interface EntityNameRepository {
  getEntities(): Promise<Entity[]>;
  addEntity(entity: Entity): Promise<void>;
  removeEntity(id: string): Promise<void>;
  // Add methods as needed for your feature
}
```

### Step 1.5: Create Mock Data File

Create hardcoded mock data in `common/mocks/`:

```typescript
// common/mocks/{entityName}.mock.ts
import type { {EntityName}Entity } from '../../features/{featureName}/domaine/entities/{EntityName}Entity';

export const {entityName}MockData: {EntityName}Entity[] = [
  { id: '1', name: 'Item 1', /* other fields */ },
  { id: '2', name: 'Item 2', /* other fields */ },
  // Add more mock items as needed
];
```

**Pattern**:

- ✅ Export as `{entityName}MockData` (camelCase with "MockData" suffix)
- ✅ Type with the entity interface from `domaine/entities/`
- ✅ Include realistic sample data (minimum 3-6 items)
- ✅ Use field names exactly as defined in the entity interface
- ✅ File naming: `{entityName}.mock.ts` (exact match for import in RepositoryMock)

**Example** (Collection Groups):

```typescript
// common/mocks/collectionGroup.mock.ts
import type { CollectionGroupEntity } from '../../features/collection/domaine/entities/CollectionGroupEntity';

export const collectionGroupMockData: CollectionGroupEntity[] = [
  { id: '1', name: 'Favorites', cardCount: 24, color: '#FF6B6B' },
  { id: '2', name: 'Rare Cards', cardCount: 12, color: '#4ECDC4' },
  { id: '3', name: 'For Trading', cardCount: 8, color: '#45B7D1' },
];
```

**Why separate from RepositoryMock**:

- ✅ Data is reusable if multiple repository mocks need same data
- ✅ Easy to update mock data without touching repository logic
- ✅ Clear separation: data in `common/mocks/`, behavior in `domaine/mocks/`

### Step 2: Create Mock Implementation

Implement the interface with mock data in `domaine/mocks/`:

```typescript
// domaine/mocks/{EntityName}RepositoryMock.ts
import { EntityNameRepository } from '../repositories/{EntityName}Repository';
import { mockData } from '../../../common/mocks/{entityName}.mock';

export class EntityNameRepositoryMock implements EntityNameRepository {
  private entities = [...mockData];

  async getEntities(): Promise<Entity[]> {
    // Simulate async delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.entities];
  }

  async addEntity(entity: Entity): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    this.entities.push(entity);
  }

  async removeEntity(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    this.entities = this.entities.filter(e => e.id !== id);
  }
}
```

### Step 3: Create Real Implementation Stub

Create placeholder in `data/` (to be implemented later with op-sqlite):

```typescript
// data/{EntityName}RepositoryImpl.ts
import { EntityNameRepository } from '../domaine/repositories/{EntityName}Repository';

export class EntityNameRepositoryImpl implements EntityNameRepository {
  async getEntities(): Promise<Entity[]> {
    throw new Error('Method not implemented.');
  }

  async addEntity(_entity: Entity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async removeEntity(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
```

### Step 4: Initialize in DI File

Set up dependency injection in `presentation/{screenName}/{screenName}ScreenDI.ts` with **conditional mock/real instantiation** using `isMockDataSource()`:

```typescript
// presentation/{screenName}/{screenName}ScreenDI.ts
import { isMockDataSource } from '../../../../common/utils/environment';
import { EntityNameRepositoryImpl } from '../../data/{EntityName}RepositoryImpl';
import { EntityNameRepositoryMock } from '../../domaine/mocks/{EntityName}RepositoryMock';

const useMocks = isMockDataSource();

const createRepository = () =>
  useMocks ? new EntityNameRepositoryMock() : new EntityNameRepositoryImpl();

export const entityNameRepository = createRepository();
```

**Note**: The `isMockDataSource()` function checks your environment configuration to determine whether to use mocks or real implementations. This allows you to test with mocks in development and switch to real implementations in production without code changes.

### Step 5: Use in ViewModel

Inject the repository into your ViewModel hook following the homeScreenViewModel pattern:

```typescript
// presentation/{screenName}/use{ScreenName}ScreenViewModel.tsx
import { entityNameRepository } from './{screenName}ScreenDI';

export function use{ScreenName}ScreenViewModel({
  repository = entityNameRepository,
}: ViewModelParams = {}) {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getEntities = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    await safeCall(
      () => repository.getEntities(),
      setEntities,
      setErrorMessage,
      { operation: 'Fetch Entities', fallbackMessage: 'Failed to load entities' }
    );
    setIsLoading(false);
  }, [repository]);

  const addEntity = useCallback(async (entity: Entity) => {
    setErrorMessage(null);
    await safeCall(
      () => repository.addEntity(entity),
      null,
      setErrorMessage,
      { operation: 'Add Entity', fallbackMessage: 'Failed to add entity' }
    );
    if (!errorMessage) await getEntities();
  }, [repository, getEntities, errorMessage]);

  useEffect(() => {
    getEntities();
  }, [getEntities]);

  return { entities, getEntities, addEntity, isLoading, errorMessage };
}
```

### Benefits of This Pattern

- ✅ **Immediate testing** - Mock works right away while real implementation is stubbed
- ✅ **Swappable** - Change DI file to swap from mock to real without changing screens
- ✅ **Incremental development** - Complete UI first, implement persistence later
- ✅ **Clear separation** - Mock data, interface, and implementation are isolated

## Persistent State Management with MobX Stores

For screens that need to maintain state across navigation, create a MobX store in `src/common/services/`:

### Store Structure

```typescript
// src/common/services/{Feature}Store.ts
import { action, makeAutoObservable, observable } from 'mobx';
import { EntityType } from '../../features/{feature}/domaine/entities/{EntityType}';

export class {Feature}Store {
  items: EntityType[] = [];

  constructor() {
    makeAutoObservable(this, {
      items: observable,
      setItems: action,
      addItem: action,
      removeItem: action,
      removeAllItems: action,
    });
  }

  setItems(items: EntityType[]) {
    this.items = [...items];
  }

  addItem(item: EntityType) {
    this.items = [item, ...this.items];
  }

  removeItem(id: string) {
    this.items = this.items.filter(item => item.id !== id);
  }

  removeAllItems() {
    this.items = [];
  }
}

export const {featureStore} = new {Feature}Store();
```

### Use Store in Screen

```typescript
// In your screen component
import { observer } from 'mobx-react-lite';
import { {featureStore}, {Feature}Store } from '../../../../common/services/{Feature}Store';

interface {Feature}ScreenParams {
  store?: {Feature}Store;
}

const {Feature}Screen = observer(
  ({ store = {featureStore} }: {Feature}ScreenParams = {}) => {
    // Get data from ViewModel (repository)
    const { items, isLoading, errorMessage } = useViewModel();

    // Sync ViewModel data to store for persistence
    useEffect(() => {
      store.setItems(items);
    }, [items, store]);

    // Use store data in FlatList
    return (
      <FlatList
        data={store.items}
        renderItem={({ item }) => <ItemComponent item={item} />}
        keyExtractor={item => item.id}
      />
    );
  },
);

export default {Feature}Screen;
```

### Benefits of Stores

- ✅ **Persistent state** - Data survives navigation (user sees their list when returning)
- ✅ **Reactive UI** - MobX reactivity keeps UI in sync with store changes
- ✅ **Testable** - Easy to mock stores in tests
- ✅ **Separation** - ViewModel handles data fetching, Store handles UI state

## Data Mapper Pattern

When implementing repositories that use the database layer, create mappers to convert database DTOs to domain entities:

### Mapper Structure

Mappers live in `data/mappers/` and follow this pattern:

```typescript
// data/mappers/{EntityName}Mapper.ts
import { {EntityName}RowRaw } from '../../../common/db/dto/{EntityName}RowRaw';
import type { {EntityName}Entity } from '../../domaine/entities/{EntityName}Entity';

export class {EntityName}Mapper {
  // Convert database DTO → Domain entity
  static toEntity(row: {EntityName}RowRaw): {EntityName}Entity {
    return {
      id: row.id,
      name: row.name,
      // Map all fields, rename if needed (e.g., card_count → cardCount)
      cardCount: row.card_count,
    };
  }

  // Extract only persistence fields from entity
  static toPersistence(entity: {EntityName}Entity): {
    name: string;
    color: string;
  } {
    return {
      name: entity.name,
      color: entity.color,
      // Only return fields that need to be saved
    };
  }
}
```

### Usage in Repository Implementation

```typescript
// data/{EntityName}RepositoryImpl.ts
import { {databaseClass} } from '../../../common/db/{DatabaseClass}';
import type { {EntityName}Entity } from '../../domaine/entities/{EntityName}Entity';
import { {EntityName}Repository } from '../../domaine/repositories/{EntityName}Repository';
import { {EntityName}Mapper } from './mappers/{EntityName}Mapper';

export class {EntityName}RepositoryImpl implements {EntityName}Repository {
  async get{EntityNames}(): Promise<{EntityName}Entity[]> {
    const rows = await {databaseClass}.get{EntityNames}();
    return rows.map(row => {EntityName}Mapper.toEntity(row));
  }

  async add{EntityName}(entity: {EntityName}Entity): Promise<void> {
    const data = {EntityName}Mapper.toPersistence(entity);
    await {databaseClass}.save{EntityName}(data.name, data.color);
  }

  async update{EntityName}(entity: {EntityName}Entity): Promise<void> {
    const data = {EntityName}Mapper.toPersistence(entity);
    await {databaseClass}.update{EntityName}(entity.id, data.name, data.color);
  }

  async remove{EntityName}(id: string): Promise<void> {
    await {databaseClass}.delete{EntityName}(id);
  }
}
```

### Benefits of Mappers

- ✅ **Separation of Concerns** - Database layer (DTOs) separate from business logic (Entities)
- ✅ **Type Safety** - Explicit conversion prevents accidental data loss
- ✅ **Flexibility** - Rename fields (e.g., `card_count` → `cardCount`) without changing domain
- ✅ **Reusability** - One mapper for multiple query results
- ✅ **Testable** - Easy to unit test mapping logic

## Cross-Feature Communication Pattern

**CRITICAL RULE**: Features should NEVER directly import repositories, entities, or services from other features. This violates feature independence and creates tight coupling.

### ❌ Wrong Pattern (Direct Feature Dependency)

```typescript
// ❌ BAD: Card feature importing from Collection feature
import { CollectionCardRepository } from '../../collection/domaine/repositories/CollectionCardRepository';
import { CollectionCardEntity } from '../../collection/domaine/entities/CollectionCardEntity';
```

**Problems:**
- Card feature depends on Collection feature
- Violates feature independence
- Hard to test in isolation
- Changes in Collection feature break Card feature

### ✅ Correct Pattern (Feature-Specific Repository)

When a feature needs to interact with another feature's data, create a **feature-specific repository** that defines only what that feature needs.

**Example**: Card feature needs to add cards to collections

#### Step 1: Create Feature-Specific Entity

```typescript
// card/domain/entities/SavedCardEntity.ts
export interface SavedCardEntity {
  id: string;
  title: string;
  staticScore: string;
  imageUrl: string;
}
```

#### Step 2: Create Feature-Specific Repository Interface

```typescript
// card/domain/repositories/AddToCollectionRepository.ts
import type { SavedCardEntity } from '../entities/SavedCardEntity';

export interface AddToCollectionRepository {
  addCard(cardEntity: SavedCardEntity, collectionId: string): Promise<void>;
  isCardInCollection(cardId: string, collectionId: string): Promise<boolean>;
}
```

**Key Point**: Only include methods needed by this feature. Don't expose the entire CollectionCardRepository interface.

#### Step 3: Implement Using Shared Infrastructure

Both features communicate through the **shared database layer** (`common/db/`), not through each other.

```typescript
// card/data/AddToCollectionRepositoryImpl.ts
import { collectionsLocalDatabase } from '../../../common/db/CollectionsLocalDatabase';
import type { SavedCardEntity } from '../domain/entities/SavedCardEntity';
import type { AddToCollectionRepository } from '../domain/repositories/AddToCollectionRepository';

export class AddToCollectionRepositoryImpl implements AddToCollectionRepository {
  async addCard(cardEntity: SavedCardEntity, collectionId: string): Promise<void> {
    const cardJson = JSON.stringify(cardEntity);
    await collectionsLocalDatabase.addCard(collectionId, cardJson);
  }

  async isCardInCollection(cardId: string, collectionId: string): Promise<boolean> {
    return await collectionsLocalDatabase.isCardInCollection(cardId, collectionId);
  }
}
```

#### Step 4: Create Mock Implementation

```typescript
// card/domain/mocks/AddToCollectionRepositoryMock.ts
import type { SavedCardEntity } from '../entities/SavedCardEntity';
import type { AddToCollectionRepository } from '../repositories/AddToCollectionRepository';

const mockAddedCards: Map<string, Set<string>> = new Map();

export class AddToCollectionRepositoryMock implements AddToCollectionRepository {
  async addCard(cardEntity: SavedCardEntity, collectionId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!mockAddedCards.has(collectionId)) {
      mockAddedCards.set(collectionId, new Set());
    }
    
    mockAddedCards.get(collectionId)?.add(cardEntity.id);
  }

  async isCardInCollection(cardId: string, collectionId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAddedCards.get(collectionId)?.has(cardId) ?? false;
  }
}
```

#### Step 5: Register in DI

```typescript
// card/presentation/cardScreenDI.ts
import { isMockDataSource } from '../../../common/utils/environment';
import { AddToCollectionRepositoryImpl } from '../data/AddToCollectionRepositoryImpl';
import { AddToCollectionRepositoryMock } from '../domain/mocks/AddToCollectionRepositoryMock';

const useMocks = isMockDataSource();

const createAddToCollectionRepository = () =>
  useMocks
    ? new AddToCollectionRepositoryMock()
    : new AddToCollectionRepositoryImpl();

export const addToCollectionRepository = createAddToCollectionRepository();
```

#### Step 6: Use in ViewModel

```typescript
// card/presentation/useCardScreenViewModel.tsx
import type { AddToCollectionRepository } from '../domain/repositories/AddToCollectionRepository';
import { addToCollectionRepository } from './cardScreenDI';

interface CardScreenViewModelParams {
  addToCollectionRepository?: AddToCollectionRepository;
}

export function useCardScreenViewModel({
  addToCollectionRepository: repo = addToCollectionRepository,
}: CardScreenViewModelParams = {}) {
  const addCardToCollection = useCallback(async (card: CardEntity, collectionId: string) => {
    const savedCard: SavedCardEntity = {
      id: card.id,
      title: card.name,
      staticScore: card.hp || 'N/A',
      imageUrl: card.imageUrl ?? '',
    };
    
    await repo.addCard(savedCard, collectionId);
  }, [repo]);

  return { addCardToCollection };
}
```

### Benefits of This Pattern

- ✅ **Feature Independence** - Features remain self-contained and testable in isolation
- ✅ **Simplified Interface** - Each feature only exposes methods it needs
- ✅ **Shared Infrastructure** - Features communicate through database, not each other
- ✅ **Clear Boundaries** - Repository defines explicit contract between features
- ✅ **Easy Testing** - Mock feature-specific repository without complex dependencies
- ✅ **Loose Coupling** - Changes in one feature don't break others

### When to Use This Pattern

Use this pattern when:
- Feature A needs to write/modify data managed by Feature B
- Feature A needs specific read operations from Feature B's domain
- Multiple features need to interact with the same data

### Architecture Diagram

```
Feature A (Card)           Feature B (Collection)
     │                            │
     ├─ AddToCollectionRepo       ├─ CollectionCardRepo
     │  (minimal interface)       │  (full CRUD)
     │                            │
     └────────┬───────────────────┘
              │
              ▼
         Common Infrastructure
       (CollectionsLocalDatabase)
```

### Key Takeaway

**Never import across features.** Instead, create a feature-specific repository that delegates to shared infrastructure. This maintains Clean Architecture principles and keeps features decoupled.

## Loading States with Skeleton Placeholders

For screens that fetch data, always handle three states in this order: **error → loading → empty → data**.

### Pattern for Screen Conditional Rendering

```tsx
return (
  <SafeAreaView style={styles.container} edges={['top']}>
    {errorMessage ? (
      <ErrorMessage message={errorMessage} onRetry={() => getCards(id)} />
    ) : isLoading ? (
      <{ItemName}Skeleton />
    ) : data.length === 0 ? (
      <View style={styles.emptyStateContainer}>
        <EmptyState message="No items found" emoji="📂" />
      </View>
    ) : (
      <FlatList
        data={data}
        renderItem={({ item }) => <{Item} item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        numColumns={numColumns}
      />
    )}
  </SafeAreaView>
);
```

### Create Skeleton Component

For each screen with a list, create a `{ItemName}Skeleton.tsx` component:

```
presentation/{screenName}/
├── components/
│   ├── {Item}.tsx
│   ├── {ItemName}Skeleton.tsx               ← Skeleton component
│   └── styles/
│       ├── {item}.styles.ts
│       └── {itemNameSkeleton}.styles.ts     ← Skeleton styles
```

**Implementation:**

```typescript
// components/{ItemName}Skeleton.tsx
import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useTheme } from '../../../../../common/styles';
import { useStyles } from './styles/{itemNameSkeleton}.styles';

interface {ItemName}SkeletonProps {
  count?: number;
}

export function {ItemName}Skeleton({
  count = 6,
}: {ItemName}SkeletonProps) {
  const { theme } = useTheme();
  const { styles } = useStyles();

  return (
    <SkeletonPlaceholder borderRadius={theme.radius.md}>
      <View style={styles.container}>
        {Array.from({ length: count }).map((_, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.imagePlaceholder} />
            <View style={styles.contentPlaceholder}>
              <View style={styles.titleLine} />
              <View style={styles.subtitleLine} />
            </View>
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
}
```

**Skeleton Styles:**

```typescript
// components/styles/{itemNameSkeleton}.styles.ts
export const useStyles = () => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.lg,
          gap: theme.spacing.md,
          flexDirection: 'row',
          flexWrap: 'wrap',
        },
        card: {
          width: '48%', // For 2-column grid; adjust as needed
          borderRadius: theme.radius.md,
          overflow: 'hidden',
        },
        imagePlaceholder: {
          width: '100%',
          height: 150, // Adjust based on your design
          backgroundColor: theme.colors.background,
        },
        contentPlaceholder: {
          padding: theme.spacing.md,
          gap: theme.spacing.sm,
        },
        titleLine: {
          width: '80%',
          height: 16,
          backgroundColor: theme.colors.background,
          borderRadius: theme.radius.sm,
        },
        subtitleLine: {
          width: '50%',
          height: 12,
          backgroundColor: theme.colors.background,
          borderRadius: theme.radius.sm,
        },
      }),
    [theme],
  );

  return { styles };
};
```

### Benefits

- ✅ **Better UX** - Skeleton shows content structure while loading
- ✅ **Consistent Pattern** - All screens follow same order: error → loading → empty → data
- ✅ **Reusable Components** - Skeleton follows same styling patterns as items
- ✅ **Theme Integration** - Uses theme values for sizing and colors

## Key Rules

1. **Always use theme values** for colors, spacing, typography
2. **Memoize styles** with `useMemo` depending on `[theme]`
3. **Use `observer()`** for components that need MobX reactivity
4. **Default export** for screen components, **named exports** for others
5. **Repository instances** in DI files, injected into ViewModels
6. **Type imports**: Use `import type` when only importing types
7. **Entities** live in `domaine/entities/` - NOT in components or presentation
   - Import entities as type imports: `import type { Entity } from '../../domaine/entities/Entity'`
   - Define props interfaces in components, but use entities from domaine
8. **Database DTOs in `common/db/dto/`** - Create separate files for database row types
   - Create one file per DTO: `{EntityName}RowRaw.ts`
   - Example: `CollectionRowRaw.ts`, `CollectionCardRowRaw.ts`
   - Export interface only: `export interface {EntityName}RowRaw { ... }`
   - Import in database class: `import { CollectionRowRaw } from './dto/CollectionRowRaw'`
   - Keep DTOs separate from entities - entities are business logic, DTOs are database layer
9. **Component styles must be in separate files** - Never use inline StyleSheet.create
   - Create styles in `components/styles/{componentName}.styles.ts`
   - Use hook pattern: `export const use{ComponentName}Styles = () => { ... }`
   - Always memoize with `useMemo` depending on `[theme]`
   - Import and use in component: `const styles = use{ComponentName}Styles()`
10. **Always respect ESLint rules** - Code must pass linting without errors

- Follow configured ESLint rules for TypeScript and React Native
- Fix all ESLint warnings and errors before completing work
- Run linter to validate code quality

## When Asked to Create a Feature Structure

1. Ask: "How many screens?" (or infer from context)
2. If 2+ screens → Create subdirectory for each
3. If 1 screen → Keep flat in presentation/
4. Create all required files following naming conventions
5. Follow Clean Architecture layers (domaine → data → presentation)
