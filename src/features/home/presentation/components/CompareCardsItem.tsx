import { Image, TouchableOpacity, View } from 'react-native';
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
};

export function CompareCardsItem({
  compareCards,
  timeAgo = '-',
  onPress,
  isEditMode = false,
  selected = false,
  onToggleSelect,
}: CompareCardsItemProps) {
  const styles = useStyles();
  const isDraw = compareCards.winner === 'draw';
  const handleToggleSelect = () => {
    if (!onToggleSelect) return;
    onToggleSelect(compareCards.id);
  };
  return (
    <BDCard style={styles.container} selected={isEditMode && selected}>
      {isEditMode && (
        <BDCheckbox selected={selected} onToggleSelect={handleToggleSelect} />
      )}
      {/* Time Badge */}
      <View style={styles.timeBadge}>
        <BDTypography style={styles.timeText}>{timeAgo}</BDTypography>
      </View>
      <TouchableOpacity
        onPress={isEditMode ? handleToggleSelect : onPress}
        activeOpacity={0.7}
      >
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
  );
}
