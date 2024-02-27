import {
    storeReturnTasks, updateTaskStatus, updateTaskName, deleteTask 
} from "../App";

const tasks = {"lunch":"true", "dinner":"false", "read":"true", "walk":"false"};

beforeEach(
    ()=>{
        for(let key in tasks){
            localStorage.setItem(key, tasks[key]);
        }
    }
)

test("Store data (LocalStorage)", ()=>{
    const defaultSize = Object.keys(tasks).length;

    /* First call : Need to return all tasks in LStorage */
    let newTasks = storeReturnTasks()
    expect(newTasks.length).toBe(defaultSize);
    for(let obj of newTasks){
        expect(tasks.hasOwnProperty(obj.name)).toBe(true);
    }

    /* Call with just one argument : Doesn't create other tasks */
    expect(storeReturnTasks("test").length).toBe(defaultSize);

    /* Given arguments as expected : Must create a new task and return all tasks */
    newTasks = storeReturnTasks("Watch a movie", "false");
    expect(newTasks.length).toBe(defaultSize + 1);
})