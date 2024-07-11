import { GraphDataType } from "../../types/GraphDataType";
import http from "./http-common"

class EncorEdNavService {
    private navCommon: string = "/navigation";

    initializeGraph(graphData: GraphDataType) {
        return http.post(`${this.navCommon}/initialize`, graphData);
    }

    generatePath(graphData: GraphDataType) {
        return http.post(`${this.navCommon}/generatePath`, graphData)
    }
}

export default new EncorEdNavService()