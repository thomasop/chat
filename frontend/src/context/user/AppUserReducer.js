const initState = {
  token: '',
  userId: '',
  userLog: false
}

const AppUserReducer = (
    state,
    action
  ) => {
    switch (action.type) {
      case "LOG_USER":
        return {
          ...state,
          token: action.payload.token,
          userId: action.payload.userId,
          userLog: action.payload.userLog,
        }
        default:
          return state; 
    }
  };
  
  export { initState}
  export default AppUserReducer;