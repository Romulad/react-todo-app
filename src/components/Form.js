import React, {useState} from "react";

export const errorsObj = {
    "Invalid name" : "Enter a valid task name",
    "Same name" : "Task with this name already exist"
};

export const checkSameTask = (name, tasks) => {
    let matchedTask = tasks?.filter(task => task.name.toLowerCase() == name.toLowerCase());
    return matchedTask.length > 0;

};

export const checkIput = (name, tasks) =>{
    let errorNames = Object.keys(errorsObj);
    if(name.length <= 1){
        return [false, errorNames[0]];
    }else if(checkSameTask(name, tasks)){
        return [false, errorNames[1]];
    }else{
        return [true, ''];
    };
};

export function ErrorContainer(props) {
    return (
        <p className="text-danger mt-0">
            {props.text}
        </p>
    );
};


function Form(props){
    const [name, setName] = useState('');
    const [error, setError] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        let inputIsValid = checkIput(name, props.tasks);
        if(!inputIsValid[0]){
            setError(inputIsValid[1]);
            return;
        }else{
            setError("");
        }
        props.addTask(name);
        setName('');
    };

    return(
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
            <label htmlFor="new-todo-input" className="label__lg">
                What needs to be done?
            </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                placeholder="Add a new task"
                onChange={(e) => {setName(e.target.value)}}
            />
            {error?<ErrorContainer text={errorsObj[error]} />:null}
            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    )
};

export default Form;