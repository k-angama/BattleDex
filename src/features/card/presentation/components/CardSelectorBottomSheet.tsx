import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { ErrorMessage } from '../../../../common/components/ErrorMessage';
import { SearchBar } from '../../../../common/components/SearchBar';
import { SearchCard } from '../../../../common/components/SearchCard';
import { SearchCardSkeletons } from '../../../../common/components/SearchCardSkeletons';
import { SearchEmpty } from '../../../../common/components/SearchEmpty';
import { SearchCardSuggestionEntity } from '../../../home/domaine/entities/SearchCardSuggestionEntity';
import { useCardSelectorStyles } from './styles/cardSelectorBottomSheet.style';

export type CardSelectorBottomSheetProps = {
  visible: boolean;
  cards: SearchCardSuggestionEntity[];
  isLoading: boolean;
  errorMessage?: string | null;
  onClose: () => void;
  onSelect: (card: SearchCardSuggestionEntity) => void;
  onChangeText: (text: string) => void;
};

export const CardSelectorBottomSheet = React.forwardRef<
  BottomSheetModalMethods,
  CardSelectorBottomSheetProps
>(function CardSelectorBottomSheetWithRef(
  {
    visible,
    cards,
    isLoading = false,
    errorMessage,
    onClose,
    onSelect,
    onChangeText,
  }: CardSelectorBottomSheetProps,
  ref,
) {
  const styles = useCardSelectorStyles();
  const snapPoints = React.useMemo(() => ['90%'], []);
  const [searchTerm, setSearchTerm] = React.useState('');
  const modalRef = React.useRef<BottomSheetModalMethods>(null);

  React.useEffect(() => {
    if (visible) {
      modalRef.current?.present();
    } else {
      modalRef.current?.dismiss();
      setSearchTerm('');
    }
  }, [visible]);

  React.useImperativeHandle(
    ref,
    () => modalRef.current as BottomSheetModalMethods,
    [],
  );

  const renderBackdrop = React.useCallback(
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

  const handleSearchQuery = useCallback(
    (query: string) => {
      setSearchTerm(query);
      onChangeText(query);
    },
    [setSearchTerm, onChangeText],
  );

  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
    onChangeText('');
  }, [setSearchTerm, onChangeText]);

  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      enableDynamicSizing={false}
      onDismiss={onClose}
      backdropComponent={renderBackdrop}
      style={styles.content}
      handleIndicatorStyle={styles.handle}
      backgroundStyle={styles.sheetBackground}
    >
      <View style={styles.searchBar}>
        <SearchBar
          value={searchTerm}
          onChangeText={handleSearchQuery}
          onClear={handleClearSearch}
          placeholder="Search a card to compare"
          enableSuggestions={false}
          autoFocusOnMount={true}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </View>
      <BottomSheetFlatList<SearchCardSuggestionEntity>
        data={errorMessage || isLoading ? [] : cards}
        keyExtractor={(item: SearchCardSuggestionEntity) => item.id}
        renderItem={({ item }: { item: SearchCardSuggestionEntity }) => (
          <SearchCard item={item} onSelect={onSelect} />
        )}
        ListEmptyComponent={
          isLoading ? (
            <SearchCardSkeletons />
          ) : errorMessage ? (
            <View style={styles.errorState}>
              <ErrorMessage message={errorMessage} />
            </View>
          ) : (
            <SearchEmpty />
          )
        }
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        scrollEnabled={!isLoading}
      />
    </BottomSheetModal>
  );
});
