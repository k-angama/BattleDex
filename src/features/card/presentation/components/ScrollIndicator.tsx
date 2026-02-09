import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BDTypography } from '../../../../common/components/BDTypography';
import { useScrollIndicatorStyles } from './styles/scrollIndicator.style';

export function ScrollIndicator() {
  const styles = useScrollIndicatorStyles();
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.4);

  useEffect(() => {
    // Subtle pulse animation
    pulseScale.value = withRepeat(
      withTiming(1.1, { duration: 1000 }),
      -1,
      true,
    );
    pulseOpacity.value = withRepeat(
      withTiming(0.7, { duration: 1000 }),
      -1,
      true,
    );
  }, [pulseOpacity, pulseScale]);

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  return (
    <Animated.View style={[styles.container, pulseAnimatedStyle]}>
      <Icon name="chevron-down" size={28} style={styles.icon} />
      <BDTypography variant="caption" style={styles.text}>
        Scroll for details
      </BDTypography>
    </Animated.View>
  );
}
