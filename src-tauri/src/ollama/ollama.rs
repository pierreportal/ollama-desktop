use ollama_rs::generation::completion::request::GenerationRequest;
use ollama_rs::models::LocalModel;
use ollama_rs::Ollama;
use std::sync::{Arc, Mutex};
use tauri::Emitter;
use tauri::Window;
use tokio::sync::{watch, Mutex as TokioMutex};
use tokio_stream::StreamExt;

// const SUMMARY_TAMPLATE: &str = "In only 3 lines, tell me what this chat is about: \n";
// const TITLE_TAMPLATE: &str = "In only 3 words, Find a useful title for this chat: \n";

#[derive(Default)]
pub struct StreamControl {
    stop_sender: Option<watch::Sender<bool>>,
}

pub struct OllamaController {
    pub ollama: Ollama,
    pub selected_model: Mutex<Option<LocalModel>>,
    pub current_conversation_id: Mutex<Option<String>>,
}

impl OllamaController {
    pub fn new() -> Self {
        Self {
            ollama: Ollama::default(),
            selected_model: Mutex::new(None),
            current_conversation_id: Mutex::new(None),
        }
    }

    pub fn set_selected_model(&self, model: LocalModel) -> Result<(), String> {
        let mut selected_model = self
            .selected_model
            .lock()
            .map_err(|_| "selected_model mutex poisoned".to_string())?;
        *selected_model = Some(model);
        Ok(())
    }

    pub fn get_selected_model(&self) -> Option<LocalModel> {
        self.selected_model
            .lock()
            .map_err(|_| "selected_model mutex poisoned".to_string())
            .unwrap()
            .clone()
    }

    pub fn set_current_conversation_id(&self, id: String) -> Result<(), String> {
        let mut current_conversation_id = self
            .current_conversation_id
            .lock()
            .map_err(|_| "current_conversation_id mutex poisoned".to_string())?;
        *current_conversation_id = Some(id);
        Ok(())
    }

    pub fn get_current_conversation_id(&self) -> Option<String> {
        self.current_conversation_id
            .lock()
            .map_err(|_| "current_conversation_id mutex poisoned".to_string())
            .unwrap()
            .clone()
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
        state: tauri::State<'_, Arc<TokioMutex<StreamControl>>>,
    ) -> Result<(), String> {
        let state = state.lock().await;
        if let Some(tx) = &state.stop_sender {
            let _ = tx.send(true);
        }
        Ok(())
    }

    // pub async fn give_title_to_chat(
    //     &self,
    //     model: String,
    //     prompt: String,
    // ) -> Result<String, String> {
    //     let formatted_prompt = format!("{}{}", TITLE_TAMPLATE, prompt);
    //     let res = self
    //         .ollama
    //         .generate(GenerationRequest::new(model, formatted_prompt))
    //         .await
    //         .map_err(|e| e.to_string())?;

    //     Ok(res.response)
    // }

    // pub async fn summarise_chat(&self, model: String, prompt: String) -> Result<String, String> {
    //     let formatted_prompt = format!("{}{}", SUMMARY_TAMPLATE, prompt);
    //     let res = self
    //         .ollama
    //         .generate(GenerationRequest::new(model, formatted_prompt))
    //         .await
    //         .map_err(|e| e.to_string())?;

    //     Ok(res.response)
    // }

    pub async fn ask_ollama(
        &self,
        window: Window,
        prompt: String,
        state: tauri::State<'_, Arc<TokioMutex<StreamControl>>>,
    ) -> Result<(LocalModel, String), String> {
        let selected_model = self.get_selected_model();

        match selected_model {
            None => return Err("No selected model.".to_string()),
            Some(model) => self.generate_tokens(window, model, prompt, state).await,
        }
    }

    async fn generate_tokens(
        &self,
        window: Window,
        model: LocalModel,
        prompt: String,
        state: tauri::State<'_, Arc<TokioMutex<StreamControl>>>,
    ) -> Result<(LocalModel, String), String> {
        let mut stream = self
            .ollama
            .generate_stream(GenerationRequest::new(model.clone().name, &prompt))
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
        Ok((model, ollama_response))
    }
}
