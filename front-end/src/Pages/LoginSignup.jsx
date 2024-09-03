import React, { useState } from "react";
import "./CSS/LoginSignUp.css";

const LoginSignUp = () => {
  const [state, setState] = useState("login");
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const changeHandler = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const login = async()=>{
    console.log('login function excuted', formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method: 'POST',
      headers:{
        Accept: 'application/form-data',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then((res)=>res.json()).then((data)=>{responseData = data})
    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace('/')
    }else{
      window.alert(responseData.errors)
    }
  }
  const signUp = async()=>{
    console.log('signUp function excuted', formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method: 'POST',
      headers:{
        Accept: 'application/form-data',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then((res)=>res.json()).then((data)=>{responseData = data})
    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace('/')
    }else{
      window.alert(responseData.errors)
    }
  }
  return (
    <div className="loginSignUp">
      <div className="loginSignUp-container">
        <h1>{state}</h1>
        <div className="loginSignUp-fields">
          {state === "sign up" && <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" />}
          <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
          <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
        </div>
        <button onClick={()=>{state === 'login'? login(): signUp()}}>Continue</button>
        {state === "login" ? (
          <p className="loginSignUp-login">
            Create an account?<span onClick={()=>{setState('sign up')}}> Click here</span>
          </p>
        ) : (
          <p className="loginSignUp-login">
            Already have an account?<span onClick={()=>{setState('login')}}> login here </span>
          </p>
        )}
        <div className="loginSignUp-agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
