export const manageLoginReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USERNAME":
      return { ...state, username: action.value };
    case "UPDATE_PASSWORD":
      return { ...state, password: action.value };
    case "UPDATE_SHOW_PASSWORD":
      return { ...state, showPassword: !state.showPassword };
    case "UPDATE_INCORRECT_PASSWORD":
      return { ...state, incorrectPassword: action.value };
    default:
      return state;
  }
};
