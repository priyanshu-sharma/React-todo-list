import React, { Component } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

class Todo extends Component{

  state = {
    todos : [],
    todoToShow : "all",
    toggleall : true
  };

  addTodo(todo)
  {
    this.setState({
      todos : [todo, ...this.state.todos]
    });
  }

  toggleComplete(id)
  {
    this.setState({
      todos : this.state.todos.map(todo => {
        if (todo.id===id)
        {
          return{
          id : todo.id,
          text : todo.text,
          complete : !todo.complete
          };
        }
        else {
          return todo;
        }

      })
    });
  }

  updatetodotoShow(s)
  {
    this.setState({
      todoToShow : s
    })
  }

  deletetodoitem(id)
  {
    this.setState({
      todos : this.state.todos.filter(todo => todo.id !== id)
    });
  }

  removeallcompleted()
  {
    this.setState({
      todos : this.state.todos.filter(todo => !todo.complete)
    });
  }

  toggleallfinal()
  {
    this.setState({
      todos : this.state.todos.map(todo => ({
        ...todo,
        complete : this.state.toggleall
      })),
      toggleall : !this.state.toggleall
    })
  }

  render(){

    let todos = [];

    if(this.state.todoToShow === "all")
    {
      todos = this.state.todos
    }
    else if(this.state.todoToShow === "active")
    {
      todos = this.state.todos.filter(todo => !todo.complete)
    }
    else if(this.state.todoToShow === "complete")
    {
      todos = this.state.todos.filter(todo => todo.complete)
    }

    return (
      <div>
        <center>
          <h1>Todo List</h1>
          <TodoForm onClick = {this.addTodo.bind(this)} />
          {todos.map(todo => (
            <TodoList key = {todo.key} todo = {todo} toggleComplete = {() => this.toggleComplete(todo.id)}
            deletetodoitem = {() => this.deletetodoitem(todo.id)} />
          ))}
          <div>Todos Left : {this.state.todos.filter(todo => !todo.complete).length}</div>
          <button onClick = {() => this.updatetodotoShow("all")}>All</button>
          <button onClick = {() => this.updatetodotoShow("active")}>Active</button>
          <button onClick = {() => this.updatetodotoShow("complete")}>Completed</button>
          {this.state.todos.filter(todo => todo.complete).length ? (<div>
            <button onClick = {() => this.removeallcompleted()}>Remove all Completed</button>
          </div>) : null}
          <div>
            <button onClick = {() => this.toggleallfinal()}>Toggle All : {`${this.state.toggleall}`}</button>
          </div>
        </center>
      </div>
    );
  }

}

export default Todo;
