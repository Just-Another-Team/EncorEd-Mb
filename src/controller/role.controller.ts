import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import IBaseService from "../interfaces/IBaseService";

import {Timestamp, db} from '../database';
import dayjs from "../timezoneConfig";

import IRole from "../models/role.model";
import { converter } from "../models/converter";
import { TimestampProps } from "../types/TimestampProps";
import { Permission } from "../models/permission.model.type";
import { ActivityPermission } from "../models/activityPermission.model.type";
import IRoleInput from "../interfaces/IRoleInput";
import { AttendancePermissions } from "../models/attendancePermission.model.type";
import { VerificationPermission } from "../models/verificationPermission.model.type";

const roleCollection = db.collection(`/role/`).withConverter(converter<IRole>())

class RoleUser implements IBaseService {
    
    public async add(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            //Type casting 
            const reqRole = req.body as IRoleInput;

            //Identify if each property is undefined

            //AttendancePermissions
            const submitSubjectAttendanceVerification:VerificationPermission = {
                value: reqRole.permission?.addSubject?.attendance?.verifyAttendance?.value,
                by: reqRole.permission?.addSubject?.attendance?.verifyAttendance?.by
            }
            const submitEventAttendanceVerification:VerificationPermission = {
                value: reqRole.permission?.addSubject?.attendance?.verifyAttendance?.value,
                by: reqRole.permission?.addSubject?.attendance?.verifyAttendance?.by
            }

            //VerificationPermissions
            const submitSubjectAttendance:AttendancePermissions = {
                value: reqRole.permission?.addSubject?.attendance?.value,
                verifyAttendance: submitEventAttendanceVerification
            };
            const submitEventAttendance:AttendancePermissions = {
                value: reqRole.permission?.addEvent?.attendance?.value,
                verifyAttendance: submitSubjectAttendanceVerification
            }

            const viewSubjectPermission: ActivityPermission = {
                value: reqRole.permission?.viewSubject?.value,
                schedule: reqRole.permission?.viewSubject?.schedule,
                participants: reqRole.permission?.viewSubject?.participants,
                attendance: reqRole.permission?.viewSubject?.attendance,
                verify: {
                    value: reqRole.permission?.viewSubject?.verify?.value,
                    by: reqRole.permission?.viewSubject?.verify?.by
                }
            }
            const addSubjectPermission: ActivityPermission = {
                value: reqRole.permission?.addSubject?.value,
                schedule: reqRole.permission?.addSubject?.schedule,
                participants: reqRole.permission?.addSubject?.participants,
                attendance: submitSubjectAttendance,
                verify: {
                    value: reqRole.permission?.addSubject?.verify?.value,
                    by: reqRole.permission?.addSubject?.verify?.by
                }
            }
            const editSubjectPermission: ActivityPermission = {
                value: reqRole.permission?.editSubject?.value,
                schedule: reqRole.permission?.editSubject?.schedule,
                participants: reqRole.permission?.editSubject?.participants,
                attendance: reqRole.permission?.editSubject?.attendance,
                verify: {
                    value: reqRole.permission?.editSubject?.verify?.value,
                    by: reqRole.permission?.editSubject?.verify?.by
                }
            }
            const deleteSubjectPermission: ActivityPermission = {
                value: reqRole.permission?.deleteSubject?.value,
                schedule: reqRole.permission?.deleteSubject?.schedule,
                participants: reqRole.permission?.deleteSubject?.participants,
                attendance: reqRole.permission?.deleteSubject?.attendance,
                verify: {
                    value: reqRole.permission?.deleteSubject?.verify?.value,
                    by: reqRole.permission?.deleteSubject?.verify?.by
                }
            }

            const viewEventPermission: ActivityPermission = {
                value: reqRole.permission?.viewEvent?.value,
                schedule: reqRole.permission?.viewEvent?.schedule,
                participants: reqRole.permission?.viewEvent?.participants,
                attendance: reqRole.permission?.viewEvent?.attendance,
                verify: {
                    value: reqRole.permission?.viewEvent?.verify?.value,
                    by: reqRole.permission?.viewEvent?.verify?.by
                }
            }
            const addEventPermission: ActivityPermission = {
                value: reqRole.permission?.addEvent?.value,
                schedule: reqRole.permission?.addEvent?.schedule,
                participants: reqRole.permission?.addEvent?.participants,
                attendance: submitEventAttendance,
                verify: {
                    value: reqRole.permission?.addEvent?.verify?.value,
                    by: reqRole.permission?.addEvent?.verify?.by
                }
            }
            const editEventPermission: ActivityPermission = {
                value: reqRole.permission?.editEvent?.value,
                schedule: reqRole.permission?.editEvent?.schedule,
                participants: reqRole.permission?.editEvent?.participants,
                attendance: reqRole.permission?.editEvent?.attendance,
                verify: {
                    value: reqRole.permission?.editEvent?.verify?.value,
                    by: reqRole.permission?.editEvent?.verify?.by
                }
            }
            const deleteEventctPermission: ActivityPermission = {
                value: reqRole.permission?.deleteEvent?.value,
                schedule: reqRole.permission?.deleteEvent?.schedule,
                participants: reqRole.permission?.deleteEvent?.participants,
                attendance: reqRole.permission?.deleteEvent?.attendance,
                verify: {
                    value: reqRole.permission?.deleteEvent?.verify?.value,
                    by: reqRole.permission?.deleteEvent?.verify?.by
                }
            }

            const permission: Permission = {
                viewMap: reqRole.permission?.viewMap,
                addMap: reqRole.permission?.addMap,
                editMap: reqRole.permission?.editMap,
                deleteMap: reqRole.permission?.deleteMap,
                unlockMap: reqRole.permission?.unlockMap,
                viewSubject: viewSubjectPermission,
                addSubject: addSubjectPermission,
                editSubject: editSubjectPermission,
                deleteSubject: deleteSubjectPermission,
                viewEvent: viewEventPermission,
                addEvent: addEventPermission,
                editEvent: editEventPermission,
                deleteEvent: deleteEventctPermission,
                viewUser: reqRole.permission?.viewUser,
                addUser: reqRole.permission?.addUser,
                editUser: reqRole.permission?.editUser,
                deleteUser: reqRole.permission?.deleteUser,
                verifyUser: {
                    value: reqRole.permission?.verifyUser?.value,
                    by: reqRole.permission?.verifyUser?.by
                },
                viewGroup: reqRole.permission?.viewGroup,
                addGroup: reqRole.permission?.addGroup,
                editGroup: reqRole.permission?.editGroup,
                deleteGroup: reqRole.permission?.deleteGroup,
                verifyGroup: {
                    value: reqRole.permission?.verifyGroup?.value,
                    by: reqRole.permission?.verifyGroup?.by,
                },
                viewRole: reqRole.permission?.viewRole,
                addRole: reqRole.permission?.addRole,
                editRole: reqRole.permission?.editRole,
                deleteRole: reqRole.permission?.deleteRole,
                verifyRole: {
                    value: reqRole.permission?.verifyRole?.value,
                    by: reqRole.permission?.verifyRole?.by
                },
                viewInstitution: reqRole.permission?.viewInstitution
            }

            const role: IRole = {
                name: reqRole.name,
                desc: reqRole.desc,
                //type: reqRole.type, < For identifying only
                institution: reqRole.institution,
                appAdmin: reqRole.type === "appAdmin" ? true : false,
                admin: reqRole.type === "admin" ? true : false,
                employee: reqRole.type === "employee" ? permission : false,
                teacher: reqRole.type === "teacher" ? permission : false,
                student: reqRole.type === "student" ? permission : false,
                visitor: reqRole.type === "visitor" ? permission : false,
                creationDate: new Date().toISOString(),
                createdBy: reqRole.createdBy,
                updatedDate: new Date().toISOString(),
                updatedBy: reqRole.createdBy,
                status: "Open"
            }

            let institution = role.institution.toLowerCase().trim().replace(/\s/g, '');
            let name = role.name.toLowerCase().trim().replace(/\s/g, '');

            await roleCollection.doc(`${institution}-${name}`).create(role)
            
            res.status(200).json({message: "Role successfully added!"})
        }
        catch (error) {
            if (error instanceof Error) res.status(400).json({name: "Role", userType: "User", type: "Add", message: error.message})
        }
    }

    public async update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            //Type casting 
            const roleIdparam = req.params.id;
            const reqRole = req.body as IRoleInput;

            const roleRef = await roleCollection.doc(roleIdparam).get()

            //AttendancePermissions
            const submitSubjectAttendanceVerification:VerificationPermission = {
                value: reqRole.permission?.addSubject?.attendance?.verifyAttendance?.value,
                by: reqRole.permission?.addSubject?.attendance?.verifyAttendance?.by
            }
            const submitEventAttendanceVerification:VerificationPermission = {
                value: reqRole.permission?.addSubject?.attendance?.verifyAttendance?.value,
                by: reqRole.permission?.addSubject?.attendance?.verifyAttendance?.by
            }

            //VerificationPermissions
            const submitSubjectAttendance:AttendancePermissions = {
                value: reqRole.permission?.addSubject?.attendance?.value,
                verifyAttendance: submitEventAttendanceVerification
            };
            const submitEventAttendance:AttendancePermissions = {
                value: reqRole.permission?.addEvent?.attendance?.value,
                verifyAttendance: submitSubjectAttendanceVerification
            }

            const viewSubjectPermission: ActivityPermission = {
                value: reqRole.permission?.viewSubject?.value,
                schedule: reqRole.permission?.viewSubject?.schedule,
                participants: reqRole.permission?.viewSubject?.participants,
                attendance: reqRole.permission?.viewSubject?.attendance,
                verify: {
                    value: reqRole.permission?.viewSubject?.verify?.value,
                    by: reqRole.permission?.viewSubject?.verify?.by
                }
            }
            const addSubjectPermission: ActivityPermission = {
                value: reqRole.permission?.addSubject?.value,
                schedule: reqRole.permission?.addSubject?.schedule,
                participants: reqRole.permission?.addSubject?.participants,
                attendance: submitSubjectAttendance,
                verify: {
                    value: reqRole.permission?.addSubject?.verify?.value,
                    by: reqRole.permission?.addSubject?.verify?.by
                }
            }
            const editSubjectPermission: ActivityPermission = {
                value: reqRole.permission?.editSubject?.value,
                schedule: reqRole.permission?.editSubject?.schedule,
                participants: reqRole.permission?.editSubject?.participants,
                attendance: reqRole.permission?.editSubject?.attendance,
                verify: {
                    value: reqRole.permission?.editSubject?.verify?.value,
                    by: reqRole.permission?.editSubject?.verify?.by
                }
            }
            const deleteSubjectPermission: ActivityPermission = {
                value: reqRole.permission?.deleteSubject?.value,
                schedule: reqRole.permission?.deleteSubject?.schedule,
                participants: reqRole.permission?.deleteSubject?.participants,
                attendance: reqRole.permission?.deleteSubject?.attendance,
                verify: {
                    value: reqRole.permission?.deleteSubject?.verify?.value,
                    by: reqRole.permission?.deleteSubject?.verify?.by
                }
            }

            const viewEventPermission: ActivityPermission = {
                value: reqRole.permission?.viewEvent?.value,
                schedule: reqRole.permission?.viewEvent?.schedule,
                participants: reqRole.permission?.viewEvent?.participants,
                attendance: reqRole.permission?.viewEvent?.attendance,
                verify: {
                    value: reqRole.permission?.viewEvent?.verify?.value,
                    by: reqRole.permission?.viewEvent?.verify?.by
                }
            }
            const addEventPermission: ActivityPermission = {
                value: reqRole.permission?.addEvent?.value,
                schedule: reqRole.permission?.addEvent?.schedule,
                participants: reqRole.permission?.addEvent?.participants,
                attendance: submitEventAttendance,
                verify: {
                    value: reqRole.permission?.addEvent?.verify?.value,
                    by: reqRole.permission?.addEvent?.verify?.by
                }
            }
            const editEventPermission: ActivityPermission = {
                value: reqRole.permission?.editEvent?.value,
                schedule: reqRole.permission?.editEvent?.schedule,
                participants: reqRole.permission?.editEvent?.participants,
                attendance: reqRole.permission?.editEvent?.attendance,
                verify: {
                    value: reqRole.permission?.editEvent?.verify?.value,
                    by: reqRole.permission?.editEvent?.verify?.by
                }
            }
            const deleteEventPermission: ActivityPermission = {
                value: reqRole.permission?.deleteEvent?.value,
                schedule: reqRole.permission?.deleteEvent?.schedule,
                participants: reqRole.permission?.deleteEvent?.participants,
                attendance: reqRole.permission?.deleteEvent?.attendance,
                verify: {
                    value: reqRole.permission?.deleteEvent?.verify?.value,
                    by: reqRole.permission?.deleteEvent?.verify?.by
                }
            }

            const permission: Permission = {
                viewMap: reqRole.permission?.viewMap,
                addMap: reqRole.permission?.addMap,
                editMap: reqRole.permission?.editMap,
                deleteMap: reqRole.permission?.deleteMap,
                unlockMap: reqRole.permission?.unlockMap,
                viewSubject: viewSubjectPermission,
                addSubject: addSubjectPermission,
                editSubject: editSubjectPermission,
                deleteSubject: deleteSubjectPermission,
                viewEvent: viewEventPermission,
                addEvent: addEventPermission,
                editEvent: editEventPermission,
                deleteEvent: deleteEventPermission,
                viewUser: reqRole.permission?.viewUser,
                addUser: reqRole.permission?.addUser,
                editUser: reqRole.permission?.editUser,
                deleteUser: reqRole.permission?.deleteUser,
                verifyUser: {
                    value: reqRole.permission?.verifyUser?.value,
                    by: reqRole.permission?.verifyUser?.by
                },
                viewGroup: reqRole.permission?.viewGroup,
                addGroup: reqRole.permission?.addGroup,
                editGroup: reqRole.permission?.editGroup,
                deleteGroup: reqRole.permission?.deleteGroup,
                verifyGroup: {
                    value: reqRole.permission?.verifyGroup?.value,
                    by: reqRole.permission?.verifyGroup?.by,
                },
                viewRole: reqRole.permission?.viewRole,
                addRole: reqRole.permission?.addRole,
                editRole: reqRole.permission?.editRole,
                deleteRole: reqRole.permission?.deleteRole,
                verifyRole: {
                    value: reqRole.permission?.verifyRole?.value,
                    by: reqRole.permission?.verifyRole?.by
                },
                viewInstitution: reqRole.permission?.viewInstitution
            }

            const role: IRole = {
                name: reqRole.name,
                desc: reqRole.desc,
                //type: reqRole.type, < For identifying only
                institution: reqRole.institution,
                appAdmin: reqRole.type === "appAdmin" ? true : false,
                admin: reqRole.type === "admin" ? true : false,
                employee: reqRole.type === "employee" ? permission : false,
                teacher: reqRole.type === "teacher" ? permission : false,
                student: reqRole.type === "student" ? permission : false,
                visitor: reqRole.type === "visitor" ? permission : false,
                creationDate: roleRef.data()!.creationDate,
                createdBy: roleRef.data()!.createdBy,
                updatedDate: new Date().toISOString(), //new Timestamp(Timestamp.fromDate(new Date).seconds, Timestamp.fromDate(new Date).nanoseconds).toDate() as TimestampProps
                updatedBy: reqRole.updatedBy,
                status: "Open"
            }

            await roleCollection.doc(roleIdparam).update(role)
            
            res.status(200).json({message: "Role successfully updated!", result: role})
        }
        catch (error) {
            if (error instanceof Error) res.status(400).json({name: "Role", userType: "User", type: "Add", message: error.message})
        }
    }

    public async delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        //Delete by status
    }

    public async view(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            //Type casting 
            const roleIdparam = req.params.id;

            const role = await roleCollection.doc(roleIdparam).get()
                .then((roleRecord) => {

                    const creationTimestamp = roleRecord.data()!.creationDate
                    const updatedTimestamp = roleRecord.data()!.updatedDate!

                    return ({
                        id: roleRecord.id,
                        ...roleRecord.data(),
                        creationDate: dayjs(creationTimestamp).tz(dayjs.tz.guess()).format(),
                        updatedDate: dayjs(updatedTimestamp).tz(dayjs.tz.guess()).format(),
                    })
                })
            
            res.status(200).json(role)
        }
        catch (error) {
            if (error instanceof Error) res.status(400).json({name: "Role", userType: "User", type: "View", message: error.message, stack: error.stack})
        }
    }
    public async viewAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            //Type casting 
            const roleDoc = await roleCollection.get()
            
            const roles = roleDoc.docs.map((roleRecord) => {

                const creationTimestamp = roleRecord.data()!.creationDate
                const updatedTimestamp = roleRecord.data()!.updatedDate!

                return ({
                    id: roleRecord.id,
                    ...roleRecord.data(),
                    creationDate: dayjs(creationTimestamp).tz(dayjs.tz.guess()).format(),
                    updatedDate: dayjs(updatedTimestamp).tz(dayjs.tz.guess()).format(),
                })
            })
            
            res.status(200).json(roles)
        }
        catch (error) {
            if (error instanceof Error) res.status(400).json({name: "Role", userType: "User", type: "View", message: error.message, stack: error.stack})
        }
    }
}

class RoleAdmin implements IBaseService {
    add(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    view(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    viewAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

// /* User Role */
// const addClientRole = async (req, res) => {
//     try {
//         const {
//             name,
//             desc,
//             institution,

//             appAdmin,
//             admin,
//             employee,
//             teacher,
//             student,
//             visitor,

//             createdIn,
//             createdBy,
//         } = req.body;

//         const role = new Role(
//             name,
//             desc,
//             institution,

//             appAdmin,
//             admin,
//             employee,
//             teacher,
//             student,
//             visitor,

//             createdIn,
//             createdBy,
//             "Open"
//         );

//         console.log(role)

//         res.status(200).json({message: "Debug Complete"})
//     } catch (e) {
//         res.status(400).json({name: "Role", userType: "Admin", type: "Add", error: e.message})
//     }
// }

// const editClientRole = (req, res) => {

// }

// const deleteClientRole = (req, res) => {
    
// }

// const viewClientRoles = (req, res) => {
    
// }

// const viewClientRole = (req, res) => {
    
// }

// /* Employee Role */
// const addEmployeeRole = async (req, res) => {
//     try {

//         let systemRole = new SystemRole(
//             false,
//             false,
//             true,
//             false
//         )

//         let institutionalRole = new InstitutionalRole(
//             req.body.name,
//             req.body.desc,
//             req.body.canViewMap,
//             req.body.canAddMap,
//             req.body.canEditMap,
//             req.body.canDeleteMap,
//             false,
//             req.body.canViewSubject,
//             req.body.canAddSubject,
//             req.body.addSubjectRequireVerification,
//             req.body.canEditSubject,
//             req.body.editSubjectRequireVerification,
//             req.body.canDeleteSubject,
//             req.body.canVerifySubject,
//             req.body.canViewEvent,
//             req.body.canAddEvent,
//             req.body.canEditEvent,
//             req.body.canDeleteEvent,
//             req.body.canVerifyEvent,
//             req.body.canViewUser,
//             req.body.canAddUser,
//             req.body.canEditUser,
//             req.body.canDeleteUser,
//             false,
//             false,
//             req.body.canViewGroup,
//             req.body.canAddGroup,
//             req.body.canEditGroup,
//             req.body.canDeletGroup,
//             req.body.canViewRole,
//             req.body.canAddRole,
//             req.body.canEditRole,
//             req.body.canDeleteRole,
//             false,
//             false,
//             false,
//             false,
//             false,
//             false,
//         )

//         let role = new Role(
//             req.body.institution,
//             Object.assign({}, systemRole),
//             Object.assign({}, institutionalRole)
//         )

//         await roleCollection.doc(`${role.institution}-${role.institutionalRole._name}`).create(role)
//             .then((result) => {
//                 res.status(200).json({message: "Role added successfully"})
//             })
//             .catch((err) => {
//                 throw {message: err.message}
//             })
//     } catch (e) {
//         res.status(400).json({name: "Role", userType: "Admin", type: "Add", error: e.message})
//     }
// }

// /* Institutional Admin Role */
// const addAdminRole = async (req, res) => {
//     try {
//         const {name = "admin", desc = "Role of institutional admin in [insert school]", institution} = req.body

//         let systemRole = new SystemRole(
//             false,
//             true,
//             false,
//             false
//         )

//         let institutionalRole = new InstitutionalRole(
//             name,
//             desc,
//             true,
//             true,
//             true,
//             true,
//             false,
//             true,
//             true,
//             true,
//             true,
//             true,
//             true,
//             true,
//             true,
//             true,
//             true,
//             true,
//             true,
//             true,
//             true,
//             true,
//             true,
//             false,
//             false,
//             true,
//             true,
//             true,
//             true,
//             true,
//             true,
//             true,
//             true,
//             false,
//             false,
//             false,
//             false,
//             false,
//             false,
//         )

//         let role = new Role(
//             institution,
//             Object.assign({}, systemRole),
//             Object.assign({}, institutionalRole)
//         )

//         const roleId = `${role.institution}-${role.institutionalRole._name}`;

//         await roleCollection.doc(roleId).create(role)

//         res.status(200).json({id: roleId, message: "Insitutional Role added successfully"})
//     } catch (e) {
//         res.status(400).json({name: "Role", userType: "Institutional Admin", type: "Add", error: e.message})
//     }
// }

// /* Application Admin Role */
// const addAppAdminRole = async (req, res) => {
//     try {
//         //console.log(req.body.name)

//         let systemRole = new SystemRole(
//                 true,
//                 false,
//                 false,
//                 false
//             )

//         let institutionalRole = new InstitutionalRole(
//                 req.body.name,
//                 req.body.desc,
//                 req.body.canViewMap,
//                 req.body.canAddMap,
//                 req.body.canEditMap,
//                 req.body.canDeleteMap,
//                 req.body.canUnlockMap,
//                 req.body.canViewSubject,
//                 req.body.canAddSubject,
//                 req.body.addSubjectRequireVerification,
//                 req.body.canEditSubject,
//                 req.body.editSubjectRequireVerification,
//                 req.body.canDeleteSubject,
//                 req.body.canVerifySubject,
//                 req.body.canViewEvent,
//                 req.body.canAddEvent,
//                 req.body.canEditEvent,
//                 req.body.canDeleteEvent,
//                 req.body.canVerifyEvent,
//                 req.body.canViewUser,
//                 req.body.canAddUser,
//                 req.body.canEditUser,
//                 req.body.canDeleteUser,
//                 req.body.canBanUser,
//                 req.body.canRestoreUser,
//                 req.body.canViewGroup,
//                 req.body.canAddGroup,
//                 req.body.canEditGroup,
//                 req.body.canDeletGroup,
//                 req.body.canViewRole,
//                 req.body.canAddRole,
//                 req.body.canEditRole,
//                 req.body.canDeleteRole,
//                 req.body.canViewInstitution,
//                 req.body.canAddInstitution,
//                 req.body.canEditInstitution,
//                 req.body.canDeleteInstitution,
//                 req.body.canBanInstitution,
//                 req.body.canRestoreInstitution,
//             )

//         let role = new Role(
//                 null,
//                 Object.assign({}, systemRole),
//                 Object.assign({}, institutionalRole),
//             )

//         await roleCollection.doc(`applicationadmin-${institutionalRole.name}`).create(role)

//         res.status(200).json({message: "Role added successfully"})
//     } catch (e) {
//         res.status(400).json({name: "Role", userType: "Admin", type: "Add", error: e.message})
//     }
// }

// const editAdminRole = (req, res) => {
    
// }

// const deleteAdminRole = (req, res) => {
    
// }

// const viewAdminRoles = (req, res) => {

// }

// const viewAdminRole = (req, res) => {
    
// }

export {
    roleCollection
}
export default new RoleUser;