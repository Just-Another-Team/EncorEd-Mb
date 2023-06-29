import React, {FC} from 'react'
import {Text} from 'react-native-paper'
import { TextProps} from '../types/componentProps'
import { StyleSheet, TextStyle } from 'react-native'

const fontWeightHandler = (fontStyle: 'bold' | 'normal' | 'light' | 'thin' | any) => {
    let weight: any = 'normal'

    if (fontStyle === 'bold') weight = '700'
    if (fontStyle === 'normal') weight = '400'
    if (fontStyle === 'light') weight = '300'
    if (fontStyle === 'thin') weight = '100'

    return weight;
}

const EText: FC<TextProps> = ({children, style, fontStyle}) => {
    return(
        <Text
        style={{
            color: '#1F1F29',
            fontSize: 24,
            fontWeight: fontWeightHandler(fontStyle),
            marginBottom: 4}}
        >
            {children}
        </Text>
    )
}