import { createContext, useReducer } from "react";

export const AuthContext = createContext({});

const initialState = {
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        user: {
          email: action.user.email,
          username: action.user.username,
          isAuth: true,
        },
      };
    case "LOG_OUT":
      return {
        user: null,
      };
    default:
      return state;
  }
}

function AuthContextWrapper({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState); //state is set to initial state value
  //dispatch allows us to create an action object.
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextWrapper;
