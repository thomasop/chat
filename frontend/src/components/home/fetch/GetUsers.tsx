import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../utils/store";

interface Data {
  results: Result[];
}

interface Result {
  id: number;
  firstname: string;
  lastname: string;
  mail: string;
  password: string;
  status: boolean;
}

const GetUsers: React.FC = () => {
  const dispatch = useDispatch()
  const token = useSelector((state: RootState) => state.login.token)
  useEffect(() => {
    const getDatas = async () => {
      let response = await fetch("http://localhost:8080/user/all", {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      let json: Data = await response.json();
      dispatch({
        type: "user/getUser",
        payload: {user: json.results}
      })
    };
    if (token.length > 0) {
      getDatas();
    }
  }, [dispatch, token]);
  return null;
};

export default GetUsers;
