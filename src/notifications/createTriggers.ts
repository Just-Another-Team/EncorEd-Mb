import notifee, { TimestampTrigger, TriggerType } from "@notifee/react-native";

const channelId = async () => await notifee.createChannel({
    id: 'default', 
    name: 'Default Channel'
})

const onCreateTriggerNotification = async () => {
    console.log("creating trigger")

    const date = new Date(Date.now())
    date.setHours(13);
    date.setMinutes(30);

    const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime()
    }

    await notifee.createTriggerNotification({
        title: 'Notification',
        body: 'Hello World!',
        android: {
            channelId: 'default',
        },
    }, trigger)
} 