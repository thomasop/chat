import React, { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../utils/store";

interface Proptype {
  content: string;
  setInputErrorPassword: Dispatch<SetStateAction<string>>;
}

interface Data {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

const AddConversation: React.FC<Proptype> = ({
  content,
  setInputErrorPassword,
}) => {
  const dispatch = useDispatch()
  const {userIdAdd} = useSelector((state: RootState) => state.modal)
  const {token, userId} = useSelector((state: RootState) => state.login);
  const addConversation = async () => {
    const response = await fetch("http://localhost:8080/conversation/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        userId: userId,
        content: content,
        userIdAdd: userIdAdd,
      }),
    });
    const json = await response.json();
    if (json.error) {
      if (typeof json.error == "object") {
        json.error.map((error: Data) => {
          let input: HTMLElement = document.querySelector("." + error.path)!;
          if (input) {
            input.style.display = "block";
            input.textContent = error.msg;
          }
          return null;
        });
      } else {
        let htmlElementDiv = document.querySelector<HTMLElement>(
          ".modal__errorMessages"
        );
        if (htmlElementDiv) {
          htmlElementDiv.style.marginBottom = "10px";
          htmlElementDiv.style.display = "block";
        }
        setInputErrorPassword(json.error);
      }
    } else {
      dispatch({
        type: "modal/modalDisplay",
        payload: {display: "none", userNameAdd: "", userIdAdd: ""}
      })
    }
  };
  addConversation();
  return null;
};

export default AddConversation;
