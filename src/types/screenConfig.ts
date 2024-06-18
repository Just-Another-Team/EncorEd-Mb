import { PathConfigMap } from "@react-navigation/native";
import { RootStackParamList } from "./navigation";

export const config: {
    initialRouteName?: keyof RootStackParamList | undefined;
    screens: PathConfigMap<RootStackParamList>;
} = {
    screens: {
        // LinkPage: {
        //     //edpCode = number (DEBUG: string)
        //     //roomNumber = number
        //     //instructor = instructor id (DEBUG: name)
        //     //startSchedule = ISODateString
        //     //endSchedule = ISODateString
        //     // path: "deeplinkTest/:edpCode/:roomNumber/:instructor/:startSchedule/:endSchedule",
        //     path: "deeplinkTest/:edpCode/:roomNumber/:instructor",
        //     parse: {
        //         edpCode: (edpCode) => `${edpCode}`,
        //         roomNumber: (roomNumber) => `${roomNumber}`,
        //         instructor: (instructor) => `${instructor}`,
        //     }
        // }
        AttendanceForm: {
            path: "attendance/:roomId",
            parse: {
                roomId: (roomId) => `${roomId}`
            },
        },
        // OngoingSubjects: {
        //     path: "ongoingSubjects",
        // }
    }
}