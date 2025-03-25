# ChatGPT Clone with Ollama & Local LLMs

A lightweight and privacy-focused ChatGPT clone built with [Tauri](https://tauri.app/), featuring a [React](https://react.dev/) frontend written in TypeScript. This application integrates with [Ollama](https://ollama.ai/) to allow users to chat with locally hosted AI models.

## Features

- **Local AI Chat** – Interact with various LLMs directly on your machine.
- **Model Selection** – Choose from the models you have pulled via Ollama.
- **Markdown Support** – Responses are formatted in markdown for a clean and readable UI.
- **Lightweight & Secure** – Built with Tauri for minimal resource usage and better security.
- **Fast & Responsive** – Smooth user experience.

## Screenshots

![Screenshot 2025-03-25 at 14 12 25](https://github.com/user-attachments/assets/13f02922-57ae-4e62-9370-dd6f197cd659)

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (for frontend development)
- [Rust & Cargo](https://www.rust-lang.org/) (for Tauri backend)
- [Ollama](https://ollama.ai/) (for running local LLMs)

### Clone the Repository

```sh
git clone https://github.com/pierreportal/ollama-desktop.git
cd ollama-desktop
```

### Install Dependencies

```sh
npm install  # or pnpm install / yarn install
```

### Run the Development Server

```sh
npm run tauri dev
```

## Usage

1. Open the application.
2. Select a model from the available ones in Ollama.
3. Start chatting!
4. Enjoy AI-generated responses in a well-formatted markdown UI.

## Configuration

The app fetches available models dynamically from Ollama. To pull new models, run:

```sh
ollama pull <model-name>
```

To list available models:

```sh
ollama list
```

## Building the App

To build the Tauri app for production:

```sh
npm tauri build
```

## Contributing

[TODO]

## License

This project is licensed under the MIT License.

---

### Future Enhancements

[TODO]
