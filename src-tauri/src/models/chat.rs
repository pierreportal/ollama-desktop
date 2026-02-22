use ollama_rs::models::LocalModel;
use serde::{Deserialize, Serialize};
use surrealdb::RecordId;

#[derive(Debug, Deserialize, Serialize)]
pub struct ChatMessage {
    pub from: String,
    pub content: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Chat {
    title: String,
    thread: Vec<ChatMessage>,
    summary: String,
    model: LocalModel, // should change to ModelID
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Record {
    #[allow(dead_code)]
    pub id: RecordId,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ChatRecord {
    #[allow(dead_code)]
    pub id: RecordId,
    pub title: String,
    thread: Vec<ChatMessage>,
    summary: String,
    model: LocalModel,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ChatListItem {
    pub id: String,
    pub title: String,
}

impl Chat {
    pub fn new(title: String, model: LocalModel, thread: Vec<ChatMessage>) -> Self {
        Self {
            title,
            model,
            thread,
            summary: "".to_string(),
        }
    }
}
