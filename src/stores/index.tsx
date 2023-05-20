// Manage all our MobX stores and React send them to the React API 
// Import the useContext hook 
import { createContext, useContext } from "react";
import TodoStore from "./TodoStore";

// Create our store
const store = {
    // We use factory functions here so we remove the " new " we used to write before the TodoStore()  
    todos: TodoStore(), 
};

// Create a context for the `store` using `createContext`
// This will allow the store to be accessed from any component in our application
export const StoreContext = createContext(store);

// Define a custom hook called `useStore`
// This uses the `useContext` hook to consume the `StoreContext`
// It will return the `store` when used in a component
export const useStore = () => {
    return useContext<typeof store>(StoreContext);
};

export default store; 