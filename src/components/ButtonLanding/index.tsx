import {
    Button,
    ButtonProps
} from "react-native-paper"

type LandingButtonType = {} & ButtonProps

const LandingButton = (props: LandingButtonType) => {

    return(
        // <Button
        // mode="contained"
        // buttonColor="#296EB4"
        // textColor="#FFFFFF"
        // onPress={() => navigation.navigate("Login")}
        // labelStyle={{fontSize: 16, fontWeight: 'bold'}}
        // style={{padding: 6, borderRadius: 128}}>
        //     SIGN IN
        // </Button>
        <Button {...props as ButtonProps}>
            {props.children}
        </Button>
    )
}

export default LandingButton