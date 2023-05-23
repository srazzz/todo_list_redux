import { useSelector, useDispatch } from "react-redux";

// counter example//////////
// function App() {
//   const counter = useSelector((state) => state.counter);
//   const name = useSelector((state) => state.name);
//   const example_dispatch = useDispatch();

//   const Increment = () => {
//     example_dispatch({ type: "INC" });
//   };

//   const Decrement = () => {
//     example_dispatch({ type: "DEC" });
//   };

//   const Add = () => {
//     example_dispatch({ type: "ADD", payload: 10 });
//   };

//   const showName = () => {
//     example_dispatch({ type: "SHOW" });
//   };

//   const hideName = () => {
//     example_dispatch({ type: "HIDE" });
//   };

//   const Reset = () => {
//     example_dispatch({ type: "RESET" });
//   };

//   return (
//     <div>
//       <h1>Counter : </h1>
//       <h2>{counter}</h2>
//       <button onClick={Increment}>Increment</button>
//       <button onClick={Decrement}>Decrement</button>
//       <button onClick={Add}>Add by 10</button>
//       <button onClick={Reset}>Reset</button>

//       <br />
//       <button onClick={showName}> Show Name</button>
//       <button onClick={hideName}> Hide Name</button>
//       <h2>{name}</h2>
//     </div>
//   );
// }

// export default App;

import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const [task, setTask] = useState("");
  const example_dispatch = useDispatch();
  const taskList = useSelector((state) => state.taskList);
  const completedTasks = useSelector((state) => state.completedTasks);
  const pendingTasks = useSelector((state) => state.pendingTasks);

  const [visibleTasks, setVisibleTasks] = useState([]);

  const handleTask = (event) => {
    setTask(event.target.value);
  };

  useEffect(() => {
    setVisibleTasks(pendingTasks);
  }, [pendingTasks]);

  useEffect(() => {
    setVisibleTasks(taskList);
  }, [taskList]);

  const handleSubmit = () => {
    example_dispatch({ type: "ADD", payload: task });
    setTask("");
    setVisibleTasks([...taskList, task]);
    // setVisibleTasks(taskList);
    //  if we use this the taskList will be updated when submit only so to see the currently added task you have to click submit again
  };

  const listItems = visibleTasks.map((eachTask, index) => (
    <div className="tasks" key={index}>
      <div
        style={{
          textDecoration: completedTasks.includes(eachTask)
            ? "line-through"
            : "none",
        }}
      >
        {index + 1} . {eachTask}
      </div>

      <div className="iconsDiv">
        <img
          onClick={(event) => {
            example_dispatch({
              type: "DELETE_TASK",
              payload: eachTask,
            });
            setVisibleTasks(taskList);
            console.log(taskList, "app.js taskList");
          }}
          className="deleteIcon"
          src="https://cdn-icons-png.flaticon.com/512/3368/3368864.png"
          alt="delete logo"
        />

        <img
          onClick={(event) => {
            example_dispatch({
              type: "DONE_TASK",
              payload: eachTask,
            });
          }}
          className="doneIcon"
          src="https://cdn-icons-png.flaticon.com/512/2644/2644923.png"
          alt="done logo"
        />
      </div>
    </div>
  ));

  return (
    <div className="container">
      <input
        className="inputTask"
        placeholder="Enter the task"
        value={task}
        onChange={handleTask}
      />
      <button className="addTaskButton" onClick={handleSubmit}>
        Add Task
      </button>
      <div className="status">
        <button
          className="statusButton"
          onClick={() => setVisibleTasks(taskList)}
        >
          All tasks
        </button>

        <button
          className="statusButton"
          onClick={() => {
            example_dispatch({
              type: "PENDING_TASK",
            });
            // here even if the pending tasks in store is updated but it is not re rendering when clicked so we have to use useEffect
            setVisibleTasks(pendingTasks);
          }}
        >
          Pending
        </button>

        <button
          className="statusButton"
          onClick={() => setVisibleTasks(completedTasks)}
        >
          Finished
        </button>
      </div>
      <hr
        style={{
          background: "black",
          height: "1px",
          border: "none",
        }}
      />
      {taskList.length !== 0 ? (
        <div className="allTasks">
          <ul>{listItems}</ul>
        </div>
      ) : null}
    </div>
  );
}

export default App;
