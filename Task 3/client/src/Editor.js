import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

function Editor({ documentId }) {

  const [text, setText] = useState("");

  useEffect(() => {

    socket.emit("get-document", documentId);

    socket.on("load-document", data => {
      setText(data);
    });

  }, [documentId]);

  useEffect(() => {

    socket.on("receive-changes", data => {
      setText(data);
    });

  }, []);

  const handleChange = (e) => {

    const value = e.target.value;

    setText(value);

    socket.emit("send-changes", value);

  };

  return (
    <div style={{ width: "800px", margin: "50px auto" }}>

      <h2>Real-Time Collaborative Editor</h2>

      <textarea
        value={text}
        onChange={handleChange}
        style={{
          width: "100%",
          height: "400px",
          fontSize: "16px",
          padding: "10px"
        }}
      />

    </div>
  );
}

export default Editor;