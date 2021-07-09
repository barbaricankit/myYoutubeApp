export const manageUser = (state, action) => {
  switch (action.type) {
    case "FIRST_NAME":
      return { ...state, firstName: action.value };
    case "LAST_NAME":
      return { ...state, lastName: action.value };
    case "EMAIL":
      return { ...state, email: action.value };
    case "USER_NAME":
      return { ...state, userName: action.value };
    case "PASSWORD":
      return { ...state, password: action.value };
    case "RE_ENTER_PASSWORD":
      return { ...state, re_enterPassword: action.value };
    default:
      return state;
  }
};
