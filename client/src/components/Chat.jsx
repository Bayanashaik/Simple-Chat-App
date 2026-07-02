import { useState, useEffect } from "react";
import io from "socket.io-client";
import Message from "./Message";
import "./Chat.css";

const socket = io("http://localhost:5000");

function Chat({ username }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Listen for incoming messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  // Send message
  const sendMessage = () => {
    if (message.trim() === "") return;

    const msg = {
      username,
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socket.emit("send_message", msg);

    setMessage("");
  };

  return (
    <div className="chat-container">

      <h2>💬 Simple Chat App</h2>

      <div className="chat-box">

        {messages.map((msg, index) => (
          <Message
            key={index}
            msg={msg}
            own={msg.username === username}
          />
        ))}

      </div>

      <div className="input-area">

        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>
  );
}

export default Chat;