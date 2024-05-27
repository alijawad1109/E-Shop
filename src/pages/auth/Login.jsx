import React, { useState } from "react";
import "./loli.scss";
import login from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/Config";
import { toast } from "react-toastify";
import { Loader } from "../../components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const loginUser = (e) => {
    e.preventDefault();
    console.log(email, password);
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(false);
        // const user = userCredential.user;
        navigate("/");
        toast.success("Login Successfully!");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        toast.success("Login successfully!");
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        toast.error(error.message);
      });

    setIsLoading(true);
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className="auth">
        <div className="img">
          <img src={login} alt="login" width={400} />
        </div>
        <Card>
          <div className="form">
            <h2>Login</h2>
            <form onSubmit={loginUser}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="--btn --btn-primary --btn-block" type="submit">
                Login
              </button>
              <div className="links">
                <Link to="/reset">Resest Password</Link>
              </div>
              <p>--- or ---</p>
              <button
                className="--btn --btn-danger --btn-block"
                onClick={signInWithGoogle}
              >
                <FaGoogle size={20} />
                &nbsp; Login With Google
              </button>
              <div className="register">
                <p>Don't have an account?</p>
                <Link to="/register">Register</Link>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
