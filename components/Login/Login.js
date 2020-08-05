import React, {useState} from "react";
import {login} from "../../API/Login";
import {View, Text, TextInput, Button, StyleSheet} from "react-native";
import {getAccessToken, getUsername} from "../../API/SessionInfo";

export default function Login({navigation}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const handleChangeEmail = (value) => {
    setEmail(value);
  };

  const handleChangePassword = (value) => {
    setPassword(value);
  };

  const loginUser = () => {
    console.log("coucou")
    login(email, password)
    .then(data => {
      console.log(data)
      if(data.status !== 200) {
        setErrorMessage(data.data)
      } else {
        if((getAccessToken() !== undefined) && (getUsername() !== undefined)) {
          navigation.navigate("LoggedIn");
        }
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
        onChangeText={handleChangeEmail}
        value={email}
        placeholder={'Email'}
      />
      <TextInput
        style={styles.input}
        onChangeText={handleChangePassword}
        value={password}
        placeholder={'Password'}
        secureTextEntry={true}
      />
      <Button
        onPress={loginUser}
        title="Login"
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
  },
});

