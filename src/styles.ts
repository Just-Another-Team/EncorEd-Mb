import { ColorValue, StyleSheet } from "react-native";
import { DefaultTheme } from "react-native-paper";

type Color = 'primaryBlue' | 'darkBlue' | 'gold' | 'paleYellow'
type ColorValueType = (shades?: number | undefined) => ColorValue

const primaryBlue: ColorValueType = (shades: number = 400) => (
    shades === 100 ? "#A2D0FE" :  
    shades === 200 ? "#74B8FD" :
    shades === 300 ? "#45A1FD" : "#1789FC"
)

const darkBlue: ColorValueType = (shades: number = 400) => (
    shades === 100 ? "#A9C5E1" :  
    shades === 200 ? "#7FA8D2" :
    shades === 300 ? "#548BC3" : "#296EB4"
)

const gold: ColorValueType = (shades: number = 400) => (
    shades === 100 ? "#FEE3AD" :  
    shades === 200 ? "#FED485" :
    shades === 300 ? "#FDC65C" : "#FDB833"
)

const paleYellow: ColorValueType = (shades: number = 400) => (
    shades === 100 ? "#FFECCA" :  
    shades === 200 ? "#FFE3B0" :
    shades === 300 ? "#FFD995" : "#FFD07B"
)

export const colors = (colorType: Color, shades?: number) => (
    colorType === "primaryBlue"? primaryBlue(shades) :
    colorType === "darkBlue" ? darkBlue(shades):
    colorType === "gold" ? gold(shades):
    colorType === "paleYellow" ? paleYellow(shades) : ""    
)

//Change name of the theme
export const TestTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        text: "#1F1F29"
    }
}

export const styles = StyleSheet.create({
    debugBorders: {
        borderWidth: 1,
        borderColor: 'orange',
        borderStyle: "solid"
    },
    container: {
        flex: 1,
        gap: 12,
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: colors("darkBlue", 300),
        padding: 28
    },
    centerText: {
        textAlign: 'center'
    },
    //These do not exist because of React Native Paper
    h1: {
        fontSize: 48,
        fontWeight: 'bold',
        fontFamily: 'Inter'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: colors("darkBlue", 400)
    },
    p: {
        fontSize: 20,
    }
})