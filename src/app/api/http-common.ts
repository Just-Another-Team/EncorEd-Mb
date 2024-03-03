import axios from "axios"

export default axios.create({
    baseURL: "http://192.168.1.10:4000",
    //baseURL: "http://192.168.239.101:4000",
    //baseURL: "https://us-central1-encored-bd6f8.cloudfunctions.net/encored_api",
    headers: {
        "Content-Type": "application/json"
    }
})