import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/chat', {
                message: input,
                stream: false
            });
            
            const botMessage = { sender: 'bot', text: response.data.response };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = {
                sender: 'bot',
                text: 'Sorry, I encountered an error. Please try again.'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }

        setInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="page-container bg-red">
            <div className="main-header">
            <div class="bg-blue-500 text-white p-4">Hello, Tailwind!</div>
                <img 
                    src="/assets/team_logo.png" 
                    alt="Team Logo" 
                    className="header-logo"
                />
                <h1>Engagelytics Chatbot</h1>
            </div>

            <div className="chatbot-wrapper">
                <div className="chatbot-container">
                    <div className="chat-area">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${msg.sender}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message bot loading">
                                <span className="loading-dot">.</span>
                                <span className="loading-dot">.</span>
                                <span className="loading-dot">.</span>
                            </div>
                        )}
                    </div>

                    <div className="input-container">
                        <div className="input-area">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Type your message..."
                            />
                            <button 
                                onClick={sendMessage}
                                disabled={!input.trim() || isLoading}
                                className="send-button"
                            >
                                Send
                            </button>
                        </div>
                        <div className="chat-footer">
                            Powered by Engagelytics
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;