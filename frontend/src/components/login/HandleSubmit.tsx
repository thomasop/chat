import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Data {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

const HandleSubmit: React.FC<any> = (props) => {
  let navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: props.email,
          password: props.password,
        }),
      });
      let json = await response.json();
      if (json.errors) {
        props.setFormSend(false);
        if (typeof json.errors == "object") {
          json.errors.map((error: Data, index: number) => {
            let input: HTMLElement = document.querySelector("." + error.path)!;
            if (input) {
              input.style.display = "block";
              input.textContent = error.msg;
            }
            return null;
          });
        } else {
          let htmlElementDiv = document.querySelector<HTMLElement>(
            ".loginForm__errorMessages"
          );
          let htmlElementInput = document.querySelector<HTMLElement>(
            ".loginForm__inputSubmit"
          );
          if (htmlElementDiv && htmlElementInput) {
            htmlElementInput.style.marginBottom = "0px";
            htmlElementDiv.style.marginBottom = "30px";
            htmlElementDiv.style.display = "block";
          }

          props.errorMessage(json.errors);
        }
      } else {
        navigate("/home");
      }
    };
    getUser();
  }, [navigate, props]);

  return null;
};

export default HandleSubmit;
