import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Platform} from 'react-native';
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
import Constants from 'expo-constants';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const statusBarHeight = Constants.statusBarHeight

function LoggedIn() {

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

  const [userAccessTokenPresent, setUserAccessTokenPresent] = useState(false);
  const [usernamePresent, setUsernamePresent] = useState(false);

  useEffect(() => {
    getAccessToken()
    .then(data => {
      if(data === null) {
        setUserAccessTokenPresent(false);
      } else {
        setUserAccessTokenPresent(true);
      }
    })
    getUsername()
    .then(data => {
      if(data === null) {
        setUsernamePresent(false);
      } else {
        setUsernamePresent(true);
      }
    })
  }, []);

  if(!(userAccessTokenPresent && usernamePresent)) {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator headerMode="none">
              <Stack.Screen name="Home" component={Home} options={{title: ""}}/>
              <Stack.Screen name="LoggedIn" component={LoggedIn} options={{title: ""}}/>
              <Stack.Screen name="Signup" component={Signup} options={{title: ""}}/>
              <Stack.Screen name="Login" component={Login} options={{title: ""}}/>
              <Stack.Screen name="Logout" component={Logout} options={{title: "Log out"}}/>
              <Stack.Screen name="MovieDetails" component={MovieDetails} options={{title: ""}}/>
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    );
  }
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator headerMode="none">
              <Stack.Screen name="LoggedIn" component={LoggedIn} options={{title: ""}}/>
              <Stack.Screen name="Home" component={Home} options={{title: ""}}/>
              <Stack.Screen name="Signup" component={Signup} options={{title: ""}}/>
              <Stack.Screen name="Login" component={Login} options={{title: ""}}/>
              <Stack.Screen name="Logout" component={Logout} options={{title: "Log out"}}/>
              <Stack.Screen name="MovieDetails" component={MovieDetails} options={{title: ""}}/>
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    );

  // } else {
  //   return (
  //     <Provider store={store}>
  //       <SafeAreaView style={styles.container}>
  //         <NavigationContainer>
  //           <Stack.Navigator>
  //             <Stack.Screen name="LoggedIn" component={LoggedIn} options={{title: ""}}/>
  //             <Stack.Screen name="HomeBanner" component={HomeBanner} options={{title: ""}}/>
  //             <Stack.Screen name="Signup" component={Signup}/>
  //             <Stack.Screen name="Login" component={Login}/>
  //             <Stack.Screen name="MovieDetails" component={MovieDetails}/>
  //           </Stack.Navigator>
  //         </NavigationContainer>
  //       </SafeAreaView>
  //     </Provider>
  //   );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
              android: {
                marginTop: statusBarHeight,
              },
            }),
  },
});
