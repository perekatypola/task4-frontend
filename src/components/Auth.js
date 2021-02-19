import './Auth.css';
import React, {useState} from "react";
import {validateUser , registerUser} from './requests'


function Auth() {
    const [name , setName] = useState('');
    const [password , setPassword] = useState('');
    const [email , setEmail] = useState('');

    return (
        <form id="form">
            <div className="container p-4 my-3 border">
                <div className="form-group">
                    <label htmlFor="inputUsername">Username</label>
                    <input initialValue="" type="name" className="form-control" placeholder="Username"
                           onChange={event => {
                               setName(event.target.value) ;
                               document.getElementById("passwordHelp").classList.add('hide-label')
                           }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputEmail" or="inputEmail">Email address</label>
                    <input initialValue="" type="email" className="form-control" placeholder="Enter email"
                           onChange={event => {
                               setEmail(event.target.value)
                               document.getElementById("passwordHelp").classList.add('hide-label')
                           }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input initialValue="" type="password" className="form-control" id = "passw" placeholder="Enter password"
                           onChange={event => {
                               setPassword(event.target.value)
                               document.getElementById("passwordHelp").classList.add('hide-label')
                           }}/>
                    <small id="passwordHelp" className="form-text text-muted" className = "hide-label">Unvalid password</small>
                </div>
                <div className="form-group">
                    <div className="button-box">
                        <button type="button" className="btn btn-outline-primary" onClick={() => {
                            validateUser(name, password,  email)
                        }}>Sign In
                        </button>
                        <button
                            type="button" className="btn btn-outline-primary"
                            onClick={() => {
                                registerUser(name, password, email)
                            }}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Auth;