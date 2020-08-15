import React from "react";
import {View, Text, StyleSheet, ImageBackground, Dimensions} from "react-native";
import SearchInput from "./SearchInput";

export default function Banner() {

  return(
    <View>
      <ImageBackground source={require("../../assets/movieBanner.jpg")} style={styles.image}>
        <Text style={styles.bannerTitle}>Your own movie database</Text>
        <Text style={styles.bannerText}>Find all your favourite movies and save them not to forget them ever again</Text>
        <SearchInput/>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 0.3 * Dimensions.get('window').height,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 5,
    },
  bannerTitle: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
    marginBottom: 15,
  },
  bannerText: {
    color: "#ececec",
    opacity: 0.7,
    fontSize: 15,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
})
