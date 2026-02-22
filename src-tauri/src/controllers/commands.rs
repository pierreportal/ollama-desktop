use crate::controllers::chat_controller::Database;
use crate::models::chat::{ChatListItem, ChatRecord};
use tauri::State;

#[tauri::command]
pub async fn get_chats(db: State<'_, Database>) -> Result<Vec<ChatListItem>, String> {
    match db.get_chats().await {
        Ok(chats) => Ok(chats),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub async fn get_chat_by_id(
    db: State<'_, Database>,
    id: String,
) -> Result<Option<ChatRecord>, String> {
    match db.get_chat_by_id(id).await {
        Ok(chat) => Ok(chat),
        Err(e) => Err(e.to_string()),
    }
}
