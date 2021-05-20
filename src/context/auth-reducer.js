export const manageAuthReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_ID":
      return {
        ...state,
        userId: action.value.userId,
        userInitials: action.value.userInitials,
        login: true,
      };
    case "LOGOUT":
      return { ...state, userId: null, login: false };
    default:
      return state;
  }
};
