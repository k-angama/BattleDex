import SegmentedControl from '@react-native-segmented-control/segmented-control';
import React from 'react';
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { BDTypography } from '../../../common/components/BDTypography';
import { useThemeRepository } from '../data/ThemeRepositoryImpl';
import { dataBaseCardsRepository } from './settingsScreenDI';
import { useStyles } from './styles/settingsScreen.styles';
import { useSettingsViewModel } from './useSettingsViewModel';

export function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { styles } = useStyles(insets.top);
  const themeRepository = useThemeRepository();
  const { themeMode, changeTheme, clearHistory, isClearingHistory } =
    useSettingsViewModel({
      dataBase: dataBaseCardsRepository,
      themeRepository,
    });

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to delete all comparison history? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: async () => {
            await clearHistory();
            Alert.alert('Success', 'All comparison history has been cleared.');
          },
        },
      ],
    );
  };

  const handleOpenURL = (url: string) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open the link');
    });
  };

  const handleRateApp = () => {
    const iosUrl = 'https://apps.apple.com/app/battledex/id1234567890';
    handleOpenURL(iosUrl);
  };

  const themeValues: Array<'light' | 'dark' | 'system'> = [
    'light',
    'dark',
    'system',
  ];
  const selectedIndex = themeValues.indexOf(themeMode);

  const handleThemeChange = (index: number) => {
    changeTheme(themeValues[index]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView
          style={styles.container}
          edges={Platform.OS === 'ios' ? ['top'] : []}
        >
          {/* Theme Section */}
          <View style={styles.section}>
            <BDTypography style={styles.sectionTitle}>Appearance</BDTypography>
            <View style={styles.settingItem}>
              <View style={styles.themeRow}>
                <BDTypography variant="label">🎨 Theme</BDTypography>
                <SegmentedControl
                  values={['Light', 'Dark', 'System']}
                  selectedIndex={selectedIndex}
                  onChange={event => {
                    handleThemeChange(event.nativeEvent.selectedSegmentIndex);
                  }}
                  style={styles.segmentedControl}
                />
              </View>
            </View>
          </View>

          {/* Data Section */}
          <View style={styles.section}>
            <BDTypography style={styles.sectionTitle}>Data</BDTypography>
            <TouchableOpacity
              style={styles.dangerButton}
              onPress={handleClearHistory}
              disabled={isClearingHistory}
            >
              <BDTypography variant="label" style={styles.dangerButtonText}>
                {isClearingHistory ? '🗑️ Clearing...' : '🗑️ Clear All History'}
              </BDTypography>
            </TouchableOpacity>
          </View>

          {/* Support Section */}
          <View style={styles.section}>
            <BDTypography style={styles.sectionTitle}>Support</BDTypography>
            <TouchableOpacity style={styles.linkButton} onPress={handleRateApp}>
              <BDTypography variant="label">⭐ Rate the App</BDTypography>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() =>
                handleOpenURL('https://example.com/privacy-policy')
              }
            >
              <BDTypography variant="label">📋 Privacy Policy</BDTypography>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() =>
                handleOpenURL('https://example.com/terms-of-service')
              }
            >
              <BDTypography variant="label">📄 Terms of Service</BDTypography>
            </TouchableOpacity>
          </View>

          {/* Disclaimer */}
          <BDTypography style={styles.disclaimerText} variant="caption">
            The text and imagery related to the Pokémon Trading Card Game,
            including card images, are copyrighted materials owned by The
            Pokémon Company. BattleDex is an independent application and is
            neither produced, endorsed, supported, nor associated with The
            Pokémon Company or any Pokémon-related entities.
          </BDTypography>

          {/* App Info */}
          <BDTypography style={styles.versionText} variant="caption">
            BattleDex v1.0.0
          </BDTypography>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
}
