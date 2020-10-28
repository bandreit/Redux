import React, { useState } from "react";
import { createStore, combineReducers } from "redux";
import { Provider, useSelector, useDispatch, useActions } from "react-redux";
import uuid from "uuid/v4";
import "./App.css";

function todosReducer(state = { todos: [] }, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: []
      };

    default:
      return state;
  }
}

function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT_COUNT":
      return {
        ...state,
        count: state.count + 1
      };
    case "DECREMENT_COUNT":
      return {
        ...state,
        count: state.count - 1
      };

    default:
      return state;
  }
}

function nameReducer(state = { name: "" }, action) {
  switch (action.type) {
    case "UPDATE_NAME":
      return {
        ...state,
        name: action.payload
      };
    default:
      return state;
  }
}

function squareReducer(state = { backgroundColor: "red" }, action) {
  switch (action.type) {
    case "CHANGE_COLOR":
      let color =
        "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
      return {
        ...state,
        backgroundColor: color
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  counterReducer,
  nameReducer,
  squareReducer,
  todosReducer
});

const INITIAL_STATE = {};

// pass middleware as 3rd argument
const store = createStore(rootReducer, INITIAL_STATE);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Counter />
        <Name />
        <Square />
        <ToDos />
      </div>
    </Provider>
  );
}

function ToDos() {
  const { todos } = useSelector(state => ({
    ...state.todosReducer
  }));

  const [todo, setTodo] = useState("");
  const addTodo = useActions(todo => addToDoAction(todo));

  const onChange = event => {
    setTodo(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefaul();
    if (todo.trim === "") return;

    addTodo({
      id: uuid(),
      name: todo,
      complete: false
    });
  };

  const dispatch = useDispatch();

  function addToDoAction() {
    dispatch({ type: "ADD_TODO", payload: "" });
  }

  return (
    <div>
      {todos.map(todo => (
        <p>todo</p>
      ))}

      <form>
        <input
          name="todo"
          placeholder="Add a todo"
          value={todo}
          onChange={onChange}
        />
        <br />
        <button type="submit" onClick={addToDo}>
          Add ToDo
        </button>
      </form>
    </div>
  );
}

function Square() {
  const { backgroundColor } = useSelector(state => ({
    ...state.squareReducer
  }));
  const dispatch = useDispatch();

  function changeColor() {
    dispatch({
      type: "CHANGE_COLOR"
    });
  }

  return (
    <div
      style={{
        height: "100px",
        width: "100px",
        margin: "20px auto",
        backgroundColor: backgroundColor
      }}
      onClick={changeColor}
    ></div>
  );
}

function Counter() {
  const { count, name } = useSelector(state => ({
    ...state.counterReducer,
    ...state.nameReducer
  }));
  const dispatch = useDispatch();

  function incrementCount() {
    dispatch({
      type: "INCREMENT_COUNT"
    });
  }

  function decrementCount() {
    dispatch({
      type: "DECREMENT_COUNT"
    });
  }
  return (
    <>
      <h1>Counter: {count}</h1>
      <button onClick={incrementCount}>+</button>
      <button onClick={decrementCount}>-</button>
      <div>
        <h3>Your name is: {name}</h3>
      </div>
    </>
  );
}

function Name() {
  const dispatch = useDispatch();
  function handleUpdateName(event) {
    dispatch({
      type: "UPDATE_NAME",
      payload: event.target.value
    });
  }

  return (
    <div>
      <input
        placeholder="Input yout name here"
        onChange={handleUpdateName}
      ></input>
    </div>
  );
}

export default App;
