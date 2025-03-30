// While exploring, remove for prod.
#![allow(unused)]

pub use error::{Error, Result};
use model::Store;

mod error;
mod ipc;
mod model;

use std::sync::Arc;
use tokio::sync::Mutex;

mod ollama;
use ollama::{get_local_llms, ollama, stop_stream, StreamControl};

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
            ollama,
            stop_stream,
            get_local_llms,
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
