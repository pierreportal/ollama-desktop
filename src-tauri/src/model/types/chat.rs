use super::{IdWrapper, Page};
use crate::model::{Castable, Creatable, Patchable};
use crate::{Error, Result, Store};

use serde::{Deserialize, Serialize};
use serde_with_macros::skip_serializing_none;
use ts_rs::TS;

use std::sync::Arc;

#[cfg_attr(test, derive(PartialEq, Clone))]
#[derive(Debug, Deserialize, Serialize, TS)]
#[ts(export, export_to = "../src/bindings/")]
pub enum MessageSender {
    User,
    Ollama,
}

#[cfg_attr(test, derive(PartialEq, Clone))]
#[derive(Debug, Deserialize, Serialize, TS)]
#[ts(export, export_to = "../src/bindings/")]
pub struct Message {
    pub from: MessageSender,
    pub content: String,
}

#[cfg_attr(test, derive(PartialEq,))]
#[derive(Debug, Deserialize, Serialize, TS)]
#[ts(export, export_to = "../src/bindings/")]
pub struct Chat {
    pub id: String,
    pub messages: Vec<Message>,
    // summary is used for keeping track of context
    pub summary: Option<String>,
    pub title: String,
}

#[cfg_attr(test, derive(Clone))]
#[derive(Debug, Deserialize)]
pub struct ChatMapping {
    pub id: IdWrapper,
    pub messages: Vec<Message>,
    pub summary: Option<String>,
    pub title: String,
}

impl Castable for ChatMapping {}

impl TryFrom<ChatMapping> for Chat {
    type Error = Error;

    fn try_from(val: ChatMapping) -> Result<Chat> {
        let task = Chat {
            id: val.id.get_id(),
            messages: val.messages,
            summary: val.summary,
            title: val.title,
        };

        Ok(task)
    }
}

#[skip_serializing_none]
#[derive(Debug, Deserialize, Serialize, TS)]
#[ts(export, export_to = "../src/bindings/")]
pub struct ChatCreation {
    pub messages: Vec<Message>,
    pub summary: Option<String>,
    pub title: String,
}

impl Creatable for ChatCreation {}

#[skip_serializing_none]
#[derive(Debug, Deserialize, Serialize, TS)]
#[ts(export, export_to = "../src/bindings/")]
pub struct ChatUpdate {
    pub messages: Option<Vec<Message>>,
    pub summary: Option<String>,
    pub title: Option<String>,
}

#[skip_serializing_none]
#[derive(Debug, Deserialize, Serialize, TS)]
#[ts(export, export_to = "../src/bindings/")]
pub struct ChatListItem {
    pub id: String,
    pub title: String,
}

impl Patchable for ChatUpdate {}

pub struct ChatController;

impl ChatController {
    const ENTITY: &'static str = "chat";

    pub async fn get(store: Arc<Store>, id: &str) -> Result<Chat> {
        store
            .get()
            .exec_get::<ChatMapping>(Self::ENTITY, id)
            .await?
            .try_into()
    }

    pub async fn create(store: Arc<Store>, data: ChatCreation) -> Result<String> {
        Ok(store
            .get()
            .exec_create(Self::ENTITY, data)
            .await?
            .id
            .get_full_id())
    }

    pub async fn update(store: Arc<Store>, id: &str, data: ChatUpdate) -> Result<String> {
        Ok(store
            .get()
            .exec_update(Self::ENTITY, id, data)
            .await?
            .id
            .get_full_id())
    }

    pub async fn delete(store: Arc<Store>, id: &str) -> Result<String> {
        Ok(store
            .get()
            .exec_delete(Self::ENTITY, id)
            .await?
            .id
            .get_full_id())
    }

    pub async fn list(store: Arc<Store>, page: Option<Page>) -> Result<Vec<ChatListItem>> {
        let res = store
            .get()
            .exec_list::<ChatMapping>(Self::ENTITY, page)
            .await?;

        println!("{:?}", res);
        res.into_iter()
            .map(|o| {
                let chat: Chat = o.try_into()?;
                Ok(ChatListItem {
                    id: chat.id,
                    title: chat.title, // Replace with the correct field
                })
            })
            .collect::<Result<_>>()
    }
}
