import React from 'react';
import { Text, View } from 'react-native';
import { BDButton } from './BDButton';
import { BDTypography } from './BDTypography';
import { useErrorMessageStyles } from './styles/errorMessage.style';

type ErrorMessageProps = {
  message: string;
  retryLabel?: string;
  onRetry?: () => void;
};

export function ErrorMessage({
  message,
  retryLabel = 'Try again',
  onRetry,
}: ErrorMessageProps) {
  const styles = useErrorMessageStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>
      <BDTypography variant="body" style={styles.message}>
        {message}
      </BDTypography>
      {onRetry && (
        <BDButton variant="text" onPress={onRetry} title={retryLabel} />
      )}
    </View>
  );
}
