import ISubject from "../../types/ISubject";
import http from "./http-common";

class SubjectService {
    private subjectCommon: string = "/subject";

    public add() {
        return http.post(`${this.subjectCommon}/`)
    }

    public view(id: string) {
        return http.get<ISubject>(`${this.subjectCommon}/view/s/${id}`)
    }

    public viewAll() {
        return http.get<Array<ISubject>>(`${this.subjectCommon}/view/all`)
    }

    public viewBySchedule(schedule: string) {
        return http.get<Array<ISubject>>(`${this.subjectCommon}/view/q/?currentTime=${schedule}`)
    }
}

export default new SubjectService()