import jwtDecode from "jwt-decode";
import Cookie from "js-cookie";
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

function CheckAuthCookie() {
  const { dispatch } = useContext(AuthContext);
  function checkIfCookieExists() {
    const cookie = Cookie.get("jwt-cookie");

    if (cookie) {
      return true;
    } else {
      return null;
    }
  }

  function logUserIn() {
    let checkCookieExists = checkIfCookieExists();

    if (checkCookieExists) {
      const cookie = Cookie.get("jwt-cookie");
      const jwtDecodedToken = jwtDecode(cookie);

      dispatch({
        type: "LOGIN",
        user: {
          email: jwtDecodedToken.email,
          username: jwtDecodedToken.username,
        },
      });
    }
  }

  return {
    checkIfCookieExists,
    logUserIn,
  };
}

export default CheckAuthCookie;
