import { GestureResponderEvent, Pressable, View } from "react-native"
import { Text } from "react-native-paper"
import { Levels } from "../../types/Levels";
import { useAppDispatch, useAppSelector } from "../../app/encored-redux-hooks";
import { SelectedLevelType } from "../../types/SelectedLevelType";
import { selectLevel } from "../../app/features/level/levelSlice";

export const MapLevel = () => {
    const navigationSelector = useAppSelector(state => state.navigation)
    const levelSelector = useAppSelector(state => state.level.selectedLevel)
    const levelDispatch = useAppDispatch();

    //Get the keys of Floor Enum
    const floorLevels = Object.keys(Levels).reverse().map((levelKey, ind) => ({symbol: ind - 1, levelKey: levelKey})).reverse()

    const handleFloorLevel = (e: GestureResponderEvent, level: SelectedLevelType) => {
        levelDispatch(selectLevel(level))
    }

    return(
        <View
        style={{
            // display: showModal === true ? 'none' : 'flex',
            position: 'absolute',
            right: 8,
            bottom: 12,
            zIndex: 1,
            gap: 8,
            padding: 4,
            backgroundColor: 'transparent',
        }}>
            {floorLevels.map(level => (
                <Pressable
                onPress={(e) => { handleFloorLevel(e, level) }}
                style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 24,
                    backgroundColor: level.symbol === levelSelector.symbol ? "#0d81d3" : 'transparent'
                }}>
                    <Text
                    variant='headlineSmall'
                    style={{color: level.symbol === levelSelector.symbol ? "#FEFEFE" : "#000000"}}>
                        {level.symbol === -1 ? "B" : level.symbol === 0 ? "G" : level.symbol === 1 ? "M" : level.symbol}
                    </Text>
                </Pressable>
            ))}
        </View>
    )
}