// While exploring, remove for prod.
#![allow(unused)]
pub use error::{Error, Result};
pub use model::Store;
use ollama::StreamControl;
use std::sync::Arc;
use tokio::sync::Mutex;

mod error;
mod ipc;
mod model;
mod ollama;

#[tokio::main]
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub async fn run() -> Result<()> {
    let store = Store::new().await?;
    let store = Arc::new(store);

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(store)
        .manage(Arc::new(Mutex::new(StreamControl::default())))
        .invoke_handler(tauri::generate_handler![
            ollama::ask_ollama,
            ollama::stop_stream,
            ollama::get_local_llms,
            ipc::get_chat,
            ipc::create_chat,
            ipc::update_chat,
            ipc::delete_chat,
            ipc::list_chats,
        ])
        .run(tauri::generate_context!())
        .expect("error while running Tauri application");

    Ok(())
}
