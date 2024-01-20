import React, { useContext } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/Authcontext";
import { ChatContext } from "../context/ChatContext";
import { useState } from "react";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";

export const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  // const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          // setErr(true);
          console.log(error.message);
          console.log("Something!");
        },
        () => {
          // console.log(100);
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      // console.log(200);
      // console.log("data.chatId:", data.chatId);
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImg(null);
  };
  return (
    <div className="input4">
      <input
        id="fil1"
        type="text"
        placeholder="Type Something Please"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img className="send_img" src="" alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="fil2"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="fil2">
          <img className="send_img" src={Img} alt="" />
        </label>
        <button id="send_button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};
