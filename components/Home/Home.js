import React from "react";
import HomeBanner from "../_Shared/HomeBanner";
import {useSelector} from "react-redux";
import {View, StyleSheet} from "react-native";

export default function Home({navigation}) {

  const movies = useSelector(state => state.moviesListReducer);

  return(
    <View>
      <HomeBanner navigation={navigation}/>
    </View>
  )
}


