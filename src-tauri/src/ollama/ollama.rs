use ollama_rs::generation::completion::request::GenerationRequest;
use ollama_rs::generation::completion::GenerationResponse;
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

pub struct OllamaController;

impl OllamaController {
    pub async fn get_local_llms() -> Result<Vec<LocalModel>, String> {
        let ollama = Ollama::default();
        let models = ollama
            .list_local_models()
            .await
            .map_err(|e| e.to_string())?;
        Ok(models)
    }

    pub async fn stop_stream(
        state: tauri::State<'_, Arc<Mutex<StreamControl>>>,
    ) -> Result<(), String> {
        let state = state.lock().await;
        if let Some(tx) = &state.stop_sender {
            let _ = tx.send(true);
        }
        Ok(())
    }

    pub async fn ask_ollama(
        window: Window,
        prompt: String,
        model: String,
        state: tauri::State<'_, Arc<Mutex<StreamControl>>>,
    ) -> Result<(), String> {
        let ollama = Ollama::default();

        let formatted_prompt = format!("{}{}", prompt, PROMPT_TAMPLATE);

        println!("Prompt: {}", prompt); //TODO: remove after testing

        let mut stream = ollama
            .generate_stream(GenerationRequest::new(model, &formatted_prompt))
            .await
            .map_err(|e| e.to_string())?;

        let (tx, rx) = watch::channel(false);
        {
            let mut state = state.lock().await;
            state.stop_sender = Some(tx);
        }

        let mut ollama_response: String = "".to_string();

        while let Some(token_result) = stream.next().await {
            if *rx.borrow() {
                println!("Stream interrupted."); //TODO: remove after testing
                break;
            }

            match token_result {
                Ok(response) => {
                    if let Err(e) = window.emit("ollama_token", &response) {
                        return Err(e.to_string());
                    }
                    ollama_response.push_str(response[0].response.as_str());
                }
                Err(e) => return Err(format!("Error streaming tokens: {}", e)),
            }
        }

        println!("OllaMa response: {}", ollama_response); //TODO: remove after testing
        Ok(())
    }
}
