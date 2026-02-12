import { MenuComponentRef, MenuView } from '@react-native-menu/menu';
import { useRef } from 'react';
import { Image, Platform, TouchableOpacity, View } from 'react-native';
import { BDTypography } from '../../../../../common/components/BDTypography';
import type { CollectionCardEntity } from '../../../domaine/entities/CollectionCardEntity';
import { useStyles } from './styles/collectionCard.styles';

interface CollectionCardProps {
  card: CollectionCardEntity;
  rank?: number;
  onPress?: (card: CollectionCardEntity) => void;
  onDelete?: (card: CollectionCardEntity) => void;
}

export function CollectionCard({
  card,
  rank,
  onPress,
  onDelete,
}: CollectionCardProps) {
  const { styles } = useStyles();
  const ref = useRef<MenuComponentRef>(null);

  const getRankDisplay = () => {
    if (!rank) return null;
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const isTopThree = rank && rank <= 3;

  return (
    <View style={styles.container2}>
      <TouchableOpacity
        disabled={Platform.OS === 'android'} // Disable on Android to avoid conflicts with long press
        activeOpacity={0.7}
        onPress={() => onPress?.(card)}
      >
        <MenuView
          ref={ref}
          onPressAction={({ nativeEvent }) => {
            if (nativeEvent.event === 'delete') {
              onDelete?.(card);
            }
          }}
          shouldOpenOnLongPress={true}
          actions={[
            {
              id: 'delete',
              title: 'Delete',
              attributes: {
                destructive: true,
              },
              image: Platform.select({
                ios: 'trash',
                android: 'ic_menu_delete',
              }),
            },
          ]}
        >
          <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            onPress={() => onPress?.(card)}
            delayLongPress={100}
            onLongPress={() => {}} // Required to enable long press on Android
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: card.imageUrl }} style={styles.image} />
              {rank && (
                <View
                  style={[
                    styles.rankBadge,
                    isTopThree ? styles.rankBadgeTop : undefined,
                  ]}
                >
                  <BDTypography
                    variant={isTopThree ? 'subtitle' : 'body'}
                    weight="bold"
                    style={styles.rankText}
                  >
                    {getRankDisplay()}
                  </BDTypography>
                </View>
              )}
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
                  Static Score
                </BDTypography>
                <BDTypography
                  variant="body"
                  weight="bold"
                  style={styles.scoreValue}
                >
                  {card.staticScore}
                </BDTypography>
              </View>
            </View>
          </TouchableOpacity>
        </MenuView>
      </TouchableOpacity>
    </View>
  );
}
