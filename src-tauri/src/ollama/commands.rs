use super::{OllamaController, StreamControl};
use ollama_rs::models::LocalModel;
use ollama_rs::Ollama;
use std::sync::Arc;
use tauri::Window;
use tokio::sync::Mutex;

#[tauri::command]
pub async fn ask_ollama(
    window: Window,
    prompt: String,
    model: String,
    state: tauri::State<'_, Arc<Mutex<StreamControl>>>,
) -> Result<(), String> {
    OllamaController::ask_ollama(window, prompt, model, state).await
}

#[tauri::command]
pub async fn get_local_llms() -> Result<Vec<LocalModel>, String> {
    OllamaController::get_local_llms().await
}

#[tauri::command]
pub async fn stop_stream(state: tauri::State<'_, Arc<Mutex<StreamControl>>>) -> Result<(), String> {
    OllamaController::stop_stream(state).await
}
