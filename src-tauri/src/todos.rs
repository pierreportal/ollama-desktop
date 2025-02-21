use serde_json::{from_reader, Value};
use std::fs::File;

#[derive(serde::Serialize)]
enum TodoStatus {
    NotStarted,
    InProgress,
    Completed,
}

#[derive(serde::Serialize)]
struct Todo {
    id: u32,
    text: String,
    completed: TodoStatus,
    date: String,
}

#[tauri::command]
pub fn read_todos() -> serde_json::Result<Value> {
    let file = File::open("todos.json");
    if let Ok(file) = file {
        let json: Value = from_reader(file)?;
        return Ok(json);
    } else {
        return Ok(Value::Null);
    }
}
