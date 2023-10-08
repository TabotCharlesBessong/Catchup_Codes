import AuthFormContainer from "@components/AuthFormContainer";
import Form from "@components/form";
import AuthInputField from "@components/form/AuthInputField";
import SubmitBtn from "@components/form/SubmitBtn";
import AppLink from "@ui/AppLink";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import * as yup from "yup";
import React = require("react");
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "src/@types/navigation";
import client from "src/api/client";
import { FormikHelpers } from "formik";

const signupSchema = yup.object({
  email: yup
    .string()
    .trim("Email is missing!")
    .email("Invalid email!")
    .required("Email is required!"),
});

interface Props {}

const initialValues = {
  email: "",
};

interface SignInUserInfo {
  email: string;
}

const handleSubmit = async (
  values: SignInUserInfo,
  actions: FormikHelpers<SignInUserInfo>
) => {
  // send the information to the api
  // fetch()
  actions.setSubmitting(true);
  try {
    const { data } = await client.post("/auth/forget-password", {
      ...values,
    });
    console.log(data);
    // navigation.navigate("Verification", {
    //   userInfo: data.user,
    // });
  } catch (error) {
    console.log("Forgot password error", error);
  }
  actions.setSubmitting(false);
};

const ForgotPassword: FC<Props> = (props) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={signupSchema}
    >
      <AuthFormContainer
        heading="Forgot Password"
        subHeading="Ooops, did you forget your password, don't worry we will help you get back in"
        children={
          <View style={styles.formContainer}>
            <AuthInputField
              name="email"
              placeholder="john@email.com"
              label="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              containerStyle={styles.marginBottom}
            />
            <SubmitBtn title="Send Link" />

            <View style={styles.linkContainer}>
              <AppLink
                onPress={() => {
                  navigation.navigate("Signin");
                }}
                title="login into your account"
              />
              <AppLink
                onPress={() => {
                  navigation.navigate("Signup");
                }}
                title="create your account"
              />
            </View>
          </View>
        }
      />
    </Form>
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
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default ForgotPassword;
