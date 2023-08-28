import React from 'react'
import { Controller, useController } from 'react-hook-form';
import {View} from 'react-native'
import { TextInput, Text } from 'react-native-paper'
import { Control } from 'react-hook-form'
import Icon from 'react-native-vector-icons/AntDesign'
import { TextInputProps } from '../types/input';
import { StyleSheet } from 'react-native';

const Input: React.FC<TextInputProps> = ({ label, onPressIn, control = undefined, name, rules = {}, placeHolder, textContentType, secureEntryText, icon = ""}) => {

    const iconHandler = () => {
        return <Icon name={icon} size={24} style={{color: '#585667'}} color='#585667' />
    }

    return (
        <Controller 
            control={control}
            name={name}
            rules={rules}
            defaultValue=""
            render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <View>
                    <TextInput
                    key={name}
                    placeholder={placeHolder}
                    secureTextEntry={secureEntryText}
                    textContentType={textContentType}

                    label={label}

                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}

                    onPressIn={onPressIn}

                    placeholderTextColor='#7FA8D2'
                    outlineColor={error? inputStyle.error.color : "#FFFFFF"}
                    activeOutlineColor={error ? inputStyle.error.color : "#296EB4"}
                    textColor="#548BC3"
                    mode="outlined"

                    left={
                        icon !== "" && <TextInput.Icon icon={iconHandler} />
                    }

                    style={{backgroundColor: '#FFFFFF'}} />
                    {error  && (
                        <Text style={inputStyle.error}>{error.message || 'Error'}</Text>
                    )}
                </View>
            )}
        />
    )
}

const inputStyle = StyleSheet.create({
    error: {
        color: '#EB002B'
    },
    default: {
        color: '#FFFFFF'
    }
})

export {Input}