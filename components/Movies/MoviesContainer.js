import React from "react";
import Banner from "../_Shared/Banner";
import MoviesList from "./MoviesList";
import {useSelector} from "react-redux";
import {View, StyleSheet} from "react-native";

export default function MoviesContainer({navigation}) {

  const movies = useSelector(state => state.moviesListReducer);

  return(
    <View>
      <Banner/>
      <View>
        <MoviesList movies={movies} navigation={navigation}/>
      </View>
    </View>
  )
}


