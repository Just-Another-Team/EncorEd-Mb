import React from 'react'
import {View, StyleSheet, Image, DimensionValue, ImageSourcePropType, TouchableOpacity, GestureResponderEvent} from 'react-native'
import {Text} from 'react-native-paper'

type CardProps = {
    image: ImageSourcePropType;
    key?: any | unknown;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    text?: string; //Uhm, yeah no
    width?: number;
    children?: React.ReactNode
}

const ImageCard: React.FC<CardProps> = ({image, key, onPress, width}: CardProps) => {
    return (
        <TouchableOpacity key={key} onPress={onPress}>
            <View
            style={[cardStyle.card, cardStyle.cardBorders, {height: 180, width: width, flex: 1}]}>
                <Image
                style={{
                    width: '100%',
                    height:'100%'
                }}
                source={image}
                /> 
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

const SubjectCard = ({title, onPress, key, edpCode, schedule}:any) => {
    return(
        <TouchableOpacity onPress={onPress}>
            <View key={key} style={{backgroundColor: "#FAFAFA", padding: 16, gap: 8, borderRadius: 8}}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}> 
                    <Text variant='titleLarge'>{title}</Text>
                    <Text>{edpCode}</Text>
                </View>
                <Text>{schedule}</Text>
            </View>
        </TouchableOpacity>
    )   
}

const EventCard = ({title, onPress, key, date, schedule}:any) => {
    return(
        <TouchableOpacity onPress={onPress}>
            <View key={key} style={{backgroundColor: "#FAFAFA", padding: 16, gap: 8, borderRadius: 8}}>
                <Text variant='titleLarge'>{title}</Text>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}> 
                    <Text>{date}</Text>
                    <Text>{schedule}</Text>   
                </View>
            </View>
        </TouchableOpacity>
    )   
}

export {ImageCard, HeaderCard, SubjectCard, EventCard}

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