import React, { useEffect, useState, createContext } from "react";
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardTitle, CardText, Button } from "reactstrap";
import TaskModal from "./components/Modal";
import TodoApp from "./components/TodoApp";
import axios from "axios";

export const TodoContext = createContext()

function App() {
  const [modalState, setModalState] = useState(
    {
      modalHeader: 'Add Task',
      item: {title: '', description: '', completed: false},
      isOpen: false,
    }
  )
  const [tasks,setTasks] = useState([])

  const save = (item) => {
    toggle()
    if (item.id) {
      axios
        .put(`http://127.0.0.1:8000/api/todos/${item.id}/`, item)
        .then((res) => refreshList());
      return;
    }
    axios
      .post("http://127.0.0.1:8000/api/todos/", item)
      .then((res) => refreshList());
  }

  const refreshList = () => {
    axios
      .get("http://127.0.0.1:8000/api/todos/")
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  }

  const toggle = () => {
    setModalState({...modalState, isOpen: false})
  }
  const addTask = () => {
    setModalState({...modalState, item: {title: '', description: '', completed: false}, isOpen: true})
  }

  const deleteTask = (item) => {
    axios
      .delete(`http://127.0.0.1:8000/api/todos/${item.id}/`)
      .then(res => refreshList());
  }

  useEffect(()=>{
    refreshList();
  }, [])

  return <Container fluid className="h-100 bg-light">
    <Row className="align-items-start justify-content-center h-100 pt-5">
      <Col xs='6' className="border bg-white p-5">
        <Container className="d-flex align-items-center justify-content-between">
          <h1>To-Do App</h1>
          <Button color="success" onClick={addTask}>Add Task</Button>
        </Container>        
        <TodoContext.Provider value={{deleteTask: deleteTask, setModalState: setModalState, tasks: tasks}}>
          <TodoApp />
        </TodoContext.Provider>
      </Col>
    </Row>
    {modalState['isOpen'] && <TaskModal {...modalState} onSave={save} toggle={toggle}/>}
  </Container>
}

export default App;