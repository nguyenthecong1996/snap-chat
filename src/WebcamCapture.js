import React, {useRef, useCallback, useState} from 'react';
import Webcam from "react-webcam";
import "./WebcamCapture.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user",
};

function WebcamCapture() {
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            dispatch({
                type: "SET_CAMERA_IMAGE",
                imageSrc: imageSrc
            });
            history.push("/preview");
        },
        [webcamRef],
    )
    const exitWebcam = () => {
        history.push("/chats")
    }
    return (
        <div className='webcamCapture'>
            <Webcam
                audio={false} 
                height={videoConstraints.height}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={videoConstraints.width}
                videoConstraints={videoConstraints}
            />
            <ExitToAppIcon className="webcamCapture__exit" onClick ={exitWebcam}/>
            <RadioButtonUncheckedIcon 
                className="webcamCapture__button"
                onClick ={capture}
                />
        </div>
    )
}

export default WebcamCapture
