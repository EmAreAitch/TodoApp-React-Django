import React, { useContext, useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import axios from 'axios'
import { TodoContext } from "../App";

function TaskList({ isCompleted = false}) {
    const CLASS = `todo-title mr-2 ${(isCompleted || '') && 'completed-todo'}`.trimEnd()
    const {deleteTask, setModalState, tasks} = useContext(TodoContext)
    const editTask = (item) => {
        setModalState({
            modalHeader: "Edit task",
            item: item,
            isOpen: true
        })
    }
    return <ul className="list-group list-group-flush border-top-0">
        {tasks.filter((item) => item.completed == isCompleted).map((item) => (
            <li
                key={item.id}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center gap-2"
            >
                <span
                    className={CLASS + ' flex-grow-1'}
                    title={item.description}
                >
                    {item.title}
                </span>
                <button
                    className="btn btn-secondary mr-2"
                    onClick={() => editTask(item)}
                >
                    Edit
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => deleteTask(item)}
                >
                    Delete
                </button>
            </li>
        ))}
    </ul>

}

export default function TodoApp() {
    const [completed, setCompleted] = useState(false);
    return <div>
        <Nav tabs>
            <NavItem>
                <NavLink
                    className={'nav-link' + ((completed || '') && " active")}
                    onClick={() => { setCompleted(true) }}
                >
                    Complete
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    className={'nav-link' + ((!completed || '') && " active")}
                    onClick={() => { setCompleted(false) }}
                >
                    Incomplete
                </NavLink>
            </NavItem>
        </Nav>
        <TabContent activeTab='1'>
            <TabPane tabId='1'>
                <TaskList isCompleted={completed}/>
            </TabPane>
        </TabContent>
    </div>
}