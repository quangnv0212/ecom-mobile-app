import { createContext, useState } from "react";
import { User } from "../types/user.type";
import { ExtendedPurchase } from "../types/purchase.type";
import { LOCALES } from "../i18n/locales";

interface AppContextInterface {
  isAuthenticated: boolean;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
  extendedPurchases: ExtendedPurchase[];
  setExtendedPurchases: React.Dispatch<
    React.SetStateAction<ExtendedPurchase[]>
  >;
  reset: () => void;
}

export const getInitialAppContext: () => AppContextInterface = () => ({
  isAuthenticated: false,
  language: LOCALES.ENGLISH,
  setLanguage: () => null,
  setIsAuthenticated: () => null,
  profile: null,
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  reset: () => null,
});

const initialAppContext = getInitialAppContext();

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({
  children,
  defaultValue = initialAppContext,
}: {
  children: React.ReactNode;
  defaultValue?: AppContextInterface;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    defaultValue.isAuthenticated
  );
  const [language, setLanguage] = useState<string>(defaultValue.language);
  const [extendedPurchases, setExtendedPurchases] = useState<
    ExtendedPurchase[]
  >(defaultValue.extendedPurchases);
  const [profile, setProfile] = useState<User | null>(defaultValue.profile);

  const reset = () => {
    setIsAuthenticated(false);
    setExtendedPurchases([]);
    setProfile(null);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases,
        reset,
        language,
        setLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
