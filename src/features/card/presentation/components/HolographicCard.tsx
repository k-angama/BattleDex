import {
  Blur,
  Canvas,
  Image,
  LinearGradient,
  Rect,
  useImage,
  vec,
} from '@shopify/react-native-skia';
import React from 'react';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { useHolographicCardStyles } from './styles/holographicCard.style';

interface HolographicCardProps {
  imageUrl: string;
  width: number;
}

export const HolographicCard: React.FC<HolographicCardProps> = ({
  imageUrl,
  width,
}) => {
  const styles = useHolographicCardStyles();

  const height = width * (4 / 2.9); // Card aspect ratio

  const glareX = useSharedValue(width / 2);
  const glareY = useSharedValue(height / 2);
  const tiltX = useSharedValue(0);
  const tiltY = useSharedValue(0);

  const image = useImage(imageUrl);
  const [gradientPoints, setGradientPoints] = React.useState(() => ({
    start: vec(width * 0.5, height * 0.5),
    end: vec(width * 0.5, height * 0.5),
  }));
  const [glarePoints, setGlarePoints] = React.useState(() => ({
    start: vec(width / 2 - 100, height / 2 - 100),
    end: vec(width / 2 + 100, height / 2 + 100),
  }));

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      // Calculate tilt based on touch position
      const centerX = width / 2;
      const centerY = height / 2;

      // Normalize to -1 to 1 range
      const normalizedX = (event.x - centerX) / centerX;
      const normalizedY = (event.y - centerY) / centerY;

      // Store tilt values (limited to prevent flipping)
      tiltX.value = Math.max(-0.8, Math.min(0.8, normalizedX)); // Clamp between -0.8 and 0.8
      tiltY.value = Math.max(-0.8, Math.min(0.8, normalizedY));

      // Update glare position to follow finger
      glareX.value = event.x;
      glareY.value = event.y;
    })
    .onEnd(() => {
      // Spring back to center
      tiltX.value = withSpring(0);
      tiltY.value = withSpring(0);
      glareX.value = withSpring(width / 2);
      glareY.value = withSpring(height / 2);
    });

  const animatedStyle = useAnimatedStyle(() => {
    // Apply rotation with limited angles (max 15 degrees to prevent flip)
    const rotateY = tiltX.value * 30; // Max 15 degrees
    const rotateX = -tiltY.value * 30; // Max 15 degrees (negative for natural tilt)

    return {
      transform: [
        { perspective: 1000 },
        { rotateX: `${rotateX}deg` },
        { rotateY: `${rotateY}deg` },
      ],
    };
  });

  const updateVisualEffects = React.useCallback(
    (
      tiltXValue: number,
      tiltYValue: number,
      glareXValue: number,
      glareYValue: number,
    ) => {
      setGradientPoints({
        start: vec(
          width * (0.5 + tiltXValue * 0.3),
          height * (0.5 + tiltYValue * 0.3),
        ),
        end: vec(
          width * (0.5 - tiltXValue * 0.3),
          height * (0.5 - tiltYValue * 0.3),
        ),
      });
      setGlarePoints({
        start: vec(glareXValue - 100, glareYValue - 100),
        end: vec(glareXValue + 100, glareYValue + 100),
      });
    },
    [height, width],
  );

  useAnimatedReaction(
    () => ({
      tiltX: tiltX.value,
      tiltY: tiltY.value,
      glareX: glareX.value,
      glareY: glareY.value,
    }),
    values => {
      scheduleOnRN(
        updateVisualEffects,
        values.tiltX,
        values.tiltY,
        values.glareX,
        values.glareY,
      );
    },
    [updateVisualEffects],
  );

  return (
    <GestureHandlerRootView style={styles.gestureContainer}>
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[[{ width, height }, styles.canvas], animatedStyle]}
        >
          <Canvas style={[{ width, height }]}>
            {/* Base card image */}
            {image && (
              <Image
                image={image}
                x={0}
                y={0}
                width={width}
                height={height}
                fit="cover"
              />
            )}

            {/* Shine effect - Dynamic gradient based on tilt */}
            <Rect x={0} y={0} width={width} height={height}>
              <LinearGradient
                start={gradientPoints.start}
                end={gradientPoints.end}
                colors={[
                  'rgba(255, 255, 255, 0.2)',
                  'rgba(200, 200, 255, 0.15)',
                  'rgba(255, 200, 200, 0.15)',
                  'rgba(0, 0, 0, 0.1)',
                ]}
              />
            </Rect>

            {/* Glare effect - follows finger position */}
            <Rect x={0} y={0} width={width} height={height}>
              <LinearGradient
                start={glarePoints.start}
                end={glarePoints.end}
                colors={[
                  'rgba(255, 255, 255, 0.6)',
                  'rgba(255, 255, 255, 0.0)',
                ]}
              />
              <Blur blur={20} />
            </Rect>
          </Canvas>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};
