import React, { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/Authcontext";
// import { useState } from "react";
import { Timestamp } from 'firebase/firestore';

export const Message = ({ message }) => {

  const timestamp = message.date;
  const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6;
  const formattedDate = new Date(milliseconds).toLocaleTimeString();


  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  // console.log(message);
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  
  console.log(message);
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          id="messageInfo_img"
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
          <span>{formattedDate}</span>
      </div>
      <div className="messageContend">
        <p className="messageContend_p">{message.text}</p>
        {message.img && (
          <img id="messageContend_img" src={message.img} alt="" />
        )}
      </div>
    </div>
  );
};
