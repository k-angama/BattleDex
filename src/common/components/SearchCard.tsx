import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SearchCardSuggestionEntity } from '../../features/home/domaine/entities/SearchCardSuggestionEntity';
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
          <Text style={styles.missingText}>No Image</Text>
        </View>
      ) : (
        <Image source={{ uri: item.imageUrl ?? '' }} style={styles.cardImage} />
      )}
      <Text style={styles.cardName} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.cardMeta} numberOfLines={1}>
        {item.subtitle}
      </Text>
    </TouchableOpacity>
  );
}
