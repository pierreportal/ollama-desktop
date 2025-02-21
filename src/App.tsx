import ReactMarkdown from "react-markdown";
import "./App.css";
import { useStreamListener } from "./hooks/useStreamListener";
import { Form } from "./components/Form";
import { useEffect, useState } from "react";

function App() {
  const { ollamaCompletion } = useStreamListener();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (ollamaCompletion.length > 0) setIsLoading(false);
  }, [ollamaCompletion]);

  return (
    <main className="container">
      {isLoading && <p>Loading...</p>}
      <div style={{ textAlign: "left" }}>
        <ReactMarkdown>{ollamaCompletion}</ReactMarkdown>
      </div>
      <Form setIsLoading={setIsLoading} />
    </main>
  );
}

export default App;
