import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { CardScreen } from './CardScreen';

const options: NativeStackNavigationOptions = {
  title: 'pika',
  headerShadowVisible: false,
  headerLargeTitle: false,
  headerLargeTitleShadowVisible: false,
  headerTitleAlign: 'center',
  headerBackButtonDisplayMode: 'minimal',
  presentation: 'containedModal',
};

export const cardScreenRoute = {
  Card: {
    screen: CardScreen,
    options,
  },
};
