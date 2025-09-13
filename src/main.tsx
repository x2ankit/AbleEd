import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import faviconUrl from "@/assets/NoBGLogo.ico?url";

// Ensure favicon is set from assets
const link = document.createElement("link");
link.rel = "icon";
link.href = faviconUrl;
document.head.appendChild(link);

createRoot(document.getElementById("root")!).render(<App />);
