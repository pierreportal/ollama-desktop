use tauri::Manager;
mod error;
mod ollama;

// pub use error::Result;
use ollama::{OllamaController, StreamControl};
use std::sync::Arc;
use tokio::sync::Mutex;

mod controllers;
use controllers::chat_controller::Database;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let app_handle = app.handle();
            tauri::async_runtime::block_on(async move {
                let db = Database::new()
                    .await
                    .expect("Failed to initialize database");
                app_handle.manage(db);
            });
            Ok(())
        })
        .manage(Arc::new(Mutex::new(StreamControl::default())))
        .manage(OllamaController::new())
        .invoke_handler(tauri::generate_handler![
            ollama::ask_ollama,
            ollama::summarise_chat,
            ollama::stop_stream,
            ollama::get_local_llms,
            ollama::give_title_to_chat,
        ])
        .run(tauri::generate_context!())
        .expect("error while running Tauri application");
}
