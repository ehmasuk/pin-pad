# 📍 PinPad

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20-green.svg)](https://nodejs.org/)
[![Package Manager: PNPM](https://img.shields.io/badge/package--manager-pnpm-blue.svg)](https://pnpm.io/)
[![Demo](https://img.shields.io/badge/demo-live-orange.svg)](https://pinpad.vercel.app/)

**PinPad** is a modern, real-time collaborative note-taking application designed for speed, security, and simplicity. Whether you're brainstorming with a team or securing sensitive personal notes, PinPad provides a distraction-free environment enhanced with AI capabilities.

[**🌐 Live Demo**](https://pinpad.vercel.app/) | [**📄 SRS Documentation**](SRS.md)

---

## ✨ Key Features

### 🚀 Real-time Collaboration
*   **Live Sync**: Edit notes simultaneously with multiple users using high-performance WebSockets.
*   **Instant Sharing**: Generate unique, shareable URLs for immediate access.
*   **View/Edit Modes**: Seamlessly switch between reading and contributing.

### 🛡️ Privacy & Security
*   **Password Protection**: Secure sensitive notes with robust password encryption.
*   **Private Links**: Only those with the link (and password) can access your content.

### 🧠 Smart Editing
*   **AI-Powered Text Refinement**: Use integrated AI to polish, summarize, or expand your thoughts.
*   **Rich Editor**: Full support for syntax highlighting, clickable links, and advanced formatting.
*   **Real-time Analytics**: Keep track of word and character counts as you type.

### 🎨 Premium Experience
*   **Modern UI/UX**: Built with Shadcn UI and Tailwind CSS for a sleek, responsive look.
*   **Dark Mode Support**: Gentle on the eyes for late-night coding or writing sessions.
*   **Accessibility**: Adjustable font sizes and screen-reader friendly components.

---

## 🏗️ Project Structure

PinPad is organized as a high-performance **Monorepo** powered by [Turborepo](https://turbo.build/):

```text
├── apps/
│   ├── web/          # Next.js frontend application
│   ├── api/          # Express.js REST API
│   └── socket/       # Dedicated Socket.io server for real-time sync
├── packages/
│   ├── db/           # Shared MongoDB schema and Mongoose connection
│   ├── ui/           # Shared UI component library (Shadcn + Tailwind)
│   ├── config/       # Shared ESLint, Prettier, and TypeScript configs
│   └── utils/        # Shared helper functions and validation (Zod)
```

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Monorepo** | Turborepo, PNPM |
| **Frontend** | Next.js 14, React, Tailwind CSS, Shadcn UI |
| **Backend** | Node.js, Express |
| **Real-time** | Socket.io |
| **Database** | MongoDB with Mongoose |
| **Validation** | Zod |
| **Deployment**| Vercel (Web), Custom/Railway (API/Socket) |

---

## 🚦 Getting Started

### Prerequisites

- **Node.js**: `v20.x` or higher
- **PNPM**: `v9.x` or higher (`npm i -g pnpm`)
- **MongoDB**: A local instance or MongoDB Atlas cluster

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/ehmasuk/pin-pad.git
    cd pin-pad
    ```

2.  **Install Dependencies**
    ```bash
    pnpm install
    ```

3.  **Environment Setup**
    Create a `.env` file in `apps/api` and `apps/web`.
    ```env
    # apps/api/.env
    MONGODB_URL=your_mongodb_connection_string
    PORT=8080
    JWT_SECRET=your_jwt_secret

    # apps/web/.env
    NEXT_PUBLIC_API_URL=http://localhost:8080
    NEXT_PUBLIC_SOCKET_URL=http://localhost:8081
    ```

### Development

Start all services in development mode:

```bash
pnpm dev
```

- **Frontend**: `http://localhost:3000`
- **API Server**: `http://localhost:8080`
- **Socket Server**: `http://localhost:8081`

### Build

```bash
pnpm build
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/ehmasuk">ehmasuk</a>
</p>
