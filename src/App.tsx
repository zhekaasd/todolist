import React, { useState } from "react";
import "./App.css";
import Todolist from "./components/Todolist/Todolist";
import { v1 } from "uuid";
import Todo from "./components/Todolist/Todo";
import Todolist__2 from "./components/Todolist/TodolistRestyle/TodolistRestyle";
import TodolistRestyle from "./components/Todolist/TodolistRestyle/TodolistRestyle";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
};

const randomColor = () => {
  const arr = ['red', 'blue', 'yellow', 'orange', 'purple', 'tomato', 'pink', 'green', 'azure', 'aqua', 'gold'];
  return arr[Math.floor(Math.random() * 5)];
}

function App() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>("all");
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

  const cleanTodolist = () => {
    setTasks([]);
  }

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
      <div className="todoApp"  style={{textAlign: 'center', marginBottom: '64px'}}>
          <h1 >To Do List 📝</h1>
          <div style={{position: 'relative', display: 'inline-block', margin: '0 auto'}}>
            <input placeholder="Add new todo.." style={{padding: '.5rem 5.5rem .5rem 1rem', borderRadius: '1rem', border: '1px solid #a5a5a5'}} type="text" />
            <button style={{padding: '.5rem 2rem', borderRadius: '1rem', border: '1px solid #df5d50', position: 'absolute', right: '-1rem', background: '#df5d50', color: 'white', textTransform: 'capitalize', fontWeight: '600'}}>add</button>
          </div>
      </div>

      <div className="todoApp"  style={{textAlign: 'center', marginBottom: '64px'}}>
          <h1 >To Do List 📝</h1>
          <div style={{position: 'relative', display: 'inline-block', margin: '0 auto'}}>

            <input placeholder="Add new todo.." 
                  style={{
                    padding: '.5rem 5.5rem .5rem 1rem', 
                    marginRight: '1rem',
                    border: '1px solid rgb(40, 54, 67)'
                    }} type="text" />

            <button style={{
              padding: '.5rem 2rem', 
              border: '1px solid rgb(40, 54, 67)', 
              borderRadius: '.25rem',
              background: 'rgb(40, 54, 67)', 
              color: 'white', 
              textTransform: 'capitalize', 
              fontWeight: '600'}}>add</button>
          </div>
      </div>

{/* 
      <TodolistRestyle
        filtered={setFilter}
        filter={filter}
        title="What to learn"
        tasks={tasks}
        removeTask={removeTask}
        addTask={addTask}
        cleanTodolist={cleanTodolist}
      />
       */}
       
      <Todo
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
