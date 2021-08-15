import { Formik } from "formik";
import React from "react";
import {
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import * as Yup from "yup";
import { StackScreenProps } from "@react-navigation/stack";

import { Button, TextInput, Box, Text, theme, BackButton } from "../components";
import { AuthParamList } from "../../types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    alignItems: "center",
    paddingTop: 20,
  },
  backButton: {
    flexDirection: "row",
    paddingLeft: 20,
  },
});

const emailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const ForgotPassword = ({
  navigation,
}: StackScreenProps<AuthParamList, "ForgotPassword">) => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "position" : "height"}
      >
        <Box style={styles.main}>
          <Box style={styles.backButton}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackButton />
            </TouchableOpacity>
            <Box style={{ flex: 1 }} />
          </Box>
          <Box style={styles.image}>
            <Image
              source={require("../../assets/forgotPassword.png")}
              style={{ width: 360, height: 286 }}
            />
          </Box>
          <Text variant="h2" color="primary" marginBottom="m">
            Forgot Password?
          </Text>
          <Text variant="b3" color="grey" marginBottom="xl">
            enter your email to recover your password
          </Text>

          <Formik
            validationSchema={emailSchema}
            initialValues={{ email: "" }}
            onSubmit={(values) => console.log(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <Box>
                <Box style={{ marginBottom: 7 }}>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    icon="mail"
                    placeholder="Your Email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    error={errors.email}
                    touched={touched.email}
                  />
                  {errors && (
                    <Text variant="b3" color="red" marginTop="s">
                      {errors.email}
                    </Text>
                  )}
                </Box>
                <Button label="Recover password" onPress={handleSubmit} />
              </Box>
            )}
          </Formik>
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
