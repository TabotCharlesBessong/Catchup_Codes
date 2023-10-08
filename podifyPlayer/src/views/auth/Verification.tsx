import AuthFormContainer from "@components/AuthFormContainer";
import AppButton from "@ui/AppButton";
import AppLink from "@ui/AppLink";
import OTPField from "@ui/OTPField";
import { FC } from "react";
import { Keyboard, StyleSheet, TextInput, View } from "react-native";
import React = require("react");
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "src/@types/navigation";
import client from "src/api/client";

type Props = NativeStackScreenProps<AuthStackParamList, "Verification">;

const otpFields = new Array(6).fill("");

const Verification: FC<Props> = ({ route, navigation }) => {
  const [otp, setOtp] = React.useState([...otpFields]);
  const [otpIndex, setOtpIndex] = React.useState(0);
  const inputRef = React.useRef<TextInput>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false)

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

    setIsSubmitting(true)
    try {
      const { data } = await client.post("/auth/verify-email", {
        userId: userInfo.id,
        token: otp.join(""),
      });
      console.log(data);
      navigation.navigate("Signin");
    } catch (error) {
      console.log(error, "Verification error");
    }
    setIsSubmitting(false)
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
          <AppButton busy={isSubmitting} onPress={handleSubmit} title="Verify Account" />
          <View style={styles.linkContainer}>
            <AppLink title="resend otp" />
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
    alignItems: "flex-end",
  },
});

export default Verification;
