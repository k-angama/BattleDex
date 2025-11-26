import { Image, Text, TouchableOpacity, View } from 'react-native';
import { CompareCardsPreviewEntity } from '../../domaine/entities/CompareCardsPreviewEntity';
import { useStyles } from './styles/compareCardsItem.style';

type CompareCardsItemProps = {
  compareCards: CompareCardsPreviewEntity;
  timeAgo?: string;
  onPress: () => void;
};

export function CompareCardsItem({
  compareCards,
  timeAgo = '-',
  onPress,
}: CompareCardsItemProps) {
  const styles = useStyles();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Time Badge */}
      <View style={styles.timeBadge}>
        <Text style={styles.timeText}>{timeAgo}</Text>
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
            <View style={styles.loseOverlay}>
              <Text style={styles.loseText}>LOSE</Text>
            </View>
          </View>
          <Text style={styles.cardName} numberOfLines={1}>
            {compareCards.loseCard.name}
          </Text>
        </View>

        {/* VS Circle */}
        <View style={styles.vsContainer}>
          <View style={styles.vsCircle}>
            <Text style={styles.vsText}>VS</Text>
          </View>
          <View style={styles.vsLine} />
        </View>

        {/* Winner Card */}
        <View style={styles.cardBox}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: compareCards.windCard.imageUrl }}
              style={styles.cardImage}
            />
            <View style={styles.winOverlay}>
              <Text style={styles.winText}>WIN</Text>
            </View>
          </View>
          <Text style={styles.cardName} numberOfLines={1}>
            {compareCards.windCard.name}
          </Text>
        </View>
      </View>
      {/* Tap to view hint */}
      {/*
      <View style={styles.footer}>
        <View style={styles.tapHint}>
          <Text style={styles.tapHintText}>Tap to view details</Text>
        </View>
      </View>
      */}
    </TouchableOpacity>
  );
}
