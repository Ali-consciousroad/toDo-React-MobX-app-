import TodoInput from "./Todo/TodoInput";
import TodoList from "./Todo/TodoList";
import styles from "./App.module.css";
import { observer, useLocalObservable } from "mobx-react-lite";
import store, { useStore } from "./stores";
import { toJS } from "mobx";

const App = observer(({ todos } : {todos: typeof store.todos}) => {
  // Functions used to toggle the to do list when clicking on the " + " / " - " button
  const appUI = useLocalObservable(() => ({
      todosVisible: true,
      loading: false,
      toggleTodoVisibility() {
          this.todosVisible = !this.todosVisible;
      },
  }));

  console.log(toJS(todos.list));

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
});

const AppWrapper = () => {
  const {todos} = useStore();
  return <App todos = {todos} />
}

export { App }
export default AppWrapper;
