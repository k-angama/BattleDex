import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchCardSuggestionEntity } from '../../features/home/domaine/entities/SearchCardSuggestionEntity';
import { ErrorMessage } from './ErrorMessage';
import { SearchCard } from './SearchCard';
import { SearchCardSkeletons } from './SearchCardSkeletons';
import { SearchEmpty } from './SearchEmpty';
import { useSearchBarStyles } from './styles/searchBar.style';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  onFocus?: () => void;
  placeholder?: string;
  suggestions?: SearchCardSuggestionEntity[];
  onSuggestionPress?: (suggestion: SearchCardSuggestionEntity) => void;
  enableSuggestions?: boolean;
  autoFocusOnMount?: boolean;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  onFocus,
  placeholder = 'Search Pokémon cards...',
  suggestions = [],
  onSuggestionPress,
  enableSuggestions = true,
  autoFocusOnMount = false,
  isLoading = false,
  errorMessage = null,
}) => {
  const { styles, placeholderColor } = useSearchBarStyles();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    if (enableSuggestions) {
      setShowSuggestions(true);
    }
    onFocus?.();
  };

  const handleSuggestionPress = (suggestion: SearchCardSuggestionEntity) => {
    if (!enableSuggestions) {
      return;
    }
    onSuggestionPress?.(suggestion);
    setShowSuggestions(false);
  };

  const showSuggestionsList =
    enableSuggestions && showSuggestions && value.length >= 3;

  const onPageLayout = useCallback(() => {
    if (autoFocusOnMount) {
      inputRef.current?.focus();
    }
  }, [autoFocusOnMount]);

  return (
    <SafeAreaView edges={['top']}>
      <View style={styles.container} onLayout={onPageLayout}>
        <View style={styles.searchIcon}>
          {isLoading ? (
            <ActivityIndicator size="small" />
          ) : (
            <Text style={styles.searchIconText}>🔎</Text>
          )}
        </View>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          value={value}
          focusable={true}
          onFocus={handleFocus}
          onChangeText={onChangeText}
          returnKeyType="search"
        />
        {value.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={onClear}
            activeOpacity={0.6}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {showSuggestionsList && (
        <View style={styles.suggestionsContainer}>
          {errorMessage ? (
            <View style={styles.errorContainer}>
              <ErrorMessage message={errorMessage} />
            </View>
          ) : isLoading ? (
            <SearchCardSkeletons />
          ) : (
            <FlatList
              data={suggestions}
              renderItem={({ item }) => (
                <SearchCard item={item} onSelect={handleSuggestionPress} />
              )}
              keyExtractor={(item, index) => item.id || index.toString()}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              numColumns={2}
              ListEmptyComponent={<SearchEmpty />}
              contentContainerStyle={styles.listContent}
              columnWrapperStyle={styles.columnWrapper}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};
