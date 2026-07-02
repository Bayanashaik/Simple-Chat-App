import { useState } from "react";
import Login from "./components/Login";
import Chat from "./components/Chat";

function App() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <>
      {!joined ? (
        <Login
          username={username}
          setUsername={setUsername}
          setJoined={setJoined}
        />
      ) : (
        <Chat username={username} />
      )}
    </>
  );
}

export default App;