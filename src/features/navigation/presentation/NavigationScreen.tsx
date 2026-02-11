/**
 * BattleDex - Pokemon Card Battle Comparison App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Theme, useTheme } from '../../../common/styles';
import { cardScreenRoute } from '../../card/presentation/cardScreenRoute';
import { collectionScreenRoute } from '../../collection/presentation/collection/collectionScreenRoute';
import { collectionGroupScreenRoute } from '../../collection/presentation/collectionGroup/collectionGroupScreenRoute';
import { compareScreenRoute } from '../../compare/presensation/compareScreenRoute';
import { CardEntity } from '../../home/domaine/entities/CardEntity';
import { homeScreenRoute } from '../../home/presentation/homeScreenRoute';
import { settingsScreenRoute } from '../../settings/presentation/settingsScreenRoute';
import { useNavigationScreenViewModel } from './useNavigationScreenViewModel';

export type HomeStackParamList = {
  Home: undefined;
  Compare: {
    firstCard: CardEntity;
    secondCard: CardEntity;
    isDataLocal?: boolean;
  };
  Card: { cardId: string; name: string };
};

export type RootStackParamList = {
  Root: undefined;
  Card: { cardId: string; name: string };
  Compare: {
    firstCard: CardEntity;
    secondCard: CardEntity;
    isDataLocal?: boolean;
  };
};

export type CollectionGroupStackParamList = {
  CollectionGroup: undefined;
  Collection: { collectionGroupId: string; collectionName: string };
};

const stackHomeScreens = {
  ...homeScreenRoute,
};

const stackCollectionGroupScreens = {
  ...collectionGroupScreenRoute,
  ...collectionScreenRoute,
};

const stackSettingsScreens = {
  ...settingsScreenRoute,
};

const stackCardScreens = {
  ...compareScreenRoute,
  ...cardScreenRoute,
};

const screenOptions = (theme: Theme): NativeStackNavigationOptions => {
  return {
    headerLargeTitle: false,
    gestureEnabled: false,
    headerTransparent: true,
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
    headerTitleStyle: {
      fontFamily: theme.typography.family.semibold,
    },
    headerLargeTitleStyle: {
      fontFamily: theme.typography.family.semibold,
    },
    headerTintColor: theme.colors.text,
    headerBackButtonMenuEnabled: true,
  };
};

function SettingsStackNavigator() {
  const { theme } = useTheme();
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions(theme)}>
      {Object.entries(stackSettingsScreens).map(([name, config]) => (
        <Stack.Screen
          key={name}
          name={name}
          component={config.screen}
          options={config.options}
        />
      ))}
    </Stack.Navigator>
  );
}

function CollectionStackNavigator() {
  const { theme } = useTheme();
  const Stack = createNativeStackNavigator<CollectionGroupStackParamList>();
  return (
    <Stack.Navigator screenOptions={screenOptions(theme)}>
      {Object.entries(stackCollectionGroupScreens).map(([name, config]) => (
        <Stack.Screen
          key={name}
          name={name as keyof CollectionGroupStackParamList}
          component={config.screen}
          options={config.options}
        />
      ))}
    </Stack.Navigator>
  );
}

function HomeStackNavigator() {
  const { theme } = useTheme();
  const Stack = createNativeStackNavigator<HomeStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={screenOptions(theme)}
    >
      {Object.entries(stackHomeScreens).map(([name, config]) => (
        <Stack.Screen
          key={name}
          name={name as keyof HomeStackParamList}
          component={config.screen}
          options={config.options}
        />
      ))}
    </Stack.Navigator>
  );
}

const getTabBarIcon = (
  routeName: string,
  { color, size }: { color: string; size: number },
) => {
  const iconMap: Record<string, string> = {
    Battle: 'sword-cross',
    Collections: 'folder',
    Settings: 'cog',
  };
  return <Icon name={iconMap[routeName]} size={size} color={color} />;
};

function TabNavigator() {
  const { theme } = useTheme();
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.surface,
        },
        tabBarLabelStyle: {
          fontFamily: theme.typography.family.regular,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarIcon: ({ color, size }) =>
          getTabBarIcon(route.name, { color, size }),
      })}
    >
      <Tab.Screen name="Battle" component={HomeStackNavigator} />
      <Tab.Screen name="Collections" component={CollectionStackNavigator} />
      <Tab.Screen name="Settings" component={SettingsStackNavigator} />
    </Tab.Navigator>
  );
}

function RootStackNavigator({ theme }: { theme: Theme }) {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator screenOptions={screenOptions(theme)}>
      <Stack.Screen
        name="Root"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      {Object.entries(stackCardScreens).map(([name, config]) => (
        <Stack.Screen
          key={name}
          name={name as keyof RootStackParamList}
          component={config.screen}
          options={config.options}
        />
      ))}
    </Stack.Navigator>
  );
}

export function NavigationScreen() {
  const { themeMode } = useNavigationScreenViewModel();
  const { theme, isDarkMode, setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode(themeMode);
  }, [setThemeMode, themeMode]);

  return (
    <SafeAreaProvider>
      <BottomSheetModalProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
        <NavigationContainer>
          <RootStackNavigator theme={theme} />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </SafeAreaProvider>
  );
}
