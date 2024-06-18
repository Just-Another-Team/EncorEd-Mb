import axios from "axios"

export default axios.create({
    //baseURL: "http://192.168.1.4:4000",
    //baseURL: "http://192.168.203.101:4000",
    baseURL: "https://us-central1-encored-bd6f8.cloudfunctions.net/encored_api",
    //baseURL: `http://192.168.1.10:5001/encored-bd6f8/us-central1/encored_api`,
    headers: {
        "Content-Type": "application/json"
    },
    //timeout: 8000,
})