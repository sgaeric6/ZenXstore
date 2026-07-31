import React, { useState, useEffect } from "react";

export default function SupportChats() {
  const [chats, setChats] = useState(() => JSON.parse(localStorage.getItem("support_chats") || "[]"));
  const [active, setActive] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("support_chats", JSON.stringify(chats));
  }, [chats]);

  function open(chat) {
    setActive(chat);
  }

  function send() {
    if (!active || !text) return;
    const next = chats.map((c) => {
      if (c.id !== active.id) return c;
      return { ...c, messages: [...(c.messages || []), { id: Date.now(), from: "admin", text, at: new Date().toISOString() }] };
    });
    setChats(next);
    setText("");
  }

  if (!chats.length) return <div><h3>No support chats yet</h3></div>;

  return (
    <div style={{ display: "flex", gap: 12 }}>
      <div style={{ width: 240 }}>
        {chats.map((c) => (
          <div key={c.id} style={{ border: "1px solid #ddd", padding: 8, marginBottom: 6, cursor: "pointer" }} onClick={() => open(c)}>
            <strong>{c.userEmail}</strong>
            <div style={{ fontSize: 12 }}>{c.lastMessage}</div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }}>
        {!active && <div>Select a chat</div>}
        {active && (
          <div>
            <h3>Chat with {active.userEmail}</h3>
            <div style={{ maxHeight: 360, overflow: "auto", border: "1px solid #eee", padding: 8 }}>
              {(active.messages || []).map((m) => (
                <div key={m.id} style={{ marginBottom: 6 }}>
                  <small>{m.from} • {new Date(m.at).toLocaleString()}</small>
                  <div>{m.text}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <input style={{ flex: 1 }} value={text} onChange={(e) => setText(e.target.value)} />
              <button onClick={send}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
