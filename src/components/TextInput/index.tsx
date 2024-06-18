import { Control, Controller, FieldValues, RegisterOptions, UseControllerProps } from "react-hook-form"
import { HelperText, TextInput, TextInputProps } from "react-native-paper"
import { FixMeLater } from "../../types/FixMeLater"
import { View } from "react-native"

type ControlledTextInputType<T extends FieldValues> = TextInputProps & UseControllerProps<T>

const ControlledTextInput = <T extends FieldValues>(props: ControlledTextInputType<T>) => {

    // const iconHandler = () => {
    //     return <Icon name={icon} size={24} style={{color: '#585667'}} color='#585667' />
    // }
    
    return (
        <Controller 
        control={props.control}
        name={props.name}
        rules={props.rules}
        render={({
            field: {value, onChange, onBlur},
            fieldState: { error }
        }) => (
            <View>
                <TextInput
                value={value}
                onChangeText={onChange as any}
                onBlur={onBlur}
                {...props as TextInputProps}/>

                <HelperText
                type="error"
                visible={true}>
                    {error?.message}
                </HelperText>
            </View>
        )}
        />
    )
}

export default ControlledTextInput