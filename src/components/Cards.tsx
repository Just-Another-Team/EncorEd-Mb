import React from 'react'
import {View, StyleSheet, Image, DimensionValue, ImageSourcePropType, TouchableOpacity, GestureResponderEvent} from 'react-native'
import {Text} from 'react-native-paper'

type CardProps = {
    image: ImageSourcePropType;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    text?: string; //Uhm, yeah no
    width?: number;
    children?: React.ReactNode
}

const ImageCard: React.FC<CardProps> = ({image, onPress, width}: CardProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
            style={[cardStyle.card, cardStyle.cardBorders, {height: 180, width: width, flex: 1}]}>
                <Image
                style={{
                    width: '100%',
                    height:'100%'
                }}
                source={image}
                /> 
                {/* <Text
                style={cardStyle.cardTextColor}>{children}</Text> */}
            </View>
        </TouchableOpacity>
    )
}

const HeaderCard: React.FC<CardProps> = ({image, onPress, text}: CardProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
            style={[cardStyle.card, {height: 208, flexShrink: 0}]}>
                <Image
                style={{
                    width: '100%',
                    height:'100%'
                }}
                source={image}
                /> 

                <View style={{position: 'absolute', width: '100%', height: 64, bottom: 0,}}>
                    <View style={{
                        backgroundColor: '#A9C5E1BF',
                        width: '100%', height: '100%',
                        position: 'absolute',
                        justifyContent: 'center',
                        paddingLeft: 24,
                        paddingRight: 24,
                        
                    }}>
                        <Text variant='headlineSmall' numberOfLines={1} style={[cardStyle.cardTextColor, {fontWeight: '700'}]}>{text}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export {ImageCard, HeaderCard}

const cardStyle = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',
    },
    cardBorders: {
        borderStyle: 'solid',
        borderColor: '#296EB4',
        borderWidth: 4,
    },
    cardTextColor: {
        color: '#000000'
    }
})