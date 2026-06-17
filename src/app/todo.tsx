import { useEffect, useState } from "react";

type Todo = {
  todoText: string;
  isDone: boolean;
  id: string;
};

type TodoApiItem = {
  todo_id: number;
  todo_text: string;
  is_done: boolean;
};

export default function Todo() {
  const [text, setText] = useState("");

  const [todos, setTodos] = useState<Todo[]>([]);

  //const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("http://localhost:3001/todo");

        const data: TodoApiItem[] = await res.json();

        //console.log("data.....", data);

        setTodos(
          data.map((todo) => ({
            id: String(todo.todo_id),
            todoText: todo.todo_text,
            isDone: todo.is_done,
          })),
        );
      } catch (err) {
        console.log("Failed to fetch todos");
      }
    };

    fetchTodos();
  }, []);

  const handleAdd = async () => {
    if (text.trim() === "") return;
    let todoId = "";
    try {
      let res = await fetch("http://localhost:3001/todo", {
        method: "POST",
        body: JSON.stringify({
          todo_text: text,
          is_done: false,
        }),
      });

      let data = await res.json();
      todoId = data.todo_id;
    } catch (err) {
      console.log("post request failed");
      return;
    }

    setTodos([...todos, { todoText: text, isDone: false, id: todoId }]);

    // setTodos((prev) => [...prev, text]);

    //setText("");

    // inputRef.current?.focus();

    setText("");
  };

  const handleDelete = (indexToDelete: number) => {
    setTodos((prev) => prev.filter((item, index) => index !== indexToDelete));
  };

  return (
    <div className="flex-1 bg-white px-5 pt-10">
      <div className="flex-row items-center">
        <input
          type="text"
          value={text}
          //   onChangeText={setText}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter todo..."
          className="flex-1 border border-gray-400 rounded-lg p-3  mr-3"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-500 px-5 py-3 rounded-lg"
        >
          <h2 className="text-white font-bold">Add</h2>
        </button>
      </div>

      {todos.length === 0 ? (
        <h2 className="text-center text-gray-400 mt-10">No todos yet</h2>
      ) : (
        <div className="flex flex-col">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between flex-row  bg-gray-100 p-4 rounded-lg mb-3 mt-5"
            >
              <div>
                <h3 className="text-lg">{todo.todoText}</h3>
              </div>
              <div>
                {/* <button
                  onClick={() => handleDelete(i)}
                  className="bg-red-500 px-4 py-2 rounded-md"
                >
                  Delete
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

[{ todo: "manas" }];
