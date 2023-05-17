import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const CheckUserLog: React.FC = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let cookieToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    let cookieUserId = document.cookie.replace(
      /(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (
      cookieUserId &&
      cookieToken &&
      cookieToken.length > 0 &&
      cookieUserId.length > 0
    ) {
      dispatch({
        type: "login/loginUser",
        payload: { token: cookieToken, userId: cookieUserId, userLog: true },
      });
      navigate("/home");
    } else {
      dispatch(
        dispatch({
          type: "login/loginUser",
          payload: { token: "", userId: "", userLog: false },
        })
      );
      navigate("/");
    }
  }, [dispatch, navigate]);
  return null;
};

export default CheckUserLog;
