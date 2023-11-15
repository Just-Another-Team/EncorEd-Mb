import http from "./http-common"

class EncorEdRoleService {
    async getAssigned(userId: string) {
        return await http.get(`/role/assign/user/${userId}`)
    }
}

export default new EncorEdRoleService();