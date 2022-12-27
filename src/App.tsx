import TodoInput from "./Todo/TodoInput";
import TodoList from "./Todo/TodoList";
import styles from "./App.module.css";
import { observer, useLocalObservable } from "mobx-react-lite";
import { useEffect } from "react";

const App = () => {
  // Functions used to toggle the to do list when clicking on the " + " / " - " button
  // Use MobX instead of set state
  const appUI = useLocalObservable(() => ({
        todosVisible: true,
        loading: false,
        * toggleTodoVisibility() {
          this.loading = true; 
          // The promise creates a new action so we need a new context
          yield new Promise((resolve) => setTimeout(() => resolve(void 0), 1000));
            this.loading = false;
            this.todosVisible = !this.todosVisible;
          },
        }));

  // Show how to interact on observables       
  useEffect(() => {
    console.log({ loading: appUI.loading})
  }, [appUI.loading]);

  return (
    <div className="App">
      {/* Props removed to avoid prop drilling, useStore() hook is used instead */}
      <TodoInput />
      <div className={styles["todo-list-wrapper"]}>
        {String(appUI.loading)}
        <h2 onClick={appUI.toggleTodoVisibility}>
          {/* Conditional rendering of the text used as a button */}
          <span>{appUI.todosVisible ? "-" : "+"}</span>
          Todos
        </h2>
        {/* Render conditionally the list */}
        {appUI.todosVisible && <TodoList />}
      </div>
    </div>
  );
};

export default observer(App);
