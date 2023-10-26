import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { userSlice } from "./state/user_state.js";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { blue, purple } from "@mui/material/colors";
const cache = createCache({
  key: "css",
  prepend: true,
});

const persistConfig = { key: "root", storage, version: 1 };
const rootReducer = combineReducers({
  user: userSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
});

const client = new ApolloClient({
  uri: "http://localhost:2200/",
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById("root");
const appTheme = createTheme({
  palette: {
    primary: {
      main: "#161617",
    },
  },
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiDialog: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiModal: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <ApolloProvider client={client}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={appTheme}>
              <CacheProvider value={cache}>
                <App />
              </CacheProvider>
            </ThemeProvider>
          </StyledEngineProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
