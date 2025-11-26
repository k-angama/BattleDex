import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity onPress={onRetry}>
          <Text style={styles.retry}>{retryLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
    marginBottom: 8,
  },
  message: {
    textAlign: 'center',
    color: '#B91C1C',
    fontSize: 14,
    fontWeight: '600',
  },
  retry: {
    marginTop: 12,
    color: '#2563EB',
    fontWeight: '700',
  },
});
