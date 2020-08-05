import React, {useState} from "react";
import {moviesListSearch} from "../../API/MovieSearch";
import {useDispatch} from "react-redux";
import {View, TextInput, StyleSheet, Button, Platform} from "react-native";

export default function SearchInput() {

  const [query, setQuery] = useState("");

  const handleChange = (value) => {
    setQuery(value);
  };

  const dispatch = useDispatch();

  const searchMovies = () => {
    moviesListSearch(query, dispatch);
  };

  return(
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          value={query}
          onChangeText={handleChange}
          style={styles.textInput}
        />
      </View>
      <Button
        onPress={searchMovies}
        color={Platform.OS === "ios" ? "white" : "#4E1214"}
        title="Search"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  containerInput: {
    width: "75%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
    paddingLeft: 7
  },
  textInput: {
    color: "white",
  }
})
