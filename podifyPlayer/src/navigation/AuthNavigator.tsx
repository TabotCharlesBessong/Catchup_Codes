import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ForgotPassword from "@views/auth/ForgotPassword"
import SignIn from "@views/auth/SignIn"
import SignUp from "@views/auth/Signup"
import Verification from "@views/auth/Verification"
import { useSelector } from "react-redux"
import { AuthStackParamList } from "src/@types/navigation"
import { getAuthState } from "src/store/auth"
const React = require("react")

const Stack = createNativeStackNavigator<AuthStackParamList>()

const AuthNavigator = () => {
  const authState = useSelector(getAuthState)
  console.log(authState)
  
  return (
    <Stack.Navigator screenOptions={{
      headerShown:false
    }} >
      <Stack.Screen name="Signin" component={SignIn} />
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="Forgot" component={ForgotPassword} />
      <Stack.Screen name="Verification" component={Verification} />
    </Stack.Navigator>
  );
}

export default AuthNavigator