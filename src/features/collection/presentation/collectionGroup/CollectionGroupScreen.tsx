import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { useLayoutEffect } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../../common/styles';
import { CollectionGroupCard } from './components/CollectionGroupCard';
import { useStyles } from './styles/collectionGroupScreen.styles';
import { useCollectionGroupScreenViewModel } from './useCollectionGroupScreenViewModel';

const CollectionGroupScreen = observer(() => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { theme } = useTheme();
  const { styles } = useStyles();
  const { collections, isLoading, addCollection } =
    useCollectionGroupScreenViewModel();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="plus-circle"
          size={28}
          color={theme.colors.primary}
          onPress={() => {
            // TODO: Add collection logic
            console.log('Add new collection');
          }}
        />
      ),
    });
  }, [navigation, theme.colors.primary]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={collections}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => <CollectionGroupCard item={item} />}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
});

export default CollectionGroupScreen;
