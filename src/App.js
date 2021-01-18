import './App.css';
import { useDispatch, useSelector } from "react-redux";
import WebcamCapture from "./WebcamCapture";
import Preview from "./Preview";
import Chats from "./Chats";
import ChatView from "./ChatView";
import Message from "./Message";
import Login from "./Login";
import {useEffect} from "react"
import {auth} from "./firebase";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
function App() {
  const user = useSelector(state => state.appSlice.user);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(function(authUser) {
      if(authUser) {
        dispatch({
          type: 'LOGIN',
          user: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid
        })
      } else {
        dispatch({
          type: 'LOGOUT',
      })
      }
    });
  }, [])
  return (
    <div className="App">
    <Router>
    {!user? (
      <Login />
    ) : (
      <div className="app__body">
        <div className="app__background">
          <Switch>
            <Route  path="/message/:roomId">
              <Message />
            </Route>
            <Route  path="/chat/view">
              <ChatView />
            </Route>
            <Route  path="/preview">
              <Preview />
            </Route>
            <Route  path="/chats">
              <Chats />
          </Route>
            <Route exact path="/">
              <WebcamCapture />
            </Route>
          </Switch>
        </div>  
      </div>
    )}    
  </Router>
    </div>
  );
}

export default App;
