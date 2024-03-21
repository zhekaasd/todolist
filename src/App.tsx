import React, { useState } from "react";
import "./App.css";
import Todolist from "./components/Todolist/Todolist";
import { v1 } from "uuid";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

function App() {
  const [filter, setFilter] = useState("all");
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "HTML", isDone: true },
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: false },
  ]);

  // const tasks2: TaskType[] = [
  //   {id: 1, title: 'Milk', isDone: false},
  //   {id: 2, title: 'Beer', isDone: true},
  //   {id: 3, title: 'Butter', isDone: false},
  // ];

  const removeTask = (id: string) => {
    setTasks(tasks.filter((el) => el.id !== id));
  };

  const addTask = (title: string) => {
    setTasks([ { id: v1(), title, isDone: false } , ...tasks ]);
  };

  if (filter === "active") {
    tasks = tasks.filter((el) => !el.isDone);
  }

  if (filter === "completed") {
    tasks = tasks.filter((el) => el.isDone);
  }

  return (
    <div className="App">
      <header style={{height: '5rem', background: 'darkgray', width: '100%'}}>

      </header>
      <div  style={{textAlign: 'center', marginBottom: '64px'}}>
          <h1>To Do List 📝</h1>
          <div style={{position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <input style={{padding: '.5rem 5.5rem .5rem 1rem', borderRadius: '1rem'}} type="text" />
            <button style={{padding: '.5rem 2rem', borderRadius: '1rem', position: 'absolute', left: '56%'}}>add</button>
          </div>
      </div>
      <Todolist
        filtered={setFilter}
        title="What to learn"
        tasks={tasks}
        removeTask={removeTask}
        addTask={addTask}
      />
      {/* <Todolist title='What to buy' tasks={tasks2} /> */}
    </div>
  );
}

export default App;
