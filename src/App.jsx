import { useState, useEffect } from 'react'
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {

  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState('');

  let persisData = (newList) => {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }))
  }

  let handleAddTodos = (newTodo) => {

    const newTodoList = [...todos, newTodo];
    persisData(newTodoList)
    setTodos(newTodoList);

  }

  let handleDeleteTodo = (index) => {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index; 
    })
    persisData(newTodoList)
    setTodos(newTodoList)
  }

  let handleEditTodo = (index) => {
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  useEffect(() => {
    if (!localStorage) {
      return
    }

    let localTodos = localStorage.getItem('todos')
    if (!localTodos) {
      return
    }

    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  }, [])

  return (
    <>
      <>
        <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue} 
        handleAddTodos={handleAddTodos} 
        />
        
        <TodoList 
        handleEditTodo={handleEditTodo}
        handleDeleteTodo={handleDeleteTodo}
        todos={todos} 
        />
      </>
    </>
  )
}

export default App
