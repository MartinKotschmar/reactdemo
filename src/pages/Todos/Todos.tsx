import React, { useRef, useState } from "react";
import * as styles from "./TodoPage.module.css";
import { MutatingDots } from "react-loader-spinner";
import { TodoListElementType } from "../../types/TodoListElements";
import TodoElement from "../../components/TodoElement/TodoElement";
import useToDos from "../../hooks/useToDos";

const TodoPage: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filterInput, setFilterInput] = useState<string>("");
  //url to get all todos at once
  const url = "https://jsonplaceholder.typicode.com/todos";

  const {
    todos,
    isLoading,
    isError,
  }: { todos: TodoListElementType[]; isLoading: boolean; isError: boolean } =
    useToDos(url, filterInput);

  const onChangeHandler = () => {
    if (inputRef.current) {
      setFilterInput(inputRef.current.value);
    }
  };

  return (
    <div>
      <h2>ToDo-Page</h2>
      <div>
        <input
          type="text"
          onInput={onChangeHandler}
          ref={inputRef}
          placeholder={"Filter nach Titel"}
        />
      </div>
      <div className={styles.todoList}>
        {todos && todos.length > 0 ? (
          todos.map((listElement: TodoListElementType, index) => (
            <TodoElement todoElement={listElement} key={index} />
          ))
        ) : isLoading ? (
          <div className={styles.loading}>
            <MutatingDots
              visible={true}
              height="100"
              width="100"
              color="#4fa94d"
              secondaryColor="#4fa94d"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : isError ? (
          <span>Error</span>
        ) : null}
      </div>
    </div>
  );
};

export default TodoPage;
