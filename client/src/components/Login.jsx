import "./Chat.css";

function Login({ username, setUsername, setJoined }) {
  const joinChat = () => {
    if (username.trim() !== "") {
      setJoined(true);
    }
  };

  return (
    <div className="login-container">
      <h1>💬 Simple Chat App</h1>

      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={joinChat}>Join Chat</button>
    </div>
  );
}

export default Login;