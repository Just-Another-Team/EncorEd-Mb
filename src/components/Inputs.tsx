import React from 'react'
import { Controller, useController } from 'react-hook-form';
import {View} from 'react-native'
import { TextInput, Text } from 'react-native-paper'
import { Control } from 'react-hook-form'
import Icon from 'react-native-vector-icons/AntDesign'

type TextInputProps = {
    placeHolder: string | undefined;
    icon: string;
    secureEntryText: boolean;
    control: Control;
    textContentType: any;
    required?: true | false;
    name: string;
} & React.ComponentProps<typeof TextInput>;

const Input: React.FC<TextInputProps> = ({ control, name, required=false, placeHolder, textContentType, secureEntryText, icon}) => {

    const iconHandler = () => {
        return <Icon name={icon} size={24} style={{color: '#585667'}} color='#585667' />
    }

    return (
        <View>
            <Controller 
                control={control}
                name={name}
                rules={{
                    required: required
                }}
                render={({field: {value, onChange, onBlur}}) => (
                    <TextInput
                    key={name}
                    placeholder={placeHolder}
                    secureTextEntry={secureEntryText}
                    textContentType={textContentType}

                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}

                    placeholderTextColor='#7FA8D2'
                    outlineColor="#FFFFFF"
                    activeOutlineColor="#296EB4"
                    textColor="#548BC3"
                    mode="outlined"

                    left={
                        <TextInput.Icon
                        icon={iconHandler}
                        />
                    }
                    style={{backgroundColor: '#FFFFFF'}} />
                )}
            />
            {/* <Text style={{color: '#FF002F'}}>Hello World!</Text> */}
        </View>
    )
}

export {Input}