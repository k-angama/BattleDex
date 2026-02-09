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
import { SafeAreaView } from 'react-native-safe-area-context';
import { BDTypography } from '../../../common/components/BDTypography';
import { compareCardsStore } from '../../../common/services/CompareCardsStore';
import { useTheme } from '../../../common/styles';
import { useStyles } from './styles/settingsScreen.styles';
import { useSettingsViewModel } from './useSettingsViewModel';

export function SettingsScreen() {
  const { styles } = useStyles();
  const { setThemeMode, themeMode } = useTheme();
  const { changeTheme, clearHistory, isClearingHistory } =
    useSettingsViewModel();

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
            const result = await clearHistory();
            if (result.success) {
              Alert.alert(
                'Success',
                'All comparison history has been cleared.',
              );
              compareCardsStore.removeAllCards();
              return;
            }
            Alert.alert(
              'Error',
              result.error ?? 'Unable to clear history. Please try again.',
            );
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
    const androidUrl =
      'https://play.google.com/store/apps/details?id=com.battledex';
    const storeUrl = Platform.OS === 'ios' ? iosUrl : androidUrl;

    if (!storeUrl) {
      Alert.alert(
        'Unavailable',
        'App Store link is not available for this platform.',
      );
      return;
    }

    handleOpenURL(storeUrl);
  };

  const themeValues: Array<'light' | 'dark' | 'system'> = [
    'light',
    'dark',
    'system',
  ];
  const selectedIndex = themeValues.indexOf(themeMode);

  const handleThemeChange = (index: number) => {
    const selectedMode = themeValues[index];
    changeTheme(selectedMode);
    setThemeMode(selectedMode);
  };

  return (
    <SafeAreaView edges={[]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
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
            onPress={() => handleOpenURL('https://example.com/privacy-policy')}
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
          including card images, are copyrighted materials owned by The Pokémon
          Company. BattleDex is an independent application and is neither
          produced, endorsed, supported, nor associated with The Pokémon Company
          or any Pokémon-related entities.
        </BDTypography>

        {/* App Info */}
        <BDTypography style={styles.versionText} variant="caption">
          BattleDex v1.0.0
        </BDTypography>
      </ScrollView>
    </SafeAreaView>
  );
}
