import {ReactNode} from 'react'
import {StyleProp, TextStyle} from 'react-native'

export enum FontStyle {
    'Thin',
    'Regular',
    'SemiBold',
    'Bold',
    'ExtraBold'
}

export interface TextProps {
    children: ReactNode;
    style?: StyleProp<TextStyle>;
    fontStyle?: FontStyle;
}