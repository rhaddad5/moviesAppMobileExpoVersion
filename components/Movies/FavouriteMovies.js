import React, {useEffect} from "react";
import {getFavouriteMovies} from "../../API/FavouriteMovie";
import {View, Text, FlatList, StyleSheet, Image, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {getUsername} from "../../API/SessionInfo";
import {fetchUsername} from "../../redux/actions";
import {useFocusEffect, Link} from "@react-navigation/native";

export default function FavouriteMovies({navigation}) {

  const dispatch = useDispatch();

  const getStoredUsername = async () => {
    const username = await getUsername();
    dispatch(fetchUsername(username));
  };

  useEffect(() => {
    getStoredUsername();
  }, []);

  useFocusEffect(() => {
    getFavouriteMovies(dispatch);
  }, []);

  const favouriteMovies = useSelector(state => state.movieFavReducer);
  const username = useSelector(state => state.userReducer);

  const _renderMovie = ({item}) => {
    return(
      <TouchableOpacity
        onPress={() => {navigation.navigate("MovieDetails", {
              id: item.tmdbId
            })}}
      >
        <View style={styles.cardContainer}>
          <Image
            source={{uri:`${item.imagePath}`}} style={styles.image}/>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{item.releaseDate}</Text>
          <Text style={styles.overview}>{item.overview}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  return(
    <View style={styles.container}>
      {favouriteMovies[0] ? <Text style={styles.welcomeTitleWithMovies}>Hi {username}! Here are your favourite movies</Text> : <Text style={styles.welcomeTitleWithoutMovies}>Hi {username}! You don't have any movies in your list yet, click <Link to="/MoviesContainer" style={styles.link}>here</Link> to add some</Text>}
      <FlatList
        data={favouriteMovies}
        renderItem={_renderMovie}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  welcomeTitleWithMovies: {
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
    opacity: 0.8,
    color: "#4E1214",
  },
  welcomeTitleWithoutMovies: {
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
    opacity: 0.8,
    marginVertical: "50%",
    color: "#4E1214",
  },
  link: {
    opacity: 0.5,
  },
})
