import React, {useState, useRef, useEffect} from "react";
import { checkIput, ErrorContainer, errorsObj } from "./Form";

function usePrevious(value) {
    /* To keep track of the previous value */
    const ref = useRef(false);
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

function Todo(props){ 
    // state : isEditing => true? (show the editTemplate) or false(show the viewTemplate)
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState("");
    const [error, setError] = useState("");
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);
    const wasEditing = usePrevious(isEditing);

    useEffect(() => {
        if (!wasEditing && isEditing) {
          editFieldRef.current.focus();
        }else if(wasEditing && !isEditing){
            editButtonRef.current.focus();
        }
        
    }, [isEditing, wasEditing]);
    
    function handleSubmit(e){
        /* Handle edit view form submit  */
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
        /* Delete a task */
        let result = window.confirm(`Do you really want to delete the task "${props.name}"?`);
        if(result){
            props.delTask(props.id);
        };        
    };

    const editingTemplate = (
        /* Template to edit a task */
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
                    ref={editFieldRef}
                />
                {error?<ErrorContainer text={errorsObj[error]} />:null} {/* Show an error message */}
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
        /* Show a task */
        <li 
            className="todo">
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
                        ref={editButtonRef}
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
        isEditing ? editingTemplate : viewTemplate
    ); 
}

export default Todo;

