import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";

interface Proptype {
  setDatas: Dispatch<SetStateAction<null | Data[]>>;
}
interface Result {
  result: Data[];
}

interface Data {
  id: number;
  last_message_id: number;
  message: Message;
  userOneAsId: User;
  userOneId: number;
  userTwoAsId: User;
  userTwoId: number;
}

interface Message {
  id: number;
  content: string;
  date: string;
  new: boolean;
  userId: number;
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

const GetConversations: React.FC<Proptype> = ({ setDatas }) => {
  const { token, userId } = useSelector((state: RootState) => state.login);
  useEffect(() => {
    const getDatas = async () => {
      let response = await fetch(
        `http://localhost:8080/conversation/all/${userId}`,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      let json: Result = await response.json();
      let ar: Data[] = [];
      json.result.map((data: Data) => {
        if (data.last_message_id === data.message.id) {
          ar.push(data);
        }
        return null;
      });
      ar.sort((a, b) => {
        return (
          new Date(b.message.date).valueOf() -
          new Date(a.message.date).valueOf()
        );
      });
      setDatas(ar);
    };
    if (userId !== "") {
      getDatas();
    }
  }, [setDatas, token, userId]);
  return null;
};

export default GetConversations;
