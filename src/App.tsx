import TodoStore from "./stores/TodoStore";
import TodoInput from "./Todo/TodoInput";
import TodoList from "./Todo/TodoList";

const todos = new TodoStore();

const App = () => {
  return (
    <div className="App">
      {/* Props removed to avoid prop drilling, useStore() hook is used instead */}
      <TodoInput />
      <TodoList />
    </div>
  );
};

export default App;
