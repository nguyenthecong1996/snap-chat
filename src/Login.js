import React from 'react'
import "./Login.css";
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import {provider, auth} from "./firebase";

function Login() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.appSlice.user);    
    const signIn = () =>{
        auth.signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: 'LOGIN',
                user: result.user.displayName,
                profilePic: result.user.photoURL,
                id: result.user.uid
            })
        });
    }
    return (
        <div class="login">
            <div class="login__container">
                <img src="https://www.snapchat.com/global/social-lg.jpg" />
                <Button variant="outline" onClick={signIn}>Sign In</Button>
            </div>
        </div>
    )
}

export default Login
