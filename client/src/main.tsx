import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { AUTH0CLIENT, AUTH0DOMAIN } from "./utils/config.ts";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={AUTH0DOMAIN}
      clientId={AUTH0CLIENT}
      authorizationParams={{
        redirect_uri: window.location.origin + "/dashboard",
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
);
