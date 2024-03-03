import { ScrollView, View } from "react-native"
import { Appbar, Button, Chip, FAB, Text } from "react-native-paper"



const UIElements = () => {

    return(
        <ScrollView>
            {/* When elevated, colors are different based on levels */}
            <Appbar.Header mode="center-aligned"> 
                <Appbar.BackAction />
                <Appbar.Content title={<Text variant="titleLarge">Random UI Components</Text>}/>
                {/* <Appbar.Content title="Hello"/> */}

            </Appbar.Header>

            <View>
                <Text variant="labelLarge">Hello World!</Text>
            </View>

            <View style={{ padding: 8, gap: 12 }}>
                <Text variant="titleLarge">Buttons</Text>
                <View style={{ flexDirection: 'row', flexWrap: "wrap", gap: 8 }}>
                    <Button mode="outlined">Hello World!</Button>
                    <Button mode="contained">Hello World!</Button>
                    <Button mode="elevated">Hello World!</Button>
                    <Button mode="text">Hello World!</Button>
                    <Button mode="contained-tonal">Hello World!</Button>
                </View>
            </View>

            {/* FABs must be in an absolution position to work on the sizes */}
            <View style={{ padding: 8, flex: 1, gap: 12 }}>
                <Text variant="titleLarge">FAB</Text> 
                <View style={{ flexDirection: 'row', flexWrap: "wrap", gap: 8 }}>
                    <FAB icon="check" label="Hello!"/>
                    <FAB size="large" label="Hello!"/>
                </View>
            </View>

            <View style={{ padding: 8, gap: 12 }}>
                <Text variant="titleLarge">Chip</Text>
                <View style={{ flexDirection: 'row', flexWrap: "wrap", gap: 8 }}>
                    <Chip>Hello World!</Chip>
                    <Chip icon="account">Hello World!</Chip>
                </View>
            </View>
        </ScrollView>
    )
}

export default UIElements