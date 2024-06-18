
import {ScrollView, View, GestureResponderEvent, StyleSheet} from 'react-native'
import { Avatar, Button, MD3Theme, Text, useTheme } from 'react-native-paper'
import { useAuth } from '../../hooks/useAuth'
import { useMemo } from 'react'
import Icon from 'react-native-paper/src/components/Icon'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FixMeLater } from '../../types/FixMeLater'
import { useNavigation } from '@react-navigation/native'
import { useUsers } from '../../hooks/useUsers'
import { UserRole } from '../../types/IUser'
import { Roles } from '../../data/Roles'
import useDepartment from '../../hooks/useDepartment'

const ProfileButton = ({ title, iconSource, onPress }: FixMeLater) => {
    return (
        <TouchableOpacity
        onPress={onPress}
        style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
        }}>
            <Icon size={32} source={iconSource} />
            <Text variant='titleMedium'>{title}</Text>
        </TouchableOpacity>
    )
}

const Profile = () => {
    const { navigate } = useNavigation()
    const { signOut } = useAuth()
    const { getCurrentUser } = useUsers()
    const { getDepartment } = useDepartment()
    const theme = useTheme()

    const userRole = getCurrentUser()?.ROLE_ID as UserRole
    const role = userRole.admin ? Roles.admin : userRole.attendanceChecker ? Roles.attendanceChecker : userRole.campusDirector ? Roles.campusDirector : userRole.dean ? Roles.dean : userRole.kiosk ? Roles.kiosk : Roles.teacher

    const handleSignOut = async (e: GestureResponderEvent) => {
        await signOut()
            .then(() => {
                navigate('Login')
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const styles = useMemo(() => profileStyles(theme), [theme])

    return(
        <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
            <View
            style={styles.profileContainer}>
                <Avatar.Image
                size={96}
                source={require('../../assets/images/profilepic.png')} />

                <Text
                variant='headlineSmall'>
                    {`${getCurrentUser()?.USER_FULLNAME}`}
                </Text>
            </View>

            <View>
                <Text>{getDepartment(getCurrentUser()?.DEPT_ID as string)?.DEPT_NAME}</Text>
                <Text>{role}</Text>
            </View>

            <View
            style={{ gap: 16 }}>
                {/* <ProfileButton
                //onPress={() => navigate("")}
                iconSource="account-edit-outline"
                title="Manage Profile"/> */}

                <ProfileButton
                onPress={() => navigate("RecentAttendances")}
                iconSource="format-list-text"
                title="Recently submitted attendance"/>

                {/* <ProfileButton
                iconSource="file-sync-outline"
                title="Request Attendance Report"/> */}
            </View>

            <View style={styles.buttonContainer}>
                <Button
                mode='contained'
                onPress={handleSignOut}>
                    SIGN OUT
                </Button>
            </View>
        </ScrollView>
    )
}

const profileStyles = (theme: MD3Theme) => StyleSheet.create({
    container: {
        padding: 16,
    },
    contentContainer: {
        gap: 16
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
    }
})

export default Profile