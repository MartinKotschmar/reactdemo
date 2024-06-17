import React, { useState } from "react";
import * as styles from "./Checkbox.module.css";

interface TodoElementProps {
  isChecked: boolean;
}

const Checkbox: React.FC<TodoElementProps> = ({ isChecked }) => {
  const [checkedState, setCheckedState] = useState(isChecked);

  const clickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckedState(!checkedState);
  };

  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        className={styles.input}
        defaultChecked={checkedState}
        onClick={clickHandler}
      />
    </div>
  );
};

export default Checkbox;
