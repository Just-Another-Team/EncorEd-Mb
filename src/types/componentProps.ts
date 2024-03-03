import { OnPressEvent } from '@rnmapbox/maps/lib/typescript/types/OnPressEvent';
import { Position } from '@rnmapbox/maps/lib/typescript/types/Position';
import {ReactNode} from 'react'
import {StyleProp, TextStyle} from 'react-native'
import { FixMeLater } from './FixMeLater';

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

export interface CampusMapProps {
    centerCoordinate: Position;
    zoom: number;
    filter?: any;
    floor?: string;
    onPress?: ((event: OnPressEvent | FixMeLater) => void) | undefined
}

export interface RoomLocation {
    longitude: number,
    latitude: number,
    roomName: string
}