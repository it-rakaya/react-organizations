import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ThemeComponent from "./components/theme/ThemeComponent";
import { LanguageContextProvider } from "./context/language";
import { SettingsConsumer, SettingsProvider } from "./context/settingsContext";
import "./index.css";
import "./query.css";
import { AuthProvider } from "./context/auth-and-perm/AuthProvider";
import Loading from "./components/molecules/Loading";
import { OrganizationProvider } from "./context/organization provider/OrganizationProvider";
import { LoadingContextProvider } from "./context/loading";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <LoadingContextProvider>
      <LanguageContextProvider>
        <BrowserRouter>
          <OrganizationProvider>
            <SettingsProvider>
              <SettingsConsumer>
                {({ settings }) => {
                  return (
                    <ThemeComponent settings={{ ...settings }}>
                      <HelmetProvider>
                        <AuthProvider>
                          <ProSidebarProvider>
                            <Suspense fallback={<Loading />}>
                              <App />
                            </Suspense>
                          </ProSidebarProvider>
                        </AuthProvider>
                      </HelmetProvider>
                    </ThemeComponent>
                  );
                }}
              </SettingsConsumer>
            </SettingsProvider>
          </OrganizationProvider>
        </BrowserRouter>
      </LanguageContextProvider>
    </LoadingContextProvider>
  </QueryClientProvider>
);
