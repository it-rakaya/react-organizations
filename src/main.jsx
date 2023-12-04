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
import { UserProvider } from "./context/user provider/UserContext";
import { OrganizationProvider } from "./context/organization provider/OrganizationProvider";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    {/* <LoadingContextProvider> */}
    {/* <LanguageContextProvider> */}
    <BrowserRouter>
      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return (
              <ThemeComponent settings={settings}>
                <HelmetProvider>
                  <OrganizationProvider>
                    <UserProvider>
                      <AuthProvider>
                        <ProSidebarProvider>
                          <Suspense fallback={<Loading />}>
                            <App />
                          </Suspense>
                        </ProSidebarProvider>
                      </AuthProvider>
                    </UserProvider>
                  </OrganizationProvider>
                </HelmetProvider>
              </ThemeComponent>
            );
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </BrowserRouter>
    {/* </LanguageContextProvider> */}
    {/* </LoadingContextProvider> */}
  </QueryClientProvider>
);
