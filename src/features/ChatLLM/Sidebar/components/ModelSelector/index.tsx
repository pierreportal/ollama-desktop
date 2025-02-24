import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { DorpdownOptions, Dropdown, DropdownContainer } from "./styles";
import { useChatContext } from "../../../context/hooks/useChatContext";
import { LocalLLMs } from "../../../Chat/model/types";

const GET_LOCAL_LLMS = "get_local_llms";

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
  const [llms, setLLMs] = useState<Array<LocalLLMs>>([]);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const { selectedModel, setSelectedModel } = useChatContext();

  const getLocalLLMs = async () => {
    const models: Array<LocalLLMs> | string = await invoke(GET_LOCAL_LLMS);
    setIsLoading(false);
    if (typeof models === "string") {
      console.error(models);
      return;
    }
    if (!selectedModel) {
      setSelectedModel(models[0]);
    }
    setLLMs(models);
  };

  const handleSelect = (selection: LocalLLMs) => {
    setSelectedModel(selection);
    setIsCollapsed(true);
  };

  useEffect(() => {
    getLocalLLMs();
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

      <DorpdownOptions isCollapsed={isCollapsed}>
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
