import { useEffect, useState } from "react";
import socket from "./socket";
import "./App.css";

function App() {

  // Q1: BASIC REAL-TIME CHAT
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Q2: MULTIPLE CHAT ROOMS
  const [room, setRoom] = useState("General");

  // Q4: MESSAGE ACKNOWLEDGMENT
  const [deliveryStatus, setDeliveryStatus] = useState("");

  // Q5: ACTIVE USERS  
  const [activeUsers, setActiveUsers] = useState([]);

  // Q3: LOCATION  
  const [locationMessages, setLocationMessages] = useState([]);

  // Q1, Q2, Q5: SOCKET EVENTS  
  useEffect(() => {
    // Q1: RECEIVE REAL-TIME MESSAGE
    socket.on("receiveMessage", (newMessage) => {
      setMessages((previousMessages) => [
        ...previousMessages,
        newMessage,
      ]);
    });

    // Q1 + Q2 + Q6: LOAD PREVIOUS MESSAGES
    socket.on("previousMessages", (previousMessages) => {
      setMessages(previousMessages);
    });

    // Q5: RECEIVE ACTIVE USERS    
    socket.on("activeUsers", (users) => {
      console.log("Active users:", users);
      setActiveUsers(users);
    });

    // Q5: USER JOINED    
    socket.on("userJoined", (data) => {
      console.log(
        `${data.username} joined the room`
      );
    });

    // Q5: USER LEFT    
    socket.on("userLeft", (data) => {
      console.log(
        `${data.username} left the room`
      );
    });

    // Q3: RECEIVE LOCATION    
    socket.on("receiveLocation", (location) => {
      setMessages((previousMessages) => [
        ...previousMessages,
        location,
      ]);
    });

    // CLEANUP
    return () => {
      socket.off("receiveMessage");
      socket.off("previousMessages");
      socket.off("activeUsers");
      socket.off("userJoined");
      socket.off("userLeft");
      socket.off("receiveLocation");
    };
  }, []);

  // Q1 + Q2: JOIN CHAT ROOM
  const handleJoin = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      return;
    }
    setJoined(true);
    socket.emit("joinRoom", {
      username,
      room,
    });
  };

  // Q1 + Q4: SEND MESSAGE
  const sendMessage = () => {
    if (!message.trim()) {
      return;
    }
    setDeliveryStatus("Sending...");
    socket.emit(
      "sendMessage",
      {
        username,
        text: message,
        room,
      },

      // Q4: ACKNOWLEDGMENT
      (response) => {
        if (response.success) {
          setDeliveryStatus("✓ Delivered");
        } else {
          setDeliveryStatus("✕ Failed");
        }
      }
    );
    setMessage("");
  };

  // Q3: SEND LOCATION
  const sendLocation = () => {
    if (!navigator.geolocation) {
      alert(
        "Geolocation is not supported by your browser."
      );
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {
          latitude,
          longitude,
        } = position.coords;
        socket.emit(
          "sendLocation",
          {
            username,
            room,
            lat: latitude,
            lng: longitude,
          },
          (response) => {
            if (response.success) {
              console.log(
                "Location delivered"
              );
            }
          }
        );
      },
      () => {
        alert(
          "Unable to get your location."
        );
      }
    );
  };

  // LOGIN SCREEN
  if (!joined) {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="logo-circle">
            💬
          </div>
          <h1>
            Realtime Chat
          </h1>
          <p className="subtitle">
            Connect and chat in real time
          </p>
          <form onSubmit={handleJoin}>
            {/* Q1: USERNAME */}
            <div className="form-group">
              <label>
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
              />
            </div>

            {/* Q2: ROOM */}
            <div className="form-group">
              <label>
                Choose Room
              </label>
              <select
                value={room}
                onChange={(e) =>
                  setRoom(e.target.value)
                }
              >
                <option value="General">General</option>
                <option value="Coding">Coding</option>
                <option value="Cricket">Cricket</option>
                <option value="Movies">Movies</option>
              </select>
            </div>
            <button type="submit" className="join-button">
              Join Chat
            </button>
          </form>
        </div>
      </div>
    );
  }

  // CHAT SCREEN
  return (
    <div className="chat-page">
      {/* Q1: HEADER */}
      <header className="chat-header">
        <div>
          <h1>💬 Realtime Chat</h1>

          {/* Q2: CURRENT ROOM */}
          <span className="room-name"> Room: {room}</span>
        </div>

        {/* Q1: CURRENT USER */}
        <div className="user-info">
          👤 {username}
        </div>
      </header>
      <main className="chat-layout">
        {/* CHAT AREA */}
        <section className="chat-card">

          {/* Q1: MESSAGE LIST */}
          <div className="messages-container">
            {messages.length === 0 ? (
              <div className="empty-chat">
                <div className="empty-icon">💬</div>
                <h2>No messages yet</h2>
                <p>Send the first message!</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  className="message"
                  key={msg._id}
                >
                  <div className="message-header">
                    <strong>{msg.username}</strong>

                    {/* Q6: TIMESTAMP */}
                    <small>
                      {new Date(
                        msg.createdAt
                      ).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </small>
                  </div>

                  {/* Q3: LOCATION MESSAGE */}
                  {msg.type === "location" ? (
                    <a
                      href={`https://www.google.com/maps?q=${msg.lat},${msg.lng}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      📍 View Location
                    </a>
                  ) : (
                    <p>{msg.text}</p>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Q1: MESSAGE INPUT */}
          <div className="message-input-area">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            {/* Q3: LOCATION BUTTON */}
            <button
              onClick={sendLocation}
              title="Share your location"
            >
              📍
            </button>

            {/* Q1: SEND BUTTON */}
            <button
              onClick={sendMessage}
            >
              Send
            </button>
          </div>

          {/* Q4: DELIVERY STATUS */}
          {deliveryStatus && (
            <div className="delivery-status">
              {deliveryStatus}
            </div>
          )}
        </section>

        {/* Q5: ACTIVE USERS */}
        <aside className="users-card">
          <h2>Active Users</h2>

          {/* Q5: DISPLAY ALL ACTIVE USERS */}
          {activeUsers.length === 0 ? (
            <p>No active users</p>
          ) : (
            activeUsers.map(
              (user, index) => (
                <div
                  className="user-item"
                  key={`${user}-${index}`}
                >
                  <span className="online-dot">
                  </span>
                  <span>
                    {user}
                  </span>
                  {/* Q5: CURRENT USER */}
                  {user === username && (
                    <span className="you-label">
                      You
                    </span>
                  )}
                </div>
              )
            )
          )}
        </aside>
      </main>
    </div>
  );
}
export default App;