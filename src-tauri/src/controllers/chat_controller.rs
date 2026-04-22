use crate::models::chat::{Chat, ChatListItem, ChatMessage, ChatRecord};
use ollama_rs::models::LocalModel;
use std::sync::Arc;
use surrealdb::engine::local::{Db, RocksDb};
use surrealdb::opt::PatchOp;
use surrealdb::Surreal;
use tokio::sync::Mutex;

pub struct Database {
    db: Arc<Mutex<Surreal<Db>>>,
}

impl Database {
    pub async fn new() -> Result<Self, surrealdb::Error> {
        let db = Surreal::new::<RocksDb>("../surrealdb.db").await?;
        db.use_ns("ollama-desktop").use_db("conv").await?;
        Ok(Self {
            db: Arc::new(Mutex::new(db)),
        })
    }

    pub async fn create_chat(
        &self,
        model: LocalModel,
        thread: Vec<ChatMessage>,
    ) -> Result<Option<ChatRecord>, surrealdb::Error> {
        let new_chat = Chat::new(format!("{}: new chat", model.name), model, thread);
        let db = self.db.lock().await;
        let result = db.create("chat").content(new_chat).await?;
        Ok(result)
    }

    pub async fn update_chat_thread(
        &self,
        id: String,
        thread: Vec<ChatMessage>,
    ) -> Result<Option<ChatRecord>, surrealdb::Error> {
        let updated = {
            let db = self.db.lock().await;
            let result = db
                .update(("chat", id))
                .patch(PatchOp::add("/thread", thread))
                .await?;
            result
        };
        Ok(updated)
    }

    pub async fn get_chat_by_id(&self, id: String) -> Result<Option<ChatRecord>, surrealdb::Error> {
        let chat = {
            let db = self.db.lock().await;
            let result = db.select(("chat", id)).await?;
            result
        };
        Ok(chat)
    }

    pub async fn get_chats(&self) -> Result<Vec<ChatListItem>, surrealdb::Error> {
        let chat_items = {
            let db = self.db.lock().await;
            let result: Vec<ChatRecord> = db.query("SELECT * FROM chat").await?.take(0)?;
            result
                .into_iter()
                .map(|r| ChatListItem {
                    id: r.id.key().to_string(),
                    title: r.title,
                })
                .collect()
        };
        Ok(chat_items)
    }

    pub async fn delete_chat_by_id(&self, id: String) -> Result<(), surrealdb::Error> {
        {
            let db = self.db.lock().await;
            let result: Option<Chat> = db.delete(("chat", id)).await?;
            result
        };
        Ok(())
    }
}
