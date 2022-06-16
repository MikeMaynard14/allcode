import axios from 'axios';
import React, { useState } from 'react'
import MiniModalLeft from './components/MiniModalLeft';
import MiniModalRight from './components/MiniModalRight';
import { useNavigate } from 'react-router-dom';
import Okay from '../src/assets/okay.svg';
import NotOkay from '../src/assets/notOkay.svg';

const Register = () => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        first: '',
        last: '', 
        email: '',
        username: '', 
        contact: '',
        password: '',
        passwordCon: '',
        image: '',
    });

    const [nameError, setNameError] = useState();
    const [lastError, setLastError] = useState();
    const [emailError, setEmailError] = useState();
    const [usernameError, setUsernameError] = useState();
    const [contactError, setContactError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [passwordConError, setPasswordConError] = useState();

    const [emailAvail, setEmailAvail] = useState();
    const [userAvail, setUserAvail] = useState();

    const [emailIcon, setEmailIcon] = useState();
    const [userIcon, setUserIcon] = useState();

    const firstVal = (e) => {
        const value = e.target.value;
        setInputs({...inputs, first: value});
        if(inputs.first !== ''){setNameError();} 
    }

    const imageVal = (e) => {           
            let file = e.target.files[0];
            let reader = new FileReader();

            reader.onloadend = function() {
            console.log(reader.result);
            let imgFile = reader.result;

            setInputs({...inputs, image: imgFile});

            let image = new Image();
            image.src = reader.result;
            document.getElementById('profileimg').appendChild(image);
            
            }
            reader.readAsDataURL(file);
    }

    const lastVal = (e) => {
        const value = e.target.value;
        setInputs({...inputs, last: value});
        if(inputs.last !== ''){setLastError();} 
    }

    const emailVal = (e) => {
        const mailcodex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const value = e.target.value;
        setInputs({...inputs, email: value});
        if(inputs.email !== ''){
            setEmailError();
        } 
        if(!value.match(mailcodex)){
            setEmailError(<MiniModalLeft message="Email is not a valid format" />);
        }    
    }

    const validateEmail = () => {
        axios.post('http://localhost:8888/api/authenticateEmail.php', inputs)
        .then(function(response){
         console.log(response);
         if(response.data === "Available"){
            setEmailIcon(Okay);
            setEmailAvail();
         } else if(response.data === "Not Available") {
            setEmailAvail(<MiniModalRight message="Email Is Not Available" />);
            setEmailIcon(NotOkay);
         } else if(response.data === "") {
            setEmailIcon();
            setEmailAvail();
            setEmailError();
         }
        });
    }

    const usernameVal = (e) => {
        const value = e.target.value.trim();
        setInputs({...inputs, username: value});
        if(inputs.username != ''){setUsernameError();} 
    }

    const validateUser = () => {
        axios.post('http://localhost:8888/api/authenticateUser.php', inputs)
        .then(function(response){
         console.log(response);
         if(response.data === "Available"){
            setUserAvail();
            setUserIcon(Okay);
         } else {
            setUserAvail(<MiniModalLeft message="Username Is Not Available" />);
            setUserIcon(NotOkay);
         }
        });
    }

    const contactVal = (e) => {
        const contCodex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        const value = e.target.value;
        setInputs({...inputs, contact: value});
        if(inputs.contact != ''){setContactError();} 

        if(!value.match(contCodex)){
            setContactError(<MiniModalRight message="Not a Valid Phone Number" />);
        } 
    }

    const passwordVal = (e) => {
        const passCodex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/ ;
        const value = e.target.value;
        setInputs({...inputs, password: value});
        if(inputs.password != ''){setPasswordError();} 

        if(!value.match(passCodex)){
            setPasswordError(<MiniModalLeft message="Password must include stuff" />);
        } 
    }

    const passwordConVal = (e) => {
        const value = e.target.value;
        setInputs({...inputs, passwordCon: value});
        if(inputs.password === value){setPasswordConError()}else{
            setPasswordConError(<MiniModalLeft message="Your Passwords Dont Match" />);
        }  
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);

        if(inputs.first === ''){
            setNameError(<MiniModalLeft message="Everyone has one..." />);
        } else {
            setNameError();
        }

        if(inputs.last === ''){
            setLastError(<MiniModalRight message="You aren't Seal... " />);
        } else {
            setLastError();
        }

        if(inputs.email === ''){
            setEmailError(<MiniModalLeft message="You must have an email" />);
        } else {
            setEmailError();
        }

        if(inputs.username === ''){
            setUsernameError(<MiniModalLeft message="You will login with this" />);
        } else {
            setUsernameError();
        }

        if(inputs.contact === ''){
            setContactError(<MiniModalRight message="We will call you all the time" />);
        } else {
            setContactError();
        }

        if(inputs.password === ''){
            setPasswordError(<MiniModalLeft message="Keep it simple and easy..." />);
        } else {
            setPasswordError();
        }

        if(inputs.passwordCon === ''){
            setPasswordConError(<MiniModalLeft message="They Kinda need to match..." />);
        } else {
            setPasswordConError();
        }

        let result = Object.values(inputs).some(o => o === '');

        if(result){
            console.log('Not working');
        } else {
            axios.post('http://localhost:8888/api/addUser.php', inputs)
            .then(function(response){
             console.log(response);

             if(response.status === 200){
                 //navigate("/login");
                 console.log("Working Fine");
             }

            });
        }

    }

  return (
    <div>
        <form id='ImgOne' encType="multipart/form-data">
            <h1>Sign Up to FakeBook</h1>
            <p>Give us all that sweet sweet data!</p>
            <div className='imageArea'>
                <p>Upload a Profile Image</p>
                <input name="imageUrl" className='imgInput' type="file" onChange={imageVal} />
                <div id="profileimg" className='profile_img'></div>  
            </div>
           
            <div className='names'>
                {nameError}
                <input name="first" className='left' type="text" placeholder='First Name' onChange={firstVal} />
                {lastError}
                <input name='last' type="text" placeholder='Last Name' onChange={lastVal} />
            </div>
            {emailError}  
            {emailAvail}       
            <div className='statusIcon'>
                <img src={emailIcon}/>
            </div>
            <input name="email" type="email" placeholder='Your Email' onBlur={validateEmail} onChange={emailVal} />
            <div className='userCon'>
                {usernameError}
                {userAvail}
                <div className='statusIconUser'>
                    <img src={userIcon}/>
                </div>
                <input name="username" className='left' type="username" placeholder='Select A Username' onBlur={validateUser} onChange={usernameVal} />
                {contactError}
                <input name="contact" type="contact" placeholder='Contact Number' onChange={contactVal} />
            </div>
            <div className='passCon'>
                {passwordError}
                <input name="password" type="password" placeholder='Choose A Password' onChange={passwordVal} />
                {passwordConError}
                <input name="conPass" type="password" placeholder='Confirm Password' onChange={passwordConVal} />
                
            </div>
            <button type="submit" onClick={handleSubmit} >Take My Data Lizard Man!</button>
        </form>
            
    </div>
  )
}

export default Register
