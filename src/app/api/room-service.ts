import IRoom from "../../types/IRoom";
import http from "./http-common";

class RoomService {
    private roomCommon: string = "/room";

    public add() {
        return http.post(`${this.roomCommon}/`)
    }

    public view(id: string) {
        return http.get<IRoom>(`${this.roomCommon}/view/s/${id}`)
    }

    public viewAll() {
        return http.get<Array<IRoom>>(`${this.roomCommon}/view/all`)
    }
}

export default new RoomService()