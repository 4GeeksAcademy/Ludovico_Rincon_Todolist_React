import React, { useState } from "react";

//create your first component
const TodoList = () => {
    //Component Hooks Declaration
    const [hoverItem, setHoverItem] = useState(false);
    const [actList, setActList] = useState([]);
    const [activity, setActivity] = useState("");


    //Event that is generated when a key is pressed in the newtask input
    const handleOnKeyPress = e => {
        //Check if the key pressed is enter, true add item to task list
        if (e.key === "Enter" && activity !== "") {
            //Defines the newTask that will be added to the array
            const newTask = {
                id: new Date().getTime(),
                description: activity
            };
            //Clones the current tasklist and adds the newTask to it
            setActList([...actList].concat(newTask));
            //Reset the value of task
            setActivity("");
        } else if (e.key === "Enter" && activity == "") {
            alert("Please add a task");
        }
    };

    const createList = () => {
        //Loops through the object and outputs the list elements
        return actList.map(task => (
            <li
                key={task.id}
                className="list-group-item"
                onMouseEnter={() => setHoverItem(task.id)}
                onMouseLeave={() => setHoverItem(null)}>
                <p className="d-inline-block text-secondary ml-4 fs-3 align-middle rounded-0">
                    {task.description}
                </p>
                {task.id == hoverItem ? (
                    <button
                        type="button"
                        className="btn btn-light float-right"
                        onClick={() => deleteTask(task.id)}>
                        <i className="fas fa-times"></i>
                    </button>
                ) : null}
            </li>
        ));
    };

    // Function to delete task when clicking the button
    const deleteTask = id => {
        const updateTaskList = [...actList].filter(task => task.id !== id);
        setActList(updateTaskList);
    };

    //Generate the component
    return (
        <div className="container">
            <h1 className="text-muted text-center 3"><strong>Todos</strong></h1>
            <input
                type="text"
                placeholder="Type a new task"
                className="form-control text-secondary rounded-0"
                value={activity}
                onChange={e => setActivity(e.target.value)}
                onKeyDown={e => handleOnKeyPress(e)}
            />

            <ul className="list-group">
                {createList()}
                <div>

                    <p className="text-secondary ml-5 mt-2 backP">
                        {actList.length === 0
                            ? "No tasks, add a task"
                            : actList.length + " item left"}
                    </p>

                </div>
            </ul>
        </div>
    );
}

export default TodoList