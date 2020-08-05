import React from "react";
import {View, Text, StyleSheet, ImageBackground, Button, Platform} from "react-native";

export default function HomeBanner({navigation}) {
  return(
    <View>
      <ImageBackground source={require("../../assets/movieBanner.jpg")} style={styles.image}>
        <Text style={styles.bannerTitle}>Your own movie database</Text>
        <Text style={styles.bannerText}>Find all your favourite movies and save them not to forget them ever again</Text>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => {navigation.navigate("Login")}}
            title="Login"
            color={Platform.OS === "ios" ? "white" : "#4E1214"}
          />
          <Button
            onPress={() => {navigation.navigate("Signup")}}
            title="Signup"
            color={Platform.OS === "ios" ? "white" : "#4E1214"}
          />
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 450,
    height: 800,
    paddingVertical: 240,
    paddingHorizontal: 40,
    },
  bannerTitle: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
    marginBottom: 30,
  },
  bannerText: {
    color: "#ececec",
    opacity: 0.7,
    fontSize: 15,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 30,
    ...Platform.select({
              android: {
                justifyContent: "space-evenly",
              },
            }),
  },
})
