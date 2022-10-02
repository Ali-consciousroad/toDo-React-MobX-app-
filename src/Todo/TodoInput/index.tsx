import { FormEvent } from "react";
import { useStore } from "../../stores";
// Scope our css file module import so it doesn't interfere with other css classes from other files 
import styles from "./TodoInput.module.css";

const TodoInput = () => {
  const { todos } = useStore();
  // Add an event to the handler function to prevent the default behavior of html element and reload the browser 
  const handleSubmit = (e : FormEvent) => {
    e.preventDefault(); 
    
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const value = String(formData.get("todo-input") || "");

    todos.add(value);
    formElement.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={styles["todo-input-group"]}>
      {/* Instead of changing the state like each keystroke did earlier causing a rerendring of the component each time, we handle  everything 
      through the handleSubmit handler */}
      <input name="todo-input" placeholder="Add todo ..." />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoInput;
