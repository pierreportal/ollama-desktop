import { ipc_invoke } from "./ipc";
import { Page, Chat, ChatCreation, ChatUpdate, ChatListItem } from "../bindings";

class Controller<M, C, U> {
  suffix: string;

  constructor(suffix: string) {
    this.suffix = suffix;
  }

  async get(id: string): Promise<M> {
    return ipc_invoke(`get_${this.suffix}`, { id }).then((res) => res.data);
  }

  async create(data: C): Promise<string> {
    console.log("create data: ", data);
    return ipc_invoke(`create_${this.suffix}`, { params: data }).then((res) => {
      console.log(res);
      return res.data;
    });
  }

  async update(id: string, data: U): Promise<string> {
    return ipc_invoke(`update_${this.suffix}`, { id, data }).then((res) => {
      return res.data;
    });
  }

  async delete(id: string): Promise<string> {
    return ipc_invoke(`delete_${this.suffix}`, { id }).then((res) => res.data);
  }
}

class ChatController extends Controller<
  Chat,
  ChatCreation,
  ChatUpdate
> {
  constructor() {
    super("chat");
  }

  async list(page: Page): Promise<ChatListItem[]> {
    return ipc_invoke(`list_${this.suffix}s`, { page }).then((res) => res.data);
  }
}

export const chatController = new ChatController();