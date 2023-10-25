import AuthFormContainer from "@components/AuthFormContainer";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AppButton from "@ui/AppButton";
import OTPField from "@ui/OTPField";
import { FC } from "react";
import { Keyboard, StyleSheet, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import {
  AuthStackParamList,
  ProfileNavigatorStackParamList,
} from "src/@types/navigation";
import catchAsyncError from "src/api/catchError";
import client from "src/api/client";
import ReVerificationLink from "src/component/ReVerificationLink";
import { upldateNotification } from "src/store/notification";
import React = require("react");

type Props = NativeStackScreenProps<
  AuthStackParamList | ProfileNavigatorStackParamList,
  "Verification"
>;

const otpFields = new Array(6).fill("");

type PossibleScreens = {
  ProfileSettings: undefined;
  Signin: undefined;
};

const Verification: FC<Props> = ({ route }) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = React.useState([...otpFields]);
  const [otpIndex, setOtpIndex] = React.useState(0);
  const inputRef = React.useRef<TextInput>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigation = useNavigation<NavigationProp<PossibleScreens>>();

  const { userInfo } = route.params;
  inputRef.current?.focus;

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    if (value === "Backspace") {
      // move to the previous
      if (!newOtp[index]) setOtpIndex(index - 1);
      newOtp[index] = "";
    } else {
      // update otp and move further
      setOtpIndex(index + 1);
      newOtp[index] = value;
    }
    setOtp([...newOtp]);
  };

  const handlePaste = (value: string) => {
    if (value.length === 6) {
      Keyboard.dismiss();
      const newOtp = value.split("");
      setOtp([...newOtp]);
    }
  };

  const isValidOtp = otp.every((value) => {
    return value.trim();
  });

  const handleSubmit = async () => {
    if (!isValidOtp) return;

    setIsSubmitting(true);
    try {
      const { data } = await client.post("/auth/verify-email", {
        userId: userInfo.id,
        token: otp.join(""),
      });
      console.log(data);
      navigation.navigate("Signin");
      dispatch(upldateNotification({ message: data.message, type: "success" }));

      if (navigation.getState().routeNames.includes("Signin"))
        navigation.navigate("Signin");

      if (navigation.getState().routeNames.includes("ProfileSettings"))
        navigation.navigate("ProfileSettings");
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(upldateNotification({ message: errorMessage, type: "error" }));
    }
    setIsSubmitting(false);
    if (navigation.getState().routeNames.includes("Signin"))
      navigation.navigate("Signin");
  };

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [otpIndex]);

  return (
    <AuthFormContainer
      heading="Please check your email"
      children={
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            {otpFields.map((_, index) => (
              <OTPField
                ref={otpIndex === index ? inputRef : null}
                key={index}
                onKeyPress={({ nativeEvent }) => {
                  handleChange(nativeEvent.key, index);
                }}
                onChangeText={handlePaste}
                value={otp[index] || ""}
              />
            ))}
          </View>
          <AppButton
            busy={isSubmitting}
            onPress={handleSubmit}
            title="Verify Account"
          />
          <View style={styles.linkContainer}>
            <ReVerificationLink linkTitle="Resend OTP" userId={userInfo.id} />
          </View>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    paddingHorizontal: 15, // padding in the x direction (left and the right)
  },
  marginBottom: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
  },
  linkContainer: {
    marginTop: 20,
    width: "100%",
    justifyContent: "flex-end",
  },
});

export default Verification;
