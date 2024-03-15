import React, { useContext } from "react";

type ToastMessage = {
  message: "string";
  type: "SUCCESS" | "ERROR";
};
type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
};

const AppContext = React.createContext<AppContext | undefined>(undefined); //context
export const AppContextProvider = (
    {children,}: {children: React.ReactNode;  //contextprovider
}) => {
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          console.log(toastMessage);
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppcontext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
