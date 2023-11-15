import React, { useEffect } from 'react'
import { Controller, useController } from 'react-hook-form';
import {View} from 'react-native'
import { TextInput, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign'
import { TextInputProps } from '../types/input';
import { StyleSheet } from 'react-native';

const Input: React.FC<TextInputProps> = ({ 
    label,
    onPressIn,
    control,
    name,
    rules = {},
    placeHolder,
    textContentType,
    secureEntryText,
    icon = "",
    formError,
    watch
}) => {

    // useEffect(() => {
    //     const subscription = watch((data) => console.log(data.password));
    //     return () => subscription.unsubscribe()
    // }, [watch])

    const iconHandler = () => {
        return <Icon name={icon} size={24} style={{color: '#585667'}} color='#585667' />
    }
    
    return (
        <Controller 
            control={control}
            name={name}
            rules={rules}
            render={({field: {value, onChange, onBlur}}) => (
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

                        placeholderTextColor='#868e96'
                        outlineColor={"#FFFFFF"}
                        activeOutlineColor={"#296EB4"}
                        error={Boolean(formError)}
                        textColor="#548BC3"
                        mode="outlined"

                        //right={(name === "password") && <TextInput.Icon onPress={() => {console.log("Password Eye Pressed")}} icon={() => <Icon name='eyeo' size={24} style={{color: '#a19fb3'}} color='#a19fb3' />} />}
                        left={ icon !== "" && <TextInput.Icon icon={iconHandler} /> }

                        style={{backgroundColor: '#FFFFFF'}}
                    />
                    {Boolean(formError)  && (
                        <Text style={inputStyle.error}>{formError?.message || 'Error'}</Text>
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