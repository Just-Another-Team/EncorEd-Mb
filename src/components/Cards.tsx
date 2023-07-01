import React from 'react'
import {View, StyleSheet, Image, DimensionValue, ImageSourcePropType} from 'react-native'
import {Text} from 'react-native-paper'

type CardProps = {
    image?: ImageSourcePropType
    children: React.ReactNode //Uhm, yeah no
}

const ImageCard: React.FC<CardProps> = ({children,}: CardProps) => {
    return (
        <View style={[cardStyle.card, cardStyle.cardBorders, {height: 180,}]}>
            <Text style={cardStyle.cardTextColor}>{children}</Text>
        </View>
    )
}

const HeaderCard: React.FC<CardProps> = ({image, children}: CardProps) => {
    return (
        <View style={[cardStyle.card, {height: 208}]}>
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
                    <Text variant='headlineSmall' numberOfLines={1} style={[cardStyle.cardTextColor, {fontWeight: '700'}]}>{children}</Text>
                </View>
            </View>
        </View>
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