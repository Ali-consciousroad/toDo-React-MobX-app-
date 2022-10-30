import TodoInput from "./Todo/TodoInput";
import TodoList from "./Todo/TodoList";
import styles from "./App.module.css";
import { useState } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react-lite";

const App = () => {
  // Functions used to toggle the to do list when clicking on the " + " / " - " button
  // Use MobX instead of set state
  const [appUI] = useState(() => 
      observable({
        todosVisible: true,
        toggleTodoVisibility() {
          this.todosVisible = !this.todosVisible;
        },
      })
    );
  // Change the state of the useState hook based on  click 
  const handleClick = () => appUI.toggleTodoVisibility();

  return (
    <div className="App">
      {/* Props removed to avoid prop drilling, useStore() hook is used instead */}
      <TodoInput />
      <div className={styles["todo-list-wrapper"]}>
        <h2 onClick={handleClick}>
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
