import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";

const AddMessage: React.FC = () => {
  const { conversationId } = useSelector(
    (state: RootState) => state.conversation
  );
  const [inputMessage, setInputMessage] = useState<string>("");
  const [displayErrorMessage, setDisplayErrorMessage] =
    useState<boolean>(false);
  const { userId, token } = useSelector((state: RootState) => state.login);
  const updateUseState = (e: any) => {
    setInputMessage(e.target.value);
    if (e.target.value.length > 0 && e.target.value.trim().length > 0) {
      setDisplayErrorMessage(false);
    } else {
      setDisplayErrorMessage(true);
    }
  };
  const handlerSubmit = () => {
    const addMessage = async () => {
      await fetch("http://localhost:8080/message/add", {
        method: "post",
        body: JSON.stringify({
          content: inputMessage,
          user: userId,
          conversation: conversationId,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      });
    };
    if (displayErrorMessage === false) {
      addMessage();
    }
  };
  return (
    <>
      <div className="getMessage__send">
        <textarea
          className="getMessage__send--input"
          name=""
          id=""
          onChange={updateUseState}
        ></textarea>
        <button className="getMessage__send--btn" onClick={handlerSubmit}>
          Envoyer
        </button>
      </div>
      {displayErrorMessage && <div className="getMessage__send--color">Un message ne peut pas être vide</div>}
    </>
  );
};

export default AddMessage;
