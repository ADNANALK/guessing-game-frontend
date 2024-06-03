import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/HomePage.css'

interface ChatProps {
    messages: { player: string; message: string }[];
    onSendMessage: (message: string) => void;
}

const Chat: React.FC<ChatProps> = ({ messages, onSendMessage }) => {
    const [message, setMessage] = useState<string>('');

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            onSendMessage(message);
            setMessage('');
        }
    };

    useEffect(() => {
        // Scroll to the bottom of the message list when a new message is added
        const messageList = document.getElementById('message-list');
        if (messageList) {
            messageList.scrollTop = messageList.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="card bg-dark text-light p-3 mt-3">
            <div className="overflow-auto mb-3" style={{ maxHeight: '200px' }} id="message-list">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2">
                        <strong>{msg.player}: </strong>
                        {msg.message}
                    </div>
                ))}
            </div>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
