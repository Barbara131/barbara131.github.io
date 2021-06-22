import React, { Component } from 'react'
import Todo from "./components/Todo.js"

export class App extends Component {
  state = {
    todo:[
      {
        id:1,
        title: "Take out the laundry",
        completed: false
      },
      {
        id:2,
        title:"Dinner with wife",
        completed: false
      },
      {
        id:3,
        title:"Meeting with boss",
        completed: false
      }
      
    ]
  }

  // toggling the button
markComplete = (id) =>{
  this.setState({ todo: this.state.todo.map(todo => {
    (todo.id === id) ? todo.completed = !todo.completed : console.log()
    return todo
  }) })
}

// delete a finished todolist
delTodo = (id) =>{
  this.setState()
}

  render() {
    return (
      <div>
        <Todo todo={this.state.todo} markComplete={this.markComplete} delTodo={this.delTodo}/>
      </div>
    )
  }
}

export default App
