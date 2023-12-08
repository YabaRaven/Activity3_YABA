import { View, ToastAndroid, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Button, Text, TextInput, HelperText } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import fetchServices from "../services/fetchSvcs";


export default function LoginForm({ navigation }) {
  const [showPass, setShowPass] = React.useState(false);

  const showToast = (message = "Something wen't wrong") => {
    ToastAndroid.show(message, 3000);
  };
  
  const handleLogin = async (values) => {
    try { 
      const url = "http://192.168.254.113/api/v1/login";
      const result = await fetchServices.postData(url, values);

      if (result.message != null) {
        showToast(result?.message);
      } else {
        navigation.navigate("Home");
      }
    } catch (e) {
      console.debug(e.toString());
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid Email")
      .required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values) => {
        await handleLogin(values);
      }}
      validationSchema={validationSchema}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        errors,
        touched,
        setTouched,
      }) => {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
            <Image
              style={{width: 300, height: 200}}
              source={require('../screens/images/logo.png')}
            />
            <Text style={{fontSize: 35, fontWeight: 'bold', justifyContent: 'center'}}> LOGIN </Text>
            <Text style={{fontSize: 15, marginTop: 5, marginBottom: 10}}> Please login to continue using the app</Text>
            
            
            <TextInput
              mode="outlined"
              placeholder="Email"
              label="Email"
              left={<TextInput.Icon icon="email-outline" />}
              style={{ marginTop: 10, borderRadius: 15, width: 300 }}
              defaultValue={values.email}
              value={values.email}
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              error={errors.email && touched.email}
              onFocus={() => setTouched({ email: true }, false)}
            />
            {errors.email && touched.email && (
              <HelperText type="error" visible={errors.email} style={{right: 85}}>
                {errors.email}
              </HelperText>
            )}
            <TextInput
              mode="outlined"
              placeholder="Password"
              label="Password"
              left={<TextInput.Icon icon="lock-outline" />}
              secureTextEntry={!showPass}
              right={
                <TextInput.Icon
                  icon={showPass ? "eye" : "eye-off"}
                  onPress={() => setShowPass(!showPass)}
                />
              }
              style={{ marginTop: 10, borderRadius: 15, width: 300 }}
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              error={errors.password && touched.password}
              onFocus={() => setTouched({ password: true }, false)}
            />
            {errors.password && touched.password && (
              <HelperText type="error" visible={errors.password} style={{right: 70}}>
                {errors.password}
              </HelperText>
            )}
            <Button
              loading={isSubmitting}
              disabled={isSubmitting}
              onPress={handleSubmit}
              icon="location-enter"
              mode="contained"
              style={{ marginTop: 40, borderRadius: 10, backgroundColor: '#004080', marginBottom: 10, width: 200 }}
            >
              Login
            </Button>
            <TouchableOpacity
              disabled={isSubmitting}
              mode="contained"
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={{color: '#004080', fontSize: 16, marginTop: 20}}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
          </View>
        );
      }}
    </Formik>
  );
}
