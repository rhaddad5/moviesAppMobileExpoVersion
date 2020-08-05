const initialState = [];

export const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case "ADD_USERNAME":
      return action.payload.data;
    default:
      return state;
  }
};

