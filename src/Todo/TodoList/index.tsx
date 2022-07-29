import { observer } from "mobx-react-lite";
import TodoStore from "../../stores/TodoStore";

const TodoList = ({ todos }: { todos: TodoStore }) => {
  return (
    <ul>
      {todos.list.map((t) => (
        <li key={t.id}>{t.title}</li>
      ))}
    </ul>
  );
};

// Changes won't be reflected / Notes won't be added without using the observer() function 
export default observer(TodoList);
