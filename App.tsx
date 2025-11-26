/**
 * BattleDex - Pokémon Card Battle Comparison App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { cardScreenRoute } from './src/features/card/presentation/cardScreenRoute';
import { compareScreenRoute } from './src/features/compare/presensation/compareScreenRoute';
import { CardEntity } from './src/features/home/domaine/entities/CardEntity';
import { homeScreenRoute } from './src/features/home/presentation/homeScreenRoute';
import { ThemeProvider, useTheme } from './src/styles';

export type RootStackParamList = {
  Home: { isReloadData?: boolean };
  Compare: {
    firstCard: CardEntity;
    secondCard: CardEntity;
    isDataLocal?: boolean;
  };
  Card: { cardId: string; name: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const stackScreens = {
  ...homeScreenRoute,
  ...compareScreenRoute,
  ...cardScreenRoute,
};

function RootNavigator() {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerLargeTitle: false,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          fontSize: 28,
          fontWeight: '700',
          color: theme.colors.text,
        },
        headerLargeTitleStyle: {
          fontSize: 34,
          fontWeight: '700',
          color: theme.colors.text,
        },
        headerTintColor: theme.colors.text,
        headerBlurEffect: 'light',
      }}
    >
      {Object.entries(stackScreens).map(([name, config]) => (
        <Stack.Screen
          key={name}
          name={name as keyof RootStackParamList}
          component={config.screen}
          options={config.options as NativeStackNavigationOptions}
        />
      ))}
    </Stack.Navigator>
  );
}

function AppContent() {
  const isDarkMode = useColorScheme() === 'dark';
  const { theme } = useTheme();
  return (
    <SafeAreaProvider>
      <BottomSheetModalProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </SafeAreaProvider>
  );
}

function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
