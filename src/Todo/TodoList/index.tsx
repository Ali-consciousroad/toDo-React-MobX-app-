// List component displaying our Todo app
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores";
import { Todo } from "../../stores/TodoStore";
import styles from "./TodoList.module.css";

const TodoList = () => {
  const { todos } = useStore();
  // Handle the click event
  // First parameter t is our Todo 
  const handleToggleTodo = (t: Todo) => () => {
    todos.toggle(t);
  };

  // Same idea for the remove handler 
  const handleRemoveTodo = (t: Todo) => () => {
    todos.remove(t);
  };

  // Display the tasks by mapping over all the ids inside our list
  return (
    <ul className={styles["todo-list"]}>
      {todos.list.map((t) => (
        <li key={t.id}>
          {/* htmlFor attribute is used to connect the label to our input element and we need to convert the id to a string
          because htmlFor require a string value */}
          {/* Add an arry of class depending of the status of our to do list */}
          {/* Multiple class are added so JS .join(" ") funtion need to be used also */}
          <label htmlFor={String(t.id)} className={[styles.remove, t.isDone && styles.done].join(" ")}>
            {t.title}
          </label>
          
          <button onClick={handleRemoveTodo(t)} className={[styles.remove, t.isDone && styles.done].join(" ")}>
            remove
          </button>
          <button onClick={handleToggleTodo(t)}>
            {/* Use the readOnly property cause we don't need that event */}
            <input type="checkbox" id={String(t.id)} readOnly tabIndex={-1} />
          </button>
        </li>
      ))}
    </ul>
  );
};

// Changes won't be reflected / Notes won't be added without using the observer() function
// Thanks to the observer function, our TodoList component will be informed about any change on our to do app. 
export default observer(TodoList);
