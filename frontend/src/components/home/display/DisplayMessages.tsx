import React, { useState } from "react";
import GetMessages from "../fetch/GetMessages";

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

const DisplayMessages: React.FC = () => {
  const [datas, setDatas] = useState<null | Data>(null);
  const jsxRender = () => {
    return (
      <div className="getMessage__div--flex">
        {datas?.result.map((p, index) => {
          return (
            (p.user.id === 4 && (
              <div key={index} className="getMessage__div--float">
                <div className="getMessage__div--sizefloat">
                  <h3 className="getMessage__div--h3">
                    {p.user.firstname}
                    {p.user.lastname}
                  </h3>
                  <p className="getMessage__div--content">{p.content}</p>
                  <p className="getMessage__div--date">
                    {new Date(p.date).toLocaleString()}
                  </p>
                </div>
              </div>
            )) ||
            (p.user.id !== 4 && (
              <div key={index} className="getMessage__div">
                <div className="getMessage__div--size">
                  <h3 className="getMessage__div--h3">
                    {p.user.firstname}
                    {p.user.lastname}
                  </h3>
                  <p className="getMessage__div--content">{p.content}</p>
                  <p className="getMessage__div--date">
                    {new Date(p.date).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          );
        })}
      </div>
    );
  };
  return (
    <>
      <GetMessages setData={setDatas} />
      {datas && datas?.result !== null && jsxRender()}
    </>
  );
};

export default DisplayMessages;
