import TodoInput from "./Todo/TodoInput";
import TodoList from "./Todo/TodoList";
import styles from "./App.module.css";
import { observer, useLocalObservable } from "mobx-react-lite";
import { useStore } from "./stores";
import { useEffect } from "react";
import { when } from "mobx";

const App = () => {
  const { todos } = useStore()

  useEffect(() => {
    const promiseWhen = when(
      () => !appUI.todosVisible, 
    );
  
  promiseWhen.then(() => {
    console.log("clean up!");
  });
}, []);

  // Functions used to toggle the to do list when clicking on the " + " / " - " button
  const appUI = useLocalObservable(() => ({
        todosVisible: true,
        loading: false,
        toggleTodoVisibility() {
            this.todosVisible = !this.todosVisible;
          },
  }));

  return (
    <div className="App">
      {/* Props removed to avoid prop drilling, useStore() hook is used instead */}
      <TodoInput />
      <div className={styles["todo-list-wrapper"]}>
        {String(appUI.loading)}
        <h2 onClick={appUI.toggleTodoVisibility}>
          {/* Conditional rendering of the text used as a button */}
          <span>{appUI.todosVisible ? "-" : "+"}</span>
          Todos (unfinished {todos.unfinishedTodos.length})
        </h2>
        {/* Render conditionally the list */}
        {appUI.todosVisible && <TodoList />}
      </div>
    </div>
  );
};

export default observer(App);
