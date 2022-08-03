import { observer } from "mobx-react-lite";
import TodoStore from "../../stores/TodoStore";
import styles from "./TodoList.module.css";

const TodoList = ({ todos }: { todos: TodoStore }) => {
  const handleToggleTodo = (t: Todo) => () => {
    todos.toggle(t);
  };

  const handleRemoveTodo = (t: Todo) => () => {
    todos.remove(t);
  };

  return (
    <ul className={styles["todo-list"]}>
      {todos.list.map((t) => (
        <li key={t.id}>
          <label htmlFor={String(t.id)} className={[styles.remove, t.isDone && styles.done].join(" ")}>
            {t.title}
          </label>
          <button onClick={handleRemoveTodo(t)} className={[styles.remove, t.isDone && styles.done].join(" ")}>
            remove
          </button>
          <button onClick={handleToggleTodo(t)}>
            <input type="checkbox" id={String(t.id)} readOnly tabIndex={-1} />
          </button>
        </li>
      ))}
    </ul>
  );
};

// Changes won't be reflected / Notes won't be added without using the observer() function 
export default observer(TodoList);
