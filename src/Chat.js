import React from 'react'
import "./Chat.css";
import { Avatar } from '@material-ui/core';
import StopIcon from '@material-ui/icons/Stop';
import TimeAgo from 'react-timeago';
import { useDispatch, useSelector } from "react-redux";
import {db} from "./firebase";
import { useHistory } from "react-router-dom";

function Chat({id ,username, timestamp, imageUrl, read, profilePic}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.appSlice.user);
    const open = () => {
        // if(!read) {
            dispatch({
                type: 'SELECT_IMG',
                imageUrl: imageUrl
            })

            dispatch({
                type: 'SET_ID_MESSAGE',
                idMessage: id,
            })

            db.collection("posts").doc(id).set(
                {read: true},
                {merge: true}
            )
            if(!read) {
                history.push("/chat/view");
            } else {
                history.push(`/message/${id}`);  
            }
        // }
    }
    return (
        <div className="chat" onClick={open}>
           <Avatar src={profilePic} className="chat__avatar" />
           <div className="chat__info">
                <p className="chat__name">{username}</p>
                <p>
                {!read ? " Tap to view - " : " "}
                <TimeAgo date={new Date(timestamp?.toDate()).toUTCString()}/>
                </p>
           </div>
           {!read && <StopIcon  className="chat_readIcon"/>}
        </div>
    )
}

export default Chat
