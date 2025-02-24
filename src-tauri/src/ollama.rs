use ollama_rs::generation::completion::request::GenerationRequest;
use ollama_rs::models::LocalModel;
use ollama_rs::Ollama;
use std::sync::Arc;
use tauri::Emitter;
use tauri::Window;
use tokio::sync::{watch, Mutex};
use tokio_stream::StreamExt;

const PROMPT_TAMPLATE: &str = "";

#[derive(Default)]
pub struct StreamControl {
    stop_sender: Option<watch::Sender<bool>>,
}
#[tauri::command]
pub async fn ollama(
    window: Window,
    prompt: String,
    state: tauri::State<'_, Arc<Mutex<StreamControl>>>,
) -> Result<(), String> {
    println!("Generating tokens...{}", prompt);

    let ollama = Ollama::default();
    let model = "deepseek-coder-v2".to_string();

    let formatted_prompt = format!("{}{}", prompt, PROMPT_TAMPLATE);

    let mut stream = ollama
        .generate_stream(GenerationRequest::new(model, &formatted_prompt))
        .await
        .map_err(|e| e.to_string())?;

    let (tx, rx) = watch::channel(false);
    {
        let mut state = state.lock().await;
        state.stop_sender = Some(tx);
    }

    while let Some(token_result) = stream.next().await {
        if *rx.borrow() {
            println!("Stream interrupted.");
            break;
        }

        match token_result {
            Ok(response) => {
                if let Err(e) = window.emit("ollama_token", &response) {
                    return Err(e.to_string());
                }
            }
            Err(e) => return Err(format!("Error streaming tokens: {}", e)),
        }
    }

    Ok(())
}

#[tauri::command]
pub async fn get_local_llms() -> Result<Vec<LocalModel>, String> {
    let ollama = Ollama::default();
    let models = ollama
        .list_local_models()
        .await
        .map_err(|e| e.to_string())?;
    Ok(models)
}

#[tauri::command]
pub async fn stop_stream(state: tauri::State<'_, Arc<Mutex<StreamControl>>>) -> Result<(), String> {
    let state = state.lock().await;
    if let Some(tx) = &state.stop_sender {
        let _ = tx.send(true);
    }
    Ok(())
}
