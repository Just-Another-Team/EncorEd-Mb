import React, { useEffect } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { IsValid } from '../../../types/IsValid'
import ReportTable from './ReportTable'
import { useAppDispatch, useAppSelector } from '../../../app/encored-redux-hooks'
import { getAttendances } from '../../../app/features/attendance/attendanceSlice'
import IAttendance from '../../../types/IAttendance'

const Report = () => {
    const institution = useAppSelector(state => state.institution)
    const attendances = useAppSelector(state => state.attendance)

    const attendanceDispatch = useAppDispatch();
    
    useEffect(() => {
        attendanceDispatch(getAttendances(institution.data!.id))
    }, [])

    return(
        <ScrollView contentContainerStyle={{padding: 20, gap: 16}}>
            <View style={[style.card, { backgroundColor: "#1A73CC" }]}>
                <Text variant='titleMedium' style={[style.cardText, { flex: 1 }]}>
                    Approved Attendances
                </Text>
                <Text variant='titleLarge' style={[style.cardText, { textAlign: "right" }]}>{attendances.data.filter((item: IAttendance) => item.status === IsValid.approve).length}</Text>
            </View>

            <View style={[style.card, { backgroundColor: "#FFDA62" }]}>
                <Text variant='titleMedium' style={[style.cardText, { flex: 1, color: "#1F1F29" }]}>
                    Pending Attendances
                </Text>
                <Text variant='titleLarge' style={[style.cardText, { textAlign: "right", color: "#1F1F29"}]}>{attendances.data.filter((item: IAttendance) => item.status === IsValid.pending).length}</Text>
            </View>

            <View style={{backgroundColor: "#FEFEFE", borderRadius: 10}}>
                <Text style={style.sectionHeader} variant='titleMedium'>Submitted Attendances</Text>

                <ReportTable listItems={attendances.data} />
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 12,
        paddingRight: 28,
        borderRadius: 10,
    },
    attendanceData: {
        flexDirection: 'row',
        gap: 16,
    },
    cardText: {
        color: "#FEFEFE"
    },
    sectionHeader: {
        margin: 16,
        color: "#296EB4"
    },
})

export default Report