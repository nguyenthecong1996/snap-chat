import React, {useState, useEffect} from 'react'
import "./Chats.css";
import SearchIcon from '@material-ui/icons/Search';
import { Avatar } from '@material-ui/core';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import {db} from "./firebase";
import Chat from "./Chat";
import { useSelector, useDispatch } from "react-redux";
import {auth} from "./firebase";
import { useHistory } from "react-router-dom";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
function Chats() {
    const [post, setPost] = useState([]);
    const user = useSelector(state => state.appSlice.user);
    const history = useHistory();
    const dispatch = useDispatch();    
    useEffect(() => {
        db.collection("posts").orderBy("timestamp", "desc").onSnapshot(snapshot => setPost(
            snapshot.docs.map(doc =>({
                id: doc.id,
                data: doc.data(),
            }))
        ));
    }, [])

    const signOut = () => {
        auth.signOut();
        history.replace('/')
    }

    const takeSnap = () => {
        dispatch({
            type: "REMOVE_CAMERA_IMAGE"
        })
        history.push('/') 
    }

    return (
        <div className="chats">
            <div className="chats__header">
                <Avatar src={user.profilePic} className="chats__avatar"  onClick={signOut}/>
                <div className="chats__search">
                    <SearchIcon className="chats__searchIcon"/>
                    <input placeholder="Friends" type="text" />
                </div>
                <ChatBubbleIcon  className="chats__chatIcon"/>
            </div>

            <div className="chats__posts">
                {post.map(({id, data: {username, timestamp, imageUrl, read, profilePic}}) => (
                    <Chat 
                       key={id} 
                       id={id} 
                       username={username} 
                       timestamp={timestamp} 
                       imageUrl={imageUrl} 
                       read={read}
                       profilePic = {profilePic} 
                    />
                ))}
            </div>
            <RadioButtonUncheckedIcon className="chats__takePicIcon" onClick={takeSnap} fontSize="large"/>
        </div>
    )
}

export default Chats
