import { Control } from "react-hook-form";
import { TextInput } from "react-native-paper";

export type TextInputProps = {
    id?: string;

    control?: Control | undefined;
    name?: any;
    rules?: object;

    placeHolder?: string | undefined;
    icon?: string;
    secureEntryText?: boolean;
} & React.ComponentProps<typeof TextInput>;