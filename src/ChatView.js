import React, {useEffect} from 'react'
import './ChatView.css';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
function ChatView() {
    const dispatch = useDispatch();
    const history = useHistory();    
    const cameraImage = useSelector(state => state.appSlice.cameraImage)
    const roomId = useSelector(state => state.chatSlice.idMessage)
    useEffect(() => {
        if(!cameraImage) {
            exit();
        }
    }, [cameraImage])

    const exit = () => {
        history.push(`/message/${roomId}`);        
    }
    return (
        <div className="chatView">
            <img src={cameraImage}  onClick={exit}/>
            <div className="chatView__timer">
            <CountdownCircleTimer
            isPlaying
            duration={10}
            colors={[
              ['#004777', 0.33],
              ['#F7B801', 0.33],
              ['#A30000', 0.33],
            ]}
            size={50}
            strokenWidth={6}
          >
            {({ remainingTime }) => {
                if(remainingTime === 0) {
                    exit();
                }

                return remainingTime;
            }}
          </CountdownCircleTimer>
            </div>
        </div>
    )
}

export default ChatView
