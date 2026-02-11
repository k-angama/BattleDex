import { MenuComponentRef, MenuView } from '@react-native-menu/menu';
import { useRef } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import Reanimated, { FadeInUp, FadeOut } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BDTypography } from '../../../../../common/components/BDTypography';
import type { CollectionGroupEntity } from '../../../domaine/entities/CollectionGroupEntity';
import { useStyles } from './styles/collectionGroupCard.styles';

export interface CollectionGroupCardProps {
  item: CollectionGroupEntity;
  onPress?: (item: CollectionGroupEntity) => void;
  onEdit?: (item: CollectionGroupEntity) => void;
  onDelete?: (item: CollectionGroupEntity) => void;
}

export function CollectionGroupCard({
  item,
  onPress,
  onEdit,
  onDelete,
}: CollectionGroupCardProps) {
  const { styles } = useStyles();
  const ref = useRef<MenuComponentRef>(null);

  return (
    <View style={styles.menuContainer}>
      <MenuView
        ref={ref}
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
        <TouchableOpacity
          style={styles.cardContainer}
          activeOpacity={0.7}
          onPress={() => onPress?.(item)}
        >
          <Reanimated.View
            entering={FadeInUp.duration(250)}
            exiting={FadeOut.duration(200)}
          >
            <View style={[styles.cardHeader, { backgroundColor: item.color }]}>
              <View style={styles.cardIconContainer}>
                <Icon name="pokeball" size={32} color="#FFF" />
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
          </Reanimated.View>
        </TouchableOpacity>
      </MenuView>
    </View>
  );
}
