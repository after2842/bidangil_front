# Bidangil Frontend

Bidangil Frontend is the React web application for the Bidangil platform, built on Next.js. It delivers a rich, interactive user interface that allows customers to request products, monitor order progress, and participate in a community space. The app emphasizes a smooth user experience for complex workflows – from placing international orders to real-time updates like avatar generation – all presented in a clean, responsive design.

## Motivation & Challenges

This frontend was created to make a sophisticated service feel simple and engaging for end-users. It aims to solve real-world usability challenges: guiding users through multi-step processes (like creating a custom avatar or submitting a purchase request) without confusion, and keeping them informed of their order status in real time. Building on Next.js provided server-side rendering and routing benefits, but also introduced the challenge of managing state and side-effects in a largely asynchronous application. Ensuring responsive design across devices and integrating various interactive features (maps, rich text editing, etc.) were also important considerations. Overall, the goal was to combine the power of the backend with an intuitive UI that hides complexity and builds user trust.

## Highlights

- **Real-Time Avatar Creation:** One standout feature is a real-time avatar generator. Users go through a multi-step form to select preferences, then the frontend triggers an API call to generate a personalized avatar. Using a WebSocket connection, the app listens for a notification when the backend’s AI image generation task is complete. The moment the avatar is ready, it is rendered on the client without requiring a page refresh, showcasing seamless real-time feedback in the UI.
- **Dynamic Order Tracking & Community Features:** The application provides dynamic views for order and community data. It fetches order statuses and community posts via REST APIs and updates the interface accordingly (e.g., showing the current delivery step or new comments in a discussion). The use of React context for user session and data caching ensures that elements like the navigation bar or profile info reflect the current state throughout the app. Additionally, features like an interactive compliance guide (with shipping regulations) and Google Maps integration for certain post types demonstrate the app’s capability to present complex information in a user-friendly way.
- **Modern UI/UX and Performance:** Bidangil Frontend leverages Next.js 14 features (App Router and server components) alongside client-side interactivity where needed. The interface is styled with Tailwind CSS, benefiting from utility classes for rapid responsive design. Components from libraries like Material Tailwind and Radix UI are used to create a polished, consistent look and feel. Special attention was paid to performance by code-splitting pages and using Suspense-based loading states for smooth transitions. These optimizations make the application feel snappy even as it handles image uploads, map renders, or rich text editing with Tiptap.

## Tech Stack

- **Framework:** Next.js 14.2 (React 18) – leveraging both server-side rendering and client-side React for an optimal user experience.
- **Languages & Libraries:** JavaScript/JSX, Tailwind CSS for styling, Framer Motion for animations, Tiptap editor for rich text input.
- **State & Data Handling:** Next.js App Router with React Context for global state (user auth/session), `fetch` API for REST calls to the Django backend, and native WebSocket API for live updates.
- **Additional Integrations:** Google Maps API (for location-based content), third-party UI components (Material Tailwind, Lucide icons), and support for media uploads/embeds in posts.

## Setup

Ensure **Node.js** (v18+ recommended) is installed. After cloning the repository, install dependencies and run the development server:

```bash
npm install
npm run dev
