import { useContext, useEffect, useRef, useState } from "react";
import Loader from "../../components/layout/Loader";
import MetaData from "../../services/setHead";
import Sidebar from "../sidebar";
import { UserContext } from "../../context/userContext";
import socketIOClient from "socket.io-client";

const ChatPage = () => {
    const ENDPOINT = "http://localhost:8001";
    const socketRef = useRef();
    const messagesEnd = useRef();
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([]);
    const { user } = useContext(UserContext)
    const [id, setId] = useState('')

    const [nameCustom, setNameCustom] = useState('')


    const [value, setValue] = useState("");

    const handleValueChange = (e) => {
        setValue(e.target.value);
        console.log(value)
    };



    useEffect(() => {
        socketRef.current = socketIOClient.connect(ENDPOINT)

        socketRef.current.on('getId', data => {
            setId(data)
        })

        socketRef.current.on('sendDataServer', dataGot => {
            setMessages(oldMsgs => [...oldMsgs, dataGot.data])
            scrollToBottom()

        })

        return () => {
            socketRef.current.disconnect();
        };
    }, []);



    useEffect(() => {
        const scrollMessage = () => {
            let element = document.querySelector(".ad-chatuser-listmessage");
            if (element) {
                element.scrollTop = element.scrollHeight;
            }
        };

        if (messages.length > 0) {
            scrollMessage();
        }
    }, [messages]);


    const loadSender =()=>{




    }


    const handleFormSubmit = (e) => {
        e.preventDefault();
    
        if (value.trim() !== "") {
            const msg = {
                content: value,
                sender: 'admin',

            }
    
            socketRef.current.emit('sendDataClient', msg);
            console.log(msg)
            setValue("");
        }
    }

    const scrollToBottom = () => {
        messagesEnd.current.scrollIntoView({ behavior: "smooth" });
      }

    return (

        <>


            <MetaData title={"Quản lý đơn hàng"}></MetaData>

            {loading ? (
                <Loader />
            ) : (
                <div className="grid-bg ba-grid anim">
                    <div className="inner">
                        <div className="row">
                            <div className="col-12 col-md-2">
                                <Sidebar />
                            </div>
                            <div className=" col-12 col-md-9">

                                <div className="m-auto">
                                    <div className="ad-chatuser posotion-relative " >
                                        <div className="ad-chatuser-user">
                                            <span className="ad-chatuser-user-name">{messages.sender}</span>
                                        </div>

                                        {messages ? (
                                            <div className="ad-chatuser-listmessage" ref={messagesEnd} >
                                                {
                                                    messages.length > 0 ? messages.map(message => (
                                                        <div key={message._id} className={message.sender === 'admin' ? 'ad-chatuser-listmessage-message me' : 'ad-chatuser-listmessage-message'}>

                                                            <p>{message.content}</p>

                                                        </div>)) : ''
                                                }
                                            </div>
                                        ) : (
                                            ""
                                        )}


                                        <form onSubmit={handleFormSubmit} className="ad-chatuser-typemessage">
                                            <input
                                                placeholder="Input a message"
                                                type="text"
                                                value={value}
                                                onChange={handleValueChange}
                                            />
                                        </form>
                                        <button type="btn">Gửi</button>
                                    </div>


                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            )}





        </>
    )


}


export default ChatPage