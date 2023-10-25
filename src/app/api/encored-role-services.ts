import http from "./http-common"

class EncorEdRoleService {
    async getAssigned(email: string) {
        return await http.get(`/role/assign/${email}`)
    }
}

export default new EncorEdRoleService();