import { useState } from "react";
import { FormContainer } from "./styles";
import { FiMessageCircle, FiStopCircle } from "react-icons/fi";
import { Column } from "../../../../../UIKit";
import { Message, MESSAGE_SENDER } from "../../../../../bindings";

interface IProps {
  onSubmit: (prompt: Message) => void;
  onInterupt: () => void;
  isCompleting: boolean;
}

export const Form = ({ onSubmit, onInterupt, isCompleting }: IProps) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim().length) return;
    setPrompt("");
    onSubmit({ content: prompt, from: MESSAGE_SENDER.USER });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.currentTarget.value);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <input
        value={prompt}
        onChange={handleChange}
        placeholder="Ask me something..."
      />
      <Column $gap={10}>
        {isCompleting ? (
          <button onClick={onInterupt}>
            <FiStopCircle />
          </button>
        ) : (
          <button type="submit">
            <FiMessageCircle />
          </button>
        )}
      </Column>
    </FormContainer>
  );
};
