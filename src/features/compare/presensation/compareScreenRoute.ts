import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { CompareScreen } from './CompareScreen';

const options: NativeStackNavigationOptions = {
  title: '',
  headerShadowVisible: false,
  headerLargeTitle: false,
  headerLargeTitleShadowVisible: false,
  headerTransparent: true,
  headerBackButtonDisplayMode: 'minimal',
  headerStyle: {
    backgroundColor: 'transparent',
  },
};
export const compareScreenRoute = {
  Compare: {
    screen: CompareScreen,
    options: options,
  },
};
