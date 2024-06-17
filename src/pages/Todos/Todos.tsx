import React, { useEffect, useMemo, useRef, useState } from "react";
import * as styles from "./TodoPage.module.css";
import { fetchList } from "../../api/fetchList";
import { MutatingDots } from "react-loader-spinner";
import { TodoListElementType } from "../../types/TodoListElements";
import TodoElement from "../../components/TodoElement/TodoElement";

const TodoPage: React.FC = () => {
  const [fetchData, setFetchData] = useState([]);
  const [listContent, setListContent] = useState([]);
  const [filterInput, setFilterInput] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
        const savedList = localStorage.getItem('todos')
        if (!savedList) {
            setIsLoading(true)
          fetchList("https://jsonplaceholder.typicode.com/todos")
            .then((data) => {
              setFetchData(data);
              setListContent(data);
                setIsLoading(false);
              localStorage.setItem('todos', JSON.stringify(data));
            })
            .catch((error) => {
              setIsError(true);
                setIsLoading(false);
              console.error(error);
            });
        } else {
          setListContent(JSON.parse(savedList));
          setFetchData(JSON.parse(savedList));
            setIsLoading(false);
        }
  }, []);

  const onChangeHandler = () => {
    if (inputRef.current) {
      setFilterInput(inputRef.current.value);
    }
  };

  useEffect(() => {
    if (filterInput && listContent && fetchData) {
      setListContent(
        fetchData.filter((listElement: TodoListElementType) =>
          listElement.title.toLowerCase().includes(filterInput.toLowerCase()),
        ),
      );
    }
  }, [filterInput]);

  return (
    <div>
      <h2>TodoPage</h2>
      <div>
        <input
          type="text"
          onChange={onChangeHandler}
          ref={inputRef}
          placeholder={"Filter nach Titel"}
        />
      </div>
      <div className={styles.todoList}>
        {listContent && listContent.length > 0 ? (
          listContent.map((listElement: TodoListElementType, index) => (
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
