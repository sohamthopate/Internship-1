import React from "react";
import Editor from "./Editor";

function App() {
  const documentId = "demo-document";

  return (
    <div>
      <Editor documentId={documentId} />
    </div>
  );
}

export default App;