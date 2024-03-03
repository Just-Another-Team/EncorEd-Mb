import { 
    MD3LightTheme as DefaultTheme
 } from "react-native-paper";
import Color from "./Color";
import { ThemeProp } from "react-native-paper/lib/typescript/src/types";

//Change name of the theme
export const Theme: ThemeProp = {
    ...DefaultTheme,
    dark: false,
    version: 3,
    //myOwnProperty: true,
    colors: {
        ...DefaultTheme.colors,

        primary: Color("primaryBlue", 400) as string, //Color on a primary colored component, Icons on a Chip
        // onPrimary: Color("black", 400) as string, //Text or Icons on a primary colored component

        primaryContainer: Color("primaryBlue", 100) as string, //FAB
        // onPrimaryContainer: Color("darkBlue", 400) as string,

        secondary: Color("darkBlue", 400) as string,
        secondaryContainer: Color("darkBlue", 100) as string, //Color on a secondary colored component, (Contained-Tonal Button (Background), Chip)
        onSecondaryContainer: Color("black", 400) as string, //Text on a secondary colored component

        tertiary: Color("gold", 400) as string,

        outline: Color("primaryBlue", 200) as string, //Outline Button Border
        // error: "#000000",

        surface: Color("darkBlue", 400) as string, 
        onSurface: Color("black", 400) as string, //Text
    }
}