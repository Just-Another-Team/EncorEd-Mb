import { NavigationContainer } from "@react-navigation/native";
import messaging from '@react-native-firebase/messaging'
import { Linking } from "react-native";
import { navigationRef } from "./RootNavigation";
import { config } from '../types/screenConfig';
import AuthStack from "./AuthStack";

const IndexRoute = () => {
    return (
        <NavigationContainer
        ref={navigationRef}
        linking={{
            prefixes: ["encored://app"],
            config,
            // subscribe(listener: (url: string) => void) {
            // const onReceiveURL = ({url}: {url: string}) => listener(url);

            // const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

            // const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
            //     console.log("Remote Message Data: ", (remoteMessage.data as any).link)

            //     //Linking.openURL((remoteMessage.data as any).link)
            // })

            // return () => {
            //     linkingSubscription.remove();
            //     unsubscribe();
            // };
            // }
        }}
        >
            <AuthStack />
        </NavigationContainer>
    )
}

export default IndexRoute