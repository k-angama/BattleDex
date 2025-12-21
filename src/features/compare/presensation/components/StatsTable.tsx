import React from 'react';
import { View, ViewStyle } from 'react-native';
import { StatsRowProps } from './StatsRow';

type StatsTableProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function StatsTable({ children, style }: StatsTableProps) {
  const rows = React.Children.toArray(children).filter(React.isValidElement);

  return (
    <View style={style}>
      {rows.map((child, index) =>
        React.cloneElement(child as React.ReactElement<StatsRowProps>, {
          style: index === rows.length - 1 ? { borderBottomWidth: 0 } : {},
        }),
      )}
    </View>
  );
}
