import React, {useState} from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";


function App() {
  const [tasks, setTask] = useState([]);
  const [filter, setTaskFilter] = useState("All");

  const trackTaskStatus = (taskId) => {
    let updateTask = tasks.map((task)=>{
      if(task.id === taskId){
        task.completed = !task.completed;
        return task;
      };
      return task;
    });
    setTask(updateTask);
  };
  
  function addTask(name){
    let taskId = `todo-${name}`;
    let taskObj = {name:name, completed:false, id:taskId};
    let totalTasks = [taskObj , ...tasks];
    setTask(totalTasks);
  };

  function editTask(newName, taskId){
    let updateTasks = tasks.map((task)=>{
      if(taskId === task.id){
        task.name = newName;
        return task;
      };
      return task;
    });
    setTask(updateTasks);
  }

  function delTask(taskId){
    let updateTasks = tasks.filter(task => task.id !== taskId);
    setTask(updateTasks);
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
      <h1>SimpleTodoApp</h1>
      <Form 
        addTask={addTask}
        tasks={tasks}
      />
      <div className="filters btn-group stack-exception">
        {filterButtons}
      </div>
      <h2 id="list-heading">{taskHeading}</h2>
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