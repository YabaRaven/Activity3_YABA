import { View, ToastAndroid, TouchableOpacity } from "react-native";
import React from "react";
import { Button, Text, TextInput } from "react-native-paper";
import fetchServices from "../services/fetchSvcs";
import { Image } from 'react-native';



export default function LoginForm({ navigation }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repassword, setRepassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [showRePass, setShowRePass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const showToast = (message = "Something wen't wrong") => {
    ToastAndroid.show(message, 3000);
  };

  const handleRegistration = async () => {
    try {
      setLoading(true);

      if (name === "" || email === "" || password === "" || repassword === "") {
        showToast("Please input required data");
        setIsError(true);
        return false;
      }

      if (password !== repassword) {
        showToast("Please match the password");
        setIsError(true);
        return false;
      }

      const url = "http://192.168.254.113/api/v1/register";
      const data = {
        name,
        email,
        password,
        password_confirmation: repassword,
      };
 
      const result = await fetchServices.postData(url, data);
      
      if (result?.message != null) {
        showToast(result?.message);
      } else {
        navigation.navigate("Login");
      }
    } catch (e) { 
      console.debug('test');
      console.debug(e.toString()) 
      showToast(e.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        style={{width: 300, height: 200}}
        source={require('../screens/images/logo.png')}
      />

      <Text style={{fontSize: 35,marginTop: 15, marginBottom: 10, fontWeight: 'bold', justifyContent: 'center'}}> SIGN UP </Text>
      <Text style={{fontSize: 15, marginTop: 5, marginBottom: 30}}> Please fill the details to create account</Text>
            
      
      <TextInput
        mode="outlined"
        placeholder="Name"
        label="Name"
        style={{ marginTop: 10, borderRadius: 15, width: 300 }}
        value={name}
        onChangeText={setName}
        error={isError}
      />
      <TextInput
        mode="outlined"
        placeholder="Email"
        label="Email"
        style={{ marginTop: 10, borderRadius: 15, width: 300 }}
        value={email}
        onChangeText={setEmail}
        error={isError}
      />
      <TextInput
        mode="outlined"
        placeholder="Password"
        label="Password"
        secureTextEntry={!showPass}
        right={
          <TextInput.Icon
            icon={showPass ? "eye" : "eye-off"}
            onPress={() => setShowPass(!showPass)}
          />
        }
        style={{ marginTop: 10, borderRadius: 15, width: 300 }}
        value={password}
        onChangeText={setPassword}
        error={isError}
      />
      <TextInput
        mode="outlined"
        placeholder="Re-type Password"
        label="Re-type Password"
        secureTextEntry={!showRePass}
        right={
          <TextInput.Icon
            icon={showPass ? "eye" : "eye-off"}
            onPress={() => setShowRePass(!showRePass)}
          />
        }
        style={{ marginTop: 10, borderRadius: 15, width: 300 }}

        value={repassword}
        onChangeText={setRepassword}
        error={isError}
      />
      <Button
        disabled={loading}
        loading={loading}
        icon="account-plus"
        mode="contained"
        style={{ marginTop: 40, borderRadius: 10, backgroundColor: '#004080', marginBottom: 10, width: 200 }}
        onPress={handleRegistration}
      >
        Create Account
      </Button>
      {/* <Button
        disabled={loading}
        onPress={() => navigation.pop()}
        icon="arrow-left"
        mode="contained"
        style={{ marginTop: 10, borderRadius: 10, marginBottom: 10, marginTop: 5, backgroundColor: '#004080', fontSize: 16,}}

      >
        Go Back
      </Button> */}
      <TouchableOpacity
        disabled={loading}
        mode="contained"
        onPress={() => navigation.pop()}
      >
        <Text style={{color: '#004080', fontSize: 16, marginTop: 20}}>Already have an account? Log in</Text>
        </TouchableOpacity>
    </View>
  );
}
