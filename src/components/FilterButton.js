import React from "react";

export function FilterButton(props){
    return(
        <button 
          type="button" 
          className="btn toggle-btn" 
          aria-pressed={props.isActive}
          onClick={()=>{props.activeTasks(props.name)}}>
          <span className="visually-hidden">Show </span>
          <span>{props.name}</span>
          <span className="visually-hidden"> tasks</span>
        </button>
    );
};

export default FilterButton;