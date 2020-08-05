import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {Provider} from "react-redux";
import store from "./redux/store";
import MoviesContainer from "./components/Movies/MoviesContainer";
import MovieDetails from "./components/Movies/MovieDetails";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import FavouriteMovies from "./components/Movies/FavouriteMovies";
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {getAccessToken, getUsername, clearAsyncStorage} from "./API/SessionInfo";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function LoggedIn() {

  const onPressLogout = () => {
    clearAsyncStorage()
    navigation.navigate("Home");
  };

  return (
    <Tab.Navigator activeColor="#f0edf6"
      inactiveColor="#a3282c"
      barStyle={{backgroundColor: "#4E1214"}}>
      <Tab.Screen name="MoviesContainer" component={MoviesContainer} options={{title: "Home"}}/>
      <Tab.Screen name="FavouriteMovies" component={FavouriteMovies} options={{title: "My Movies"}}/>
      <Tab.Screen name="Logout" component={Logout} options={{title: "Log out"}} listeners={({navigation, route}) => ({
          tabPress: e => {
              e.preventDefault()
              clearAsyncStorage()
              navigation.navigate("Home")
          }
        })
      }/>
    </Tab.Navigator>
  );
}

export default function App() {
  if((getAccessToken() !== undefined) && (getUsername() !== undefined)) {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="LoggedIn" component={LoggedIn} options={{title: ""}}/>
              <Stack.Screen name="Signup" component={Signup} options={{title: ""}}/>
              <Stack.Screen name="Login" component={Login} options={{title: ""}}/>
              <Stack.Screen name="Home" component={Home} options={{title: ""}}/>
              <Stack.Screen name="Logout" component={Logout} options={{title: "Log out"}}/>
              <Stack.Screen name="MovieDetails" component={MovieDetails} options={{title: ""}}/>
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    );
  } else {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="LoggedIn" component={LoggedIn}/>
              <Stack.Screen name="Signup" component={Signup}/>
              <Stack.Screen name="Login" component={Login}/>
              <Stack.Screen name="MovieDetails" component={MovieDetails}/>
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
