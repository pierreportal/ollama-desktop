// While exploring, remove for prod.
#![allow(unused)]
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    ollama_desktop_lib::run();
}
