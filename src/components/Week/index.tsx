import { StyleSheet, View } from "react-native"
import { Text } from 'react-native-paper'
import Color from "../../assets/styles/Color"
import dayjs from "dayjs"
import weekDays from "../../types/weekDays"

type WeekType = {
    selectedWeeks?: Array<string>
}

const Week = (props: WeekType) => {

    const { selectedWeeks } = props

    // Change the weeks into an

    return (
        <View
        style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        }}>             
            { weekDays.map((el, ind) => (
                <View
                key={ind}
                style={[
                    {
                        height: 48,
                        width: 48,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 256,
                    },
                    //weekStyles.default,
                    //weekStyles.highlight
                    dayjs().day() === el.value ? weekStyles.highlightCurrent : selectedWeeks?.includes(el.label) ? weekStyles.highlight : weekStyles.default
                ]}>
                    <Text
                    variant='titleMedium'
                    style={
                        //weekStyles.highlightText
                        selectedWeeks?.includes(el.label) || dayjs().day() === el.value ? weekStyles.highlightText : undefined
                    }>
                        { el.label === "Tuesday" ? "Tu" : el.label === "Thursday" ? "Th" : el.label.charAt(0) }
                    </Text>
                </View>
            )) }
        </View>
    )
}

const weekStyles = StyleSheet.create({
    highlight: {
        backgroundColor: Color('primaryBlue', 200),
    },
    highlightCurrent: {
        backgroundColor: Color('primaryBlue', 400),
    },
    highlightText: {
        color: Color('white', 400)
    },
    default: {
        borderWidth: 1,
    }
})

export default Week