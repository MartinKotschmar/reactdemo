import { useEffect, useState } from "react";
import { fetchList } from "../api/fetchList";
import { TodoListElementType } from "../types/TodoListElements";

const useToDos = (url: string, filterInput?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fetchData, setFetchData] = useState<TodoListElementType[]>([]);
  const [todos, setTodos] = useState<TodoListElementType[]>([]);

  //set todo list initially if not saved in local storage
  //list of current and possibly checked/unchecked todos as string inside local storage with key "todos"
  //fetch is only triggered once the page is loaded and local storage is empty
  useEffect(() => {
    const savedList = localStorage.getItem("todos");
    if (!savedList) {
      setIsLoading(true);
      fetchList(url)
        .then((data) => {
          setFetchData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsError(true);
          setIsLoading(false);
          console.error(error);
        });
    } else {
      setFetchData(JSON.parse(savedList));
      setIsLoading(false);
    }
  }, []);

  //set current list with changes for checked status
  useEffect(() => {
    const setNewList = async () => {
      await localStorage.setItem("todos", JSON.stringify(fetchData));
    };
    setTodos(fetchData);
    fetchData.length > 0 && setNewList();
  }, [fetchData]);

  useEffect(() => {
    if (filterInput === "") {
      setTodos(fetchData);
    } else if (filterInput && fetchData) {
      setTodos(
        fetchData.filter((listElement: TodoListElementType) =>
          listElement.title.toLowerCase().includes(filterInput.toLowerCase()),
        ),
      );
    }
  }, [filterInput]);

  //update list with new checked status
  const toggleTodo = (id: number) => {
    const list = localStorage.getItem("todos") ?? "[]";
    setFetchData(
      JSON.parse(list).map((todo: TodoListElementType) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return {
    todos: todos,
    toggleTodo: toggleTodo,
    isLoading: isLoading,
    isError: isError,
  };
};

export default useToDos;
