import { ScrollView, StyleSheet, View } from "react-native"
import { BarChart, PieChart } from "react-native-gifted-charts"
import { Appbar, Text } from "react-native-paper"
import { BarData } from "../../data/barData"
import { PieData } from "../../data/pieData"

const GiftedCharts = () => {

    return(
        <ScrollView>
            {/* When elevated, colors are different based on levels */}
            <Appbar.Header mode="center-aligned"> 
                <Appbar.BackAction />
                <Appbar.Content title={<Text variant="titleLarge">Random Charts</Text>}/>
                {/* <Appbar.Content title="Hello"/> */}

            </Appbar.Header>

            <View style={style.barChartContainer}>
                <BarChart
                isAnimated
                data={BarData}
                width={248}
                initialSpacing={56}
                spacing={48}
                noOfSections={5}
                xAxisLabelTextStyle={{ color: "#000000" }}
                yAxisTextStyle={{ color: "#000000" }}
                topLabelTextStyle={{ color: "#000000" }}
                />
            </View>

            <View style={style.barChartContainer}>
                <PieChart
                data={PieData}
                donut
                />
            </View>

        </ScrollView>
    )
}

const style = StyleSheet.create({
    barChartContainer: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: 'center',
        padding: 8,
        paddingVertical: 24,
        margin: 12,
        gap: 12
    }
})

export default GiftedCharts