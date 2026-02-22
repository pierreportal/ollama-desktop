mod controllers;
mod models;
mod ollama;
use controllers::{
    chat_controller::Database,
    commands::{get_chat_by_id, get_chats},
};
use ollama::{
    ask_ollama, get_local_llms, select_model, stop_stream, OllamaController, StreamControl,
};
use std::sync::Arc;
use tauri::{App, Manager};
use tokio::sync::Mutex;

fn setup_app(app: &mut App) -> Result<(), Box<dyn std::error::Error>> {
    let app_handle = app.handle();
    tauri::async_runtime::block_on(async move {
        let db = Database::new()
            .await
            .expect("Failed to initialize database");
        app_handle.manage(db);
    });
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(setup_app)
        .manage(Arc::new(Mutex::new(StreamControl::default())))
        .manage(OllamaController::new())
        .invoke_handler(tauri::generate_handler![
            ask_ollama,
            select_model,
            stop_stream,
            get_local_llms,
            get_chats,
            get_chat_by_id
        ])
        .run(tauri::generate_context!())
        .expect("error while running Tauri application");
}
