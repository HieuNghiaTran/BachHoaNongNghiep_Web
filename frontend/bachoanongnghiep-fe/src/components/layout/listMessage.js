import React from 'react';

function ListMessage(props) {
    const {messages, user, messagesEnd1} = props
    return (
        <div className="chatuser-listmessage" ref={messagesEnd1}>
            { 
                messages.map(message => (
                <div className={user.username === message.sender ? 'chatuser-listmessage-message me' : 'chatuser-listmessage-message'}>
                    
                    <p>{message.content}</p>
                    
                </div>))
            }
        </div>
    );
}

export default ListMessage;