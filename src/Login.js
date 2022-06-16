import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: '', 
    password: ''
});

const usernameVal = (e) => {
  const value = e.target.value.trim();
  setInputs({...inputs, username: value});
  //Add Validation here like we did last week
}

const passwordVal = (e) => {
  const value = e.target.value.trim();
  setInputs({...inputs, password: value});
  //Add Validation here like we did last week
}

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(inputs);

        axios.post('http://localhost:8888/api/userLogin.php', inputs)
            .then(function(response){
             console.log(response);

             if(response.data === true){
                sessionStorage.setItem('activeUser',inputs.username);
                 navigate("/dashboard");
             }else{
               console.log('Not working')
             }

            });
  }

  return (
    <div>
       <form>
            <h1>Sign In to FakeBook</h1>
            <p>You life belongs to us!</p>
            <input name="username" type="username" placeholder='Your Username' onChange={usernameVal} />
            <input name="password" type="password" placeholder='YourPassword' onChange={passwordVal} />     
            <button type="submit" onClick={handleSubmit}>I am ready to waste my life!</button>
        </form>
    </div>
  )
}

export default Login
