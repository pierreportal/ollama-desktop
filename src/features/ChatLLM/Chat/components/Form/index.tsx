import { useState } from "react";
import { FormContainer } from "./styles";
import { FiMessageCircle, FiStopCircle } from "react-icons/fi";
import { Column } from "../../../../../UIKit";
import { ChatItem } from "../../model/types";

interface IProps {
  onSubmit: (prompt: ChatItem) => void;
  onInterupt: () => void;
  isCompleting: boolean;
}

export const Form = ({ onSubmit, onInterupt, isCompleting }: IProps) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim().length) return;
    setPrompt("");
    onSubmit({ text: prompt, isUser: true });
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
      <Column gap={10}>
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
