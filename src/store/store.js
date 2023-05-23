// import { configureStore } from "@reduxjs/toolkit";

// const reducerFunction = (state = { counter: 0, name: "" }, action) => {

//   //should be synchrounous function
//   //should not mutate the original state

//   switch (action.type) {
//     case "INC":
//       return { ...state, counter: state.counter + 1 };
//     case "DEC":
//       return { ...state, counter: state.counter - 1 };
//     case "ADD":
//       return { ...state, counter: state.counter + action.payload };
//     case "SHOW":
//       return { ...state, name: "Sraz" };
//     case "HIDE":
//       return { ...state, name: "" };
//     case "RESET":
//       return { ...state, counter: 0 };
//     default:
//       return state;
//   }
// };

import { configureStore } from "@reduxjs/toolkit";

const reducerFunction = (
  state = { completedTasks: [], taskList: [], pendingTasks: [] },
  action
) => {
  switch (action.type) {
    case "ADD":
      return { ...state, taskList: [...state.taskList, action.payload] };

    case "DELETE_TASK":
      const updatedTaskList = state.taskList.filter(
        //simplified version for finding and deleting the selected element
        (item) => item !== action.payload
      );
      console.log(updatedTaskList, "store");
      return { ...state, taskList: updatedTaskList };

    case "DONE_TASK":
      // to check if the task completed already present
      if (!state.completedTasks.includes(action.payload)) {
        return {
          ...state,
          completedTasks: [...state.completedTasks, action.payload],
        };
      } else {
        return state;
      }

    case "PENDING_TASK":
      const res = state.taskList.filter(
        (item) => !state.completedTasks.includes(item)
      );
      return {
        ...state,
        pendingTasks: res,
      };
    default:
      return state;
  }
};

const store = configureStore({ reducer: reducerFunction });

export default store;
