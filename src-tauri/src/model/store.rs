use super::types::{Page, Record};
use crate::{Error, Result};

use serde::{de::DeserializeOwned, Serialize};
use surrealdb::engine::local::{Db, Mem};
use surrealdb::Surreal;

pub struct SurrealStore {
    pub db: Surreal<Db>,
}

pub trait Castable: DeserializeOwned {}
pub trait Creatable: Serialize {}
pub trait Patchable: Serialize {}

impl SurrealStore {
    pub(in crate::model) async fn new() -> Result<Self> {
        // Create database connection
        let db = Surreal::new::<Mem>(()).await?;

        // Select a specific namespace / database
        db.use_ns("test").use_db("test").await?;

        Ok(SurrealStore { db })
    }

    pub(in crate::model) async fn exec_get<T: Castable>(&self, tb: &str, tid: &str) -> Result<T> {
        let res: Option<T> = self.db.select((tb, tid)).await?;
        res.ok_or(Error::XValueNotFound(format!("{tb}:{tid}")))
    }

    pub(in crate::model) async fn exec_create<T: Creatable>(
        &self,
        tb: &str,
        data: T,
    ) -> Result<Record> {
        let res: Vec<Record> = self.db.create(tb).content(data).await?;
        res.into_iter()
            .next()
            .ok_or(Error::StoreFailToCreate(format!(
                "exec_create {tb} got empty result."
            )))
    }

    pub(in crate::model) async fn exec_update<T: Patchable>(
        &self,
        tb: &str,
        tid: &str,
        data: T,
    ) -> Result<Record> {
        let res: Option<Record> = self.db.update((tb, tid)).content(data).await?;
        res.ok_or(Error::StoreFailToPatch {
            method: "update".into(),
            tb: tb.into(),
            tid: tid.into(),
        })
    }

    pub(in crate::model) async fn exec_delete(&self, tb: &str, tid: &str) -> Result<Record> {
        let res: Option<Record> = self.db.delete((tb, tid)).await?;
        res.ok_or(Error::StoreFailToPatch {
            method: "delete".into(),
            tb: tb.into(),
            tid: tid.into(),
        })
    }

    pub(in crate::model) async fn exec_list<T: Castable>(
        &self,
        tb: &str,
        page: Option<Page>,
    ) -> Result<Vec<T>> {
        let mut sql = String::from("SELECT * FROM type::table($tb)");

        // --- Apply the limit and offset
        if let Some(page) = page {
            let limit = page.get_limit()?.to_string();
            let offset = page.get_offset().to_string();
            sql.push_str(&format!(" LIMIT {limit} START {offset}"));
        }

        let mut res = self.db.query(sql).bind(("tb", tb)).await?;
        Ok(res.take(0)?)
    }
}
