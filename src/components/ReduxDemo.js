import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

// actions
import { addTodo } from "../store/demoSlice";

const ReduxDemo = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch an action
    dispatch(addTodo("New todo"));
  }, []);

  console.log("todos: ", todos);

  return (
    <div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span>{todo.text}</span>
          </li>
        ))}
      </ul>
      <p>Env check - {process.env.REACT_APP_MY_VAR}</p>
    </div>
  );
};

export default ReduxDemo;
