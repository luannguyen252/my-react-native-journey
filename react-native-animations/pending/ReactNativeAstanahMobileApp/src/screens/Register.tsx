import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { StackScreenProps } from "@react-navigation/stack";

import {
  Box,
  Text,
  theme,
  TextInput,
  Button,
  Link,
  BackButton,
} from "../components";
import { AuthParamList } from "../../types";
import { CloseEye, Eye } from "../Svg";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  main: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    width: 72,
    height: 72,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.spacing.s,
    marginBottom: theme.spacing.xl,
    marginTop: 20,
  },
  inputs: {
    marginTop: 25,
  },
  button: {
    marginTop: theme.spacing.l,
  },
  backButton: {
    paddingTop: 20,
    flexDirection: "row",
    paddingLeft: 20,
  },
});

const RegisterSchema = Yup.object().shape({
  name: Yup.string().min(3).max(50).required(),
  password: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  forgotPassword: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required(),
});

interface RegisterProps {}

const Register = ({
  navigation,
}: StackScreenProps<AuthParamList, "Register">) => {
  const [passwordVissible, setPasswordVissible] = useState<boolean>(false);
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "position" : "height"}
      >
        <Box style={styles.backButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackButton />
          </TouchableOpacity>
          <Box style={{ flex: 1 }} />
        </Box>
        <Box style={styles.main}>
          <Box style={styles.logo}>
            <Text color="white">Logo</Text>
          </Box>
          <Text variant="h4" color="primary">
            Let's get Started
          </Text>
          <Text variant="b3" color="grey" style={{ marginTop: 10 }}>
            Create a new account
          </Text>
          <Formik
            validationSchema={RegisterSchema}
            initialValues={{
              name: "",
              email: "",
              password: "",
              forgotPassword: "",
            }}
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
              <Box style={styles.inputs}>
                <Box>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    textContentType="name"
                    icon="user"
                    placeholder="Full Name"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    error={errors.name}
                    touched={touched.name}
                  />
                  {errors && (
                    <Text variant="b3" color="red">
                      {errors.name}
                    </Text>
                  )}
                </Box>
                <Box>
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
                    <Text variant="b3" color="red">
                      {errors.email}
                    </Text>
                  )}
                </Box>
                <Box style={{ flexDirection: "row" }}>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={!passwordVissible}
                    textContentType="password"
                    icon="lock"
                    placeholder="Password"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    error={errors.password}
                    touched={touched.password}
                  />
                  <Box
                    style={{ position: "absolute", left: width - 80, top: 14 }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => setPasswordVissible(!passwordVissible)}
                    >
                      {passwordVissible ? (
                        <Eye width={18} />
                      ) : (
                        <CloseEye width={18} />
                      )}
                    </TouchableOpacity>
                  </Box>
                </Box>
                {errors && (
                  <Text variant="b3" color="red">
                    {errors.password}
                  </Text>
                )}
                <Box style={{ flexDirection: "row" }}>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={!passwordVissible}
                    textContentType="password"
                    icon="lock"
                    placeholder="Password Again"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    error={errors.password}
                    touched={touched.password}
                  />
                  <Box
                    style={{ position: "absolute", left: width - 80, top: 14 }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => setPasswordVissible(!passwordVissible)}
                    >
                      {passwordVissible ? (
                        <Eye width={18} />
                      ) : (
                        <CloseEye width={18} />
                      )}
                    </TouchableOpacity>
                  </Box>
                </Box>
                {errors && (
                  <Text variant="b3" color="red">
                    {errors.forgotPassword}
                  </Text>
                )}
                <Box style={styles.button}>
                  <Button label="Sign Up" onPress={handleSubmit} />
                </Box>
              </Box>
            )}
          </Formik>
          <Box style={{ flexDirection: "row", marginTop: 20 }}>
            <Text variant="b3" color="grey">
              have an account?{" "}
            </Text>
            <Link
              label="Sign In"
              onPress={() => navigation.navigate("Welcome")}
            />
          </Box>
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
