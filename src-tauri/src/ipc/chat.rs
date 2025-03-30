use super::{CreateParams, DeleteParams, GetParams, IpcResponse, ListParams, UpdateParams};
use crate::model::types::{Chat, ChatController, ChatCreation, ChatUpdate};
use crate::model::Store;

use tauri::{command, AppHandle, Manager, Wry};

use std::sync::Arc;

#[command]
pub async fn get_chat(app: AppHandle<Wry>, params: GetParams) -> IpcResponse<Chat> {
    let store = (*app.state::<Arc<Store>>()).clone();
    ChatController::get(store, &params.id).await.into()
}

#[command]
pub async fn create_chat(
    app: AppHandle<Wry>,
    params: CreateParams<ChatCreation>,
) -> IpcResponse<String> {
    let store = (*app.state::<Arc<Store>>()).clone();
    ChatController::create(store, params.data).await.into()
}

#[command]
pub async fn update_chat(
    app: AppHandle<Wry>,
    params: UpdateParams<ChatUpdate>,
) -> IpcResponse<String> {
    let store = (*app.state::<Arc<Store>>()).clone();
    ChatController::update(store, &params.id, params.data)
        .await
        .into()
}

#[command]
pub async fn delete_chat(app: AppHandle<Wry>, params: DeleteParams) -> IpcResponse<String> {
    let store = (*app.state::<Arc<Store>>()).clone();
    ChatController::delete(store, &params.id).await.into()
}

#[command]
pub async fn list_chats(app: AppHandle<Wry>, params: ListParams) -> IpcResponse<Vec<Chat>> {
    let store = (*app.state::<Arc<Store>>()).clone();

    ChatController::list(store, params.page).await.into()
}
