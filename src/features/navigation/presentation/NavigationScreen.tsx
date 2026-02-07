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
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Theme, useTheme } from '../../../common/styles';
import { cardScreenRoute } from '../../card/presentation/cardScreenRoute';
import { compareScreenRoute } from '../../compare/presensation/compareScreenRoute';
import { CardEntity } from '../../home/domaine/entities/CardEntity';
import { homeScreenRoute } from '../../home/presentation/homeScreenRoute';
import { settingsScreenRoute } from '../../settings/presentation/settingsScreenRoute';
import { useNavigationScreenViewModel } from './useNavigationScreenViewModel';

export type RootStackParamList = {
  Home: undefined;
  Compare: {
    firstCard: CardEntity;
    secondCard: CardEntity;
    isDataLocal?: boolean;
  };
  Card: { cardId: string; name: string };
};

export type RootTabParamList = {
  Battle: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const stackHomeScreens = {
  ...homeScreenRoute,
};

const stackCardScreens = {
  ...compareScreenRoute,
  ...cardScreenRoute,
};

const stackSettingsScreens = {
  ...settingsScreenRoute,
};

const screenOptions = (theme: Theme): NativeStackNavigationOptions => {
  return {
    headerLargeTitle: false,
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

function HomeStackNavigator() {
  const { theme } = useTheme();
  return (
    <Stack.Navigator screenOptions={screenOptions(theme)}>
      {Object.entries(stackHomeScreens).map(([name, config]) => (
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

function SettingsStackNavigator() {
  const { theme } = useTheme();
  return (
    <Stack.Navigator screenOptions={screenOptions(theme)}>
      {Object.entries(stackSettingsScreens).map(([name, config]) => (
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

const getTabBarIcon = (
  routeName: string,
  { color, size }: { color: string; size: number },
) => {
  const iconMap: Record<string, string> = {
    Battle: 'sword-cross',
    Settings: 'cog',
  };
  return <Icon name={iconMap[routeName]} size={size} color={color} />;
};

function TabNavigator() {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.surface,
        },
        tabBarLabelStyle: {
          fontSize: theme.typography.size.xs,
          fontFamily: theme.typography.family.regular,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarIcon: ({ color, size }) =>
          getTabBarIcon(route.name, { color, size }),
      })}
    >
      <Tab.Screen name="Battle" component={HomeStackNavigator} />
      <Tab.Screen name="Settings" component={SettingsStackNavigator} />
    </Tab.Navigator>
  );
}

function ScreensStackNavigator() {
  const { theme } = useTheme();
  return (
    <Stack.Navigator screenOptions={screenOptions(theme)}>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      {Object.entries(stackCardScreens).map(([name, config]) => (
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

export function NavigationScreen() {
  useNavigationScreenViewModel();
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
          <ScreensStackNavigator />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </SafeAreaProvider>
  );
}
