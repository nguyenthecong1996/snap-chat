import React from 'react'
import './ChatMessage.css'; 
import { Avatar } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";

function ChatMessage({id, user, createdAt, uid, profilePic, body}) {
    const userAuth = useSelector(state => state.appSlice.user);
    const classMessage = userAuth.id===uid ? 'ower': 'client';    
    return (
        <div className={`ChatMessage ${classMessage}`}>
            <Avatar  src={profilePic} className="ChatMessage__image"/>
            <div className="ChatMessage__space"></div>
            <p>{body}</p>
        </div>
    )
}

export default ChatMessage
