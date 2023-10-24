import AuthFormContainer from "@components/AuthFormContainer";
import AppButton from "@ui/AppButton";
import AppLink from "@ui/AppLink";
import OTPField from "@ui/OTPField";
import { FC } from "react";
import { Keyboard, StyleSheet, TextInput, View, Text } from "react-native";
import React = require("react");
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList, ProfileNavigatorStackParamList } from "src/@types/navigation";
import client from "src/api/client";
import colors from "@utils/colors";
import catchAsyncError from "src/api/catchError";
import { upldateNotification } from "src/store/notification";
import { useDispatch } from "react-redux";

type Props = NativeStackScreenProps<AuthStackParamList | ProfileNavigatorStackParamList, "Verification">;

const otpFields = new Array(6).fill("");

const Verification: FC<Props> = ({ route,navigation }) => {
  const dispatch = useDispatch()
  const [otp, setOtp] = React.useState([...otpFields]);
  const [otpIndex, setOtpIndex] = React.useState(0);
  const inputRef = React.useRef<TextInput>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [countDown, setCountDown] = React.useState(60);
  const [canSendNewOTP, setCanSendNewOTP] = React.useState(false);

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
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(upldateNotification({ message: errorMessage, type: "error" }));
    }
    setIsSubmitting(false);
  };

  const requestOTP = async () => {
    setCountDown(60)
    setCanSendNewOTP(false)
    try {
      await client.post("/auth/re-verify-email", { userId: userInfo.id });
    } catch (error) {
      console.log("Requesting for new OTP", error);
    }
  };

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [otpIndex]);

  React.useEffect(() => {
    if (canSendNewOTP) return;
    const interval = setInterval(() => {
      if (countDown > 0) {
        setCountDown((old) => old - 1);
      }
    }, 1000);

    if (countDown === 0) {
      setCanSendNewOTP(true);
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [canSendNewOTP]);
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
            {canSendNewOTP ? (
              <Text></Text>
            ) : (
              <Text style={{ color: colors.SECONDARY, marginRight: 14 }}>
                {countDown} sec
              </Text>
            )}
            <AppLink
              active={canSendNewOTP}
              title="resend otp"
              onPress={requestOTP}
            />
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
    flexDirection: "row",
  },
});

export default Verification;
