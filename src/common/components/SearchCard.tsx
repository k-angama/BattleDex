import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { SearchCardSuggestionEntity } from '../../features/home/domaine/entities/SearchCardSuggestionEntity';
import { BDTypography } from './BDTypography';
import { useSearchCardStyles } from './styles/searchCard.style';

interface SearchCardProps {
  item: SearchCardSuggestionEntity;
  onSelect: (item: SearchCardSuggestionEntity) => void;
}

export function SearchCard({ item, onSelect }: SearchCardProps) {
  const styles = useSearchCardStyles();
  return (
    <TouchableOpacity
      style={styles.gridCard}
      onPress={() => onSelect(item)}
      activeOpacity={0.85}
    >
      {!item.imageUrl ? (
        <View style={[styles.cardImage, styles.missingImage]}>
          <BDTypography style={styles.missingText}>No Image</BDTypography>
        </View>
      ) : (
        <Image source={{ uri: item.imageUrl ?? '' }} style={styles.cardImage} />
      )}
      <BDTypography
        variant="label"
        weight="semibold"
        style={styles.cardName}
        numberOfLines={1}
      >
        {item.title}
      </BDTypography>
      <BDTypography
        variant="overline"
        style={styles.cardMeta}
        numberOfLines={1}
      >
        {item.subtitle}
      </BDTypography>
    </TouchableOpacity>
  );
}
