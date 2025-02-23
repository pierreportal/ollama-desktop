use std::sync::Arc;
use tokio::sync::Mutex;

mod ollama;
use ollama::{ollama, stop_stream, StreamControl};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(Arc::new(Mutex::new(StreamControl::default())))
        .invoke_handler(tauri::generate_handler![ollama, stop_stream])
        .run(tauri::generate_context!())
        .expect("error while running Tauri application");
}
