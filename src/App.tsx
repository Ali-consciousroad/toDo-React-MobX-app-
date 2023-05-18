// Importing all the necessary dependencies
import TodoInput from "./Todo/TodoInput";
import TodoList from "./Todo/TodoList";
import styles from "./App.module.css";
import { observer, useLocalObservable } from "mobx-react-lite";
import store, { useStore } from "./stores";

// Observer component to ensure re-rendering on observable changes
/*
 * App is a React Component, declared with observer to make it 'reactive' and respond to changes in state
 * 'observer' comes from mobx-react-lite and will cause the component to re-render whenever an observed state changes
 * The component expects props in the form of an object with a 'todos' property
 * The type of 'todos' is defined to be the same as that of 'store.todos', this is specified with TypeScript syntax
 */
const App = observer(({ todos } : {todos: typeof store.todos}) => {

  // A local state within the component using MobX to handle UI states.
  // It stores the state of todo list visibility and loading state, and a function to toggle visibility
  const appUI = useLocalObservable(() => ({
      todosVisible: true,
      loading: false,
      // This function is used to toggle the visibility of the todos
      toggleTodoVisibility() {
          this.todosVisible = !this.todosVisible;
      },
  }));

  return (
    <div className="App">
      {/* TodoInput component which allows the user to input new todos */}
      <TodoInput />

      {/* Wrapper for the todo list */}
      <div className={styles["todo-list-wrapper"]}>
        {/* Render loading state */}
        {String(appUI.loading)}
        
        {/* Title that also acts as a button to toggle todo list visibility */}
        <h2 onClick={appUI.toggleTodoVisibility}>
          {/* Using the current state to decide the content of the span */}
          <span>{appUI.todosVisible ? "-" : "+"}</span>
          Todos (unfinished {todos.unfinishedTodos.length})
        </h2>
        
        {/* Render TodoList only when todosVisible is true */}
        {appUI.todosVisible && <TodoList />}
      </div>
    </div>
  );
});

// Wrapper component that makes use of the useStore hook to pass todos as props to App
const AppWrapper = () => {
  const {todos} = useStore();
  return <App todos = {todos} />
}

// Exports
export { App }
export default AppWrapper;