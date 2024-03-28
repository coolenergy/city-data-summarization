# City Data Summarization for J. Blanton Plumbing

## Overview

This project aims to create a web page for each of 10 selected cities in the United States. Cities have their on landing page where you can see aditional details about the city. The data is pulled from GeoDB Cities API and summarized using ChatGPT API. The web page is designed to be responsive and accessible, with optional interactive elements like charts to enhance user experience. It also has caching mechanisms to improve performance when fetching data from APIs.

## Requirements

- Node.js
- npm

## Installation and Usage

1. Clone the repository to your local machine.
2. Make sure to add the preferred ports in the `.env` files of each folder (frontend and backend). And also add your OPENAI_API_KEY in the backend `.env` file.
   For example:

```bash
// backend/.env
PORT=3000
OPENAI_API_KEY=sk-1234567890
```

```bash
// frontend/.env
VITE_SERVER_PORT=3000 // Same port as the backend
```

3. Install dependencies by running `npm install` at the root of the project. Dependencies will install for both the server and client in one go thanks to npm workspaces.
4. Start the development server with `npm run dev` at the root of the project as well. This will start both the server and client in development mode at the same time.
5. That's it!
