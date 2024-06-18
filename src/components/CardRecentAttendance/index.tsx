import { StyleProp, TextStyle, ViewProps } from "react-native"
import { View } from "react-native"
import { Text } from "react-native-paper"

type RecentAttendanceCardType = {
    title: string;
    titleStyle?: StyleProp<TextStyle>
    subTitle: string;
    subTitleStyle?: StyleProp<TextStyle>
} & ViewProps

const RecentAttendanceCard = (props: RecentAttendanceCardType) => {
    return(
        <View
        {...props as ViewProps}>
            <Text variant="bodyLarge" style={props.titleStyle}>
                {props.title}
            </Text>
            <Text variant="labelMedium" style={props.subTitleStyle}>
                {props.subTitle}
            </Text>
        </View>
    )
}

export default RecentAttendanceCard