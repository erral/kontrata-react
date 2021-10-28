const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_LANGUAGE":
      return {
        ...state,
        language: action.data,
      };
    default:
      return state;
  }
};

export default Reducer;
