import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type SkeletonProps = {
  isLoading: boolean;
  children: React.ReactNode;
  borderRadius?: number;
};

export function Skeleton({
  isLoading,
  children,
  borderRadius = 0,
}: SkeletonProps) {
  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <SkeletonPlaceholder borderRadius={borderRadius}>
      {children}
    </SkeletonPlaceholder>
  );
}
