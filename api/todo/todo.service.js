const todos = [
  { title: "todo 1", body: "this is todo 1" },
  { title: "todo 2", body: "this is todo 2" },
];

class TodoService {
  getAllTodos() {
    return todos;
  }
}

module.exports = TodoService;
