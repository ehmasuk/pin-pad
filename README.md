# PinPad

**PinPad** is a modern, real-time collaborative note-taking application. Secure, simple, and enhanced with AI, it allows users to create, share, and edit notes seamlessly.

## Features

- **Real-time Collaboration**: Edit notes with others in real-time.
- **Secure Sharing**: Password-protect your sensitive notes.
- **AI-Powered**: Furnish and refine your text using integrated AI tools.
- **Rich Editor**: Syntax highlighting, link handling, and formatting tools.
- **Customizable**: Dark mode support and adjustable font sizes.
- **Instant Access**: Share notes via a simple URL.

## Tech Stack

- **Monorepo**: [Turborepo](https://turbo.build/)
- **Package Manager**: [PNPM](https://pnpm.io/)
- **Frontend**: [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- **Real-time**: [Socket.io](https://socket.io/)
- **Database**: [MongoDB](https://www.mongodb.com/) w/ Mongoose

## Project Structure

This project is organized as a monorepo:

- `apps/web`: Next.js frontend application.
- `apps/api`: Express backend API.
- `apps/socket`: Socket.io server for real-time features.
- `packages/db`: Shared database schema and connection logic.
- `packages/ui`: Shared UI components (Shadcn).
- `packages/config`: Shared configurations (ESLint, TypeScript).

## Getting Started

### Prerequisites

- Node.js (v20+)
- PNPM (`npm i -g pnpm`)
- MongoDB Instance

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd share-note
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the relevant apps (`apps/api`, `apps/web`) or root if using a shared config.
    _Example variables needed:_
    ```env
    MONGODB_URL=mongodb+srv://...
    DB_NAME=share-note
    OPENAI_API_KEY=... # For AI features
    ```

### Running the App

Start the development environment for all apps:

```bash
pnpm dev
```

This will launch:

- Web App: `http://localhost:3000`
- API Server: `http://localhost:8080` (or configured port)
- Socket Server: (configured port)

### Building for Production

```bash
pnpm build
```

## 📄 License

This project is licensed under the [MIT](LICENSE) License.
