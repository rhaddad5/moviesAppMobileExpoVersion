import React from "react";
import {View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions} from "react-native";
import MovieDetails from "./MovieDetails";

export default function MoviesList({movies, navigation}) {

  const _renderMovie = ({item}) => {
    return(
      <TouchableOpacity
        onPress={() => {navigation.navigate("MovieDetails", {
              id: item.id
            })}}
      >
        <View style={styles.cardContainer}>
          <Image
            source={{uri:`https://image.tmdb.org/t/p/original/${item.poster_path}`}} style={styles.image}/>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{item.release_date}</Text>
          <Text style={styles.overview}>{item.overview}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  return(
    <View style={styles.contentContainer}>
      {(!movies[0]) ?
        <View style={styles.noMoviesContainer}>
          <Text style={styles.noMoviesText}>Your movies list will appear here</Text>
        </View>
        :
        <FlatList
          data={movies}
          renderItem={_renderMovie}
          keyExtractor={(item) => item.id}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 400,
  },
  contentContainer: {
    backgroundColor: "#4E1214",
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
  noMoviesText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  noMoviesContainer: {
    backgroundColor: "#4E1214",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 0.7 * Dimensions.get('window').height,
  }
})
