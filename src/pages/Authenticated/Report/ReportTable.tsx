import { useEffect, useState } from "react"
import { DataTable, Text } from "react-native-paper"
import { IsValid } from "../../../types/IsValid"
import { StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { FixMeLater } from "../../../types/FixMeLater"
import { navigate } from "../../../routes/RootNavigation"
import { useAppSelector } from "../../../app/encored-redux-hooks"
import IAttendance, { AttendanceType } from "../../../types/IAttendance"
import dayjs from "dayjs"

const ReportTable = ({ listItems }: FixMeLater) => {
    const user = useAppSelector(state => state.authentication)
    const role = useAppSelector(state => state.role)

    const [page, setPage] = useState<number>(0);
    const [numberOfItems] = useState<Array<number>>([5, 10]);
    const [itemsPerPage, onItemsPerPageChange] = useState<number>(numberOfItems[0]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, listItems.length)

    useEffect(() => {
        setPage(0)
        console.log(listItems)
    }, [])

    return(
        <DataTable>
            <ScrollView horizontal contentContainerStyle={{ flexDirection: 'column' }}>
                <DataTable.Header>
                    <DataTable.Title style={style.nameColumnStyle}>Room</DataTable.Title>
                    <DataTable.Title style={style.dateSubmittedStyle}>Date Submitted</DataTable.Title>
                    {role.data.employee ? <DataTable.Title style={style.submittedByStyle}>Submitted By</DataTable.Title> : undefined}
                    <DataTable.Title style={style.nameColumnStyle}>Status</DataTable.Title>
                </DataTable.Header>

                {role.data.teacher ? 
                    (listItems as Array<FixMeLater>)
                    .filter((item: IAttendance) => item.submitBy === user.user?.id)
                    .sort((item1: AttendanceType, item2: AttendanceType) => dayjs(item2.submitAt).toDate().getTime() - dayjs(item1.submitAt).toDate().getTime())
                    .slice(from, to)
                    .map((item: IAttendance) => (
                        <DataTable.Row
                        onPress={() => {
                            navigate('Room', item)
                        }}
                        style={{ flex: 1, width: '100%', height: 50 }}>
                            <DataTable.Cell style={style.nameColumnStyle}>{item.roomName}</DataTable.Cell>
                            <DataTable.Cell style={style.dateSubmittedStyle}>{dayjs(item.submitAt).format("HH:MM A - MMMM DD, YYYY")}</DataTable.Cell>
                            {role.data.employee ? <DataTable.Cell style={style.submittedByStyle}>{item.submitBy}</DataTable.Cell> : undefined}
                            <DataTable.Cell style={[style.nameColumnStyle]}><Text style={item.status === IsValid.pending ? style.pendingText : item.status === IsValid.approve ? style.validText : style.invalidText}>{item.status}</Text></DataTable.Cell>
                        </DataTable.Row>
                    ))
                : 
                role.data.employee ?
                    (listItems as Array<FixMeLater>)
                    .slice(from, to)
                    .sort((item1: AttendanceType, item2: AttendanceType) => dayjs(item2.submitAt).toDate().getTime() - dayjs(item1.submitAt).toDate().getTime())
                    .map((item: IAttendance) => (
                        <DataTable.Row
                        onPress={() => {
                            navigate('Room', item)
                        }}
                        style={{ flex: 1, width: '100%', height: 50 }}>
                            <DataTable.Cell style={style.nameColumnStyle}>{item.roomName}</DataTable.Cell>
                            <DataTable.Cell style={style.dateSubmittedStyle}>{dayjs(item.submitAt).format("HH:MM A - MMMM DD, YYYY")}</DataTable.Cell>
                            {role.data.employee ? <DataTable.Cell style={style.submittedByStyle}>{item.submitBy}</DataTable.Cell> : undefined}
                            <DataTable.Cell style={[style.nameColumnStyle]}><Text style={item.status === IsValid.pending ? style.pendingText : item.status === IsValid.approve ? style.validText : style.invalidText}>{item.status}</Text></DataTable.Cell>
                        </DataTable.Row>
                    ))
                : undefined}
            </ScrollView>
            

            <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(listItems.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${listItems.length}` }
            numberOfItemsPerPageList={numberOfItems}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={'Rows per page'}/>

        </DataTable>
    )   
}

const style = StyleSheet.create({
    nameColumnStyle: {
        width: 128,
    },
    dateSubmittedStyle: {
        width: 256,
    },
    submittedByStyle: {
        width: 192,
    },
    validText: { color: "#0DA400", fontStyle: 'italic' },
    pendingText: { color: "#C1AD00", fontStyle: 'italic' },
    invalidText: { color: "#C02807", fontStyle: 'italic' },
})

export default ReportTable