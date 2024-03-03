import { EventListenerCallback, NavigationContainerEventMap, createNavigationContainerRef } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

export const navigate = (
    name: keyof RootStackParamList, 
    params?: any //To be continued
) => {
    if (navigationRef.isReady()) navigationRef.navigate(name, params)
}

export const addListener = (
    type: keyof NavigationContainerEventMap,
    callback: EventListenerCallback<NavigationContainerEventMap, keyof NavigationContainerEventMap>
) => {
    if (navigationRef.isReady()) navigationRef.addListener(type, callback)
}