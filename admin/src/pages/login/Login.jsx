import React, { useContext, useState } from "react";
import {  loginDoctor, loginHospital, loginPatient, registerDoctor, registerPatient } from "../../context/authContext/apiCalls";
import { registerHospital } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [radioButton, setRadioButton] = useState("");
  const [signup, setSignup] = useState(false);
  const { isFetching, dispatch } = useContext(AuthContext);
  const toggle = "container_login right-panel-active";

  const LocalStorage = () => {
    localStorage.setItem("hospital", "false");
    localStorage.setItem("doctor", "false");
    localStorage.setItem("patient", "false");
  };

  const handleLogin = (e) => {
    LocalStorage();
    if(radioButton === "hospital"){
      e.preventDefault();
      loginHospital({ email, password }, dispatch);
    }

    else if(radioButton === "doctor"){
      e.preventDefault();
      console.log(radioButton + email);
      loginDoctor({ email, password }, dispatch);
    }

    else if(radioButton === "patient"){
      e.preventDefault();
      console.log(radioButton + email);
      loginPatient({ email, password }, dispatch);
    }

    else{
      e.preventDefault();
      console.log(radioButton)
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  }

  const handleSignup = (e) => {
    if(radioButton === "hospital"){
      registerHospital(user, dispatch);
      console.log(user);
    }

    else if(radioButton === "doctor"){
      registerDoctor(user, dispatch);
      console.log(user);
    }

    else if(radioButton === "patient"){
      registerPatient(user, dispatch);
      console.log(user);
    }
    setSignup(false);
  };

  const SwitchUsers = () => {
    switch(radioButton){
      case "patient" : return(<div id="user_show">
                        <input className="loginInput" type="text" name="username" placeholder="User name" onChange={handleChange}/>
                        <input className="loginInput" type="text" name="full_name" placeholder="Full Name" onChange={handleChange}/>
                        <input className="loginInput" type="email" name="email" placeholder="Email" onChange={handleChange}/>
                        <input className="loginInput" type="password" name="password" placeholder="Password" onChange={handleChange}/>
                      </div>);

      case "doctor" : return(<div id="doctor_show">
                              <input className="loginInput" type="text" name="username" placeholder="User name" onChange={handleChange}/>
                              <input className="loginInput" type="text" name="doctor_full_name" placeholder="Doctor Full Name" onChange={handleChange}/>
                              <input className="loginInput" type="email" name="email" placeholder="Email" onChange={handleChange}/>
                              <input className="loginInput" type="password" name="password" placeholder="Password" onChange={handleChange}/>
                            </div>);
      
      case "hospital" : return(<div id="hospital_show">
                                <input className="loginInput" type="text" name="hospitalname" placeholder="Hospital name" onChange={handleChange}/>
                                <input className="loginInput" type="email" name="email" placeholder="Email" onChange={handleChange}/>
                                <input className="loginInput" type="password" name="password" placeholder="Password" onChange={handleChange}/>
                                <input className="loginInput" type="text" name="phone_number" placeholder="Mobile no." onChange={handleChange}/>
                                <input className="loginInput" type="text" name="total_bed" placeholder="Total Bed" onChange={handleChange}/>
                                <input className="loginInput" type="text" name="vacant_bed" placeholder="Vacant Bed" onChange={handleChange}/>
                            </div>);

      default : return(<div></div>);
    };
  }

  return (
    <div className="login">
      <div className={ signup ? toggle : "container_login"} id="container_login">
          <div className="form-container sign-up-container">
            <form action="#" className="loginForm">
              <h1 className="tags">Create Account</h1>
                    <br />
              <div className="login_type">
                        <input className="loginInput" type="radio"  id="user" name="login_type_radio" value="patient" onChange={(e) => setRadioButton(e.target.value)}/>
                        <label htmlFor="patient">Patient</label> 
                        <input className="loginInput" type="radio"  id="doctor" name="login_type_radio" value="doctor" onChange={(e) => setRadioButton(e.target.value)}/>
                        <label htmlFor="patient">Doctor</label> 
                        <input className="loginInput" type="radio"  id="hospital" name="login_type_radio" value="hospital" onChange={(e) => setRadioButton(e.target.value)}/>
                        <label htmlFor="patient">Hospital</label>
              </div>
                <div>{SwitchUsers()}</div>
              <button className="loginButton" onClick={handleSignup}>Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form action="#" className="loginForm">
              <h1 className="tags">Sign in</h1>
                    <br />
              <div className="login_type">
                        <input className="loginInput" type="radio"  name="login_type_radio" value="patient" onChange={(e) => setRadioButton(e.target.value)}/>
                        <label htmlFor="patient">Patient</label> 
                        <input className="loginInput" type="radio"  name="login_type_radio" value="doctor" onChange={(e) => setRadioButton(e.target.value)}/>
                        <label htmlFor="patient">Doctor</label> 
                        <input className="loginInput" type="radio"  name="login_type_radio" value="hospital" onChange={(e) => setRadioButton(e.target.value)}/>
                        <label htmlFor="patient">Hospital</label>
              </div>
              <input className="loginInput" type="email" placeholder="Email"  onChange={(e) => setEmail(e.target.value)} />
              <input className="loginInput" type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)}/>
              <button className="loginButton"
                  onClick={handleLogin}
                  disabled={isFetching}>Sign In</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="tags">Welcome Back!</h1>
                <p className="info">To keep connected with us please login with your personal info</p>
                <button className="ghost" id="signIn" onClick={(e) => setSignup(false)}>Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="tags">Hello, Friend!</h1>
                <p className="info">Enter your personal details and start journey with us</p>
                <button className="ghost" id="signUp" onClick={(e) => setSignup(true)}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
