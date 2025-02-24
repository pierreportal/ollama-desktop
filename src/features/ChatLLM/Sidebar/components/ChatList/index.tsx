import { FiEdit } from "react-icons/fi";

export const ChatList = () => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label htmlFor="model-selector">Chats</label>
        <button
          style={{
            display: "flex",
            background: "none",
            alignItems: "center",
            outline: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <FiEdit size={16} />
        </button>
      </div>
    </div>
  );
};
