import { checkSameTask, checkIput, errorsObj } from "../components/Form";
import { returnTaskId } from '../App'



test("Test if task name already exists", ()=>{
    let tasks = [{name:"lunch"}, {name:"dinner"}, {name:"read"}];

    /* Must return true, mean that task with this name already exists*/
    expect(checkSameTask("lunch", tasks)).toBe(true);
    /* Must return false */
    expect(checkSameTask("walk", tasks)).toBe(false);
});

test("Test user input validation", ()=>{
    let errorKeys = Object.keys(errorsObj);
    let tasks = [{name:"lunch"}, {name:"dinner"}, {name:"read"}];

    /* Check name length */ 
    let resp = checkIput('t', tasks);
    expect(resp[0]).toBe(false);
    expect(resp[1]).toBe(errorKeys[0]);

    /* Check if name already exists */
    resp = checkIput("lunch", tasks);
    expect(resp[0]).toBe(false);
    expect(resp[1]).toBe(errorKeys[1]);

    /*  */ 
    resp = checkIput("walk", tasks);
    expect(resp[0]).toBe(true);
    expect(resp[1]).toBe("");  
});

test("Task id", ()=>{
    expect(returnTaskId("lunch")).toBe('todo-lunch');
});