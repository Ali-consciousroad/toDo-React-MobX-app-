// Create our TodoStore
// Refactored TodoStore using factory function instead of classes
// This function can be used to make an object's properties observable
import { makeAutoObservable } from "mobx";

// Define the structure of a Todo item using an interface
export interface Todo {
  id: number;
  title: string;
  isDone: boolean;
}

// Define `TodoStore` as a function that creates an observable object
// This object will hold our todos and methods for managing todos
const TodoStore = () => makeAutoObservable({
  list: [] as Todo[],
  add(title: string) {
    if (title.length < 2) {
      return;
    }
    this.list.push({
      id: Date.now(),
      title,
      isDone: false,
    });
  },
  toggle(todo: Todo) {
    todo.isDone = !todo.isDone;
  },
  remove(todo: Todo) {
    this.list = this.list.filter((t) => t.id !== todo.id);
  },
  get unfinishedTodos() {
    return this.list.filter((t: Todo) => !t.isDone);
  },
});

export default TodoStore;
