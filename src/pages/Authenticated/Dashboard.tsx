import React, { isValidElement, useEffect, useState } from 'react'
import {Alert, ScrollView, StyleSheet, View} from 'react-native'
import { FAB, List, Text } from 'react-native-paper'
import { Input } from '../../components/Inputs'
import { useForm } from 'react-hook-form'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { navigate } from '../../routes/RootNavigation'
import { ImageCard } from '../../components/Cards'
import { EventImage, SubjectImage } from '../../types/images'
import { Calendar } from 'react-native-calendars'
import { useAppDispatch, useAppSelector } from '../../app/encored-redux-hooks'
import { FixMeLater } from '../../types/FixMeLater'
import { IsValid } from '../../types/IsValid'
import IAttendance, { AttendanceType } from '../../types/IAttendance'
import dayjs from 'dayjs'
import { getAttendances } from '../../app/features/attendance/attendanceSlice'

const Dashboard = () => {
    const user = useAppSelector(state => state.authentication.user);
    const institution = useAppSelector(state => state.institution)
    const role = useAppSelector(state => state.role.data)
    const attendances = useAppSelector(state => state.attendance)

    const attendanceDispatch = useAppDispatch();

    useEffect(() => {
        attendanceDispatch(getAttendances(institution.data!.id))
    }, [])

    return(
        <ScrollView style={{}} contentContainerStyle={{paddingLeft: 20, paddingBottom: 20, paddingRight: 20, gap: 8, flex: 1}}>
            <View style={{backgroundColor: '#F9F9FF', marginTop: 10, borderRadius: 8, padding: 16}}>
                <Text style={{color: '#FDB833', fontSize: 28, fontWeight: '700'}}>Welcome</Text>
                <Text style={{color: '#1789FC', fontSize: 32, fontWeight: '700'}}>{`${user?.firstName} ${user?.lastName}`}</Text>
            </View>

            <View style={style.attendanceData}>
                <View style={[style.card, {backgroundColor: "#1A73CC"}]}>
                    <Text variant='titleMedium' style={style.cardText}>
                        Validated Attendances
                    </Text>
                    <Text variant='headlineSmall' style={[style.cardText, {flex: 1, textAlign: 'right'}]}>{attendances.data.filter(item => item.status !== IsValid.pending).length}</Text>
                </View>
            </View>

            <View style={{backgroundColor: "#FEFEFE", borderRadius: 10}}>
                <Text style={style.sectionHeader} variant='titleMedium'>Recently Submitted Attendances</Text>
                <List.Section>
                    {role.teacher ?
                        attendances.data
                        .filter((item: IAttendance) => item.submitBy === user?.id)
                        .sort((item1: IAttendance, item2: IAttendance) => dayjs(item2.submitAt).toDate().getTime() - dayjs(item1.submitAt).toDate().getTime())
                        .slice(0, 5)
                        .map((item: IAttendance, ind: number) => (
                            <List.Item
                            key={ind}
                            title={() => <Text variant='titleLarge'>{item.roomName}</Text>}
                            onPress={() => { navigate("Room", item) }}
                            description={() => (
                                <View>
                                    <Text>{dayjs(item.submitAt).format("MMMM DD, YYYY")}</Text>
                                    {role.employee ? <Text style={style.ownerText}>Submitted by {item.submitBy}</Text> : undefined}
                                </View>
                            )}
                            right={props => (
                                role.teacher ? 
                                <Text style={[props.style, item.status === IsValid.pending ? style.pendingText : item.status === IsValid.approve ? style.validText : style.invalidText ]}>
                                    {`${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}`}
                                </Text>
                                : undefined
                            )}/>
                        ))
                    :
                    role.employee? 
                        attendances.data
                        .slice(attendances.data.length < 5 ? 0 : attendances.data.length - 5)
                        .sort((item1: IAttendance, item2: IAttendance) => dayjs(item2.submitAt).toDate().getTime() - dayjs(item1.submitAt).toDate().getTime())
                        .map((item: IAttendance, ind: number) => (
                            <List.Item
                            key={ind}
                            title={() => <Text variant='titleLarge'>{item.roomName}</Text>}
                            onPress={() => { navigate("Room", item) }}
                            description={() => (
                                <View>
                                    <Text>{dayjs(item.submitAt).format("HH:MM A - MMMM DD, YYYY")}</Text>
                                    {role.employee ? <Text style={style.ownerText}>Submitted by {item.submitBy}</Text> : undefined}
                                </View>
                            )}
                            right={props => (
                                role.teacher ? 
                                <Text style={[props.style, item.status === IsValid.pending ? style.pendingText : item.status === IsValid.approve ? style.validText : style.invalidText ]}>
                                    {`${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}`}
                                </Text>
                                : undefined
                            )}/>
                        ))
                    :undefined }
                </List.Section>
            </View>

            {role.teacher ?
                <FAB
                icon="plus"
                style={style.fab}
                onPress={() => { navigate('Attendance') }}/>
            : undefined}

        </ScrollView>
    )
}

const style = StyleSheet.create({
    attendanceData: {
        flexDirection: 'row',
        gap: 16,
    },
    card: {
        flex: 1,
        alignItems: "center",
        gap: 8,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 24,
        flexDirection: "row",
        borderRadius: 10,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    cardText: {
        color: "#FEFEFE"
    },
    sectionHeader: {
        marginLeft: 16,
        marginRight: 16,
        marginTop: 16,
        color: "#296EB4"
    },
    ownerText: { marginTop: 6, fontStyle: 'italic' },
    validText: { color: "#0DA400", fontStyle: 'italic' },
    pendingText: { color: "#C1AD00", fontStyle: 'italic' },
    invalidText: { color: "#C02807", fontStyle: 'italic' },
})

export default Dashboard