import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { object, string } from "yup";
import { API_URL } from "../../config/api";
import Button from "../../sections/Button";
import loginlogo from "../../images/loginlogo.png";
import joystick from "../../images/joystick.png";
import google from "../../images/google.svg";
import github from "../../images/github.png";
import twerr from "../../images/twirr.svg";
import linked from "../../images/linked.png";
import passwordshow from "../../images/eye.png";

const initialData = {
  email: "ahmed@gsg.com",
  password: "ahmed123",
};

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [myData] = useState(initialData);

  const schema = object().shape({
    email: string().required(),
    password: string().required(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await schema.validate({ email, password }, { abortEarly: false });

      const { data } = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("username", data.name);
      localStorage.setItem("Admin", data.isAdmin);

      props.login();
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        setErrors([error.message]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeInput = (e) => {
    const { value, id } = e.target;
    if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  const handlePasswordShow = (e) => {
    e.preventDefault();
    setPasswordType((prevType) => (prevType === "text" ? "password" : "text"));
  };

  return (
    <div className="login">
      <div className="login_desc">
        <img src={loginlogo} alt="loginlogo" className="loginlogo" />
        <div className="symbol_login">،،</div>
        <p className="game_desc_login">
          I always observe the people who pass by when I ride an escalator. I'll
          never see most of them again, so I imagine a lot of things about their
          lives... about the day ahead of them.
        </p>
        <div className="gamer_login">Hideo Kojima</div>
        <img src={joystick} alt="joystick" className="joystick" />
      </div>

      <form className="login_form" onSubmit={handleSubmit}>
        <div>
          <h3 className="form_login_title">Join the game!</h3>
          <p className="form_login_desc">Go inside the best gamers social network!</p>
        </div>
        <div className="links">
          <a href="/#">
            <img src={google} alt="google" className="gooogle" />
          </a>
          <a href="/#">
            <img src={twerr} alt="tweitter" className="tweitter" />
          </a>
          <a href="/#">
            <img src={linked} alt="linked" className="linked" />
          </a>
          <a href="/#">
            <img src={github} alt="github" className="github" />
          </a>
        </div>
        <div>
          {errors.map((error, index) => (
            <span key={index} style={{ color: "red" }}>
              {error}
            </span>
          ))}
        </div>
        <div>
          <label htmlFor="email">Your email</label>
          <div>
            <input
              id="email"
              type="email"
              placeholder="Write your email"
              onChange={handleChangeInput}
              value={email}
            />
          </div>
        </div>
        <div>
          <label htmlFor="password">Enter your password</label>
          <div>
            <input
              id="password"
              type={passwordType}
              placeholder="•••••••••"
              onChange={handleChangeInput}
              value={password}
            />
            <img
              src={passwordshow}
              alt="passwordshow"
              className="passwordshow"
              onClick={handlePasswordShow}
            />
          </div>
        </div>

        <Button myBtn="login" />
        {isLoading ? "Loading..." : ""}
        <div className="reg_anchor">
          Don’t have an account?
          <Link to="/signup">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
