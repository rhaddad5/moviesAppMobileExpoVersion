import React from "react";
import Banner from "../_Shared/Banner";
import MoviesList from "./MoviesList";
import {useSelector} from "react-redux";
import {View, Text, StyleSheet} from "react-native";

export default function MoviesContainer({navigation}) {

  const movies = useSelector(state => state.moviesListReducer);

  return(
    <View>
      <Banner/>
      <MoviesList movies={movies} navigation={navigation}/>
    </View>
  )
}
