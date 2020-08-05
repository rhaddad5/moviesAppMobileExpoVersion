import React, {useState} from "react";
import {signup} from "../../API/Signup";
import {View, Text, TextInput, Button, StyleSheet} from "react-native";

export default function Login({navigation}) {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const handleChangeUsername = (value) => {
    if(value.length < 3) {
      setErrorMessage("Please enter a username");
    } else {
      setErrorMessage(false);
    }
    setUsername(value);
  };

  const handleChangeEmail = (value) => {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regex.test(value)) {
      setErrorMessage(false);
    } else {
      setErrorMessage("Please enter a valid email");
    }
    setEmail(value);
  };

  const handleChangePassword = (value) => {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if(regex.test(value)) {
      setErrorMessage(false);
    } else {
      setErrorMessage("Your password must contain at least 8 characters with 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character");
    }
    setPassword(value);
  };

  const createUser = () => {
    signup(username, email, password)
    .then(data => {
      if(data.status !== 200) {
        setErrorMessage(data.data);
      } else {
        navigation.navigate("Login");
      }
    })
  };

  return(
    <View style={styles.container}>
      {errorMessage &&
        (<View style={styles.flashContainer}>
          <Text style={styles.flashText}>{errorMessage}</Text>
        </View>)
      }
      <TextInput
        style={styles.input}
        onChangeText={handleChangeUsername}
        value={username}
        placeholder={"Username"}
      />
      <TextInput
        style={styles.input}
        onChangeText={handleChangeEmail}
        value={email}
        placeholder={"Email"}
      />
      <TextInput
        style={styles.input}
        onChangeText={handleChangePassword}
        value={password}
        placeholder={"Password"}
        secureTextEntry={true}
      />
      <Button
        onPress={createUser}
        title="Signup"
        color="#4E1214"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  flashContainer: {
    backgroundColor: "white",
    paddingHorizontal: 120,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 50,
    borderColor: "#FFC65A",
    borderWidth: 2,
  },
  flashText: {
    color: "black",
  }
});

