use super::{OllamaController, StreamControl};
use ollama_rs::models::LocalModel;
use std::sync::Arc;
use tauri::Window;
use tokio::sync::Mutex;

#[tauri::command]
pub async fn ask_ollama(
    window: Window,
    prompt: String,
    model: String,
    state: tauri::State<'_, Arc<Mutex<StreamControl>>>,
    ollama_controller: tauri::State<'_, OllamaController>,
) -> Result<(), String> {
    ollama_controller.ask_ollama(window, prompt, model, state).await
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
pub async fn summarise_chat(
    model: String,
    prompt: String,
    ollama_controller: tauri::State<'_, OllamaController>,
) -> Result<String, String> {
    ollama_controller.summarise_chat(model, prompt).await
}

#[tauri::command]
pub async fn give_title_to_chat(
    model: String,
    prompt: String,
    ollama_controller: tauri::State<'_, OllamaController>,
) -> Result<String, String> {
    ollama_controller.give_title_to_chat(model, prompt).await
}
