import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../styles';
import { BDTypography } from './BDTypography';
import { useBDToastStyles } from './styles/bdToast.styles';

type ToastType = 'success' | 'error' | 'info';

export interface BDToastHandle {
  show: (options: {
    message: string;
    type?: ToastType;
    duration?: number;
  }) => void;
}

interface BDToastProps {
  defaultDuration?: number;
}

export const BDToast = forwardRef<BDToastHandle, BDToastProps>(
  ({ defaultDuration = 3000 }, ref) => {
    const { theme } = useTheme();
    const styles = useBDToastStyles();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(30)).current;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<ToastType>('success');
    const [duration, setDuration] = useState(defaultDuration);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useImperativeHandle(ref, () => ({
      show: ({ message: msg, type: toastType = 'success', duration: dur }) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        setMessage(msg);
        setType(toastType);
        setDuration(dur || defaultDuration);
        setVisible(true);
      },
    }));

    useEffect(() => {
      if (visible) {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();

        timeoutRef.current = setTimeout(() => {
          Animated.parallel([
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(translateY, {
              toValue: 30,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start(() => {
            setVisible(false);
          });
        }, duration);

        return () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        };
      }
    }, [visible, duration, fadeAnim, translateY]);

    if (!visible) {
      return null;
    }

    const getIconName = () => {
      switch (type) {
        case 'success':
          return 'check-circle';
        case 'error':
          return 'alert-circle';
        case 'info':
          return 'information';
        default:
          return 'check-circle';
      }
    };

    const getBackgroundColor = () => {
      switch (type) {
        case 'success':
          return theme.colors.success;
        case 'error':
          return theme.colors.danger;
        case 'info':
          return theme.colors.primary;
        default:
          return theme.colors.success;
      }
    };

    return (
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: getBackgroundColor(),
            opacity: fadeAnim,
            transform: [{ translateY }],
          },
        ]}
      >
        <Icon name={getIconName()} size={24} color="#FFF" style={styles.icon} />
        <BDTypography variant="body" style={styles.message}>
          {message}
        </BDTypography>
      </Animated.View>
    );
  },
);

BDToast.displayName = 'BDToast';
