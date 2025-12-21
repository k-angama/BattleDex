import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { HomeScreen } from './HomeScreen';

const options: NativeStackNavigationOptions = {
  title: 'BattleDex',
  headerShadowVisible: false,
  headerLargeTitle: Platform.OS === 'ios',
  headerLargeTitleShadowVisible: true,
  scrollEdgeEffects: {},
  headerTitleAlign: 'left',
};

export const homeScreenRoute = {
  Home: {
    screen: HomeScreen,
    options,
  },
};
