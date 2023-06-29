import { ColorValue, StyleSheet } from "react-native";

export const colors: ColorValue | any = (shades: number = 400) => {
    return (
        {
            primaryBlue: {
                color: 
                    shades === 100 ? "#A2D0FE" :  
                    shades === 200 ? "#74B8FD" :
                    shades === 300 ? "#45A1FD" : "#1789FC"
            },
            darkBlue: {
                color: 
                    shades === 100 ? "#A9C5E1" :  
                    shades === 200 ? "#7FA8D2" :
                    shades === 300 ? "#548BC3" : "#296EB4"
            },
            gold: {
                color: 
                    shades === 100 ? "#FEE3AD" :  
                    shades === 200 ? "#FED485" :
                    shades === 300 ? "#FDC65C" : "#FDB833"
            },
            paleYellow: {
                color: 
                    shades === 100 ? "#FFECCA" :  
                    shades === 200 ? "#FFE3B0" :
                    shades === 300 ? "#FFD995" : "#FFD07B"
            }
            //black
            //white
        }
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 12,
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: colors(300).darkBlue,
        padding: 28
    },
    centerText: {
        textAlign: 'center'
    },
    h1: {
        fontSize: 48,
        fontWeight: 'bold',
        fontFamily: 'Inter'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: colors().darkBlue
    },
    p: {
        fontSize: 20,
    }
})