import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BDTypography } from '../../../../../common/components/BDTypography';
import type { CollectionGroup } from '../../../domaine/entities/CollectionGroup';
import { useStyles } from './styles/collectionGroupCard.styles';

export interface CollectionGroupCardProps {
  item: CollectionGroup;
}

export function CollectionGroupCard({ item }: CollectionGroupCardProps) {
  const { styles } = useStyles();

  return (
    <View style={styles.cardContainer}>
      <View style={[styles.cardHeader, { backgroundColor: item.color }]}>
        <View style={styles.cardIconContainer}>
          <Icon name="folder" size={32} color="#FFF" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <BDTypography variant="label" style={styles.cardName} numberOfLines={2}>
          {item.name}
        </BDTypography>
        <BDTypography variant="caption" style={styles.cardCount}>
          {item.cardCount} cards
        </BDTypography>
      </View>
    </View>
  );
}
