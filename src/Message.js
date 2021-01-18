import React, {useState, useEffect} from 'react'
import { Avatar } from '@material-ui/core';
import "./Message.css";
import SendIcon from '@material-ui/icons/Send';
import AddIcon from '@material-ui/icons/Add';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import {db} from "./firebase";
import { useSelector, useDispatch } from "react-redux";
import firebase from 'firebase';
import ChatMessage from './ChatMessage';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory, useParams } from "react-router-dom";
function Message() {
    const userAuth = useSelector(state => state.appSlice.user);
    const cameraImage = useSelector(state => state.appSlice.cameraImage);
    const [valueData, setValueData] = useState([]);
    const [valueImg, setvalueImg] = useState("");    
    const [formValue, setFormValue] = useState("");
    const [randomMessId, setRandomMessId] = useState("");    
    const history = useHistory();
    const {roomId} = useParams();
    useEffect(() => {
        if(roomId) {
            db.collection('rooms').doc(roomId)
            .collection('messages').orderBy("createdAt").onSnapshot(snapshot => 
                setValueData(
                    snapshot.docs.map(doc =>({
                        id: doc.id,
                        data: doc.data(),
                    })) 
                )
            );
        }

    }, [roomId])

    useEffect(() => {
        if(!cameraImage) {
            history.replace('/chats')
        }
    },[])
    const closeMessage = () => {
        history.replace('/chats')
    }
    const sendMessage = async (e) => {
        e.preventDefault();
        // gets name, userID and pfp of logged in user
        const { profilePic, user, id } = userAuth;
    
        await db.collection('rooms').doc(roomId)
        .collection('messages').add({
          user: user,
          body: formValue,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid: id,
          profilePic: profilePic
        })
    
        // resetting form value and scrolling to bottom
        setFormValue('');
      }
    return (
        <div className="message">
            <div className="message__header">
                <Avatar src="" className="message__avatar"/>
                <CloseIcon className="message__close" onClick={closeMessage}/>
            </div>

            <div className="message__posts">
            <img src={cameraImage} alt="" className="message__image"/>            
            {valueData.map(({id, data: {user, body, createdAt, uid, profilePic}}) => (
                <ChatMessage 
                    key={id}
                    id = {id}
                    user={user}
                    createdAt={createdAt}
                    uid={uid}
                    profilePic={profilePic}
                    body={body}
                />
            ))}
        
            </div>
            <form>
            <div className="message__footer">
                <AddIcon className="message__icon"/>
                <CropOriginalIcon  className="message__icon"/>
                <input type="text" className="message__input" value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                <SendIcon className="message__icon" onClick={sendMessage}/>
            </div>
        </form>
        </div>
    )
}

export default Message
