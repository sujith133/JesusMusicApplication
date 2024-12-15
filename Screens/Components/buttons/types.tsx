import {ReactNode, ComponentProps} from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import MaterailCommunityIcons from 'react-native-vector-icons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export interface ButtonProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  socialNetwork?: string;
  icon?: ComponentProps<typeof MaterialCommunityIcons>['name'];
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}

export interface BackButtonProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  socialNetwork?: string;

  icon?: ComponentProps<typeof MaterialCommunityIcons>['name'];
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}

export interface OvalShapeButton {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  name?: string;
  active?: boolean;
  inactive?: boolean;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}
