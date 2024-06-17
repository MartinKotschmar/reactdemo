import React from "react";
import { TodoListElementType } from "../../types/TodoListElements";
import Checkbox from "../Checkbox/Checkbox";
import * as styles from "./TodoElement.module.css";
import { Link } from "react-router-dom";

interface TodoElementProps {
  todoElement: TodoListElementType;
}

const TodoElement: React.FC<TodoElementProps> = ({ todoElement }) => {
  return (
    <div className={styles.container}>
      <div>
        <Link to={`/todos/${todoElement.id}`} className={styles.item}>
          <p>{todoElement.title}</p>
          <Checkbox id={todoElement.id} isChecked={todoElement.completed} />
        </Link>
      </div>
    </div>
  );
};

export default TodoElement;
