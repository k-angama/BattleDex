import { useCallback, useEffect } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { BDButton } from '../../../../common/components/BDButton';
import { BDCard } from '../../../../common/components/BDCard';
import { BDCheckbox } from '../../../../common/components/BDCheckbox';
import { BDCircularBadge } from '../../../../common/components/BDCircularBadge';
import { BDTypography } from '../../../../common/components/BDTypography';
import { CompareCardsPreviewEntity } from '../../domaine/entities/CompareCardsPreviewEntity';
import { useStyles } from './styles/compareCardsItem.style';

type CompareCardsItemProps = {
  compareCards: CompareCardsPreviewEntity;
  timeAgo?: string;
  onPress: () => void;
  isEditMode?: boolean;
  selected?: boolean;
  onToggleSelect?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function CompareCardsItem({
  compareCards,
  timeAgo = '-',
  onPress,
  isEditMode = false,
  selected = false,
  onToggleSelect,
  onDelete,
}: CompareCardsItemProps) {
  const styles = useStyles();
  const isDraw = compareCards.winner === 'draw';
  const translateX = useSharedValue(0);
  const isSwiped = useSharedValue(false);
  const revealThreshold = -100;

  const closeBackItem = useCallback(() => {
    'worklet'; // Ensure this runs on the UI thread
    translateX.value = withSpring(0);
    isSwiped.value = false;
  }, [translateX, isSwiped]);

  useEffect(() => {
    if (isEditMode) {
      closeBackItem();
    }
  }, [closeBackItem, isEditMode]);

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onUpdate(event => {
      if (!isEditMode && onDelete) {
        translateX.value = Math.min(0, event.translationX);
      }
    })
    .onEnd(event => {
      if (!isEditMode && onDelete) {
        if (event.translationX <= revealThreshold) {
          translateX.value = withSpring(revealThreshold);
          isSwiped.value = true;
        } else {
          closeBackItem();
        }
      } else {
        closeBackItem();
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const cardPointerEvents = useAnimatedStyle(() => ({
    pointerEvents: isSwiped.value ? 'none' : 'auto',
  }));

  const deleteButtonOpacity = useAnimatedStyle(() => ({
    opacity: Math.min(
      Math.abs(translateX.value) / Math.abs(revealThreshold),
      1,
    ),
  }));
  const handleToggleSelect = () => {
    if (!onToggleSelect) return;
    onToggleSelect(compareCards.id);
  };

  const handleDeletePress = () => {
    if (!onDelete) return;
    closeBackItem();
    onDelete(compareCards.id);
  };
  return (
    <GestureDetector gesture={panGesture}>
      <Reanimated.View>
        <Reanimated.View
          style={[styles.revealContainer, deleteButtonOpacity]}
          pointerEvents="auto"
        >
          <View style={styles.deleteContainer}>
            <BDButton
              onPress={handleDeletePress}
              variant="danger"
              title="Delete"
              size="md"
            />
          </View>
        </Reanimated.View>

        <Reanimated.View
          style={[animatedStyle, styles.slideWrapper, cardPointerEvents]}
        >
          <BDCard style={styles.container} selected={isEditMode && selected}>
            {isEditMode && (
              <BDCheckbox
                selected={selected}
                onToggleSelect={handleToggleSelect}
              />
            )}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={isEditMode ? handleToggleSelect : onPress}
            >
              {/* Time Badge */}
              <View style={styles.timeBadge}>
                <BDTypography style={styles.timeText}>{timeAgo}</BDTypography>
              </View>
              {/* Cards Row */}
              <View style={styles.row}>
                {/* Loser Card */}
                <View style={styles.cardBox}>
                  <View style={styles.imageWrapper}>
                    <Image
                      source={{ uri: compareCards.loseCard.imageUrl }}
                      style={styles.cardImage}
                    />
                    {isDraw ? (
                      <View style={styles.drawOverlay}>
                        <BDTypography
                          variant="label"
                          weight="bold"
                          style={styles.drawText}
                        >
                          DRAW
                        </BDTypography>
                      </View>
                    ) : (
                      <View style={styles.loseOverlay}>
                        <BDTypography
                          variant="label"
                          weight="bold"
                          style={styles.loseText}
                        >
                          LOSE
                        </BDTypography>
                      </View>
                    )}
                  </View>
                  <BDTypography
                    variant="label"
                    weight="semibold"
                    style={styles.cardName}
                    numberOfLines={1}
                  >
                    {compareCards.loseCard.name}
                  </BDTypography>
                </View>

                {/* VS Circle */}
                <View style={styles.vsContainer}>
                  <BDCircularBadge style={styles.vsCircle} label="VS" />
                  <View style={styles.vsLine} />
                </View>

                {/* Winner Card */}
                <View style={styles.cardBox}>
                  <View style={styles.imageWrapper}>
                    <Image
                      source={{ uri: compareCards.windCard.imageUrl }}
                      style={styles.cardImage}
                    />
                    {isDraw ? (
                      <View style={styles.drawOverlay}>
                        <BDTypography
                          variant="label"
                          weight="bold"
                          style={styles.drawText}
                        >
                          DRAW
                        </BDTypography>
                      </View>
                    ) : (
                      <View style={styles.winOverlay}>
                        <BDTypography
                          variant="label"
                          weight="bold"
                          style={styles.winText}
                        >
                          WIN
                        </BDTypography>
                      </View>
                    )}
                  </View>
                  <BDTypography
                    variant="label"
                    weight="semibold"
                    style={styles.cardName}
                    numberOfLines={1}
                  >
                    {compareCards.windCard.name}
                  </BDTypography>
                </View>
              </View>
            </TouchableOpacity>
          </BDCard>
        </Reanimated.View>
      </Reanimated.View>
    </GestureDetector>
  );
}
