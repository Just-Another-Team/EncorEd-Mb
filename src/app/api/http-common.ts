import axios from "axios"

export default axios.create({
    baseURL: "http://192.168.1.11:4000",
    headers: {
        "Content-Type": "application/json"
    }
})