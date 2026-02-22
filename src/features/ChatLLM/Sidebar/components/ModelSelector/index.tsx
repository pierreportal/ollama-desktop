import { useEffect, useState } from "react";
import { DorpdownOptions, Dropdown, DropdownContainer } from "./styles";
import { useChatContext } from "../../../context/hooks/useChatContext";
import { LocalLLM } from "../../../../../bindings";
import { invokeOllama } from "../../../Chat/utils/invokeOllama";

const parseModelName = (modelName: string) => {
  const [name, version] = modelName.split(":");
  return (
    <>
      {name} <span>{version}</span>
    </>
  );
};

export const ModelSelector = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [llms, setLLMs] = useState<Array<LocalLLM>>([]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { selectModel, getLocalLLMs } = invokeOllama;

  const { selectedModel, setSelectedModel, setCurrentChatId } =
    useChatContext();

  const getLocalModels = async () => {
    const models = (await getLocalLLMs()) as LocalLLM[];
    setIsLoading(false);
    if (typeof models === "string") {
      console.error(models);
      return;
    }
    if (!selectedModel) {
      setSelectedModel(models[0]);
      selectModel(models[0]);
    }
    setLLMs(models);
  };

  const handleSelect = async (selection: LocalLLM) => {
    if (selectedModel?.name !== selection.name) {
      setSelectedModel(selection);
      selectModel(selection);
      setCurrentChatId(null);
    }
    setIsCollapsed(true);
  };

  useEffect(() => {
    getLocalModels();
  }, []);

  return (
    <DropdownContainer>
      <label htmlFor="model-selector">Model</label>
      <Dropdown
        id="model-selector"
        disabled={isLoading || !llms.length}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {selectedModel ? parseModelName(selectedModel.name) : "Loading..."}
      </Dropdown>

      <DorpdownOptions $isCollapsed={isCollapsed}>
        <ul>
          {llms.map((llm) => (
            <li
              key={llm.name}
              value={llm.name}
              onClick={() => handleSelect(llm)}
            >
              {parseModelName(llm.name)}
            </li>
          ))}
        </ul>
      </DorpdownOptions>
    </DropdownContainer>
  );
};
