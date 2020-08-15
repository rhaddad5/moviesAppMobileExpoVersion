import React, {useState, useEffect} from "react";
import {View, TouchableOpacity, StyleSheet} from "react-native";
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faStar as fasStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as farStar} from '@fortawesome/free-regular-svg-icons';
import {saveFavouriteMovie, destroyFavouriteMovie, getFavouriteMovies} from "../../API/FavouriteMovie";
import {useDispatch, useSelector} from "react-redux";
import {useFocusEffect} from "@react-navigation/native";

library.add(fasStar, farStar);

export default function FavouriteButton({movieTitle, movieDate, movieId, movieOverview, movieImagePath}) {

  const [fav, setFav] = useState(false);

  const dispatch = useDispatch();

  const favouriteMovies = useSelector(state => state.movieFavReducer);

  const toggleFavStatus = () => {
    if(!fav) {
      setFav(true);
      saveFavouriteMovie(movieTitle, movieDate, movieId, movieOverview, movieImagePath);
      favouriteMovies.push({"imagePath": movieImagePath, "overview": movieOverview, "releaseDate": movieDate, "title": movieTitle, "tmdbId": movieId})
      console.log("FAV MOVIES", favouriteMovies)
    } else {
      setFav(false);
      destroyFavouriteMovie(movieId);
      favouriteMovies.forEach((movie, index) => {
        if(movie.tmdbId === movieId) {
          favouriteMovies.splice(index, 1);
        }
      });
      console.log("FAV MOVIES", favouriteMovies)
    }
  };

  // useFocusEffect(() => {
  //   getFavouriteMovies(dispatch);
  // }, []);

  const isFav = () => {
    let alreadyFav = false;
    favouriteMovies.forEach((movie) => {
      if(movie.tmdbId === movieId) {
        alreadyFav = true;
      }
    if(alreadyFav) {
      setFav(true);
    } else {
      setFav(false);
    }
    });
  }

  useFocusEffect(() => {
    isFav();
    // console.log(fav);
  }, [fav]);

  return(
    <View>
      <TouchableOpacity
        onPress={toggleFavStatus}>
        {fav ? <FontAwesomeIcon size={32} color="orange" icon={fasStar} style={style.icon}/> : <FontAwesomeIcon size={32} color="orange" icon={farStar} style={style.icon}/>}
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  icon: {
    marginVertical: 5,
  }
})
