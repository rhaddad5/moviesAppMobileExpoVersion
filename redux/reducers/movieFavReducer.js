const initialState = [];

export const movieFavReducer = (state = initialState, action) => {
  switch(action.type) {
    case "ADD_FAVOURITE_MOVIES":
      return action.payload.data;
    default:
      return state;
  }
};

