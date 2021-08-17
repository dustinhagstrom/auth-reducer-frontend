import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";

function useFetchAPI(url) {
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/api"
      : "DEPLOYED LOCATION";

  const [isLoading, setIsLoading] = useState(false); //handles if loading
  const [response, setResponse] = useState(null); //response.data.message
  const [error, setError] = useState(null); //e.response.data.message
  const [options, setOptions] = useState({});

  const [isMessageOpen, setIsMessageOpen] = useState(false); //for snackbar messages from material ui

  const [successMessageValue, setSuccessMessage] = useState(null);

  const { dispatch } = useContext(AuthContext);

  function handleMessageOpen() {
    //func for snackbar
    setIsMessageOpen(true);
  }
  function handleMessageClose() {
    //func for snackbar
    setError(null);
    setResponse(null);
    setIsMessageOpen(false);
    setSuccessMessage(null);
  }

  function handleAPICallButtonSubmit(options = {}) {
    //options = {} is a default parameter that states if an options is not passed then the default value is empty obj
    setOptions(options);
    setIsLoading(true);
  }

  async function handleAPIFetchCall() {
    const requestOptionObj = {
      ...options,
      withCredentials: true, //this is a boolean that says we should allow credentials cross-site. this is ignored if the req origin is same as res origin.
      credentials: "include", //this allows sending cookies cross-origin. "Request.credentials"
      ...{
        headers: {
          authorization: null, //credentials are held within the cookie not auth headers
        },
      },
    };

    try {
      let response = await axios(baseURL + url, requestOptionObj);
      console.log(response);

      if (response.data.message === "user created") {
        setResponse(response.data.message);
        setIsLoading(false);
        handleMessageOpen();
        setSuccessMessage(response.data.message);
      } else {
        setIsLoading(false);
        dispatch({
          type: "LOGIN",
          user: {
            email: response.data.user.email,
            username: response.data.user.username,
          },
        });
      }
    } catch (e) {
      //console.log(e.response);
      setError(e.response.data.message);
      setIsLoading(false);
      handleMessageOpen();
    }
  }

  useEffect(() => {
    if (!isLoading) {
      return;
    } //this prevents api call on initial mount

    handleAPIFetchCall();
  }, [isLoading, url, options, baseURL]); //if any of these parameters are updated then use effect calls

  return [
    { isLoading, response, error, setError, setResponse },
    handleAPICallButtonSubmit,
    isMessageOpen,
    handleMessageOpen,
    handleMessageClose,
    successMessageValue,
  ];
}

export default useFetchAPI;
