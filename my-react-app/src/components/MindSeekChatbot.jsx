import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import '../components/Mindseek.css';

export default function MindSeekChatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm MindSeek, your supportive companion. How are you feeling today? I can share coping strategies and study tips for high school and college students."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize Gemini
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

      const systemPrompt = `You are MindSeek, a supportive AI assistant for high school and college students. 
Focus ONLY on coping strategies, stress management, study tips, and mental wellness support. 
Keep responses under 200 words, empathetic, actionable, and encouraging.
If someone mentions crisis or self-harm, remind them to reach out to a trusted adult or call 988.`;

      const fullPrompt = `${systemPrompt}\n\nStudent: ${userMessage}\n\nMindSeek:`;

      const result = await model.generateContent(fullPrompt);
      const output = result.response.text();

      // Trim to 200 words
      const trimmedOutput = output.split(" ").slice(0, 200).join(" ");

      setMessages(prev => [...prev, { role: 'assistant', content: trimmedOutput }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Sorry, I can't connect right now. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="mindseek-container">
      <div className="mindseek-header">
        <div className="header-content">
          <div className="logo-circle"><Bot size={28} /></div>
          <div>
            <h1 className="title">MindSeek</h1>
            <p className="subtitle">Your mental wellness companion</p>
          </div>
        </div>
      </div>

      <div className="chat-area">
        <div className="messages-container">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message-row ${msg.role === 'user' ? 'user-row' : 'assistant-row'}`}>
              <div className={`avatar ${msg.role === 'user' ? 'user-avatar' : 'assistant-avatar'}`}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`message-bubble ${msg.role === 'user' ? 'user-bubble' : 'assistant-bubble'}`}>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="message-row assistant-row">
              <div className="avatar assistant-avatar"><Bot size={20} /></div>
              <div className="message-bubble assistant-bubble">
                <div className="typing-indicator">
                  <div className="dot"></div><div className="dot"></div><div className="dot"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="input-area">
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind..."
            className="message-input"
            disabled={isLoading}
          />
          <button onClick={sendMessage} disabled={isLoading || !input.trim()} className="send-button">
            <Send size={24} />
          </button>
        </div>
        <p className="crisis-text">
          If you're in crisis, please reach out to a trusted adult or call 988 (Suicide & Crisis Lifeline)
        </p>
      </div>
    </div>
  );
}