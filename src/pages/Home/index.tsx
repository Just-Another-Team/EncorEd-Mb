import { useMemo } from "react"
import { View, StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { MD3Theme, Text, useTheme } from "react-native-paper"
import OngoingSubjects from "./OngoingSubjects"
import GraphAttendance from "./GraphAttendance"
import AttendanceCount from "./AttendanceCount"
import RecentAttendance from "./RecentAttendance"
import Color from "../../assets/styles/Color"
import useClock from "../../hooks/useClock"


const Home = () => {
    const theme = useTheme()

    const styles = useMemo(() => homeStyles(theme), [theme])

    return(
        <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contextContainer}>

            {/* Graph of today's present, late, and absent. Pie Graph or Bar Chart */}
            <GraphAttendance
            styles={styles}/>
            {/* Numbers of today's present, late, and absent */}
            <AttendanceCount
            styles={styles}/>

            <OngoingSubjects
            styles={styles}/>

            {/* Recently submitted attendances */}
            <RecentAttendance
            styles={styles}/>
        </ScrollView>
    )
}

const homeStyles = (theme: MD3Theme) => StyleSheet.create({
    container: {},
    contextContainer: {
        gap: 16,
        padding: 16,
    },
    contentContainer: {
        padding: 12,
        backgroundColor: Color("white", 200),
        borderRadius: 8,
    },
    
    cardStyle: {
        backgroundColor: Color("primaryBlue", 100),
        borderRadius: 4,
        shadowColor: Color("black", 400),
    },
    cardTextStyle: {
        color: Color("black", 400)
    }
})

export default Home