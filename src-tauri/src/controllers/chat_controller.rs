// use surrealdb::opt::PatchOp;
use std::sync::Arc;
use surrealdb::Surreal;
use tokio::sync::Mutex;
use surrealdb::engine::local::{Db, RocksDb};

// use crate::models::note::{Note, Record, NoteRecord};

pub struct Database {
    db: Arc<Mutex<Surreal<Db>>>,
}

impl Database {
    pub async fn new() -> Result<Self, surrealdb::Error> {
        let db = Surreal::new::<RocksDb>("../surrealdb.db").await?;
        // Initialize database
        db.use_ns("test").use_db("test").await?;
        Ok(Self {
            db: Arc::new(Mutex::new(db)),
        })
    }

    // pub async fn create_note(
    //     &self,
    //     title: String,
    //     content: String
    // ) -> Result<Option<Record>, surrealdb::Error> {
    //     let created = {
    //         let db = self.db.lock().await;
    //         let result = db.create("note").content(Note {
    //             title,
    //             content
    //         }).await?;
    //         db.query("COMMIT TRANSACTION").await?;
    //         result
    //     };
    //     Ok(created)
    // }

    // pub async fn update_note(
    //     &self,
    //     id: String,
    //     title: String,
    //     content: String
    // ) -> Result<Option<Record>, surrealdb::Error> {
    //     let updated = {
    //         let db = self.db.lock().await;
    //         let result = db.update(("note", id))
    //             .patch(PatchOp::replace("/title", title))
    //             .patch(PatchOp::replace("/content", content))
    //             .await?;
    //         db.query("COMMIT TRANSACTION").await?;
    //         result
    //     };
    //     Ok(updated)
    // }

    // pub async fn get_note_by_id(
    //     &self,
    //     id: String
    // ) -> Result<Option<NoteRecord>, surrealdb::Error> {
    //     let note = {
    //         let db = self.db.lock().await;
    //         db.query("BEGIN TRANSACTION").await?;
    //         let result = db.select(("note", id)).await?;
    //         db.query("COMMIT TRANSACTION").await?;
    //         result
    //     };
    //     Ok(note)
    // }

    // pub async fn get_notes(&self) -> Result<Vec<NoteRecord>, surrealdb::Error> {
    //     let notes = {
    //         let db = self.db.lock().await;
    //         db.query("BEGIN TRANSACTION").await?;
    //         let result: Vec<NoteRecord> = db.query("SELECT * FROM note").await?.take(0)?;
    //         db.query("COMMIT TRANSACTION").await?;
    //         result
    //     };
    //     Ok(notes)
    // }

    // pub async fn delete_note_by_id(&self, id:String) -> Result<(), surrealdb::Error> {
    //     {
    //         let db = self.db.lock().await;
    //         let result: Option<Note> = db.delete(("note", id)).await?;
    //         db.query("COMMIT TRANSACTION").await?;
    //         result
    //     };
    //     Ok(())
    // }

    // pub async fn delete_all_notes(&self) -> Result<(), surrealdb::Error> {
    //     {
    //         let db = self.db.lock().await;
    //         db.query("DELETE note").await?;
    //         // Ensure the transaction is flushed
    //         db.query("COMMIT TRANSACTION").await?;
    //     };
    //     Ok(())
    // }
}