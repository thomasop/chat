import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";

interface Proptypes {
  setData: Dispatch<SetStateAction<Data | null>>;
}

interface Data {
  result: Result[];
}

interface Result {
  id: number;
  content: string;
  date: string;
  conversationId: number;
  userId: number;
  new: boolean;
  user: User;
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  mail: string;
  password: string;
  status: boolean;
}

const GetMessages: React.FC<Proptypes> = ({
  setData,
}) => {
  const { conversationId } = useSelector((state: RootState) => state.conversation);
  console.log(typeof conversationId)
  const token = useSelector((state: RootState) => state.login.token)
  useEffect(() => {
    const getData = async () => {
      let response = await fetch(
        `http://localhost:8080/message/all/${conversationId}`,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      let json: Data = await response.json();
      json.result.sort(function (a, b) {
        return new Date(a.date).valueOf() - new Date(b.date).valueOf();
      });
      setData(json);
    };
    if (conversationId !== null || conversationId !== "") {
      getData();
    }
  }, [conversationId, setData, token]);
  return null;
};

export default GetMessages;
