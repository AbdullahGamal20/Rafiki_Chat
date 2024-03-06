import React, { useEffect, useRef, useState } from "react";
import "./main.css";
import sendBtn from "../assets/send.svg";
import logo from "../assets/logo-picdark-shfaf.png";
import user from "../assets/user-icon.png";

function Main() {
  const msgEnd = useRef(null);
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([
    {
      text: "Hello , How Can i help you ?",
      isBot: true,
    },
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [message]);

  const sendMessage = async (message) => {
    try {
      const data = { prompt: message };

      const response = await fetch(
        "https://rafiki-chat-bot-server.onrender.com/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      // console.log(await response.json());
      const res = await response.json();

      return res.message;
    } catch (error) {
      console.error("Error:", error);
      return "";
    }
  };

  const handleSend = async () => {
    const text = message;
    setResponses([
      ...responses,
      {
        text,
        isBot: false,
      },
    ]);
    const res = await sendMessage(text);
    setResponses([
      ...responses,
      {
        text,
        isBot: false,
      },
      {
        text: res,
        isBot: true,
      },
    ]);
    setMessage("");
    console.log(res);
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") {
      await handleSend();
    }
  };

  return (
    <div className="main">
      <div className="chats">
        {responses.map((response, i) => {
          return (
            <div className={response.isBot ? "chat bot" : "chat"} key={i}>
              <img
                src={response.isBot ? logo : user}
                className="chatImg"
                alt="Image"
              />
              <p className="text">{response.text}</p>
            </div>
          );
        })}
        <div ref={msgEnd} />
      </div>

      <div className="chatFooter">
        <div className="inp">
          <input
            type="text"
            placeholder="Send a message"
            onKeyDown={handleEnter}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="send" onClick={handleSend}>
            <img src={sendBtn} alt="Image" />
          </button>
        </div>
        <p className="copy">
          Rafiki Chatbot may produce inaccurate information about places or
          facts Rafiki Chatbot February 1.0 Version
        </p>
      </div>
    </div>
  );
}

export default Main;
