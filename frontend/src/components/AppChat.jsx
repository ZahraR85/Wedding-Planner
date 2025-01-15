import { useState } from 'react';
import Chat from './TempChat'; // Import your existing Chat component
import React from 'react';

const ChatApp = () => {
  const [messages, setMessages] = useState([]); // State to store chat messages

  const [isMinimized, setIsMinimized] = useState(false); // State for chatbox visibility

  const sendMessage = async (userMessage) => {
    try {
      // Send user message to the backend
     
      // const response = await fetch('http://localhost:3001/v1/chat/completions', {

      const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: userMessage }],
        }),
      });

      const data = await response.json();
      return data.choices[0].message.content; // Extract assistant's response
    } catch (error) {
      console.error('Error:', error);
      return 'Error fetching response from backend.';
    }
  };

  const handleSendMessage = async (userMessage) => {
    // Add user message to chat
    const userMessageObj = {
      id: Date.now(),
      role: 'user',
      content: userMessage,
    };
    setMessages((prev) => [...prev, userMessageObj]);

    // Fetch assistant's response from backend
    const assistantMessage = await sendMessage(userMessage);
    const assistantMessageObj = {
      id: Date.now() + 1,
      role: 'assistant',
      content: assistantMessage,
    };
    setMessages((prev) => [...prev, assistantMessageObj]);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 bg-[#e8dfcf] shadow-2xl rounded-lg ${
        isMinimized ? 'w-16 h-16' : 'w-full max-w-md p-4'
      } flex flex-col justify-center items-center`}
    >
      {/* Toggle Button */}
      <button
        className="absolute top-2 right-2 text-sm bg-gray-300 p-1 rounded-full"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        {isMinimized ? '+' : '−'}
      </button>

      {/* Chatbox Content */}
      {!isMinimized && (
        <>
          <div
            className="chat-container w-full bg-white shadow-lg rounded-lg overflow-y-auto"
            style={{ maxHeight: '300px' }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message p-3 my-2 rounded-lg text-sm ${
                  msg.role === 'user'
                    ? 'bg-blue-100 text-blue-800 self-start'
                    : 'bg-green-100 text-green-800 self-end'
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
          <div className="w-full mt-4">
            <input
              type="text"
              className="w-full p-3 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="ask your question here..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  handleSendMessage(e.target.value.trim());
                  e.target.value = ''; // Clear input field
                }
              }}
            />
          </div>
        </>
      )}
    </div>
    // <div>
    //   <Chat messages={messages} /> {/* Display chat messages */}
    //   <div>
    //     <input
    //       type="text"
    //       placeholder="Type your message..."
    //       onKeyDown={(e) => {
    //         if (e.key === 'Enter' && e.target.value.trim()) {
    //           handleSendMessage(e.target.value.trim());
    //           e.target.value = ''; // Clear input field
    //         }
    //       }}
    //     />
    //   </div>
    // </div>
  );
};

export default ChatApp;
