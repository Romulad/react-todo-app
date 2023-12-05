import React, {useState, useEffect, useRef} from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";


const returnTaskId = (taskName) =>{
  return `todo-${taskName}`;
}

const storeReturnTasks = (taskName="", status="") =>{
  if(taskName && status)
    localStorage.setItem(taskName, status);

  let todo = [];
  for (let i = 0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    let value = localStorage.getItem(key) === "false" ? false : true;
    todo.push({name:key, completed:value, id:returnTaskId(key)});
  };

  return todo;
}

const updateTaskStatus = (taskId) =>{
  let taskName = taskId.split("-")[1];
  let taskStatus = localStorage.getItem(taskName) === "false" ? "true" : "false";
  localStorage.setItem(taskName, taskStatus);
}

const updateTaskName = (newName, taskId) =>{
  let taskName = taskId.split("-")[1];
  let taskStatus = localStorage.getItem(taskName);
  localStorage.setItem(newName, taskStatus);
  localStorage.removeItem(taskName);
}

const deleteTask = (taskId) =>{
  let taskName = taskId.split("-")[1];
  localStorage.removeItem(taskName);
}


function App() {
  const [tasks, setTask] = useState([]);
  const [filter, setTaskFilter] = useState("All");
  const headingRef = useRef(null);

  useEffect(()=>{
    setTask(storeReturnTasks()); 
  }, []) // After first render

  const trackTaskStatus = (taskId) => {
    /* Update task status */
    let updateTask = tasks.map((task)=>{
      if(task.id === taskId){
        task.completed = !task.completed;
        return task;
      };
      return task;
    });
    updateTaskStatus(taskId); // User window.localStorage
    setTask(updateTask); // React state
  };
  
  function addTask(name){
    /* Add new task */
    let taskId = returnTaskId(name);
    let taskObj = {name:name, completed:false, id:taskId};
    let totalTasks = [...tasks, taskObj];
    storeReturnTasks(name, "false"); // Save in the window.localStorage
    setTask(totalTasks); // React state
  };

  function editTask(newName, taskId){
    /* Change task name */
    let updateTasks = tasks.map((task)=>{
      if(taskId === task.id){
        task.name = newName;
        task.id = returnTaskId(newName);
        return task;
      };
      return task;
    });
    updateTaskName(newName, taskId) // window.localStorage
    setTask(updateTasks); // State
  }

  function delTask(taskId){
    /* Deleate a task */
    let updateTasks = tasks.filter(task => task.id !== taskId);
    deleteTask(taskId); // window.localStorage
    setTask(updateTasks); // State
    headingRef.current.focus(); // Focus on the heading
  };

  const filterState = {
    All : () => (true),
    Active : (task)=> (!task.completed),
    Completed : (task) => (task.completed),
  };

  const filterButtons = Object.keys(filterState).map((filterName)=>
     (
        <FilterButton 
          name={filterName} 
          key={filterName} 
          activeTasks={setTaskFilter}
          isActive={filter === filterName ? "true" : "false"}
        />
      )
  );
  
  /* Filter all tasks by the current filter tag before render */
  const filterTasks = tasks.filter(filterState[filter])
  const tasksList = filterTasks
  .map((task) => (
    <Todo 
      name={task.name} 
      completed={task.completed} 
      id={task.id} 
      key={task.id}
      trackTaskStatus={trackTaskStatus}
      delTask={delTask}
      tasks={tasks}
      editTask={editTask}
    />
  ));

  const about = filter === 'All' ? 'Task' : `${filter} Task`;
  const taskHeading = (
    filterTasks.length <= 1? `${filterTasks.length} ${about}` : 
    `${filterTasks.length} ${about}s`
  );

  return (
    <div className="todoapp stack-large">
      <Form 
        addTask={addTask}
        tasks={tasks}
        setTask={setTask}
      />
      <div className="filters btn-group stack-exception">
        {filterButtons}
      </div>
      <h2 
        id="list-heading"
        tabIndex="-1"
        ref={headingRef}>
        {taskHeading}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {tasksList}
      </ul>
    </div>
  );
}

export default App;