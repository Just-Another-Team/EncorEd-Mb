import http from "./http-common"

class EncorEdInstitutionService {
    get(id: string) {
        return http.get(`/institution/list/${id}`)
    }
}

export default new EncorEdInstitutionService();