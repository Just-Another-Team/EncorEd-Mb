import { AxiosError } from "axios";
import { FixMeLater } from "../types/FixMeLater";

type ErrorMessageType = {
    code: string;
    responseData?: FixMeLater;
}

const ErrorMessage = ({
    code,
    responseData
}: ErrorMessageType) => {
    let message = ""

    if (code === AxiosError.ERR_NETWORK) {
        message = "Mobile application is unable to connect to the server network."
    }
    else if (code === AxiosError.ERR_BAD_REQUEST) {
        message = BadRequestMessage(responseData)!
    }

    return message
}

const BadRequestMessage = (data: FixMeLater): string | undefined => {
    const error = data.error
    
    if (error.message === "INVALID_EMAIL") {
        return "Email is invalid."
    }
    else if (error.message === "EMAIL_NOT_FOUND") {
        return "Email does not exist"
    }
    else if (error.message === "INVALID_PASSWORD") {
        return "Password is invalid"
    }
}

export default ErrorMessage