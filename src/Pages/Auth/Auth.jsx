import React, { useState, useContext } from "react";
import amazon_letter_logo from "../../assets/images/logo/amazon_letter_logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Auth.module.css";
import { auth } from "../../Utility/firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { ClipLoader } from "react-spinners";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import { IoWarningOutline } from "react-icons/io5";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUP: false,
  });

  const navigate = useNavigate();
  const navigationStateData = useLocation();
  // console.log(navigationStateData);

  const [{ user }, dispatch] = useContext(DataContext);

  // console.log("user state: "+ JSON.stringify(user))

  const authHandler = async (e) => {
    e.preventDefault();

    // console.log(e);
    // console.log(e.target);
    // console.log(e.target.name);

    if (e.target.name.toLowerCase() == "signin") {
      // console.log("buttons match");
      // firebase auth
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          // console.log(user);
          setLoading({ ...loading, signIn: false });
          navigate(navigationStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          // console.log(error);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUP: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUP: false });
          navigate(navigationStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          // console.log(error);
          setLoading({ ...loading, signUP: false });
        });
    }
  };

  // console.log(password);
  // console.log(email);

  return (
    <section className={styles.login}>
      <Link to="/">
        <img src={amazon_letter_logo} alt="" />
      </Link>

      <div className={styles.login__container}>
        <h1>Sign In</h1>
        {
          <>
            {navigationStateData?.state?.msg && (
              <small
                style={{
                  color: "red",
                  padding: "5px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {navigationStateData.state.msg}
              </small>
            )}
            <br />
          </>
        }
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signIn"
            className={styles.login__signInButton}
          >
            {loading.signIn ? (
              <ClipLoader color="#000" size={15}></ClipLoader>
            ) : (
              " Sign In"
            )}
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button
          type="submit"
          name="signUp"
          onClick={authHandler}
          className={styles.login__registerButton}
        >
          {loading.signUP ? (
            <ClipLoader color="#000" size={15}></ClipLoader>
          ) : (
            "Create your Amazon Account"
          )}
        </button>

        {/* for error message preview */}
        {error && (
          <div className={styles.error_holder}>
            <div className={styles.error__icon}>
              <IoWarningOutline size={25} />
            </div>
            <div>{error}</div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Auth;
