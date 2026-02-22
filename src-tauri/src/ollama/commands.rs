use super::{OllamaController, StreamControl};
use crate::controllers::chat_controller::Database;
use crate::models::chat::{ChatListItem, ChatMessage};
use ollama_rs::models::LocalModel;
use std::sync::Arc;
use tauri::Window;
use tokio::sync::Mutex;

#[tauri::command]
pub async fn ask_ollama(
    window: Window,
    prompt: String,
    id: Option<String>,
    state: tauri::State<'_, Arc<Mutex<StreamControl>>>,
    db: tauri::State<'_, Database>,
    ollama_controller: tauri::State<'_, OllamaController>,
) -> Result<ChatListItem, String> {
    let conversation_id = id;
    // ollama_controller.get_current_conversation_id();
    println!("Conv id: {:?}", conversation_id);
    match ollama_controller
        .ask_ollama(window, prompt.clone(), state)
        .await
    {
        Ok((model, response)) => {
            let user_msg = ChatMessage {
                from: "user".to_string(),
                content: prompt,
            };

            let model_msg = ChatMessage {
                from: "model".to_string(),
                content: response,
            };

            let thread = vec![user_msg, model_msg];

            match conversation_id {
                None => {
                    let new_conversation = db.create_chat(model, thread).await.unwrap();
                    match &new_conversation {
                        Some(c) => {
                            // ollama_controller
                            // .set_current_conversation_id(c.id.key().to_string())?;
                            Ok(ChatListItem {
                                id: c.id.key().to_string(),
                                title: c.title.clone(),
                            })
                        }
                        None => return Err("Couldn't create new conversation".to_string()),
                    }
                }
                Some(id) => {
                    println!("Updating conversation with id: {}", id);
                    let updated_conversation = db.update_chat_thread(id, thread).await.unwrap();
                    match &updated_conversation {
                        Some(c) => Ok(ChatListItem {
                            id: c.id.key().to_string(),
                            title: c.title.clone(),
                        }),
                        None => return Err("Couldn't create new conversation".to_string()),
                    }
                }
            }
        }
        Err(e) => return Err(format!("{}", e)),
    }
}

#[tauri::command]
pub async fn get_local_llms(
    ollama_controller: tauri::State<'_, OllamaController>,
) -> Result<Vec<LocalModel>, String> {
    ollama_controller.get_local_llms().await
}

#[tauri::command]
pub async fn stop_stream(state: tauri::State<'_, Arc<Mutex<StreamControl>>>) -> Result<(), String> {
    OllamaController::stop_stream(state).await
}

#[tauri::command]
pub async fn select_model(
    model: LocalModel,
    ollama_controller: tauri::State<'_, OllamaController>,
) -> Result<(), String> {
    println!("SELECT_MODEL");
    ollama_controller.set_selected_model(model)
}
// #[tauri::command]
// pub async fn summarise_chat(
//     model: String,
//     prompt: String,
//     ollama_controller: tauri::State<'_, OllamaController>,
// ) -> Result<String, String> {
//     ollama_controller.summarise_chat(model, prompt).await
// }

// #[tauri::command]
// pub async fn give_title_to_chat(
//     model: String,
//     prompt: String,
//     ollama_controller: tauri::State<'_, OllamaController>,
// ) -> Result<String, String> {
//     ollama_controller.give_title_to_chat(model, prompt).await
// }
