import { ViteReactSSG } from "vite-react-ssg";
import App from "./App";

export const createRoot = ViteReactSSG({
  routes: [
    {
      path: "/",
      Component: App,
    },
  ],
} as const);
