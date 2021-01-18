import React, {useEffect} from 'react'
import { useHistory } from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from "react-redux";
import "./Preview.css"
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import { v4 as uuidv4 } from 'uuid';
import {storage, db} from "./firebase";
import firebase from 'firebase';

function Preview() {
    const user = useSelector(state => state.appSlice.user);    
    const cameraImage = useSelector(state => state.cameraSlice.cameraImage)
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        if(!cameraImage) {
            history.replace("/");
        }
    }, []);

    const closePreview = () => {
        dispatch({
            type: "REMOVE_CAMERA_IMAGE",
            cameraImage: null
        })
        history.replace('/');
    }

    const sendPost = () => {
        const id = uuidv4();
        const uploadTask = storage.
        ref(`posts/${id}`)
        .putString(cameraImage, "data_url");

        uploadTask.on('state_changed', null ,function(error){
            console.log(error)
        },
        function() {
            storage
            .ref("posts")
            .child(id)
            .getDownloadURL()
            .then((url) => {
                db.collection("posts").add({
                    imageUrl: url,
                    username : user.user,
                    read: false,
                    profilePic: user.profilePic,
                    id: id,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
                history.replace("/chats")
            })
        }
    )}
    
    return (
        <div className="preview">
            <CloseIcon onClick={closePreview} className="preview__close"/>
            <div className="preview__toolbarRight">
                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>
            <img src={cameraImage} />
            <div className="preview__footer" onClick={sendPost}>
                <h2>Send Now</h2>
                <SendIcon fontSize="small" className="preview__sendIcon"/>
            </div>
        </div>
    )
}

export default Preview
