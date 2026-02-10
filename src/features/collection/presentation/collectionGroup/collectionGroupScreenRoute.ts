import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import CollectionGroupScreen from './CollectionGroupScreen';

const options: NativeStackNavigationOptions = {
  title: 'Collections',
  headerShadowVisible: false,
  headerLargeTitle: Platform.OS === 'ios',
  headerLargeTitleShadowVisible: true,
  headerTitleAlign: 'left',
};

export const collectionGroupScreenRoute = {
  CollectionGroup: {
    screen: CollectionGroupScreen,
    options,
  },
};
