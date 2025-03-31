use ollama_rs::generation::completion::request::GenerationRequest;
use ollama_rs::models::LocalModel;
use ollama_rs::Ollama;
use std::sync::Arc;
use tauri::Emitter;
use tauri::Window;
use tokio::sync::{watch, Mutex};
use tokio_stream::StreamExt;

const SUMMARY_TAMPLATE: &str = "In only 3 lines, tell me what this chat is about: \n";
const TITLE_TAMPLATE: &str = "In only 3 words, Find a useful title for this chat: \n";

#[derive(Default)]
pub struct StreamControl {
    stop_sender: Option<watch::Sender<bool>>,
}

pub struct OllamaController {
    pub ollama: Ollama,
}

impl OllamaController {
    pub fn new() -> Self {
        Self {
            ollama: Ollama::default(),
        }
    }

    pub async fn get_local_llms(&self) -> Result<Vec<LocalModel>, String> {
        let models = self
            .ollama
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

    pub async fn give_title_to_chat(
        &self,
        model: String,
        prompt: String,
    ) -> Result<String, String> {
        let formatted_prompt = format!("{}{}", TITLE_TAMPLATE, prompt);
        let res = self
            .ollama
            .generate(GenerationRequest::new(model, formatted_prompt))
            .await
            .map_err(|e| e.to_string())?;

        println!("Title for chat: {:?}", res.response); //TODO: remove after testing
        Ok(res.response)
    }

    pub async fn summarise_chat(&self, model: String, prompt: String) -> Result<String, String> {
        let formatted_prompt = format!("{}{}", SUMMARY_TAMPLATE, prompt);
        let res = self
            .ollama
            .generate(GenerationRequest::new(model, formatted_prompt))
            .await
            .map_err(|e| e.to_string())?;

        println!("Summarised chat: {:?}", res.response); //TODO: remove after testing
        Ok(res.response)
    }

    pub async fn ask_ollama(
        &self,
        window: Window,
        prompt: String,
        model: String,
        state: tauri::State<'_, Arc<Mutex<StreamControl>>>,
    ) -> Result<(), String> {
        let prompt_template = if let Ok(template) = std::env::var("PROMPT_TAMPLATE") {
            template
        } else {
            "".to_string()
        };

        let formatted_prompt = format!("{}{}", prompt, prompt_template);

        println!("formatted_prompt: {}", formatted_prompt); //TODO: remove after testing

        let mut stream = self
            .ollama
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
        Ok(())
    }
}
