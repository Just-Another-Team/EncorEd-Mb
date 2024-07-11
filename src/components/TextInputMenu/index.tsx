import { useMemo, useState } from 'react'
import { StyleSheet, View } from "react-native"
import { HelperText, MD3Theme, useTheme } from "react-native-paper"
import { Control, Controller, FieldValues, UseControllerProps } from "react-hook-form";
import DropDown from "react-native-paper-dropdown";
import Color from '../../assets/styles/Color';
import { FixMeLater } from '../../types/FixMeLater';

// type TextInputMenuType<T extends FieldValues> = {
//     control: Control<FieldValues> | undefined,
//     name: string,
//     label: string,
//     items: Array<{
//         label: string;
//         value: string | number;
//         custom?: React.ReactNode;
//     }>,
// } & UseControllerProps<T>

type TextInputMenuType<T extends FieldValues> = {
    label: string,
    items: Array<{
        label: string;
        value: string | number;
        custom?: React.ReactNode;
    }>,
} & UseControllerProps<T>

const ControlledTextInputMenu = <T extends FieldValues>({
    control,
    name,
    label,
    items
}: TextInputMenuType<T>) => {
    const theme = useTheme();

    const [showItems, setShowItems] = useState<boolean>(false);

    const handeOnDismiss = () => { setShowItems(false) }
    const handleShowDropDown = () => { setShowItems(true) }
  
    const styles = useMemo(() => dropDownStyle(theme), [theme])

    return (
        <Controller
        control={control}
        name={name}
        render={({
            field: { value, onChange },
            fieldState: { error }
        }) => (
            <View>
                <DropDown
                mode="outlined"
                visible={showItems}
                onDismiss={handeOnDismiss}
                showDropDown={handleShowDropDown}
                value={value}
                setValue={onChange}
                list={items}
                label={label}
                theme={dropDownTheme(theme)}
                dropDownStyle={styles.container}
                dropDownItemSelectedTextStyle={styles.itemSelectedText}
                dropDownItemSelectedStyle={styles.itemSelected}
                dropDownItemStyle={styles.item}
                dropDownItemTextStyle={styles.itemText}/>

                <HelperText
                type="error"
                visible={true}>
                    {error?.message}
                </HelperText>
            </View>
        )}/>
    )
}

const dropDownTheme = (theme: MD3Theme) => (
    {
        colors: {
            elevation: {
                level2: Color('white', 400) as string,
            },
        }
    }
)

const dropDownStyle = (theme: MD3Theme) => StyleSheet.create({
    container: {},
    itemSelectedText: {
        color: Color('white', 400) as string
    },
    itemSelected: {
        backgroundColor: Color('primaryBlue', 300) as string
    },
    item: {},
    itemText: {
        color: Color('black', 300) as string
    },
})

export default ControlledTextInputMenu