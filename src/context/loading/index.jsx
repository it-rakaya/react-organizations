import { createContext, useContext } from "react";
// import { useDisclosure } from "@mantine/hooks";

const LoadingContext = createContext();

export const LoadingContextProvider = ({ children }) => {
  // const [visible, { toggle, open, close }] = useDisclosure(false);

  return (
    <LoadingContext.Provider value={{ open, close, visible, toggle }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingOverlay = () => useContext(LoadingContext);
