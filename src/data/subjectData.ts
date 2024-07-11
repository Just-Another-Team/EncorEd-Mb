import ISubject from "../types/ISubject";

export enum SubStatusEnum {
    Active,
    Inactive
}

export  type SubjectType = {
    subId: string;
    subCode: string;
    subDescription: string;
    subStartSchedule: Date | string;
    subEndSchedule: Date | string;
    subWeekAssigned: Array<string>;
    userId: string;
    roomId: string;
    subStatus: SubStatusEnum;
}

export const Subjects: Array<SubjectType> = [
    {
        subId: "1231",
        subCode: "SUB-12345",
        subDescription: "Subject Protocol 1 Lit",
        subStartSchedule: "",
        subEndSchedule: "",
        subWeekAssigned: [
            "Monday",
            "Wednesday",
            "Friday",
        ],
        userId: "user101",
        roomId: "1_room103",
        subStatus: SubStatusEnum.Active,
    },
    {
        subId: "1232",
        subCode: "SUB-12345",
        subDescription: "Subject Protocol 1 Lab",
        subStartSchedule: "",
        subEndSchedule: "",
        subWeekAssigned: [
            "Tuesday",
            "Thursday",
        ],
        userId: "user101",
        roomId: "1_room101",
        subStatus: SubStatusEnum.Active,
    },
]

export const OngoingSubjectData: Array<ISubject> = [
    {
        SUB_ID: "WUGIjIh2UjHB6Yq22JI2",
        SUB_CODE: "subject_MWF_TDP-23456",
        SUB_DESCRIPTION: "Test New Subject ID",
        SCHED_ID: "subject_MWF_TDP-23456",
        USER_ID: "odFkJ7l7RFYveHwqgyIYi7oxVU02",
        ROOM_ID: "room_classroom_room207",
        SUB_STATUS: "",
    },
    {
        SUB_ID: "cKGRIxxGmLzgtK5gTmdN",
        SUB_CODE: "TS-TestingEveryday",
        SUB_DESCRIPTION: "Test everyday sched",
        SCHED_ID: "subject_MTThWFS_TS-TestingEveryday",
        USER_ID: "bo7nsS0w1UVE7XVUYK70Vpi5FIy2",
        ROOM_ID: "room_classroom_room217",
        SUB_STATUS: "",
    },
]