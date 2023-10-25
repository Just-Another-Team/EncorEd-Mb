import { Control, FieldError, FieldValues, UseFormGetValues, UseFormWatch } from "react-hook-form";
import { TextInput } from "react-native-paper";

export type TextInputProps = {
    id?: string;

    watch?: UseFormWatch<{
        emailUserName: string,
        password: string
    }> | UseFormWatch<{
        firstName: string;
        lastName: string;
        email: string;
        userName: string;
        password: string;
        confirmPassword: string;
    }>

    control?: Control<any, any>;
    name?: any;
    rules?: object;

    placeHolder?: string | undefined;
    icon?: string;
    secureEntryText?: boolean;

    formError: FieldError | undefined;
} & React.ComponentProps<typeof TextInput>;

export type Credentials = {
    email: string;
    password: string;
}