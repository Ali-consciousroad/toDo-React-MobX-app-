import { ChangeEvent, FormEvent, useState } from "react";
import TodoStore from "../../stores/TodoStore";
import styles from "./TodoInput.module.css";

const TodoInput = ({ todos }: { todos: TodoStore }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  // Performance issue with the current implementation will be addressed later. 
  const handleSubmit = (e : FormEvent) => {
    e.preventDefault();
    todos.add(newTodo);
    setNewTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles["todo-input-group"]}>
      <input value={newTodo} onChange={handleInputChange} />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoInput;
