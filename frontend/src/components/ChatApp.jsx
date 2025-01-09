import { useState } from 'react';
import Chat from './chat-temp'; // Import your existing Chat component

const ChatApp = () => {
  const [messages, setMessages] = useState([]); // State to store chat messages

  const sendMessage = async (userMessage) => {
    try {
      // Send user message to the backend
      const response = await fetch('http://localhost:3001/v1/chat/completions', {
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
    <div>
      <Chat messages={messages} /> {/* Display chat messages */}
      <div>
        <input
          type="text"
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              handleSendMessage(e.target.value.trim());
              e.target.value = ''; // Clear input field
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChatApp;
