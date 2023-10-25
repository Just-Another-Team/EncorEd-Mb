import axios from "axios"

export default axios.create({
    baseURL: "http://192.168.39.101:4000",
    headers: {
        "Content-Type": "application/json"
    }
})