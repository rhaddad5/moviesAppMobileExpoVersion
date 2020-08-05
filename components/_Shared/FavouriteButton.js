import React, {useState, useEffect} from "react";
import {View, TouchableOpacity, StyleSheet} from "react-native";
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faStar as fasStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as farStar} from '@fortawesome/free-regular-svg-icons';
import {saveFavouriteMovie} from "../../API/FavouriteMovie";
import {destroyFavouriteMovie, getFavouriteMovies} from "../../API/FavouriteMovie";
import {useDispatch, useSelector} from "react-redux";
import {useFocusEffect} from "@react-navigation/native";

library.add(fasStar, farStar);

export default function FavouriteButton({movieTitle, movieDate, movieId, movieOverview, movieImagePath}) {

  const [fav, setFav] = useState(false);

  const dispatch = useDispatch();

  const toggleFavStatus = () => {
    setFav(!fav);
    if(!fav) {
      saveFavouriteMovie(movieTitle, movieDate, movieId, movieOverview, movieImagePath);
    } else {
      destroyFavouriteMovie(movieId);
    }
  };

  useFocusEffect(() => {
    getFavouriteMovies(dispatch);
  }, []);

  const favouriteMovies = useSelector(state => state.movieFavReducer);

  let favMovie = [];

  const isFav = () => {
    favouriteMovies.forEach((movie) => {
      if(movie.tmdbId === movieId) {
        favMovie.push(true);
      }
    });
  }

  useFocusEffect(() => {
    isFav();
    if(favMovie[0]) {
      setFav(true);
    } else {
      setFav(false);
    }
  }, []);

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
