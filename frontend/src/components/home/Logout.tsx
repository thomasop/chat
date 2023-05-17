import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/store";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const token = useSelector((state: RootState) => state.login.token);
  useEffect(() => {
    const logout = async () => {
      const response = await fetch("http://localhost:8080/user/logout", {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      await response.json();
      dispatch({
        type: "login/loginUser",
        payload: { token: "", userId: "", userLog: false}
      }
      );
      document.cookie = "userId =; Max-Age=0";
      document.cookie = "token =; Max-Age=0";
      navigate('/')
    };
    logout();
  }, [dispatch, navigate, token]);
  return null;
};

export default Logout;
