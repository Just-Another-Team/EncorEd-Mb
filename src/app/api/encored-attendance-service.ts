import http from "./http-common"

import { Credentials } from "../../types/InputType"
import { FixMeLater } from "../../types/FixMeLater"

class EncorEdAttendanceService {
    private commonUrl: string = "attendance";

    validateAttendance(data: FixMeLater) {
        return http.patch(`${this.commonUrl}/validate/${data.id}`, data)
    }

    showAttendances(institution: string) {
        return http.get(`${this.commonUrl}/report/${institution}`)
    }

    addAttendance(data: FixMeLater) {
        return http.post(`${this.commonUrl}/add`, data)
    }
}

export default new EncorEdAttendanceService()