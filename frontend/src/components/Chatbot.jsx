import { Send, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: input,
                    stream: false,
                }),
            });

            const data = await response.json();
            const botMessage = {
                sender: 'bot',
                text: data.response,
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = {
                sender: 'bot',
                text: 'Sorry, I encountered an error. Please try again.',
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

    const parseContent = (text) => {
        // Convert HTML-style tags to JSX elements
        return text.split('\n').map((line, index) => {
            // Handle strong tags
            line = line.replace(/<strong>(.*?)<\/strong>/g, '**$1**');
            
            // Handle bullet points
            if (line.startsWith('* ')) {
                const content = line.slice(2);
                return (
                    <li key={index} className="mb-3 text-zinc-200">
                        {content.split('**').map((part, i) => 
                            i % 2 === 0 ? part : <strong key={i} className="text-purple-400">{part}</strong>
                        )}
                    </li>
                );
            }
            
            // Handle numbered points
            if (line.match(/^\d+\./)) {
                const content = line.replace(/^\d+\.\s*/, '');
                return (
                    <div key={index} className="mb-3 pl-4 text-zinc-200">
                        {content.split('**').map((part, i) => 
                            i % 2 === 0 ? part : <strong key={i} className="text-purple-400">{part}</strong>
                        )}
                    </div>
                );
            }

            // Handle bullet points with dashes
            if (line.startsWith('- ')) {
                const content = line.slice(2);
                return (
                    <li key={index} className="mb-2 ml-4 text-zinc-300">
                        {content.split('**').map((part, i) => 
                            i % 2 === 0 ? part : <strong key={i} className="text-purple-400">{part}</strong>
                        )}
                    </li>
                );
            }

            // Regular text
            return line ? (
                <p key={index} className="mb-2 text-zinc-200">
                    {line.split('**').map((part, i) => 
                        i % 2 === 0 ? part : <strong key={i} className="text-purple-400">{part}</strong>
                    )}
                </p>
            ) : null;
        });
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br md:pt-20 from-gray-900 via-gray-800 to-gray-900">

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            msg.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        <div
                            className={`max-w-[80%] rounded-lg p-4 ${
                                msg.sender === 'user'
                                    ? 'bg-purple-500/20 text-zinc-100 border border-purple-500/20'
                                    : 'bg-zinc-900 text-zinc-100 border border-purple-900/50'
                            }`}
                        >
                            {parseContent(msg.text)}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-zinc-900 border border-purple-900/50 rounded-lg p-4">
                            <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-gray-900 border-t border-purple-900/50 p-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-1 bg-zinc-800 text-zinc-100 border border-purple-900/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent placeholder-zinc-500"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!input.trim() || isLoading}
                            className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-lg hover:hover:bg-purple-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 border border-purple-500/20"
                        >
                            <Send className="w-4 h-4 " />
                            <span>Send</span>
                        </button>
                    </div>
                    <div className="mt-2 text-center text-sm text-purple-400/50">
                        Powered by Engagelytics
                    </div>
                </div>
            </div>
        </div>
    );
}