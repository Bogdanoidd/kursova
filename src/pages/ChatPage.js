import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import SmilikiPicker from './SmilikiPicker';

const ChatPage = () => {
  const loc = useLocation(); 
  const [messages, setMessages] = useState(() => {
    let msgs = localStorage.getItem('messages');
    if (msgs) {
      return JSON.parse(msgs);
    } else {
      return [];
    }
  });
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState(loc.state?.username || 'Невідомий');
  const [showsmilikiPicker, setShowsmilikiPicker] = useState(false);
  const messagesend = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    ws.current = socket;

    socket.onopen = function () {
      console.log('Connected');
    };

    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log('Message:', data);

      const newMessages = messages.slice(); 
      newMessages.push(data);
      setMessages(newMessages);
      localStorage.setItem('messages', JSON.stringify(newMessages));
    };

    socket.onerror = function (error) {
      console.log('Error', error);
    };

    socket.onclose = function () {
      console.log('Closed');
    };

    return function () {
      socket.close();
    };
  }, [messages]);

  const sendMsg = () => {
    if (newMessage.trim() && ws.current && ws.current.readyState === 1) {
      const msg = { text: newMessage, username: username, id: new Date().getTime(),
      };

      console.log('Sending:', msg);
      ws.current.send(JSON.stringify(msg));

      const messageses = messages.slice();
      messageses.push(msg);
      setMessages(messageses);
      localStorage.setItem('messages', JSON.stringify(messageses));

      setNewMessage('');
    } else {
      console.log('Error: WebSocket not open or empty message');
    }
  };

  const addSmiliki = (Smiliki) => {
    setNewMessage(newMessage + Smiliki);
    setShowsmilikiPicker(false);
  };

  const viknoSmilikiPicker = () => {
    setShowsmilikiPicker(!showsmilikiPicker);
  };

  const scrollMessages = () => {
    if (messagesend.current) {
      messagesend.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollMessages();
  }, [messages]);

  return (
    <div className="chat-container">
      <h1>Чат</h1>
      <div className="message-history">
        <div className="messages">
          {messages.map(function (m, i) {
            return (
              <div key={i} className="message">
                <b>{m.username}:</b> {m.text}
              </div>
            );
          })}
          <div ref={messagesend}></div>
        </div>
      </div>
      <div className="message-input">
        <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Напишіть щось..."
        ></textarea>
        <div>
          <button onClick={sendMsg}>Відправити</button>
          <button onClick={viknoSmilikiPicker}>Смайлики</button>
        </div>
        {showsmilikiPicker ? <SmilikiPicker onSelectsmiliki={addSmiliki} /> : null}
      </div>
    </div>
  );
};

export default ChatPage;
