export interface addTodoType {
  title: string;
}

export interface deleteTodoType {
  id: string;
}

export interface updateTodoType {
  id: string;
  completed: string;
  title: string;
}
