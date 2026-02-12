import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { observer } from 'mobx-react-lite';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BDButton } from '../../../../common/components/BDButton';
import { BDTypography } from '../../../../common/components/BDTypography';
import { collectionGroupStore } from '../../../../common/services/CollectionGroupStore';
import { useTheme } from '../../../../common/styles';
import type { CollectionGroupEntity } from '../../../collection/domaine/entities/CollectionGroupEntity';
import { useStyles } from './styles/addToCollectionBottomSheet.styles';

export interface AddToCollectionBottomSheetProps {
  visible: boolean;
  cardId: string;
  isLoading?: boolean;
  onClose: () => void;
  onSelectCollection: (collectionId: string) => void;
  onCreateCollection: () => void;
  checkIfCardInCollection: (
    cardId: string,
    collectionId: string,
  ) => Promise<boolean>;
}

export const AddToCollectionBottomSheet = observer(
  React.forwardRef<BottomSheetModalMethods, AddToCollectionBottomSheetProps>(
    function AddToCollectionBottomSheetWithRef(
      {
        visible,
        cardId,
        isLoading = false,
        onClose,
        onSelectCollection,
        onCreateCollection: _onCreateCollection,
        checkIfCardInCollection,
      }: AddToCollectionBottomSheetProps,
      ref,
    ) {
      const { styles } = useStyles();
      const { theme } = useTheme();
      const snapPoints = useMemo(() => ['60%'], []);
      const modalRef = useRef<BottomSheetModalMethods>(null);
      const collections = collectionGroupStore.collections;
      const [collectionsWithCard, setCollectionsWithCard] = useState<
        Set<string>
      >(new Set());

      useEffect(() => {
        if (visible) {
          modalRef.current?.present();
          // Check which collections already have this card
          const checkCollections = async () => {
            const results = await Promise.all(
              collections.map(async collection => ({
                id: collection.id,
                hasCard: await checkIfCardInCollection(cardId, collection.id),
              })),
            );
            const withCard = new Set(
              results.filter(r => r.hasCard).map(r => r.id),
            );
            setCollectionsWithCard(withCard);
          };
          checkCollections();
        } else {
          modalRef.current?.dismiss();
        }
      }, [visible, collections, cardId, checkIfCardInCollection]);

      useImperativeHandle(
        ref,
        () => modalRef.current as BottomSheetModalMethods,
        [],
      );

      const renderBackdrop = useCallback(
        (backdropProps: BottomSheetBackdropProps) => (
          <BottomSheetBackdrop
            {...backdropProps}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior="close"
          />
        ),
        [],
      );

      useEffect(() => {
        if (!visible) return;

        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          () => {
            onClose();
            return true;
          },
        );

        return () => backHandler.remove();
      }, [visible, onClose]);

      const renderCollectionItem = useCallback(
        ({ item }: { item: CollectionGroupEntity }) => {
          const hasCard = collectionsWithCard.has(item.id);
          return (
            <TouchableOpacity
              style={[
                styles.collectionItem,
                (isLoading || hasCard) && styles.collectionItemDisabled,
              ]}
              onPress={() => onSelectCollection(item.id)}
              disabled={isLoading || hasCard}
            >
              <View style={styles.collectionItemContent}>
                <View
                  style={[
                    styles.colorIndicator,
                    { backgroundColor: item.color },
                  ]}
                />
                <View style={styles.collectionInfo}>
                  <BDTypography variant="body" weight="medium">
                    {item.name}
                  </BDTypography>
                  <BDTypography variant="caption" style={styles.cardCount}>
                    {item.cardCount} {item.cardCount === 1 ? 'card' : 'cards'}
                  </BDTypography>
                </View>
                {hasCard && (
                  <Icon
                    name="check-circle"
                    size={24}
                    color={theme.colors.success}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        },
        [collectionsWithCard, onSelectCollection, styles, theme, isLoading],
      );

      const renderEmptyState = useCallback(() => {
        return (
          <SafeAreaView style={styles.container} edges={['bottom']}>
            <View style={styles.emptyState}>
              <BDTypography variant="title">📂</BDTypography>
              <BDTypography variant="body" style={styles.emptyText}>
                No collections yet
              </BDTypography>
              <BDButton
                title="Create Your First Collection"
                variant="text"
                size="lg"
                rightIcon={
                  <Icon
                    name="plus-circle"
                    size={28}
                    color={theme.colors.primary}
                  />
                }
                onPress={_onCreateCollection}
                style={styles.createButton}
              />
            </View>
          </SafeAreaView>
        );
      }, [styles, _onCreateCollection, theme]);

      const renderHeader = useCallback(() => {
        return (
          <View style={styles.header}>
            <BDTypography variant="subtitle" weight="semibold">
              Add to Collection
            </BDTypography>
            <View style={styles.headerRight}>
              {isLoading && (
                <ActivityIndicator
                  size="small"
                  color={theme.colors.primary}
                  style={styles.loadingIndicator}
                />
              )}
              <TouchableOpacity
                onPress={_onCreateCollection}
                disabled={isLoading}
                style={styles.createIconButton}
              >
                <Icon
                  name="plus-circle-outline"
                  size={24}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      }, [styles, isLoading, theme, _onCreateCollection]);

      return (
        <BottomSheetModal
          ref={modalRef}
          enableDynamicSizing={false}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          onDismiss={onClose}
          enablePanDownToClose
          handleIndicatorStyle={styles.indicator}
        >
          <SafeAreaView style={styles.container} edges={['bottom']}>
            {renderHeader()}

            <BottomSheetFlatList
              data={collections}
              renderItem={renderCollectionItem}
              keyExtractor={(item: CollectionGroupEntity) => item.id}
              contentContainerStyle={styles.listContent}
              ListEmptyComponent={renderEmptyState}
            />
          </SafeAreaView>
        </BottomSheetModal>
      );
    },
  ),
);
