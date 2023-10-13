class Role {
    constructor(
        _institution,
        _name,
        _desc,
        _canViewMap,
        _canAddMap,
        _canEditMap,
        _canDeleteMap,
        _canUnlockMap,
        _canViewSubject,
        _canAddSubject,
        _addSubjectRequireVerification,
        _canEditSubject,
        _editSubjectRequireVerification,
        _canDeleteSubject,
        _canVerifySubject,
        _canViewEvent,
        _canAddEvent,
        _canEditEvent,
        _canDeleteEvent,
        _canVerifyEvent,
        _canViewUser,
        _canAddUser,
        _canEditUser,
        _canDeleteUser,
        _canBanUser,
        _canRestoreUser,
        _canViewGroup,
        _canAddGroup,
        _canEditGroup,
        _canDeleteGroup,
        _canViewRole,
        _canAddRole,
        _canEditRole,
        _canDeleteRole,
        _canViewInstitution,
        _canAddInstitution,
        _canEditInstitution,
        _canDeleteInstitution,
        _canBanInstitution,
        _canRestoreInstitution
    ) {
        this.institution = _institution;
        this.name = _name;
        this.desc = _desc;
        this.canViewMap = _canViewMap;
        this.canAddMap = _canAddMap;
        this.canEditMap = _canEditMap;
        this.canDeleteMap = _canDeleteMap;
        this.canUnlockMap = _canUnlockMap;
        this.canViewSubject = _canViewSubject;
        this.canAddSubject = _canAddSubject;
        this.addSubjectRequireVerification = _addSubjectRequireVerification;
        this.canEditSubject = _canEditSubject;
        this.editSubjectRequireVerification = _editSubjectRequireVerification;
        this.canDeleteSubject = _canDeleteSubject;
        this.canVerifySubject = _canVerifySubject;
        this.canViewEvent = _canViewEvent;
        this.canAddEvent = _canAddEvent;
        this.canEditEvent = _canEditEvent;
        this.canDeleteEvent = _canDeleteEvent;
        this.canViewUser = _canViewUser;
        this.canAddUser = _canAddUser;
        this.canEditUser = _canEditUser;
        this.canDeleteUser = _canDeleteUser;
        this.canBanUser = _canBanUser;
        this.canRestoreUser = _canRestoreUser;
        this.canViewGroup = _canViewGroup;
        this.canAddGroup =_canAddGroup;
        this.canEditGroup = _canEditGroup;
        this.canDeleteGroup =_canDeleteGroup;
        this.canViewRole = _canViewRole;
        this.canAddRole = _canAddRole;
        this.canEditRole = _canEditRole;
        this.canDeleteRole = _canDeleteRole;
        this.canViewInstitution =_canViewInstitution;
        this.canAddInstitution =_canAddInstitution;
        this.canEditInstitution = _canEditInstitution;
        this.canDeleteInstitution = _canDeleteInstitution;
        this.canBanInstitution = _canBanInstitution;
        this.canRestoreInstitution = _canRestoreInstitution;
    }

    get institution() {
        return this._institution
    }

    set institution(value) {
        this._institution = value
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get desc() {
        return this._desc;
    }

    set desc(value) {
        this._desc = value;
    }

    /* SUBJECT MAP */

    get canViewMap() {
        return this._canViewMap;
    }

    set canViewMap(value) {
        this._canViewMap = value;
    }

    get canAddMap() {
        return this._canAddMap;
    }

    set canAddMap(value) {
        this._canAddMap = value;
    }

    get canEditMap() {
        return this._canEditMap;
    }

    set canEditMap(value) {
        this._canEditMap = value;
    }

    get canDeleteMap() {
        return this._canDeleteMap;
    }

    set canDeleteMap(value) {
        this._canDeleteMap = value;
    }

    get canUnlockMap() {
        return this._canUnlockMap;
    }

    set canUnlockMap(value) {
        this._canUnlockMap = value;
    }

    /* SUBJECT FUNCTIONS */

    get canViewSubject() {
        return this._canViewSubject;
    }

    set canViewSubject(value) {
        this._canViewSubject = value;
    }

    get canAddSubject() {
        return this._canAddSubject;
    }

    set canAddSubject(value) {
        this._canAddSubject = value;
    }

    get canEditSubject() {
        return this._canEditSubject;
    }

    set canEditSubject(value) {
        this._canEditSubject = value;
    }

    get canDeleteSubject() {
        return this._canDeleteSubject;
    }

    set canDeleteSubject(value) {
        this._canDeleteSubject = value;
    }

    get canVerifySubject() {
        return this._canVerifySubject;
    }

    set canVerifySubject(value) {
        this._canVerifySubject = value;
    }

    get addSubjectRequireVerification() {
        return this._addSubjectRequireVerification;
    }

    set addSubjectRequireVerification(value) {
        this._addSubjectRequireVerification = value;
    }

    get editSubjectRequireVerification() {
        return this._editSubjectRequireVerification;
    }

    set editSubjectRequireVerification(value) {
        this._editSubjectRequireVerification = value;
    }

    /* EVENT */

    get canViewEvent() {
        return this._canViewEvent;
    }

    set canViewEvent(value) {
        this._canViewEvent = value;
    }

    get canAddEvent() {
        return this._canAddEvent;
    }

    set canAddEvent(value) {
        this._canAddEvent = value;
    }

    get canEditEvent() {
        return this._canEditEvent;
    }

    set canEditEvent(value) {
        this._canEditEvent = value;
    }

    get canDeleteEvent() {
        return this._canDeleteEvent;
    }

    set canDeleteEvent(value) {
        this._canDeleteEvent = value;
    }

    get canVerifyEvent() {
        return this._canVerifyEvent;
    }

    set canVerifyEvent(value) {
        this._canVerifyEvent = value;
    }

    /* User Function */

    get canViewUser() {
        return this._canViewUser
    }

    set canViewUser(value) {
        this._canViewUser = value
    }

    get canAddUser() {
        return this._canAddUser;
    }

    set canAddUser(value) {
        this._canAddUser = value;
    }

    get canEditUser() {
        return this._canEditUser;
    }

    set canEditUser(value) {
        this._canEditUser = value;
    }

    get canDeleteUser() {
        return this._canDeleteUser;
    }

    set canDeleteUser(value) {
        this._canDeleteUser = value;
    }

    get canBanUser() {
        return this._canBanUser;
    }

    set canBanUser(value) {
        this._canBanUser = value;
    }

    get canRestoreUser() {
        return this._canRestoreUser;
    }

    set canRestoreUser(value) {
        this._canRestoreUser = value;
    }

    get canViewGroup() {
        return this._canViewGroup;
    }

    set canViewGroup(value) {
        this._canViewGroup = value;
    }

    get canAddGroup() {
        return this._canAddGroup;
    }

    set canAddGroup(value) {
        this._canAddGroup = value;
    }

    get canEditGroup() {
        return this._canEditGroup;
    }

    set canEditGroup(value) {
        this._canEditGroup = value;
    }

    get canDeleteGroup() {
        return this._canDeleteGroup;
    }

    set canDeleteGroup(value) {
        this._canDeleteGroup = value;
    }

    get canViewRole() {
        return this._canViewRole;
    }

    set canViewRole(value) {
        this._canViewRole = value;
    }

    get canAddRole() {
        return this._canAddRole;
    }

    set canAddRole(value) {
        this._canAddRole = value;
    }

    get canEditRole() {
        return this._canEditRole;
    }

    set canEditRole(value) {
        this._canEditRole = value;
    }

    get canDeleteRole() {
        return this._canDeleteRole;
    }

    set canDeleteRole(value) {
        this._canDeleteRole = value;
    }

    get canViewInstitution() {
        return this._canViewInstitution;
    }

    set canViewInstitution(value) {
        this._canViewInstitution = value;
    }

    get canAddInstitution() {
        return this._canAddInstitution;
    }

    set canAddInstitution(value) {
        this._canAddInstitution = value;
    }

    get canEditInstitution() {
        return this._canEditInstitution;
    }

    set canEditInstitution(value) {
        this._canEditInstitution = value;
    }

    get canDeleteInstitution() {
        return this._canDeleteInstitution;
    }

    set canDeleteInstitution(value) {
        this._canDeleteInstitution = value;
    }

    get canBanInstitution() {
        return this._canBanInstitution;
    }

    set canBanInstitution(value) {
        this._canBanInstitution = value;
    }

    get canRestoreInstitution() {
        return this._canRestoreInstitution;
    }

    set canRestoreInstitution(value) {
        this._canRestoreInstitution = value;
    }
}

const roleConverter = {
    toFirestore: (permission) => {
        //console.log(permission)

        return {
            institution: permission.institution,
            name: permission.name,
            desc: permission.desc,
            canViewMap: permission.canViewMap,
            canAddMap: permission.canAddMap,
            canEditMap: permission.canEditMap,
            canDeleteMap: permission.canDeleteMap,
            canUnlockMap: permission.canUnlockMap,
            canViewSubject: permission.canViewSubject,
            canAddSubject: permission.canAddSubject,
            addSubjectRequireVerification: permission.addSubjectRequireVerification,
            canEditSubject: permission.canEditSubject,
            editSubjectRequireVerification: permission.editSubjectRequireVerification,
            canDeleteSubject: permission.canDeleteSubject,
            canVerifySubject: permission.canVerifySubject,
            canViewEvent: permission.canViewEvent,
            canAddEvent: permission.canAddEvent,
            canEditEvent: permission.canEditEvent,
            canDeleteEvent: permission.canDeleteEvent,
            canViewUser: permission.canViewUser,
            canAddUser: permission.canAddUser,
            canEditUser: permission.canEditUser,
            canDeleteUser: permission.canDeleteUser,
            canBanUser: permission.canBanUser,
            canRestoreUser: permission.canRestoreUser,
            canViewGroup: permission.canViewGroup,
            canAddGroup: permission.canAddGroup,
            canEditGroup: permission.canEditGroup,
            canDeleteGroup: permission.canDeleteGroup,
            canViewRole: permission.canViewRole,
            canAddRole: permission.canAddRole,
            canEditRole: permission.canEditRole,
            canDeleteRole: permission.canDeleteRole,
            canViewInstitution: permission.canViewInstitution,
            canAddInstitution: permission.canAddInstitution,
            canEditInstitution: permission.canEditInstitution,
            canDeleteInstitution: permission.canDeleteInstitution,
            canBanInstitution: permission.canBanInstitution,
            canRestoreInstitution: permission.canRestoreInstitution,
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Role(
            data.institution,
            data.name,
            data.desc,
            data.canViewMap,
            data.canAddMap,
            data.canEditMap,
            data.canDeleteMap,
            data.canUnlockMap,
            data.canViewSubject,
            data.canAddSubject,
            data.addSubjectRequireVerification,
            data.canEditSubject,
            data.editSubjectRequireVerification,
            data.canDeleteSubject,
            data.canVerifySubject,
            data.canViewEvent,
            data.canAddEvent,
            data.canEditEvent,
            data.canDeleteEvent,
            data.canVerifyEvent,
            data.canViewUser,
            data.canAddUser,
            data.canEditUser,
            data.canDeleteUser,
            data.canBanUser,
            data.canRestoreUser,
            data.canViewGroup,
            data.canAddGroup,
            data.canEditGroup,
            data.canDeleteGroup,
            data.canViewRole,
            data.canAddRole,
            data.canEditRole,
            data.canDeleteRole,
            data.canViewInstitution,
            data.canAddInstitution,
            data.canEditInstitution,
            data.canDeleteInstitution,
            data.canBanInstitution,
            data.canRestoreInstitution
        )
    }
}

module.exports = {roleConverter, Role}