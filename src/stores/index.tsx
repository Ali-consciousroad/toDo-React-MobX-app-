// Manage all our MobX stores and React send them to the React API 
// Create our store
import { createContext, useContext } from "react";
import TodoStore from "./TodoStore";

const store = {
    // We use factory functions here so we remove the " new " we used to write before the TodoStore()  
    todos: TodoStore(), 
};

export const StoreContext = createContext(store);

export const useStore = () => {
    return useContext<typeof store>(StoreContext);
};

export default store; 