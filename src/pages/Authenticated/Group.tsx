import React from 'react'
import {ScrollView, View} from 'react-native'
import { List, Text } from 'react-native-paper'

const Group = () => {
    return(
        <ScrollView style={{padding: 16}}>
            <Text style={{color: '#FDB833', fontSize: 40, fontWeight: '700', marginBottom: 16}}>Groups</Text>

            <View style={{backgroundColor: '#F9F9FF', borderRadius: 8, padding: 16}}>
                <List.Section style={{gap: 12}}>
                    <List.Accordion title="Item 1" titleStyle={{color: '#F9F9FF', fontSize: 20, fontWeight: 'bold'}} style={{backgroundColor: '#45A1FD', borderRadius: 12}}>
                        <List.Item title="Hey look, an item!" />
                        <List.Item title="Oh! Another item!" />
                    </List.Accordion>

                    <List.Accordion title="Item 2" titleStyle={{color: '#F9F9FF', fontSize: 20, fontWeight: 'bold'}} style={{backgroundColor: '#45A1FD', borderRadius: 12}}>
                        <List.Item title="Hey look, an item!" />
                        <List.Item title="Oh! Another item!" />
                        <List.Item title="A third item! ... Wait, ain't suppose to be on the third accordion?" />
                    </List.Accordion>
                </List.Section>
            </View>

        </ScrollView>
    )
}

export default Group