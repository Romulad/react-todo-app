import React, {useState} from "react";

export const errorsObj = {
    "Invalid name" : "Enter a valid task name",
    "Same name" : "Task with this name already exist"
};

export const checkSameTask = (name, tasks) => {
    let matchedTask = tasks?.filter(task => task.name.toLowerCase() === name.toLowerCase());
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
        <p className="text-danger" style={{marginTop : 10}}>
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

    function handleDclick(e){
        e.preventDefault();
        props.setTask([]);
        localStorage.clear();
    };

    let deleDisabled = (
        <button 
            disabled
            className="btn btn__danger"
            style={{cursor : "not-allowed"}}>
            Delete all tasks
        </button> 
    );

    let deleteBtn = (
        <button 
            onClick={handleDclick}
            className="btn btn__danger">
            Delete all tasks
        </button> 
    );

    return(
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
            <label 
                htmlFor="new-todo-input" 
                className="label__lg" 
                style={{
                    marginBottom : 20,
                    fontSize : 20
                }}>
                What needs to be done today?
            </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                onChange={(e) => {setName(e.target.value)}}
                style={{borderRadius:"0.25rem"}}
            />
            {/* Show form validation error */}
            {error ? <ErrorContainer text={errorsObj[error]} /> : null} 
            <div className="btn-group">
                <button 
                    type="submit" 
                    className="btn btn__primary">
                    New task
                </button>
                {props.tasks.length <= 0 ? deleDisabled : deleteBtn}
            </div>
        </form>
    )
};

export default Form;