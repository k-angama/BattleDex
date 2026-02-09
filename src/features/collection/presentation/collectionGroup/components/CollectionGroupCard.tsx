import { MenuView } from '@react-native-menu/menu';
import { Platform, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BDTypography } from '../../../../../common/components/BDTypography';
import type { CollectionGroupEntity } from '../../../domaine/entities/CollectionGroupEntity';
import { useStyles } from './styles/collectionGroupCard.styles';

export interface CollectionGroupCardProps {
  item: CollectionGroupEntity;
  onEdit?: (item: CollectionGroupEntity) => void;
  onDelete?: (item: CollectionGroupEntity) => void;
}

export function CollectionGroupCard({
  item,
  onEdit,
  onDelete,
}: CollectionGroupCardProps) {
  const { styles } = useStyles();

  return (
    <MenuView
      style={styles.menuContainer}
      onPressAction={({ nativeEvent }) => {
        if (nativeEvent.event === 'edit') {
          onEdit?.(item);
        } else if (nativeEvent.event === 'delete') {
          onDelete?.(item);
        }
      }}
      shouldOpenOnLongPress={true}
      actions={[
        {
          id: 'edit',
          title: 'Edit',
          image: Platform.select({
            ios: 'pencil',
            android: 'ic_menu_edit',
          }),
        },
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
      <Pressable
        style={({ pressed }) => [
          styles.cardContainer,
          pressed && styles.cardPressed,
        ]}
      >
        <View style={[styles.cardHeader, { backgroundColor: item.color }]}>
          <View style={styles.cardIconContainer}>
            <Icon name="folder" size={32} color="#FFF" />
          </View>
        </View>
        <View style={styles.cardContent}>
          <BDTypography
            variant="label"
            style={styles.cardName}
            numberOfLines={2}
          >
            {item.name}
          </BDTypography>
          <BDTypography variant="caption" style={styles.cardCount}>
            {item.cardCount} cards
          </BDTypography>
        </View>
      </Pressable>
    </MenuView>
  );
}
