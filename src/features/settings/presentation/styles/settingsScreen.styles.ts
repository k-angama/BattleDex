import { useHeaderHeight } from '@react-navigation/elements';
import { useMemo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useTheme } from '../../../../common/styles';

export const useStyles = () => {
  const { theme } = useTheme();
  const headerHeight = useHeaderHeight();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        scrollContent: {
          paddingTop: Platform.OS === 'ios' ? 0 : headerHeight,
          paddingHorizontal: theme.spacing.lg,
          paddingBottom: theme.spacing.xl,
        },
        title: {
          fontSize: theme.typography.size.xxl,
          fontFamily: theme.typography.family.bold,
          color: theme.colors.text,
          marginBottom: theme.spacing.lg,
          marginTop: theme.spacing.md,
        },
        section: {
          marginTop: theme.spacing.lg,
        },
        sectionTitle: {
          fontSize: theme.typography.size.sm,
          fontWeight: '600',
          color: theme.colors.textMuted,
          marginBottom: theme.spacing.md,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
        settingItem: {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.md,
          marginBottom: theme.spacing.sm,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        settingLabel: {
          fontSize: theme.typography.size.md,
          fontWeight: '500',
          color: theme.colors.primary,
        },
        themeRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        segmentedControl: {
          width: '60%',
        },
        dangerButton: {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.md,
          marginBottom: theme.spacing.sm,
          borderWidth: 1,
          borderColor: theme.colors.danger,
        },
        dangerButtonText: {
          color: theme.colors.danger,
        },
        linkButton: {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.md,
          marginBottom: theme.spacing.sm,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        versionText: {
          fontSize: theme.typography.size.sm,
          color: theme.colors.textMuted,
          textAlign: 'center',
          marginTop: theme.spacing.lg,
          marginBottom: theme.spacing.lg,
        },
        disclaimerText: {
          marginTop: theme.spacing.lg,
          fontSize: theme.typography.size.xs,
          color: theme.colors.textMuted,
          textAlign: 'center',
          marginHorizontal: theme.spacing.lg,
          marginBottom: theme.spacing.lg,
          lineHeight: 18,
        },
      }),
    [theme, headerHeight],
  );

  return { styles };
};
