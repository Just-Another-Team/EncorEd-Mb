import { createNavigationContainerRef } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

export const navigate = (
    name: keyof RootStackParamList, 
    params?: any //To be continued
) => {
    if (navigationRef.isReady()) navigationRef.navigate(name, params)
}