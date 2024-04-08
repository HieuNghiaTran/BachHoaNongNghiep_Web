import React, { useContext, useEffect, useRef, useState } from "react";
import '../Css/AppChat.css'
import { LineOutlined } from '@ant-design/icons';
import ListMessage from "./listMessage";
import TypeMessage from "./typeMessage";
import { UserContext } from "../../context/userContext";
import socketIOClient from "socket.io-client";

function AppChat(props) {

  const socketRef = useRef();

  const ENDPOINT = "http://localhost:8001";
  const [messages, setMessages] = useState([]);
  const [openChat, setOpenChat] = useState(false)
  const { user } = useContext(UserContext)


  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState('');
  const [id, setId] = useState();
  const messagesEnd1 = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(ENDPOINT)

    socketRef.current.on('getId', data => {
      setId(data)
    })

    socketRef.current.on('sendDataServer', dataGot => {
      setMess(oldMsgs => [...oldMsgs, dataGot.data])

      //scrollToBottom()

    })

    return () => {
      socketRef.current.disconnect();
    };
  }, []);





  const handleChatFormSubmit = async (message) => {

    if (!user) {
      alert("Bạn cần đang nhập để sử dụng !")
      return;
    }
    if (messages !== null) {
      const msg = {
        content: message,
        sender: user.username,

      }
      socketRef.current.emit('sendDataClient', msg)

    }
  };



  const scrollToBottom = () => {
    messagesEnd1.current.scrollIntoView({ behavior: "smooth" });
  }


  return (
    <div className="appchat">

      {
        openChat ? '' : (


          <div className="chat" onClick={() => setOpenChat(!openChat)} >

            <svg xmlns="http://www.w3.org/2000/svg" className='chat-icont' width="50" height="50" viewBox="0 0 50 50">
              <path d="M 25 2 C 12.347656 2 2 11.597656 2 23.5 C 2 30.007812 5.132812 35.785156 10 39.71875 L 10 48.65625 L 11.46875 47.875 L 18.6875 44.125 C 20.703125 44.664062 22.800781 45 25 45 C 37.652344 45 48 35.402344 48 23.5 C 48 11.597656 37.652344 2 25 2 Z M 25 4 C 36.644531 4 46 12.757812 46 23.5 C 46 34.242188 36.644531 43 25 43 C 22.835938 43 20.742188 42.6875 18.78125 42.125 L 18.40625 42.03125 L 18.0625 42.21875 L 12 45.375 L 12 38.8125 L 11.625 38.53125 C 6.960938 34.941406 4 29.539062 4 23.5 C 4 12.757812 13.355469 4 25 4 Z M 22.71875 17.71875 L 10.6875 30.46875 L 21.5 24.40625 L 27.28125 30.59375 L 39.15625 17.71875 L 28.625 23.625 Z M 22.71875 17.71875"></path>
            </svg>

          </div>


        )
      }

      {
        openChat ? (<div className="chatuser">
          <div className="chatuser-user">
            <span className="chatuser-user-name">Admin</span>
            <span className="btn text-center" onClick={() => setOpenChat(!openChat)}><LineOutlined></LineOutlined></span>
          </div>

          {
            messages ? (<ListMessage messages={mess} user={user} ></ListMessage>) : ''
          }

          <TypeMessage onSubmit={handleChatFormSubmit} ></TypeMessage>

        </div>) : ''
      }
    </div>);
}

export default AppChat;
