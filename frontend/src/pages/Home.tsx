import React, { useState } from "react";
import GetUsers from "../components/home/fetch/GetUsers";
import CheckUserLog from "../components/CheckUserLog";
import Modal from "../components/home/display/Modal";
import DisplayConversation from "../components/home/display/DisplayConversation";
import Logout from "../components/home/Logout";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store";

const Home: React.FC = () => {
  const [userLogout, setUserLogout] = useState<boolean>(false);
  const { userLog } = useSelector((state: RootState) => state.login);
  const { display, opacity } = useSelector((state: RootState) => state.modal);
  const opacityStyle = {
    opacity: opacity,
  };
  const modalStyle = {
    display: display,
  };
  
  return (
    <>
      <CheckUserLog />
      {userLog === true && (
        <>
          <GetUsers />
          <div className="home" style={opacityStyle}>
            <DisplayConversation />
            <button className="logout" onClick={() => setUserLogout(true)}>
              Logout
            </button>
            {userLogout === true && <Logout />}
          </div>
          <div style={modalStyle} className="modal">
            <Modal />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
