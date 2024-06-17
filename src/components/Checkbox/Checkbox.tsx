import React from "react";
import * as styles from "./Checkbox.module.css";
import useToDos from "../../hooks/useToDos";

interface TodoElementProps {
  id: number;
  isChecked: boolean;
}

const Checkbox: React.FC<TodoElementProps> = ({ id, isChecked }) => {
  const { toggleTodo }: { toggleTodo: (id: number) => void } = useToDos(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    undefined,
  );

  const clickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTodo(id);
  };

  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        className={styles.input}
        defaultChecked={isChecked}
        onClick={clickHandler}
      />
    </div>
  );
};

export default Checkbox;
