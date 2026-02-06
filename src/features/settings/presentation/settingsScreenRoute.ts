import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { SettingsScreen } from './SettingsScreen';

const options: NativeStackNavigationOptions = {
  title: 'Settings',
  headerShadowVisible: false,
  headerLargeTitle: Platform.OS === 'ios',
  headerLargeTitleShadowVisible: true,
  scrollEdgeEffects: {},
  headerTitleAlign: 'left',
};

export const settingsScreenRoute = {
  Settings: {
    screen: SettingsScreen,
    options,
  },
};
