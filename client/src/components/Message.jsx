function Message({ msg, own }) {
  return (
    <div className={own ? "my-message" : "other-message"}>

      <strong>{msg.username}</strong>

      <p>{msg.text}</p>

      <span>{msg.time}</span>

    </div>
  );
}

export default Message;