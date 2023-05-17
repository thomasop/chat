import React, { useState } from "react";
import AddMessage from "../fetch/AddMessage";
import GetConversations from "../fetch/GetConversations";
import DisplayMessages from "./DisplayMessages";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../utils/store";

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

const DisplayConversation: React.FC = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state: RootState) => state.login);
  const { displayDivMessage, conversationId } = useSelector(
    (state: RootState) => state.conversation
  );
  const [datasConv, setDatasConv] = useState<null | Data[]>(null);
  const [nameOtherUser, setNameOtherUser] = useState<string>("");

  const styleDiv = {
    display: displayDivMessage,
  };

  const updateState: any = (id: string, p: Data) => {
    setNameOtherUser(otherUserName(p));
    dispatch({
      type: "conversation/conversation",
      payload: {
        displayDivMessage: displayDivMessage === "none" ? "block" : "none",
        conversationId: id,
      },
    });
  };
  /* useEffect(() => {
    let tets  = document.querySelector('.getMessage')
    console.log(tets)
    if (tets)
      tets.scrollTop =+ 80
      console.log(tets?.scrollBy)
  }, []) */

  const otherUserName = (p: Data) => {
    if (Number(userId) === p.userOneAsId.id) {
      return (
        p.userTwoAsId.firstname.charAt(0).toUpperCase() +
        p.userTwoAsId.firstname.slice(1) +
        " " +
        p.userTwoAsId.lastname.charAt(0).toUpperCase() +
        p.userTwoAsId.lastname.slice(1)
      );
    } else {
      return (
        p.userOneAsId.firstname.charAt(0).toUpperCase() +
        p.userOneAsId.firstname.slice(1) +
        " " +
        p.userOneAsId.lastname.charAt(0).toUpperCase() +
        p.userOneAsId.lastname.slice(1)
      );
    }
  };
  const jsxRender = () => {
    return (
      <div className="getAll">
        <div className="getAll__div">
          <div className="getConversations">
            {datasConv?.map((p, index) => {
              return (
                <button
                  key={index}
                  className="getConversations__div"
                  onClick={() => updateState(p.id, p)}
                >
                  <p className="getConversations__p" data-myval={p.id}>
                    Conversation avec : {otherUserName(p)}
                  </p>
                  <h2 className="getConversations__h1">
                    {(Number(userId) === p.message.userId && "Vous") ||
                      (Number(userId) !== p.message.userId &&
                        p.message.user.firstname?.charAt(0).toUpperCase() +
                          p.message.user.firstname?.slice(
                            1,
                            p.message.user.firstname.length
                          ) +
                          " " +
                          p.message.user.lastname?.charAt(0).toUpperCase() +
                          p.message.user.lastname?.slice(
                            1,
                            p.message.user.lastname.length
                          ))}
                  </h2>
                  <p className="getConversations__content">
                    {p.message.content}
                  </p>
                  <p className="getConversations__date">
                    {new Date(p.message.date).toLocaleString()}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
        {conversationId && (
          <div className="getMessage" style={styleDiv}>
            <h1 className="getMessage__h1">{nameOtherUser}</h1>
            <DisplayMessages />
            <div className="getMessage__sending">
              <AddMessage />
            </div>
          </div>
        )}
      </div>
    );
  };
  return (
    <>
      <GetConversations setDatas={setDatasConv} />
      <Search />
      {jsxRender()}
    </>
  );
};

export default DisplayConversation;
