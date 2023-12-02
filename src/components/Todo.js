import React, {useState} from "react";
import { checkIput, ErrorContainer, errorsObj } from "./Form";

function Todo(props){
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        let inputIsValid = checkIput(newName, props.tasks);
        if(!inputIsValid[0]){
            setError(inputIsValid[1]);
            return;
        }else{
            setError("");
        };
        props.editTask(newName, props.id);
        setNewName('');
        setEditing(false);
    };

    function handleDelete(){
        let result = window.confirm(`Do you really want to delete the task "${props.name}"?`);
        if(result){
            props.delTask(props.id);
        };        
    };

    const editingTemplate = (
        <li className="todo">
            <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                New name for {props.name} :
                </label>
                <input 
                    id={props.id} 
                    className="todo-text" 
                    type="text" 
                    placeholder={`${props.name}`}
                    value={newName}
                    onChange={(e)=>{setNewName(e.target.value)}}
                />
                {error?<ErrorContainer text={errorsObj[error]} />:null}
            </div>
            <div className="btn-group">
                <button 
                type="button" 
                className="btn todo-cancel"
                onClick={()=>setEditing(false)}>
                    Cancel
                    <span className="visually-hidden">renaming {props.name}</span>
                </button>

                <button 
                type="submit" 
                className="btn btn__primary todo-edit">
                    Save
                    <span className="visually-hidden">new name for {props.name}</span>
                </button>
            </div>
            </form>
        </li>
      );

      const viewTemplate = (
        <li className="todo">
            <div className="stack-small">
                <div className="c-cb">
                    <input
                    id={props.id}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.trackTaskStatus(props.id)}
                    />
                    <label className="todo-label" htmlFor={props.id}>
                    {props.name}
                    </label>
                </div>
                <div className="btn-group">

                    <button 
                        type="button" 
                        className="btn"
                        onClick={()=>{setEditing(true)}}
                    >
                    Edit <span className="visually-hidden">{props.name}</span>
                    </button>

                    <button
                    type="button"
                    className="btn btn__danger"
                    onClick={handleDelete}>
                    Delete <span className="visually-hidden">{props.name}</span>
                    </button>
                </div>
            </div>
        </li>
      );

    return (
        isEditing?editingTemplate:viewTemplate
    );
}

export default Todo;

