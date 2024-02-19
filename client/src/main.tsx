import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { AUTH0CLIENT, AUTH0DOMAIN, audience } from "./utils/config.ts";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={AUTH0DOMAIN}
      clientId={AUTH0CLIENT}
      authorizationParams={{
        redirect_uri: window.location.origin + "/dashboard",
        audience: audience,
      }}
    >
      <QueryClientProvider client={queryClient} >
        <App />
      </QueryClientProvider>
    </Auth0Provider>
  </React.StrictMode>,
);
