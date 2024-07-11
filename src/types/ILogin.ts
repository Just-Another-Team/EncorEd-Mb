import { FieldValues } from "react-hook-form";

export interface ILogin extends FieldValues {
    email: string | null;
    password: string | null;
}
