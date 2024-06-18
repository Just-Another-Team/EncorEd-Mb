import React from "react"
import { Controller, FieldValues, UseControllerProps } from "react-hook-form"
import { StyleSheet, View } from "react-native"
import { RadioButton, Text } from "react-native-paper"

type RadioGroupType<T extends FieldValues> = {
    children: React.ReactNode;
} & UseControllerProps<T>

const ControlledRadioGroup = <T extends FieldValues>({
    name,
    control,
    children
}: RadioGroupType<T>) => {

    return(
        <Controller
        control={control}
        name={name}
        render={({
            field: { value, onChange },
            fieldState: { error }
        }) => (
            <RadioButton.Group
            value={value}
            onValueChange={onChange}>
                {/* Put in a separate component */}
                <View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        { children }
                    </View>
                    <View>
                        <Text variant="bodySmall">{error?.message}</Text>
                    </View>
                </View>
            </RadioButton.Group>
        )}/>
    )
}

type ChoiceType = {
    label: string;
    value: string;
}
const Choice = ({
    label,
    value
}: ChoiceType) => {
    return(
        <View style={radioGroupStyle.radioButtonContainer}>
            <RadioButton value={value} />
            <Text style={radioGroupStyle.radioText}>{label}</Text>
        </View>
    )
}

ControlledRadioGroup.RadioButton = Choice

const radioGroupStyle = StyleSheet.create({
    radioButtonContainer: {
        display: 'flex',
        flex: 1,
        flexDirection:'row',
        alignItems: 'center'
    },
    radioText: { flex: 1 }
})

export default ControlledRadioGroup