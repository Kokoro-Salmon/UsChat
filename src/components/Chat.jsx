import React from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import { Messages } from "./Messages";
import { Input } from "./Input";
import { ChatContext } from "../context/ChatContext";
import { useContext } from "react";

export const Chat = () => {
  const { data } = useContext(ChatContext);
  // console.log(data.user.displayName);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img className="tot" src={Cam} alt="" />
          <img className="tot" src={Add} alt="" />
          <img className="tot" src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};
