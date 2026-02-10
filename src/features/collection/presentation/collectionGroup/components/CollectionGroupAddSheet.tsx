import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BDButton } from '../../../../../common/components/BDButton';
import { BDTypography } from '../../../../../common/components/BDTypography';
import { COLLECTION_GROUP_COLORS } from '../../../../../common/utils/constants';
import { useStyles } from './styles/collectionGroupAddSheet.styles.ts';

export interface CollectionGroupAddSheetProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (payload: { name: string; color: string }) => void;
  initialData?: { name: string; color: string };
}

export const CollectionGroupAddSheet = React.forwardRef<
  BottomSheetModalMethods,
  CollectionGroupAddSheetProps
>(function CollectionGroupAddSheetWithRef(
  { visible, onClose, onSubmit, initialData }: CollectionGroupAddSheetProps,
  ref,
) {
  const { styles, placeholderColor } = useStyles();
  const snapPoints = useMemo(() => ['48%'], []);
  const modalRef = useRef<BottomSheetModalMethods>(null);
  const defaultColor = COLLECTION_GROUP_COLORS[0];
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const isEditing = !!initialData;

  useEffect(() => {
    if (visible) {
      modalRef.current?.present();
      if (initialData) {
        setName(initialData.name);
        setSelectedColor(initialData.color);
      } else {
        setName('');
        setSelectedColor(defaultColor);
      }
    } else {
      modalRef.current?.dismiss();
    }
  }, [visible, defaultColor, initialData]);

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

  const handleSubmit = useCallback(() => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return;
    }
    onSubmit({ name: trimmedName, color: selectedColor });
    onClose();
  }, [name, selectedColor, onSubmit, onClose]);

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
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <BDTypography variant="title" weight="bold" style={styles.title}>
          {isEditing ? 'Edit Collection' : 'New Collection'}
        </BDTypography>

        <View style={styles.inputContainer}>
          <BDTypography variant="label" weight="semibold">
            Name
          </BDTypography>
          <BottomSheetTextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Collection name"
            placeholderTextColor={placeholderColor}
            returnKeyType="done"
          />
        </View>

        <View style={styles.colorSection}>
          <BDTypography variant="label" weight="semibold">
            Color
          </BDTypography>
          <View style={styles.colorGrid}>
            {COLLECTION_GROUP_COLORS.map((color: string) => {
              const isSelected = color === selectedColor;
              return (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorSwatch,
                    { backgroundColor: color },
                    isSelected && styles.colorSwatchSelected,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setSelectedColor(color)}
                />
              );
            })}
          </View>
        </View>

        <View style={styles.actions}>
          <BDButton
            title="Cancel"
            variant="secondary"
            size="md"
            fullWidth={false}
            onPress={onClose}
            style={styles.actionButton}
          />
          <BDButton
            title={isEditing ? 'Save' : 'Create'}
            variant="primary"
            size="md"
            fullWidth={false}
            onPress={handleSubmit}
            disabled={!name.trim()}
            style={styles.actionButton}
          />
        </View>
      </SafeAreaView>
    </BottomSheetModal>
  );
});
