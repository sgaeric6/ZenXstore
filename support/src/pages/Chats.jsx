import React, { useState } from "react";
import axios from "axios";

export default function Chats() {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!message.trim()) return;
    setSending(true);
    try {
      const res = await axios.post("/api/support/chat", { message });
      // Append message locally; if API returns saved message use that
      setMessages((prev) => [...prev, res?.data?.message || { message }]);
      setMessage("");
    } catch (err) {
      console.error("Send failed", err);
      alert("Message send failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <h1>Private Chat</h1>

      <textarea rows="8" placeholder="Chat here..." value={message} onChange={(e) => setMessage(e.target.value)} />

      <br /><br />

      <button onClick={handleSend} disabled={sending}>{sending ? "Sending..." : "Send"}</button>

      <hr />

      <div>
        {messages.map((m, i) => (
          <div key={i}>{m.message || m}</div>
        ))}
      </div>
    </div>
  );
}
