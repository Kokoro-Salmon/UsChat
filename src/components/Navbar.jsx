import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext, AuthContextProvider } from "../context/Authcontext";


export const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="Logo">UsChat</span>
      <div className="user">
        <img id="img2" src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button
          id="btn2"
          onClick={() => {
            signOut(auth);
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
