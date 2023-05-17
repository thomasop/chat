import React, { Dispatch, useState } from "react";
import { useDispatch } from "react-redux";

interface Data {
  id: number;
  firstname: string;
  lastname: string;
  mail: string;
  password: string;
  status: boolean;
}

interface Proptype {
  data: Data;
  setDisplayDiv: Dispatch<React.SetStateAction<string>>;
  setInputValue: Dispatch<React.SetStateAction<string>>;
}

const HandleClickBtn: React.FC<Proptype> = ({
  data,
  setDisplayDiv,
  setInputValue,
}) => {
  const dispatch = useDispatch();
  const [conversationId, setConversationId] = useState("")
  const handleDisplayModal = (e: any, dataId: number) => {
    let allConversations = document.querySelectorAll(".getConversations__p");
    let number = 0;
    Object.entries(allConversations).map((allConversation) => {
      if (
        allConversation[1].textContent?.split(" : ")[1] === e.target.textContent
      ) {
        if (allConversation[1].getAttribute("data-myval")) {
          setConversationId(
            allConversation[1].getAttribute("data-myval")?.toString()!
          );
        }

        number++;
      }
      return null;
    });
    if (number > 0) {
      dispatch({
        type: "conversation/conversation",
        payload: { displayDivMessage: 'block', conversationId: conversationId }
      })
      setInputValue("");
      setDisplayDiv("none");
    } else {
      dispatch({
        type: "modal/modalDisplay",
        payload: {
          display: "block",
          userNameAdd: e.target.textContent,
          userIdAdd: dataId.toString(),
          opacity: "0.6",
        },
      });
      setInputValue("");
      setDisplayDiv("none");
    }
  };

  return (
    <>
      <button
        className="search__btn"
        onClick={(e) => handleDisplayModal(e, data.id)}
      >
        {data.firstname?.charAt(0).toUpperCase()}
        {data.firstname?.slice(1, data.firstname.length)}{" "}
        {data.lastname?.charAt(0).toUpperCase()}
        {data.lastname?.slice(1, data.lastname.length)}
      </button>
    </>
  );
};

export default HandleClickBtn;
