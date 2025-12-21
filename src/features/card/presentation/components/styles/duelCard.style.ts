import { StyleSheet } from 'react-native';

export const useDuelCardStyles = () => {
  return StyleSheet.create({
    wrapper: {
      width: '40%',
      alignItems: 'center',
      zIndex: -1,
    },
    wrapperLeft: {
      transform: [{ rotate: '-6deg' }],
    },
    wrapperRight: {
      transform: [{ rotate: '6deg' }],
    },
  });
};
