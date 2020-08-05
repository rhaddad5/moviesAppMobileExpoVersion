import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {movieDetailsSearch} from "../../API/MovieSearch";
import {StyleSheet, Text, View, Image} from 'react-native';
import FavouriteButton from "../_Shared/FavouriteButton";
import {getAccessToken} from "../../API/SessionInfo";
import {useFocusEffect} from "@react-navigation/native";

export default function MovieDetails({route, navigation}) {

  const dispatch = useDispatch();

  const {id} = route.params;

  useFocusEffect(() => {
    movieDetailsSearch(id, dispatch);
  }, []);

  const movieInfo = useSelector(state => state.moviesListReducer);

  return(
    <View style={styles.cardContainer}>
      <Image
        source={{uri:`https://image.tmdb.org/t/p/original/${movieInfo.poster_path}`}} style={styles.image}/>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{movieInfo.title}</Text>
        <Text style={styles.date}>{movieInfo.release_date}</Text>
        {(getAccessToken !== undefined) ? <FavouriteButton movieTitle={movieInfo.title} movieDate={movieInfo.release_date} movieId={movieInfo.id} movieOverview={movieInfo.overview} movieImagePath={`https://image.tmdb.org/t/p/original/${movieInfo.poster_path}`}/>  : ""}
        <Text style={styles.overview}>{movieInfo.overview}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 400,
  },
  contentContainer: {
    alignItems: "center",
  },
  cardContainer: {
    backgroundColor: "white",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#F4F6F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  overview: {
    marginVertical: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginVertical: 5,
  },
  date: {
    opacity: 0.7,
    marginVertical: 5,
  },
})


