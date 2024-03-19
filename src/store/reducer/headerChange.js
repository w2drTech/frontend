const initialState = {
  headerTopic: null,
};
const headerTopicReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TOPIC":
      return { ...state, headerTopic: action.topic };
  }
  return state;
};

export default headerTopicReducer;
