import { Image, TouchableOpacity, View } from 'react-native';
import { BDTypography } from '../../../../../common/components/BDTypography';
import type { CollectionCardEntity } from '../../../domaine/entities/CollectionCardEntity';
import { useStyles } from './styles/collectionCard.styles';

interface CollectionCardProps {
  card: CollectionCardEntity;
  onPress?: (card: CollectionCardEntity) => void;
}

export function CollectionCard({ card, onPress }: CollectionCardProps) {
  const { styles } = useStyles();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress?.(card)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: card.imageUrl }} style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <BDTypography
          variant="body"
          weight="semibold"
          numberOfLines={1}
          style={styles.title}
        >
          {card.title}
        </BDTypography>
        <View style={styles.scoreContainer}>
          <BDTypography variant="caption" style={styles.scoreLabel}>
            Score
          </BDTypography>
          <BDTypography variant="body" weight="bold" style={styles.scoreValue}>
            {card.staticScore}
          </BDTypography>
        </View>
      </View>
    </TouchableOpacity>
  );
}
