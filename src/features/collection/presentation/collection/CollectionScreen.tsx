import { observer } from 'mobx-react-lite';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from './styles/collectionScreen.styles';
import { useCollectionScreenViewModel } from './useCollectionScreenViewModel';

const CollectionScreen = observer(() => {
  const { styles } = useStyles();
  const {} = useCollectionScreenViewModel();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text>CollectionScreen</Text>
    </SafeAreaView>
  );
});

export default CollectionScreen;
