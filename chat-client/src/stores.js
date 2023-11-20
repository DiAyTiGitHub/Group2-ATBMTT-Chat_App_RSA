import { createContext, useContext } from "react";
import AuthStore from "./views/Auth/AuthStore";

export const store = {
    authStore: new AuthStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
