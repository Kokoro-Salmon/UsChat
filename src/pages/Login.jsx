import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { useNavigate ,Link} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWapper">
        <span className="logo">UsChat</span>
        <span className="title">Login Here</span>
        <form action="" onSubmit={handleSubmit}>
          <input className="input" type="email" placeholder="Email" />
          <input className="input" type="password" placeholder="Password" />

          <button className="button">Sign In</button>
        </form>
        <p id="donthaveaccount">Don't have a Account?? <Link id="LtoR" to="/register">Register</Link> </p>
      </div>
    </div>
  );
};
