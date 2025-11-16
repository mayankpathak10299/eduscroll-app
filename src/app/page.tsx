// app/page.tsx

"use client"; // Essential because App.tsx uses React hooks (useState, useEffect)

// CORRECT PATH: Go up one level (..) then into the src folder to find App.tsx
import App from "./src/App"; 

export default function Page() {
  return (
    // Renders the main EduScroll application
    <App />
  );
}