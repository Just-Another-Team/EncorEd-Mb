import { Controller } from "react-hook-form"
import { RadioButton, Text } from "react-native-paper"
import { FixMeLater } from "../../types/FixMeLater"
import { View } from "react-native"

const MainRadioButton = ({ label, value }: FixMeLater) => {
    return (
        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: "flex-end" }}>
            <Text>{label}</Text>
            <RadioButton value={value}/>
        </View>
    )
}

const MainRadioGroup = ({
    //react hook form props
    control,
    name,
    rules,

    //List of RadioButtons
    items,

    //RadioButtonGroup Props
}: FixMeLater) => {
    
    return (
        <Controller 
        control={control}
        name={name}
        rules={rules}
        render={({field: {value, onChange}}) => (
            <RadioButton.Group value={value} onValueChange={onChange}>
                {items.map((item: FixMeLater, ind: number) => (<MainRadioButton key={ind} label={item.label} value={item.value}/>))}
            </RadioButton.Group>
        )}
        />
    )
}

export default MainRadioGroup