import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { FiCpu } from "react-icons/fi";
import { DorpdownOptions, Dropdown, DropdownContainer } from "./styles";

const GET_LOCAL_LLMS = "get_local_llms";

type LocalLLMs = {
  name: string;
  size: number;
  modified_at: string;
};

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

  const getLocalLLMs = async () => {
    const models: Array<LocalLLMs> | string = await invoke(GET_LOCAL_LLMS);
    setIsLoading(false);
    if (typeof models === "string") {
      console.error(models);
      return;
    }
    setLLMs(models);
  };

  const handleSelect = (selection: string) => {
    console.log(selection); // TODO: add in context
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
        {parseModelName(llms[0]?.name)}
      </Dropdown>

      <DorpdownOptions isCollapsed={isCollapsed}>
        <ul>
          {llms.map((llm) => (
            <li
              key={llm.name}
              value={llm.name}
              onClick={() => handleSelect(llm.name)}
            >
              {parseModelName(llm.name)}
            </li>
          ))}
        </ul>
      </DorpdownOptions>
    </DropdownContainer>
  );
};
